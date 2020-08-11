<template>
  <el-dialog
    title="Прикрепить карту / кошелёк"
    :visible="dialogAddPaymethod"
    width="100%"
    :style="{ maxWidth: '400px' }"
    :close-on-click-modal="false"
    class="dialog"
    center
    @close="closeDialog"
  >
    <el-tabs :value="activeTab" :stretch="true">
      <el-tab-pane label="Банковская карта" name="Cards">
        <form-add-card />
      </el-tab-pane>
      <el-tab-pane label="WebMoney кошелёк" name="WebMoney">
        <form-add-webmoney />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FormAddCard from '@/components/FormAddCard';
import FormAddWebmoney from '@/components/FormAddWebmoney';

export default {
  components: {
    FormAddCard,
    FormAddWebmoney,
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
