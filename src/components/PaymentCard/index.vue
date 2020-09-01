<template>
  <div class="payment-card" :class="{ 'payment-card--form': typeForm }">
    <div class="payment-card__body">
      <CreditCardLogo
        v-if="paymethod.Paymethod === 'Cards' || paymethod.Paymethod === 'CardsTest'"
        class="payment-card__icon payment-card__icon--creditCard"
      />

      <span v-if="paymethod.Purse" class="payment-card__number" v-text="paymethod.Purse"></span>
      <span v-else class="payment-card__number">Банковская карта</span>
    </div>

    <el-popconfirm
      v-if="!typeForm"
      confirm-button-text="Подтвердить"
      cancel-button-text="Отмена"
      placement="top-start"
      class="payment-card__btn-popconfirm"
      :title="`Удалить ${paymethod.Purse} ?`"
      @onConfirm="removeItem(paymethod.Id)"
    >
      <el-button
        slot="reference"
        type="button"
        class="payment-card__btn"
        :loading="deleteCardLoading"
      >
        Отвязать
      </el-button>
    </el-popconfirm>
  </div>
</template>

<script>
import CreditCardLogo from '../../../public/creditCard.svg';
import { mapActions } from 'vuex';

export default {
  name: 'PaymentCard',
  components: {
    CreditCardLogo,
  },
  props: {
    paymethod: {
      type: Object,
      default: () => ({}),
    },
    typeForm: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    deleteCardLoading: false,
  }),

  methods: {
    ...mapActions('profile', ['removePaymethod']),

    removeItem(id) {
      this.deleteCardLoading = true;
      this.removePaymethod(id).finally(() => (this.deleteCardLoading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '@/styles/paymethodCard.scss';
</style>
