import { mapValues } from 'lodash'
import { getDomain } from './index'

export default mapValues({
  USER: 'auth/user',
  PROFILE: 'server/user'
}, (url) => `${getDomain()}/${url}`)
