const Base = require('../src/base.js')

describe('分组：query', () => {
  test('hello, ?hello=js', () => {
    var ret = Base.query('hello', '?hello=js')
    expect(ret).toBe('js')
  })
  test('hello, ?hello=', () => {
    var ret = Base.query('hello', '?hello=')
    expect(ret).toBe('')
  })
  test('hello, ?hello=&name=ly', () => {
    var ret = Base.query('hello', '?hello=&name=ly')
    expect(ret).toBe('')
  })
  test('hello, ?name=ly', () => {
    var ret = Base.query('hello', '?name=ly')
    expect(ret).toBeUndefined()
  })
  test('hello, ?', () => {
    var ret = Base.query('hello', '?')
    expect(ret).toBeUndefined()
  })
  test('hello/abc, ?hello/abc=js&name=ly', () => {
    var ret = Base.query('hello/abc', '?hello/abc=js&name=ly')
    expect(ret).toBe('js')
  })
  test('hello, undefined', () => {
    let string
    var ret = Base.query('hello', string)
    expect(ret).toBe('')
  })
  test('hello, ?hello=js', () => {
    let string
    var ret = Base.query(string, '?hello=js')
    expect(ret).toBe('')
  })
})
describe('分组：serialize', () => {
  test('data={hello: \'js\', hi: \'test\'}', () => {
    var ret = Base.serialize({hello: 'js', hi: 'test'})
    expect(ret).toBe('hello=js&hi=test')
  })
  test('data={hello: \'\', hi: \'test\'}', () => {
    var ret = Base.serialize({hello: '', hi: 'test'})
    expect(ret).toBe('hello=&hi=test')
  })
  test('data=[1, 2, 3]', () => {
    var ret = Base.serialize([1, 2, 3])
    expect(ret).toBe('0=1&1=2&2=3')
  })
  test('data为undefined', () => {
    var ret = Base.serialize({})
    expect(ret).toBe('')
  })
  test('data为null', () => {
    var ret = Base.serialize()
    expect(ret).toBe('')
  })
})