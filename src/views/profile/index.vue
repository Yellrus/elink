<template>
  <div class="page-container">
    <loading-data v-if="loading" />
    <div class="page-user-info">
      <div class="page-user-info__user">
        <loading-data v-if="!isLoadedProfile" />
        <user-short-info v-else />
      </div>

      <div class="page-user-info__content">
        <el-tabs v-model="activeName" :stretch="true">
          <el-tab-pane
            v-for="item in tabMapOptions"
            :key="item.key"
            :label="item.label"
            :name="item.key"
          >
            <keep-alive>
              <div
                v-if="activeName === item.key"
                class="page-user-info__tab-content"
              >
                <component :is="activeComponent" />
              </div>
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import UserShortInfo from './components/UserShortInfo';
import PaymethodViewTab from './components/Paymethods';
import { mapActions, mapGetters, mapState } from 'vuex';
import LoadingData from '../../components/LoadingData/index';

export default {
  name: 'Profile',
  components: { LoadingData, PaymethodViewTab, UserShortInfo },
  data() {
    return {
      loading: false,
      componentKey: 0,
      tabMapOptions: [
        // { label: 'Личные данные', key: 'passport' },
        { label: 'Платежные реквизиты', key: 'paymethod' },
        // { label: 'История транзакций', key: 'transaction' },
      ],
      activeName: 'paymethod',
      activeComponent: 'PaymethodViewTab',
      createdTimes: 0,
    };
  },

  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      wmp: 'profile/getWmpPurse',
    }),
    ...mapState({
      isLoadedProfile: state => state.profile.isLoaded,
      paymethods: state => state.profile.paymethods,
    }),
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchProfile',

    activeName(activeTabMenu) {
      this.$router.push(`${this.$route.path}?tab=${activeTabMenu}`);

      switch (activeTabMenu) {
        case 'paymethod':
          this.activeComponent = PaymethodViewTab;
          break;
        // case 'passport':
        //   this.activeComponent = PaymethodViewTab;
        //   break;
        // case 'transaction':
        //   this.activeComponent = PaymethodViewTab;
        //   break;
      }
    },
  },

  created() {
    this.fetchProfile();
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },

  methods: {
    ...mapActions('profile', ['getInfo']),
    fetchProfile() {
      this.getInfo()
        .then(() => {
          this.loading = true;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page-user-info {
  width: 100%;
  display: flex;

  @media (max-width: $mq-tablet-vertical) {
    flex-direction: column;
  }

  &__user {
    position: relative;
    width: 100%;
    max-width: 370px;
    margin-right: 25px;

    @media (max-width: $mq-tablet-vertical) {
      max-width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  &__content {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &__tab-content {
    padding: 20px 20px 0 20px;
    background-color: #fff;
  }

  &__paymethods {
    display: flex;
    flex-wrap: wrap;
  }

  &__paymethod {
    margin: 5px;
  }
}

.el-tabs__item:hover {
  background-color: #f5f7fa;
  transition: all 0.2s ease-in-out;
}

.tab-icon {
  margin-right: 10px;
  font-size: 16px;
}

.tab-label {
  font-size: 16px;
  font-weight: 500;
}
</style>
