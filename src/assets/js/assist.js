// 判断是不是一个菜单组件
function isMenuComponent (item) {
  return item.$options._componentTag === 'c-menu-item' ||
    item.$options._componentTag === 'c-menu-sub' ||
    item.$options._componentTag === 'c-menu-third'
}
// 获得菜单组件的根
function findRootMenu (item, ancestors) {
  if (item.$options._componentTag === 'c-menu') {
    return item
  } else {
    ancestors.push(item)
  }
  return findRootMenu(item.$parent, ancestors)
}
// 递归修改别的菜单的active状态
function updateActiveRec (activeItem, item, ancestors) {
  item.$children.forEach(child => {
    if (child.$options._componentTag === 'c-menu-item') {
      if (child.path !== activeItem.path && activeItem.$options._componentTag === 'c-menu-item') child.active = false
      updateActiveRec(activeItem, child, ancestors)
    } else if (child.$options._componentTag === 'c-menu-sub' || child.$options._componentTag === 'c-menu-third') {
      if (child.path !== activeItem.path) {
        let isAncestor = false
        ancestors.forEach(item2 => {
          if (child.path === item2.path) isAncestor = true
        })
        if (!isAncestor) child.active = false
      }
      updateActiveRec(activeItem, child, ancestors)
    }
  })
}
// 修改菜单的active状态
function updateActive (item) {
  let ancestors = [] // 不含rootMenu
  let _root = findRootMenu(item, ancestors)
  updateActiveRec(item, _root, ancestors)
  if (item.$options._componentTag === 'c-menu-item') {
    item.active = true
  } else {
    item.active = !item.active
  }
}
export {updateActive};

// 递归设置菜单以及祖先菜单为active状态
function setAncestorsActive (item) {
  if (item.$options._componentTag === 'c-menu') {
    return
  }
  item.active = true
  setAncestorsActive(item.$parent)
}

// 递归设置对应浏览器里路由地址的菜单为active状态
function setActive (item, routePath, hasActive) {
  if (!isMenuComponent(item)) return false
  if (routePath.startsWith(item.path)) {
    hasActive.has = true
    setAncestorsActive(item)
    // setBreadcrumb(item)
    return false
  }
  item.$children.every(child => {
    return setActive(child, routePath, hasActive)
  })
  return true
}

function setFirstMenuActive (firstItem) {
  if (!isMenuComponent(firstItem)) return
  firstItem.active = true
  let _children = firstItem.$children
  if (_children.length > 0) {
    setFirstMenuActive(_children[0])
  } else {
    // setBreadcrumb(firstItem)
  }
}

function removeActive (item) {
  item.active = false
  item.$children.forEach(c => {
    removeActive(c)
  })
}
// 初始化菜单的active状态
function initActive (rootMenu) {
  let _path = rootMenu.$route.path
  let hasActive = {has: false}
  removeActive(rootMenu)
  rootMenu.$children.every(item => {
    return setActive(item, _path, hasActive)
  })
  if (!hasActive.has) {
    // 就设置第一个menuitem为active
    let _children = rootMenu.$children
    if (_children.length > 0) {
      setFirstMenuActive(_children[0])
    }
  }
}
export {initActive};
/**
 * 获取面包屑元素
 * @param item 点击的menuitem
 * @returns {Array}
 */
function setBreadcrumb (item) {
  let bc = []
  unshiftBreadcrumb(item, bc)
  item.$store.commit('setBreadcrumb', bc)
}
export {setBreadcrumb};
/**
 * 向上查找面包屑并往面包屑数组的一个位置添加元素
 * @param item
 * @param bc
 */
function unshiftBreadcrumb (item, bc) {
  if (item.title) bc.unshift(item.title)
  if (item.$options._componentTag === 'c-menu') return
  unshiftBreadcrumb(item.$parent, bc)
}
var cookieTokenKey = 'bdap_token'

var sessionUserKey = 'userInfo'

/**
 * 将登录用户放到sessionStorage中
 * @param user
 */
function setLoginUser (user) {
  user.pageIdsObj = {}
  if (user.pageIds) {
    user.pageIds.forEach(p => {
      user.pageIdsObj[p] = true
    })
  }
  localStorage.setItem(sessionUserKey, JSON.stringify(user))
  addCookie(cookieTokenKey, user.token, 24)
}
export {setLoginUser}
/**
 * 移除sessionStorage中的登录用户
 */
function removeLoginUser () {
  localStorage.removeItem(sessionUserKey)
  deleteCookie(cookieTokenKey)
}
export {removeLoginUser}
/**
 * 获取登录用户信息
 */
function getLoginUser () {
  return JSON.parse(localStorage.getItem(sessionUserKey))
}
export {getLoginUser}

/**
 * 获取登录用户页面元素权限信息
 */
function getPageAuth () {
  return JSON.parse(localStorage.getItem(sessionUserKey)).pageIdsObj
}
export {getPageAuth}

/**
 * 添加cookie
 * @param name
 * @param value
 * @param expireHours 有效时间,单位小时,为0
 */
function addCookie (name, value, expireHours) {
  let cookieString = name + '=' + value
  // 判断是否设置过期时间
  if (expireHours > 0) {
    let date = new Date()
    date.setTime(date.getTime + expireHours * 3600 * 1000)
    cookieString = cookieString + '; expires=' + date.toGMTString()
  }
  document.cookie = cookieString
}

export {addCookie}

/**
 * 获取cookie
 * @param name
 * @returns {*}
 */
function getCookie (name) {
  let strCookie = document.cookie
  let arrCookie = strCookie.split('; ')
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=')
    if (arr[0] === name) return arr[1]
  }
  return ''
}

export {getCookie}

/**
 * 删除cookie, 即把value设置为空
 * @param name
 */
function deleteCookie (name) {
  let date = new Date()
  date.setTime(date.getTime() - 10000)
  document.cookie = name + '=v; expires=' + date.toGMTString()
}

export {deleteCookie}

/**
 * 获取cookie中的token
 * @returns {*}
 */
function getTokenCookie () {
  return getCookie(cookieTokenKey)
}

export {getTokenCookie}

/**
 * 删除cookie中的token
 */
function removeTokenCookie () {
  deleteCookie(cookieTokenKey)
}

export {removeTokenCookie}

/**
 * 格式化日期
 * @param dat 日期对象
 * @param parttern 格式
 * @returns {*}
 */
function formatDate (dat, parttern) {
  if (!parttern || parttern === '') parttern = 'yyyy-MM-dd'
  var o = {
    'M+': dat.getMonth() + 1, // 月份
    'd+': dat.getDate(), // 日
    'h+': dat.getHours() % 12 === 0 ? 12 : dat.getHours() % 12, // 小时
    'H+': dat.getHours(), // 小时
    'm+': dat.getMinutes(), // 分
    's+': dat.getSeconds(), // 秒
    'q+': Math.floor((dat.getMonth() + 3) / 3), // 季度
    'S': dat.getMilliseconds() // 毫秒
  };
  var week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  };
  if (/(y+)/.test(parttern)) {
    parttern = parttern.replace(RegExp.$1, (dat.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(parttern)) {
    parttern = parttern.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[dat.getDay() + '']);
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(parttern)) {
      parttern = parttern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return parttern;
}

export {formatDate}

/**
 * 获取某个日期范围内的所有日期
 * @param startDate
 * @param stopDate
 * @returns {Array}
 */
function getDates (startDate, stopDate, parttern) {
  if (!parttern || parttern === '') parttern = 'yyyy-MM-dd'
  let dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(formatDate(currentDate, parttern));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return dateArray;
}

export {getDates}

/**
 * 日期控件的公共shortcuts
 * <p>最近一周
 * <p>最近一个月
 * <p>最近三个月
 * @type {[*]}
 */
const shortcuts = [
  {
    text: '最近7天',
    value () {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      return [start, end];
    }
  },
  {
    text: '最近30天',
    value () {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
      return [start, end];
    }
  },
  {
    text: '最近90天',
    value () {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 89);
      return [start, end];
    }
  }
]

export {shortcuts}
