<template>
  <div class="p-map">
    <div v-if="showLeftPanel" class="p-map-left-panel">
      区域ID:{{selectPolygon.circleId}}
      区域名称:{{selectPolygon.circleName}}
    </div>
    <div class="p-map-right-panel legendInfo">
      <ul>
        <li>
          <p class="legend-label-long" :style="{'background-color': colors[4].color}"></p>
          <p class="legend-name-long">&gt;&nbsp;{{colors[4].start}}</p>
        </li>
        <li>
          <p class="legend-label-long" :style="{'background-color': colors[3].color}"></p>
          <p class="legend-name-long">{{colors[3].start}} &nbsp; - &nbsp; {{colors[3].end}}</p>
        </li>
        <li>
          <p class="legend-label-long" :style="{'background-color': colors[2].color}"></p>
          <p class="legend-name-long">{{colors[2].start}} &nbsp; - &nbsp; {{colors[2].end}}</p>
        </li>
        <li>
          <p class="legend-label-long" :style="{'background-color': colors[1].color}"></p>
          <p class="legend-name-long">{{colors[1].start}} &nbsp; - &nbsp; {{colors[1].end}}</p>
        </li>
        <li>
          <p class="legend-label-long" :style="{'background-color': colors[0].color}"></p>
          <p class="legend-name-long">&lt;&nbsp;{{colors[0].end}}</p>
        </li>
      </ul>
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
    getPGHeatMapData
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
        showLeftPanel: false,
        colors: [
          {color: '#b4e0f3', start: '', end: 1},
          {color: '#1482e5', start: 1, end: 2},
          {color: '#53ff53', start: 2, end: 3},
          {color: '#ffe66f', start: 3, end: 4},
          {color: '#ff0000', start: 4, end: ''}
        ],
        selectColor: '#000000',
        hoverColor: '#ffffff'
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
        getPGHeatMapData().then(res => {
          vue.loading = false
          if (res.result.length > 0) {
            // 升序排
            res.result.sort((a, b) => a.count - b.count)
            // 找出20%，40%，60%，80%四个位置的值
            let len = res.result.length
            let index20 = Math.round(len * 0.2) - 1
            if (index20 < 0) index20 = 0
            let index40 = Math.round(len * 0.4) - 1
            if (index40 < 0) index40 = 0
            let index60 = Math.round(len * 0.6) - 1
            if (index60 < 0) index60 = 0
            let index80 = Math.round(len * 0.8) - 1
            if (index80 < 0) index80 = 0

            let count20 = res.result[index20].count
            let count40 = res.result[index40].count
            let count60 = res.result[index60].count
            let count80 = res.result[index80].count
            if (count20 === 0) count20 = 1
            if (count40 <= count20) count40 = count20 + 1
            if (count60 <= count40) count60 = count40 + 1
            if (count80 <= count60) count80 = count60 + 1

            // 根据20%,40%,60%,80%的值设置颜色区间值范围
            vue.colors[0].end = count20
            vue.colors[1].start = count20
            vue.colors[1].end = count40
            vue.colors[2].start = count40
            vue.colors[2].end = count60
            vue.colors[3].start = count60
            vue.colors[3].end = count80
            vue.colors[4].start = count80
            // 添加地图商圈
            res.result.forEach(biz => {
              let fillColor = vue.colors[0].color
              for (let i in vue.colors) {
                if (Number(i) === 0) { // 第一个
                  if (biz.count < vue.colors[i].end) {
                    fillColor = vue.colors[i].color
                    break
                  }
                } else if (Number(i) === vue.colors.length - 1) { // 最后一个
                  if (biz.count >= vue.colors[i].start) {
                    fillColor = vue.colors[i].color
                    break
                  }
                } else {
                  if (biz.count >= vue.colors[i].start && biz.count < vue.colors[i].end) {
                    fillColor = vue.colors[i].color
                    break
                  }
                }
              }
              let gons = []
              if (biz.range) {
                biz.range.forEach(r => {
                  gons.push(new BMap.Point(r.lng, r.lat))
                })
              }
              let ply = new BMap.Polygon(gons, {strokeWeight: 2, strokeColor: '#0905ff', fillColor: fillColor}) // 建立多边形覆盖物
              ply.circleId = biz.id
              ply.circleName = biz.name && biz.name !== '' ? biz.name : '未命名商圈'
              ply.circleFillColor = fillColor

              ply.addEventListener('click', function (e) {
                vue.setLeftCircleDataPanel(ply)
              })
              ply.addEventListener('mouseover', function (e) {
                if (ply !== vue.selectPolygon) {
                  ply.setFillColor(vue.hoverColor)
                }
              })
              ply.addEventListener('mouseout', function (e) {
                if (ply !== vue.selectPolygon) {
                  ply.setFillColor(fillColor)
                }
              })
              vue.bmap.addOverlay(ply)  // 添加覆盖物
            })
            // 解决隐藏地图再显示,覆盖物位置不对的问题
            vue.bmap.centerAndZoom(vue.cityname, vue.cityZoom)
          }
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
          newValue.setFillColor(this.selectColor)
        }
        if (oldValue) {
          oldValue.setFillColor(oldValue.circleFillColor)
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
