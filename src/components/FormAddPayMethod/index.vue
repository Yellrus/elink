<template>
  <el-form
    :model="model"
    :rules="rules"
    label-position="top"
    class="form-add-paymethod"
    ref="model"
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
        prop="paymethod"
        class="credit-card__form-item"
      >
        <el-input
          v-model="model.paymethod"
          :autofocus="true"
          :debounce="200"
          class="credit-card__form-input"
        ></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { fetchCardInfo } from '@/api/paymethod';

export default {
  data() {
    return {
      creditCard: null,
      model: {
        paymethod: null,
      },

      rules: {
        cardNumber: [
          {
            required: true,
            message: 'Вам нужно заполнить это поле',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 100,
            message: 'Кол-во символов от 3 до 100',
            trigger: 'blur',
          },
        ],
        webmoney: [
          {
            required: true,
            message: 'Вам нужно заполнить это поле',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  watch: {
    'model.paymethod'(newValue) {
      if (newValue && newValue.length < 6) {
        return;
      }
      this.fetchDataCardInfo(newValue);
    },
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
  },

  methods: {
    fetchDataCardInfo(query) {
      fetchCardInfo(query)
        .then(data => {
          console.log('response.data', data);

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

          console.log('this.creditCard', this.creditCard);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.credit-card {
  width: 100%;
  background: rgba(230, 230, 230, 0.77);
  padding: 74px 15px 52px;
  border-radius: 8px;
  height: 219px;
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
</style>
