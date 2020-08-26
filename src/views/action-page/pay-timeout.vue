<template>
  <div class="page-action">
    <loading-data v-if="loading" />

    <div v-if="!loading" class="page-action__box-card pay">
      <h1 class="page-action__title">Время истекло</h1>
      <div class="pay__info">
        <p class="pay__text">
          Время для платежа истекло, если товар остался в наличии, вы можете
          попробовать заплатить ещё раз
        </p>

        <router-link :to="url">
          <el-button type="primary">Попробовать ещё</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoadingData from '@/components/LoadingData/index';

export default {
  name: 'PayTimeout',
  components: { LoadingData },
  data: () => ({
    loading: false,
    contractId: null,
    contract: {},
  }),

  computed: {
    url() {
      return `/contract/${this.contractId}`;
    },
  },

  created() {
    this.contractId = this.$route.query.contractId;
    if (!this.contractId) {
      this.$router.replace('404');
      return;
    }
    this.fetchContract();
  },

  methods: {
    ...mapActions('contract', ['getContract']),

    fetchContract() {
      this.loading = true;
      this.getContract(this.contractId)
        .then(data => {
          this.contract = data;
          this.loading = false;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/page-action.scss';

.pay {
  &__info {
    display: flex;
    flex-direction: column;
  }

  &__text {
    background-color: #fff3e0;
    color: #f57c00;
    padding: 25px 17px;
    border-radius: 20px;
    font-weight: 400;
    font-size: 15px;
    margin-top: 0;
    margin-bottom: 20px;
  }
}
</style>
