<template>
    <div>

        <div v-if="$q.platform.is.platform === 'android'" class="row justify-center pa1">
            <img v-if="currency.image" width="60" height="60" :src="resolveFilePath(currency)" :alt="currency.name">
            <!-- <img width="60" height="60" :src="'/android_asset/www/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name"> -->
            <!-- <img width="60" height="60" :src="resolveFilePath(currency)" :alt="currency.name"> -->
        </div>
        
        <div v-if="$q.platform.is.desktop" class="row justify-center pa1">
            <img v-if="currency.image !== 'undefined_image'" width="60" height="60" :src="resolveFilePath(currency)" :alt="currency.name">
            <img v-else width="60" height="60" class="img-circle" src="https://via.placeholder.com/60x60" alt="currency image placeholder">
        </div>

        <div class="row justify-center pa1">
            <span class="coin-name">{{currency.name}}</span>
        </div>
        <div class="row justify-center pa1">
            ${{currency.price_usd}}
        </div>

        <div class="row justify-center pa1" 
        :class="{ red: isPercentChangeNegative(currency.percent_change_7d), green: !isPercentChangeNegative(currency.percent_change_7d) }"
        >
            {{currency.percent_change_7d | checkPercentChange }}
        </div>

    </div>
</template>

<script>
export default {
  data () {
      return {
          q: {},
          env: ''
      }
  },
  props: ['currency'],
  name: 'currency-item',
  mounted () {
    this.env = process.env.NODE_ENV || ''
    // alert(this.$q.platform.toString())
  },
  methods: {
    resolveFilePath (currency) {
        if (this.env === 'production') {
            return `img/currencies/${currency.image}.png`
        }
            return `/statics/img/currencies/${currency.image}.png`
    },
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

<style>
    .img-circle {
        border-radius: 60px;
    }
    .coin-name {
        /* background-color: #7cd87c; */
    }
</style>
