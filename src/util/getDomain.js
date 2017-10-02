/**
 * Temporary config object for development vs production configuration
*/
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
export default () => {
  const http = window.location.href.indexOf('https') === 0 ? 'https://' : 'http://'
  const apiUrl = process.env.NODE_ENV === 'development' ? config.dev.serverRoot : config.prod.serverRoot
  return http + apiUrl
}
