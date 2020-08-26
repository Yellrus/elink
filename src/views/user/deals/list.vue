<template>
  <div class="page-container">
    <h1 class="page-contracts-heading">Список моих продаж</h1>
    <div class="page-container__wrap-pagination">
      <loading-data v-if="loadingData" />
      <div class="deals">
        <data-empty v-if="items.length <= 0 && !loadingData">
          <template v-slot:text>
            {{ textDataEmpty }}
          </template>
        </data-empty>

        <div v-for="item in items" :key="item.Id" class="deals__item">
          <div class="contract">
            <arrow v-if="device !== 'mobile'" />
            <router-link
              :to="`deals/${item.Id}`"
              tag="div"
              class="contract__body"
            >
              <div class="contract__Created">
                <span class="contract__CreatedMonthDay">{{
                  item.Created | formatDateDayMonth
                }}</span>
                <span class="contract__CreatedYear">{{
                  item.Created | formatDateYear
                }}</span>
              </div>

              <div class="contract__Column">
                <div class="contract__Name">
                  {{ item.Contract.Name | uppercaseFirst }}
                </div>

                <div class="contract__Panel">
                  <div class="contract__Category">
                    {{ item.Contract.CategoryId | getCategoryName }}
                  </div>

                  <div class="contract__Paymethods">
                    <el-tooltip
                      v-if="item.PayMethod === 1"
                      class="item"
                      content="Способ оплаты WebMoney"
                      placement="top-start"
                    >
                      <WebmoneyLogo
                        class="contract__Paymethod contract__Paymethod--webmoney"
                      />
                    </el-tooltip>

                    <el-tooltip
                      v-if="item.PayMethod === 2"
                      class="item"
                      content="Способ оплаты Банковская карта"
                      placement="top-start"
                    >
                      <CreditCardLogo
                        class="contract__Paymethod contract__Paymethod--card"
                      />
                    </el-tooltip>
                  </div>

                  <div v-if="device !== 'mobile'" class="contract__status">
                    <status
                      :data-statuses="dealsStatuses"
                      :status-id="item.Status"
                    />
                  </div>
                </div>
              </div>

              <div class="contract__item-row">
                <div class="contract__Amount">
                  {{ item.Contract.Amount | toThousandFilter }}
                  <span class="contract__Currency">₽</span>
                </div>
              </div>

              <div class="contract__Duration">
                <span class="contract__DurationTitle">
                  <el-icon class="contract__DurationIcon el-icon-time" />
                  Дата закрытия
                </span>

                <div class="contract__DurationValue">
                  <span>{{ item.ClosingAt | formatDateDayMonth }}</span
                  >&nbsp;
                  <span>{{ item.ClosingAt | formatDateYear }}</span>
                </div>
              </div>

              <div v-if="device === 'mobile'" class="contract__status">
                <status
                  :data-statuses="dealsStatuses"
                  :status-id="item.Status"
                />
              </div>
            </router-link>

            <div class="contract__Actions">
              <div class="contract__ActionsItem">
                <template v-if="!checkClosingAtDate(item.ClosingAt)">
                  <el-popconfirm
                    v-if="item.Status === 1"
                    confirm-button-text="Подтвердить"
                    cancel-button-text="Отмена"
                    placement="top"
                    class="contract__btn-popconfirm"
                    :title="`Удалить ${item.Contract.Name} ?`"
                    @onConfirm="cancelContract(item.Id)"
                  >
                    <el-button
                      slot="reference"
                      type="danger"
                      size="small"
                      icon="el-icon-delete"
                      circle
                      plain
                    />
                  </el-popconfirm>
                  <el-tooltip v-else placement="top">
                    <div slot="content">При текущем статусе не отменить</div>
                    <el-button
                      type="info"
                      size="small"
                      icon="el-icon-delete"
                      circle
                      plain
                    />
                  </el-tooltip>

                </template>
                <template v-else>
                  <el-tooltip placement="top">
                    <div slot="content">Время на отмену истекло</div>
                    <el-button
                      type="info"
                      size="small"
                      icon="el-icon-delete"
                      circle
                      plain
                    />
                  </el-tooltip>
                </template>

              </div>
            </div>
          </div>
        </div>
      </div>

      <pagination
        v-show="total > 10"
        :layout="
          device === 'mobile'
            ? 'total, prev, pager, next'
            : 'total, sizes, prev, pager, next, jumper'
        "
        :pager-count="device === 'mobile' ? 5 : 7"
        :total="total"
        :page.sync="listQuery.offset"
        :limit.sync="listQuery.limit"
        @pagination="fetchDeals"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import DataEmpty from '@/components/DataEmpty';
import Pagination from '@/components/Pagination';
import LoadingData from '@/components/LoadingData';
import CreditCardLogo from '../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import { Status } from './components';
import Arrow from '@/components/Arrow';
import dayjs from 'dayjs';

export default {
  name: 'Deals',
  components: {
    Arrow,
    Status,
    LoadingData,
    DataEmpty,
    Pagination,
    CreditCardLogo,
    WebmoneyLogo,
  },
  data: () => ({
    textDataEmpty: 'У вас ещё нет продаж',
    loadingData: false,
    cancelingDeal: false,
    total: 0,
    listQuery: {
      offset: 1,
      limit: 10,
      //startDate: '',
      //endDate: '',
      //search: '',
      //statuses: '',
      //payMethod: '',
      //contractId: '',
    },
    items: [],
    pagination: {},
  }),

  computed: {
    ...mapGetters(['device']),
    ...mapState({
      dealsStatuses: state => state.deal.statuses,
    }),
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchDeals',
  },

  created() {
    this.fetchDeals();
    this.getDealsStatus();
  },

  methods: {
    ...mapActions('deal', ['getDeals', 'dealCancel', 'getDealsStatus']),

    async fetchDeals() {
      this.loadingData = true;
      const offset =
        this.listQuery.offset === 1
          ? 0
          : (this.listQuery.offset - 1) * this.listQuery.limit;

      const { Items, Pagination } = await this.getDeals({
        ...this.listQuery,
        offset,
      });
      const { Total } = Pagination;

      this.items = Items;
      this.total = Total;
      setTimeout(() => {
        this.loadingData = false;
      }, 300);
    },

    cancelContract(Id) {
      this.cancelingDeal = true;
      this.dealCancel(Id)
        .then(() => {
          this.$message({
            message: 'Успешно отменён!',
            type: 'success',
            duration: 1500,
          });
          this.fetchDeals();
        })
        .catch(() => (this.cancelingDeal = false))
        .finally(() => (this.cancelingDeal = false));
    },

    checkClosingAtDate(closingAtDate) {
      const today = dayjs(new Date());
      const pastDate = dayjs(closingAtDate);
      // дата с сервера до сегодняшнего дня
      return pastDate.isBefore(today);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/contract-list-item.scss';

.deals {
  max-width: 1100px;
  margin: 0 auto;
  min-height: calc(100vh - 290px);

  @media (max-width: $mq-tablet-vertical) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  @media (max-width: $mq-mobile) {
    flex-direction: column;
    margin: 0;
  }

  &__item {
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &:hover {
      .arrow {
        visibility: visible;
        opacity: 1;
      }
    }

    @media (max-width: $mq-tablet-vertical) {
      width: 50%;
      padding: 10px;
    }

    @media (max-width: $mq-mobile) {
      width: 100%;
      padding: 0;
    }
  }
}
</style>
