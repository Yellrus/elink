<template>
  <div class="transaction">
    <div class="transaction__body">
      <span class="transaction__body-title">Данные по счёту</span>
      <div class="transaction__created">
        <span class="transaction__created-month-day">{{
          entity.Date | formatDateDayMonth
        }}</span>
        <span class="transaction__created-year">{{
          entity.Date | formatDateYear
        }}</span>
      </div>

      <div class="transaction__purse">{{ entity.Purse }}</div>
    </div>

    <div class="transaction__amount-wrap">
      <span class="transaction__amount-wrap-title">Сумма</span>
      <div class="transaction__amount">
        <span class="transaction__currency">₽</span>
        {{ entity.Amount | toThousandFilter }}
      </div>
      <div
        class="transaction__status"
        :class="{
          'transaction__status--income': fromPayer,
          'transaction__status--outgo': toPayee,
        }"
      >
        <div class="transaction__status-icon">
          <el-icon v-if="toPayee" class="el-icon-top-right" />
          <el-icon v-if="fromPayer" class="el-icon-bottom-left" />
        </div>
        <span class="transaction__status-title"
          >{{ fromPayer ? 'Входящая ' : 'Исходящая ' }}транзакция</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  props: {
    entity: {
      type: Object,
      default: () => ({}),
    },

    fromPayer: {
      type: Boolean,
      default: false,
    },

    toPayee: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.transaction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 21px 12px;

  @media (max-width: $mq-mobile) {
    flex-direction: column;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 8px 15px;
    border-radius: 13px;
    margin-top: 4px;
  }

  &__amount-wrap {
    min-width: 210px;
    background-color: #eef1f6;
    padding: 17px;
    border-radius: 13px;
  }

  &__body-title {
    color: #5d6b85;
    font-size: 12px;
    margin-bottom: 4px;
  }

  &__amount-wrap-title {
    color: #5d6b85;
    font-size: 12px;
  }

  &__amount {
    font-size: 22px;
    font-weight: 500;
  }

  &__created {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }

  &__created-month-day {
    display: block;
    font-size: 17px;
    margin-right: 5px;
  }

  &__created-year {
    color: #5d6b85;
    display: block;
    font-size: 17px;
    font-weight: 400;
  }

  &__currency {
    color: #5d6b85;
    font-weight: 400;
  }

  &__status-icon {
    border-radius: 50%;
    padding: 2px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 7px;
    border-width: 1px;
    border-style: solid;
    font-size: 10px;
  }

  &__status {
    display: flex;
    align-items: center;
    font-size: 12px;

    &--income {
      .transaction__status-icon {
        color: #fff;
        border-color: #4caf50;
        background-color: #4caf50;
      }
    }

    &--outgo {
      .transaction__status-icon {
        color: #fff;
        border-color: #ff5252;
        background-color: #ff5252;
      }
    }
  }

  &__status-title {
    color: #5d6b85;
  }

  &__purse {
    font-size: 16px;
    color: #000;
  }
}
</style>
