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

export default getters
