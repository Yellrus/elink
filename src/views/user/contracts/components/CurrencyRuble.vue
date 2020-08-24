<template>
  <RubleCurrencyLogo class="currency currency--ruble" :style="{ width: size + 'px' }" />
</template>

<script>
import RubleCurrencyLogo from '../../../../../public/ruble-currency.svg';
export default {
  components: {
    RubleCurrencyLogo,
  },
  props: {
    size: {
      type: Number,
      default: 10,
    },
  },
};
</script>
