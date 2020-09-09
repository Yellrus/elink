<template>
  <div
    class="transaction"
    :class="{
      'transaction--incoming': transaction.FromPayer,
      'transaction--outgoing': !transaction.FromPayer,
      'transaction--disabled': !getStatus.clickable,
    }"
  >
    <router-link
      :event="getStatus.clickable ? 'click' : ''"
      :to="`/deals/${transaction.Deal.Id}`"
      tag="div"
      class="transaction__body"
    >
      <div class="transaction__Created">
        <span class="transaction__CreatedMonthDay">{{
          transaction.Date | formatDateDayMonth
        }}</span>
        <span class="transaction__CreatedYear">{{
          transaction.Date | formatDateYear
        }}</span>
      </div>

      <div
        :class="
          `transaction__Type transaction__Type--${
            transaction.FromPayer ? 'incoming' : 'outgoing'
          }`
        "
      >
        <el-icon
          :class="
            `transaction__TypeIcon el-icon-${
              transaction.FromPayer ? 'bottom-left' : 'top-right'
            }`
          "
        />
        <div class="transaction__TypeTitle">
          {{ transaction.FromPayer ? 'Входящая оплата' : 'Исходящая оплата' }}
        </div>
      </div>

      <div class="transaction__Paymethods">
        <el-tooltip
          v-if="transaction.Deal.PayMethod === 1"
          content="Способ оплаты WebMoney"
          placement="top-start"
        >
          <WebmoneyLogo
            class="transaction__Paymethod transaction__Paymethod--webmoney"
          />
        </el-tooltip>

        <el-tooltip
          v-if="transaction.Deal.PayMethod === 2"
          content="Способ оплаты Банковская карта"
          placement="top-start"
        >
          <CreditCardLogo
            class="transaction__Paymethod transaction__Paymethod--card"
          />
        </el-tooltip>

        <div class="transaction__PaymethodsPurse">
          {{ transaction.Purse }}
        </div>
      </div>

      <div
        :class="
          `transaction__status transaction__status--${getStatus.className}`
        "
      >
        {{ getStatus.text }}
      </div>

      <div class="transaction__RightPanel">
        <div class="transaction__Amount">
          {{ transaction.Amount | toThousandFilter }}
          <span class="transaction__Currency">₽</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import CreditCardLogo from '../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';

export default {
  name: 'ListItem',
  components: {
    CreditCardLogo,
    WebmoneyLogo,
  },
  props: {
    transaction: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getStatus() {
      if (this.transaction.Deal.Created === null) {
        if (this.transaction.Deal.IsRejected) {
          return {
            className: 'rejected',
            text: 'Платёж отменён',
            clickable: false,
          };
        } else {
          return {
            className: 'wait',
            text: 'Платёж в обработке',
            clickable: false,
          };
        }
      } else {
        return {
          className: 'success',
          text: 'Платёж выполнен',
          clickable: true,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/transaction-list-item.scss';
</style>
