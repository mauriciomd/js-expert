import { describe, expect, test, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/utils/exceptions.js'

describe('#BaseBusiness', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should throw an error when a child class does not implement the method _validateRequiredFields', () => {
    class ConcreteClass extends BaseBusiness {}
    const concrete = new ConcreteClass()
    const validationError = new NotImplementedException({ message: concrete._validateRequiredFields.name})

    expect(() => concrete.create({})).toThrow(validationError)
  })
  
  test('should throw an error when _validateRequiredFields returns false', () => {
    const VALIDATION_DOESNT_SUCCEEDED = false
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEEDED)
    }

    const concrete = new ConcreteClass()
    const validationError = new Error('Invalid data!')


    expect(() => concrete.create({})).toThrow(validationError)
  })

  test('should throw an error when a child class does not implement the method _create', () => {
    const VALIDATION_SUCCEEDED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
    }

    const concrete = new ConcreteClass()
    const createError = new NotImplementedException({ message: concrete._create.name})


    expect(() => concrete.create({})).toThrow(createError)
  })

  test('should call _validateRequiredField and _create on create', () => {
    const VALIDATION_SUCCEEDED = true
    const CREATE_SUCCEEDED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
      _create = jest.fn().mockReturnValue(CREATE_SUCCEEDED)
    }

    const concrete = new ConcreteClass()
    const createFromBaseClassFn = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name)
    const result = concrete.create({})

    expect(result).toBeTruthy()
    expect(createFromBaseClassFn).toHaveBeenCalled() // Create method from base class
    expect(concrete._validateRequiredFields).toHaveBeenCalled()
    expect(concrete._create).toHaveBeenCalled()
  })
})