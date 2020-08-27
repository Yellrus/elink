<template>
  <div class="user-column">
    <div class="user-info user-info--short">
      <div class="user-info__header">
        <div class="user-info__avatar">
          <user-avatar :size="100" />
          <div class="user-info__status">
            <el-popover
              v-if="
                Number(profile.SmevIdentificatedStatus) === 100 ||
                  Number(profile.SmevIdentificatedStatus) === 501 ||
                  Number(profile.SmevIdentificatedStatus) < 100
              "
              placement="top-start"
              title="Статус"
              width="250"
              trigger="hover"
              :content="getStatus(profile.SmevIdentificatedStatus).title"
            >
              <el-button
                slot="reference"
                circle
                :type="getStatus(profile.SmevIdentificatedStatus).type"
              >
                <el-icon :class="`user-info__status-icon ${getStatus(profile.SmevIdentificatedStatus).icon}`" />
              </el-button>
            </el-popover>
          </div>
        </div>
        <div class="user-info__name">
          <span class="user-info__name-item">{{ profile.Surname }}</span>
          <span class="user-info__name-item">{{
            profile.FirstName ? profile.FirstName : wmid
          }}</span>
        </div>
      </div>

      <div class="user-info__list-info">
        <div class="user-info__list-info-item">
          <div class="user-info__list-info-label">
            <div class="user-info__list-info-icon">
              <el-icon class="el-icon-phone-outline" />
            </div>
            Телефон
          </div>
          <div class="user-info__list-info-value">
            {{ profile.PhoneNumber ? profile.PhoneNumber : '-' }}
          </div>
        </div>
        <div class="user-info__list-info-item">
          <div class="user-info__list-info-label">
            <div class="user-info__list-info-icon">
              <el-icon class="el-icon-user" />
            </div>
            wmid
          </div>
          <div class="user-info__list-info-value">{{ wmid }}</div>
        </div>
      </div>
      <div class="user-info__btn-passport">
        <el-button :loading="loadingDataIframe" @click="handlePassportData"
          >Мои личные данные</el-button
        >
      </div>
      <div class="user-info__activity">
        <div class="user-info__result result">
          <div class="result__icon-wrap">
            <el-icon class="result__icon el-icon-check"></el-icon>
          </div>
          <div class="result__title">
            Успешные сделки
          </div>
          <div class="result__count">
            12
          </div>
        </div>

        <div class="user-info__result result">
          <div class="result__icon-wrap">
            <el-icon class="result__icon el-icon-warning-outline"></el-icon>
          </div>
          <div class="result__title">
            Спорные сделки
          </div>
          <div class="result__count">
            0
          </div>
        </div>

        <div class="user-info__result result">
          <div class="result__icon-wrap">
            <el-icon class="result__icon el-icon-goods" />
          </div>
          <div class="result__title">
            Общая сумма сделок
          </div>
          <div class="result__count">
            {{ '123650' | toThousandFilter }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar/index';
import { mapActions, mapGetters, mapState } from 'vuex';
import openWindow from '@/utils/open-window';

export default {
  name: 'UserShortInfo',
  components: { UserAvatar },
  data: () => ({
    loadingDataIframe: false,
    shortInfo: {
      icon: 'el-icon-phone-outline',
      label: 'Телефон',
    },
  }),
  computed: {
    ...mapGetters(['device', 'wmid']),
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
    ...mapState({
      device: state => state.app.device,
      isLoadedProfile: state => state.profile.isLoaded,
    }),
  },

  methods: {
    ...mapActions('profile', ['getPassportDataLink']),
    async handlePassportData() {
      this.loadingDataIframe = true;
      const url = await this.getPassportDataLink();
      this.loadingDataIframe = false;
      openWindow(url, 'Escrow Merchant личные данные');
    },

    getStatus(status) {
      let statusNumber = Number(status);

      if (statusNumber === 100) {
        return {
          title: 'Данные подтверждены',
          icon: 'el-icon-success',
          type: 'success',
        };
      } else if (statusNumber < 100) {
        return {
          title: 'Выполняется проверка данных',
          icon: 'el-icon-warning',
          type: 'warning',
        };
      } else if (statusNumber === 501) {
        return {
          title: 'Данные не подтвердились (проверьте корректность данных и обновите их, либо обратитесь в поддержку). Выплаты на карты невозможны без заполнения ваших данных',
          icon: 'el-icon-error',
          type: 'danger',
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.el-button.is-circle {
  padding: 2px;
}
.user-column {
  //min-height: calc(100vh - 90px);
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 24px 0 0;

  @media (max-width: $mq-tablet-vertical) {
    min-height: auto;
  }
}
.user-info {
  display: flex;
  justify-content: center;
  flex-direction: column;

  &__avatar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 24px;
    width: 100px;
    height: 100px;
  }

  &__status {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }

  &__status-icon  {
    font-size: 24px;
    color: #fff;
  }

  &__name {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 24px;
    text-align: center;
  }

  &__name-item {
    display: block;
    font-size: 22px;
    font-weight: 600;

    @media (max-width: $mq-mobile) {
      font-size: 18px;
    }

    &:not(:last-child) {
      margin-right: 5px;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 40px;
  }

  &__list-info {
    width: 100%;
    padding-bottom: 15px;
    padding-left: 24px;
    padding-right: 24px;
  }

  &__list-info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &__list-info-icon {
    margin-right: 8px;
  }

  &__list-info-label {
    width: 120px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    color: #7394b3;
    flex-shrink: 0;
  }

  &__list-info-value {
    width: 100%;
    color: #404e67;
    font-weight: 600;
  }

  &__result {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  &__activity {
    background-color: #f5f7fa;
    padding: 24px;
  }

  &__btn-passport {
    display: flex;
    justify-content: center;
    padding: 0 10px;
    margin-bottom: 20px;
  }
}

.result {
  display: flex;
  align-items: center;

  &__icon {
    font-size: 16px;
  }

  &__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    overflow: hidden;
    margin-right: 10px;
  }

  &__title {
    font-size: 15px;
    color: #606266;
  }

  &__count {
    margin-left: auto;
    font-weight: 600;
  }
}
</style>
