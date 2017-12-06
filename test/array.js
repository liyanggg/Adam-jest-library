const Base = require('../src/base.js')

describe('分组: removeItemByIndex', () => {
  test('0, [1,2,3,4]', () => {
    var ret = Base.removeItemByIndex(0, [1, 2, 3, 4])
    expect(ret).toEqual([2, 3, 4])
  })
  test('3, [1,2,3,4]', () => {
    var ret = Base.removeItemByIndex(3, [1, 2, 3, 4])
    expect(ret).toEqual([1, 2, 3])
  })
  test('index超过长度, [1,2,3,4]', () => {
    var ret = Base.removeItemByIndex(5, [1, 2, 3, 4])
    expect(ret).toBeNull()
  })
  test('index非数字, [1,2,3,4]', () => {
    var ret = Base.removeItemByIndex('hah', [1, 2, 3, 4])
    expect(ret).toBeUndefined()
  })
  test('2, 非数组', () => {
    var ret = Base.removeItemByIndex(2, 'hah')
    expect(ret).toEqual('hah')
  })
})