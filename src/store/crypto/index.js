import axios from 'axios'
import currenciesJSON from './data.json'
// const root = '//api.coinmarketcap.com/v1/ticker/'

const actions = {
  handleError (error) {
    console.log('.catch error: ', error)
    alert(JSON.stringify(error))
  },
  getCurrenciesLimit10 () {
    return axios.get('https://express-api3.herokuapp.com/api/coin/10').catch(actions.handleError)
    // return axios.get(`${root}?limit=10`).catch(actions.handleError)
  },

  addImage ({ commit }, currencies) {
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

  async fetch ({ commit, dispatch }) {
    const response = await dispatch('getCurrenciesLimit10')
    const result = await dispatch('addImage', response.data.currencies)
    commit('SET_CURRENCIES', result)
  }

}

const mutations = {
  SET_CURRENCIES (state, currencies) {
    state.currencies = currencies
  }
}

const state = {
  currencies: []
}

const getters = {
  currencies: (state) => state.currencies,
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
