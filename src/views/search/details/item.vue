<template>
  <div class="bg-grey-3 row justify-center">
    <div class="layout-padding col-6">
      
      <div class="row justify-center pa1">
        <span class="f3">{{currency.name}}</span>
      </div>
      
      <div class="row justify-center pa1">
        <q-chip color="primary">
          Rank: {{ currency.rank }}
        </q-chip>
      </div>

      <div class="row justify-center pa1">
        ${{ currency.price_usd }}
      </div>

      <div class="row justify-center pa1" 
      :class="{ red: isPercentChangeNegative(currency.percent_change_7d), green: !isPercentChangeNegative(currency.percent_change_7d) }"
      >
        {{ currency.percent_change_7d | checkPercentChange }}
      </div>

      <div class="row justify-center pa1 mt2">
        <q-chip class="bg-grey">
          Circulating Supply: {{ currency.available_supply }} {{ currency.symbol }}
        </q-chip>
      </div>

      <div class="row justify-center pa1">
        <q-chip color="primary">
          Market Cap: $ {{ currency.market_cap_usd | currencyWithCommas }}
        </q-chip>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-details-item',
  props: ['currency'],
  methods: {
    isPercentChangeNegative (percentChange) {
        // if first character is negative
        if (percentChange[0] === '-') {
        return true
        }
        return false
    }
  }
}
</script>

<style scoped>
    @media screen and (min-width: 768px) and (max-width: 992px) {
    .description-container {
            margin-top: -20px;
        }
    }
    @media screen and (min-width: 992px) {
    .description-container {
            margin-top: -60px;
        }
    }
</style>
