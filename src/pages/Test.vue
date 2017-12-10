<template>
  <div class="p-full-page">
    <div class="jsp-develop-left">
      组件区域
      <el-tree
        :data="nodeTree"
        :props="defaultProps"
        default-expand-all
        accordion
        :render-content="renderNodeTreeLabel"
        class="jsp-node-tree">
      </el-tree>

    </div>
    <div class="jsp-develop-canvas">
      <div class="jsp-container" id="canvas"  @drop="drop($event)" @dragover="allowDrop($event)">
        <jsp-node-test v-for="node in jspnodes"
                  :id="node.nodeId"
                  :x="node.x"
                  :y="node.y"
                  :name="node.name"
                  :key="node.nodeId"
                  :jsplumb="jsplumb"
                  :class="{'jsp-selected': node.nodeId === selectNode.nodeId}"
                  :nodeId="node.nodeTypeId"
                  @on-click="clickNode"
                  @on-remove="removeNode"/>
      </div>
      <div class="jsp-flow-tool">
        <el-button size="small" type="success">
          <i class="fa fa-1x fa-play-circle"></i>
          <span>运行</span>
        </el-button>
        <el-button size="small" type="primary" icon="el-icon-circle-check-outline" @click="saveFlow">保存</el-button>
        <el-button size="small" icon="el-icon-circle-close-outline">关闭</el-button>
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
  import {getNodeTree} from '../assets/js/jsPlumb2'
  import JspNodeTest from './JspNodeTest.vue'
  import 'jsplumb/dist/css/jsplumbtoolkit-defaults.css'
  import {Biltong, Katavorio, Mottle, jsBezier, jsPlumb, jsPlumbUtil} from 'jsplumb'

  export default {
    components: {JspNodeTest},
    data () {
      return {
        jsplumb: null,
        jspnodes: [
          {nodeTypeId: 2, nodeId: 'jspnode_1', name: 'node1', x: 500, y: 20, parents: [], children: ['jspnode_2', 'jspnode_3']},
          {nodeTypeId: 6, nodeId: 'jspnode_2', name: 'node2', x: 400, y: 200, parents: ['jspnode_1'], children: ['jspnode_4']},
          {nodeTypeId: 11, nodeId: 'jspnode_3', name: 'node3', x: 300, y: 300, parents: ['jspnode_1', 'jspnode_4'], children: []},
          {nodeTypeId: 7, nodeId: 'jspnode_4', name: 'node4', x: 200, y: 200, parents: ['jspnode_2'], children: ['jspnode_3']}
        ],
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

//          vue.jsplumb.registerConnectionType('basic', { anchor: 'Continuous', connector: 'Bezier' })

          vue.jsplumb.bind('click', function (info) {
            for (let index in vue.jspnodes) {
              if (vue.jspnodes[index].nodeId === info.sourceId) {
                vue.jspnodes[index].children.splice(vue.jspnodes[index].children.indexOf(info.targetId), 1)
                break
              }
            }
            vue.jsplumb.deleteConnection(info)
          })

          vue.jsplumb.bind('connection', function (info) {
            // 禁止自连接
            if (info.sourceId === info.targetId) {
              vue.jsplumb.deleteConnection(info.connection)
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
              if (vue.jspnodes[index].nodeId === info.sourceId) {
                if (!vue.jspnodes[index].children.includes(info.targetId)) {
                  vue.jspnodes[index].children.push(info.targetId)
                }
              }
              // target节点增加parent
              if (vue.jspnodes[index].nodeId === info.targetId) {
                if (!vue.jspnodes[index].parents.includes(info.sourceId)) {
                  vue.jspnodes[index].parents.push(info.sourceId)
                }
              }
            }
          })
        })
      },
      clickNode (elid) {
        let vue = this
        for (let index in vue.jspnodes) {
          if (vue.jspnodes[index].nodeId === elid) {
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
          if (vue.jspnodes[index].nodeId === elid) {
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
        this.jspnodes.push({nodeTypeId: node.id, nodeId: 'jspnode_' + new Date().getTime() + '_' + this.jspnodes.length, name: node.label, x: e.offsetX, y: e.offsetY, children: [], parents: []})
      },
      allowDrop (e) {
        e.preventDefault()
      },
      saveFlow () {
        this.jspnodes.forEach(n => {
          let dom = document.getElementById(n.nodeId)
          n.x = dom.offsetLeft
          n.y = dom.offsetTop
        })
        this.nodes = this.jspnodes
      },
      renderNodeTreeLabel (h, { node, data, store }) {
        return (<span draggable="true" on-dragstart={ ($event) => this.drag($event, data) }>
          <i class={'fa fa-1x fa-' + data.icon}></i>
          <span>{node.label}</span>
        </span>)
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
//                vue.jsplumb.connect({ uuids: [n.nodeId + '0', c + '1'] })
                vue.jsplumb.connect({ source: n.nodeId, target: c })
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
