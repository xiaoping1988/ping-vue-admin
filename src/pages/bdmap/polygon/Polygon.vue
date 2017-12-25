<template>
  <div class="p-map">
    <div v-if="showLeftPanel" class="p-map-left-panel">
      区域ID:{{selectPolygon.circleId}}
      区域名称:{{selectPolygon.circleName}}
    </div>
    <div style="height: 100%;width: 100%"
         v-loading="loading"
         element-loading-text="加载中..."
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(255, 255, 255, 0.6)">
      <div id="bmap"
           style="height: 100%;width: 100%">
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getPloygonMapData
  } from '../api'
  import {loadBaiDuMap} from '../../../assets/js/assist'

  export default {
    data () {
      return {
        bmap: {},
        cityname: '北京',
        cityZoom: 12,
        expanded: true,
        loading: true,
        selectPolygon: {},
        showLeftPanel: false
      }
    },
    methods: {
      initBMap () {
        let vue = this
        vue.loading = true
        loadBaiDuMap().then(BMap => {
          vue.bmap = new BMap.Map('bmap', {enableMapClick: false})            // 创建Map实例
          if (vue.cityid !== '') {
            vue.bmap.centerAndZoom('北京', vue.cityZoom)
          }
          vue.bmap.enableScrollWheelZoom()
          vue.bmap.clearOverlays()
          vue.bmap.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}))
          vue.setPolygonMap()
        })
      },
      setPolygonMap () {
        let vue = this
        vue.bmap.clearOverlays()
        vue.loading = true
        getPloygonMapData().then(res => {
          vue.loading = false
          res.result.forEach((biz, index) => {
            let c = biz.center
            let centerPoint = new BMap.Point(c.lng, c.lat)
            let gons = []
            biz.range.forEach(r => {
              gons.push(new BMap.Point(r.lng, r.lat))
            })
            let ply = new BMap.Polygon(gons, {strokeWeight: 2, strokeColor: '#0905ff', fillOpacity: 0.8}) // 建立多边形覆盖物
            ply.circleId = biz.id
            ply.circleName = biz.name && biz.name !== '' ? biz.name : '未命名商圈'

            ply.addEventListener('click', function (e) {
              vue.setLeftCircleDataPanel(ply)
            })
            vue.bmap.addOverlay(ply)  // 添加覆盖物

            let offsetWidth = 0
            if (biz.name.length > 0) {
              offsetWidth = (biz.name.length / 2) * -10
            }
            let label = new BMap.Label(biz.name === '' ? biz.id : biz.name, {position: centerPoint, offset: new BMap.Size(offsetWidth, -10)})
//            label.setStyle({'font-weight': 100, border: '1px solid #ccc'})
            vue.bmap.addOverlay(label)
            label.addEventListener('click', function (e) {
              vue.setLeftCircleDataPanel(ply)
            })
            if (index === 0) {
              vue.setLeftCircleDataPanel(ply)
            }
          })
        }).catch(this.handleError)
      },
      setLeftCircleDataPanel (polygon) {
        this.selectPolygon = polygon
        this.showLeftPanel = true
      }
    },
    watch: {
      selectPolygon (newValue, oldValue) {
        if (newValue) {
          newValue.setFillColor('#409EFF')
        }
        if (oldValue) {
          oldValue.setFillColor('#fff')
        }
      }
    },
    mounted () {
      let vue = this
      vue.$nextTick(function () {
        vue.initBMap()
      })
    }
  }
</script>

<style scoped>

</style>
