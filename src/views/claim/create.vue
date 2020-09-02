<template>
  <div class="page-action page-action--claim-create">
    <loading-data v-if="loading" />
    <div v-if="!loading" class="pay page-action__box-card">
      <loading-data v-if="submitting" />
      <h2 class="page-action__title">{{ title }}</h2>
      <div v-if="createDone" class="dispute-create__icon-wrap">
        <el-icon
          class="dispute-create__icon dispute-create__icon--success el-icon-success"
        />
      </div>
      <div class="dispute-create">
        <div class="dispute-create__info">
          <span class="dispute-create__info-name">{{
            disputeDeal.Contract.Name | uppercaseFirst
          }}</span>
          <span class="dispute-create__info-desc">{{
            disputeDeal.Contract.Description | uppercaseFirst
          }}</span>
          <span class="dispute-create__info-amount"
            >{{ disputeDeal.Contract.Amount | toThousandFilter }}
            <span class="dispute-create__currency">₽</span></span
          >
        </div>
      </div>

      <template v-if="!createDone">
        <el-form
          v-if="+disputeDeal.IsDispute === 0"
          ref="claimCreate"
          :model="model"
          :rules="rules"
          :disabled="submitting"
          label-position="top"
          class="form-add-entity"
          label-width="120px"
        >
          <el-row>
            <el-col type="flex" :span="24">
              <el-form-item label="Email" prop="email">
                <el-input v-model="model.email" placeholder="Введите email">
                  <template slot="append"
                    ><el-icon class="el-icon-message"
                  /></template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col type="flex" :span="24">
              <el-form-item label="Сообщение" prop="message">
                <el-input
                  v-model="model.message"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 8 }"
                  maxlength="140"
                  show-word-limit
                  placeholder="Введите сообщение..."
                />
              </el-form-item>
            </el-col>
          </el-row>

          <div class="page-action__btn-actions">
            <el-tooltip
              class="item"
              effect="dark"
              content="Очистить форму"
              placement="right-start"
            >
              <el-button
                icon="el-icon-refresh-left"
                @click="resetForm('claimCreate')"
              />
            </el-tooltip>

            <el-button
              type="primary"
              :loading="submitting"
              @click="onSubmit('claimCreate')"
              >Создать заявку</el-button
            >
          </div>
        </el-form>
        <template v-else-if="+disputeDeal.IsDispute === 1">
          Заявка на арбитраж по данной сделке уже была подана!
        </template>
      </template>

      <template v-if="checkClosingAtDate(disputeDeal.ClosingAt)">
        Время для создания претензии истекло
      </template>
    </div>
  </div>
</template>

<script>
import LoadingData from '@/components/LoadingData/index';
import { validEmail } from '@/utils/validate';
import { mapActions } from 'vuex';
import dayjs from 'dayjs';
export default {
  name: 'ClaimCreate',
  components: { LoadingData },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value && !validEmail(value)) {
        return callback(new Error('Вам нужно указать корректный email'));
      }
      callback();
    };
    return {
      loading: false,
      createDone: false,
      submitting: false,
      disputeDeal: null,
      id: null,
      model: {
        message: '',
        email: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Вам нужно указать email',
            trigger: 'blur',
          },
          {
            validator: validateEmail,
            trigger: 'blur',
          },
        ],
        message: [
          {
            required: true,
            message: 'Вам нужно заполнить сообщение',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 140,
            message: 'Кол-во символов от 3 до 140',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  computed: {
    title() {
      if (+this.disputeDeal.IsDispute === 1) {
        return 'Ваша заявка уже создана!';
      } else if (this.createDone) {
        return 'Заявка на арбитраж подана!';
      }
      return 'Ваша заявка';
    },
  },

  created() {
    this.id = this.$route.params.id;

    this.fetchDisputeDeal();
  },

  methods: {
    ...mapActions('deal', ['createClaim', 'getByDisputeDeal']),

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;

        this.submitting = true;

        this.createClaim({
          ...this.model,
          disputeGuid: this.disputeDeal.DisputeGuid,
        })
          .then(() => {
            this.resetForm(formName);
            this.createDone = true;
            this.$message({
              message: 'Заявка на арбитраж успешна отправлена!',
              type: 'success',
              duration: 1500,
            });
          })
          .finally(() => (this.submitting = false));
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    fetchDisputeDeal() {
      this.loading = true;
      this.getByDisputeDeal(this.id)
        .then(disputeDeal => {
          this.disputeDeal = disputeDeal;
          if (this.disputeDeal && this.disputeDeal.Email) {
            this.$set(this.model, 'email', this.disputeDeal.Email);
          }
        })
        .finally(() => (this.loading = false));
    },

    checkClosingAtDate(closingAtDate) {
      const today = dayjs(new Date());
      const pastDate = dayjs(closingAtDate);
      // дата с сервера до сегодняшнего дня
      return pastDate.isBefore(today);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/page-action.scss';

.dispute-create {
  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #eef4ff;
    margin: 0 -25px 25px;
    padding: 10px 25px;

    @media (max-width: $mq-mobile) {
      margin: 0 -15px 25px;
    }
  }

  &__info-name {
    font-size: 20px;
    margin-bottom: 3px;
  }

  &__info-desc {
    font-size: 14px;
    margin-bottom: 5px;
  }

  &__info-amount {
    font-size: 26px;
    font-weight: 600;
  }

  &__currency {
    font-weight: 400;
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
}
</style>
