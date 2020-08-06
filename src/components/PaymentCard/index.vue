<template>
  <div class="payment-card">
    <CreditCardLogo
      v-if="payment.Paymethod === 'Cards'"
      class="payment-card__icon payment-card__icon--creditCard"
    />
    <WebmoneyLogo
      v-if="payment.Paymethod === 'WebMoney'"
      class="payment-card__icon payment-card__icon--webmoney"
    />

    <span class="payment-card__number" v-text="payment.Purse"></span>
  </div>
</template>

<script>
import CreditCardLogo from '../../../public/creditCard.svg';
import WebmoneyLogo from '../../../public/webmoneylogoWithWords.svg';
export default {
  name: 'PaymentCard',
  components: {
    CreditCardLogo,
    WebmoneyLogo,
  },
  props: {
    payment: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-card {
  width: 100%;
  max-width: 160px;
  min-height: 96px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;

  &__icon {
    &--creditCard {
      width: 50px;
    }
    &--webmoney {
      width: 150px;
    }
  }

  &__number {
    display: block;
    color: #97a8be;
    font-size: 12px;
    font-weight: 600;
  }
}
</style>
