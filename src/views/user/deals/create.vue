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
            <el-form-item label="Описание товара или услуги" prop="Description">
              <el-input
                v-model="model.Description"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                maxlength="320"
                show-word-limit
                placeholder="Введите описание..."
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col type="flex" :xs="24" :sm="22" :md="12">
            <el-form-item label="Категория" prop="CategoryId">
              <el-select
                v-model="model.CategoryId"
                :loading="dictionaryLoaded"
                placeholder="Выбрать из списка"
              >
                <template slot="prefix">
                  <el-icon class="el-icon-files" />
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

          <el-col type="flex" :xs="24" :sm="22" :md="12">
            <el-form-item label="Кол-во" prop="Count">
              <el-input-number v-model="model.Count" :min="1" :max="100000" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" class="form-add-entity__paymethods">
          <el-col :xs="24" :md="12">
            <div class="radio-paymethod-group">
              <span class="radio-paymethod-group__heading"
                >Выберите платежную систему</span
              >
              <div class="radio-paymethod-group__item paymethod-radio">
                <input
                  id="paymethod_1"
                  v-model="paymethodTypeCards"
                  value="Cards"
                  class="paymethod-radio__input"
                  name="paymethodType"
                  type="checkbox"
                />
                <label class="paymethod-radio__name" for="paymethod_1">
                  <span class="paymethod-radio__logo">
                    <CreditCardBlackLogo
                      class="paymethod-radio__icon paymethod-radio__icon--cards"
                    />
                  </span>
                  <span class="paymethod-radio__name-title">
                    Банковская карта
                  </span>
                  <span class="paymethod-radio__name-text">
                    Visa, MasterCard, Maestro, Мир</span
                  >
                </label>
              </div>
              <div class="radio-paymethod-group__item paymethod-radio">
                <input
                  id="paymethod_2"
                  v-model="paymethodTypeWmp"
                  class="paymethod-radio__input"
                  value="WebMoney"
                  name="paymethodType"
                  type="checkbox"
                />
                <label class="paymethod-radio__name" for="paymethod_2">
                  <span class="paymethod-radio__logo">
                    <WebmoneyLogo
                      class="paymethod-radio__icon paymethod-radio__icon--webmoney"
                    />
                  </span>
                  <span class="paymethod-radio__name-title"
                    >WebMoney кошелёк</span
                  >
                  <span class="paymethod-radio__name-text"> P - кошелёк</span>
                </label>
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :md="12">
            <div class="form-add-entity__select-card">
              <el-form-item
                v-if="paymethodTypeCards"
                :label="'Банковская карта'"
                prop="CardPurseId"
              >
                <el-select
                  v-model="model.CardPurseId"
                  :no-data-text="'Нет карты'"
                  placeholder="Выбрать из списка"
                >
                  <template slot="prefix">
                    <el-icon class="el-icon-wallet"></el-icon>
                  </template>
                  <el-option
                    v-for="item in paymethods"
                    :key="item.Id"
                    :label="item.Purse"
                    :value="item.Guid"
                  >
                    <select-option :paymethod="item" />
                  </el-option>

                  <el-option
                    value="new"
                    label="Банковская карта"
                    class="form-add-entity__new-option"
                    @click.native="toggleDialogPaymethod(true)"
                  >
                    <span class="form-add-entity__new-option-icon">
                      <el-icon class="el-icon-bank-card" />
                    </span>
                    <span class="form-add-entity__new-option-title"
                      >Добавить новую карту</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="form-add-entity__selected-items">
              <div
                v-if="model.WmpPurseId || model.CardPurseId"
                class="form-add-entity__selected-heading"
              >
                Вы указали способы оплаты
              </div>
              <div class="form-add-entity__selected-item">
                <payment-card
                  v-if="
                    (paymethodTypeCards &&
                      model.CardPurseId !== 'new' &&
                      model.CardPurseId) ||
                      getLastAddedPaymethod
                  "
                  :paymethod="currentPayMethod || getLastAddedPaymethod"
                  :type-form="true"
                />
              </div>

              <div class="form-add-entity__selected-item">
                <payment-wmp
                  v-if="paymethodTypeWmp && wmpPurse"
                  :wmp="wmpPurse"
                  :type-form="true"
                />
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col type="flex" :xs="24" :sm="12" :md="12">
            <el-form-item label="Стоимость" prop="Amount" class="is-required">
              <el-input
                v-model="model.Amount"
                v-currency="options"
                @input="onInputAmount"
              >
                <template slot="append"
                  ><el-icon class="el-icon-money"
                /></template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col type="flex" :xs="24" :sm="12" :md="12">
            <el-form-item label="Предложение действует до" prop="Duration">
              <el-date-picker
                v-model="model.Duration"
                type="date"
                format="yyyy/MM/dd"
                placeholder="Выберите дату"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <div class="commission">
            <el-icon class="el-icon-info commission__icon-info" />
            <span class="commission__title">Коммиссия:</span>
            <span class="commission__item"
              >Банковская карта:
              <span class="commission__value">{{ CardCommission }}</span>
              ₽</span
            >
            <span class="commission__item">
              WebMoney:
              <span class="commission__value">{{ WmpCommission }}</span>
              ₽</span
            >
          </div>
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
              />
            </el-tooltip>

            <el-button type="primary" @click="onSubmit('model')"
              >Создать предложение</el-button
            >
          </div>
        </div>
      </el-form>

      <SuccessCreated v-if="createDone" />
    </el-card>

    <AddNewPaymethod @close:dialog="closeDialogAddNewPayMethod" />
  </div>
</template>

<script>
import AddNewPaymethod from '@/components/AddNewPaymethod';
import { CurrencyDirective, parseCurrency } from 'vue-currency-input';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import CreditCardBlackLogo from '../../../../public/creditCardBlack.svg';
import { SelectOption, SuccessCreated } from './components';
import { mapState, mapGetters, mapActions } from 'vuex';
import PaymentWmp from '@/components/PaymentWmp';
import PaymentCard from '@/components/PaymentCard';
import { getCommission } from '@/api/deals';
import _debounce from 'lodash.debounce';
import { getLastAddedPaymethod } from '@/utils/profile';

export default {
  directives: {
    currency: CurrencyDirective,
  },
  components: {
    PaymentCard,
    PaymentWmp,
    SuccessCreated,
    AddNewPaymethod,
    CreditCardBlackLogo,
    WebmoneyLogo,
    SelectOption,
  },
  data() {
    const validateAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Вам нужно указать стоимость'));
      }
      if (value < this.MinAmount) {
        callback(new Error(`Минимальная сумма ${this.MinAmount} руб`));
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          let oneYearFromNow = new Date();
          oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

          return time.getTime() > oneYearFromNow;
        },
        shortcuts: [
          {
            text: 'До завтра',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: 'Одну неделю',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },
      lastAddedPaymethod: null,
      maxAmount: 10000000,
      submitting: false,
      createDone: false,
      termsActive: false,
      paymethodTypeCards: true,
      paymethodTypeWmp: false,
      WmpCommission: 0,
      CardCommission: 0,
      MinAmount: 0,
      model: {
        Duration: '',
        Count: 1,
        Description: '',
        CategoryId: 2,
        Amount: 0,
        CardPurseId: JSON.parse(getLastAddedPaymethod()).Guid || '',
        WmpPurseId: '',
      },

      rules: {
        Duration: [
          {
            required: true,
            message: 'Вам нужно выбрать дату',
            trigger: 'blur',
          },
        ],
        Description: [
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
        Amount: [
          {
            validator: validateAmount,
            trigger: 'blur',
          },
        ],
        CardPurseId: [
          {
            required: true,
            message: 'Вам нужно выбрать',
            trigger: 'change',
          },
        ],
        CategoryId: [
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
      categoryList: state => state.dictionary.categories,
      dictionaryLoaded: state => state.dictionary.dictionaryLoaded,
    }),
    ...mapGetters({
      paymethods: 'profile/getPaymethods',
      wmpPurse: 'profile/getWmpPurse',
    }),

    currentPayMethod() {
      return this.paymethods.find(x => x.Guid === this.model.CardPurseId);
    },

    getLastAddedPaymethod() {
      return this.lastAddedPaymethod;
    },

    getDateISO() {
      return this.model.Duration && this.model.Duration.toISOString();
    },

    options() {
      return {
        currency: 'RUB',
        locale: 'ru',
        valueRange: {
          min: this.MinAmount ? this.MinAmount : 0,
          max: this.maxAmount,
        },
        allowNegative: false,
        distractionFree: false,
      };
    },

    numberValue() {
      return (
        this.model.Amount && parseCurrency(this.model.Amount, this.options)
      );
    },
  },

  watch: {
    paymethodTypeCards(newVal) {
      if (!newVal) {
        this.$set(this.model, 'CardPurseId', '');
      }
    },

    paymethodTypeWmp(newVal) {
      if (!newVal) {
        this.$set(this.model, 'WmpPurseId', '');
      } else {
        if (this.wmpPurse) {
          this.$set(this.model, 'WmpPurseId', this.wmpPurse.Guid);
        } else {
          console.log('Нет wmp');
        }
      }
    },
  },

  created() {
    this.debounseGetCommission = _debounce(this.getCurrentCommission, 150);
  },

  mounted() {
    if (this.wmpPurse) {
      this.$set(this.model, 'WmpPurseId', this.wmpPurse.Guid);
      this.paymethodTypeWmp = true;
    }

    // if (this.paymethods.length > 0) {
    //   this.paymethodTypeCards = true;
    // }
  },

  methods: {
    ...mapActions('profile', ['toggleDialogPaymethod']),
    ...mapActions('deals', ['createDeal']),

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.submitting = true;
        const model = {
          ...this.model,
          Duration: this.getDateISO,
          Amount: this.numberValue,
        };
        console.log('model', model);
        this.createDeal(model)
          .then(() => {
            this.resetForm(formName);
          })
          .finally(() => (this.submitting = false));
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    closeDialogAddNewPayMethod() {
      this.$set(this.model, 'CardPurseId', '');
      this.getLastPaymethod();
    },

    getCurrentCommission(val) {
      getCommission(val).then(commissions => {
        const { CardCommission, WmpCommission, MinAmount } = commissions;

        this.CardCommission = CardCommission;
        this.WmpCommission = WmpCommission;
        this.MinAmount = MinAmount;
      });
    },

    onInputAmount() {
      if (this.numberValue && this.numberValue > this.maxAmount) return;

      this.debounseGetCommission(this.numberValue || 0);
    },

    getLastPaymethod() {
      let data = getLastAddedPaymethod();
      if (!data) return;

      this.lastAddedPaymethod = JSON.parse(data);
      this.$set(this.model, 'CardPurseId', JSON.parse(data).Guid);
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

.commission {
  //background-color: #eaf0f7;
  background-color: #ebf5ff;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    left: 58px;
    top: -7px;
    display: block;
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 363px;
    height: 287px;
    opacity: 0.3;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }

  &__item {
    color: #0f213c;
    font-size: 12px;
    margin-right: 15px;
  }

  &__icon-info {
    font-size: 20px;
    color: #78a9d9;
    margin-right: 6px;
  }

  &__title {
    font-size: 14px;
    margin-right: 15px;
  }

  &__value {
    font-weight: 600;
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

  &__paymethods {
    margin-bottom: 24px;
    min-height: 222px;
  }

  &__select-card {
    .el-form-item {
      margin-bottom: 16px;
    }
  }

  &__selected-heading {
    font-size: 14px;
    color: #606266;
    padding: 0 0 10px;
  }

  &__selected-item {
    &:not(:last-child) {
      margin-bottom: 6px;
    }
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
  position: relative;
  max-width: 400px;
  user-select: none;

  &__input {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;

    &:checked ~ .paymethod-radio__name {
      //background-color: #25bf79;
      background-color: rgba(#409eff, 0.1);
      //background-color: rgba(#409eff, 0.5);
      border-color: #25bf79;
      color: #000;

      //color: #fff;

      .paymethod-radio__icon {
        path {
          //fill: #fff;
          fill: #036cb5;
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
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-weight: 400;
    color: #999;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    border: 2px solid #dcdfe6;

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

  &__check {
    position: absolute;
    top: 0;
    right: 0;
    background-color: green;
    border-radius: 50%;
    color: #fff;
    padding: 2px 6px;
    font-size: 15px;
  }
}

.el-radio-button-inner {
  height: 80px;
  padding: 0 20px;
  border-radius: 40px;
  margin: 15px 0;
}
</style>
