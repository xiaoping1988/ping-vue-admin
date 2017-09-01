<template>
  <div>
    <div class="row title-row">
      <div class="col-md-1 first-col">
        <p class="page-title">分配角色</p>
      </div>
      <div class="col-md-2">
        <c-go-back></c-go-back>
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
              <Transfer
                :data="allRoles"
                :targetKeys="targetRoleIds"
                :list-style="{width: '300px', height: '340px'}"
                :titles="['可分配角色','已有角色']"
                :operations="['移除', '分配']"
                filterable
                @on-change="grant">
              </Transfer>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserById, grantRoles, queryRoleList} from '../api/sysmanage'

  export default {
    data () {
      return {
        routeQuery: this.$route.query,
        userData: {},
        allRoles: [],
        targetRoleIds: []
      }
    },
    methods: {
      grant (newTargetKeys) {
        grantRoles({userId: this.userData.userId, roleIds: newTargetKeys.toString()}).then(res => {
          if (res.code === 0) {
            this.targetRoleIds = newTargetKeys
          } else {
            this.$Notice.error({
              title: '错误提示',
              desc: res.msg
            })
          }
        })
      },
      setUserData () {
        getUserById({userId: this.routeQuery.userId}).then(res => {
          if (res.code === 0) {
            this.userData = res.result
            res.result.roles.forEach(r => {
              this.targetRoleIds.push(r.roleId)
            })
          }
        })
        queryRoleList().then(res => {
          if (res.code === 0) {
            res.result.forEach(r => {
              this.allRoles.push({
                key: r.roleId,
                label: r.appName + '-' + r.name
              })
            })
          }
        })
      }
    },
    mounted () {
      this.setUserData()
    }
  }
</script>

<style>

</style>
