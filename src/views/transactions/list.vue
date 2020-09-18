<template>
  <div class="page-container">
    <!-- Header -->
    <div class="page-container__header">
      <div class="page-contracts-heading">
        <h1>
          История транзакций
        </h1>
        <div class="page-container__header-row">
          <btn-download-csv
            :items="transactionsCSV"
            :name-file="`transactions`"
            :loading="loadingCSV"
            :handle-api="fetchTransactionsCSV"
          />
          <div class="page-search">
            <el-input
              v-model="listQuery.purseName"
              clearable
              placeholder="Поиск по номеру кошелька и карты"
            >
              <el-icon slot="prefix" class="el-icon-search page-search__icon" />
            </el-input>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="page-container__wrap-pagination">
      <loading-data v-if="loadingData" />

      <div class="transactions">
        <data-empty v-if="items.length <= 0">
          <template v-slot:text>
            Нет данных
          </template>
        </data-empty>

        <div
          v-for="item in items"
          :key="item.Deal.Id"
          class="transactions__item"
        >
          <list-item :transaction="item" />
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
        @pagination="fetchTransactions()"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import _debounce from 'lodash.debounce';
import Pagination from '@/components/Pagination';
import LoadingData from '@/components/LoadingData';
import DataEmpty from '../../components/DataEmpty/index';
import { ListItem } from './components';
import BtnDownloadCsv from '../../components/CvcDownload/index';

export default {
  name: 'Transactions',
  components: { BtnDownloadCsv, ListItem, DataEmpty, LoadingData, Pagination },
  data: () => ({
    loadingData: false,
    total: 0,
    listQuery: {
      offset: 1,
      limit: 10,
      purseName: '',
    },
    items: [],
    pagination: {},
  }),

  computed: {
    ...mapGetters(['device']),
    ...mapState({
      dealsStatuses: state => state.deal.statuses,
      transactionsCSV: state => state.transactions.transactionsCSV,
      loadingCSV: state => state.transactions.loadingCSV,
    }),
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchTransactions',

    'listQuery.purseName': function() {
      this.fetchDebounceGetTransactions();
    },
  },

  created() {
    this.fetchTransactions();
  },

  methods: {
    ...mapActions('transactions', ['getTransactions', 'getTransactionsCSV']),

    fetchDebounceGetTransactions: _debounce(function() {
      this.fetchTransactions(true);
    }, 150),

    async fetchTransactions() {
      this.loadingData = true;
      const offset =
        this.listQuery.offset === 1
          ? 0
          : (this.listQuery.offset - 1) * this.listQuery.limit;

      const { Items, Pagination } = await this.getTransactions({
        limit: this.listQuery.limit,
        offset: offset,
        purseName: this.listQuery.purseName,
      });
      const { Total } = Pagination;

      this.items = Items;
      this.total = Total;
      setTimeout(() => {
        this.loadingData = false;
      }, 0);
    },

    async fetchTransactionsCSV() {
      await this.getTransactionsCSV({
        limit: 10000000,
        offset: 0,
        purseName: this.listQuery.purseName,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.transactions {
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
    &:not(:last-child) {
      margin-bottom: 20px;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: $mq-mobile) {
    margin-bottom: 20px;
    flex-wrap: wrap;

    h1 {
      font-size: 1.3em;
      line-height: 1.4;
    }
  }
}

.page-search {
  width: 400px;
  margin-left: 20px;

  @media (max-width: $mq-mobile) {
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
  }

  &__icon {
    line-height: 35px;
  }
}

.page-container__header-row {
  display: flex;
  align-items: baseline;
}
</style>
