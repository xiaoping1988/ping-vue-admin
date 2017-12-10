<template>
  <div class="jsp-node" :id="id" :style="{left: x + 'px', top: y + 'px'}">
    <div class="jsp-node-name" @click="clickNode">
      <div class="jsp-endpoint-circle jsp-endpoint-circle-top"></div>
      <span><i :class="iconClass"></i></span>
      <span>{{name}}</span>
      <div class="jsp-endpoint-circle jsp-endpoint-circle-bottom"></div>
    </div>
    <div class="jsp-node-remove" @click="removeNode">
      <span><i class="fa fa-1x fa-remove"></i></span>
    </div>
  </div>
</template>

<script>
  import {getNodeIcon} from '../../assets/js/jsPlumb'

  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      x: {
        type: Number,
        default: 10
      },
      y: {
        type: Number,
        default: 10
      },
      jsplumb: Object,
      nodeCode: [String, Number]
    },
    data () {
      return {
        endpointOptions: {
          maxConnections: -1
        }
      }
    },
    computed: {
      iconClass: function () {
        return 'fa fa-1x fa-' + getNodeIcon(this.nodeCode)
      }
    },
    methods: {
      addEndpoint () {
        if (!this.jsplumb) {
            return
        }
        this.jsplumb.draggable(this.id, {containment: 'parent'})
        let sourceEndpointOptions = {
          Endpoint: ['Dot', {radius: 2}],
          anchor: 'Bottom',
          connectorStyle: {stroke: '#5c96bc', strokeWidth: 2, outlineStroke: 'transparent', outlineWidth: 4},
          extract: {
            'action': 'the-action'
          },
          uuid: this.id + '0',
          maxConnections: -1
        }
        this.jsplumb.makeSource(this.id, sourceEndpointOptions, {
          filter: '.jsp-endpoint-circle-bottom'
        })

        let targetEndpointOptions = {
          Endpoint: ['Dot', {radius: 2}],
          dropOptions: { hoverClass: 'dragHover' },
          anchor: 'Top',
          uuid: this.id + '1',
          allowLoopback: true
        }
        this.jsplumb.makeTarget(this.id, targetEndpointOptions)
        this.jsplumb.fire('jsPlumbNodeAdded', this.id)
      },
      clickNode () {
        this.$emit('on-click', this.id)
      },
      removeNode () {
        this.$emit('on-remove', this.id)
      }
    },
    watch: {
      jsplumb () {
        this.addEndpoint()
      }
    },
    mounted () {
      this.addEndpoint()
    }
  }
</script>

<style>

</style>
