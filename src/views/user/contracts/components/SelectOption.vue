<template>
  <div class="payment-option">
    <CreditCardLogo
      v-if="paymethod.Paymethod === 'Cards' || paymethod.Paymethod === 'CardsTest'"
      class="payment-option__icon payment-option__icon--creditCard"
    />
    <WebmoneyLogo
      v-if="paymethod.Paymethod === 'WebMoney'"
      class="payment-option__icon payment-option__icon--webmoney"
    />

    <span class="payment-option__purse" v-text="paymethod.Purse"></span>
  </div>
</template>

<script>
import CreditCardLogo from '../../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../../public/webmoney-logo.svg';
export default {
  name: 'SelectOption',
  components: {
    CreditCardLogo,
    WebmoneyLogo,
  },
  props: {
    paymethod: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-dropdown__item.selected {
  .payment-option__purse {
    color: #409eff;
    font-weight: 700;
  }
}
.payment-option {
  display: flex;
  align-items: center;

  &__icon {
    margin-right: 10px;

    &--creditCard {
      width: 20px;
    }
    &--webmoney {
      width: 20px;
    }
  }

  &__purse {
    display: block;
    color: #97a8be;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.2px;
  }
}
</style>
