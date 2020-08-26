<template>
  <div class="page-container">
    <h1 class="page-contracts-heading">Список моих предложений</h1>
    <div class="page-container__wrap-pagination">
      <loading-data v-if="loadingData" />
      <template>
        <div class="contracts">
          <data-empty
            v-if="items.length <= 0 && !loadingData"
            :btn-title="btnDataEmptyTitle"
            :btn-url="`/contracts/create`"
          >
            <template v-slot:text>
              {{ textDataEmpty }}
            </template>
          </data-empty>

          <div
            v-for="contract in items"
            :key="contract.Id"
            class="contracts__item"
          >
            <div class="contract">
              <arrow v-if="device !== 'mobile'" />
              <router-link
                :to="`/contracts/${contract.Id}`"
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

                    <div v-if="device !== 'mobile'" class="contract__status">
                      <status
                        v-if="contract.IsClosed"
                        :status="'closed'"
                        :name="'Закрыто'"
                      />
                      <status
                        v-else-if="contract.Count <= 0"
                        :status="'count'"
                        :name="'Нет в наличии'"
                      />
                      <status
                        v-else-if="checkDurationDate(contract.Duration)"
                        :status="'duration'"
                        :name="'Время истекло'"
                      />
                    </div>
                  </div>
                </div>

                <div class="contract__Amount">
                  {{ contract.Amount | toThousandFilter }}
                  <span class="contract__Currency">₽</span>
                </div>

                <div class="contract__Count">
                  <Badge
                    :count="contract.Count"
                    :hint="
                      `${
                        contract.Count !== 0
                          ? contract.CategoryId === 2
                            ? 'Количество товаров для продажи'
                            : 'Количество услуг для продажи'
                          : 'Нет в наличии'
                      }`
                    "
                  />
                </div>

                <div class="contract__Duration">
                  <span class="contract__DurationTitle">
                    <el-icon class="contract__DurationIcon el-icon-time" />
                    {{
                      checkDurationDate(contract.Duration)
                        ? 'Истекло'
                        : 'Активно до'
                    }}
                  </span>

                  <div class="contract__DurationValue">
                    <span>{{ contract.Duration | formatDateDayMonth }}</span
                    >&nbsp;
                    <span>{{ contract.Duration | formatDateYear }}</span>
                  </div>
                </div>

                <div v-if="device === 'mobile'" class="contract__status">
                  <status
                    v-if="contract.IsClosed"
                    :status="'closed'"
                    :name="'Закрыто'"
                  />
                  <status
                    v-else-if="contract.Count <= 0"
                    :status="'count'"
                    :name="'Нет в наличии'"
                  />
                  <status
                    v-else-if="checkDurationDate(contract.Duration)"
                    :status="'duration'"
                    :name="'Время истекло'"
                  />
                </div>
              </router-link>

              <div class="contract__Actions">
                <div class="contract__ActionsItem">
                  <el-button
                    v-clipboard:copy="`${host}/contract/${contract.Id}`"
                    v-clipboard:success="clipboardSuccess"
                    type="success"
                    icon="el-icon-link"
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

                <div class="contract__ActionsItem">
                  <el-popconfirm
                    v-if="!contract.IsClosed"
                    confirm-button-text="Подтвердить"
                    cancel-button-text="Отмена"
                    placement="top"
                    class="contract__btn-popconfirm"
                    :title="`Закрыть ${contract.Name} ?`"
                    @onConfirm="closeContract(contract.Id)"
                  >
                    <el-button
                      slot="reference"
                      size="small"
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      plain
                    />
                  </el-popconfirm>

                  <el-tooltip v-else placement="top">
                    <div slot="content">Предложение закрыто</div>
                    <el-button
                      type="info"
                      size="small"
                      icon="el-icon-delete"
                      circle
                      plain
                    />
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <pagination
          v-show="total > 10"
          :layout="
            device === 'mobile'
              ? 'total, prev, pager, next'
              : 'total, sizes, prev, pager, next, jumper'
          "
          :pager-count="device === 'mobile' ? 5 : 7"
          :total="total"
          :page.sync="listQuery.offset"
          :limit.sync="listQuery.limit"
          @pagination="fetchContracts"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import clipboard from '@/directive/clipboard';
import LoadingData from '@/components/LoadingData';
import SharedButton from '@/components/SharedButton';
import WebmoneyLogo from '../../../../public/webmoney-logo.svg';
import CreditCardLogo from '../../../../public/creditCard.svg';
import Pagination from '@/components/Pagination';
import Badge from '@/components/Badge';
import DataEmpty from '@/components/DataEmpty';
import Arrow from '@/components/Arrow';
import { Status } from './components';
import dayjs from 'dayjs';

export default {
  name: 'Contracts',
  components: {
    Status,
    Arrow,
    DataEmpty,
    Badge,
    SharedButton,
    LoadingData,
    CreditCardLogo,
    WebmoneyLogo,
    Pagination,
  },
  directives: {
    clipboard,
  },

  data: () => ({
    textDataEmpty:
      'У вас нет активных предложений. Чтобы создать новое предложение, нажмите на кнопку ниже',
    btnDataEmptyTitle: 'Создать предложение',
    closingContract: false,
    loadingData: false,
    total: 0,
    listQuery: {
      offset: 1,
      limit: 10,
    },
    items: [],
    pagination: {},
  }),

  computed: {
    ...mapGetters(['device']),
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
    ...mapActions('contract', ['getContracts', 'contractClose']),

    async fetchContracts() {
      this.loadingData = true;
      const offset =
        this.listQuery.offset === 1
          ? 0
          : (this.listQuery.offset - 1) * this.listQuery.limit;

      const { Items, Pagination } = await this.getContracts({
        limit: this.listQuery.limit,
        offset,
      });
      const { Total } = Pagination;

      this.items = Items;
      this.total = Total;
      setTimeout(() => {
        this.loadingData = false;
      }, 300);
    },

    clipboardSuccess() {
      this.$message({
        message: 'Ссылка для продажи скопирована!',
        type: 'success',
        duration: 1500,
      });
    },

    closeContract(Id) {
      this.closingContract = true;
      this.contractClose(Id)
        .then(() => {
          this.$message({
            message: 'Предложение успешно закрыто!',
            type: 'success',
            duration: 1500,
          });
          this.fetchContracts();
        })
        .catch(() => (this.closingContract = false))
        .finally(() => (this.closingContract = false));
    },

    checkDurationDate(durationDate) {
      const today = dayjs(new Date());
      const pastDate = dayjs(durationDate);
      // дата с сервера до сегодняшнего дня
      return pastDate.isBefore(today);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/contract-list-item.scss';

.contracts {
  max-width: 1100px;
  margin: 0 auto;
  min-height: calc(100vh - 290px);

  @media (max-width: $mq-tablet-vertical) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  @media (max-width: $mq-mobile) {
    flex-direction: column;
    margin: 0;
  }

  &__item {
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &:hover {
      .arrow {
        visibility: visible;
        opacity: 1;
      }
    }

    @media (max-width: $mq-tablet-vertical) {
      width: 50%;
      padding: 10px;
    }

    @media (max-width: $mq-mobile) {
      width: 100%;
      padding: 0;
    }
  }
}
</style>
