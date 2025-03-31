const express = require('express')
const router = express.Router()

const creditPackageRouter = require('./creditPackage')
const skillRouter = require('./skill')
const coachRouter = require('./coach')
const userRouter = require('./users')
const adminRouter = require('./admin')
const coursesRouter = require('./courses')
const uploadRouter = require('./upload')

router.use('/credit-package', creditPackageRouter
  // #swagger.tags = ['CreditPackage']
)
router.use('/coaches/skill', skillRouter
  // #swagger.tags = ['Skill']
)
router.use('/coaches', coachRouter
  // #swagger.tags = ['Coaches']
)
router.use('/users', userRouter
  // #swagger.tags = ['Users']
)
router.use('/admin/coaches', adminRouter
  // #swagger.tags = ['Admin']

  /**
   * #swagger.security = [{ "apiKeyAuth": [] }]
   */
)
router.use('/courses', coursesRouter
  // #swagger.tags = ['Courses']
)
router.use('/upload', uploadRouter
  // #swagger.tags = ['Upload']
)

module.exports = router