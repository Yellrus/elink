<template>
  <div class="page-container">
    <loading-data v-if="loading" />
    <template v-if="!loading && dealDetail">
      <h1>Contract Detail ID: {{ dealDetail.Id }}</h1>
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
    dealDetail: null,
  }),

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
  },
};
</script>
