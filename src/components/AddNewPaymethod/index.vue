<template>
  <el-dialog
    title="Добавление банковской карты"
    :destroy-on-close="true"
    :visible="dialogAddPaymethod"
    width="100%"
    :style="{ maxWidth: '400px' }"
    :close-on-click-modal="false"
    class="dialog"
    center
    @close="closeDialog"
  >
    <form-add-card />
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FormAddCard from '@/components/FormAddCard';

export default {
  components: {
    FormAddCard,
  },
  props: {
    activeTab: {
      type: String,
      default: 'Cards',
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dialogAddPaymethod: state => state.profile.dialogAddPaymethod,
    }),
  },

  methods: {
    ...mapActions('profile', ['toggleDialogPaymethod']),

    closeDialog() {
      this.toggleDialogPaymethod(false);
      this.$emit('close:dialog');
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  margin: 0 auto;
}
</style>
