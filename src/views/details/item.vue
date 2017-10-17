<template>
  <div>
    <div class="layout-padding col-6">
      <div v-if="$q.platform.is.desktop" class="row justify-center pa1">
        <img width="60" height="60" :src="'/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name">
      </div>

      <div v-if="$q.platform.is.cordova" class="row justify-center pa1">
        <img width="60" height="60" :src="'/android_asset/www/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name">
      </div>

      <div class="row justify-center pa1">
        <span class="coin-name">{{currency.name}}</span>
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

      <div class="row justify-center pa1 mt1">
        <a :href="currency.website" target="_blank"><i class="fa fa-external-link fa-lg pa2"/></a>
        <a :href="currency.paper" target="_blank"><i class="fa fa-paper-plane fa-lg pa2"/></a>
        <a :href="currency.github" target="_blank"><i class="fa fa-github fa-lg pa2" /></a>
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

    <div class="layout-padding col-6 description-container">
      
      <div class="row justify-center lh150 pa1">
        {{ currency.description }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'currency-details-item',
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
