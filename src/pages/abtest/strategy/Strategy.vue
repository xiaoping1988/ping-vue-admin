<template>
  <div>
    <div class="row">
      <p class="page-title">策略测试</p>
    </div>
    <div class="row search-form">
      <div class="col-md-10 first-col">
        <p class="search-title">分类：</p>
        <Radio-group v-model="categoryId" type="button" @on-change="changeCategoryId">
          <Radio v-for="category in categorys" :label="category.categoryId" :key="category">{{category.categoryName}}</Radio>
        </Radio-group>
      </div>
      <div class="col-md-2 last-col">
        <Button long @click="createStrategy" type="primary" icon="plus-round" v-if="auth.ab_test_strategy_create">创建测试</Button>
      </div>
    </div>
    <Table border :columns="tableColumns" :data="pageList.list" >
    </Table>
    <div style="margin: 10px 10px 0 0; overflow: hidden">
      <div style="float: right;">
        <Page :total="pageList.amount" :current="pageList.page" :page-size="pageList.pageSize" @on-change="changePage" show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import { queryStrategy, deleteStrategy, categorys } from '../api/abtest'

  export default {
    data () {
      return {
        auth: {},
        categorys: categorys,
        categoryId: 1,
        tableColumns: [
          {
            title: '测试名称',
            key: 'testName',
            render: (h, params) => {
              return h('div', [
                  h('a', {
                    on: {
                      click: () => {
                        this.$router.push({
                          path: '/ab-test/strategy/detail',
                          query: {id: this.pageList.list[params.index].id, categoryId: this.pageList.list[params.index].categoryId}
                        })
                      }
                    }
                  }, params.row.testName)
              ])
            }
          },
          { title: '创建人', key: 'creator' },
          {
            title: '创建时间',
            key: 'createTime',
            render: (h, params) => {
              return h('c-format-date', { props: { val: params.row.createTime } })
            }
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              let btns = []
              if (this.auth.ab_test_strategy_delete) {
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
                          content: '确认删除记录[' + params.row.testName + ']',
                          onOk: () => {
                            deleteStrategy({id: this.pageList.list[params.index].id}).then(data => {
                              if (data.code === 0) {
                                this.query()
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
              return h('div', btns);
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
        query () {
          let params = {categoryId: this.categoryId, page: this.pageList.page, pageSize: this.pageList.pageSize}
          queryStrategy(params).then(data => {
              if (data.code === 0) {
                  this.pageList.amount = data.result.amount
                  this.pageList.list = data.result.list
              } else {
                  this.$Modal.warning({title: '提示', content: data.msg})
              }
          })
        },
        changePage (_page) {
          this.pageList.page = _page
          this.query()
        },
        changeCategoryId () {
          this.pageList.page = 1
          this.query()
        },
        createStrategy () {
          this.$router.push('/ab-test/strategy/create-or-update')
        }
    },
    mounted () {
      this.getPageAuth('ab_test_strategy_create,ab_test_strategy_delete').then(res => { this.auth = res })
      this.query()
      this.$Notice.config({
        top: 150
      })
    }
  }
</script>

<style scoped>

</style>
