/**
 * Returns the Server domain address depending on the environment (dev vs production)
 * If in production mode replace http protocol with websocket(ws) -- for heroku 
 * @returns {domain} Example: (dev: http://localhost:3030, prod: http://api.url.com)
 */
export default () => {
  const HOST = (process.env.NODE_ENV === 'development') ? 'http://localhost:3030' : location.origin.replace(/^http/, 'ws')
  return HOST
}
