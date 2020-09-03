<template>
  <div class="created-deal">
    <div class="created-deal__content">
      <el-popover
        placement="top-start"
        transition="el-zoom-in-bottom"
        trigger="hover"
      >
        Создать новое предложение
        <div slot="reference" class="created-deal__close-wrap">
          <el-button class="created-deal__close" type="primary" icon="el-icon-refresh-left" size="mini" circle plain @click="closeSuccessCard" />
        </div>
      </el-popover>
      <div class="created-deal__header">
        <h2 class="created-deal__heading">Предложение создано!</h2>
        <div class="created-deal__img">
          <el-icon class="created-deal__icon el-icon-success"></el-icon>
        </div>
        <p class="created-deal__desc">
          Предложение <br />
          <router-link :to="`/contracts/${deal.Id}`">
            <el-link
              class="created-deal__deal-name"
              type="primary"
              style="margin-left: 2px;"
              >{{ deal.Name }}</el-link
            >
          </router-link>
        </p>
        <p class="created-deal__desc">
          будет активно до
          <span class="created-deal__deal-name">{{ deal.Duration | humansDateFormat }}</span>
        </p>
      </div>

      <div class="created-deal__body">
        <div class="created-deal__created-link">
          <el-input :value="url" readonly class="created-deal__input">
            <template slot="prepend">
              <el-icon class="created-deal__created-link-icon el-icon-link" />
            </template>
          </el-input>
          <el-button
            v-clipboard:copy="url"
            v-clipboard:success="clipboardSuccess"
            type="primary"
            icon="el-icon-document-copy"
            class="created-deal__btn-copy"
          >
            Копировать
          </el-button>
        </div>
      </div>

      <div class="created-deal__footer">
        <span class="created-deal__footer-title"
          >Поделитесь ссылкой на данное предложение:</span
        >
        <div class="created-deal__socials">
          <social-sharing :sharing="sharing" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard';
import SocialSharing from '@/components/SocialSharing';

export default {
  components: { SocialSharing },
  directives: {
    clipboard,
  },
  props: {
    deal: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    url() {
      return this.deal.Id
        ? `${location.host}/contract/${this.deal.Id}`
        : `${location.host}/contracts/create`;
    },

    sharing() {
      return {
        url: this.url,
        title: this.deal.Name,
        description: this.deal.Description,
      };
    },
  },

  methods: {
    clipboardSuccess() {
      this.$message({
        message: 'Успешно скопирован!',
        type: 'success',
        duration: 1500,
      });
    },

    closeSuccessCard() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.created-deal {
  background-size: cover;
  background-color: #eef4ff;
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 100%;
  min-height: 600px;
  text-align: center;

  &::after {
    content: '';
    display: block;
    width: 200%;
    height: 0;
    padding-top: 200%;
    border-radius: 100%;
    background-color: #ffffff;
    position: absolute;
    top: 74%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 40px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 30px 10px 25px 10px;
    position: relative;
    height: 100%;
    z-index: 2;
  }

  &__heading {
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 500;
  }

  &__created-link {
    display: flex;
    padding: 30px;
    box-shadow: 10px 3px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    background-color: #fff;

    @media (max-width: $mq-mobile) {
      flex-direction: column;
    }
  }

  &__created-link-icon {
    font-size: 20px;
  }

  &__img {
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 10px 3px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 7px 9px;
    margin-bottom: 20px;
  }

  &__icon {
    color: #21c274;
    font-size: 80px;
  }

  &__input {
    width: 100%;
    input {
      border-radius: 0;
      border-right: none;
      font-weight: 600;
    }

    @media (max-width: $mq-mobile) {
      margin-bottom: 8px;
      border-right: 1px solid #dcdfe6;
    }
  }

  &__desc {
    margin: 0;
    font-size: 18px;
    padding: 0 10px;

    a {
      font-size: 24px;
    }

    @media (max-width: $mq-mobile) {
      max-width: 100%;
    }
  }

  &__deal-name {
    font-weight: 600;
  }

  &__body {
    width: 90%;
    margin-bottom: 125px;

    @media (max-width: $mq-mobile) {
      width: 100%;
      margin-bottom: 135px;
    }
  }

  &__footer-title {
    display: block;
    text-align: center;
    font-size: 14px;
    margin-bottom: 14px;
  }

  &__btn-copy {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    z-index: 3;
  }

  &__deals {
    width: 100%;
    max-width: 355px;
    padding: 0 7px;
  }

  &__close-wrap {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 3;
  }
}
</style>
