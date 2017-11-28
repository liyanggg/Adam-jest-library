module.exports = {
  testMatch: ['<rootDir>/test/**/*.js'],
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  testEnvironment: 'jsdom', // node
  rootDir: '', // 默认packge.json所在目录，'pwd'为当前目录
  moduleFileExtensions: ['js', 'json', 'jsx', 'node']
}
