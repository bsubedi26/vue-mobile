const mutations = {
  SET_CURRENCIES (state, currencies) {
    state.currencies = currencies
  },
  SET_ALL_CURRENCIES (state, data) {
    state.allCurrencies = data
  }
}

export default mutations
