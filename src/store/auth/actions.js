import axios from 'axios'
import API from '../../config/api'

const catchError = (err) => {
  console.log('.catch error! ', err)
  if (err.response && err.response.status === 401) {
    window.location.href = '#/login'
  }
  if (!err.response) {
    return Promise.reject(new Error('There was no response from the request.'))
  }
  return Promise.reject(err)
}

// allow cross-domain requests to bring cookies
axios.defaults.withCredentials = true
axios.interceptors.response.use(null, catchError)

export default function makeAuthActions () {
  const actions = {
    checkCookie () {
      return axios.get(`${API.USER}/cookie`).then(res => {
        // commit('SET_USER', res.data)
        console.log('.then ', res)
        return res
      })
    },
    register ({ commit }, user) {
      return axios.post(`${API.USER}/register`, user).then(res => {
        // commit('SET_USER', res.data)
        return res
      })
    },
    login ({ commit }, user) {
      return axios.post(`${API.USER}/login`, user).then(res => {
        // commit('SET_USER', res.data)
        return res
      })
    },
    logout ({ commit }) {
      return axios.get(`${API.USER}/logout`).then(res => {
        commit('SET_USER', null)
        return res
      })
    },
    async deleteAccount (store, _id) {
      if (!_id) { return }
      console.log('delete id ', _id)
      // WARNING: remove(undefined) deletes ALL documents
      // const response = await userService.remove(_id)
      const response = await Promise.resolve(5)
      store.dispatch('logout')
      return Promise.resolve(response)
    },
    async changePassword (store, credentials) {
      // const { oldpass, newPassword, _id } = credentials
      console.log('input credentials ', credentials)
      // const results = await userService.patch(_id, { oldpass: oldpass, password: newPassword })
      const results = await Promise.resolve(5)
      return Promise.resolve(results)
    },
    authenticate (store, data) {
      const { commit, state } = store

      commit('setAuthenticatePending')
      if (state.errorOnAuthenticate) {
        commit('clearAuthenticateError')
      }
      return Promise.resolve(5)
      // return feathers.authenticate(data)
      //   .then(response => {
      //     commit('setAccessToken', response.accessToken)

      //     // Decode the token and set the payload, but return the response
      //     return feathers.passport.verifyJWT(response.accessToken)
      //       .then(payload => {
      //         commit('setPayload', payload)

      //         // Populate the user if the userService was provided
      //         if (auth.userService && payload.hasOwnProperty('userId')) {
      //           return dispatch('populateUser', payload.userId)
      //             .then(() => {
      //               commit('unsetAuthenticatePending')
      //               return response
      //             })
      //         }
      //         else {
      //           commit('unsetAuthenticatePending')
      //         }
      //         return response
      //       })
      //   })
      //   .catch(error => {
      //     commit('setAuthenticateError', error)
      //     commit('unsetAuthenticatePending')
      //     return Promise.reject(error)
      //   })
    },

    populateUser ({ commit }, userId) {
      return Promise.resolve(5)
      // return feathers.service(auth.userService)
      //   .get(userId)
      //   .then(user => {
      //     commit('setUser', user)
      //     return user
      //   })
    }
  }

  return actions
}
