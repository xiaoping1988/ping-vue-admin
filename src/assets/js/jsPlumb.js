/**
 * 流程节点类型,依赖约束
 * @type {{database: {code: string, name: string, icon: string, next: (*)}, featureProcess: {code: string, name: string, icon: string, next: (*)}, dataSegment: {code: string, name: string, icon: string}}}
 */
const flowNodeType = {
  /**
   * 数据源,后面只能接特征处理组件
   */
  database: {
    code: 'database',
    name: '数据源',
    icon: 'database',
    next: ['featureProcess'],
    msg: '数据源组件后面只能连接特征处理组件'
  },
  /**
   * 特征处理,后面只能接数据切分组件
   */
  featureProcess: {
    code: 'featureProcess',
    name: '特征处理',
    icon: 'wrench',
    next: ['dataSegment'],
    msg: '特征处理组件后面只能连接数据切分组件'
  },
  /**
   * 数据切分,后面不能再有组件
   */
  dataSegment: {
    code: 'dataSegment',
    name: '数据切分',
    icon: 'cube',
    msg: '数据切分组件后面不能再连接组件'
  }
}

/**
 * 流程节点组件
 * @type {{db_hive: {code: string, name: string, nodeType: (*)}, fp_miss_value: {code: string, name: string, nodeType: (*)}, fp_value_range: {code: string, name: string, nodeType: (*)}, fp_normalization: {code: string, name: string, nodeType: (*)}, fp_bucket: {code: string, name: string, nodeType: (*)}, fp_discretization: {code: string, name: string, nodeType: (*)}, ds_time: {code: string, name: string, nodeType: (*)}, ds_random: {code: string, name: string, nodeType: (*)}}}
 */
const flowNode = {
  /**
   * hive数据源
   */
  db_hive: {
    code: 'db_hive',
    name: 'hive',
    nodeType: flowNodeType.database
  },
  /**
   * 特征处理,缺失值处理
   */
  fp_miss_value: {
    code: 'fp_miss_value',
    name: '缺失值处理',
    nodeType: flowNodeType.featureProcess
  },
  /**
   * 特征处理,取值范围
   */
  fp_value_range: {
    code: 'fp_value_range',
    name: '取值范围',
    nodeType: flowNodeType.featureProcess
  },
  /**
   * 特征处理,归一化
   */
  fp_normalization: {
    code: 'fp_normalization',
    name: '归一化',
    nodeType: flowNodeType.featureProcess
  },
  /**
   * 特征处理,分箱
   */
  fp_bucket: {
    code: 'fp_bucket',
    name: '分箱',
    nodeType: flowNodeType.featureProcess
  },
  /**
   * 特征处理,离散化
   */
  fp_discretization: {
    code: 'fp_discretization',
    name: '离散化',
    nodeType: flowNodeType.featureProcess
  },
  /**
   * 数据切分,时间分组
   */
  ds_time: {
    code: 'ds_time',
    name: '时间分组',
    nodeType: flowNodeType.dataSegment
  },
  /**
   * 数据切分,随机分组
   */
  ds_random: {
    code: 'ds_random',
    name: '随机分组',
    nodeType: flowNodeType.dataSegment
  }
}

/**
 * 获取某个node的icon
 * @param id
 * @returns {string}
 */
function getNodeIcon (nodeCode) {
  if (flowNode[nodeCode]) {
    return flowNode[nodeCode].nodeType.icon
  }
  return 'dot-circle-o'
}

export {getNodeIcon}

/**
 * 获取组件数
 */
function getNodeTree () {
  let tree = []
  Object.keys(flowNodeType).forEach(key => {
    let _children = []
    Object.values(flowNode).forEach(value => {
      if (value.nodeType.code === flowNodeType[key].code) {
        _children.push({code: value.code, label: value.name, icon: flowNodeType[key].icon, isLeaf: true})
      }
    })
    tree.push({code: flowNodeType[key].code, label: flowNodeType[key].name, icon: 'folder', children: _children})
  })
  return tree
}

export {getNodeTree}

/**
 * 判断两个节点连接是否合法
 * @param sourceNodeCode 源节点
 * @param targetNodeCode 目标节点
 * @returns {{code: number, msg: string}} 返回,code=0代表合法,code=1代表不合法,msg是提示消息
 */
function validNodeConnect (sourceNodeCode, targetNodeCode) {
  let res = {
    code: 0,
    msg: ''
  }
  if (!flowNode[sourceNodeCode].nodeType.next || !flowNode[sourceNodeCode].nodeType.next.includes(flowNode[targetNodeCode].nodeType.code)) {
    res.code = 1
    res.msg = flowNode[sourceNodeCode].nodeType.msg
  }
  return res
}

export {validNodeConnect}
// /**
//  * 获取组件树
//  */
// function getNodeTree () {
//   let root = {
//     id: 0
//   }
//   addChild(root)
//   return root.children
// }
//
// export {getNodeTree}
//
// /**
//  * 递归增加child
//  * @param parent
//  */
// function addChild (parent) {
//   let _nodes = nodes.filter(n => n.pid === parent.id)
//   if (_nodes && _nodes.length > 0) {
//     parent.children = []
//     _nodes.forEach(n => {
//       let treeNode = {
//         id: n.id,
//         label: n.name,
//         icon: n.icon
//       }
//       parent.children.push(treeNode)
//       addChild(treeNode)
//     })
//   } else {
//     parent.isLeaf = true
//   }
// }
