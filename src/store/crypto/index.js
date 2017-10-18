import axios from 'axios'
import currenciesJSON from './data.json'
const root = '//api.coinmarketcap.com/v1/ticker/'

const actions = {
  _handleError (error) {
    console.log('.catch error: ', error)
    return Promise.reject(error)
  },
  _fetch (ctx, url) {
    return axios.get(url).catch(actions._handleError)
    // return axios.get(`error.url.limit=10`).catch(actions.handleError)
  },

  _addImage ({ commit }, currencies) {
    return currencies.map(cryptoCurrency => {
      cryptoCurrency.id = cryptoCurrency.id in currenciesJSON ? cryptoCurrency.id : undefined
      cryptoCurrency.image = `${cryptoCurrency.id}_image`
      cryptoCurrency.description = currenciesJSON[cryptoCurrency.id].description
      cryptoCurrency.paper = currenciesJSON[cryptoCurrency.id].paper
      cryptoCurrency.github = currenciesJSON[cryptoCurrency.id].github
      cryptoCurrency.website = currenciesJSON[cryptoCurrency.id].website
      return cryptoCurrency
    })
  },

  async getTopTenCoins ({ commit, dispatch }) {
    const response = await dispatch('_fetch', 'https://express-api3.herokuapp.com/api/coin/10')
    const result = await dispatch('_addImage', response.data.currencies)
    commit('SET_CURRENCIES', result)
  },
  async getAllCoins ({ commit, dispatch }) {
    const response = await dispatch('_fetch', root)
    commit('SET_ALL_CURRENCIES', response.data)
  }

}

const mutations = {
  SET_CURRENCIES (state, currencies) {
    state.currencies = currencies
  },
  SET_ALL_CURRENCIES (state, currencies) {
    state.allCurrencies = currencies
  }
}

const state = {
  currencies: [],
  allCurrencies: []
}

const getters = {
  currencies: (state) => state.currencies,
  allCurrencies: (state) => state.allCurrencies,
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
