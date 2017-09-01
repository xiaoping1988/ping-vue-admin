import qs from 'qs'
import {getDates} from '@/assets/js/assist.js'
import {abtestUrls} from '../api/abtest'

const Strategys = [
  { id: 1, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 1, testName: '速运业务测试实验1', creator: '张三', createTime: 1500004917432 },
  { id: 2, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 2, testName: '家政业务测试实验1', creator: '张三', createTime: 1500004917432 },
  { id: 20, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 2, testName: '家政业务测试实验20', creator: '张三', createTime: 1500004917432 },
  { id: 21, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 2, testName: '家政业务测试实验21', creator: '张三', createTime: 1500004917432 },
  { id: 3, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验1', creator: '张三', createTime: 1500004917432 },
  { id: 4, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 1, testName: '速运业务测试实验2', creator: '张三', createTime: 1500004917432 },
  { id: 5, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 2, testName: '家政业务测试实验2', creator: '张三', createTime: 1500004917432 },
  { id: 6, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验2', creator: '张三', createTime: 1500004917432 },
  { id: 7, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验3', creator: '张三', createTime: 1500004917432 },
  { id: 8, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验4', creator: '张三', createTime: 1500004917432 },
  { id: 9, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验5', creator: '张三', createTime: 1500004917432 },
  { id: 10, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验6', creator: '张三', createTime: 1500004917432 },
  { id: 11, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验7', creator: '张三', createTime: 1500004917432 },
  { id: 12, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验8', creator: '张三', createTime: 1500004917432 },
  { id: 13, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验9', creator: '张三', createTime: 1500004917432 },
  { id: 14, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验10', creator: '张三', createTime: 1500004917432 },
  { id: 15, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验11', creator: '张三', createTime: 1500004917432 },
  { id: 16, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验12', creator: '张三', createTime: 1500004917432 },
  { id: 17, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验13', creator: '张三', createTime: 1500004917432 },
  { id: 18, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验14', creator: '张三', createTime: 1500004917432 },
  { id: 19, testDesc: '描述信息大家发看来你那个卡电脑付款了多少价格可拉进来看见快递发', categoryId: 3, testName: '丽人业务测试实验15', creator: '张三', createTime: 1500004917432 }
]

const StrategyData = [
  { categoryId: 1, parameterId: '001', showType: '', parameterName: '订单数', version_1: 15000, version_2: 16000, version_2_up: null, version_2_down: null },
  { categoryId: 2, parameterId: '002', showType: '', parameterName: '需求数', version_1: 15000, version_2: 16000, version_2_up: 60, version_2_down: 50 },
  { categoryId: 3, parameterId: '003', showType: 'rate', parameterName: '抢单率', version_1: 15000, version_2: 16000, version_2_up: 60, version_2_down: 50 },
  { categoryId: 1, parameterId: '004', showType: 'rate', parameterName: '订单完成率', version_1: 100, version_2: 16000, version_2_up: 60, version_2_down: 50 },
  { categoryId: 2, parameterId: '005', showType: 'rate', parameterName: '需求完成率', version_1: 200.21, version_2: 16000, version_2_up: 60, version_2_down: 50 },
  { categoryId: 3, parameterId: '006', showType: 'rate', parameterName: '抢单订单完成率', version_1: 15000, version_2: 16000, version_2_up: 60, version_2_down: 50 },
  { categoryId: 1, parameterId: '007', showType: '', parameterName: '单均优惠', version_1: 15000, version_2: 16000, version_2_up: 60, version_2_down: 50 },
  { categoryId: 2, parameterId: '008', showType: '', parameterName: '单均补贴', version_1: 15000, version_2: 16000, version_2_up: 60, version_2_down: 50 },
  { categoryId: 3, parameterId: '009', showType: '', parameterName: '注册数', version_1: 15000, version_2: 16000, version_2_down: 50 }
]

const parameters1 = [
  { parameterId: 'cityId', parameterName: '城市', paramSelect: [{code: '001', value: '北京'}, {code: '002', value: '上海'}, {code: '003', value: '天津'}] },
  { parameterId: 'carId', parameterName: '车型', paramSelect: [{code: '001', value: '小面包'}, {code: '002', value: '大面包'}, {code: '003', value: '金杯'}] },
  { parameterId: 'userId', parameterName: '用户ID末位数字', paramSelect: [{code: '0', value: '0'}, {code: '1', value: '1'}, {code: '2', value: '2'}, {code: '3', value: '3'}, {code: '4', value: '4'}, {code: '5', value: '5'}] },
  { parameterId: 'orderId', parameterName: '订单ID末位数字', paramSelect: [{code: '0', value: '0'}, {code: '1', value: '1'}, {code: '2', value: '2'}, {code: '3', value: '3'}, {code: '4', value: '4'}, {code: '5', value: '5'}] }
]

const parameters2 = [
  { parameterId: 'cityId', parameterName: '城市', paramSelect: [{code: '001', value: '北京'}, {code: '002', value: '上海'}, {code: '003', value: '天津'}] },
  { parameterId: 'userId', parameterName: '用户ID末位数字', paramSelect: [{code: '0', value: '0'}, {code: '1', value: '1'}, {code: '2', value: '2'}, {code: '3', value: '3'}, {code: '4', value: '4'}, {code: '5', value: '5'}] },
  { parameterId: 'orderId', parameterName: '订单ID末位数字', paramSelect: [{code: '0', value: '0'}, {code: '1', value: '1'}, {code: '2', value: '2'}, {code: '3', value: '3'}, {code: '4', value: '4'}, {code: '5', value: '5'}] }
]

const parameters3 = [
  { parameterId: 'cityId', parameterName: '城市', paramSelect: [{code: '001', value: '北京'}, {code: '002', value: '上海'}, {code: '003', value: '天津'}] },
  { parameterId: 'userId', parameterName: '用户ID末位数字', paramSelect: [{code: '0', value: '0'}, {code: '1', value: '1'}, {code: '2', value: '2'}, {code: '3', value: '3'}, {code: '4', value: '4'}, {code: '5', value: '5'}] }
]

export default {
  /**
   * mock bootstrap
   */
  bootstrap (mock) {
    mock.onPost(abtestUrls.baseinfo.getPagelist).reply(config => {
      let {categoryId, page, pageSize} = qs.parse(config.data)
      let startIndex = (page - 1) * pageSize
      let endIndex = startIndex + pageSize
      return new Promise((resolve, reject) => {
        let res = {}
        let data = []
        Strategys.some(item => {
          if (item.categoryId.toString() === categoryId) {
            data.push(item)
          }
        })
        let pageData = []
        data.forEach((item, index) => {
          if ((index + 1) > startIndex && index < endIndex) {
            pageData.push(item)
          }
        })
        res.amount = data.length
        res.list = pageData
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(abtestUrls.baseinfo.delete).reply(config => {
      let {id} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let _index;
        Strategys.forEach((item, index) => {
          if (item.id.toString() === id) {
            _index = index
          }
        })
        if (_index !== undefined) {
          Strategys.splice(_index, 1)
          resolve([200, { code: 0, msg: 'success', result: {} }])
        } else {
          resolve([200, { code: 200, msg: 'failed', result: '删除失败' }])
        }
      })
    })

    mock.onPost(abtestUrls.baseinfo.getData).reply(config => {
      let {id, categoryId, parameterIds, startDate, endDate} = qs.parse(config.data)
      console.log(qs.parse(config.data))
      return new Promise((resolve, reject) => {
        let res = []
        if (!parameterIds || parameterIds === '') {
          StrategyData.forEach(item => {
            if (item.categoryId.toString() === categoryId) res.push(item)
          })
        } else {
          StrategyData.forEach(item => {
            if (parameterIds.indexOf(item.parameterId) !== -1 && item.categoryId.toString() === categoryId) res.push(item)
          })
        }
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(abtestUrls.baseinfo.getDataDetail).reply(config => {
      let {id, parameterId, startDate, endDate} = qs.parse(config.data)
      console.log(qs.parse(config.data))
      let dates = getDates(new Date(startDate.substr(0, 4) + '/' + startDate.substr(4, 2) + '/' + startDate.substr(6, 2) + ' 00:00:00'), new Date(endDate.substr(0, 4) + '/' + endDate.substr(4, 2) + '/' + endDate.substr(6, 2) + ' 00:00:00'), 'yyyyMMdd')
      return new Promise((resolve, reject) => {
        let res = []
        dates.forEach(date => {
          res.unshift({DT: date, version_1: Math.round(Math.random() * 10000), version_2: Math.round(Math.random() * 10000)})
        })
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(abtestUrls.category.getIndexBy).reply(config => {
      let {categoryId} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let res = []
        StrategyData.forEach(item => {
          if (item.categoryId.toString() === categoryId) {
            res.push(item)
          }
        })
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(abtestUrls.baseinfo.save).reply(config => {
      let {list} = qs.parse(config.data)
      console.log(list)
      let obj = JSON.parse(list)
      console.log(obj)
      return new Promise((resolve, reject) => {
        let isCreate = true
        if (obj.id) { // 修改
          isCreate = false
        }
        let repeatName = false
        let updateIndex
        Strategys.forEach((s, index) => {
          if ((isCreate && obj.testName.trim() === s.testName.trim() ||
              (!isCreate && obj.id.toString() !== s.id.toString() && obj.testName.trim() === s.testName.trim()))) {
            repeatName = true
          }
          if (!isCreate && obj.id.toString() === s.id.toString()) updateIndex = index
        })
        if (repeatName) { // 名称重复
          resolve([200, { code: 300, msg: 'faile', result: '名称重复!' }])
        } else { //
          if (isCreate) { // 创建
            let _id = new Date().getTime()
            Strategys.push({ id: _id, testDesc: obj.testDesc, categoryId: Number(obj.categoryId), testName: obj.testName, creator: '李四', createTime: 1500004917432 })
            resolve([200, { code: 0, msg: 'success', result: _id }])
          } else { // 修改
            Strategys[updateIndex].testName = obj.testName
            Strategys[updateIndex].testDesc = obj.testDesc
            resolve([200, { code: 0, msg: 'success', result: '修改成功!' }])
          }
        }
      })
    })

    mock.onPost(abtestUrls.baseinfo.getBaseinfoByid).reply(config => {
      let {id} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let strategy = {}
        Strategys.forEach((s, index) => {
          if (s.id.toString() === id) strategy = s
        })
        let _parameters = []
        if (strategy.categoryId === 1) {
          _parameters = parameters1
        } else if (strategy.categoryId === 2) {
          _parameters = parameters2
        } else if (strategy.categoryId === 3) {
          _parameters = parameters3
        }
        let _parameter = []
        _parameters.forEach((item, index) => {
          let _values = []
          if (item.parameterId === 'cityId' || item.parameterId === 'carId') {
            _values = ['001', '002']
          } else {
            _values = ['0', '1', '2']
          }
          _parameter.push({parameterId: item.parameterId, parameterRelation: (index % 2 === 0 ? 'in' : 'not in'), parameterArray: _values, parameterValue: _values.toString()})
        })
        strategy.abTestVersionList = [
          {
            versionId: 1,
            versionType: 1,
            versionName: '原始版本',
            versionDesc: '原始',
            abTestVersionParameterList: _parameter
          },
          {
            versionId: 2,
            versionType: 2,
            versionName: '测试版本',
            versionDesc: '测试',
            abTestVersionParameterList: _parameter
          }
        ]
        resolve([200, { code: 0, msg: 'success', result: strategy }])
      })
    })

    mock.onPost(abtestUrls.baseinfo.testName).reply(config => {
      let {id, testName} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let repeat = false
        Strategys.forEach((s, index) => {
          if (id) { // 修改
            if (s.id.toString() !== id && s.testName === testName) repeat = true
          } else { // 新增
            if (s.testName === testName) repeat = true
          }
        })
        if (repeat) {
          resolve([200, { code: 300, msg: 'failed', result: '名称重复' }])
        } else {
          resolve([200, { code: 0, msg: 'success', result: '' }])
        }
      })
    })

    mock.onPost(abtestUrls.category.getParameterBy).reply(config => {
      let {categoryId} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let res = []
        if (categoryId === '1') {
          res = parameters1
        } else if (categoryId === '2') {
          res = parameters2
        } else if (categoryId === '3') {
          res = parameters3
        }
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(abtestUrls.baseinfo.export).reply(config => {
      console.log(qs.parse(config.data))
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: 'success', result: '' }])
      })
    })
  }
}
