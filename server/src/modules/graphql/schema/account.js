import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import {
  forgotPassword,
  resetPassword,
  getResetCode
} from 'services/reset-password-code'
import { sendEmailRegister, sendEmailResetPassword } from 'services/send-email'
import { Account, AccountStruct } from '../types/Account'

export default () => ({
  _createAccount: {
    args: {
      account: {
        type: new GraphQLNonNull(AccountStruct)
      }
    },
    type: Account,
    resolve: async (rootValue, { account }) => {
      const infoAccount = await createAccount(account)
      if (!infoAccount) {
        return infoAccount
      }
      const { email } = infoAccount
      const resetPasswordCode = await forgotPassword(email)
      const { code } = resetPasswordCode
      await sendEmailRegister(email, code)
      return infoAccount
    }
  },
  _forgotPassword: {
    args: {
      email: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, { email }) => {
      const resetPasswordCode = await forgotPassword(email)
      if (!resetPasswordCode) {
        return false
      }
      const { code } = resetPasswordCode
      const sendEmail = await sendEmailResetPassword(email, code)
      return sendEmail
    }
  },
  _resetPassword: {
    args: {
      account: {
        type: GraphQLNonNull(AccountStruct)
      },
      code: {
        type: GraphQLNonNull(GraphQLString)
      },
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, { account, code }) => {
      return await resetPassword(account, code)
    }
  },
  resetCode: {
    args: {
      code: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: Account,
    resolve: async (rootValue, { code }) => {
      return await getResetCode(code)
    }
  }
})
