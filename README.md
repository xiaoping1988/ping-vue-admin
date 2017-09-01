# ping-vue-admin

> A Vue.js project

> 这是一个用vue做的后台系统的模板,可以作为脚手架工程

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#vue-particles
编译时如果出现如下问题:

ERROR in js/vendor.b52378a207faf529703b.js from UglifyJs
Unexpected token: punc (() [./~/vue-particles/src/vue-particles/index.js:6,0][js/vendor.b52378a207faf529703b.js:69927,12]

安装好之后要修改它的index.js文件,如下:
install: function (Vue, options) {
        Vue.component('vue-particles', particles)
    }
