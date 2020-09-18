<template>
  <el-dropdown trigger="click" :hide-on-click="false" >
    <span class="el-dropdown-link">
      <el-button
        type="primary"
        icon="el-icon-more el-icon-more--verticale"
        size="small"
        circle
        plain
      />
    </span>
    <el-dropdown-menu slot="dropdown" class="menu-actions">
      <slot name="dropdownItem" class="menu-actions__item" />
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'MenuActions',
};
</script>

<style lang="scss">
.el-icon-more {
  &--verticale {
    transform: rotate(90deg);
  }
}

.menu-actions {
  padding: 0;

  .el-dropdown {
    width: 100%;
  }
  .el-button {
    width: 100%;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 0;
  }

  .el-dropdown-menu__item {
    padding: 0;
    line-height: 1.5;
  }
  &__item {
    width: 100%;
  }

  &__btn-icon {
    width: 9px;
    margin-right: 7px;
    margin-left: 2px;
    margin-bottom: 1px;
  }
}
</style>
