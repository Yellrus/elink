<template>
  <div class="page-action">
    <h1>Pay Confirm</h1>

    <!--    <router-link :to="url">-->
    <!--      <button>Оплатить</button>-->
    <!--    </router-link>-->

    <el-link :href="url">Оплатить</el-link>

    <loading-data :is-loading="loading" />
  </div>
</template>

<script>
import LoadingData from '@/components/LoadingData';
import { mapActions } from 'vuex';
import { BASE_URL } from '@/utils/request';

export default {
  name: 'PayConfirm',
  components: { LoadingData },
  data: () => ({
    loading: false,
    contract: {},
  }),

  computed: {
    paymethod() {
      if (this.contract.Card) {
        return 2;
      } else if (this.contract.WmpPurse) {
        return 1;
      }

      return null;
    },

    contractId() {
      return this.$route.params.id;
    },

    url() {
      return `${BASE_URL}api/pay/${this.contractId}?p=${this.paymethod}`;
    },
  },

  created() {
    console.log('route', this.$route.params.id);
    this.fetchContract();
  },

  methods: {
    ...mapActions('deals', ['getContract']),

    fetchContract() {
      this.loading = true;
      this.getContract(this.contractId)
        .then(data => {
          this.contract = data;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
