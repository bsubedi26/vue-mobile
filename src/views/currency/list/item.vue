<template>
    <div>
        <div v-if="$q.platform.is.cordova" class="row justify-center pa1">
            <img width="60" height="60" :src="'/android_asset/www/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name">
        </div>
        
        <div v-if="$q.platform.is.desktop" class="row justify-center pa1">
            <img width="60" height="60" :src="'/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name">
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
  props: ['currency'],
  name: 'currency-item',
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

<style>
    .coin-name {
        /* background-color: #7cd87c; */
    }
</style>
