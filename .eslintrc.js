// https://eslint.org/docs/user-guide/configuring
// 【eslintrc.js: eslint的配置文件】
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [ 
    // 【extends: [ 'standard' ] 表示继承一个标准的规则，】
    // 【这是也是初始化webpack时候选的standard选项】
    // 【比如 if() {} 必须写成 if () {}】
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // 【定的规则】
    // 【如果在项目中不需要这个规则可以在这里更改】
    // 【allow paren-less arrow function 允许箭头前面不写空格】
    // 【比如 arrow-parens： 0】
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development 【在开发阶段允许debugger】
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
