const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')

const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('Admin')
const config = require('../config/index')

const isAuth = require('../middlewares/isAuth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})
const isCoach = require('../middlewares/isCoach')

const handleErrorAsync = require('../utils/handleErrorAsync');

router.get('/', isAuth, isCoach, handleErrorAsync(adminController.getCoachInformation)
  // #swagger.description = '取得教練自己的詳細資料'

  /**
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
          "id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
          "experience_years": 1,
          "description": "瑜伽教練",
          "profile_image_url": "https://...",
          "skill_ids": ["1c8da31a-5fd2-44f3-897e-4a259e7ec62b"] 
        }
      }
    }

    * #swagger.responses[400] = {
      schema: {
        "status": "false",
        "message": "欄位未填寫正確"
      }
    }
   */
)

router.put('/', isAuth, isCoach, handleErrorAsync(adminController.editCoachInformation)
  // #swagger.description = '變更教練資料'

  /**
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "experience_years" : 1,
        "description": "瑜伽教練",
        "profile_image_url": "https://...",
        "skill_ids": ["1c8da31a-5fd2-44f3-897e-4a259e7ec62b"] 
      }
    }

   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
          "image_url": "https://..."
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": "failed",
        "message": "欄位未填寫正確"
      }
    }
   */
)

router.get('/courses', isAuth, isCoach, handleErrorAsync(adminController.getCourse)
  // #swagger.description = '取得教練自己的課程列表'

  /**
   * #swagger.responses[200] = {
      schema: {
        "status" : "success",
        "data": [
          {
            "id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "status": "報名中",
            "name": "瑜伽課程",
            "start_at": "2025-01-01 16:00:00",
            "end_at": "2025-01-01 18:00:00",
            "max_participants": 10,
            "participants": 5
          }
        ]
      }
    }

   * #swagger.responses[401] = {
      schema: {
        "status": "failed",
        "message": "請先登入"
      }
    }
   */
)

router.get('/courses/:courseId', isAuth, isCoach, handleErrorAsync(adminController.getDetailCourse)
  // #swagger.description = '取得教練自己的課程詳細資料''

  /**
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
            "id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "skill_name": "瑜珈",
            "name": "瑜伽課程",
            "description": "瑜伽課程介紹",
            "start_at": "2025-01-01 16:00:00",
            "end_at": "2025-01-01 18:00:00",
            "max_participants": 10
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": "failed",
        "message": "欄位未填寫正確"
      }
    }
   */
)

router.post('/courses', isAuth, isCoach, handleErrorAsync(adminController.createCourse)
  // #swagger.description = '新增教練課程資料'

  /**
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "user_id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
        "skill_id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
        "name": "瑜伽課程",
        "description": "瑜伽課程介紹",
        "start_at": "2025-01-01 16:00:00",
        "end_at": "2025-01-01 18:00:00",
        "max_participants": 10,
        "meeting_url": "https://...."
      }
    }

   * #swagger.responses[201] = {
      schema: {
        "status": "success",
        "data": {
          "course": {
            "id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "user_id" : "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "skill_id" : "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "name" : "瑜伽課程",
            "description" : "瑜伽課程介紹",
            "start_at" : "2025-01-01 16:00:00",
            "end_at" : "2025-01-01 18:00:00",
            "max_participants" : 10,
            "meeting_url" : "https://....",
            "created_at": "2025-01-01T00:00:000Z",
            "updated_at": "2025-01-01T00:00:000Z"
          }
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
        "status": "failed",
        "message": "欄位未填寫正確"
      }
    }
  */
)

router.put('/courses/:courseId', isAuth, isCoach, handleErrorAsync(adminController.editCourse)
  // #swagger.description = '編輯教練課程資料'

  /**
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "skill_id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
        "name": "瑜伽課程",
        "description": "瑜伽課程介紹",
        "start_at": "2025-01-01 16:00:00",
        "end_at": "2025-01-01 18:00:00",
        "max_participants": 10,
        "meeting_url": "https://...."
      }
    }

   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": {
          "course": {
            "id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "user_id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "skill_id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "name": "瑜伽課程",
            "description": "瑜伽課程介紹",
            "start_at": "2025-01-01 16:00:00",
            "end_at": "2025-01-01 18:00:00",
            "max_participants": 10,
            "meeting_url": "https://....",
            "created_at": "2025-01-01T00:00:000Z",
            "updated_at": "2025-01-02T00:00:000Z"
          }
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
          "status": "failed",
          "message": "欄位未填寫正確",
      }
    }
  */
)

router.get('/revenue', isAuth, isCoach, handleErrorAsync(adminController.getCoachMonthlyIncome)
  // #swagger.description = '取得教練自己的月營收資料'

  /**
   * #swagger.parameters['month'] = {
      in: 'query',
      type: 'string',
      required: true,
      schema: {
        "month": 'january'
      },
      description: '需為全小寫月份名稱'
    }

   * #swagger.responses[200] = {
      schema: {
        "status" : "success",
        "data": {
          "total": {
            "participants": 10,
            "revenue": 10000,
            "course_count": 2
          }
        }
      }
    }

   * #swagger.responses[400] = {
      schema: {
          "status": "failed",
          "message": "欄位未填寫正確",
      }
    }
   */
)

router.post('/:userId', isAuth, handleErrorAsync(adminController.editRole)
  // #swagger.description = '將使用者新增為教練'

  /**
   * #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "experience_years" : 1,
        "description" : "瑜伽教練",
        "profile_image_url" : "https://..."
      }
    }

   * #swagger.responses[201] = {
      schema: {
        "status": "success",
        "data": {
          "user": {
            "name": "test",
            "role": "COACH"
          },
          "coach": {
            "id": "1c8da31a-5fd2-44f3-897e-4a259e7ec62b",
            "user_id": "51feb472-a9b8-4365-b9a5-79b9594315a6",
            "experience_years" : 1,
            "description" : "瑜伽教練",
            "profile_image_url" : "https://...",
            "created_at": "2025-01-01T00:00:000Z",
            "updated_at": "2025-01-01T00:00:000Z"
          }
        }
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
          "message": "使用者已經是教練"
      }
    }
   */
)

module.exports = router