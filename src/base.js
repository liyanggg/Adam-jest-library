const Base = {}

/**
 * 去除字符串首尾空格及重复空格
 * @param {string} str
 */
function removeSpace (str) {
  let result = str.replace(/(^\s+)|(\s+$)/g, '').replace(/(\s+)/g, ' ')
  return result
}

/**
 * 获取指定的 querystring 中指定 name 的 value
 * @param {String} name
 * @param {String} querystring
 * @return {String|undefined}
 */
Base.query = (name, querystring) => {
  if (!name || !querystring) {
    return ''
  }
  let reg = new RegExp('(?:\\?|&)' + name + '=(.*?)(?:&|$)')
  let ret = reg.exec(querystring) || []
  return ret[1]
}

/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 */
Base.serialize = (data) => {
  let ret = []
  if (typeof data !== 'object') {
    return ''
  }
  for (let x in data) {
    ret.push(x + '=' + data[x])
  }
  return ret.join('&')
}

/**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|Null}
 */
Base.$ = (selector) => {
  let ret = document.querySelector(selector)
  return ret
}

/**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */

Base.removeNode = (node) => {
  return node.parentNode.removeChild(node)
}

/**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target`
 */
Base.insertAfter = (node, target) => {
  let parent
  if (!target || !node) {
    return
  }
  parent = target.parentNode
  if (parent.lastChild === target) {
    parent.appendChild(node)
  } else {
    parent.insertBefore(node, target.nextSibling)
  }
}

/**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
Base.addClass = (node, className) => {
  if (!node) {
    return null
  }
  if (typeof className === 'string') {
    let nodeClass = node.className
    let handleClass = className.replace(/^|$/g, ' ') // 首尾添加空格
    let newClass = nodeClass + ' ' + handleClass
    node.className = removeSpace(newClass)
    return
  }
  if (Array.isArray(className)) {
    let nodeClass = node.className
    let handleClass = className.join(' ')
    let newClass = nodeClass + ' ' + handleClass
    node.className = newClass.replace(/(^\s+)|(\s+$)/g, '')
  } else {
    node.className = ''
    return node.className
  }
}

/**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
Base.removeClass = (node, className) => {
  if (!node) {
    return null
  }
  if (typeof className === 'string') {
    let nodeClass = node.className
    let handleClass = className.split(' ')
    let obj = {}
    for (let i = 0; i < handleClass.length; i++) {
      let item = handleClass[i]
      if (!obj[item]) {
        obj[item] = item
      }
    }
    for (let item in obj) {
      nodeClass = nodeClass.replace(item, ' ')
    }
    node.className = removeSpace(nodeClass)
    return
  }
  if (Array.isArray(className)) {
    let nodeClass = node.className
    for (let j = 0; j < className.length; j++) {
      let item = className[j]
      nodeClass = nodeClass.replace(item, ' ')
    }
    node.className = removeSpace(nodeClass)
  } else {
    return node.className
  }
}

/**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
Base.getAbsoluteUrl = (url) => {
  if (url === '') {
    return ''
  }
  let arr = url.split('//')
  let start = arr[1].indexOf('/')
  let absUrl = arr[1].substring(start) // 返回域名之后的片段(包括第一个'/')
  if (absUrl.indexOf('?') !== -1) {
    absUrl = absUrl.split('?')[0]
  }
  return absUrl
}

/**
 * 防抖动
 * debounce: 在前一次调用后的time时间内阻止再次触发
 * 直到时间大于等于time后再调用才允许触发并重新计时
 */
Base.debounce = (callback, time) => {
  let timer = null
  time = time || 100
  return function () {
    timer = setTimeout(() => {
      callback()
      clearTimeout(timer)
    }, time)
  }
}

/**
 *  根据所以移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
Base.removeItemByIndex = (index, arr) => {
  if (!Array.isArray(arr)) {
    return arr
  }
  if (typeof index !== 'number') {
    return undefined
  }
  if (index > arr.length) {
    return null
  }
  arr.splice(index, 1)
  return arr
}

module.exports = Base
