const express = require('express')
const router = express.Router()

const coachController = require('../controllers/coachController')
const handleErrorAsync = require('../utils/handleErrorAsync');

router.get('/', handleErrorAsync(coachController.getList)
  // #swagger.description = '取得教練列表'

  /**
   * #swagger.parameters['per'] = {
      in: 'query',
      type: 'number',
      required: true,
      schema: {
        "per": 10
      },
      description: '每頁筆數'
    }

   * #swagger.parameters['page'] = {
      in: 'query',
      type: 'number',
      required: true,
      schema: {
        "page": 1
      },
      description: '目前分頁'
    }
    
   * #swagger.responses[200] = {
      schema: {
        "status" : "success",
        "data": [
          {
            "id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "name": "test"
          }
        ]
      }
    }
   */
)

router.get('/:coachId', handleErrorAsync(coachController.getDetail)
  // #swagger.description = '取得教練詳細資訊'

  /**
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
          "user": {
            "name": "test",
            "role": "COACH"
          },
          "coach": {
            "id": "340f5553-a158-4846-94d1-2915eee12ec4",
            "user_id": "b46fb7c5-9116-4275-a2ff-a77ee78f2c63",
            "experience_years": 1,
            "description": "瑜伽教練",
            "profile_image_url": "https://...",
            "created_at": "2025-01-01T00:00:000Z",
            "updated_at": "2025-01-01T00:00:000Z"
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

router.get('/:coachId/courses', handleErrorAsync(coachController.getCourses)
  // #swagger.description = '取得指定教練課程列表'

  /**
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
          "id": "afd5cdd3-8454-4e1e-80e4-e3d121bc3c63",
          "coach_name": "test",
          "skill_name": "瑜珈",
          "name": "瑜伽課程",
          "description": "瑜伽課程介紹",
          "start_at": "2025-01-01T00:00:000Z",
          "end_at": "2025-01-01T00:00:000Z",
          "max_participants": 10
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

module.exports = router