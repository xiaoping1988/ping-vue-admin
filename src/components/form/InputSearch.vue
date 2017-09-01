<template>
  <div style="height: 32px;vertical-align: bottom">
    <input type="text"
           :class="searchValue===''?'input-search':'input-search has-text' "
           v-model.trim="searchValue"
           :placeholder="placeholder"
           @input="handleInput"
           @keyup.13="handleSearch"
    />
  </div>
</template>

<script>
  export default {
      props: {
          value: {
            type: String,
            default: ''
          },
          placeholder: {
            type: String,
            default: '请输入'
          },
          entered: {
            type: Boolean,
            default: false
          },
          remote: {
            type: Boolean,
            default: false
          },
          remoteMethod: {
            type: Function
          },
          filterArray: {
              type: Array,
              default: function () {
                return []
              }
          },
          filterField: {
              type: String,
              default: 'tt'
          }
      },
      data () {
        return {
            searchValue: this.value,
            arrayData: this.filterArray,
            result: this.filterArray
        }
      },
      methods: {
        handleInput (event) {
          let value = event.target.value
          this.$emit('input', value)
        },
        filterData (val) {
            if (val === '') {
                this.arrayData = this.result
                return
            }
            let _data = []
            this.result.some(item => {
              if (item[this.filterField].indexOf(val) !== -1) _data.push(item)
            })
            this.arrayData = _data
        },
        handleSearch () {
          if (this.entered) {
            if (this.remote && this.remoteMethod) {
              this.remoteMethod(this.searchValue)
            } else {
              this.filterData(this.searchValue)
            }
          }
        }
      },
      watch: {
        searchValue (val) {
            if (!this.entered) {
              if (this.remote && this.remoteMethod) {
                this.remoteMethod(val)
              } else {
                this.filterData(val)
              }
            }
        },
        arrayData (val) {
          if (!this.remote) {
            this.$emit('on-result-change', val)
          }
        }
      }
  }
</script>

<style scoped>
  .input-search{
    background: url(../../assets/img/ico_search.png) no-repeat center center transparent;
    border: 0;
    color: rgba(0,0,0,.82);
    box-shadow: 0 -1px 0 0 rgba(81,130,228,.6) inset;
    transition: all .3s ease-out .1s;
    width: 100%;
    height: 32px;
  }

  .input-search:focus{
     background: url(../../assets/img/ico_search.png) no-repeat scroll 8px center;
     border: 0;
     border-radius: 0;
     outline: 0;
     color: rgba(0,0,0,.82);
     box-shadow: 0 -2px 0 0 #5182e4 inset;
     padding-left: 28px;
     width: 100%;
     height: 32px;
     transition: all .2s ease-in-out 0s;
   }

  .has-text{
    background: url(../../assets/img/ico_search.png) no-repeat scroll 8px center;
    border: 0;
    border-radius: 0;
    outline: 0;
    color: rgba(0,0,0,.82);
    box-shadow: 0 -1px 0 0 #5182e4 inset;
    padding-left: 28px;
    width: 100%;
    transition: all .2s ease-in-out 0s;
  }
</style>
