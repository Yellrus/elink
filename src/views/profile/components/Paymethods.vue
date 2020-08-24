<template>
  <div class="user-paymethod">
    <transition-group name="list" tag="div" class="user-paymethod__items">
      <div :key="'addBtnDefault'" class="user-paymethod__item">
        <payment-add-btn :is-active="true" />
      </div>
      <div v-if="wmpPurse" :key="'wmpDefault'" class="user-paymethod__item">
        <payment-wmp :wmp="wmpPurse" />
      </div>
      <div
        v-for="paymethod in paymethods"
        :key="paymethod.Id"
        class="user-paymethod__item"
      >
        <payment-card :paymethod="paymethod" />
      </div>
    </transition-group>

    <AddNewPaymethod />

  </div>
</template>

<script>
import PaymentCard from '@/components/PaymentCard';
import AddNewPaymethod from '@/components/AddNewPaymethod';
import { mapGetters } from 'vuex';
import PaymentAddBtn from '@/components/PaymentAddBtn';
import PaymentWmp from '../../../components/PaymentWmp/index';

export default {
  name: 'Paymethods',
  components: { PaymentWmp, PaymentAddBtn, PaymentCard, AddNewPaymethod },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      paymethods: 'profile/getPaymethods',
      wmpPurse: 'profile/getWmpPurse',
    }),

    // ...mapState({
    //   paymethods: state => state.profile.paymethods,
    // }),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.user-paymethod {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 25px;
  margin: 0 -5px;

  &__items {
    display: flex;
    flex-wrap: wrap;

    @media(max-width: $mq-mobile) {
      justify-content: center;
      align-items: center;
    }
  }

  &__item {
    margin: 0 10px 10px 10px;
  }
}
</style>
