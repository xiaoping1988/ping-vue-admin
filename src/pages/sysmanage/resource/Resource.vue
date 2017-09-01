<template>
  <div>
    <div class="row">
      <p class="page-title">资源管理</p>
    </div>
    <div class="row search-form">
      <div class="col-md-2 first-col">
        <Button @click="createRootResource" type="primary" icon="plus-round" v-if="auth.sys_manage_resource_create">创建根资源</Button>
      </div>
      <div class="col-md-10">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 modelInfo">
        <Tree :data="resourceTree" class="my-tree" @on-select-change="selectNode"></Tree>
      </div>
      <div class="col-md-10" v-if="selectResource.resourceId">
        <div class="modelInfo">
          <div class="row">
            <div class="col-md-2">
              <p class="page-title" style="margin: 0px">{{selectResource.name}}</p>
            </div>
            <div class="col-md-7">
            </div>
            <div class="col-md-3">
              <a style="margin-right: 15px" @click="addChildResource" v-if="auth.sys_manage_resource_create">添加子资源</a>
              <a style="margin-right: 15px" @click="updateResource" v-if="auth.sys_manage_resource_update">编辑</a>
              <a style="margin-right: 15px" @click="deleteResource" v-if="auth.sys_manage_resource_delete">删除</a>
            </div>
          </div>
          <hr style="margin:0px;"/>
          <ul>
            <li style="width: 47%">
              <p class="label-name">资源ID</p>
              <p class="label-value">{{selectResource.resourceId}}</p>
            </li>
            <li style="width: 47%">
              <p class="label-name">页面元素ID</p>
              <p class="label-value">{{selectResource.pageId}}</p>
            </li>
            <li style="width: 47%">
              <p class="label-name">前端路由</p>
              <p class="label-value">{{selectResource.pageRouter}}</p>
            </li>
            <li style="width: 47%">
              <p class="label-name">后端API</p>
              <p class="label-value">{{selectResource.apiUrl}}</p>
            </li>
            <li style="width: 47%">
              <p class="label-name">创建人</p>
              <p class="label-value">{{selectResource.creatorName}}</p>
            </li>
            <li style="width: 47%">
              <p class="label-name">创建时间</p>
              <p class="label-value"><c-format-date :val="selectResource.ctime"></c-format-date></p>
            </li>
            <li style="width: 47%">
              <p class="label-name">修改人</p>
              <p class="label-value">{{selectResource.modifiorName}}</p>
            </li>
            <li style="width: 47%">
              <p class="label-name">修改时间</p>
              <p class="label-value"><c-format-date :val="selectResource.utime"></c-format-date></p>
            </li>
            <li style="width: 100%">
              <p class="label-name">关联角色</p>
              <p class="label-value">
                <Table border :columns="tableColumns" :data="selectResource.roles" ></Table>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal1"
      :title="modalTitle">
      <Form ref="formModel" :model="formModel" :rules="formModelRule" inline>
        <div class="formInfo">
          <ul class="formUl">
            <li v-if="formModel.pid !== '' && !formModel.resourceId" style="width: 100%;">
              <p class="label-name">上级资源</p>
              <p class="label-value" style="margin-top: 13px;">{{selectResource.name}}</p>
            </li>
            <li style="width: 100%;">
              <p class="label-name">资源名称</p>
              <p class="label-value">
                <Form-item prop="name">
                  <Input class="my-input test-input" type="text" v-model.trim="formModel.name" placeholder="最多20个字符">
                  </Input>
                </Form-item>
              </p>
            </li>
            <li style="width: 100%;">
              <p class="label-name">页面元素ID</p>
              <p class="label-value">
                <Form-item prop="pageId">
                  <Input class="my-input test-input" type="text" v-model.trim="formModel.pageId" placeholder="最多50个字符">
                  </Input>
                </Form-item>
              </p>
            </li>
            <li style="width: 100%;">
              <p class="label-name">前端路由</p>
              <p class="label-value">
                <Form-item prop="pageRouter">
                  <Input class="my-input test-input" type="text" v-model.trim="formModel.pageRouter" placeholder="最多100个字符">
                  </Input>
                </Form-item>
              </p>
            </li>
            <li style="width: 100%;">
              <p class="label-name">后端API</p>
              <p class="label-value">
                <Form-item prop="apiUrl">
                  <Input class="my-input test-input" type="text" v-model.trim="formModel.apiUrl" placeholder="最多100个字符">
                  </Input>
                </Form-item>
              </p>
            </li>
            <li style="width: 100%;">
              <p class="label-name">排序号</p>
              <p class="label-value">
                <Form-item prop="sortNum">
                  <Input-number class="my-input test-input" type="text" v-model.trim="formModel.sortNum" placeholder="最多100个字符">
                  </Input-number>
                </Form-item>
              </p>
            </li>
          </ul>
        </div>
      </Form>
      <div slot="footer">
        <c-submit-button @on-submit="addOrUpdateResource" @on-cancel="closeModal" nohr ></c-submit-button>
      </div>
    </Modal>
    <!--<c-loading fix :loading="loading"></c-loading>-->
  </div>
</template>

<script>
  import {getResourceTree, getResourceById, deleteResourceById, addOrUpdateResource, checkRepeatPageId} from '../api/sysmanage'

  export default {
    data () {
      const validateRepeatPageId = (rule, value, callback) => {
        let params = {pageId: value}
        if (this.formModel.resourceId) params.resourceId = this.formModel.resourceId
        checkRepeatPageId(params).then(res => {
          if (res.code === 0) {
            callback()
          } else {
            callback(new Error('页面元素ID重复'))
          }
        })
      }
      return {
        auth: {},
        loading: true,
        modal1: false,
        modalTitle: '',
        routeQuery: this.$route.query,
        resourceTree: [],
        selectResource: {},
        tableColumns: [
          { title: '系统', key: 'appName' },
          {
            title: '角色',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({
                        path: '/sys-manage/role/detail',
                        query: {roleId: this.selectResource.roles[params.index].roleId}
                      })
                    }
                  }
                }, params.row.name)
              ])
            }
          }
        ],
        formOper: '',
        formModel: {
          name: '',
          pageId: '',
          pageRouter: '',
          apiUrl: '',
          pid: '',
          sortNum: 1
        },
        formModelRule: {
          name: [
            {required: true, message: '请填写资源名称', trigger: 'blur'},
            {type: 'string', max: 20, message: '资源名称最多20个字符', trigger: 'blur'},
            {type: 'string', pattern: /^[\u4e00-\u9fa5\-/\\_a-zA-Z0-9]*$/, message: '资源名称只能包含汉字、字母、数字、下划线或者"-"、"/"、"\\"字符', trigger: 'blur'}
          ],
          pageId: [
            {type: 'string', max: 50, message: '页面元素ID最多50个字符', trigger: 'blur'},
            {type: 'string', pattern: /^[A-Za-z]\w*$/, message: '页面元素ID只能包含字母、数字或者下划线且以字母开头', trigger: 'blur'},
            {validator: validateRepeatPageId, trigger: 'blur'}
          ],
          pageRouter: [
            {type: 'string', max: 100, message: '前端路由最多100个字符', trigger: 'blur'},
            {type: 'string', pattern: /^\/[A-Za-z0-9\\/\\-]*$/, message: '前端路由只能包含字母、数字、中划线或者斜杠且以斜杠开头', trigger: 'blur'}
          ],
          apiUrl: [
            {type: 'string', max: 100, message: '后端API最多100个字符', trigger: 'blur'},
            {type: 'string', pattern: /^\/[A-Za-z0-9\\/\\-]*$/, message: '后端API由只能包含字母、数字、中划线或者斜杠且以斜杠开头', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      convertTree (tree, resourceId) {
        let hasSelect = false
        tree.forEach(t => {
          if (resourceId && t.resource.resourceId === resourceId) {
            hasSelect = true
            t.selected = true
            this.setSelectResource(resourceId)
          }
          t.title = '<a class="tree-title" title="点击查看明细">' + t.title + '</a>'
          if (t.children == null || t.children.length === 0) {
            delete t.children
          } else {
            t.expand = this.convertTree(t.children, resourceId)
            if (t.expand) {
                hasSelect = true
            }
          }
        })
        return hasSelect
      },
      setResourceTree (resourceId) {
        this.loading = true
        getResourceTree().then(res => {
            this.loading = false
            if (res.code === 0) {
              if (!resourceId) resourceId = res.result[0].resource.resourceId
              this.convertTree(res.result, resourceId)
              this.resourceTree = res.result
            } else {
              this.$Notice.error({
                title: '错误提示',
                desc: res.msg
              })
            }
        })
      },
      emptyForm () {
        this.$refs['formModel'].resetFields()
        this.formModel = {
          name: '',
          pageId: '',
          pageRouter: '',
          apiUrl: '',
          pid: '',
          sortNum: 1
        }
      },
      createRootResource () {
        this.emptyForm()
        this.formModel.pid = ''
        this.modal1 = true
        this.modalTitle = '创建根资源'
      },
      addChildResource () {
        this.emptyForm()
        this.formModel.pid = this.selectResource.resourceId
        this.modal1 = true
        this.modalTitle = '添加子资源'
      },
      updateResource () {
        this.emptyForm()
        this.formModel.resourceId = this.selectResource.resourceId
        this.formModel.name = this.selectResource.name
        this.formModel.pageId = this.selectResource.pageId
        this.formModel.pageRouter = this.selectResource.pageRouter
        this.formModel.apiUrl = this.selectResource.apiUrl
        this.formModel.pid = this.selectResource.pid
        this.formModel.sortNum = this.selectResource.sortNum
        this.modal1 = true
        this.modalTitle = '编辑'
      },
      deleteResource () {
        this.$Modal.confirm({
          title: '确认',
          content: '确认删除记录[资源:' + this.selectResource.name + '及子孙资源]',
          onOk: () => {
            deleteResourceById({resourceId: this.selectResource.resourceId}).then(data => {
              if (data.code === 0) {
                let _pid = this.selectResource.pid
                if (_pid === '') _pid = undefined
                this.setResourceTree(_pid)
              } else {
                this.$Notice.error({
                  title: '错误提示',
                  desc: data.result
                });
              }
            })
          }
        })
      },
      selectNode (nodes) {
        if (nodes.length > 0) {
          this.setSelectResource(nodes[0].resource.resourceId)
        }
      },
      setSelectResource (resourceId) {
        getResourceById({resourceId: resourceId}).then(res => {
          if (res.code === 0) this.selectResource = res.result
        })
      },
      addOrUpdateResource () {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            addOrUpdateResource(this.formModel).then(res => {
              if (res.code === 0) {
                this.modal1 = false
                this.setResourceTree(res.result)
                this.$Notice.success({
                  title: '成功提示!',
                  desc: '提交成功!'
                })
              } else {
                this.modal1 = true
                this.$Notice.error({
                  title: '错误提示',
                  desc: res.msg
                })
              }
            })
          } else {
            this.modal1 = true
          }
        })
      },
      closeModal () {
        this.modal1 = false
        this.emptyForm()
      }
    },
    mounted () {
      this.getPageAuth('sys_manage_resource_create,sys_manage_resource_update,sys_manage_resource_delete').then(res => { this.auth = res })
      this.setResourceTree(this.routeQuery.resourceId)
    }
  }
</script>

<style scoped>
  .my-tree .ivu-tree-title{
    width: 100%!important;
  }
  .my-tree .ivu-tree-title:hover{
    /*background: none!important;*/
  }
  .tree-title {
    margin-right: 10px;
    margin-left: 10px;
  }
  .test-input{
    width: 300px!important;
  }
</style>
