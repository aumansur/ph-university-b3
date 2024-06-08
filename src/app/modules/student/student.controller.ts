import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StudentServices } from './student.service'

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await StudentServices.getSingleStudentFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  })
})

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  // const searchTerm = req.query.searchQuery
  const result = await StudentServices.getAllStudentsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  })
})

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const { student } = req.body
  const result = await StudentServices.updateStudentIntoDB(id, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StudentServices.deleteStudentFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
