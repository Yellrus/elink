<template>
  <div class="user-column">
    <div class="user-info user-info--short">
      <div v-if="device !== 'mobile'" class="user-info__header">
        <div class="user-info__avatar">
          <user-avatar :size="100" />
          <span
            v-if="device !== 'mobile' && isLoadedProfile"
            class="user-info__name"
            >{{ profile.FirstName ? profile.FirstName : wmid }}</span
          >
        </div>
      </div>

      <div class="user-info__list-info">
        <div class="user-info__list-info-item">
          <div class="user-info__list-info-label">
            <div class="user-info__list-info-icon">
              <el-icon class="el-icon-phone-outline"></el-icon>
            </div>
            Телефон
          </div>
          <div class="user-info__list-info-value">8598561651</div>
        </div>
        <div class="user-info__list-info-item">
          <div class="user-info__list-info-label">
            <div class="user-info__list-info-icon">
              <el-icon class="el-icon-message"></el-icon>
            </div>
            Email
          </div>
          <div class="user-info__list-info-value">test@gmail.com</div>
        </div>

        <div class="user-info__list-info-item">
          <div class="user-info__list-info-label">
            <div class="user-info__list-info-icon">
              <el-icon class="el-icon-lock"></el-icon>
            </div>
            Пароль
          </div>
          <div class="user-info__list-info-value">
            &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
          </div>
        </div>
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
            435
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
            <el-icon class="result__icon el-icon-goods"></el-icon>
          </div>
          <div class="result__title">
            Общая сумма сделок
          </div>
          <div class="result__count">
            123650
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '../../../components/UserAvatar/index';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'UserShortInfo',
  components: { UserAvatar },
  data: () => ({
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
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 24px;
  }

  &__name {
    display: block;
    font-size: 22px;
    font-weight: 600;
    margin-top: 10px;
  }

  &__header {
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
    background-color: #F5F7FA;
    padding: 24px;
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
