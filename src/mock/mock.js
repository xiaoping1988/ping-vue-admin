import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Login from '../pages/login/mock/login'
import SysManage from '../pages/sysmanage/mock/sysmanage'

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    let mock = new MockAdapter(axios)
    Login.bootstrap(mock)
    SysManage.bootstrap(mock)
  }
}
