import {sceneUrls} from '../api'

const scenes = [
  {id: 1, name: '场景一', description: '不知道飞机打开了房间啊的骄傲放开了房间啊jfkasl打开房间啊可怜的房间爱上了健康kdsjfklasj肯德基疯狂拉升的减肥啦大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 2, name: '场景二', description: '的法法师法师法师打发查', creator: 'admin', createtime: new Date().getTime()},
  {id: 3, name: '场景三', description: '而委托人为他人违规放到后端法规和方式', creator: 'admin', createtime: new Date().getTime()},
  {id: 4, name: '场景四', description: '发生的发生的发生发生的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 5, name: '场景五', description: '覆盖公司的弗格森的符合符合人体无法v在v', creator: 'admin', createtime: new Date().getTime()},
  {id: 6, name: '场景六', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 7, name: '场景七', description: '与各界提供方便v成本持续', creator: 'admin', createtime: new Date().getTime()},
  {id: 8, name: '场景八', description: '股一统江湖甘拜下风大大方方地方v', creator: 'admin', createtime: new Date().getTime()},
  {id: 9, name: '场景九', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 10, name: '场景十', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 11, name: '场景十一', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 12, name: '场景十二', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 13, name: '场景十三', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 14, name: '场景十四', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 15, name: '场景十五', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 16, name: '场景十六', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 17, name: '场景十七', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 18, name: '场景十八', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()},
  {id: 19, name: '场景十九', description: '不知道飞机打开了房间啊的骄傲放开了房间啊大的发', creator: 'admin', createtime: new Date().getTime()}
]

export default {
  /**
   * mock bootstrap
   */
  bootstrap (mock) {
    /**
     * 分页查询场景实验列表
     */
    mock.onGet(sceneUrls.list).reply(config => {
      let {page, pageSize} = config
      console.log('分页查询场景实验列表,参数:{}', {page, pageSize})
      return new Promise((resolve, reject) => {
        let res = []
        let startIndex = (page - 1) * pageSize
        if (scenes.length > startIndex) {
          let endIndex = startIndex + pageSize
          res = scenes.slice(startIndex, endIndex)
        }
        resolve([200, { code: 0, msg: '', result: res }])
      })
    })

    /**
     * 新增场景
     */
    mock.onPost(sceneUrls.saveOrUpdate).reply(config => {
      let {id, name, description} = JSON.parse(config.data)
      console.log('新增场景实验,参数:{}', JSON.parse(config.data))
      return new Promise((resolve, reject) => {
        let data = {
          id: (id && id !== '' ? Number(id) : scenes.length + 1),
          name: name,
          description: description,
          creator: 'admin',
          createtime: new Date().getTime()
        }
        if (id && id !== '') {
          for (let index in scenes) {
            if (scenes[index].id === data.id) {
              scenes[index] = data
            }
          }
        } else {
          scenes.unshift(data)
        }
        resolve([200, { code: 0, msg: '', result: data }])
      })
    })

    /**
     * 编辑流程,获取流程图
     */
    mock.onPost(sceneUrls.flowChart).reply(config => {
      let {sceneId} = JSON.parse(config.data)
      console.log('获取流程图,参数:{}', JSON.parse(config.data))
      return new Promise((resolve, reject) => {
        let time = new Date().getTime()
        let node1 = 'jspnode_' + time + '_1'
        let node2 = 'jspnode_' + time + '_2'
        let node3 = 'jspnode_' + time + '_3'
        let node4 = 'jspnode_' + time + '_4'
        let node5 = 'jspnode_' + time + '_5'
        let node6 = 'jspnode_' + time + '_6'
        let node7 = 'jspnode_' + time + '_7'
        let nodes = [
          {nodeCode: 'db_hive', nodeDomId: node1, name: 'hive', x: 500, y: 20, parents: [], children: [node2, node4, node5, node6, node7]},
          {nodeCode: 'fp_normalization', nodeDomId: node2, name: '归一化', x: 200, y: 200, parents: [node1], children: [node3]},
          {nodeCode: 'ds_random', nodeDomId: node3, name: '随机分组', x: 500, y: 400, parents: [node2, node4, node5, node6, node7], children: []},
          {nodeCode: 'fp_miss_value', nodeDomId: node4, name: '缺失值处理', x: 300, y: 200, parents: [node1], children: [node3]},
          {nodeCode: 'fp_bucket', nodeDomId: node5, name: '分箱', x: 500, y: 200, parents: [node1], children: [node3]},
          {nodeCode: 'fp_discretization', nodeDomId: node6, name: '离散化', x: 700, y: 200, parents: [node1], children: [node3]},
          {nodeCode: 'fp_value_range', nodeDomId: node7, name: '取值范围', x: 800, y: 200, parents: [node1], children: [node3]}
        ]
        resolve([200, { code: 0, msg: '', result: nodes }])
      })
    })
  }
}
