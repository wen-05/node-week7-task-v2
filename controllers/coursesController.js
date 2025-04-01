const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('Course')
const { handleSuccess } = require('../utils/sendResponse')
const appError = require('../utils/appError')

const { IsNull } = require('typeorm')

// 錯誤訊息管理
const ERROR_MESSAGES = {
  ID_ERROR: "ID錯誤",
  ALREADY_REGISTERED: "已經報名過此課程",
  NO_CREDITS: "已無可使用堂數",
  MAX_PARTICIPANTS_REACHED: "已達最大參加人數，無法參加",
  CANCEL_FAILED: "取消失敗",
  COURSE_NOT_FOUND: "課程不存在"
 }

const getCourses = async (req, res, next) => {
  const courses = await dataSource.getRepository('Course').find({
    select: {
      id: true,
      name: true,
      description: true,
      start_at: true,
      end_at: true,
      max_participants: true,
      User: {
        name: true
      },
      Skill: {
        name: true
      }
    },
    relations: {
      User: true,
      Skill: true
    }
  })

  handleSuccess(res, 200, courses.map(course => (
    {
      id: course.id,
      name: course.name,
      description: course.description,
      start_at: course.start_at,
      end_at: course.end_at,
      max_participants: course.max_participants,
      coach_name: course.User.name,
      skill_name: course.Skill.name
    }
  )))
}

const enrollCourse = async (req, res, next) => {
  const { id } = req.user
  const { courseId } = req.params

  const courseRepo = dataSource.getRepository('Course')
  const course = await courseRepo.findOneBy({ id: courseId })
  if (!course) {
    next(appError(400, ERROR_MESSAGES.ID_ERROR))
    return
  }

  const creditPurchaseRepo = dataSource.getRepository('CreditPurchase')

  const courseBookingRepo = dataSource.getRepository('CourseBooking')
  const userCourseBooking = await courseBookingRepo.findOne({
    where: {
      user_id: id,
      course_id: courseId
    }
  })

  if (userCourseBooking) {
    next(appError(400, ERROR_MESSAGES.ALREADY_REGISTERED))
    return
  }

  const userCredit = await creditPurchaseRepo.sum('purchased_credits', {
    user_id: id
  })

  const userUsedCredit = await courseBookingRepo.count({
    where: {
      user_id: id,
      cancelledAt: IsNull()
    }
  })

  const courseBookingCount = await courseBookingRepo.count({
    where: {
      course_id: courseId,
      cancelledAt: IsNull()
    }
  })

  if (userUsedCredit >= userCredit) {
    next(appError(400, ERROR_MESSAGES.NO_CREDITS))
    return
  } else if (courseBookingCount >= course.max_participants) {
    next(appError(400, ERROR_MESSAGES.MAX_PARTICIPANTS_REACHED))
    return
  }

  const newCourseBooking = await courseBookingRepo.create({
    user_id: id,
    course_id: courseId
  })

  await courseBookingRepo.save(newCourseBooking)
  handleSuccess(res, 201, null)
}

const cancelCourse = async (req, res, next) => {
  const { id } = req.user
  const { courseId } = req.params

  const courseBookingRepo = dataSource.getRepository('CourseBooking')
  const userCourseBooking = await courseBookingRepo.findOne({
    where: {
      user_id: id,
      course_id: courseId,
      cancelledAt: IsNull()
    }
  })

  if (!userCourseBooking) {
    next(appError(400, ERROR_MESSAGES.ID_ERROR))
    return
  }

  const updateResult = await courseBookingRepo.update(
    {
      user_id: id,
      course_id: courseId,
      cancelledAt: IsNull()
    },
    {
      cancelledAt: new Date().toISOString()
    }
  )

  if (updateResult.affected === 0) {
    next(appError(400, ERROR_MESSAGES.CANCEL_FAILED))
    return
  }

  handleSuccess(res, 200, null)
}

module.exports = { getCourses, enrollCourse, cancelCourse }