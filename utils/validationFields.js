const { isUndefined, isNotValidString } = require('../utils/valid')
const logger = require('../utils/logger')('validationFields')

const validationFields = (fields) => {
  for (const [key, value] of Object.entries(fields)) { 
    if (isUndefined(value) || isNotValidString(value)) {
      logger.warn(`欄位 ${key} 未填寫正確`)
      return `欄位 ${key} 未填寫正確`
    } 
  } 
return null 
}

module.exports = validationFields;