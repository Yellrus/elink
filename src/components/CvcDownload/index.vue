<template>
  <div>
    <el-popover
      placement="top-start"
      transition="el-zoom-in-bottom"
      trigger="hover"
    >
      <span>Выгрузка данных</span>
      <el-button
        slot="reference"
        size="small"
        type="primary"
        class="download-csv"
        :loading="loading"
        @click="handleCvcData"
      >
        <el-icon class="el-icon-download download-csv__icon" />CSV
      </el-button>
    </el-popover>
    <download-csv
      ref="cvcComponent"
      class="visually-hidden"
      :data="items"
      :encoding="'utf-8'"
      :name="`${nameFile}.csv`"
    >
    </download-csv>
  </div>
</template>

<script>
export default {
  name: 'BtnDownloadCsv',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    nameFile: {
      type: String,
      default: 'EscrowMerchant',
    },
    handleApi: {
      type: Function,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isEmptyData() {
      return this.items.length <= 0;
    },
  },

  methods: {
    async handleCvcData() {
      await this.handleApi();
      if (this.isEmptyData) {
        this.$message({
          message: 'Нет данных для экспорта',
          type: 'warning',
          duration: 2000,
        });
        return;
      }
      !this.loading && this.$refs.cvcComponent.$el.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.download-csv {
  &__icon {
    margin-right: 5px;
  }
}
.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  visibility: hidden;
}
</style>
