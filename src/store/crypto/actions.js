import axios from 'axios'
import { addImageDescription } from 'src/util'

const actions = {
  _handleError (error) {
    console.log('.catch error: ', error)
    return Promise.reject(error)
  },
  _simulate404 () {
    return axios.get(`error.url.limit=10`).catch(actions.handleError)
  },
  _fetch (ctx, url) {
    return axios.get(url).catch(actions._handleError)
  },

  async getTopTenCoins ({ commit, dispatch }) {
    const response = await dispatch('_fetch', 'https://express-api3.herokuapp.com/api/coin/?limit=10')
    const { currencies } = response.data
    const results = currencies.map(addImageDescription)
    commit('SET_CURRENCIES', results)
  },
  async getAllCoins ({ commit, dispatch }) {
    const response = await dispatch('_fetch', 'https://express-api3.herokuapp.com/api/coin/all')
    commit('SET_ALL_CURRENCIES', response.data.currencies)
  }

}

export default actions
