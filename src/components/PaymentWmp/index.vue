<template>
  <div class="payment-card payment-card--wmp" :class="{ 'payment-card--form': typeForm }">
    <div class="payment-card__body">
      <WebmoneyLogo class="payment-card__icon payment-card__icon--webmoney" />

      <span v-if="wmp.Purse" class="payment-card__number" v-text="wmp.Purse"></span>
      <span v-else class="payment-card__number">Webmoney</span>
    </div>
  </div>
</template>

<script>
import WebmoneyLogo from '../../../public/webmoney-logo.svg';

export default {
  name: 'PaymentWmp',
  components: {
    WebmoneyLogo,
  },
  props: {
    wmp: {
      type: Object,
      default: () => ({}),
    },
    typeForm: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/paymethodCard.scss';
</style>
