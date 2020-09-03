<template>
  <div class="page-action ">
    <div class="page-action__box-card page-action__box-card--error pay">
      <div class="pay__icon-wrap">
        <el-icon class="el-icon-error pay__icon pay__icon--error" />
      </div>
      <h1 class="pay__title page-action__title">
        Возникли проблемы с платежом.
      </h1>
      <span class="pay__subtitle">Для уточнения обратитесь к продавцу.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayFailedFundsTransferred',
};
</script>

<style lang="scss" scoped>
@import '~@/styles/page-action.scss';

.pay {
  &__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  &__icon {
    &--error {
      color: $pink;
      font-size: 100px;
    }
  }
  &__subtitle {
    display: block;
    text-align: center;
  }
}
</style>
