<template>
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
          {{ checkDurationDate(contract.Duration) ? 'Истекло' : 'Активно до' }}
        </span>

        <div class="contract__DurationValue">
          <span>{{ contract.Duration | formatDateDayMonth }}</span
          >&nbsp;
          <span>{{ contract.Duration | formatDateYear }}</span>
        </div>
      </div>

      <div v-if="device === 'mobile'" class="contract__status">
        <status v-if="contract.IsClosed" :status="'closed'" :name="'Закрыто'" />
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
          :disabled="contract.IsClosed"
          circle
          plain
          class="contract__BtnCopy"
        />
      </div>
      <div class="contract__ActionsItem">
        <shared-button
          :is-disabled="contract.IsClosed"
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
          <el-button slot="reference" size="small" type="danger" circle plain>
            <closeIcon class="contract__btn-icon" />
          </el-button>
        </el-popconfirm>

        <el-tooltip v-else placement="top">
          <div slot="content">Предложение закрыто</div>
          <el-button type="info" size="small" circle plain>
            <closeIcon class="contract__btn-icon" />
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { Status } from './index';
import CreditCardLogo from '../../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../../public/webmoney-logo.svg';
import CloseIcon from '../../../../../public/close.svg';
import SharedButton from '@/components/SharedButton';
import clipboard from '@/directive/clipboard';
import Badge from '@/components/Badge';
import Arrow from '@/components/Arrow';
import { checkDate } from '@/mixins/common';
import { mapState } from 'vuex';

export default {
  name: 'ListItem',
  components: {
    Status,
    Arrow,
    Badge,
    SharedButton,
    CreditCardLogo,
    WebmoneyLogo,
    CloseIcon,
  },
  directives: {
    clipboard,
  },
  mixins: [checkDate],
  props: {
    contract: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
    }),

    host() {
      return location.host;
    },
  },
  methods: {
    closeContract(id) {
      this.$emit('close', id);
    },
    clipboardSuccess() {
      this.$message({
        message: 'Ссылка для продажи скопирована!',
        type: 'success',
        duration: 1500,
      });
    },

    checkDurationDate(durationDate) {
      return this.checkDate(durationDate);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/contract-list-item.scss';
</style>
