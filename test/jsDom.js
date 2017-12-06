const Base = require('../src/base.js')

describe('分组：removeNode', () => {
  const tpl = '<div id="p"><p id="c">test1</p><p>test2</p></div>'
  test('通过id选取node', () => {
    document.body.innerHTML = tpl
    let c = document.getElementById('c')
    Base.removeNode(c)
    expect(document.getElementById('c')).toBeNull()
  })
  test('通过父元素选取node', () => {
    document.body.innerHTML = tpl
    let c = document.getElementById('p').childNodes[0]
    Base.removeNode(c)
    expect(document.getElementById('p').childNodes[0].innerHTML).toBe('test2')
  })
})
describe('分组：$(selector)选择器(利用querySelector)', () => {
  test('选择类', () => {
    document.body.innerHTML = '<p class="tClass" id="tId">t1</p><p class="tClass">t2</p>'
    expect(Base.$('.tClass').nodeName.toLowerCase()).toBe('p')
  })
  test('选择id', () => {
    expect(Base.$('#tId').nodeName.toLowerCase()).toBe('p')
  })
  test('选择标签', () => {
    expect(Base.$('p').nodeName.toLowerCase()).toBe('p')
  })
  test('多个同类名元素只选取第一个', () => {
    expect(Base.$('.tClass').innerHTML).toBe('t1')
  })
  test('selector不存在', () => {
    expect(Base.$('#abc')).toBeNull()
  })
})
describe('分组：insertAfter', () => {
  const tpl = '<p>t1</p><p>t2</p>'
  test('target非lastChild', () => {
    document.body.innerHTML = tpl
    let target = document.querySelectorAll('p')[0]
    let node = document.createElement('span')
    Base.insertAfter(node, target)
    expect(document.querySelector('span').nodeName.toLowerCase()).toBe('span')
  })
  test('target为lastChild', () => {
    document.body.innerHTML = tpl
    let target = document.body.lastChild
    let node = document.createElement('span')
    Base.insertAfter(node, target)
    expect(document.querySelector('span').nodeName.toLowerCase()).toBe('span')
  })
  test('target不存在', () => {
    let target = document.querySelector('#notAlive')
    let node = document.createElement('div')
    Base.insertAfter(node, target)
    expect(document.body.querySelector('div')).toBeNull()
  })
  test('node未赋值', () => {
    let target = document.body.lastChild
    let node
    Base.insertAfter(node, target)
    expect(document.body.querySelector('div')).toBeNull()
  })
})
describe('分组：addClass', () => {
  const tpl = '<div class="p"><p class="c">test1</p><p>test2</p></div>'
  test('node已存在class, 传入数组', () => {
    document.body.innerHTML = tpl
    let className = ['extraClass']
    let node = document.getElementsByClassName('p')[0]
    Base.addClass(node, className)
    expect(node.className).toBe('p extraClass')
  })
  test('node已存在class, 传入字符串', () => {
    document.body.innerHTML = tpl
    let node = document.getElementsByClassName('p')[0]
    let className = 'extraClass'
    Base.addClass(node, className)
    expect(node.className).toBe('p extraClass')
  })
  test('node无初始class, 传入数组', () => {
    document.body.innerHTML = tpl
    let className = ['extraClass']
    let node = document.getElementsByClassName('p')[0].lastChild
    Base.addClass(node, className)
    expect(node.className).toBe('extraClass')
  })
  test('node无初始class, 传入字符串', () => {
    document.body.innerHTML = tpl
    let className = 'extraClass1 extraClass2'
    let node = document.getElementsByClassName('p')[0].lastChild
    Base.addClass(node, className)
    expect(node.className).toBe('extraClass1 extraClass2')
  })
  test('node不存在', () => {
    document.body.innerHTML = tpl
    let className = ['extraClass']
    let node = document.getElementById('#notAlive')
    expect(Base.addClass(node, className)).toBeNull()
  })
  test('className为数组，且长度大于1', () => {
    document.body.innerHTML = tpl
    let node = document.getElementsByClassName('p')[0]
    let className = ['extraClass1', 'extraClass2']
    Base.addClass(node, className)
    expect(node.className).toBe('p extraClass1 extraClass2')
  })
  test('className为空数组', () => {
    document.body.innerHTML = tpl
    let node = document.getElementsByClassName('p')[0]
    let className = []
    Base.addClass(node, className)
    expect(node.className).toBe('p')
  })
  test('className为非数组或字符串', () => {
    document.body.innerHTML = tpl
    let node = document.getElementsByClassName('p')[0]
    let className = 123
    console.log(className)
    Base.addClass(node, className)
    expect(node.className).toBe('')
  })
})
describe('分组：removeClass', () => {
  const tpl = '<div id="test" class="cls1 cls2 cls3"></div>'
  test('remove cls1, 传入数组', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, ['cls1'])
    expect(node.className).toBe('cls2 cls3')
  })
  test('remove cls1, 传入字符串', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, 'cls1')
    expect(node.className).toBe('cls2 cls3')
  })
  test('remove cls2, 传入数组', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, ['cls2'])
    expect(node.className).toBe('cls1 cls3')
  })
  test('remove cls2, 传入字符串', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, 'cls1    cls3') // 测试多余空格的处理
    expect(node.className).toBe('cls2')
  })
  test('className为数组,且长度大于1', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, ['cls1', 'cls3'])
    expect(node.className).toBe('cls2')
  })
  test('className为空数组', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, [])
    expect(node.className).toBe('cls1 cls2 cls3')
  })
  test('node无初始class', () => {
    document.body.innerHTML = '<div></div>'
    let node = document.body.getElementsByTagName('div')[0]
    Base.removeClass(node, ['abc'])
    console.log(node.className === '')
    expect(node.className).toBe('')
  })
  test('node无匹配的className, 传入数组', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, ['cls4'])
    expect(node.className).toBe('cls1 cls2 cls3')
  })
  test('node无匹配的className, 传入字符串', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, 'cls4')
    expect(node.className).toBe('cls1 cls2 cls3')
  })
  test('className为非数组或字符串', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('test')
    Base.removeClass(node, 123)
    expect(node.className).toBe('cls1 cls2 cls3')
  })
  test('node不存在', () => {
    document.body.innerHTML = tpl
    let node = document.getElementById('#notAlive')
    expect(Base.removeClass(node, '')).toBeNull()
  })
})
