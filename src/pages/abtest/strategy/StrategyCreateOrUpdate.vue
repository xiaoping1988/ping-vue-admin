<template>
  <Form ref="formTest" :model="formTest" :rules="formTestRule" inline>
    <div class="row title-row">
      <div class="col-md-1 first-col">
        <p class="page-title">{{routeQuery.id ? '配置测试' : '创建测试'}}</p>
      </div>
      <div class="col-md-2">
        <c-go-back></c-go-back>
      </div>
    </div>
    <div class="row">
      <p style="font-size: 12px;margin: 0px;">基本信息</p>
        <div class="formInfo">
          <ul class="formUl">
            <li style="width: 100%;">
              <p class="label-name">测试名称</p>
              <p class="label-value">
                <Form-item prop="testName">
                  <Input class="my-input test-input" type="text" v-model.trim="formTest.testName" placeholder="最多20个字符">
                  </Input>
                </Form-item>
              </p>
            </li>
            <li style="width: 100%;">
              <p class="label-name">描述</p>
              <p class="label-value">
                <Form-item prop="testDesc">
                  <Input class="my-input test-input" type="text" v-model.trim="formTest.testDesc" placeholder="最多50个字符">
                  </Input>
                </Form-item>
              </p>
            </li>
            <li style="width: 100%;">
              <p class="label-name" style="margin-top: 8px">分类</p>
              <p class="label-value">
                <Form-item prop="categoryId" style="margin-bottom: 0px">
                  <Radio-group v-model="formTest.categoryId" @on-change="changeCategoryId">
                    <Radio v-for="category in categorys" :label="category.categoryId" :key="category" v-if="formTest.id === undefined || formTest.categoryId === category.categoryId">{{category.categoryName}}</Radio>
                  </Radio-group>
                </Form-item>
              </p>
            </li>
          </ul>
        </div>
    </div>
    <div class="row">
      <p style="font-size: 12px;margin: 0px;">版本</p>
        <div class="formInfo">
          <div v-for="(version, index) in formTest.abTestVersionList" :key="version">
            <div class="row">
              <div class="col-md-8">
                <ul class="formUl">
                  <li style="width: 100%;height: 30px;">
                    <p class="label-name" style="margin-top: 8px">类型</p>
                    <p class="label-value">
                      <Form-item style="margin-bottom: 0px">
                        <Radio v-model="check">{{version.versionType === 1 ? '原始版本' : '测试版本'}}</Radio>
                      </Form-item>
                    </p>
                  </li>
                  <li style="width: 100%;">
                    <p class="label-name">版本名称</p>
                    <p class="label-value">
                      <Form-item
                        :key="index"
                        :prop="'abTestVersionList.' + index + '.versionName'"
                        :rules="[{required: true, message: '请填写版本名称', trigger: 'blur'},
                             {type: 'string', max: 20, message: '版本名称最多20个字符', trigger: 'blur'},
                             {type: 'string', pattern: /^[\u4e00-\u9fa5\-_a-zA-Z0-9]*$/, message: '版本名称只能包含汉字、字母、数字、下划线或者“-”字符', trigger: 'blur'},
                             {validator: validateRepeatVersionName, trigger: 'blur'}]">
                        <Input class="my-input test-input" type="text" v-model.trim="version.versionName" placeholder="最多20个字符">
                        </Input>
                      </Form-item>
                    </p>
                  </li>
                  <li style="width: 100%;">
                    <p class="label-name">版本描述</p>
                    <p class="label-value">
                      <Form-item
                        :key="index"
                        :prop="'abTestVersionList.' + index + '.versionDesc'"
                        :rules="[{type: 'string', max: 50, message: '版本描述最多50个字符', trigger: 'blur'}]">
                        <Input class="my-input test-input" type="text" v-model.trim="version.versionDesc" placeholder="最多50个字符">
                        </Input>
                      </Form-item>
                    </p>
                  </li>
                  <li style="width: 100%;" v-for="(param, index2) in parameters" :key="param">
                    <p class="label-name">{{param.parameterName}}</p>
                    <p class="label-value">
                      <Form-item :key="index2">
                        <Select v-model="version.abTestVersionParameterList[index2].parameterRelation" class="my-input test-select2" placeholder="不限" @on-change="changeRelation(version, version.abTestVersionParameterList[index2].parameterRelation,version.abTestVersionParameterList[index2])">
                          <Option value="">不限</Option>
                          <Option value="in">包含</Option>
                          <Option value="not in">不包含</Option>
                        </Select>
                      </Form-item>
                      <Form-item
                        :key="index2"
                        :prop="'abTestVersionList.' + index + '.abTestVersionParameterList.' + index2"
                        :rules="[{validator: validateParameterArray, trigger: 'change'}]">
                        <Select v-if="param.paramSelect.length < noRemoteSize" v-model="version.abTestVersionParameterList[index2].parameterArray" :disabled="version.abTestVersionParameterList[index2].disabled" filterable multiple class="my-input test-select" placeholder="请选择">
                          <Option v-for="item in param.paramSelect" :value="item.code" :key="item">{{ item.value }}</Option>
                        </Select>
                        <div v-else @click="setParamIndex(index2)" class="test-select">
                          <Select :remote="remote" :remote-method="filterParams" not-found-text="" v-model="version.abTestVersionParameterList[index2].parameterArray" :disabled="version.abTestVersionParameterList[index2].disabled" filterable multiple class="my-input test-select" placeholder="请搜索再选择">
                            <Option v-for="item in param.filterSelect" :value="item.code"  :key="item">{{item.value}}</Option>
                          </Select>
                        </div>
                      </Form-item>
                    </p>
                  </li>
                  <li v-if="version.noParam" style="width: 100%;">
                    <p class="label-value"><span style="color: #ed3f14;">以上参数至少配置一项</span></p>
                  </li>
                </ul>
              </div>
              <div v-if="index !== 0 && formTest.abTestVersionList.length > 2" class="col-md-2">
                <!--<Button @click="handleRemove(index)" icon="close-round">删除</Button>-->
                <a @click="handleRemove(index)">删除</a>
              </div>
            </div>
            <hr/>
          </div>
          <Button type="dashed" style="margin-left: 25px" @click="handleAdd" icon="plus-round">新增版本</Button>
          <c-submit-button @on-submit="handleSubmit" @on-cancel="goBack()"></c-submit-button>
        </div>
    </div>
    <c-loading fix :loading="loading"></c-loading>
  </Form>
</template>

<script>
  import {formatDate} from '@/assets/js/assist.js'
  import {createOrUpdateStrategy, checkTestNameRepeat, queryParameters, getStrategy, categorys} from '../api/abtest'

  function Paramter (parameterId, parameterRelation, parameterArray) {
    this.parameterId = parameterId
    this.parameterRelation = parameterArray.length < 1 ? '' : parameterRelation
    this.parameterArray = parameterArray
    this.disabled = parameterArray.length < 1
  }

  export default {
      data () {
          const validateRepeatTestName = (rule, value, callback) => {
            let params = {testName: value}
            if (this.formTest.id) params.id = this.formTest.id
            checkTestNameRepeat(params).then(res => {
                if (res.code === 0) {
                  callback()
                } else {
                  callback(new Error('测试名称重复'))
                }
            })
          }
          const validateRepeatVersionName = (rule, value, callback) => {
            let _r = 0
            this.formTest.abTestVersionList.forEach(item => {
                if (item.versionName.trim() === value.trim()) _r = _r + 1
            })
            if (_r === 2) {
              callback(new Error('版本名称重复'))
            } else {
              callback()
            }
          }
        const validateParameterArray = (rule, value, callback) => {
          if (value.parameterRelation !== '' && value.parameterArray.length === 0) {
            callback(new Error('至少选择一项'))
          } else {
            callback()
          }
        }
          return {
            loading: true,
            noRemoteSize: 30,
            categorys: categorys,
            routeQuery: this.$route.query,
            check: true,
            validateRepeatVersionName: validateRepeatVersionName,
            validateParameterArray: validateParameterArray,
            formTestRule: {
              testName: [
                {required: true, message: '请填写测试名称', trigger: 'blur'},
                {type: 'string', max: 20, message: '测试名称最多20个字符', trigger: 'blur'},
                {type: 'string', pattern: /^[\u4e00-\u9fa5\-_a-zA-Z0-9]*$/, message: '测试名称只能包含汉字、字母、数字、下划线或者"-"字符', trigger: 'blur'},
                {validator: validateRepeatTestName, trigger: 'blur'}
              ],
              testDesc: [
//                {required: true, message: '请填写描述', trigger: 'blur'},
                {type: 'string', max: 50, message: '描述最多50个字符', trigger: 'blur'}
              ]
            },
            parameters: [],
            paramIndex: 0,
            remote: this.$route.query.id === undefined,
            formTest: {
              testName: '',
              testDesc: '',
              categoryId: 1,
              abTestVersionList: [
                {
                  versionType: 1,
                  versionName: '',
                  versionDesc: '',
                  noParam: false,
                  abTestVersionParameterList: []
                },
                {
                  versionType: 2,
                  versionName: '',
                  versionDesc: '',
                  noParam: false,
                  abTestVersionParameterList: []
                }
              ]
            }
          }
      },
    methods: {
      handleSubmit () {
        this.$refs['formTest'].validate((valid) => {
          let vp = this.validVersionParam()
          if (valid && vp) {
            this.formTest.abTestVersionList.forEach(item => {
                item.abTestVersionParameterList.forEach(p => {
                    p.parameterValue = p.parameterArray.toString()
                })
            })
            createOrUpdateStrategy({list: JSON.stringify(this.formTest)}).then(res => {
                if (res.code === 0) {
//                  this.$Notice.success({
//                    title: '成功提示!',
//                    desc: '提交成功!'
//                  })
                  if (this.routeQuery.id) { // 修改
                    this.goBack()
                  } else { // 新增
                    this.$router.push({
                      path: '/ab-test/strategy/detail',
                      query: {id: res.result, categoryId: this.formTest.categoryId, sourcePage: 'add'}
                    })
                  }
                } else {
                  this.$Notice.error({
                    title: '错误提示',
                    desc: res.result
                  });
                }
            })
          } else {
            this.$Notice.error({
              title: '错误提示',
              desc: '输入内容不符合规范'
            });
          }
        })
      },
      handleReset () {
        this.$refs['formTest'].resetFields();
      },
      validVersionParam () {
        let valid = true
        this.formTest.abTestVersionList.forEach(v => {
          let noParam = true
          v.abTestVersionParameterList.forEach(p => {
              if (p.parameterRelation !== '') noParam = false
          })
          if (noParam) {
            valid = false
            v.noParam = true
          } else {
            v.noParam = false
          }
        })
        return valid
      },
      handleAdd () {
        if (this.formTest.abTestVersionList.length >= 5) {
          this.$Notice.error({
            title: '错误提示',
            desc: '最多只能添加5个版本'
          })
          return
        }
        let _parameter = []
        this.parameters.forEach(item => {
          _parameter.push(new Paramter(item.parameterId, '', []))
        })
        let _versionType = this.formTest.abTestVersionList.length > 0 ? 2 : 1
        this.formTest.abTestVersionList.push(
          {
            versionType: _versionType,
            versionName: '',
            versionDesc: '',
            noParam: false,
            abTestVersionParameterList: _parameter
          }
        )
      },
      handleRemove (index) {
        this.formTest.abTestVersionList.splice(index, 1);
      },
      initFormTest () {
        getStrategy({id: this.routeQuery.id}).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.formTest = res.result
            this.formTest.abTestVersionList.forEach(v => {
              let _parameter = []
              this.parameters.forEach(item => {
                let _p
                let _f = {}
                v.abTestVersionParameterList.forEach(p => {
                  if (item.parameterId === p.parameterId) {
                    _p = new Paramter(p.parameterId, p.parameterRelation, p.parameterArray)
                    if (item.paramSelect.length >= this.noRemoteSize) {
                      p.parameterArray.forEach(c => {
                          item.paramSelect.filter(s => s.code === c).forEach(i => {
                              _f[i.code] = i
                          })
                      })
                    }
                  }
                })
                let _r = Object.values(_f)
                if (_r.length > 0) {
                  item.filterSelect = _r.concat(item.filterSelect.filter(s => !_r.includes(s)))
                }
                if (_p === undefined) {
                  _parameter.push(new Paramter(item.parameterId, '', []))
                } else {
                  _parameter.push(_p)
                }
              })
              v.abTestVersionParameterList = _parameter
              v.noParam = false
            })
          }
        })
      },
      initAbTestVersionListParams () {
          this.formTest.abTestVersionList.forEach(v => {
            let _parameter = []
            this.parameters.forEach(item => {
              _parameter.push(new Paramter(item.parameterId, '', []))
            })
            v.abTestVersionParameterList = _parameter
          })
          this.loading = false
      },
      setParameters () {
        let _categoryId = this.formTest.categoryId
        if (this.routeQuery.id) _categoryId = this.routeQuery.categoryId
        queryParameters({categoryId: _categoryId}).then(res => {
          if (res.code === 0) {
            res.result.forEach(r => {
              if (r.paramSelect.length >= this.noRemoteSize) {
                r.filterSelect = r.paramSelect.slice(0, this.noRemoteSize)
              }
            })
            this.parameters = res.result
            this.$nextTick(function () {
              if (this.routeQuery.id) {
                this.initFormTest()
              } else {
                this.initAbTestVersionListParams()
              }
            })
          }
        })
      },
      filterParams (query) {
        if (query && query !== '') {
          query = query.trim()
          let _ps = this.parameters[this.paramIndex].paramSelect
          let _res = []
          let _count = 0
          for (let key in _ps) {
            if (_count === this.noRemoteSize) {
              break
            }
            if (this.match(query, _ps[key].value)) {
              _count += 1
              _res.push(_ps[key])
            }
          }
          this.parameters[this.paramIndex].filterSelect = _res
        } else {
//          this.parameters[this.paramIndex].filterSelect = this.parameters[this.paramIndex].paramSelect.slice(0, this.noRemoteSize)
        }
      },
      setParamIndex (index) {
        this.paramIndex = index
        this.remote = true
        this.parameters[this.paramIndex].filterSelect = this.parameters[this.paramIndex].paramSelect.slice(0, this.noRemoteSize)
      },
      changeCategoryId () {
        this.setParameters()
      },
      changeRelation (version, relation, paramObj) {
          if (relation === '') {
            this.remote = false
            paramObj.parameterArray = []
            paramObj.disabled = true
            version.noParam = true
            version.abTestVersionParameterList.forEach(p => {
                if (p.parameterRelation !== '') version.noParam = false
            })
          } else {
            paramObj.disabled = false
            version.noParam = false
          }
      }
    },
    beforeMount () {
//      this.setParameters()
    },
    mounted () {
      this.setParameters()
    }
  }
</script>

<style scoped>
  .test-input{
    width: 575px!important;
  }
  .test-select{
    width: calc(600px - 110px)!important;
  }
  .test-select2{
    width: 70px!important;
  }
</style>
