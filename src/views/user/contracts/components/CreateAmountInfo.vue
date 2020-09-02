<template>
  <div class="amount-info">
    <template v-if="paymethodType.Wmp || paymethodType.Card">
      <div class="amount-info__heading">К получению</div>
    </template>
    <template v-else>
      <div class="amount-info__heading">
        Необходимо выбрать платёжную систему
      </div>
    </template>

    <div class="amount-info__items">
      <template v-if="paymethodType.Wmp || paymethodType.Card">
        <div v-if="paymethodType.Wmp" class="amount-info__item">
          <WebmoneyLogo class="amount-info__icon amount-info__icon--webmoney" />
          <span class="amount-info__value">{{
            amount && amount > 0 && calcAmountWithdrawWmp | toThousandFilter
          }}</span>
          ₽
        </div>
        <div v-if="paymethodType.Card" class="amount-info__item">
          <el-icon
            class="amount-info__icon amount-info__icon--card el-icon-bank-card"
          />
          <span class="amount-info__value">{{
            amount && amount > 0 && calcAmountWithdrawCard | toThousandFilter
          }}</span
          >&nbsp; ₽
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import WebmoneyLogo from '../../../../../public/webmoney-logo.svg';

export default {
  name: 'CreateAmountInfo',
  components: {
    WebmoneyLogo,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    amount: {
      type: [Number, String],
    },
    commissions: {
      type: Object,
      default: () => ({}),
    },
    paymethodType: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    calcAmountWithdrawWmp() {
      if (
        this.amount !== 0 &&
        this.amount >= this.commissions.MinAmount &&
        this.amount <= this.commissions.MaxAmount
      ) {
        if (this.paymethodType.Wmp) {
          return Number(this.amount) - Number(this.commissions.Wmp);
        }
      }
      return 0;
    },

    calcAmountWithdrawCard() {
      if (
        this.amount !== 0 &&
        this.amount >= this.commissions.MinAmount &&
        this.amount <= this.commissions.MaxAmount
      ) {
        if (this.paymethodType.Card) {
          return Number(this.amount) - Number(this.commissions.Card);
        }
      }
      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.amount-info {
  display: flex;
  align-items: center;
  padding: 5px 0 3px;

  &__heading {
    font-size: 12px;
    color: #5d6b85;
    margin-right: 10px;
  }

  &__items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__item {
    font-size: 12px;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  &__value {
    margin-right: 3px;
    color: #527ece;
    font-weight: 600;
  }

  &__icon {
    margin-right: 3px;
    &--card {
      font-size: 16px;
    }
    &--webmoney {
      width: 13px;
      font-size: 16px;

      path {
        fill: rgba(#0f213c, 0.65);
      }
    }
  }
}
</style>
