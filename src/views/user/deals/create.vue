<template>
  <div class="page-container">
    <el-card class="box-card">
      <div slot="header">
        <h2>Создание предложения</h2>
      </div>
      <el-form
        :model="model"
        :rules="rules"
        label-position="top"
        class="form-add-entity"
        ref="model"
        label-width="120px"
      >
        <el-row>
          <el-col type="flex" :xs="24" :sm="22" :md="22">
            <el-form-item label="Описание товара или услуги" prop="name">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                maxlength="320"
                show-word-limit
                v-model="model.name"
                placeholder="Введите описание..."
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col type="flex" :xs="24" :sm="12" :md="11">
            <el-form-item label="Сумма" prop="amount">
              <el-input placeholder="Введите сумму" v-model="model.amount">
                <template slot="append">
                  <CurrencyRuble />
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :xs="24" :md="12">
            <div class="radio-paymethod-group">
              <span class="radio-paymethod-group__heading"
                >Способы поступления денег</span
              >
              <div class="radio-paymethod-group__item paymethod-radio">
                <input
                  v-model="paymethodType"
                  value="Cards"
                  class="paymethod-radio__input"
                  name="paymethodType"
                  type="radio"
                  id="paymethod_1"
                  checked
                />
                <label class="paymethod-radio__name" for="paymethod_1">
                  <span class="paymethod-radio__logo">
                    <CreditCardBlackLogo
                      class="paymethod-radio__icon paymethod-radio__icon--cards"
                    />
                  </span>
                  <span class="paymethod-radio__name-title">
                    На банковскую карту
                  </span>
                  <span class="paymethod-radio__name-text">
                    Visa, MasterCard, Maestro, Mir</span
                  >
                </label>
              </div>
              <div class="radio-paymethod-group__item paymethod-radio">
                <input
                  v-model="paymethodType"
                  class="paymethod-radio__input"
                  value="WebMoney"
                  name="paymethodType"
                  type="radio"
                  id="paymethod_2"
                />
                <label class="paymethod-radio__name" for="paymethod_2">
                  <span class="paymethod-radio__logo">
                    <WebmoneyLogo
                      class="paymethod-radio__icon paymethod-radio__icon--webmoney"
                    />
                  </span>
                  <span class="paymethod-radio__name-title"
                    >На WebMoney кошелёк</span
                  >
                  <span class="paymethod-radio__name-text"> P - кошелёк</span>
                </label>
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :md="12">
            <el-form-item
              v-if="currentPayMethods.length >= 0"
              :label="paymentSelectLabel"
              prop="paymethod"
            >
              <el-select
                v-model="model.paymethod"
                placeholder="Выбрать из списка"
              >
                <el-option
                  v-for="item in currentPayMethods"
                  :key="item.Id"
                  :label="item.Purse"
                  :value="item.Id"
                >
                  <select-option :paymethod="item" />
                </el-option>
                <el-option
                  value="new"
                  :label="titleOptionAddPayMethod"
                  class="form-add-entity__new-option"
                  @click.native="addNewPaymethodDialog = true"
                >
                  <span class="form-add-entity__new-option-icon">
                    <el-icon class="el-icon-bank-card"></el-icon>
                  </span>
                  <span class="form-add-entity__new-option-title">
                    {{ titleOptionAddPayMethod }}</span
                  >
                </el-option>
              </el-select>
            </el-form-item>

            <selected-paymethod
              v-if="this.model.paymethod !== 'new' && this.model.paymethod"
              :paymethod="currentPayMethod"
            />
          </el-col>
        </el-row>

        <div class="form-add-entity__actions">
          <el-tooltip
            class="item"
            effect="dark"
            content="Очистить форму"
            placement="right-start"
          >
            <el-button
              @click="resetForm('model')"
              icon="el-icon-refresh-left"
            ></el-button>
          </el-tooltip>

          <el-button type="success" @click="submitForm('model')"
            >Создать</el-button
          >
        </div>
      </el-form>
    </el-card>

    <dialog-add-pay-method
      :isActive="addNewPaymethodDialog"
      v-on:close:dialog="closeDialogAddNewPayMethod"
    />
  </div>
</template>

<script>
import DialogAddPayMethod from '@/components/DialogAddPayMethod';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import CreditCardBlackLogo from '../../../../public/creditCardBlack.svg';
import SelectedPaymethod from './components/SelectedPaymethod';
import CurrencyRuble from './components/CurrencyRuble';
import { SelectOption } from './components';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    DialogAddPayMethod,
    CreditCardBlackLogo,
    WebmoneyLogo,
    CurrencyRuble,
    SelectedPaymethod,
    SelectOption,
  },
  data() {
    return {
      creditCard: null,
      addNewPaymethodDialog: false,
      paymethodType: 'WebMoney',
      paymentSelectLabel: 'Выберите кошелёк',

      model: {
        name: '',
        paymethod: null,
        amount: null,
      },

      rules: {
        name: [
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
        amount: [
          {
            required: true,
            message: 'Вам нужно заполнить это поле',
            trigger: 'blur',
          },
        ],
        paymethod: [
          {
            required: true,
            message: 'Вам нужно выбрать',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  watch: {
    paymethodType(newVal) {
      if (newVal === 'Cards') {
        this.paymentSelectLabel = 'Выберите карту';
      }

      if (newVal === 'WebMoney') {
        this.paymentSelectLabel = 'Выберите кошелёк';
      }

      this.$set(this.model, 'paymethod', null);
    },
  },

  computed: {
    ...mapState({
      device: state => state.app.device,
    }),
    ...mapGetters({
      payMethods: 'profile/getPayMethodsOfType',
    }),

    currentPayMethods() {
      return this.payMethods(this.paymethodType);
    },

    currentPayMethod() {
      return this.currentPayMethods.find(x => x.Id === +this.model.paymethod);
    },

    titleOptionAddPayMethod() {
      return this.paymethodType === 'Cards' ? 'Новая карта' : 'Новый кошелёк';
    },
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    closeDialogAddNewPayMethod() {
      this.$set(this.model, 'paymethod', null);
      this.addNewPaymethodDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.box-card {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}

.el-card__header {
  background-color: #ebf5ff;
}

.form-add-entity {
  &__payments {
    margin-bottom: 26px;
    display: flex;
    flex-wrap: wrap;
  }
  &__add-payment {
    margin-left: 10px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 30px;
  }

  &__new-option-title {
    font-size: 14px;
    color: #5a5e66;
  }
  &__new-option-icon {
    font-size: 20px;
    color: #999;
    margin-right: 5px;
    margin-top: -2px;
    display: inline-block;
    vertical-align: middle;
  }

  @media (max-width: $mq-mobile) {
    .el-select {
      width: 100%;
    }
  }
}

// custom radio

.radio-paymethod-group {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  &__item {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  &__heading {
    text-align: left;
    padding: 0 0 10px;
    align-self: flex-start;
    font-size: 14px;
    color: #606266;
  }

  @media (max-width: $mq-tablet-vertical) {
    margin-bottom: 20px;
  }
}

.paymethod-radio {
  width: 100%;
  max-width: 400px;

  &__input {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;

    &:checked ~ .paymethod-radio__name {
      background-color: #409eff;
      //background-color: rgba(#409eff, 0.25);
      //color: #000;
      color: #fff;

      .paymethod-radio__icon {
        path {
          fill: #fff;
        }
      }
    }
  }

  &__name {
    display: flex;
    position: relative;
    background-color: transparent;
    height: 80px;
    padding: 0 20px 0 35px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-weight: 400;
    color: #999;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    border: 1px solid #dcdfe6;

    &:hover {
      background-color: rgba(#409eff, 0.1);
      color: #000;

      .paymethod-radio__icon {
        path {
          fill: #036cb5;
        }
      }
    }
  }

  &__name-text {
    font-size: 0.75rem;
  }

  &__name-title {
    font-size: 1rem;
  }

  &__logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    width: 25px;
  }

  &__icon {
    width: 30px;

    @media (max-width: $mq-mobile) {
      width: 25px;
    }

    @media (max-width: $mq-iphone5) {
      width: 15px;
    }

    &--cards {
      width: 33px;
      fill: #999;

      @media (max-width: $mq-mobile) {
        width: 25px;
      }

      @media (max-width: $mq-iphone5) {
        width: 15px;
      }
    }
    &--webmoney {
      path {
        fill: #999;
      }
    }
  }
}

.el-radio-button-inner {
  height: 80px;
  padding: 0 20px;
  border-radius: 40px;
  margin: 15px 0;
}
</style>
