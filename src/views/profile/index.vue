<template>
  <div class="page-container">
<!--    {{ paymethods }}-->
    <div class="page-user-info">
      <div class="page-user-info__user">
        <user-short-info />
      </div>

      <div class="page-user-info__content">
        <!--        <el-tabs :stretch="true">-->
        <!--          <el-tab-pane class="tab-pane">-->
        <!--            <span slot="label"-->
        <!--              ><el-icon class="el-icon-user tab-icon"></el-icon>-->
        <!--              <span class="tab-label">Данные</span></span-->
        <!--            >-->

        <!--            <div class="page-user-info__tab-content">-->
        <!--              Место для личных данных-->
        <!--              <router-view></router-view>-->
        <!--            </div>-->
        <!--          </el-tab-pane>-->
        <!--          <el-tab-pane label="Платежная информация">-->
        <!--            <span slot="label"-->
        <!--              ><el-icon class="el-icon-wallet tab-icon"></el-icon-->
        <!--              ><span class="tab-label">Платежные реквизиты</span></span-->
        <!--            >-->
        <!--            <div class="page-user-info__tab-content">-->
        <!--              <div class="page-user-info__paymethods">-->
        <!--                  <div class="page-user-info__paymethod">-->
        <!--                    <payment-card-->
        <!--                      :payment="{-->
        <!--                      Paymethod: 'Cards',-->
        <!--                      Purse: '5470 70XX XXXX 8041',-->
        <!--                    }"-->
        <!--                    />-->
        <!--                  </div>-->
        <!--                <div class="page-user-info__paymethod">-->
        <!--                  <payment-card-->
        <!--                    :payment="{-->
        <!--                      Paymethod: 'Cards',-->
        <!--                      Purse: '5470 70XX XXXX 8041',-->
        <!--                    }"-->
        <!--                  />-->
        <!--                </div>-->
        <!--                <div class="page-user-info__paymethod">-->
        <!--                  <payment-card-->
        <!--                    :payment="{-->
        <!--                      Paymethod: 'WebMoney',-->
        <!--                      Purse: 'P157724100280',-->
        <!--                    }"-->
        <!--                  />-->
        <!--                </div>-->

        <!--              </div>-->
        <!--            </div>-->
        <!--          </el-tab-pane>-->
        <!--          <el-tab-pane label="История транзакций">-->
        <!--            <span slot="label"-->
        <!--              ><el-icon class="el-icon-time tab-icon"></el-icon-->
        <!--              ><span class="tab-label">История транзакций</span></span-->
        <!--            >-->
        <!--            <div class="page-user-info__tab-content">-->
        <!--              Место для транзакций-->
        <!--            </div>-->
        <!--          </el-tab-pane>-->
        <!--        </el-tabs>-->

        <el-tabs
          v-model="activeName"
          :stretch="true"
        >
          <el-tab-pane
            v-for="item in tabMapOptions"
            :key="item.key"
            :label="item.label"
            :name="item.key"
          >
            <keep-alive>
              <div v-if="activeName === item.key" class="page-user-info__tab-content">
                <component :is="activeComponent" />
<!--                <paymethod-view-tab v-if="activeName === 'paymethod'"/>-->
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
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Profile',
  components: { PaymethodViewTab, UserShortInfo },
  data() {
    return {
      componentKey: 0,
      tabMapOptions: [
        { label: 'Личные данные', key: 'passport' },
        { label: 'Платежные реквизиты', key: 'paymethod' },
        { label: 'История транзакций', key: 'transaction' },
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
    activeName(activeTabMenu) {
      this.$router.push(`${this.$route.path}?tab=${activeTabMenu}`);

      switch (activeTabMenu) {
        case 'passport':
          this.activeComponent = PaymethodViewTab;
          break;
        case 'paymethod':
          this.activeComponent = PaymethodViewTab;
          break;
        case 'transaction':
          this.activeComponent = PaymethodViewTab;
          break;
      }
    },
  },

  created() {
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
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
    width: 100%;
    max-width: 350px;
    margin-right: 20px;

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
