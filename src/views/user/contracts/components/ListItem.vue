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

      <div class="contract__Counts">
        <div class="contract__Count">
          <Badge
            :count="contract.SuccessfulCount"
            :type="'success'"
            :hint="'Успешных продаж'"
          />
        </div>

        <div class="contract__Count">
          <Badge
            :count="contract.WaitingCount"
            :type="'wait'"
            :hint="'Ожидающих выплат'"
          />
        </div>

        <div class="contract__Count">
          <Badge
            :count="contract.Count"
            :type="contract.Count === 0 ? 'empty' : 'goods'"
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
      <menu-actions>
        <template v-slot:dropdownItem>
          <el-dropdown-item v-if="!contract.IsClosed">
            <el-popconfirm
              confirm-button-text="Подтвердить"
              cancel-button-text="Отмена"
              placement="top"
              :title="`Закрыть ${contract.Name} ?`"
              @onConfirm="closeContract(contract.Id)"
            >
              <el-button slot="reference" type="danger" plain size="medium">
                <closeIcon class="menu-actions__btn-icon" />
                Закрыть
              </el-button>
            </el-popconfirm>
          </el-dropdown-item>

<!--          <el-dropdown-item>-->
<!--            <el-button type="primary" size="medium" plain>-->
<!--              <el-icon class="el-icon-edit" />-->
<!--              Редактировать-->
<!--            </el-button>-->
<!--          </el-dropdown-item>-->

          <el-dropdown-item>
            <el-button
              type="primary"
              size="medium"
              plain
              @click="openDialogAddTemplate(contract)"
            >
              <el-icon class="el-icon-plus" />
              Создать шаблон
            </el-button>
          </el-dropdown-item>

          <el-dropdown-item v-if="!contract.IsClosed">
            <shared-button
              :is-disabled="contract.IsClosed"
              :sharing="{
                url: `${host}/contract/${contract.Id}`,
                title: contract.Name,
                description: contract.Description,
              }"
            />
          </el-dropdown-item>
        </template>
      </menu-actions>
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
import MenuActions from './MenuActions';

export default {
  name: 'ListItem',
  components: {
    MenuActions,
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
  data: () => ({
    dialogAddTemplate: false,
  }),
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

    openDialogAddTemplate(contract) {
      this.$emit('dialog-add-template', contract);
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
