<template>
  <div>
    <div class="row title-row">
      <div class="col-md-1 first-col">
        <p class="page-title">测试详情</p>
      </div>
      <div class="col-md-2">
        <Button v-if="routeQuery.sourcePage === 'add'" @click="$router.push('/ab-test/strategy')" icon="arrow-return-left">返回测试列表</Button>
        <c-go-back v-else></c-go-back>
      </div>
      <div class="col-md-7">
      </div>
      <div class="col-md-2">
        <Button @click="updateStrategy" icon="edit" v-if="auth.ab_test_strategy_update">配置测试</Button>
      </div>
    </div>
    <div class="row" style="padding: 15px 0px 15px 0px;">
      <div class="col-md-4 first-col">
        <span style="font-size: 20px">{{data.testName}}</span>
      </div>
    </div>
    <div class="row">
      <div class="modelInfo">
        <ul>
          <li>
            <p class="label-name">分类</p>
            <p class="label-value">{{data.categoryId === 1 ? '速运业务' : (data.categoryId === 2 ? '家政业务' : '丽人业务')}}</p>
          </li>
          <li>
            <p class="label-name">创建人</p>
            <p class="label-value">{{data.creator}}</p>
          </li>
          <li>
            <p class="label-name">创建时间</p>
            <p class="label-value">
              <c-format-date :val="data.createTime"></c-format-date>
            </p>
          </li>
          <li style="width: 100%">
            <p class="label-name">测试描述</p>
            <p class="label-value">{{data.testDesc}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="modelInfo" style="margin-bottom: -20px;">
        <ul>
          <li style="width: 35%">
            <p class="label-name">指标</p>
            <p class="label-value">
              <Select v-model="selectIndexCodes" :disabled="showIndexDetail" filterable multiple style="width: 300px" class="my-input" @on-change="changeIndex">
                <Option v-for="item in selectIndexList" :value="item.parameterId" :key="item">{{ item.parameterName }}</Option>
              </Select>
            </p>
          </li>
          <li style="width: 30%">
            <p class="label-name">统计日期</p>
            <p class="label-value">
              <Date-picker @on-change="setCreatedate"
                           format="yyyyMMdd"
                           v-model="createdate"
                           :clearable="dateClear"
                           :editable="dateEdit"
                           type="daterange"
                           :options="options2"
                           placement="bottom-end"
                           placeholder="选择日期"
                           style="width: 200px" class="my-input" ></Date-picker>
            </p>
          </li>
          <li style="width: 30%;text-align: center">
            <Button @click="download" style="margin-top: 5px" icon="android-download" v-if="auth.ab_test_strategy_download">导出</Button>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="modelInfo">
        <ul style="margin-bottom: 0px;margin-left: 10px;">
          <li style="padding-top: 20px;">
            <label v-if="!showIndexDetail">测试数据</label>
            <label v-if="showIndexDetail"><a href="javascript:void(0)" @click="showTable">测试数据</a></label>
            <label v-if="showIndexDetail" style="margin: 0px 8px 0px 8px;"><Icon type="ios-arrow-right"></Icon></label>
            <label v-if="showIndexDetail">{{showRecordDetail.parameterName}}</label>
          </li>
        </ul>
        <c-loading :loading="loading">
          <Table v-if="!showIndexDetail" border :columns="tableColumns" :data="tableDataTmp"></Table>
          <c-chart v-if="showIndexDetail" :data="chartData" style="margin-bottom: 10px"></c-chart>
          <Table v-if="showIndexDetail" border :columns="indexTableColumns" :data="indexTableData"></Table>
        </c-loading>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryStrategyData, queryStrategyIndex, getStrategy, queryStrategyIndexData, exportAbtestData} from '../api/abtest'
  import {getDates, formatDate, shortcuts} from '@/assets/js/assist.js'
  import StrategyConstrast from './StrategyConstrast.vue'

  export default {
      data () {
          return {
            auth: {},
            routeQuery: this.$route.query,
            showIndexDetail: false,
            showRecordDetail: {},
            data: {},
            tableColumns: [
                {
                  title: '指标',
                  key: 'parameterName',
                  width: 200,
                  fixed: true,
                  render: (h, params) => {
                    return h('div', [
                      h('a', {
                        on: {
                          click: () => {
                            this.showIndexDetail = true
                            this.showRecordDetail = this.tableData[params.index]
                            this.$nextTick(function () {
                              this.setIndexTableData()
                            })
                          }
                        }
                      }, params.row.parameterName)
                    ])
                  }
                }],
            tableData: [],
            tableDataTmp: [],
            indexTableColumns: [{title: '日期', width: 200, key: 'DT', fixed: true}],
            indexTableData: [],
            options2: {
              shortcuts: shortcuts
            },
            allIndex: [],
            selectIndexList: [{ parameterId: '', parameterName: '全部' }],
            selectIndexCodes: [''],
            startDate: formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 6), 'yyyyMMdd'),
            endDate: formatDate(new Date(), 'yyyyMMdd'),
            createdate: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 6), new Date()],
            dateClear: false,
            dateEdit: false,
            chartData: {},
            loading: true
          }
      },
      methods: {
          showTable () {
            this.showIndexDetail = false
            this.setTableData()
          },
          setTableData () {
            this.loading = true
            queryStrategyData({id: this.routeQuery.id, categoryId: this.routeQuery.categoryId, parameterIds: this.selectIndexCodes.toString(), startDate: this.startDate, endDate: this.endDate}).then(res => {
              this.loading = false
              if (res.code === 0) {
                this.tableData = res.result
                this.tableDataTmp = res.result
              }
            })
          },
          setIndexTableData () {
            this.loading = true
            queryStrategyIndexData({id: this.routeQuery.id, parameterId: this.showRecordDetail.parameterId, startDate: this.startDate, endDate: this.endDate}).then(res => {
              this.loading = false
              if (res.code === 0) {
                this.indexTableData = res.result
                let _chartData = { title: '', type: 'line', columns: [], data: res.result, reverse: true }
                this.indexTableColumns.forEach(c => {
                    let column = {name: c.key, title: c.title, isDim: false, type: 'line'}
                    if (c.key === 'DT') column.isDim = true
                    _chartData.columns.push(column)
                })
                this.chartData = _chartData
              }
            })
          },
          setCreatedate (_date) {
              this.startDate = _date[0]
              this.endDate = _date[1]
              if (this.showIndexDetail) {
                this.setIndexTableData()
              } else {
                this.setTableData()
              }
          },
          setIndex () {
            queryStrategyIndex({categoryId: this.routeQuery.categoryId}).then(res => {
              if (res.code === 0) {
                this.allIndex = res.result
                res.result.forEach(item => {
                  this.selectIndexList.push(item)
                })
              }
            })
          },
          changeIndex (_value) {
            if (_value.length === 0) {
              this.selectIndexCodes = ['']
            } else {
              let _codes = _value.toString()
              if (_codes.indexOf(',,') !== -1 || _codes.endsWith(',')) { // 点了全部
                this.selectIndexCodes = ['']
              } else if (_codes !== '') {
                if (_value[0] === '') {
                  this.selectIndexCodes.splice(0, 1)
                }
              }
            }
            let _c = this.selectIndexCodes.toString() + ','
            if (_c === ',') { // 全部
              this.tableDataTmp = this.tableData
            } else {
              this.tableDataTmp = []
              this.tableData.forEach(d => {
                  if (_c.indexOf(d.parameterId + ',') > -1) this.tableDataTmp.push(d)
              })
            }
          },
          updateStrategy () {
            this.$router.push({
              path: '/ab-test/strategy/create-or-update',
              query: this.routeQuery
            })
          },
          setData () {
              getStrategy({id: this.routeQuery.id}).then(res => {
                  if (res.code === 0) {
                    this.data = res.result
                    let _columns = []
                    res.result.abTestVersionList.forEach(v => {
                      let _column = {}
                      _column.key = 'version_' + v.versionId
                      _column.title = v.versionName + (v.versionType === 1 ? '(原始)' : '(对照)')
                      _column.align = 'right'
                      _column.render = (h, params) => {
                        if (!this.showIndexDetail) {
                          if (v.versionType !== 1) {
                            return h(StrategyConstrast, {
                              props: {
                                val: params.row[_column.key],
                                up: params.row[_column.key + '_up'],
                                down: params.row[_column.key + '_down'],
                                suf: this.tableData[params.index].showType === 'rate' ? '%' : ''
                              }
                            })
                          } else {
                            return h('c-format-num', {
                              props: {
                                val: params.row[_column.key],
                                suf: this.tableData[params.index].showType === 'rate' ? '%' : ''
                              }
                            })
                          }
//                          if (this.tableData[params.index][_column.key + '_up'] !== undefined) {
//                            return h(StrategyConstrast, {
//                              props: {
//                                val: params.row[_column.key],
//                                up: params.row[_column.key + '_up'],
//                                down: params.row[_column.key + '_down'],
//                                suf: this.tableData[params.index].showType === 'rate' ? '%' : ''
//                              }
//                            })
//                          } else {
//                            return h('c-format-num', {
//                              props: {
//                                val: params.row[_column.key],
//                                suf: this.tableData[params.index].showType === 'rate' ? '%' : ''
//                              }
//                            })
//                          }
                        } else {
                          return h('c-format-num', {
                            props: {
                              val: params.row[_column.key],
                              suf: this.showRecordDetail.showType === 'rate' ? '%' : ''
                            }
                          })
                        }
                      }
                      _columns.push(_column)
                    })
                    this.tableColumns = this.tableColumns.concat(_columns)
                    this.indexTableColumns = this.indexTableColumns.concat(_columns)
                  }
              })
          },
          download () {
              let params = {id: this.routeQuery.id, startDate: this.startDate, endDate: this.endDate}
              if (this.showIndexDetail) { // 导出单个指标明细数据
                params.parameterId = this.showRecordDetail.parameterId
                params.downloadType = 2
                params.fileName = this.data.testName + '-' + this.showRecordDetail.parameterName + '(' + this.startDate + '~' + this.endDate + ')'
              } else { // 导出指标汇总数据
                params.parameterId = this.selectIndexCodes.toString()
                params.downloadType = 1
                params.fileName = this.data.testName + '-整体(' + this.startDate + '~' + this.endDate + ')'
              }
            exportAbtestData(params)
          }
      },
      mounted () {
        this.getPageAuth('ab_test_strategy_update,ab_test_strategy_download').then(res => { this.auth = res })
        this.setData()
        this.setIndex()
        this.setTableData()
      }
  }
</script>

<style>
  .contrast-render p {
    font-size: 12px!important;
    line-height: 15px!important;
    padding-top: 0px!important;
    margin: 0px!important;
  }
  .contrast-render .contrast-render-rate{
    font-weight:700;
    /*color:#4CAF50;*/
  }
</style>
