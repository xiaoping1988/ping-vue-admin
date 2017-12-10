<template>
  <div class="p-full-page">
    <div class="jsp-develop-title">
      <span>
        {{routerQuery.sceneName}}
      </span>
    </div>
    <div class="jsp-develop-left">
      <el-tree
        :data="nodeTree"
        :props="defaultProps"
        default-expand-all
        :render-content="renderNodeTreeLabel"
        class="jsp-node-tree">
      </el-tree>

    </div>
    <div class="jsp-develop-canvas">
      <div class="jsp-container" id="canvas"  @drop="drop($event)" @dragover="allowDrop($event)">
        <jsp-node v-for="node in jspnodes"
                       :id="node.nodeDomId"
                       :x="node.x"
                       :y="node.y"
                       :name="node.name"
                       :key="node.nodeDomId"
                       :jsplumb="jsplumb"
                       :class="{'jsp-selected': node.nodeDomId === selectNode.nodeDomId}"
                       :nodeCode="node.nodeCode"
                       @on-click="clickNode"
                       @on-remove="removeNode"/>
      </div>
      <div class="jsp-flow-tool">
        <el-button size="small" type="success">
          <i class="fa fa-1x fa-play-circle"></i>
          <span>运行</span>
        </el-button>
        <el-button size="small" type="primary" icon="el-icon-circle-check-outline" @click="saveFlow">保存</el-button>
        <el-button size="small" icon="el-icon-circle-close-outline" @click="goBack()">关闭</el-button>
      </div>
    </div>
    <div class="jsp-develop-right">
      组件编辑区
      <br/>
      <br/>
      选中的组件对象:
      <br/>
      {{selectNode}}
      <br/>
      流程节点集合:
      <br/>
      {{nodes}}
    </div>
  </div>
</template>

<script>
  import {getSceneDefaultFlowNodes, getSceneFlowChart} from './api'
  import {getNodeTree, validNodeConnect} from '../../assets/js/jsPlumb'
  import 'jsplumb/dist/css/jsplumbtoolkit-defaults.css'
  import {Biltong, Katavorio, Mottle, jsBezier, jsPlumb, jsPlumbUtil} from 'jsplumb'

  export default {
    data () {
      return {
        routerQuery: this.$route.query,
        jsplumb: null,
        jspnodes: [],
        selectNode: {},
        nodes: [],
        nodeTree: getNodeTree(),
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      initJsPlumb () {
        let vue = this
        jsPlumb.ready(function () {
          vue.jsplumb = jsPlumb.getInstance({
            Endpoint: ['Dot', {radius: 2}],
            Connector: ['Bezier', { curviness: 100 }],
            connectorStyle: {stroke: '#5c96bc', strokeWidth: 2, outlineStroke: 'transparent', outlineWidth: 4},
            HoverPaintStyle: {stroke: '#1e8151', strokeWidth: 2, outlineStroke: 'transparent', outlineWidth: 4},
            Container: 'canvas',
            Anchors: ['Top', 'Bottom'],
            ConnectionOverlays: [
              ['Arrow', {
                location: 1,
                id: 'arrow',
                width: 9,
                length: 11,
                foldback: 0.8
              }]
            ]
          })
          vue.jsplumb.bind('click', vue.deleteConnect)
          vue.jsplumb.bind('connection', vue.connectNode)

          if (vue.routerQuery.add.toString() === '0') { // 新增
            vue.jspnodes = getSceneDefaultFlowNodes()
          } else { // 修改
            getSceneFlowChart({sceneId: vue.routerQuery.sceneId}).then(res => {
              vue.jspnodes = res.result
            }).catch(vue.handleError)
          }
        })
      },
      deleteConnect (info) {
        let vue = this
        for (let index in vue.jspnodes) {
          if (vue.jspnodes[index].nodeDomId === info.sourceId) {
            vue.jspnodes[index].children.splice(vue.jspnodes[index].children.indexOf(info.targetId), 1)
            break
          }
        }
        vue.jsplumb.deleteConnection(info)
      },
      connectNode (info) {
        let vue = this
        // 禁止自连接
        if (info.sourceId === info.targetId) {
          vue.jsplumb.deleteConnection(info.connection)
          vue.messageWarn('禁止自连接!')
          return
        }

        // 连接对象约束
        let sourceNodeCode, targetNodeCode
        vue.jspnodes.forEach(n => {
          if (n.nodeDomId === info.sourceId) {
            sourceNodeCode = n.nodeCode
          }
          if (n.nodeDomId === info.targetId) {
            targetNodeCode = n.nodeCode
          }
        })

        let valid = validNodeConnect(sourceNodeCode, targetNodeCode)
        if (valid.code === 1) {
          vue.jsplumb.deleteConnection(info.connection)
          vue.messageWarn(valid.msg)
          return
        }

        // 重复连接,只保留一个
        let connections = vue.jsplumb.getConnections()
        let _conns = connections.filter(c => (c.sourceId + c.targetId) === (info.sourceId + info.targetId) || (c.targetId + c.sourceId) === (info.sourceId + info.targetId))
        if (_conns && _conns.length > 1) {
          _conns.forEach((c, i) => {
            if (i > 0) {
              vue.jsplumb.deleteConnection(c)
            }
          })
          return
        }

        // 更新依赖
        for (let index in vue.jspnodes) {
          // source节点增加child
          if (vue.jspnodes[index].nodeDomId === info.sourceId) {
            if (!vue.jspnodes[index].children.includes(info.targetId)) {
              vue.jspnodes[index].children.push(info.targetId)
            }
          }
          // target节点增加parent
          if (vue.jspnodes[index].nodeDomId === info.targetId) {
            if (!vue.jspnodes[index].parents.includes(info.sourceId)) {
              vue.jspnodes[index].parents.push(info.sourceId)
            }
          }
        }
      },
      clickNode (elid) {
        let vue = this
        for (let index in vue.jspnodes) {
          if (vue.jspnodes[index].nodeDomId === elid) {
            let dom = document.getElementById(elid)
            vue.jspnodes[index].x = dom.offsetLeft
            vue.jspnodes[index].y = dom.offsetTop
            vue.selectNode = vue.jspnodes[index]
            break
          }
        }
      },
      removeNode (elid) {
        let vue = this
        // 删除连接线和端点
        vue.jsplumb.deleteConnectionsForElement(elid)
        let endpoints = vue.jsplumb.getEndpoints(elid)
        endpoints.forEach(e => vue.jsplumb.deleteEndpoint(e))

        // 更新依赖
        for (let index in vue.jspnodes) {
          // 删除此节点
          if (vue.jspnodes[index].nodeDomId === elid) {
            vue.jspnodes.splice(index, 1)
          }
          // 此节点的父节点删除child
          let childIndex = vue.jspnodes[index].children.indexOf(elid)
          if (childIndex >= 0) {
            vue.jspnodes[index].children.splice(childIndex, 1)
          }
          // 此节点的子节点删除parent
          let parentIndex = vue.jspnodes[index].parents.indexOf(elid)
          if (parentIndex >= 0) {
            vue.jspnodes[index].parents.splice(parentIndex, 1)
          }
        }
      },
      drag (e, node) {
        e.dataTransfer.setData('node', JSON.stringify(node))
      },
      drop (e) {
        e.preventDefault()
        let node = JSON.parse(e.dataTransfer.getData('node'))
        this.jspnodes.push({nodeCode: node.code, nodeDomId: 'jspnode_' + new Date().getTime() + '_' + this.jspnodes.length, name: node.label, x: e.offsetX, y: e.offsetY, children: [], parents: []})
      },
      allowDrop (e) {
        e.preventDefault()
      },
      saveFlow () {
        this.jspnodes.forEach(n => {
          let dom = document.getElementById(n.nodeDomId)
          n.x = dom.offsetLeft
          n.y = dom.offsetTop
        })
        this.nodes = this.jspnodes
      },
      renderNodeTreeLabel (h, { node, data, store }) {
        if (data.isLeaf) {
          return (<span draggable="true" on-dragstart={ ($event) => this.drag($event, data) }>
        <i class={'fa fa-1x fa-' + data.icon}></i>
            <span>{node.label}</span>
          </span>)
        } else {
          return (<span>
        <i class={'fa fa-1x fa-' + data.icon}></i>
            <span>{node.label}</span>
          </span>)
        }
      }
    },
    mounted () {
      this.initJsPlumb()
    },
    updated () {
      let vue = this
      vue.$nextTick(function () {
        vue.jsplumb.batch(function () {
          vue.jspnodes.forEach(n => {
            if (n.children && n.children.length > 0) {
              n.children.forEach(c => {
//                vue.jsplumb.connect({ uuids: [n.nodeDomId + '0', c + '1'] })
                vue.jsplumb.connect({ source: n.nodeDomId, target: c })
              })
            }
          })
        })
      })
    }
  }
</script>

<style scoped>

</style>
