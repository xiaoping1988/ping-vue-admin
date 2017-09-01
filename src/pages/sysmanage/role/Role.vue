<template>
  <div>
    <div class="row">
      <p class="page-title">角色管理</p>
    </div>
    <div class="row search-form">
      <div class="col-md-10">
      </div>
      <div class="col-md-2 last-col">
        <Button long @click="createRole" type="primary" icon="plus-round" v-if="auth.sys_manage_role_create">创建角色</Button>
      </div>
    </div>
    <div class="row">
      <Table border :columns="tableColumns" :data="pageList" >
      </Table>
    </div>
  </div>
</template>

<script>
  import {queryRoleList, deleteRoleById} from '../api/sysmanage'

  export default {
    data () {
      return {
        auth: {},
        searchName: '',
        tableColumns: [
          {
            title: '角色名称',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({
                        path: '/sys-manage/role/detail',
                        query: {roleId: this.pageList[params.index].roleId}
                      })
                    }
                  }
                }, params.row.name)
              ])
            }
          },
          { title: '所属系统', key: 'appName' },
//          { title: '修改人', key: 'updator' },
          {
            title: '修改时间',
            key: 'updateTime',
            render: (h, params) => {
              return h('c-format-date', { props: { val: params.row.updateTime } })
            }
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              let btns = []
              if (this.auth.sys_manage_role_update) {
                btns.push(h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: '/sys-manage/role/create-or-update',
                        query: {roleId: this.pageList[params.index].roleId}
                      })
                    }
                  }
                }, '编辑'))
              }
              if (this.auth.sys_manage_role_delete) {
                btns.push(h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'trash-a'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确认',
                        content: '确认删除记录[系统:' + params.row.appName + ',角色:' + params.row.name + ']',
                        onOk: () => {
                          deleteRoleById({roleId: this.pageList[params.index].roleId}).then(data => {
                            if (data.code === 0) {
                              this.queryRoles()
                            } else {
                              this.$Notice.error({
                                title: '错误提示',
                                desc: data.result
                              });
                            }
                          })
                        }
                      })
                    }
                  }
                }, '删除'))
              }
              return h('div', btns)
            }
          }
        ],
        pageList: []
      }
    },
    methods: {
      queryRoles () {
        queryRoleList().then(res => {
          if (res.code === 0) {
            this.pageList = res.result
          }
        })
      },
      createRole () {
        this.$router.push('/sys-manage/role/create-or-update')
      }
    },
    mounted () {
      this.getPageAuth('sys_manage_role_create,sys_manage_role_update,sys_manage_role_delete').then(res => { this.auth = res })
      this.queryRoles()
    }
  }
</script>

<style>

</style>
