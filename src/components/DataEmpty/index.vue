<template>
  <div class="data-empty">
    <div class="data-empty__img">
      <!--      <el-icon class="el-icon-s-cooperation data-empty__icon" />-->
      <div class="data-empty__icon-wrap">
        <svg
          class="data-empty__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512.084 512.084"
        >
          <path
            d="M416.084 181.389c-29.46-70.69-110.648-104.114-181.339-74.654-48.335 20.143-81.2 65.796-84.966 118.025-40.848 5.649-69.383 43.343-63.734 84.192 5.112 36.962 36.725 64.475 74.038 64.438h256c53.019 0 96-42.981 96-96s-42.979-96.001-95.999-96.001z"
            fill="#64b5f6"
          />
          <path
            d="M330.751 224.056c-29.46-70.69-110.648-104.114-181.338-74.654-48.335 20.143-81.2 65.796-84.966 118.025C23.599 273.076-4.936 310.77.713 351.619c5.112 36.962 36.725 64.475 74.038 64.438h256c53.019 0 96-42.981 96-96s-42.981-96.001-96-96.001z"
            fill="#bbdefb"
          />
        </svg>
      </div>
      <slot name="text" />
      <router-link v-if="btnUrl" :to="btnUrl">
        <el-button class="data-empty__btn" type="primary">{{
          btnTitle
        }}</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataEmpty',
  props: {
    text: {
      type: String,
      default: '',
    },
    btnTitle: {
      type: String,
      default: '',
    },
    btnUrl: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
$base-color: #0071f6;

@keyframes introduceBadge {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pulseBadge {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes pulseBadge2 {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes introduceLabel {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4) rotateY(-1800deg);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotateY(20deg);
  }
}

@keyframes rotateLabel {
  0% {
    transform: translate(-50%, -50%) rotateY(20deg);
  }

  50% {
    transform: translate(-50%, -50%) rotateY(-20deg);
  }

  100% {
    transform: translate(-50%, -50%) rotateY(20deg);
  }
}

.data-empty {
  &__img {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__icon-wrap {
    border-radius: 50%;
    margin-top: 45px;
    width: 138px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    animation: introduceBadge 1s linear 0s 1 both;
    height: 136px;
    perspective: 600px;
    position: relative;
    margin-bottom: 50px;

    &:before,
    &:after {
      animation: pulseBadge 3s cubic-bezier(0.86, 0, 0.07, 1) 0s infinite both;
      border: 2px dashed $base-color;
      border-radius: inherit;
      bottom: -16px;
      content: '';
      left: -16px;
      opacity: 0.2;
      position: absolute;
      right: -16px;
      top: -16px;
    }

    &:after {
      animation-name: pulseBadge2;
      bottom: -32px;
      left: -32px;
      opacity: 0.1;
      right: -32px;
      top: -32px;
    }
  }

  &__icon {
    font-size: 40px;
    //padding: 20px;
    display: block;
  }

  &__btn {
    margin-top: 40px;
  }
}
</style>
