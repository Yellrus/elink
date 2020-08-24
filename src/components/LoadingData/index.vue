<template>
  <div class="el-loading-mask" style="z-index: 1000">
    <div class="loading-spinner">
      <!--      <svg viewBox="25 25 50 50" class="circular">-->
      <!--        <circle cx="50" cy="50" r="20" fill="none" class="path" />-->
      <!--      </svg>-->
      <svg
        :style="styles"
        class="spinner spinner--circle"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="3"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingData',
  props: {
    size: {
      type: String,
      default: '42px',
    },
  },
  computed: {
    styles() {
      return {
        width: this.size,
        height: this.size,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$offset: 187;
$duration: 1.4s;
.loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}

.spinner {
  animation: circle-rotator $duration linear infinite;
  * {
    line-height: 0;
    box-sizing: border-box;
  }
}
@keyframes circle-rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: circle-dash $duration ease-in-out infinite,
    circle-colors ($duration * 4) ease-in-out infinite;
}
@keyframes circle-colors {
  0% {
    stroke: rgba(0, 113, 246, 0.5);
  }
  25% {
    stroke: #409EFF;
  }
  50% {
    stroke: #5aabff;
  }
  75% {
    stroke: #2791ff;
  }
  100% {
    stroke: #41b883;
  }
}
@keyframes circle-dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
