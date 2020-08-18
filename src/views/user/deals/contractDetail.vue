<template>
  <div class="page-container">
    <loading-data :is-loading="loading" />

    <template v-if="!loading">
      <h1> Contract Detail ID: {{ contractDetail.Id }}</h1>
    </template>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoadingData from '@/components/LoadingData/index';

export default {
  name: 'ContractDetail',
  components: { LoadingData },
  data: () => ({
    id: null,
    loading: false,
    contractDetail: null,
  }),

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchContract',
  },

  created() {
    this.id = this.$route.params.id;

    this.fetchContract();
  },


  methods: {
    ...mapActions('deals', ['getContractDetail']),

    fetchContract() {
      this.loading = true;
      this.getContractDetail(this.id)
        .then(data => {
          this.contractDetail = data;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
