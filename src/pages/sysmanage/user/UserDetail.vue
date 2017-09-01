<template>
  <div>
    <div class="row title-row">
      <div class="col-md-1 first-col">
        <p class="page-title">用户信息</p>
      </div>
      <div class="col-md-2">
        <c-go-back></c-go-back>
      </div>
      <div class="col-md-7">
      </div>
      <div class="col-md-2">
        <Button @click="grantUser" icon="settings" v-if="auth.sys_manage_user_grant">分配角色</Button>
      </div>
    </div>
    <div class="row" style="padding: 15px 0px 15px 0px;">
      <div class="col-md-4 first-col">
        <span style="font-size: 20px">{{userData.name}}({{userData.userName}})</span>
      </div>
    </div>
    <div class="row">
      <div class="modelInfo">
        <ul>
          <li style="width: 100%">
            <p class="label-name">城市</p>
            <p class="label-value">{{userData.city}}</p>
          </li>
          <li style="width: 100%">
            <p class="label-name">部门</p>
            <p class="label-value">{{userData.department}}</p>
          </li>
          <li style="width: 100%">
            <p class="label-name">角色</p>
            <p class="label-value">
              <Table border :columns="tableColumns" :data="userData.roles" ></Table>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserById} from '../api/sysmanage'

  export default {
      data () {
        return {
          auth: {},
          routeQuery: this.$route.query,
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
                          query: {roleId: this.userData.roles[params.index].roleId}
                        })
                      }
                    }
                  }, params.row.name)
                ])
              }
            }
          ],
          userData: {}
        }
      },
      methods: {
        grantUser () {
          this.$router.push({
            path: '/sys-manage/user/grant',
            query: {userId: this.routeQuery.userId}
          })
        },
        setUserData () {
          getUserById({userId: this.routeQuery.userId}).then(res => {
            if (res.code === 0) {
              this.userData = res.result
            }
          })
        }
      },
      mounted () {
        this.getPageAuth('sys_manage_user_grant').then(res => { this.auth = res })
        this.setUserData()
      }
  }
</script>

<style>

</style>
