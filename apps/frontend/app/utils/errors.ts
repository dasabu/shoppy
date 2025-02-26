import { ErrorResponse } from '../interfaces/error-response.interface'

export const getErrorMessage = (response: ErrorResponse) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0])
    }
    return formatErrorMessage(response.message)
  }
  return 'Unknown error occured.'
}

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1)
}

// export const categorizeErrors = (response: ErrorResponse) => {
//   const message = response.message
//   const result: { email?: string; password?: string } = {}
//   if (Array.isArray(message)) {
//     message.forEach((msg) => {
//       const errorMessage = msg.toLowerCase()
//       if (errorMessage.includes('email')) {
//         result.email = formatErrorMessage(errorMessage)
//       } else if (errorMessage.includes('password')) {
//         result.password = formatErrorMessage(errorMessage)
//       }
//     })
//     return result
//   } else {
//     const errorMessage = message.toLowerCase()
//     if (errorMessage.includes('email'))
//       return { email: formatErrorMessage(errorMessage) }
//     else if (errorMessage.includes('password'))
//       return { password: formatErrorMessage(errorMessage) }
//     else
//       return {
//         email: formatErrorMessage(errorMessage),
//         password: formatErrorMessage(errorMessage),
//       }
//   }
// }
