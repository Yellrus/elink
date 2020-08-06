<template>
  <RubleCurrencyLogo class="currency currency--ruble" />
</template>

<script>
import RubleCurrencyLogo from '../../../../../public/ruble-currency.svg';
export default {
  components: {
    RubleCurrencyLogo,
  },
};
</script>

<style lang="scss" scoped>
.currency {
  &--ruble {
    width: 18px;
  }
}
</style>
