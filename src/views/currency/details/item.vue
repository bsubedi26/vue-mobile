<template>
  <div>
    <div class="layout-padding col-6">
      <div v-if="$q.platform.is.desktop" class="row justify-center pa1">
        <img v-if="currency.image !== 'undefined_image'" width="60" height="60" :src="resolveFilePath(currency)" :alt="currency.name">
        <img v-else width="60" height="60" class="img-circle" src="https://via.placeholder.com/60x60" alt="currency image placeholder">
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
      
      <div class="row justify-center pa1 margin-auto w-75">
        {{ currency.description }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'currency-details-item',
  data() {
    return {
      env: ''
    }
  },
  props: ['currency'],
  mounted() {
      this.env = process.env.NODE_ENV || ''
  },
  methods: {
    isPercentChangeNegative (percentChange) {
        // if first character is negative
        if (percentChange[0] === '-') {
        return true
        }
        return false
    },
    resolveFilePath (currency) {
        if (this.env === 'production') {
            return `img/currencies/${currency.image}.png`
        }
            return `/statics/img/currencies/${currency.image}.png`
    },
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
    .img-circle {
        border-radius: 60px;
    }

    .margin-auto {
      margin: auto;
    }
    .w-75 {
      width: 75%;
    }
</style>
