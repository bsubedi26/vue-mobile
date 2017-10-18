<template>
    <div>
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
  name: 'search-result-item',
  methods: {
    isPercentChangeNegative (percentChange) {
        if (!percentChange) return
        // if first character is negative
        const isNegative = (percentChange[0] === '-') ? true : false
        return isNegative
    }
  }
}
</script>
