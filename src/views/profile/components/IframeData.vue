<template>
  <div>
    <el-dialog
      :title="
        device === 'mobile'
          ? 'Личные данные'
          : 'Редактирование и просмотр личных данных'
      "
      :destroy-on-close="true"
      :visible.sync="dialogIframeData"
      :width="device === 'mobile' ? '90%' : '56%'"
      top="8vh"
      class="dialog iframe-dialog"
      center
      @close="closeDialog"
    >
      <div class="wrap-frame">
        <loading-data v-if="loadingDataIframe" />
        <data-empty v-if="!iframeUrl && !loadingDataIframe">
          <template v-slot:text>
            Произошла ошибка <br />
            Попробуйте снова
          </template>
        </data-empty>
        <iframe :src="iframeUrl" width="100%" height="100%"></iframe>
      </div>
    </el-dialog>

    <el-button :loading="loadingDataIframe" @click="handlePassportData"
      >Мои личные данные</el-button
    >
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DataEmpty from '@/components/DataEmpty';
import LoadingData from '../../../components/LoadingData/index';

export default {
  name: 'IframeData',
  components: { LoadingData, DataEmpty },
  data: () => ({
    loadingDataIframe: false,
    dialogIframeData: false,
    iframeUrl: '',
  }),
  computed: {
    ...mapState({
      device: state => state.app.device,
    }),
  },
  methods: {
    ...mapActions('profile', ['getPassportDataLink']),
    async handlePassportData() {
      this.loadingDataIframe = true;
      this.iframeUrl = await this.getPassportDataLink();
      this.loadingDataIframe = false;
      this.dialogIframeData = true;
    },
    closeDialog() {
      this.$emit('close:dialog');
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.iframe-dialog .el-dialog__body {
  height: 0;
  overflow: hidden;
  padding-top: 60.25%;
  background: white;
  position: relative;

  @media (max-width: $mq-tablet-vertical) {
    padding-top: 135.25%;
  }

  .wrap-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
