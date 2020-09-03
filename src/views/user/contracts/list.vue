<template>
  <div class="page-container">
    <!-- Header -->
    <div class="page-container__header">
      <h1 class="page-contracts-heading">Мои предложения</h1>

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
                  <span class="filter-data__form-label">Название</span>
                  <el-input
                    v-model="filterQuery.contractName"
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
                  <span class="filter-data__form-label">Категория</span>
                  <el-select
                    v-model="filterQuery.categories"
                    size="medium"
                    clearable
                    multiple
                    placeholder="Категория"
                  >
                    <template slot="prefix">
                      <el-icon class="el-icon-files" />
                    </template>
                    <el-option
                      v-for="item in categoryList"
                      :key="item.Id"
                      :label="item.Name"
                      :value="item.Id"
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
              </div>

              <div class="filter-data__row">
                <div class="filter-data__form-item">
                  <span class="filter-data__form-label">Дата создания</span>
                  <el-date-picker
                    v-model="filterQuery.createdAt"
                    v-mask="'##.##.####'"
                    size="medium"
                    type="date"
                    format="dd.MM.yyyy"
                    placeholder="Выберите дату"
                  >
                  </el-date-picker>
                </div>
                <div class="filter-data__form-item">
                  <span class="filter-data__form-label">Активно до</span>
                  <el-date-picker
                    v-model="filterQuery.activeFor"
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
      <template>
        <!-- List items -->
        <div class="contracts">
          <data-empty
            v-if="items.length <= 0 && !loadingData && !isFiltering"
            :btn-title="btnDataEmptyTitle"
            :btn-url="`/contracts/create`"
          >
            <template v-slot:text>
              {{ textDataEmpty }}
            </template>
          </data-empty>
          <data-empty v-if="items.length <= 0 && isFiltering">
            <template v-slot:text>
              Ничего не найдено
            </template>
          </data-empty>
          <div
            v-for="contract in items"
            :key="contract.Id"
            class="contracts__item"
          >
            <list-item :contract="contract" @close="closeContract" />
          </div>
        </div>

        <!-- Pagination -->
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
          @pagination="fetchContracts(false)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import clipboard from '@/directive/clipboard';
import LoadingData from '@/components/LoadingData';
import Pagination from '@/components/Pagination';
import DataEmpty from '@/components/DataEmpty';
import { ListItem } from './components';
import { mask } from 'vue-the-mask';
import _debounce from 'lodash.debounce';
import SelectOption from './components/SelectOption';
import PaymentCard from '@/components/PaymentCard';
import PaymentWmp from '@/components/PaymentWmp';
import { resetForm } from '@/mixins/common';

export default {
  name: 'Contracts',
  components: {
    ListItem,
    PaymentWmp,
    PaymentCard,
    SelectOption,
    DataEmpty,
    LoadingData,
    Pagination,
  },
  directives: {
    clipboard,
    mask,
  },
  mixins: [resetForm],

  data: () => ({
    textDataEmpty:
      'У вас нет активных предложений. Чтобы создать новое предложение, нажмите на кнопку ниже',
    btnDataEmptyTitle: 'Создать предложение',
    isActiveFilter: false,
    closingContract: false,
    loadingData: false,
    isBadgeActiveFilter: false,
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
    total: 0,
    isFiltering: false,
    filterQuery: {
      createdAt: '',
      activeFor: '',
      payMethod: '',
      contractName: '',
      categories: [],
    },
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
      device: state => state.app.device,
      categoryList: state => state.dictionary.categories,
    }),
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchContracts',

    filterQuery: {
      handler(newVal) {
        let val = Object.values(newVal).map(
          key => key || (Array.isArray(key) && key.length > 0)
        );

        this.fetchDebounceGetContracts();

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
    this.fetchContracts();
  },

  methods: {
    ...mapActions('contract', ['getContracts', 'contractClose']),

    fetchDebounceGetContracts: _debounce(function() {
      this.fetchContracts(true);
    }, 150),

    async fetchContracts(isFilter = false) {
      this.loadingData = true;
      const offset =
        this.listQuery.offset === 1
          ? 0
          : (this.listQuery.offset - 1) * this.listQuery.limit;

      const { Items, Pagination } = await this.getContracts({
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

    closeContract(Id) {
      this.closingContract = true;
      this.contractClose(Id)
        .then(() => {
          this.$message({
            message: 'Предложение успешно закрыто!',
            type: 'success',
            duration: 1500,
          });
          this.fetchContracts();
        })
        .catch(() => (this.closingContract = false))
        .finally(() => (this.closingContract = false));
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

.contracts {
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
