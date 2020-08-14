<template>
  <div v-if="isActive" class="payment-add-btn" @click="() => toggleDialogPaymethod(true)">
    <span class="payment-add-btn__item">
      <el-icon class="el-icon-plus"></el-icon>
    </span>
    <span class="payment-add-btn__title">Добавить новую карту</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PaymentAddBtn',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapActions('profile', ['toggleDialogPaymethod']),
  },
};
</script>

<style lang="scss" scoped>
.payment-add-btn {
  position: relative;
  width: 210px;
  min-height: 112px;
  background-color: #fff;
  box-shadow: 1px 6px 15px 3px hsl(0deg 0% 79% / 20%);
  border-radius: 6px;
  padding-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.18s ease-in-out;
  cursor: pointer;
  will-change: transform;

  &:hover {
    box-shadow: 1px 6px 15px 10px hsl(0deg 0% 79% / 20%);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &__item {
    background-color: #abadbc;
    border-radius: 6px;
    padding: 7px 20px;
    color: #fff;
    font-size: 13px;
    box-shadow: 10px 9px 1px 1px #f6f7f7;
    margin-top: -5px;
    margin-left: -8px;
  }

  &__title {
    font-size: 12px;
    color: #97a8be;
    text-align: center;
    position: absolute;
    bottom: 11px;
  }
}
</style>
