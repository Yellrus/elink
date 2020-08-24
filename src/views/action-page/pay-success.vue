<template>
  <div class="page-action">
    <loading-data v-if="loading" />
    <div
      v-if="!loading && dealId"
      class="page-action__box-card page-action__box-card--success pay"
    >
      <div class="pay__icon-wrap">
        <el-icon class="pay__icon pay__icon--success el-icon-success" />
      </div>
      <h1 class="pay__title page-action__title">Успешная оплата!</h1>
      <h3 class="pay__subtitle">Ваша оплата была произведена успешно</h3>

      <div class="pay__info">
        <div class="pay__info-name">
          {{ deal.Contract.Name | uppercaseFirst }}
        </div>
        <div class="pay__info-desc">
          {{ deal.Contract.Description | uppercaseFirst }}
        </div>
        <div class="pay__info-amount">
          {{ deal.Contract.Amount | toThousandFilter }}
          <span class="pay__currency">₽</span>
        </div>
      </div>

      <p class="pay__claim-text">
        При возникновении спорной ситуации до <br /><span
          class="pay__claim-date"
          >{{ deal.ClosingAt | formatDateDayMonth }}
          {{ deal.ClosingAt | formatDateOnlyYear }}</span
        >
        по данной покупке Вы можете отправить претензию по ссылке:
      </p>

      <div class="pay__claim-link">
        <el-input :value="url" readonly class="pay__claim-input" />
        <el-button
          v-clipboard:copy="url"
          v-clipboard:success="clipboardSuccess"
          type="success"
          icon="el-icon-document-copy"
          class="pay__btn-copy"
          plain
        >
          <span>Скопировать ссылку</span>
        </el-button>
      </div>

      <template v-if="!emailSend">
        <p class="pay__claim-text pay__claim-text--email">
          Для обратной связи просим оставить email
        </p>
        <el-form ref="ruleForm" :model="model" :rules="rules">
          <el-form-item prop="email">
            <el-input v-model="model.email" placeholder="Введите email">
              <template slot="prepend"
                ><el-icon class="el-icon-message"
              /></template>
            </el-input>
          </el-form-item>

          <el-button
            type="primary"
            :loading="submittingEmail"
            @click="onSubmit('ruleForm')"
          >
            Отправить email
          </el-button>
        </el-form>
      </template>
    </div>
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard';
import LoadingData from '@/components/LoadingData/index';
import { validEmail } from '@/utils/validate';
import { mapActions } from 'vuex';
import { sendClaimLink } from '@/api/deals';
import { Message } from 'element-ui';

export default {
  name: 'PaySuccess',
  components: { LoadingData },
  directives: {
    clipboard,
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value && !validEmail(value)) {
        return callback(new Error('Вам нужно указать корректный email'));
      }
      callback();
    };
    return {
      loading: false,
      emailSend: false,
      submittingEmail: false,
      dealId: null,
      deal: null,
      model: {
        email: null,
      },
      rules: {
        email: [
          {
            validator: validateEmail,
            trigger: 'blur',
          },
        ],
      },
    };
  },

  computed: {
    url() {
      return (
        this.deal.DisputeGuid &&
        `${location.host}/c/${this.deal.DisputeGuid}`
      );
    },
  },

  created() {
    this.dealId = this.$route.query.dealId;
    if (!this.dealId) {
      this.$router.replace('404');
      return;
    }
    this.fetchDeal();
  },

  methods: {
    ...mapActions('deal', ['getDeal']),

    fetchDeal() {
      this.loading = true;
      let dealId = this.dealId;
      this.getDeal(dealId)
        .then(deal => {
          this.deal = deal;
        })
        .finally(() => (this.loading = false));
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;

        const data = {
          id: this.deal.Id,
          email: this.model.email,
        };

        if (!this.model.email) {
          this.$message({
            message: 'Для отправки нужно ввести email',
            type: 'warning',
            duration: 2000,
          });
          return;
        }

        this.submittingEmail = true;

        sendClaimLink(data)
          .then(() => {
            this.$message({
              message: 'Email успешно отправлен!',
              type: 'success',
              duration: 2000,
            });

            this.emailSend = true;
          })
          .catch(error => {
            Message({
              message: error.Description || error.Error || 'Error',
              type: 'error',
              duration: 3 * 1000,
            });
          })
          .finally(() => (this.submittingEmail = false));
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    clipboardSuccess() {
      this.$message({
        message: 'Ссылка на претензию скопирована!',
        type: 'success',
        duration: 1500,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/page-action.scss';

.pay {
  &__info {
    background-color: #eef4ff;
    margin: 0 -25px 15px;
    padding: 16px 25px 10px;

    @media (max-width: $mq-mobile) {
      margin: 0 -15px 25px;
    }
  }

  &__info-name,
  &__info-amount {
    font-weight: 600;
  }

  &__info-amount {
    font-size: 26px;
  }

  &__info-desc {
    font-size: 14px;
    margin-bottom: 5px;
  }

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

  &__title {
    margin-bottom: 0;
  }

  &__subtitle {
    font-size: 16px;
    text-align: center;
    color: #070707;
    margin-bottom: 20px;
  }

  &__claim-text {
    color: #444444;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 15px;

    &--email {
      font-size: 14px;
    }
  }

  &__claim-date {
    font-weight: 600;
  }

  &__claim-link {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  &__claim-input {
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

  &__currency {
    font-weight: 400;
  }

  &__btn-copy {
    margin-top: 4px;
  }
}
</style>
