<template>
  <div class="page-action ">
    <div class="page-action__box-card page-action__box-card--error pay">
      <div class="pay__icon-wrap">
        <el-icon class="el-icon-error pay__icon pay__icon--error" />
      </div>
      <h1 class="pay__title page-action__title">Оплата не прошла</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayFailed',
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

  &__title {
    padding: 25px 17px;
    border-radius: 20px;
    font-size: 20px;
    font-weight: 400;
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }

  &__icon {
    &--error {
      color: $pink;
      font-size: 100px;
    }
  }
}
</style>
