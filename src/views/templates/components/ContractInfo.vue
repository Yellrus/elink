<template>
  <div class="contract-info detail">
    <div class="detail__header">
      <div class="detail__header-item">
        <span class="detail__title">Категория</span>
        <div class="detail__category">
          {{ contract.CategoryId | getCategoryName }}
        </div>
      </div>
      <div class="detail__header-item order-3">
        <span class="detail__title">Способ оплаты</span>
        <div class="detail__paymethods">
          <div v-if="contract.WmpPurse" class="detail__paymethod">
            <WebmoneyLogo
              class="detail__paymethod-icon detail__paymethod-icon--webmoney"
            />
            <div class="detail__purse">
              {{ contract.WmpPurse }}
            </div>
          </div>

          <div v-if="contract.Card" class="detail__paymethod">
            <CreditCardLogo
              class="detail__paymethod-icon detail__paymethod-icon--card"
            />
            <div class="detail__purse">{{ contract.Card }}</div>
          </div>
        </div>
      </div>

      <div class="detail__header-item order-4">
        <span class="detail__title"
          >Кол-во {{ contract.CategoryId === 2 ? 'товара' : 'услуг' }}</span
        >
        <Badge
          :count="contract.Count"
          :hint="
            `${
              contract.Count !== 0
                ? contract.CategoryId === 2
                  ? 'Количество товаров для продажи'
                  : 'Количество услуг для продажи'
                : 'Нет в наличии'
            }`
          "
        />
      </div>
    </div>
    <span class="detail__title">Название</span>
    <h2 class="detail__heading">{{ contract.Name }}</h2>
    <span class="detail__title">Описание</span>
    <p class="detail__desc">
      {{ contract.Description | uppercaseFirst }}
    </p>
    <span class="detail__title">Стоимость</span>
    <div class="detail__amount">
      {{ contract.Amount | toThousandFilter }}
      <span class="detail__Currency">₽</span>
    </div>
  </div>
</template>

<script>
import CreditCardLogo from '../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import { mapState } from 'vuex';
import Badge from '../../../components/Badge/index';

export default {
  name: 'ContractInfo',
  components: { Badge, CreditCardLogo, WebmoneyLogo },
  props: {
    contract: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/detail.scss';
.detail {
  &__header {
    padding: 10px 0 18px;
  }
  &__desc {
    margin-bottom: 14px;
  }
  &__amount {
    font-size: 19px;
    font-weight: 500;
    margin-top: -3px;
  }
  &__paymethods {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__paymethod-icon {
    width: 20px;
    flex-shrink: 0;
    margin-right: 5px;

    &--webmoney {
      width: 18px;
    }
  }

  &__heading {
    cursor: text;
    &:hover {
      color: currentColor;
    }
  }

  &__paymethod {
    width: auto;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 3px;
    }
  }
}
.contract-info {
  background-color: #eef1f6;
  padding: 17px;
  border-radius: 13px;
}
</style>
