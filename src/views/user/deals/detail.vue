<template>
  <div class="page-container">
    <h1 class="page-contracts-heading">Продажа</h1>

    <div class="detail-layout">
      <loading-data v-if="loading" />

      <template v-if="!loading && dealDetail">
        <div class="detail-layout__main">
          <div class="detail">
            <div class="detail__status">
              <status
                :data-statuses="dealsStatuses"
                :status-id="dealDetail.Status"
              />
            </div>
            <div class="detail__header">
              <div class="detail__header-item">
                <span class="detail__title">Дата продажи</span>
                <div class="detail__created">
                  <span class="detail__created-month-day">{{
                    dealDetail.Created | formatDateDayMonth
                  }}</span>
                  <span class="detail__created-year">{{
                    dealDetail.Created | formatDateYear
                  }}</span>
                </div>
              </div>

              <div class="detail__header-item">
                <span class="detail__title">Категория</span>
                <div class="detail__category">
                  {{ dealDetail.Contract.CategoryId | getCategoryName }}
                </div>
              </div>
              <div class="detail__header-item">
                <span class="detail__title">Способ оплаты</span>
                <div class="detail__paymethods">
                  <el-tooltip
                    v-if="dealDetail.PayMethod === 1"
                    class="item"
                    content="Способ оплаты WebMoney"
                    placement="top-start"
                  >
                    <WebmoneyLogo
                      class="detail__paymethod detail__paymethod--webmoney"
                    />
                  </el-tooltip>

                  <el-tooltip
                    v-if="dealDetail.PayMethod === 2"
                    class="item"
                    content="Способ оплаты Банковская карта"
                    placement="top-start"
                  >
                    <CreditCardLogo
                      class="detail__paymethod detail__paymethod--card"
                    />
                  </el-tooltip>

                  <template v-if="device !== 'mobile'">
                    <span
                      v-if="dealDetail.PayMethod === 1"
                      class="detail__paymethod-title"
                      >WebMoney</span
                    >
                    <span
                      v-if="dealDetail.PayMethod === 2"
                      class="detail__paymethod-title"
                      >Банковская карта</span
                    >
                  </template>
                </div>
              </div>
            </div>

            <div class="detail__body">
              <span class="detail__title">Название</span>
              <h2 class="detail__heading">
                <router-link :to="`/contracts/${dealDetail.Contract.Id}`">{{
                  dealDetail.Contract.Name | uppercaseFirst
                }}</router-link>
              </h2>
              <span class="detail__title">Описание</span>
              <p class="detail__desc">
                {{ dealDetail.Contract.Description | uppercaseFirst }}
              </p>
            </div>

            <div v-if="dealDetail.DisputeReason" class="detail__dispute">
              <span class="detail__dispute-title">Претензия</span>
              <p class="detail__dispute-text" v-text="dealDetail.DisputeReason"></p>
              <el-icon class="el-icon-chat-dot-square detail__dispute-icon" />
            </div>

            <div class="detail__closing">
              <el-icon class="el-icon-info" />
              <span class="detail__closing-title"
                >Поступление средств
                {{
                  checkDurationDate(dealDetail.ClosingAt)
                    ? 'выполнено'
                    : 'произойдет'
                }}
              </span>
              <div class="detail__closing-date">
                <span>{{ dealDetail.ClosingAt | relativeDateFromNow }}</span>
                <span>{{ dealDetail.ClosingAt | formatDateDayMonth }}</span>
                <span>{{ dealDetail.ClosingAt | formatDateOnlyYear }}</span>
              </div>
            </div>

          </div>
        </div>

        <sticky
          :z-index="10"
          :sticky-top="137"
          class="detail-layout__widget widget"
        >
          <div class="detail-layout__sidebar">
            <h2 class="widget__title">Транзакция</h2>
            <div class="transactions">
              <div class="transactions__items">
                <div v-if="dealDetail.FromPayer" class="transactions__item">
                  <transaction
                    :entity="{ ...dealDetail.FromPayer }"
                    :from-payer="true"
                  />
                </div>
                <div v-if="dealDetail.ToPayee" class="transactions__item">
                  <transaction
                    :entity="{ ...dealDetail.ToPayee }"
                    :to-payee="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </sticky>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Sticky from '@/components/Sticky';
import { Transaction, Status } from './components';
import LoadingData from '@/components/LoadingData';
import CreditCardLogo from '../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import dayjs from 'dayjs';

export default {
  name: 'ContractDetail',
  components: {
    Status,
    LoadingData,
    Sticky,
    Transaction,
    CreditCardLogo,
    WebmoneyLogo,
  },
  data: () => ({
    id: null,
    loading: false,
    dealDetail: null,
  }),

  computed: {
    ...mapState({
      dealsStatuses: state => state.deal.statuses,
      device: state => state.app.device,
    }),
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchDeal',
  },

  created() {
    this.id = this.$route.params.id;

    this.fetchDeal();
  },

  methods: {
    ...mapActions('deal', ['getDealDetail']),

    fetchDeal() {
      this.loading = true;
      this.getDealDetail(this.id)
        .then(data => {
          this.dealDetail = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    checkDurationDate(durationDate) {
      const today = dayjs(new Date());
      const pastDate = dayjs(durationDate);
      // дата с сервера до сегодняшнего дня
      return pastDate.isBefore(today);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/detail-layout.scss';
@import '@/styles/detail.scss';

.transactions {
  position: relative;

  &__items {
    display: flex;
    flex-direction: column;
  }

  &__item {
    width: 100%;
    position: relative;
    font-size: 14px;
    transition: background 0.2s ease-in-out;

    &:not(:last-child) {
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        background-color: #f5f4f8;
        width: 100%;
        margin: 0 auto;
      }
    }
  }
}
.page-contracts-heading {
  max-width: 1200px;
}
.widget {
  &__title {
    font-size: 22px;
    padding: 10px 20px;
    color: #000;
    border-bottom: 1px solid #f5f4f8;
  }
}
</style>
