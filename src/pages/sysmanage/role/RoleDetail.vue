<template>
  <div>
    <div class="row title-row">
      <div class="col-md-1 first-col">
        <p class="page-title">角色信息</p>
      </div>
      <div class="col-md-2">
        <c-go-back></c-go-back>
      </div>
      <div class="col-md-7">
      </div>
      <div class="col-md-2">
        <Button @click="updateRole" icon="edit" v-if="auth.sys_manage_role_update">编辑角色</Button>
      </div>
    </div>
    <div class="row" style="margin-top: 10px">
      <div class="modelInfo">
        <ul>
          <li style="width: 100%">
            <p class="label-name">角色名称</p>
            <p class="label-value">{{roleData.name}}</p>
          </li>
          <li style="width: 100%">
            <p class="label-name">角色描述</p>
            <p class="label-value">{{roleData.desc}}</p>
          </li>
          <li style="width: 100%">
            <p class="label-name">所属系统</p>
            <p class="label-value">{{roleData.appName}}</p>
          </li>
          <li style="width: 100%">
            <p class="label-name">关联资源</p>
            <p class="label-value">
              <Tree :data="resourceTree" @on-select-change="clickTreeNode"></Tree>
            </p>
          </li>
          <li style="width: 100%">
            <p class="label-name">关联用户</p>
            <p class="label-value">
              <Table border :columns="tableColumns" :data="roleData.users" ></Table>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getRoleById} from '../api/sysmanage'

  export default {
      data () {
        return {
          auth: {},
          routeQuery: this.$route.query,
          tableColumns: [
            {
              title: '用户姓名',
              key: 'name',
              render: (h, params) => {
                return h('div', [
                  h('a', {
                    on: {
                      click: () => {
                        this.$router.push({
                          path: '/sys-manage/user/detail',
                          query: {userId: this.roleData.users[params.index].userId}
                        })
                      }
                    }
                  }, params.row.name + '(' + this.roleData.users[params.index].userName + ')')
                ])
              }
            },
            {
              title: '部门',
              key: 'department'
            }
          ],
          roleData: {},
          resourceTree: []
        }
      },
      methods: {
        updateRole () {
          this.$router.push({
            path: '/sys-manage/role/create-or-update',
            query: {roleId: this.routeQuery.roleId}
          })
        },
        deleteEmptyChildrenAndUpdateTitle (tree) {
          let delIndex = []
          tree.forEach((t, index) => {
            t.title = '<a>' + t.title + '</a>'
            if (t.children == null || t.children.length === 0) {
              delete t.children
            } else {
              this.deleteEmptyChildrenAndUpdateTitle(t.children)
            }
            if (!t.checked && (t.children == null || t.children.length === 0)) {
              delIndex.push(index)
            }
          })
//          if (delIndex.length > 0) {
//            let count = 0
//            delIndex.sort()
//            delIndex.forEach(i => {
//              tree.splice(i - count, 1)
//              count = count + 1
//            })
//          }
        },
        setRoleData () {
          getRoleById({roleId: this.routeQuery.roleId}).then(res => {
            if (res.code === 0) {
              this.roleData = res.result
              let _tree = [res.result.resourceTree]
              this.deleteEmptyChildrenAndUpdateTitle(_tree)
              this.resourceTree = _tree
            }
          })
        },
        clickTreeNode (nodes) {
          let node = nodes[0]
          this.$router.push({
            path: '/sys-manage/resource',
            query: {resourceId: node.resource.resourceId}
          })
        }
      },
      mounted () {
        this.getPageAuth('sys_manage_role_update').then(res => { this.auth = res })
        this.setRoleData()
      }
  }
</script>

<style>

</style>
