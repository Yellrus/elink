<template>
  <div class="deals__wrap-pagination">
    <div class="deals">
      <loading-data v-if="loadingDeals" />
      <data-empty v-if="items.length <= 0 && !loadingDeals">
        продажи отсутствуют
        <template v-slot:text>
          Продажи по данному предложению отсутствуют
        </template>
      </data-empty>

      <div v-for="item in items" :key="item.Id" class="deals__item">
        <div class="contract">
          <arrow v-if="device !== 'mobile'" />
          <router-link
            :to="`/deals/${item.Id}`"
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
              <div class="contract__Panel">
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

            <div v-if="device === 'mobile'" class="contract__Duration">
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
              <status :data-statuses="dealsStatuses" :status-id="item.Status" />
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <pagination
      v-show="total > 6"
      :layout="
        device === 'mobile'
          ? 'total, prev, pager, next'
          : 'total, prev, pager, next, jumper'
      "
      :pager-count="device === 'mobile' ? 5 : 7"
      :total="total"
      :page.sync="listQuery.offset"
      :limit.sync="listQuery.limit"
      @pagination="fetchDealsForContract"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import DataEmpty from '@/components/DataEmpty';
import Pagination from '@/components/Pagination';
import LoadingData from '@/components/LoadingData';
import Arrow from '@/components/Arrow';
import CreditCardLogo from '../../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../../public/webmoney-logo.svg';
import Status from '../../deals/components/Status';

export default {
  name: 'DealsForContract',
  components: {
    Status,
    Arrow,
    LoadingData,
    DataEmpty,
    Pagination,
    CreditCardLogo,
    WebmoneyLogo,
  },
  data: () => ({
    loadingDeals: false,
    total: 0,
    listQuery: {
      offset: 1,
      limit: 6,
      //startDate: '',
      //endDate: '',
      //search: '',
      //statuses: '',
      //payMethod: '',
      contractId: '',
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
    $route: 'fetchDealsForContract',
  },

  created() {
    this.id = this.$route.params.id;
    this.$set(this.listQuery, 'contractId', this.id);

    this.fetchDealsForContract();
    this.getDealsStatus();
  },

  methods: {
    ...mapActions('deal', ['getDeals', 'getDealsStatus']),

    async fetchDealsForContract() {
      this.loadingDeals = true;
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
        this.loadingDeals = false;
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/contract-list-item.scss';

.deals {
  position: relative;

  &__wrap-pagination {
    width: 100%;
    height: 100%;
    min-height: 150px;
    margin: 0 auto;
    position: relative;
  }

  &__item {
    border-bottom: 1px solid #f2f2f2;
    transition: border 0.2s ease-in-out;

    &:hover {
      border-color: #fff;
      .contract {
        background-color: #f1f6ff;
      }

      .contract__Amount {
        background-color: #fff;
      }
    }
  }
}

.pagination-container {
  box-shadow: none;
  margin-top: 0;
}

.contract {
  box-shadow: none;
  cursor: pointer;

  &::before {
    content: none;
  }

  &__Created {
    font-size: 12px;
  }

  &__Amount {
    background-color: #f1f6ff;
    font-size: 12px;
    font-weight: 500;
    min-width: 85px;
  }
}
</style>
