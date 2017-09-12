export default function makeAuthActions (feathers, options) {
  const userService = feathers.service('users')
  const { auth } = options

  const actions = {
    async deleteAccount (store, _id) {
      if (!_id) { return }
      console.log('delete id ', _id)
      // WARNING: remove(undefined) deletes ALL documents
      const response = await userService.remove(_id)
      store.dispatch('logout')
      return Promise.resolve(response)
    },
    async changePassword (store, credentials) {
      const { oldpass, newPassword, _id } = credentials
      console.log('input credentials ', credentials)
      const results = await userService.patch(_id, { oldpass: oldpass, password: newPassword })
      return Promise.resolve(results)
    },
    authenticate (store, data) {
      const { commit, state, dispatch } = store

      commit('setAuthenticatePending')
      if (state.errorOnAuthenticate) {
        commit('clearAuthenticateError')
      }
      return feathers.authenticate(data)
        .then(response => {
          commit('setAccessToken', response.accessToken)

          // Decode the token and set the payload, but return the response
          return feathers.passport.verifyJWT(response.accessToken)
            .then(payload => {
              commit('setPayload', payload)

              // Populate the user if the userService was provided
              if (auth.userService && payload.hasOwnProperty('userId')) {
                return dispatch('populateUser', payload.userId)
                  .then(() => {
                    commit('unsetAuthenticatePending')
                    return response
                  })
              }
              else {
                commit('unsetAuthenticatePending')
              }
              return response
            })
        })
        .catch(error => {
          commit('setAuthenticateError', error)
          commit('unsetAuthenticatePending')
          return Promise.reject(error)
        })
    },

    populateUser ({ commit }, userId) {
      return feathers.service(auth.userService)
        .get(userId)
        .then(user => {
          commit('setUser', user)
          return user
        })
    },

    logout ({commit}) {
      commit('setLogoutPending')
      return feathers.logout()
        .then(response => {
          commit('logout')
          commit('unsetLogoutPending')
          return response
        })
        .catch(error => {
          return Promise.reject(error)
        })
    }
  }

  return actions
}
