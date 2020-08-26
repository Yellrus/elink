<template>
  <div class="status" :class="`status--s${statusId}`">
    {{ dataStatuses[statusId] }}
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    statusId: {
      type: Number,
    },
    dataStatuses: {
      type: Object,
      default: () => ({}),
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

  &--s1 {
    background-color: #e3f2fd;
    border-color: #bbdefb;
    color: #1e88e5;
  }

  &--s2 {
    background-color: #e8f5e9;
    border-color: #c8e6c9;
    color: #67c23a;
  }

  &--s3 {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
  }

  &--s4 {
    background-color: #e8eaf6;
    border-color: #c5cae9;
    color: #5c6bc0;
  }

  &--s5 {
    background-color: #ede7f6;
    border-color: #d1c4e9;
    color: #7e57c2;
  }

  &--s6,
  &--s7 {
    background-color: #e0f2f1;
    border-color: #b2dfdb;
    color: #26a69a;
  }

  &--s8 {
    color: #F56C6C;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
}
</style>
