<template>
  <div class="commission">
    <el-icon class="el-icon-info commission__icon-info" />
    <div class="commission__items">
      <div class="commission__row">
        <span class="commission__title">Коммиссия:</span>
        <span class="commission__item">
          <WebmoneyLogo class="commission__icon commission__icon--webmoney" />
          <span class="commission__value">{{
            commissions.Wmp | toThousandFilter
          }}</span
          >&nbsp; ₽</span
        >
        <span class="commission__item"
          ><el-icon
            class="commission__icon commission__icon--card el-icon-bank-card"
          />
          <span class="commission__value">{{
            commissions.Card | toThousandFilter
          }}</span
          >&nbsp; ₽</span
        >
      </div>
      <div class="commission__row">
        <span class="commission__title">Максимальная сумма:</span>
        <span class="commission__item">
          <span class="commission__value">{{
            commissions.MaxAmount | toThousandFilter
          }}</span
          >&nbsp; ₽</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import WebmoneyLogo from '../../../../../public/webmoney-logo.svg';

export default {
  name: 'CreateCommissionInfo',
  components: {
    WebmoneyLogo,
  },
  props: {
    commissions: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.commission {
  //background-color: #eaf0f7;
  background-color: #ebf5ff;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    left: 58px;
    top: -7px;
    display: block;
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    user-select: none;
    width: 363px;
    height: 287px;
    opacity: 0.3;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }

  &__items {
    display: flex;
    flex-direction: column;

    @media (max-width: $mq-mobile) {
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
    }
  }

  &__item {
    color: #0f213c;
    font-size: 12px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    min-width: 40px;
  }

  &__row {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 3px;
    }

    @media (max-width: $mq-mobile) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 5px;
    }
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

  &__icon-info {
    font-size: 20px;
    color: #78a9d9;
    margin-right: 12px;
  }

  &__title {
    font-size: 13px;
    min-width: 140px;
    margin-right: 15px;

    @media (max-width: $mq-mobile) {
      min-width: auto;
    }
  }

  &__value {
    font-weight: 500;
    margin-right: 2px;
  }
}
</style>
