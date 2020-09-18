<template>
  <div class="ui-template">
    <div class="ui-template__header">
      {{ item.Name | uppercaseFirst }}
    </div>

    <div class="ui-template__icon-wrap">
      <el-icon class="el-icon-star-off ui-template__icon" />
    </div>

    <div class="ui-template__actions">
      <div class="ui-template__btn ui-template__btn--full">
        <el-button
          type="primary"
          plain
          @click="handleCreateContract(item.Contract)"
          >Создать предложение</el-button
        >
      </div>
      <div class="ui-template__btn">
        <el-button
          type="success"
          icon="el-icon-view"
          circle
          plain
          @click="handleViewTemplate(item.Contract)"
        />
      </div>
      <el-popconfirm
        confirm-button-text="Подтвердить"
        cancel-button-text="Отмена"
        placement="top"
        class="payment-card__btn-popconfirm"
        :title="`Удалить ${item.Name} ?`"
        @onConfirm="handleDeleteTemplate(item.Id)"
      >
        <div slot="reference" class="ui-template__btn">
          <el-button
            type="danger"
            icon="el-icon-delete"
            :loading="deleting"
            circle
            plain
          />
        </div>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    deleting: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleViewTemplate(contract) {
      this.$emit('view-contract', contract);
    },

    handleDeleteTemplate(id) {
      this.$emit('delete-contract', id);
    },

    handleCreateContract(contract) {
      this.$emit('create-contract', contract);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.ui-template {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 200px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  @media (max-width: $mq-mobile) {
    max-width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background-color: #94afd1;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    user-select: none;
  }

  &__header {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    padding: 20px 10px 0;
    flex: 1;
  }

  &__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    opacity: 0.2;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
  }

  &__icon {
    font-size: 60px;
    color: #99a9bf;
    text-align: center;
  }

  &__actions {
    display: flex;
    position: relative;
    z-index: 2;
  }

  &__btn {
    button {
      border-radius: 0;
      border-color: #ecf5ff;
    }

    &--full {
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
}
</style>
