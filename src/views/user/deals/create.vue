<template>
  <div class="page-container">
    <el-card class="box-card">
      <div slot="header" class="box-card__header">
        <div class="box-card__header-icon">
          <el-icon class="el-icon-sell"></el-icon>
        </div>
        <h2>Создание предложения</h2>
      </div>
      <el-form
        v-if="!createDone"
        ref="model"
        :model="model"
        :rules="rules"
        label-position="top"
        class="form-add-entity"
        label-width="120px"
      >
        <el-row>
          <el-col type="flex" :xs="24" :sm="22" :md="22">
            <el-form-item label="Описание товара или услуги" prop="name">
              <el-input
                v-model="model.name"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                maxlength="320"
                show-word-limit
                placeholder="Введите описание..."
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col type="flex" :xs="24" :sm="22" :md="22">
            <el-form-item label="Категория" prop="category">
              <el-select
                v-model="model.category"
                placeholder="Выбрать из списка"
              >
                <template slot="prefix">
                  <el-icon class="el-icon-files"></el-icon>
                </template>
                <el-option
                  v-for="item in categoryList"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col type="flex" :xs="24" :sm="12" :md="11">
            <el-form-item label="Сумма" prop="amount" class="is-required">
              <Money
                v-model.number="model.amount"
                :max="10000000"
                :min="10"
                :fixed="2"
                clearable
              >
                <template slot="append"><CurrencyRuble /></template>
              </Money>
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
                  id="paymethod_1"
                  v-model="paymethodType"
                  value="Cards"
                  class="paymethod-radio__input"
                  name="paymethodType"
                  type="radio"
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
                  id="paymethod_2"
                  v-model="paymethodType"
                  class="paymethod-radio__input"
                  value="WebMoney"
                  name="paymethodType"
                  type="radio"
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
                :no-data-text="'Нет карты/кошелька'"
                :default-first-option="true"
                placeholder="Выбрать из списка"
              >
                <template slot="prefix">
                  <el-icon class="el-icon-wallet"></el-icon>
                </template>
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
                  @click.native="toggleDialogPaymethod(true)"
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
              v-if="model.paymethod !== 'new' && model.paymethod"
              :paymethod="currentPayMethod"
            />
          </el-col>
        </el-row>

        <div class="form-add-entity__footer">
          <p class="form-add-entity__terms">
            Нажимая "Создать предложение" вы принимаете
            <router-link to="/terms" target="_blank" rel="noopener noreferrer">
              <el-link
                type="primary"
                style="margin-left: 2px;"
                @click="termsActive = true"
              >
                пользовательское условие
              </el-link>
            </router-link>

            сервиса
          </p>

          <div class="form-add-entity__actions">
            <el-tooltip
              class="item"
              effect="dark"
              content="Очистить форму"
              placement="right-start"
            >
              <el-button
                icon="el-icon-refresh-left"
                @click="resetForm('model')"
              ></el-button>
            </el-tooltip>

            <el-button type="primary" @click="submitForm('model')"
              >Создать предложение</el-button
            >
          </div>
        </div>
      </el-form>

      <SuccessCreated v-if="createDone" />
    </el-card>

    <AddNewPaymethod
      :active-tab="paymethodType"
      @close:dialog="closeDialogAddNewPayMethod"
    />
  </div>
</template>

<script>
import AddNewPaymethod from '@/components/AddNewPaymethod';
import Money from '@/components/InputMoney';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import CreditCardBlackLogo from '../../../../public/creditCardBlack.svg';
import {
  CurrencyRuble,
  SelectOption,
  SelectedPaymethod,
  SuccessCreated,
} from './components';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Money,
    SuccessCreated,
    AddNewPaymethod,
    CreditCardBlackLogo,
    WebmoneyLogo,
    CurrencyRuble,
    SelectedPaymethod,
    SelectOption,
  },
  data() {
    const validateAmount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Вам нужно указать сумму'));
      } else {
        if (value < 10) {
          callback(new Error('Минимальная сумма 10 руб'));
        }
        callback();
      }
    };
    return {
      createDone: false,
      termsActive: false,
      creditCard: null,
      paymethodType: 'WebMoney',
      paymentSelectLabel: 'Кошелёк',
      categoryList: [
        { Id: 343, Name: 'Первая' },
        { Id: 344, Name: 'Вторая' },
      ],
      model: {
        name: '',
        category: null,
        amount: 0,
        paymethod: null,
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
            validator: validateAmount,
            trigger: 'blur',
          },
        ],
        paymethod: [
          {
            required: true,
            message: 'Вам нужно выбрать',
            trigger: 'change',
          },
        ],
        category: [
          {
            required: true,
            message: 'Вам нужно выбрать',
            trigger: 'change',
          },
        ],
      },
    };
  },

  computed: {
    ...mapState({
      device: state => state.app.device,
      dialogAddPaymethod: state => state.profile.dialogAddPaymethod,
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

  watch: {
    paymethodType(newVal) {
      if (newVal === 'Cards') {
        this.paymentSelectLabel = 'Банковская карта';
      }

      if (newVal === 'WebMoney') {
        this.paymentSelectLabel = 'Кошелёк';
      }

      this.$set(this.model, 'paymethod', null);
    },
  },

  methods: {
    ...mapActions('profile', ['toggleDialogPaymethod']),

    submitForm(formName) {
      this.createDone = true;
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

  &__header {
    display: flex;
    align-items: center;
    h2 {
      font-size: 1.3em;
    }
  }

  &__header-icon {
    font-size: 20px;
    margin-right: 10px;
    padding: 2px 8px;
    border: 1px solid #ebf5ff;
    background-color: #ebf5ff;
    border-radius: 50%;
  }
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

  &__footer {
    margin-top: 40px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  &__terms {
    width: 100%;
    color: #757575;
    font-size: 13px;
    margin-bottom: 20px;
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
      background-color: #25bf79;
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
