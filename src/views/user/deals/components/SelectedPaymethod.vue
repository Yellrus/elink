<template>
  <div class="selected-paymethod">
    <CreditCardLogo
      v-if="paymethod.Paymethod === 'Cards'"
      class="selected-paymethod__icon selected-paymethod__icon--creditCard"
    />
    <WebmoneyLogo
      v-if="paymethod.Paymethod === 'WebMoney'"
      class="selected-paymethod__icon selected-paymethod__icon--webmoney"
    />

    <span class="selected-paymethod__number" v-text="paymethod.Purse"></span>
  </div>
</template>

<script>
import CreditCardLogo from '../../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../../public/webmoneylogoWithWords.svg';

export default {
  name: 'SelectedPaymethod',
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
.selected-paymethod {
  width: 100%;
  max-width: 222px;
  min-height: 112px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 1px 17px 7px -15px #dcdfe6;
  background-color: #f5f7fa;

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
    font-size: 14px;
    line-height: 2;
    font-weight: 600;
    letter-spacing: 1px;
  }
}
</style>
