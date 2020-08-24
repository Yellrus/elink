<template>
  <div class="page-action">
    <div class="page-action__box-card page-action__box-card--success pay">
      <div class="pay__icon-wrap">
        <el-icon class="el-icon-success pay__icon pay__icon--success" />
      </div>
      <h1 class="pay__title page-action__title">Данные успешно сохранены!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Passport',
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
    &--success {
      color: #4caf50;
      font-size: 100px;
    }
  }
}
</style>
