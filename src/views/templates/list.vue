<template>
  <div class="page-container">
    <!-- Header -->
    <div class="page-container__header">
      <h1 class="page-contracts-heading">Мои шаблоны</h1>
    </div>

    <!-- Content -->
    <div class="page-container__wrap-pagination">
      <loading-data v-if="loadingData" />
      <div class="templates">
        <data-empty
          v-if="items.length <= 0 && !loadingData && !deletingTemplate"
        >
          <template v-slot:text>
            {{ textDataEmpty }}
          </template>
        </data-empty>

        <transition-group name="list" tag="div" class="templates__items">
          <div v-for="item in items" :key="item.Id" class="templates__item">
            <list-item
              :item="item"
              :deleting="deletingTemplate"
              @view-contract="viewContract"
              @delete-contract="fetchDeleteTemplate"
              @create-contract="handleCreateContract"
            />
          </div>
        </transition-group>
      </div>
    </div>

    <el-dialog
      title="Просмотр предложения"
      :destroy-on-close="true"
      :visible.sync="dialogViewContract"
      :width="device === 'mobile' ? '90%' : '30%'"
      top="8vh"
      class="dialog"
      center
    >
      <contract-info
        v-if="currentViewContract"
        :contract="currentViewContract"
      />
      <data-empty v-else>
        <template v-slot:text>
          Нет данных по контракту
        </template>
      </data-empty>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import LoadingData from '@/components/LoadingData';
import DataEmpty from '@/components/DataEmpty';
import { ListItem, ContractInfo } from './components';

export default {
  name: 'Templates',
  components: { ContractInfo, ListItem, DataEmpty, LoadingData },
  data: () => ({
    dialogViewContract: false,
    currentViewContract: null,
    textDataEmpty: 'У вас нет шаблонов',
    loadingData: false,
    deletingTemplate: false,
    total: 0,
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
    }),
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchTemplates',
  },

  created() {
    this.fetchTemplates();
  },

  methods: {
    ...mapActions('templates', ['getTemplates', 'deleteTemplate']),

    async fetchTemplates() {
      this.loadingData = true;
      const offset =
        this.listQuery.offset === 1
          ? 0
          : (this.listQuery.offset - 1) * this.listQuery.limit;

      //const { Total } = Pagination;

      this.items = await this.getTemplates({
        limit: this.listQuery.limit,
        offset: offset,
      });
      //this.total = Total;
      setTimeout(() => {
        this.loadingData = false;
      }, 0);
    },

    viewContract(contract) {
      this.currentViewContract = contract;
      this.dialogViewContract = true;
    },

    async fetchDeleteTemplate(id) {
      this.deletingTemplate = true;
      await this.deleteTemplate(id);
      this.deletingTemplate = false;
    },

    handleCreateContract(contract) {
      this.$router.push({ name: 'UserContractCreate', params: { contract } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.page-container {
  &__wrap-pagination {
    max-width: 1128px;
  }

  &__header {
    max-width: 1128px;
  }
}

.page-contracts-heading {
  max-width: 1128px;
}

.templates {
  &__items {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;

    @media (max-width: $mq-mobile) {
      flex-flow: column nowrap;
      align-items: center;
    }
  }

  &__item {
    padding: 10px;

    @media (max-width: $mq-mobile) {
      width: 100%;
    }
  }
}
</style>
