import axios from 'axios'
import { addImageDescription } from 'src/util'

const actions = {
  _handleError (error) {
    console.log('.catch error: ', error)
    return Promise.reject(error)
  },
  _fetch (ctx, url) {
    return axios.get(url).catch(actions._handleError)
    // return axios.get(`error.url.limit=10`).catch(actions.handleError)
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

const mutations = {
  SET_CURRENCIES (state, currencies) {
    state.currencies = currencies
  },
  SET_ALL_CURRENCIES (state, data) {
    state.allCurrencies = data
  }
}

const state = {
  currencies: [],
  allCurrencies: []
}

const getters = {
  currencies: (state) => state.currencies,
  allCurrencies: (state) => state.allCurrencies,
  filterAllCurrencies (state) {
    return (searchName) => {
      const currencyFound = state.allCurrencies.filter(currency => currency.id === searchName)
      return currencyFound[0]
    }
  },
  currency (state) {
    return (searchName) => {
      const currencyFound = state.currencies.filter(currency => currency.id === searchName)
      return currencyFound[0]
    }
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
