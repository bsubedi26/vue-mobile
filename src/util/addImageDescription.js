import currenciesJSON from './currencies.json'

export default (cryptoCurrency) => {
  cryptoCurrency.id = cryptoCurrency.id in currenciesJSON ? cryptoCurrency.id : undefined
  cryptoCurrency.image = `${cryptoCurrency.id}_image`
  cryptoCurrency.description = currenciesJSON[cryptoCurrency.id].description
  cryptoCurrency.paper = currenciesJSON[cryptoCurrency.id].paper
  cryptoCurrency.github = currenciesJSON[cryptoCurrency.id].github
  cryptoCurrency.website = currenciesJSON[cryptoCurrency.id].website
  return cryptoCurrency
}
