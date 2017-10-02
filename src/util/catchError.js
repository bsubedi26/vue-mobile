/**
  * Returns a promise rejection when an http error occurs
  * @param {err: Object} 
*/

export default (err) => {
  console.log('.catch error response: ', err.response)
  if (err.response && err.response.status === 401) {
    window.location.href = '#/login'
  }
  if (!err.response) {
    return Promise.reject(new Error('There was no response from the request.'))
  }
  return Promise.reject(err.response)
}
