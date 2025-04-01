const express = require('express')
const router = express.Router()

const creditPackageController = require('../controllers/creditPackageController')
const handleErrorAsync = require('../utils/handleErrorAsync');

const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('CreditPackage')
const config = require('../config/index')

const isAuth = require('../middlewares/isAuth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})

router.get('/', handleErrorAsync(creditPackageController.getCreditPackage)
  // #swagger.description = '取得購買方案列表'

  /** 
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": [
          {
            "id": "d66c88db-38df-4d6a-9d69-acb16dacf989",
            "name": "7堂組合包方案",
            "credit_amount": 7,
            "price": "1400.00"
          }
        ]
      }
    } 
  */
)

router.post('/', handleErrorAsync(creditPackageController.createCreditPackage)
  // #swagger.description = '新增購買方案'

  /**
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "name": "7堂組合包方案",
        "credit_amount": 7,
        "price": 1400
      }
    }

   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": [
          {
            "id": "d66c88db-38df-4d6a-9d69-acb16dacf989",
            "name": "7堂組合包方案",
            "credit_amount": 7,
            "price": "1400.00"
          }
        ]
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": "failed",
        "message": "欄位未填寫正確"
      }
    }

   * #swagger.responses[409] = {
      schema: {
        "status": "failed",
        "message": "資料重複"
      }
    }
  */
)

router.post('/:creditPackageId', isAuth, handleErrorAsync(creditPackageController.purchaseCreditPackage)
  // #swagger.description = '使用者購買方案'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]

   * #swagger.responses[201] = {
      schema: {
        "status": "success",
        "data": null
      }
    }

   * #swagger.responses[400] = {
      schema: {
          "status": "failed",
          "message": "ID錯誤"
      }
    }
   */
)

router.delete('/:creditPackageId', handleErrorAsync(creditPackageController.deleteCreditPackage)
  // #swagger.description = '刪除購買方案'

  /**
   * #swagger.responses[200] = {
      schema: {
        "status": "success"
      }
    }
      
   * #swagger.responses[400] = {
      schema: {
          "status": "failed",
          "message": "ID錯誤"
      }
    }
   */
)

module.exports = router