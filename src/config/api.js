import { mapValues } from 'lodash'
const config = {
  dev: {
    serverRoot: 'localhost:7001'
  },
  prod: {
    serverRoot: 'api.example.com'
  }
}
/**
 * Returns the AJAX HTTP url depending on the environment (dev/prod)
 * @returns {domain} Example: (dev: http://localhost:7001, prod: http://api.url.com)
 */
const getDomain = () => {
  const http = window.location.href.indexOf('https') === 0 ? 'https://' : 'http://'
  const apiUrl = process.env.NODE_ENV === 'development' ? config.dev.serverRoot : config.prod.serverRoot
  return http + apiUrl
}

export default mapValues({
  USER: 'auth/user',
  PROFILE: 'server/user'
  // STAT: '/server/stat',
  // API: '/server/api/:groupId/:apiId',
  // API_HISTORY: '/server/history/api/:apiId',
  // API_AUTHORITY: '/server/authority/api/:apiId',
  // API_FOLLOWER: '/server/api/follower/:apiId',
  // GROUPS: '/server/group',
  // GROUP: '/server/group/:groupId',
  // APIS: '/server/api',
  // GROUP_APIS: '/server/api/:groupId'
}, (url) => `${getDomain()}/${url}`)
