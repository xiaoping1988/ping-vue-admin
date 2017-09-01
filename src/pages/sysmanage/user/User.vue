<template>
  <div>
    <div class="row">
      <p class="page-title">用户管理</p>
    </div>
    <div class="row search-form">
      <c-input-search entered remote :remote-method="queryData" style="width: 300px;" placeholder="输入姓名或账号,回车查询" v-model="searchName"></c-input-search>
    </div>
    <div class="row">
      <Table border :columns="tableColumns" :data="pageList.list" >
      </Table>
      <div style="margin: 10px 10px 0 0; overflow: hidden">
        <div style="float: right;">
          <Page :total="pageList.amount" :current="pageList.page" :page-size="pageList.pageSize" @on-change="changePage" show-total></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryUserList} from '../api/sysmanage'

  export default {
      data () {
        return {
          auth: {},
          searchName: '',
          tableColumns: [
            {
              title: '用户名',
              key: 'name',
              render: (h, params) => {
                return h('div', [
                  h('a', {
                    on: {
                      click: () => {
                        this.$router.push({
                          path: '/sys-manage/user/detail',
                          query: {userId: this.pageList.list[params.index].userId}
                        })
                      }
                    }
                  }, params.row.name + '(' + this.pageList.list[params.index].userName + ')')
                ])
              }
            },
            {
              title: '部门',
              key: 'department',
              width: 400
            },
            {
              title: '城市',
              key: 'city',
              width: 100
            },
            {
              title: '操作',
              key: 'action',
              render: (h, params) => {
                let btns = []
                if (this.auth.sys_manage_user_grant) {
                  btns.push(h('Button', {
                    props: {
                      type: 'info',
                      size: 'small',
                      icon: 'settings'
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: '/sys-manage/user/grant',
                          query: {userId: this.pageList.list[params.index].userId}
                        })
                      }
                    }
                  }, '分配角色'))
                }
                return h('div', btns)
              }
            }
          ],
          pageList: {
            amount: 0,
            page: 1,
            pageSize: 10,
            list: []
          }
        }
      },
      methods: {
          queryData (query) {
            this.pageList.page = 1
            this.pageList.pageSize = 10
            this.queryUsers()
          },
          queryUsers () {
            let params = {name: this.searchName, page: this.pageList.page, pageSize: this.pageList.pageSize}
            queryUserList(params).then(res => {
              if (res.code === 0) {
                this.pageList.amount = res.result.amount
                this.pageList.list = res.result.list
              }
            })
          },
          changePage (_page) {
            this.pageList.page = _page
            this.queryUsers()
          }
      },
      mounted () {
          this.getPageAuth('sys_manage_user_grant').then(res => { this.auth = res })
          this.queryUsers()
      }
  }
</script>

<style>

</style>
