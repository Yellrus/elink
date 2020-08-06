<template>
  <el-dialog
    title="Добавление"
    :visible.sync="isActive"
    :before-close="() => closeDialog()"
    width="100%"
    class="dialog dialog--add-paymethod"
    center
  >
    <form-add-pay-method />

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FormAddPayMethod from '@/components/FormAddPayMethod';

export default {
  name: 'DialogAddPayMethod',
  data: () => ({}),
  components: { FormAddPayMethod },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    closeDialog() {
      console.log('close dialog');
      this.$emit('close:dialog');
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  &--add-paymethod {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
