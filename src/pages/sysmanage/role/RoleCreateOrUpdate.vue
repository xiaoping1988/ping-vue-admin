<template>
  <Form ref="formModel" :model="formModel" :rules="formModelRule" inline>
    <div class="row title-row">
      <div class="col-md-1 first-col">
        <p class="page-title">{{routeQuery.roleId ? '编辑角色' : '创建角色'}}</p>
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
            <p class="label-name">角色名称</p>
            <p class="label-value">
              <Form-item prop="name">
                <Input class="my-input test-input" type="text" v-model.trim="formModel.name" placeholder="最多20个字符">
                </Input>
              </Form-item>
            </p>
          </li>
          <li style="width: 100%;">
            <p class="label-name">角色描述</p>
            <p class="label-value">
              <Form-item prop="desc">
                <Input class="my-input test-input" type="text" v-model.trim="formModel.desc" placeholder="最多50个字符">
                </Input>
              </Form-item>
            </p>
          </li>
          <li style="width: 100%;">
            <p class="label-name">所属应用</p>
            <p class="label-value">
              <Input v-if="routeQuery.roleId" class="my-input test-input" type="text" :value="formModel.appName" disabled>
              </Input>
              <Form-item prop="appId" v-else>
                <Select v-model="formModel.appId" class="my-input test-input" @on-change="setResourceTree">
                  <Option v-for="item in appList" :value="item.resourceId" :key="item.resourceId">{{ item.name }}</Option>
                </Select>
              </Form-item>
            </p>
          </li>
          <li style="width: 100%;">
            <p class="label-name">资源</p>
            <p class="label-value">
              <Form-item prop="resourceIds">
                <Tree ref="resourceTree" :data="resourceTree" show-checkbox></Tree>
              </Form-item>
            </p>
          </li>
        </ul>
        <c-submit-button @on-submit="handleSubmit" @on-cancel="goBack()"></c-submit-button>
      </div>
    </div>
  </Form>
</template>

<script>
  import {addOrUpdateRole, getRoleByIdAll, queryApps, getResourceTree, checkRepeatName} from '../api/sysmanage'

  export default {
    data () {
      const validateRepeatName = (rule, value, callback) => {
        let params = {name: value, appId: this.formModel.appId}
        if (this.formModel.roleId) params.roleId = this.formModel.roleId
        checkRepeatName(params).then(res => {
          if (res.code === 0) {
            callback()
          } else {
            callback(new Error('角色名称重复'))
          }
        })
      }
      return {
        routeQuery: this.$route.query,
        formModelRule: {
          name: [
            {required: true, message: '请填写角色名称', trigger: 'blur'},
            {type: 'string', max: 20, message: '角色名称最多20个字符', trigger: 'blur'},
            {type: 'string', pattern: /^[\u4e00-\u9fa5\-_a-zA-Z0-9]*$/, message: '角色名称只能包含汉字、字母、数字、下划线或者中划线', trigger: 'blur'},
            {validator: validateRepeatName, trigger: 'blur'}
          ],
          desc: [
//            {required: true, message: '请填写角色描述', trigger: 'blur'},
            {type: 'string', max: 50, message: '角色描述最多50个字符', trigger: 'blur'}
          ],
          resourceIds: [
            {required: true, message: '至少选择一项资源', trigger: 'blur'}
          ]
        },
        formModel: {
          name: '',
          desc: '',
          appId: '',
          resourceIds: ''
        },
        appList: [],
        resourceTree: []
      }
    },

    methods: {
      handleSubmit () {
        this.setResourceIds()
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            addOrUpdateRole(this.formModel).then(res => {
              if (res.code === 0) {
                this.$Notice.success({
                  title: '成功提示!',
                  desc: '提交成功!'
                })
                this.goBack()
              } else {
                this.$Notice.error({
                  title: '错误提示',
                  desc: res.result,
                  duration: 0
                })
              }
            })
          } else {
            this.$Notice.error({
              title: '错误提示',
              desc: '输入内容不符合规范'
            })
          }
        })
      },
      initFormModel () {
        getRoleByIdAll({roleId: this.routeQuery.roleId}).then(res => {
          if (res.code === 0) {
            this.formModel = res.result
            this.deleteEmptyChildren([res.result.resourceTree])
            this.resourceTree = [res.result.resourceTree]
          }
        })
      },
      deleteEmptyChildren (tree) {
          tree.forEach(t => {
              if (t.children == null || t.children.length === 0) {
                delete t.children
              } else {
                this.deleteEmptyChildren(t.children)
              }
          })
      },
      setAppList () {
        queryApps().then(res => {
            if (res.code === 0) {
              this.appList = res.result
              if (this.formModel.appId === '') this.formModel.appId = res.result[0].resourceId
            }
        })
      },
      setResourceTree () {
        let params = {resourceId: this.formModel.appId}
        getResourceTree(params).then(res => {
          if (res.code === 0) {
            this.deleteEmptyChildren(res.result)
            this.resourceTree = res.result
          }
        })
      },
      getIndeterminateNodes (nodes, treeNodes) {
        treeNodes.forEach(c => {
            if (c.$options._componentTag === 'Tree-node') {
              if (c.indeterminate) {
                  nodes.push(c.data)
              }
              if (c.$children && c.$children.length > 0) {
                this.getIndeterminateNodes(nodes, c.$children)
              }
            }
        })
      },
      setResourceIds () {
        let _nodes = []
        this.getIndeterminateNodes(_nodes, this.$refs['resourceTree'].$children)
        _nodes = _nodes.concat(this.$refs['resourceTree'].getCheckedNodes())
        let _ids = ''
        _nodes.forEach(n => {
            _ids = _ids + ',' + n.resource.resourceId
        })
        _ids = _ids.replace(',', '')
        this.formModel.resourceIds = _ids
      }
    },
    mounted () {
      this.setAppList()
      if (this.routeQuery.roleId) {
        this.initFormModel()
      }
    }
  }
</script>

<style scoped>
  .test-input{
    width: 600px!important;
  }
  .test-select{
    width: calc(600px - 83px)!important;
  }
  .test-select2{
    width: 70px!important;
  }
</style>
