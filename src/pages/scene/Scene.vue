<template>
  <c-layout-no-side>
    <div class="p-scene-list">
      <div class="p-scene-panel p-scene-add p-middle" @click="openSceneAddDialog">
        <div>
          <i class="fa fa-4x fa-plus-circle"></i>
          <br/>
          <span>新建实验</span>
        </div>
      </div>
      <div v-for="(scene, index) in sceneList" :key="scene.id" class="p-scene-panel p-scene-item">
        <div class="p-scene-item-data">
          <div class="p-scene-item-title">
            {{scene.name}}
          </div>
          <div class="p-scene-item-icon">
            <i class="fa fa-4x fa-cubes"></i>
          </div>
          <div class="p-scene-item-detail p-scene-item-desc">
            {{scene.description}}
          </div>
          <div class="p-scene-item-detail p-scene-item-bottom">
            <span>{{scene.creator}}</span>
            <br/>
            <c-format-date :val="scene.createtime"></c-format-date>
          </div>
        </div>
        <div class="p-scene-item-action p-middle">
          <div>
            <div class="p-scene-item-action-button">
              <el-button size="mini" @click="openSceneDevelop(scene.id, scene.name, 1)">
                <i class="fa fa-1x fa-sitemap"></i>
                <span>进入实验</span>
              </el-button>
            </div>
            <div class="p-scene-item-action-button">
              <el-button size="mini" @click="openSceneUpdateDialog(scene, index)">
                <i class="fa fa-1x fa-pencil"></i>
                <span>编辑描述</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="hasMore" class="p-scene-panel p-scene-loadmore" @click="loadMore">
        加载更多
      </div>
    </div>
    <el-dialog
      :title="sceneDialogTitle"
      :visible.sync="sceneDialogVisible"
      width="30%">
      <el-form :model="sceneForm" :rules="sceneFormRule" ref="sceneForm" label-width="80px">
        <el-form-item label="场景名称" prop="name">
          <el-input v-model="sceneForm.name"></el-input>
        </el-form-item>
        <el-form-item label="场景描述" prop="description">
          <el-input v-model="sceneForm.description"></el-input>
        </el-form-item>
      </el-form>
      <c-form-button @on-submit="submitScene" @on-cancel="sceneDialogVisible = false"/>
    </el-dialog>
  </c-layout-no-side>
</template>

<script>
  import {listScene, saveOrUpdateScene} from './api'

  export default {
    data () {
      return {
        page: 1,
        pageSize: 10,
        hasMore: true,
        updateIndex: -1,
        sceneList: [],
        sceneDialogTitle: '创建场景',
        sceneDialogVisible: false,
        sceneForm: {
          id: '',
          name: '',
          description: ''
        },
        sceneFormRule: {
          name: [
            {required: true, message: '请输入场景名称', trigger: 'blur'},
            {max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'}
          ],
          description: [
            {max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      pushSceneList () {
        let vue = this
        let params = {page: vue.page, pageSize: vue.pageSize}
        listScene(params).then(res => {
          vue.sceneList = vue.sceneList.concat(res.result)
          vue.hasMore = res.result.length === vue.pageSize
        }).catch(this.handleError)
      },
      loadMore () {
        this.page++
        this.pushSceneList()
      },
      initSceneList () {
        this.page = 1
        this.sceneList = []
        this.pushSceneList()
      },
      submitScene () {
        let vue = this
        vue.$refs['sceneForm'].validate((valid) => {
          if (valid) {
            saveOrUpdateScene(vue.sceneForm).then(res => {
              vue.sceneDialogVisible = false
              if (vue.sceneForm.id === '') { // 新增
                vue.openSceneDevelop(res.result.id, res.result.name, 0)
              } else { // 编辑描述
                if (vue.sceneList[vue.updateIndex]) {
                  vue.sceneList[vue.updateIndex].name = vue.sceneForm.name
                  vue.sceneList[vue.updateIndex].description = vue.sceneForm.description
                }
              }
            }).catch(this.handleError)
          }
        })
      },
      openSceneDevelop (sceneId, sceneName, addOrUpdate) {
        this.$router.push({
          path: '/scene/develop',
          query: {sceneId: sceneId, sceneName: sceneName, add: addOrUpdate}
        })
      },
      openSceneAddDialog () {
        this.sceneForm = {id: '', name: '', description: ''}
        this.sceneDialogVisible = true
      },
      openSceneUpdateDialog (scene, index) {
        this.updateIndex = index
        this.sceneForm = {id: scene.id, name: scene.name, description: scene.description}
        this.sceneDialogTitle = '编辑场景'
        this.sceneDialogVisible = true
      }
    },
    mounted () {
      this.initSceneList()
    }
  }
</script>

<style>

</style>
