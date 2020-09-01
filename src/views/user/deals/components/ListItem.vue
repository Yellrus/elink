<template>
  <div class="contract">
    <arrow v-if="device !== 'mobile'" />
    <router-link :to="`deals/${item.Id}`" tag="div" class="contract__body">
      <div class="contract__Created">
        <span class="contract__CreatedMonthDay">{{
          item.Created | formatDateDayMonth
        }}</span>
        <span class="contract__CreatedYear">{{
          item.Created | formatDateYear
        }}</span>
      </div>

      <div class="contract__Column">
        <div class="contract__Name">
          {{ item.Contract.Name | uppercaseFirst }}
        </div>

        <div class="contract__Panel">
          <div class="contract__Category">
            {{ item.Contract.CategoryId | getCategoryName }}
          </div>

          <div class="contract__Paymethods">
            <el-tooltip
              v-if="item.PayMethod === 1"
              class="item"
              content="Способ оплаты WebMoney"
              placement="top-start"
            >
              <WebmoneyLogo
                class="contract__Paymethod contract__Paymethod--webmoney"
              />
            </el-tooltip>

            <el-tooltip
              v-if="item.PayMethod === 2"
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
            <status :data-statuses="dealsStatuses" :status-id="item.Status" />
          </div>
        </div>
      </div>

      <div class="contract__item-row">
        <div class="contract__Amount">
          {{ item.Contract.Amount | toThousandFilter }}
          <span class="contract__Currency">₽</span>
        </div>
      </div>

      <div class="contract__Duration">
        <span class="contract__DurationTitle">
          <el-icon class="contract__DurationIcon el-icon-time" />
          Дата закрытия
        </span>

        <div class="contract__DurationValue">
          <span>{{ item.ClosingAt | formatDateDayMonth }}</span
          >&nbsp;
          <span>{{ item.ClosingAt | formatDateYear }}</span>
        </div>
      </div>

      <div v-if="device === 'mobile'" class="contract__status">
        <status :data-statuses="dealsStatuses" :status-id="item.Status" />
      </div>
    </router-link>

    <div class="contract__Actions">
      <div class="contract__ActionsItem">
        <template v-if="!checkClosingAtDate(item.ClosingAt)">
          <el-popconfirm
            v-if="item.Status === 1"
            confirm-button-text="Подтвердить"
            cancel-button-text="Отмена"
            placement="top"
            class="contract__btn-popconfirm"
            :title="`Отменить ${item.Contract.Name} ?`"
            @onConfirm="cancelDeal(item.Id)"
          >
            <el-button slot="reference" type="danger" size="small" circle plain>
              <closeIcon />
            </el-button>
          </el-popconfirm>
          <el-tooltip v-else placement="top">
            <div slot="content">При текущем статусе не отменить</div>
            <el-button type="info" size="small" circle plain>
              <closeIcon class="contract__btn-icon" />
            </el-button>
          </el-tooltip>
        </template>
        <template v-else>
          <el-tooltip placement="top">
            <div slot="content">Время на отмену истекло</div>
            <el-button type="info" size="small" circle plain>
              <closeIcon class="contract__btn-icon" />
            </el-button>
          </el-tooltip>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Status } from './index';
import CreditCardLogo from '../../../../../public/creditCard.svg';
import WebmoneyLogo from '../../../../../public/webmoney-logo.svg';
import CloseIcon from '../../../../../public/close.svg';
import Arrow from '@/components/Arrow';
import { checkDate } from '@/mixins/common';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ListItem',
  components: {
    Status,
    Arrow,
    CreditCardLogo,
    WebmoneyLogo,
    CloseIcon,
  },
  mixins: [checkDate],
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(['device']),
    ...mapState({
      dealsStatuses: state => state.deal.statuses,
    }),
  },
  methods: {
    cancelDeal(id) {
      this.$emit('cancel', id);
    },

    checkClosingAtDate(closingAtDate) {
      return this.checkDate(closingAtDate);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/contract-list-item.scss';
</style>
