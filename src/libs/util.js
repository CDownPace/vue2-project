import { forEach, hasOneOf } from '@/libs/tools'
import { BO_NAME } from './constants'
import { now, random } from 'lodash'
import { getStorage, removeStorage } from './storage'

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, permissions) => {
  let perms = permissions || []
  if (item.meta && item.meta.requiredPerms && item.meta.requiredPerms.length) {
    return !!hasOneOf(item.meta.requiredPerms, perms);
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @param permissions 用户拥有的权限
 * @param unexpectedRoutes 不返回 unexpectedRoutes 中的路由
 * @returns {Array}
 */
export const getMenuByRouter = (list, permissions, unexpectedRoutes=[]) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (hasChild(item)) {
        obj.children = getMenuByRouter(item.children, permissions, unexpectedRoutes)
        if (obj.children && obj.children.length > 0) {
          res.push(obj)
        }
      } else if (showThisMenuEle(item, permissions)) {
        if (unexpectedRoutes.indexOf(item.name) === -1) {
          res.push(obj)
        }
      }
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    if (!item.name) {
      return false
    }
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  return [Object.assign(homeRoute, { to: homeRoute.path }), ...res]
}

export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)


/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'home') homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

export const getCookie = (name) => {
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
}

export const getCSRFToken = () => {
  return getCookie('securityassessment_auth_csrf_cookie')
}

export const setTitle = (title) => {
  if (title) {
    window.document.title = `${title} - ${BO_NAME}`
  } else {
    window.document.title = BO_NAME
  }
}

export const getFilterValue = (values) => {
  return values && values.length > 0 ? values[0] : null
}

// params are as followed:
// title: just title.  【String】
// cols : one or more items(can be str or dict). 【Array】
// type : 4 kinds of types. default info type 【String】
// close: close button props, styles, title. 【Dict】
// ok: ok button props, styles, title, route(to redirect another page). 【Dict】
// customName: a unique name for notice, will remove existed notice name. 【String】
export const openNotification = (page, params) => {
  if (params.customName) {
    page.$Notice.close(params.customName)
  }
  let uniqueName = params.customName || `${params.title}-${Math.random().toString()}`
  let render = (h) => {
    let body = []
    let cols = params.cols
    if (cols) {
      if (cols instanceof Array) {
        body = cols.map(row => h(
          'p', {
            style: {
              lineHeight: '135%',
              marginBottom: '0.5em'
            }
          },
          (typeof row === 'string') ? row : `${Object.keys(row)[0]}: ${row[Object.keys(row)[0]]}`
        ))
      }
    }

    if (params.close) {
      let defaultStyle = {
        width: '64px',
        height: '24px',
        marginRight: '20px',
        marginTop: '5px',
      }
      let defaultProps = {
            type: 'default',
            size: 'small',
            shape: 'circle'
      }
      body.push(h(
        'Button', {
          style: params.close.style || defaultStyle,
          props: params.close.props || defaultProps,
          on: {
            click: () => {
              page.$Notice.close(uniqueName)
            }
          }
        },
        params.close.title || '知道了'
      ))
    }

    if (params.ok) {
      let defaultStyle = {
        width: '64px',
        height: '24px',
        marginTop: '5px',
      }
      let defaultProps = {
            type: 'primary',
            size: 'small',
            shape: 'circle',
      }
      body.push(h(
        'Button', {
          style: params.ok.style || defaultStyle,
          props: params.ok.props || defaultProps,
          on: {
            click: () => {
              params.ok.route && page.$router.push(params.ok.route)
              page.$Notice.close(uniqueName)
            }
          }
        },
        params.ok.title || '点击查看'
      ))
    }
    return h('div', body)
  }

  page.$Notice[params.type || 'info']({
    title: params.title,
    name: uniqueName,
    render: render
  })
}

export const formatPercent = (value) => {
  if (value < 0.01) {
    return Math.ceil(value * 100)
  } else if (value > 0.99) {
    return Math.floor(value * 100)
  } else {
    return Math.round(value * 100)
  }
}

export const getApplicationRoot = () => {
  return ''
}

export const getBaseURL = () => {
  let applicationRoot = ''
  return "/api/v1"
}

export const getCSRFCookieKey = () => {
  return 'securityassessment_auth_csrf_cookie' || ''
}

export const getEnv = () => {
  return 'dev' || ''
}

export const uuid = () => {
  let d = now()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + random(16)) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export const isIE = () => {
  let ua = navigator.userAgent
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1
}

export const isEdge = () => {
  let ua = navigator.userAgent
  return ua.indexOf('Edge') > -1
}

export const disableBackspace = (event) => {
  if (isIE() && event.key === 'Backspace') {
    let nodeName = event.target.nodeName.toLowerCase()
    if ((nodeName === 'input' && ['text', 'password'].indexOf(event.target.type) !== -1) || nodeName === 'textarea') {
      // do nothing
    } else {
      event.preventDefault()
    }
  }
}

export const getUrlParams = (search) => {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=')
    return Object.assign(params, { [key]: decodeURIComponent(val) })
  }, {})
}

export const serializeUrlParams = (obj) => {
  let searches = []
  for (let param in obj) {
    if (obj.hasOwnProperty(param)) {
      searches.push(`${encodeURIComponent(param)}=${encodeURIComponent(obj[param])}`)
    }
  }
  return searches.join('&')
}

export const getImageList = (instance, key='images') => {
  let image_id_list = []
  if (instance[key] && instance[key].length > 0) {
    for (let img of instance[key]) {
      image_id_list.push(img.id)
    }
  }
  return image_id_list
}

export const getStepItemByPanel = (currentIncidentStep, itemType) => {
  if (!currentIncidentStep) return null
  let item = null
  for (let i of currentIncidentStep.items) {
    if (i.item_type.value === itemType) {
      item = i
      break
    }
  }
  return item
}


export const setCurrentIncidentStep = (stepItemTypes, targetItemType, incidentStep, defaultStepType) => {
  let stepItem = null
  for (let itemType of stepItemTypes) {
    if (itemType.value === targetItemType) {
      stepItem = {
        id: null,
        item_type: itemType,
      }
      break
    }
  }
  let currentIncidentStep = null
  if (incidentStep) {
    currentIncidentStep = {
      ...incidentStep,
      items: [...incidentStep.items, stepItem]
    }
  } else {
    currentIncidentStep = {
      id: null,
      step_type: defaultStepType,
      items: [stepItem]
    }
  }
  return {
    currentIncidentStep, stepItem
  }
}

export const getHealthVisible = (configFunc, hasPermission, router) => {
  if (!configFunc('enable_health_registration')) return false
  if (!hasPermission('health_registration')) return false
  if (router && router.currentRoute && router.currentRoute.meta)
    return !!router.currentRoute.meta.needHealth
  return false
}

export const handleSelectCallback = (router, store, callback) => {
  let beforeSelectChangeCallback = null
  if (router.currentRoute.name !== 'form_score' && router.currentRoute.name !== 'action_plan') {
    beforeSelectChangeCallback = null
  } else {
    beforeSelectChangeCallback = store.getters.beforeSelectChangeCallback
  }
  if (!beforeSelectChangeCallback) {
    callback()
  } else {
    beforeSelectChangeCallback(() => {
      callback()
    })
  }
}

export const redirectToUrlAfterLogin = (router, redirect, commit=null) => {
  const afterLoginRedirectUri = getStorage('afterLoginRedirectUri')
  const platform = getStorage('platform')
  if (afterLoginRedirectUri) {
    removeStorage('afterLoginRedirectUri')
    window.location.href = afterLoginRedirectUri
  } else {
    router.push({ name: redirect ? redirect.from.name : 'home' })
  }
  if (platform && commit) {
    commit('setPlatform', platform, { root: true })
  }
}
