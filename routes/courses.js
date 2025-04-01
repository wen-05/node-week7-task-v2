const express = require('express')
const router = express.Router()

const coursesController = require('../controllers/coursesController')
const handleErrorAsync = require('../utils/handleErrorAsync');

const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('Course')
const config = require('../config/index')

const isAuth = require('../middlewares/isAuth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})

router.get('/', handleErrorAsync(coursesController.getCourses)
  // #swagger.description = '取得課程列表'

  /**
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": [
          {
            "id": "42a39cce-8f63-4a24-8ea3-d1f8ecdfc35b",
            "name": "瑜伽課程",
            "description": "瑜伽課程介紹",
            "start_at": "2025-01-01T00:00:000Z",
            "end_at": "2025-01-01T00:00:000Z",
            "max_participants": 10,
            "coach_name": "test",
            "skill_name": "瑜珈"
          }
        ]
      }
    }
  */
)

router.post('/:courseId', isAuth, handleErrorAsync(coursesController.enrollCourse)
  // #swagger.description = '報名課程'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]
     
   * #swagger.responses[200] = {
      schema: {
        "status": "success",
        "data": null
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

router.delete('/:courseId', isAuth, handleErrorAsync(coursesController.cancelCourse)
  // #swagger.description = '取消課程'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]
     
   * #swagger.responses[200] = {
      schema: {
        "status" : "success",
        "data": null
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

module.exports = router