<template>

  <div class="bg-grey-3 row">
    <div class="layout-padding col-6">

      <div v-if="$q.platform.is.desktop" class="row justify-center pa1">
        <img width="60" height="60" :src="'/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name">
      </div>

      <div v-if="$q.platform.is.cordova" class="row justify-center pa1">
        <img width="60" height="60" :src="'/android_asset/www/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name">
      </div>

      <div class="row justify-center pa1">
        {{ currency.name }}
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


    </div>

    <div class="layout-padding col-6">
      <div class="row justify-center lh150 pa1">
        {{ currency.description }}
      </div>

      
      <div class="row justify-center pa1">
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

    <div class="row justify-center pa1 col-6 mb3">
      <q-btn @click="goBack()" color="dark">
          Go Back
      </q-btn>
    </div>

  </div>

</template>

<script>
  export default {
    methods: {
      goBack () {
        return this.$router.go(-1)
      },
      isPercentChangeNegative (percentChange) {
        // if first character is negative
        if (percentChange[0] === '-') {
          return true
        }
        return false
      }
    },
    computed: {
      currency () {
        const { name } = this.$route.params
        return this.$store.getters['crypto/currency'](name)
      }
    }
  }
</script>

<style>
  a {
    color: black;
  }
</style>
