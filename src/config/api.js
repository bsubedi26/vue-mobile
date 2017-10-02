import { mapValues } from 'lodash'
import { getDomain } from 'src/util'

export default mapValues({
  USER: 'auth/user',
  PROFILE: 'server/user'
}, (url) => `${getDomain()}/${url}`)
