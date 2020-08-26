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
@import '~@/styles/variables.scss';

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

.detail-layout {
  display: flex;
  align-items: flex-start;
  width: 100%;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 290px);

  @media (max-width: $mq-tablet-horizontal) {
    flex-direction: column;
    align-items: center;
  }

  &__main {
    width: 100%;
    max-width: 660px;
    min-height: 200px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-right: 25px;
    position: relative;

    @media (max-width: $mq-tablet-horizontal) {
      margin-bottom: 25px;
      margin-right: 0;
    }
  }

  &__widget {
    width: 100%;
    max-width: 420px;
  }

  &__sidebar {
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.detail {
  &__status {
    margin-bottom: 7px;

    .status {
      width: 100%;
      max-width: 100%;
      border-radius: 0;
      border: none;
      font-size: 12px;
      line-height: 13px;
      padding: 10px;
      word-wrap: break-word;
      white-space: normal;
      text-overflow: initial;
      overflow: initial;
    }
  }

  &__title {
    font-size: 12px;
    color: #5d6b85;
    display: block;
    margin-bottom: 1px;
  }

  &__header {
    display: flex;
    padding: 10px 21px;

    @media (max-width: $mq-mobile) {
      flex-wrap: wrap;
    }
  }

  &__header-item {
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      margin-right: 30px;

      @media (max-width: $mq-mobile) {
        margin-right: 20px;
      }
      @media (max-width: $mq-iphone5) {
        margin-right: 16px;
      }
    }
  }

  &__heading {
    line-height: 1.3;
    margin-top: -3px;
    margin-bottom: 6px;
    font-size: 24px;
    font-weight: 500;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #409eff;
    }
  }

  &__desc {
    font-size: 15px;
    margin: 0;
  }

  &__created {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  &__created-month-day {
  }

  &__created-year {
    color: #5d6b85;
  }

  &__body {
    background-color: #eef1f6;
    padding: 17px;
    border-radius: 13px;
    margin: 0 18px 16px 18px;
  }

  &__paymethods {
    display: flex;
    align-items: center;
  }

  &__paymethod {
    width: 24px;
    margin-right: 5px;
  }

  &__paymethod-title {
    font-size: 14px;
    color: #5d6b85;
  }

  &__closing {
    padding: 16px 21px;
    display: flex;
    align-items: center;
    border-top: 1px solid #f5f4f8;
    font-size: 14px;

    @media (max-width: $mq-mobile) {
      padding: 10px 21px 16px 21px;
      flex-direction: column;
    }

    i {
      color: #409eff;
      margin-right: 6px;
      line-height: 1.5;

      @media (max-width: $mq-mobile) {
        font-size: 16px;
      }
    }
  }

  &__closing-title {
    display: block;
    margin-right: 6px;
  }

  &__closing-date {
    span {
      font-weight: 500;
      color: #1e88e5;

      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }

  &__dispute {
    position: relative;
    margin: 0;
    background-color: #fff3e0;
    padding: 12px 15px 12px 40px;
  }

  &__dispute-text {
    font-size: 14px;
    margin: 0;
  }

  &__dispute-icon {
    position: absolute;
    top: 15px;
    left: 13px;
    font-size: 18px;
  }

  &__dispute-title {
    display: block;
    font-size: 17px;
    margin-bottom: 5px;
  }

  //&__category {
  // font-size: 12px;
  //background-color: rgb(58 142 230 / 12%);
  //color: #3a8ee6;
  //min-width: 62px;
  //text-align: center;
  //padding: 1px 10px;
  //margin-right: 10px;
  // }
}
</style>
