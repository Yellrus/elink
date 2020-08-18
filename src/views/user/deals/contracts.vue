<template>
  <div class="page-container">
    <h1 class="page-contracts-heading">Список моих предложений</h1>
    <template v-if="items.length > 0">
      <div class="contracts">
        <div
          v-for="contract in items"
          :key="contract.Id"
          class="contracts__item"
        >
          <div class="contract">
            <router-link
              :to="`contracts/${contract.Id}`"
              tag="div"
              class="contract__body"
            >
              <div class="contract__Created">
                <span class="contract__CreatedMonthDay">{{
                  contract.Created | formatDateDayMonth
                }}</span>
                <span class="contract__CreatedYear">{{
                  contract.Created | formatDateYear
                }}</span>
              </div>

              <div class="contract__Column">
                <div class="contract__Name">
                  {{ contract.Name | uppercaseFirst }}
                </div>

                <div class="contract__Panel">
                  <div class="contract__Category">
                    {{ contract.CategoryId | getCategoryName }}
                  </div>
                  <div class="contract__Paymethods">
                    <el-tooltip
                      v-if="contract.WmpPurse"
                      class="item"
                      content="Способ оплаты WebMoney"
                      placement="top-start"
                    >
                      <WebmoneyLogo
                        class="contract__Paymethod contract__Paymethod--webmoney"
                      />
                    </el-tooltip>

                    <el-tooltip
                      v-if="contract.Card"
                      class="item"
                      content="Способ оплаты Банковская карта"
                      placement="top-start"
                    >
                      <CreditCardLogo
                        class="contract__Paymethod contract__Paymethod--card"
                      />
                    </el-tooltip>
                  </div>
                </div>
              </div>

              <div class="contract__Amount">
                {{ contract.Amount | toThousandFilter }} ₽
              </div>
              <div class="contract__Duration">
                <span class="contract__DurationTitle">
                  <el-icon class="contract__DurationIcon el-icon-time" />
                  Активно до
                </span>

                <div class="contract__DurationValue">
                  <span>{{ contract.Duration | formatDateDayMonth }}</span
                  >&nbsp;
                  <span>{{ contract.Duration | formatDateOnlyYear }}</span>
                </div>
              </div>
            </router-link>

            <div class="contract__Actions">
              <div class="contract__ActionsItem">
                <el-button
                  v-clipboard:copy="`${host}/contract/${contract.Id}`"
                  v-clipboard:success="clipboardSuccess"
                  type="primary"
                  icon="el-icon-document-copy"
                  circle
                  plain
                  class="contract__BtnCopy"
                />
              </div>
              <div class="contract__ActionsItem">
                <shared-button
                  :sharing="{
                    url: `${host}/contract/${contract.Id}`,
                    title: contract.Name,
                    description: contract.Description,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <loading-data :is-loading="loadingData" />
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard/index';
import { mapActions } from 'vuex';
import LoadingData from '@/components/LoadingData';
import SharedButton from '@/components/SharedButton';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import CreditCardLogo from '../../../../public/creditCard.svg';

export default {
  name: 'Contracts',
  components: { SharedButton, LoadingData, CreditCardLogo, WebmoneyLogo },
  directives: {
    clipboard,
  },

  data: () => ({
    loadingData: false,
    offset: 0,
    limit: 10,
    items: [],
    pagination: {},
  }),

  computed: {
    host() {
      return location.host;
    },
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchContracts',
  },

  created() {
    this.fetchContracts();
  },

  methods: {
    ...mapActions('deals', ['getContracts']),

    async fetchContracts() {
      this.loadingData = true;
      const { Items, Pagination } = await this.getContracts({
        offset: this.offset,
        limit: this.limit,
      });

      this.items = Items;
      this.pagination = Pagination;
      this.loadingData = false;
    },

    clipboardSuccess() {
      this.$message({
        message: 'Успешно скопирован!',
        type: 'success',
        duration: 1500,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page-contracts-heading {
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 20px;

  @media (max-width: $mq-mobile) {
    font-size: 1.6em;
    line-height: 1.4;
  }
}

.contracts {
  max-width: 1200px;
  margin: 0 auto;

  &__item {
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}

.contract {
  width: 100%;
  display: flex;
  background-color: #fff;
  min-height: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: $mq-mobile) {
    flex-direction: column;
    padding-bottom: 10px;
  }

  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 5px;
    background-color: #94afd1;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    user-select: none;

    @media (max-width: $mq-mobile) {
      height: 4px;
      width: 100%;
    }
  }

  &:hover {
    transform: translateY(-1px);
    &::before {
      transform: translateX(-2px);
    }
  }

  &__body {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 13px 15px 13px 24px;

    @media (max-width: $mq-mobile) {
      flex-direction: column;
      justify-content: center;
    }
  }

  &__Created {
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 20px;
    flex-shrink: 0;

    @media (max-width: $mq-mobile) {
      flex-direction: row;
      margin-right: auto;
    }
  }

  &__Column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__CreatedYear {
    color: #999;

    @media (max-width: $mq-mobile) {
      margin-left: 4px;
    }
  }

  &__Actions {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    margin-left: 2px;

    @media (max-width: $mq-mobile) {
      justify-content: center;
    }
  }

  &__ActionsItem {
    &:not(:last-child) {
      margin-right: 14px;
    }
  }

  &__Amount {
    margin-left: auto;
    font-weight: 600;
    margin-right: 20px;
    flex-shrink: 0;

    @media (max-width: $mq-mobile) {
      margin-left: 0;
      margin-bottom: 10px;
      margin-right: 0;
    }
  }

  &__Category {
    font-size: 12px;
    background-color: rgb(58 142 230 / 12%);
    color: #3a8ee6;
    padding: 1px 10px;
    margin-right: 10px;

    @media (max-width: $mq-mobile) {
      order: 2;
      margin-right: 0;
      margin-left: 10px;
    }
  }

  &__Duration {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    min-width: 90px;
    flex-shrink: 0;

    @media (max-width: $mq-mobile) {
      flex-direction: row;
    }
  }

  &__DurationValue {
    color: #999;
  }

  &__DurationTitle {
    display: flex;
    align-items: center;

    @media (max-width: $mq-mobile) {
      margin-right: 5px;
    }
  }

  &__DurationIcon {
    margin-right: 4px;
  }

  &__Name {
    font-size: 18px;
    max-width: 630px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 6px;

    @media (max-width: 1024px) {
      max-width: 530px;
    }

    @media (max-width: $mq-tablet-vertical) {
      margin-bottom: 12px;
      white-space: normal;
      overflow: auto;
      text-overflow: initial;
    }

    @media (max-width: $mq-mobile) {
      margin-top: 12px;
    }
  }

  &__Panel {
    display: flex;
    align-items: center;

    @media (max-width: $mq-mobile) {
      position: absolute;
      top: 13px;
      right: 17px;
    }
  }

  &__Paymethods {
    display: flex;
    align-items: center;
  }

  &__Paymethod {
    width: 16px;
    &:not(:last-child) {
      margin-right: 8px;
    }

    &--webmoney {
      width: 14px;
    }
  }
}
</style>
