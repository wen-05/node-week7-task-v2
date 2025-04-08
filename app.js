const express = require('express')
const cors = require('cors')
const path = require('path')
const pinoHttp = require('pino-http')

const logger = require('./utils/logger')('App')

const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const options = {
  swaggerOptions: {
    // 使用 requestInterceptor(攔截器) 修改 Authorization 標頭
    requestInterceptor: function (req) {
      if (req.headers.authorization && !req.headers.authorization.startsWith('Bearer ')) {
        req.headers.authorization = 'Bearer ' + req.headers.authorization;
      }
      return req;
    },
  },
}

const indexRouter = require('./routes/index')

const app = express()
app.use(cors())
app.use(express.json({ limit: '10kb' }))  // 預防惡意用戶傳送過大的 JSON 導致系統異常
app.use(express.urlencoded({ extended: false }))
app.use(pinoHttp({
  logger,
  serializers: {
    req (req) {
      req.body = req.raw.body
      return req
    }
  }
}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/healthcheck', (req, res) => {
  // #swagger.ignore = true
  res.status(200)
  res.send('OK')
})

app.use('/api', indexRouter)

// 修改 swagger-ui-express 的設置
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, options))

app.use((req, res, next) => {
  next({ status: 404, message: '無此路由資訊' })
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  req.log.error(err)
  const statusCode = err.status || 500; // 400, 409, 500 ...
  res.status(statusCode).json({
    status: statusCode === 500 ? 'error' : 'failed',
    message: err.message || '伺服器錯誤'
  });
})

module.exports = app
