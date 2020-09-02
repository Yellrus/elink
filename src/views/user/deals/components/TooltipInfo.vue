<template>
  <span class="es-tooltip">
    <span class="es-tooltip__item">
      <span class="es-tooltip__item-title">Сумма к получению:</span>
      <span class="es-tooltip__item-value">
        {{
          item.Contract.Amount
            | amountWithCommission(
              `${
                item.PayMethod === 2
                  ? item.Contract.CardCommission
                  : item.Contract.WmpCommission
              }`
            )
            | toThousandFilter
        }}
        ₽
      </span>
    </span>
    <span class="es-tooltip__item">
      <span class="es-tooltip__item-title">Комиссия:</span>
      <span class="es-tooltip__item-value">
        {{
          (item.PayMethod === 2
            ? item.Contract.CardCommission
            : item.Contract.WmpCommission) | toThousandFilter
        }}
        ₽
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'TooltipInfo',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.es-tooltip {
  &__item {
    display: flex;
    flex-direction: column;
    color: #527ece;
    font-weight: 500;
    margin-bottom: 4px;
  }

  &__item-title {
    font-size: 12px;
    color: #5d6b85;
    font-weight: 400;
  }

  &__item-value {
    padding-left: 4px;
  }
}
</style>
