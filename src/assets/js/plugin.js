import {getLoginUser} from './assist'
import Layout from '../../components/layout'
import Menu from '../../components/navside'
import JSPlumb from '../../components/jsplumb'
import Form from '../../components/form'
import Format from '../../components/format'
import {message, messageSuccess, messageWarn, messageError, notify, notifySuccess, notifyWarn, notifyError} from './vueGlobal'

const CCcomponents = {
  CHeader: Layout.Header,
  CLayout: Layout,
  CLayoutNoSide: Layout.LayoutNoSide,
  CMenu: Menu,
  CMenuItem: Menu.MenuItem,
  CPanel: Layout.Panel,
  JspNode: JSPlumb.JspNode,
  CFormButton: Form.FormButton,
  CFormatDate: Format.CFormatDate,
  CFormatSufRate: Format.CFormatSufRate,
  CFormatGrowthRate: Format.CFormatGrowthRate,
  CFormatVal: Format.CFormatVal
}

export default {
  install (Vue) {
    /**
     * 返回上一级
     */
    Vue.prototype.goBack = () => { window.history.go(-1) }
    /**
     * 统一处理promise catch的错误
     * @param error 错误信息
     */
    Vue.prototype.handleError = (error) => { console.warn(error) }
    /**
     * 获取登录用户
     * @returns {*}
     */
    Vue.prototype.getLoginUser = () => { return getLoginUser() }
    /**
     * 右边页面内容全屏切换
     */
    Vue.prototype.toggleFullScreen = () => {
      let layout = document.getElementById('p-layout')
      if (layout.classList.contains('p-full-screen')) {
        layout.classList.remove('p-full-screen')
      } else {
        layout.classList.add('p-full-screen')
      }
    }

    // 消息提示
    Vue.prototype.message = (msg) => { message(msg) }
    Vue.prototype.messageSuccess = (msg) => { messageSuccess(msg) }
    Vue.prototype.messageWarn = (msg) => { messageWarn(msg) }
    Vue.prototype.messageError = (msg) => { messageError(msg) }

    // 通知提示
    Vue.prototype.notify = (msg) => { notify(msg) }
    Vue.prototype.notifySuccess = (msg) => { notifySuccess(msg) }
    Vue.prototype.notifyWarn = (msg) => { notifyWarn(msg) }
    Vue.prototype.notifyError = (msg) => { notifyError(msg) }

    Object.keys(CCcomponents).forEach((key) => {
      Vue.component(key, CCcomponents[key])
    })
  }
}
