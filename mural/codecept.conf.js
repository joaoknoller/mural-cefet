exports.config = {
  tests: './e2e/*.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:1234/',
      show: true,
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'mural'
}