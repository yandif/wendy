import { usernameReg } from '@src/constant'
import { buildMessage, isEmail, isMobilePhone, ValidateBy, ValidationOptions } from 'class-validator'

export const IS_USER_NAME = 'isUserName'

export const isUserName = (value: unknown): boolean => {
  return typeof value === 'string' && (usernameReg.test(value) || isMobilePhone(value, 'zh-CN') || isEmail(value))
}

export function IsUserName(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_USER_NAME,
      constraints: [],
      validator: {
        validate: (value): boolean => isUserName(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix}$property 只能是邮箱，手机号码，4-20位的数字或大小写字母或.`,
          validationOptions
        ),
      },
    },
    validationOptions
  )
}
