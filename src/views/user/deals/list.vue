<template>
  <div class="page-container">
    <!-- Header -->
    <div class="page-container__header">
      <h1 class="page-contracts-heading">Мои сделки по продаже</h1>
      <el-badge class="filter-btn" is-dot :hidden="!isBadgeActiveFilter">
        <el-button size="small" plain @click="toggleFilter">
          <el-icon class="el-icon-s-operation" />
          Фильтры
        </el-button>
      </el-badge>
    </div>

    <!-- Filters-->
    <div class="page-container__filter-data">
      <div class="filter-data">
        <transition name="fade-transform" mode="out-in">
          <div v-if="isActiveFilter" class="filter-data__content">
            <el-form
              ref="filterQuery"
              :model="filterQuery"
              label-position="top"
              class="filter-data__form"
              label-width="120px"
            >
              <div class="filter-data__row">
                <div class="filter-data__form-item">
                  <span class="filter-data__form-label">По названию</span>
                  <el-input
                    v-model="filterQuery.search"
                    clearable
                    size="medium"
                    :style="device !== 'mobile' && 'width: 220px'"
                    placeholder="Имя предложения"
                    class="filter-item"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-search" />
                  </el-input>
                </div>
                <div class="filter-data__form-item">
                  <span class="filter-data__form-label">Статус</span>
                  <el-select
                    v-model="filterQuery.statuses"
                    size="medium"
                    clearable
                    multiple
                    placeholder="Статус"
                  >
                    <template slot="prefix">
                      <el-icon class="el-icon-files" />
                    </template>
                    <el-option
                      v-for="item in statuses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="filter-data__form-item">
                  <span class="filter-data__form-label">Способ оплаты</span>
                  <el-select
                    v-model.number="filterQuery.payMethod"
                    size="medium"
                    clearable
                    placeholder="Платежная система"
                  >
                    <template slot="prefix">
                      <el-icon class="el-icon-wallet" />
                    </template>
                    <el-option
                      v-for="item in paymethodList"
                      :key="item.Id"
                      :label="item.PaymethodTitle"
                      :value="item.Id"
                    >
                      <select-option :paymethod="item" />
                    </el-option>
                  </el-select>
                </div>

                <div class="filter-data__form-item">
                  <span class="filter-data__form-label">ID предложения</span>
                  <el-input
                    v-model="filterQuery.contractId"
                    clearable
                    size="medium"
                    :style="device !== 'mobile' && 'width: 220px'"
                    placeholder="Например, TapLGD0"
                    class="filter-item"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-search" />
                  </el-input>
                </div>
              </div>

              <div class="filter-data__row">
                <div class="filter-data__form-item">
                  <span class="filter-data__form-label">Дата создания</span>
                  <el-date-picker
                    v-model="filterQuery.startDate"
                    v-mask="'##.##.####'"
                    size="medium"
                    type="date"
                    format="dd.MM.yyyy"
                    placeholder="Выберите дату"
                  >
                  </el-date-picker>
                </div>
                <div class="filter-data__form-item">
                  <span class="filter-data__form-label">Дата закрытия</span>
                  <el-date-picker
                    v-model="filterQuery.endDate"
                    v-mask="'##.##.####'"
                    size="medium"
                    type="date"
                    format="dd.MM.yyyy"
                    placeholder="Выберите дату"
                  >
                  </el-date-picker>
                </div>

                <div
                  class="filter-data__form-item filter-data__form-item--paymethod"
                >
                  <div class="filter-data__selected-item">
                    <payment-card
                      v-if="filterQuery.payMethod === 2"
                      :paymethod="paymethodList.find(x => x.Id === 2)"
                      :type-form="true"
                    />
                  </div>

                  <div class="filter-data__selected-item">
                    <payment-wmp
                      v-if="filterQuery.payMethod === 1"
                      :type-form="true"
                    />
                  </div>
                </div>
              </div>
              <div class="filter-data__actions">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-refresh-left"
                  class="filter-data__reset"
                  @click="resetFormFilter"
                  >Сбросить фильтры</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-circle-close"
                  class="filter-data__close"
                  @click="toggleFilter"
                  >Закрыть</el-button
                >
              </div>
            </el-form>
          </div>
        </transition>
      </div>
    </div>

    <!-- Content -->
    <div class="page-container__wrap-pagination">
      <loading-data v-if="loadingData" />
      <div class="deals">
        <data-empty v-if="items.length <= 0 && isFiltering">
          <template v-slot:text>
            Ничего не найдено
          </template>
        </data-empty>

        <data-empty v-if="items.length <= 0 && !isFiltering">
          <template v-slot:text>
            {{ textDataEmpty }}
          </template>
        </data-empty>

        <div v-for="item in items" :key="item.Id" class="deals__item">
          <list-item :item="item" @cancel="cancelDeal" />
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
        @pagination="fetchDeals(false)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import DataEmpty from '@/components/DataEmpty';
import Pagination from '@/components/Pagination';
import SelectOption from './components/SelectOption';
import PaymentCard from '@/components/PaymentCard';
import PaymentWmp from '@/components/PaymentWmp';
import LoadingData from '@/components/LoadingData';
import ListItem from './components/ListItem';
import _debounce from 'lodash.debounce';
import { resetForm } from '@/mixins/common';
import { mask } from 'vue-the-mask';

export default {
  name: 'Deals',
  components: {
    ListItem,
    LoadingData,
    DataEmpty,
    Pagination,
    PaymentWmp,
    PaymentCard,
    SelectOption,
  },
  directives: {
    mask,
  },
  mixins: [resetForm],
  data: () => ({
    textDataEmpty: 'У вас ещё нет продаж',
    isActiveFilter: false,
    loadingData: false,
    cancelingDeal: false,
    total: 0,
    paymethodList: [
      {
        Id: 1,
        Paymethod: 'WebMoney',
        PaymethodTitle: 'WebMoney',
      },
      {
        Id: 2,
        Paymethod: 'Cards',
        PaymethodTitle: 'Банковская карта',
      },
    ],
    isBadgeActiveFilter: false,
    filterQuery: {
      startDate: '',
      endDate: '',
      search: '',
      statuses: [],
      payMethod: '',
      contractId: '',
    },
    isFiltering: false,
    listQuery: {
      offset: 1,
      limit: 10,
    },
    items: [],
    pagination: {},
  }),

  computed: {
    ...mapGetters(['device']),
    ...mapState({
      dealsStatuses: state => state.deal.statuses,
    }),

    statuses() {
      let arr = Object.keys(this.dealsStatuses).map(k => {
        return {
          id: k,
          name: this.dealsStatuses[k],
        };
      });
      return arr;
    },
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchDeals',

    filterQuery: {
      handler(newVal) {
        let val = Object.values(newVal).map(
          key => key || (Array.isArray(key) && key.length > 0)
        );

        this.fetchDebounceGetDeals();

        if (
          val.every(
            item => item === false || (Array.isArray(item) && item.length <= 0)
          )
        ) {
          this.isBadgeActiveFilter = false;
          this.isFiltering = false;
          return;
        }
        this.isBadgeActiveFilter = true;
        this.isFiltering = true;
      },
      deep: true,
    },
  },

  created() {
    this.fetchDeals();
    this.getDealsStatus();
  },

  methods: {
    ...mapActions('deal', ['getDeals', 'dealCancel', 'getDealsStatus']),

    fetchDebounceGetDeals: _debounce(function() {
      this.fetchDeals(true);
    }, 150),

    async fetchDeals(isFilter = false) {
      this.loadingData = true;
      const offset =
        this.listQuery.offset === 1
          ? 0
          : (this.listQuery.offset - 1) * this.listQuery.limit;

      const { Items, Pagination } = await this.getDeals({
        limit: this.listQuery.limit,
        offset: isFilter ? 0 : offset,
        ...this.filterQuery,
      });
      const { Total } = Pagination;

      this.items = Items;
      this.total = Total;
      setTimeout(() => {
        this.loadingData = false;
      }, 300);
    },

    cancelDeal(Id) {
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

    toggleFilter() {
      this.isActiveFilter = !this.isActiveFilter;
    },

    resetFormFilter() {
      this.resetForm(this.filterQuery);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/filter-data.scss';

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

.page-contracts-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: $mq-mobile) {
    margin-bottom: 48px;
  }
}
</style>
