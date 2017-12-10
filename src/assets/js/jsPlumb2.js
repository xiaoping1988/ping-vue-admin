const nodes = [
  {id: 1, name: '数据源', icon: 'folder', pid: 0},
  {id: 2, name: 'hive', icon: 'database', pid: 1},
  {id: 3, name: 'mysql', icon: 'database', pid: 1},
  {id: 4, name: 'hbase', icon: 'database', pid: 1},
  {id: 5, name: '特征处理', icon: 'folder', pid: 0},
  {id: 6, name: '归一化', icon: 'wrench', pid: 5},
  {id: 7, name: '离散化', icon: 'wrench', pid: 5},
  {id: 8, name: '模型', icon: 'folder', pid: 0},
  {id: 9, name: '分类', icon: 'folder', pid: 8},
  {id: 11, name: '逻辑回归', icon: 'crosshairs', pid: 9},
  {id: 12, name: '朴素贝叶斯', icon: 'crosshairs', pid: 9},
  {id: 13, name: '决策树', icon: 'crosshairs', pid: 9},
  {id: 14, name: '支持向量机', icon: 'crosshairs', pid: 9},
  {id: 15, name: '随机森林', icon: 'crosshairs', pid: 9},
  {id: 16, name: '聚类', icon: 'folder', pid: 8},
  {id: 17, name: 'K-MEANS', icon: 'crosshairs', pid: 16},
  {id: 18, name: 'K-MEDOIDS', icon: 'crosshairs', pid: 16},
  {id: 19, name: '层次聚类', icon: 'crosshairs', pid: 16},
  {id: 20, name: 'GMM', icon: 'crosshairs', pid: 16},
  {id: 21, name: '回归', icon: 'folder', pid: 8},
  {id: 22, name: '线性回归', icon: 'crosshairs', pid: 21},
  {id: 23, name: '一般线性回归', icon: 'crosshairs', pid: 21},
  {id: 24, name: '数据拆分', icon: 'folder', pid: 0},
  {id: 25, name: '训练数据', icon: 'cube', pid: 24},
  {id: 26, name: '测试数据', icon: 'cube', pid: 24}
]

/**
 * 获取某个node的icon
 * @param id
 * @returns {string}
 */
function getNodeIcon (id) {
  for (let index in nodes) {
    if (nodes[index].id === id) {
      return nodes[index].icon
    }
  }
  return 'dot-circle-o'
}

export {getNodeIcon}

/**
 * 获取组件树
 */
function getNodeTree () {
  let root = {
    id: 0
  }
  addChild(root)
  return root.children
}

export {getNodeTree}

/**
 * 递归增加child
 * @param parent
 */
function addChild (parent) {
  let _nodes = nodes.filter(n => n.pid === parent.id)
  if (_nodes && _nodes.length > 0) {
    parent.children = []
    _nodes.forEach(n => {
      let treeNode = {
        id: n.id,
        label: n.name,
        icon: n.icon
      }
      parent.children.push(treeNode)
      addChild(treeNode)
    })
  } else {
    parent.isLeaf = true
  }
}
