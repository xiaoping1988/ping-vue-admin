<template>
  <div class="p-map">
    <div class="heat-slide">
      <div class="heat-tool">
        <div class="col-md-3">
          <span class="heat-tool-title">热力图开关</span>
        </div>
        <div class="col-md-9">
          <el-switch
            v-model="showHeatMap"
            @change="toggleShowHeatMap">
          </el-switch>
        </div>
      </div>
      <div class="heat-tool">
        <div class="col-md-3">
          <span class="heat-tool-title">权重值</span>
        </div>
        <div class="col-md-9">
          <el-slider
            v-model="sliderValue"
            :step="5"
            :max="100"
            :disabled="!showHeatMap"
            show-stops
            @change="changeSlider">
          </el-slider>
        </div>
      </div>
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
    getHeatMapData
  } from '../api'
  import {loadBaiDuHeatMap} from '../../../assets/js/assist'

  export default {
    data () {
      return {
        bmap: {},
        cityname: '北京',
        cityZoom: 15,
        expanded: true,
        loading: true,
        showHeatMap: true,
        sliderValue: 15
      }
    },
    methods: {
      initBMap () {
        let vue = this
        vue.loading = true
        loadBaiDuHeatMap().then(BMap => {
          vue.bmap = new BMap.Map('bmap', {enableMapClick: false})            // 创建Map实例
          if (vue.cityid !== '') {
            vue.bmap.centerAndZoom(new BMap.Point(116.418261, 39.921984), vue.cityZoom)
          }
          vue.bmap.enableScrollWheelZoom()
          vue.bmap.clearOverlays()
          vue.bmap.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}))
        })
      },
      setHeatMap () {
        if (this.heatmapOverlay) {
          this.bmap.removeOverlay(this.heatmapOverlay)
        }
        this.showHeatMap = true
        this.loading = true
        getHeatMapData().then(res => {
          this.loading = false
          this.heatmapOverlay = new BMapLib.HeatmapOverlay({'radius': 20})
          this.bmap.addOverlay(this.heatmapOverlay)
          let points = []
          res.result.forEach(p => {
            points.push({lng: Number(p.lng), lat: Number(p.lat), count: Number(p.count)})
          })
          this.heatmapOverlay.setDataSet({data: points, max: (this.sliderValue === 0 ? 1 : this.sliderValue)})
        }).catch(this.handleError)
      },
      changeSlider (value) {
        this.heatmapOverlay.setDataSet({data: this.heatmapOverlay.data.data, max: (value === 0 ? 1 : value)})
      },
      toggleShowHeatMap () {
        if (this.heatmapOverlay) {
          if (this.showHeatMap) {
            this.heatmapOverlay.show()
          } else {
            this.heatmapOverlay.hide()
          }
        }
      }
    },
    mounted () {
      let vue = this
      vue.$nextTick(function () {
        vue.initBMap()
      })
      // 热力图随页面第一次展现会有问题！用定时的方式来首次加载热力图
      window.setTimeout(function () {
        vue.setHeatMap()
      }, 1000)
    }
  }
</script>

<style scoped>
  .heat-slide {
    position: absolute;
    width: 500px;
    top: 30px;
    right: 30px;
    z-index: 100;
    background-color: #FFFFFF;
  }

  .heat-tool {
    float: left;
    width: 100%;
  }

  .heat-tool-title {
    font-size: 12px;
  }
</style>
