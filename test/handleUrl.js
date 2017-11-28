const Base = require('../src/base.js')

describe('分组：getAbsoluteUrl', () => {
  test('url包含query参数', () => {
    document.body.innerHTML = '<a href="https://www.baidu.com/s?wd=tengxu" />'
    let aEle = document.getElementsByTagName('a')[0]
    let url = aEle.href
    expect(Base.getAbsoluteUrl(url)).toBe('/s')
  })
    test('url无query参数', () => {
        document.body.innerHTML = '<a href="https://www.baidu.com/s" />'
        let aEle = document.getElementsByTagName('a')[0]
        let url = aEle.href
        expect(Base.getAbsoluteUrl(url)).toBe('/s')
    })
    test('当前路径为根路径', () => {
        document.body.innerHTML = '<a href="https://www.baidu.com/" />'
        let aEle = document.getElementsByTagName('a')[0]
        let url = aEle.href
        expect(Base.getAbsoluteUrl(url)).toBe('/')
    })
    test('url为空字符串', () => {
        document.body.innerHTML = '<a href="" />'
        let aEle = document.getElementsByTagName('a')[0]
        let url = aEle.href
        expect(Base.getAbsoluteUrl(url)).toBe('')
    })
})
