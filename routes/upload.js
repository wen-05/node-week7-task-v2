const express = require('express')
const router = express.Router()

const uploadController = require('../controllers/uploadController')
const handleErrorAsync = require('../utils/handleErrorAsync');

const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('User')
const config = require('../config/index')

const isAuth = require('../middlewares/isAuth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})

router.post('/', isAuth, handleErrorAsync(uploadController.postUploadImage)
  // #swagger.description = '上傳圖片至 Cloudinary'

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]

   * #swagger.parameters['file'] = {
      in: 'formData',
      type: 'file',
      required: true,
      description: '上傳的圖片檔案',
    }
  
   * #swagger.responses[200] = {
      schema: {
        "status" : "success",
        "data": {
          "image_url": "https://..."
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