import {getLoginUser} from './assist'
import {checkPageIds} from '../../pages/login/api/login'
import CGoBack from '@/components/GoBack.vue'
import CLayout from '@/components/Layout.vue'
import CLoading from '@/components/Loading.vue'
import CMenu from '@/components/menu/index.js'
import CForm from '@/components/form'
import CFormat from '@/components/format'

const CCcomponents = {
  CGoBack: CGoBack,
  CLayout: CLayout,
  CLoading: CLoading,
  CMenu: CMenu,
  CMenuItem: CMenu.Item,
  CMenuSub: CMenu.Sub,
  CMenuThird: CMenu.Third,
  CInputSearch: CForm.CInputSearch,
  CSubmitButton: CForm.CSubmitButton,
  CFormatDate: CFormat.CFormatDate,
  CFormatNum: CFormat.CFormatNum
}

export default {
  install (Vue) {
    Vue.prototype.goBack = () => { window.history.go(-1) }
    Vue.prototype.getLoginUser = () => { return getLoginUser() }
    Vue.prototype.getPageAuth = (pageIds) => {
      // 判断页面元素是否可见，控制用户权限
      return checkPageIds({pageIds: pageIds}).then(res => res.result)
    }

    Object.keys(CCcomponents).forEach((key) => {
      Vue.component(key, CCcomponents[key])
    })
  }
}
