const MockDate = require('mockdate')
const Base = require('../src/base.js')

let now = new Date()
/**
 * 模拟时间流逝
 * @param {number} time
 */
function fastforward (time) {
  now += time
  MockDate.set(now)
  jest.runTimersToTime(time)
}

describe('debounce', function () {
  test('100ms之内阻止再次触发', function () {
    const mockFn = jest.fn()
    const run = Base.debounce(mockFn, 100)
    jest.useFakeTimers()
    run() // 开始计时

    fastforward(50)   // 第 50 ms
    run() // 阻止触发
    expect(mockFn).not.toBeCalled()

    fastforward(100)   // 第 150 ms
    expect(mockFn.mock.calls.length).toBe(1)

    jest.useRealTimers()
    MockDate.reset()
  })
  test('大于等于100ms后允许触发并重新计时', function () {
    const mockFn = jest.fn()
    const run = Base.debounce(mockFn, 100)
    jest.useFakeTimers()
    run()
    fastforward(50)   // 第 50 ms
    run()
    fastforward(100)   // 第 150 ms
    run() // 重新计时

    fastforward(100) // 第 100 ms
    expect(mockFn.mock.calls.length).toBe(2)

    jest.useRealTimers()
    MockDate.reset()
  })
})
