<template>
  <div class="page-action">
    <loading-data v-if="loading" />
    <div v-if="!loading" class="pay page-action__box-card">
      <h1 class="page-action__title">Подтверждение оплаты</h1>

      <!--  Pay Info -->
      <div class="pay__info">
<!--        <div class="pay__category">-->
<!--          {{ contract.CategoryId | getCategoryName }}-->
<!--        </div>-->
        <div class="pay__name">
          {{ contract.Name | uppercaseFirst }}
        </div>

        <div class="pay__desc">
          {{ contract.Description }}
        </div>
        <div class="pay__amount">
          {{ contract.Amount | toThousandFilter }} <span class="pay__currency">₽</span>
        </div>
      </div>

      <!--  Paymethods-->
      <div
        v-if="contract.WmpPurse && contract.Card"
        class="radio-paymethod-group pay__paymethods"
      >
        <span class="radio-paymethod-group__heading"
          >Выберите платежную систему</span
        >
        <div class="radio-paymethod-group__item paymethod-radio">
          <input
            id="paymethod_1"
            v-model="paymethod"
            value="2"
            class="paymethod-radio__input"
            name="paymethodType"
            type="radio"
          />
          <label class="paymethod-radio__name" for="paymethod_1">
            <span class="paymethod-radio__logo">
              <CreditCardBlackLogo
                class="paymethod-radio__icon paymethod-radio__icon--cards"
              />
            </span>
            <span class="paymethod-radio__name-title">
              Банковская карта
            </span>
            <span class="paymethod-radio__name-text">
              Visa, MasterCard, Maestro, Мир</span
            >
          </label>
        </div>
        <div class="radio-paymethod-group__item paymethod-radio">
          <input
            id="paymethod_2"
            v-model="paymethod"
            class="paymethod-radio__input"
            value="1"
            name="paymethodType"
            type="radio"
          />
          <label class="paymethod-radio__name" for="paymethod_2">
            <span class="paymethod-radio__logo">
              <WebmoneyLogo
                class="paymethod-radio__icon paymethod-radio__icon--webmoney"
              />
            </span>
            <span class="paymethod-radio__name-title">WebMoney кошелёк</span>
            <span class="paymethod-radio__name-text"> P - кошелёк</span>
          </label>
        </div>
      </div>

      <template v-else>
        <div class="pay__paymethods">
          <span class="radio-paymethod-group__heading">Способ оплаты</span>
          <div class="radio-paymethod-group__item paymethod-radio">
            <input
              id="paymethod_one"
              v-model="paymethod"
              :value="contract.Card ? 2 : 1"
              class="paymethod-radio__input"
              name="paymethodType"
              type="radio"
            />
            <label class="paymethod-radio__name" for="paymethod_one">
              <template v-if="contract.Card">
                <span class="paymethod-radio__logo">
                  <CreditCardBlackLogo
                    class="paymethod-radio__icon paymethod-radio__icon--cards"
                  />
                </span>
                <span class="paymethod-radio__name-title">
                  Банковская карта
                </span>
                <span class="paymethod-radio__name-text">
                  Visa, MasterCard, Maestro, Мир</span
                >
              </template>
              <template v-if="contract.WmpPurse">
                <span class="paymethod-radio__logo">
                  <WebmoneyLogo
                    class="paymethod-radio__icon paymethod-radio__icon--webmoney"
                  />
                </span>
                <span class="paymethod-radio__name-title"
                  >WebMoney кошелёк</span
                >
                <span class="paymethod-radio__name-text"> P - кошелёк</span>
              </template>
            </label>
          </div>
        </div>
      </template>

      <el-button type="primary" @click="onSubmit">Оплатить</el-button>
    </div>
  </div>
</template>

<script>
import LoadingData from '@/components/LoadingData';
import { mapActions } from 'vuex';
import { BASE_URL } from '@/utils/request';
import CreditCardBlackLogo from '../../../public/creditCardBlack.svg';
import WebmoneyLogo from '../../../public/webmoney-logo.svg';

export default {
  name: 'PayConfirm',
  components: { LoadingData, CreditCardBlackLogo, WebmoneyLogo },
  data: () => ({
    loading: false,
    paymethod: null,
    contract: {},
  }),

  computed: {
    contractId() {
      return this.$route.params.id;
    },

    url() {
      return `${BASE_URL}api/pay/${this.contractId}?p=${+this.paymethod}`;
    },
  },

  created() {
    this.fetchContract();
  },

  methods: {
    ...mapActions('contract', ['getContract']),

    fetchContract() {
      this.loading = true;
      this.getContract(this.contractId)
        .then(data => {
          this.contract = data;

          if (this.contract.Card) {
            this.paymethod = 2;
          } else if (this.contract.WmpPurse) {
            this.paymethod = 1;
          }

          this.loading = false;
        })
        .finally(() => (this.loading = false));
    },

    onSubmit() {
      location.replace(this.url);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/page-action.scss';
.pay {
  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #eef4ff;
    margin: 0 -25px 15px;
    padding: 23px 25px 6px;

    @media(max-width: $mq-mobile) {
      margin: 0 -15px 25px;
      padding: 23px 15px 10px;
    }
  }

  &__amount {
    font-size: 2em;
    font-weight: 600;
    margin-bottom: 10px;
  }

  &__name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  &__desc {
    margin-bottom: 10px;
  }

  &__category {
    font-size: 12px;
    background-color: rgb(58 142 230 / 12%);
    color: #3a8ee6;
    padding: 1px 10px;
    margin-right: 10px;
    margin-bottom: 4px;
  }

  &__paymethods {
    margin-bottom: 28px;
    padding: 0 20px;

    @media(max-width: $mq-tablet-vertical) {
      padding: 0;
    }
  }

  &__currency {
    font-weight: 400;
  }
}
</style>
