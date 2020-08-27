<template>
  <div class="page-container">
    <h1 class="page-contracts-heading">Предложение</h1>

    <div class="detail-layout">
      <loading-data v-if="loading" />

      <template v-if="!loading && contractDetail">
        <div class="detail-layout__main">
          <div class="detail">
            <div class="detail__status">
              <status
                v-if="contractDetail.IsClosed"
                :status="'closed'"
                :name="'Закрыто'"
              />
              <status
                v-else-if="contractDetail.Count <= 0"
                :status="'count'"
                :name="'Нет в наличии'"
              />
              <status
                v-else-if="checkDurationDate(contractDetail.Duration)"
                :status="'duration'"
                :name="'Время истекло'"
              />
            </div>
            <div class="detail__header">
              <div class="detail__header-item order-1">
                <span class="detail__title">Дата продажи</span>
                <div class="detail__created">
                  <span class="detail__created-month-day">{{
                    contractDetail.Created | formatDateDayMonth
                  }}</span>
                  <span class="detail__created-year">{{
                    contractDetail.Created | formatDateYear
                  }}</span>
                </div>
              </div>

              <div class="detail__header-item order-2">
                <span class="detail__title">Категория</span>
                <div class="detail__category">
                  {{ contractDetail.CategoryId | getCategoryName }}
                </div>
              </div>
              <div class="detail__header-item order-3">
                <span class="detail__title">Способ оплаты</span>
                <div class="detail__paymethods">
                  <div v-if="contractDetail.WmpPurse" class="detail__paymethod">
                    <WebmoneyLogo
                      class="detail__paymethod-icon detail__paymethod-icon--webmoney"
                    />
                    <div class="detail__purse">
                      {{ contractDetail.WmpPurse }}
                    </div>
                  </div>

                  <div v-if="contractDetail.Card" class="detail__paymethod">
                    <CreditCardLogo
                      class="detail__paymethod-icon detail__paymethod-icon--card"
                    />
                    <div class="detail__purse">{{ contractDetail.Card }}</div>
                  </div>
                </div>
              </div>

              <div class="detail__header-item order-4">
                <span class="detail__title"
                  >Кол-во
                  {{
                    contractDetail.CategoryId === 2 ? 'товара' : 'услуг'
                  }}</span
                >
                <Badge
                  :count="contractDetail.Count"
                  :hint="
                    `${
                      contractDetail.Count !== 0
                        ? contractDetail.CategoryId === 2
                          ? 'Количество товаров для продажи'
                          : 'Количество услуг для продажи'
                        : 'Нет в наличии'
                    }`
                  "
                />
              </div>

              <div class="detail__header-item order-5">
                <span class="detail__title">Коммиссия</span>
                <div class="detail__commission">
                  <span
                    v-if="contractDetail.WmpPurse"
                    class="detail__commission-item"
                  >
                    <WebmoneyLogo
                      class="detail__commission-icon detail__commission-icon--webmoney"
                    />
                    <span class="detail__commission-value">{{
                      wmpCommission | toThousandFilter
                    }}</span
                    >₽</span
                  >
                  <span
                    v-if="contractDetail.Card"
                    class="detail__commission-item"
                    ><el-icon
                      class="detail__commission-icon detail__commission-icon--card el-icon-bank-card"
                    />
                    <span class="detail__commission-value">{{
                      cardCommission | toThousandFilter
                    }}</span
                    >₽</span
                  >
                </div>
              </div>
            </div>

            <div class="detail__body">
              <span class="detail__title">Название</span>
              <h2 class="detail__heading">
                {{ contractDetail.Name | uppercaseFirst }}
              </h2>
              <span class="detail__title">Описание</span>
              <p class="detail__desc">
                {{ contractDetail.Description | uppercaseFirst }}
              </p>

              <span class="detail__title">Стоимость</span>
              <div class="detail__amount">
                {{ contractDetail.Amount | toThousandFilter }}
                <span class="detail__Currency">₽</span>
              </div>
            </div>

            <div v-if="!contractDetail.IsClosed" class="detail__actions">
              <el-button
                v-clipboard:copy="`${host}/contract/${contractDetail.Id}`"
                v-clipboard:success="clipboardSuccess"
                type="success"
                icon="el-icon-link"
                plain
                class="detail__actions-btn"
              >
                Скопировать ссылку
              </el-button>

              <el-popconfirm
                v-if="!contractDetail.IsClosed"
                confirm-button-text="Подтвердить"
                cancel-button-text="Отмена"
                placement="top"
                class="detail__btn-popconfirm"
                :title="`Закрыть ${contractDetail.Name} ?`"
                @onConfirm="closeContract(contractDetail.Id)"
              >
                <el-button
                  slot="reference"
                  size="small"
                  type="danger"
                  circle
                  plain
                >
                  <closeIcon class="detail__btn-icon" />
                </el-button>
              </el-popconfirm>

              <el-tooltip v-else placement="top">
                <div slot="content">Предложение закрыто</div>
                <el-button type="info" size="small" circle plain>
                  <closeIcon class="detail__btn-icon" />
                </el-button>
              </el-tooltip>
            </div>

            <div v-if="!contractDetail.IsClosed" class="detail__social-sharing">
              <div class="detail__social-sharing-title">
                Поделиться ссылкой на предложение
              </div>
              <social-sharing :sharing="sharing" />
            </div>
          </div>
        </div>

        <sticky
          :z-index="10"
          :sticky-top="137"
          class="detail-layout__widget widget"
        >
          <div class="detail-layout__sidebar">
            <h2 class="widget__title">Продажи</h2>

            <deals-for-contract />
          </div>
        </sticky>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import clipboard from '@/directive/clipboard';
import CreditCardLogo from '../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import CloseIcon from '../../../../public/close.svg';
import LoadingData from '@/components/LoadingData/index';
import Sticky from '@/components/Sticky';
import Badge from '@/components/Badge';
import { Status } from './components';
import dayjs from 'dayjs';
import SocialSharing from '@/components/SocialSharing';
import { getCommission } from '@/api/contract';
import DealsForContract from './components/DealsForContract';

export default {
  name: 'ContractDetail',
  components: {
    DealsForContract,
    SocialSharing,
    Sticky,
    LoadingData,
    CloseIcon,
    CreditCardLogo,
    WebmoneyLogo,
    Status,
    Badge,
  },
  directives: {
    clipboard,
  },
  data: () => ({
    id: null,
    closingContract: false,
    cardCommission: null,
    wmpCommission: null,
    loading: false,
    contractDetail: null,
  }),

  computed: {
    host() {
      return location.host;
    },

    url() {
      return (
        this.contractDetail.Id &&
        `${location.host}/contract/${this.contractDetail.Id}`
      );
    },

    sharing() {
      return {
        url: this.url,
        title: this.contractDetail.Name,
        description: this.contractDetail.Description,
      };
    },

    getPayMethodForCommission() {
      if (this.contractDetail.Card && this.contractDetail.WmpPurse) {
        return 3;
      }

      if (this.contractDetail.Card) {
        return 2;
      } else if (this.contractDetail.WmpPurse) {
        return 1;
      }

      return 2;
    },
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchContract',
  },

  created() {
    this.id = this.$route.params.id;

    this.fetchContract();
  },

  methods: {
    ...mapActions('contract', ['getContract', 'contractClose']),

    fetchContract() {
      this.loading = true;
      this.getContract(this.id)
        .then(data => {
          this.contractDetail = data;

          this.getCurrentCommission();
        })
        .catch(() => (this.loading = false))
        .finally(() => {
          this.loading = false;
        });
    },

    clipboardSuccess() {
      this.$message({
        message: 'Ссылка для продажи скопирована!',
        type: 'success',
        duration: 1500,
      });
    },

    closeContract(Id) {
      this.closingContract = true;
      this.contractClose(Id)
        .then(() => {
          this.$message({
            message: 'Предложение успешно закрыто!',
            type: 'success',
            duration: 1500,
          });
          this.fetchContract();
        })
        .catch(() => (this.closingContract = false))
        .finally(() => (this.closingContract = false));
    },

    checkDurationDate(durationDate) {
      const today = dayjs(new Date());
      const pastDate = dayjs(durationDate);
      // дата с сервера до сегодняшнего дня
      return pastDate.isBefore(today);
    },

    getCurrentCommission() {
      const data = {
        amount: this.contractDetail.Amount,
        payMethod: this.getPayMethodForCommission,
      };

      return getCommission(data).then(commissions => {
        const { CardCommission, WmpCommission } = commissions;

        this.cardCommission = CardCommission;
        this.wmpCommission = WmpCommission;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/detail-layout.scss';
@import '@/styles/detail.scss';

.detail {
  &__paymethods {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__paymethod {
    width: auto;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 3px;
    }
  }

  &__paymethod-icon {
    width: 20px;
    flex-shrink: 0;
    margin-right: 5px;

    &--webmoney {
      width: 18px;
    }
  }

  &__desc {
    margin-bottom: 20px;
  }

  &__amount {
    font-size: 32px;
    font-weight: 500;
    margin-top: -5px;
  }

  &__currency {
    font-weight: 400;
  }

  &__purse {
    width: 100%;
    font-size: 14px;
  }

  &__actions {
    padding: 0 17px;
    margin: 25px 0 50px;
    display: flex;
    align-items: center;
  }

  &__actions-btn {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__social-sharing-title {
    text-align: center;
    font-size: 15px;
    margin-bottom: 10px;
    color: #5d6b85;
  }

  &__social-sharing {
    padding: 20px;
    background-color: #f1f6ff;
  }

  &__commission-item {
    color: #0f213c;
    font-size: 12px;
    display: flex;
    align-items: center;
    min-width: 40px;
  }

  &__commission-icon {
    margin-right: 4px;

    &--card {
      font-size: 16px;
    }
    &--webmoney {
      width: 13px;
      font-size: 16px;
      margin-right: 6px;
      margin-left: 1px;

      path {
        fill: rgba(#0f213c, 0.65);
      }
    }
  }

  &__commission-value {
    margin-right: 5px;
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

.order-1 {
  order: 1;
}
.order-2 {
  order: 2;
}
.order-3 {
  order: 3;

  @media (max-width: $mq-mobile) {
    order: 5;
  }
}
.order-4 {
  order: 4;
}
.order-5 {
  order: 5;

  @media (max-width: $mq-mobile) {
    order: 3;
  }
}

.detail-layout {
  &__widget {
    width: 100%;
    max-width: 540px;
  }
}
</style>
