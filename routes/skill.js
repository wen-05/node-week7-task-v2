const express = require('express')
const router = express.Router()

const skillController = require('../controllers/skillController')
const handleErrorAsync = require('../utils/handleErrorAsync');

router.get('/', handleErrorAsync(skillController.getSkill)
  // #swagger.description = '取得教練專長列表'

  /**
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": [
          {
            "id": "f1b26209-ce52-4cd9-8d45-fbb7448d90dc",
            "name": "瑜珈"
          }
        ]
      }
    }
  */
)

router.post('/', handleErrorAsync(skillController.createSkill)
  // #swagger.description = '新增教練專長'

  /**
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "name": "瑜珈"
      }
    }

   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
          "name": "瑜珈",
          "id": "f1b26209-ce52-4cd9-8d45-fbb7448d90dc",
          "createdAt": "2025-01-01T00:00:000Z"
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
          "status": false,
          "message": "欄位未填寫正確"
      }
    }

   * #swagger.responses[409] = {
      schema: {
          "status": false,
          "message": "資料重複"
      }
    }
  */
)

router.delete('/:creditPackageId', handleErrorAsync(skillController.deleteSkill)
  // #swagger.description = '刪除教練專長'

  /**
   * #swagger.responses[200] = {
      schema: {
        "status": "success"
      }
    }
      
   * #swagger.responses[400] = {
      schema: {
          "status": false,
          "message": "ID錯誤"
      }
    }
   */
)

module.exports = router