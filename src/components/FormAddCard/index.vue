<template>
  <el-form
    ref="formAddCard"
    :disabled="submitting"
    :model="model"
    :rules="rules"
    label-position="top"
    class="form-add-card"
    label-width="120px"
  >
    <div class="credit-card" :style="getCreditCardStyle">
      <img
        v-if="getCreditCardInfo && getCreditCardInfo.formBankLogoBigSvg"
        class="credit-card__logo credit-card__logo--bank"
        :src="getCreditCardInfo.formBankLogoBigSvg"
        alt="card bank logo"
      />
      <img
        v-if="getCreditCardInfo && getCreditCardInfo.brandLogoLightSvg"
        class="credit-card__logo credit-card__logo--brand"
        :src="getBrandLogo"
        alt="brand paymenthod logo"
      />
      <el-form-item
        label="Номер карты"
        :class="{
          'input-brand-color': getCreditCardStyle && getCreditCardStyle.color,
        }"
        prop="Purse"
        class="credit-card__form-item"
      >
        <el-input
          ref="cardNumberInput"
          v-model="model.Purse"
          v-mask="'#### #### #### ####'"
          :autofocus="true"
          class="credit-card__form-input"
        />
      </el-form-item>

      <div v-if="!getBrandLogo" class="credit-card__logo-items">
        <div class="credit-card__logo-item">
          <MasterCardLogo />
        </div>
        <div class="credit-card__logo-item">
          <VisaLogo />
        </div>
        <div class="credit-card__logo-item">
          <MirLogo />
        </div>
      </div>
    </div>

    <el-form-item class="form-add-card__actions">
      <el-button
        :loading="submitting"
        type="primary"
        @click="onSubmit('formAddCard')"
        >Добавить</el-button
      >
      <el-button @click="toggleDialogPaymethod(false)">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mask } from 'vue-the-mask';
import cardValid from 'card-validator';
import { fetchCardInfo } from '@/api/paymethod';
import MasterCardLogo from '../../../public/masterCard.svg';
import MirLogo from '../../../public/mir.svg';
import VisaLogo from '../../../public/visa.svg';
import { mapActions } from 'vuex';

export default {
  name: 'FormAddCard',
  directives: { mask },
  components: { MasterCardLogo, MirLogo, VisaLogo },
  data() {
    const validateCardNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Введите номер карты'));
      } else if (value && value.length <= 7) {
        callback(new Error(' '));
      } else {
        let numberValidation = cardValid.number(value.trim());
        if (!numberValidation.isValid) {
          callback(new Error('Неверно указан формат карты'));
        }
        callback();
      }
    };
    return {
      submitting: false,
      creditCard: null,
      model: {
        Purse: null,
        Paymethod: 2,
      },

      rules: {
        Purse: [
          {
            validator: validateCardNumber,
            trigger: 'blur',
          },
        ],
      },
    };
  },

  computed: {
    getCreditCardInfo() {
      return this.creditCard;
    },

    getCreditCardStyle() {
      return (
        this.getCreditCardInfo && {
          backgroundColor: this.getCreditCardInfo.formBackgroundColor,
          color: this.getCreditCardInfo.formTextColor,
        }
      );
    },

    getBrandLogo() {
      if (this.getCreditCardInfo && !this.getCreditCardInfo.bankName) {
        return this.getCreditCardInfo.brandLogoOriginalSvg;
      }
      return this.getCreditCardInfo && this.getCreditCardInfo.brandLogoLightSvg;
    },

    curNumber() {
      return this.model.Purse;
    },
  },

  watch: {
    curNumber(newValue) {
      let str = newValue && newValue.split(' ').join('');
      if (str && str.length < 6) {
        return;
      }

      this.fetchDataCardInfo(str);
    },
  },

  methods: {
    ...mapActions('profile', ['toggleDialogPaymethod', 'addNewPaymethod']),
    fetchDataCardInfo(query) {
      fetchCardInfo(query)
        .then(data => {
          const {
            formBackgroundColor,
            formBankLogoSmallSvg,
            formBankLogoBigSvg,
            brandLogoLightSvg,
            formTextColor,
            brandLogoOriginalSvg,
            bankName,
          } = data;

          this.creditCard = {
            formBackgroundColor,
            formBankLogoSmallSvg,
            formBankLogoBigSvg,
            brandLogoLightSvg,
            formTextColor,
            brandLogoOriginalSvg,
            bankName,
          };


          this.$nextTick(() => {
            this.$refs.cardNumberInput.focus();
          });
          //console.log('this.$refs.cardNumberInput', this.$refs.cardNumberInput)
        })
        .catch(err => {
          console.log(err);
        });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.submitting = true;
        const model = this.model;
        this.addNewPaymethod(model)
          .then(() => {
            this.$notify({
              title: 'Внимание',
              message: 'Привязка успешно выполнена',
              position: 'bottom-right',
              type: 'success',
              duration: 4000,
            });

            this.resetForm(formName);
            this.toggleDialogPaymethod(false);
          })
          .finally(() => (this.submitting = false));
      });
    },
  },
};
</script>

<style lang="scss">
.form-add-card {
  position: relative;
  &__actions {
    margin-top: 20px;
  }
}
.credit-card {
  width: 100%;
  background: #eef2f7;
  padding: 74px 15px 52px;
  border-radius: 8px;
  height: 220px;
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: '';
    left: 58px;
    top: -7px;
    display: block;
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    user-select: none;
    width: 450px;
    height: 450px;
    opacity: 0.2;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }

  &__logo {
    display: block;
    position: absolute;
    font-family: 'object-fit:contain;object-position:0 0';
    object-fit: contain;
    object-position: 0 0;

    &--bank {
      top: 0;
      left: 0;
      width: 100%;
      height: 4.2em;
      padding: 1em;
    }

    &--brand {
      bottom: 16px;
      right: 16px;
      width: 50px;
    }
  }

  &__logo-items {
    display: flex;
    align-items: center;
    opacity: 0.2;

    position: absolute;
    bottom: 23px;
    right: 28px;
  }

  &__logo-item {
    width: 52px;
    svg {
      width: 100%;
      height: 100%;
    }

    &:not(:last-child) {
      margin-right: 7px;
    }
  }

  &__form-item {
    margin-bottom: 0;
    label {
      color: currentColor;
    }
  }

  &__form-input {
    input {
      height: 47px;
      line-height: 47px;
      font-size: 20px;
      font-weight: 500;
    }
  }
}
.el-form-item.is-error.input-brand-color .el-input__inner {
  border-color: #fff;
}
.el-form-item.is-error.input-brand-color {
  .el-form-item__error {
    color: #fff !important;
  }
}
</style>
