import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Login from '../pages/login/mock'
import Scene from '../pages/scene/mock'
import BDMap from '../pages/bdmap/mock'

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    let mock = new MockAdapter(axios)
    Login.bootstrap(mock)
    Scene.bootstrap(mock)
    BDMap.bootstrap(mock)
  }
}
