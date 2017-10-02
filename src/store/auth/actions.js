import axios from 'axios'
import API from '../../config/api'
import { catchError } from 'src/util'

// allow cross-domain requests to bring cookies
axios.defaults.withCredentials = true
axios.interceptors.response.use(null, catchError)

export default function makeAuthActions () {
  const actions = {
    async checkCookie () {
      const response = await axios.get(`${API.USER}/cookie`)
      return response
    },
    async signup ({ commit }, user) {
      const response = await axios.post(`${API.USER}/signup`, user)
      // commit('SET_USER', res.data)
      return response
    },
    async login ({ commit }, user) {
      const response = await axios.post(`${API.USER}/login`, user)
      // commit('SET_USER', res.data)
      return response
    },
    async logout ({ commit }) {
      const response = await axios.get(`${API.USER}/logout`)
      // commit('SET_USER', null)
      return response
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
