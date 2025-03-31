const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const handleErrorAsync = require('../utils/handleErrorAsync');

const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('User')
const config = require('../config/index')

const isAuth = require('../middlewares/isAuth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})

router.post('/signup', handleErrorAsync(userController.signup, '建立使用者錯誤')
  // #swagger.description = '註冊使用者'

  /**
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "name" : "測試使用者",
        "email" : "test@example.com",
        "password" : "test123456"
      }
    }

   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "user": {
          "id": "f1b26209-ce52-4cd9-8d45-fbb7448d90dc",
          "name": "測試使用者"
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": false,
        "message": "欄位未填寫正確",
      }
    }

   * #swagger.responses[409] = {
      schema: {
        "status": false,
        "message": "Email已被使用"
      }
    }
   */
)

router.post('/login', handleErrorAsync(userController.login, '登入錯誤:')
  // #swagger.description = '登入會員'

  /**
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "email": "test@gmail.com",
        "password": "test123456"
      }
    }

   * #swagger.responses[201] = {
      schema: {
        "status": "success",
        "data": {
          "token": "woiewnoiue120380efhkjds1ij...",
          "user": {
            "name": "測試使用者"
          }
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": false,
        "message": "欄位未填寫正確"
      }
    }
   */
)

router.put('/password', isAuth, handleErrorAsync(userController.forgetPassword)
  // #swagger.description = '使用者更新密碼'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]
   
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "password" : "hexSchool12345",
        "new_password" : "hexsShool666",
        "confirm_new_password" : "hexSchool666"
      }
    }

   * #swagger.responses[201] = {
      schema: {
        "status" : "success",
        "data": null
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": false,
        "message": "欄位未填寫正確"
      }
    }
   */
)

router.get('/profile', isAuth, handleErrorAsync(userController.getProfile, '取得使用者資料錯誤:')
  // #swagger.description = '取得個人資料'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]

   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
          "user": {
            "email": "test@example.com",
            "name": "測試使用者"
          }
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": false,
        "message": "欄位未填寫正確"
      }
    }
   */
)

router.put('/profile', isAuth, handleErrorAsync(userController.editProfile, '更新使用者資料錯誤:')
  // #swagger.description = '更新個人資料'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]

   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "name" : "新暱稱"
      }
    }
  
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
          "user": {
            "name": "新暱稱"
          }
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": false,
        "message": "欄位未填寫正確"
      }
    }
   */
)

router.get('/credit-package', isAuth, handleErrorAsync(userController.getPurchaseCreditPackage)
  // #swagger.description = '取得使用者已購買的方案列表'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]
      
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": [
          {
            "purchased_credits": 7,
            "price_paid": 1400,
            "name": "14堂組合包方案",
            "purchase_at": "2025-01-01T00:00:000Z"
          }
        ]
      }
    } 
   */
)

router.get('/courses', isAuth, handleErrorAsync(userController.getEnrollCourse)
  // #swagger.description = '取得已預約的課程列表'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]
     
   * #swagger.responses[200] = {
      schema: {
        "status" : "success",
        "data": {
          "credit_usage": 2,
          "credit_remain": 10,
          "course_booking": [
            {
              "name": "瑜伽班",
              "course_id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
              "coach_name": "測試教練",
              "status": "pending",
              "start_at": "2024-12-31T16:00:00Z",
              "end_at": "2024-12-31T18:00:00Z",
              "meeting_url": "https://..."
            }
          ]
        }
      }
    } 
   */
)

module.exports = router