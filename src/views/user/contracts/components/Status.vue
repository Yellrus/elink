<template>
  <div class="status" :class="`status--is-${status}`">
    {{ name }}
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    status: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.status {
  font-size: 11px;
  line-height: 1;
  background-color: rgba(#94afd1, 0.3);
  border-width: 1px;
  border-style: solid;
  color: #759cd1;
  border-color: rgba(#94afd1, 0.6);
  min-width: 62px;
  text-align: center;
  padding: 5px 8px;
  border-radius: 10px;
  max-width: 256px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &--is-closed {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;

    color: #546e7a;
    background-color: #eceff1;
    border-color: #cfd8dc;
  }

  &--is-count {
    color: #795548;
    background-color: #efebe9;
    border-color: #d7ccc8;
  }

  &--is-duration {
    color: #518fe1;
    background-color: rgba(#93b5e1, 0.2);
    border-color: rgba(#93b5e1, 0.4);
  }
}
</style>
