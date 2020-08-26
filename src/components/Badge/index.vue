<template>
  <el-tooltip :content="hint" placement="top" effect="dark">
    <div class="badge" :class="{ 'badge--empty': count === 0 }">
      <div class="badge__label">{{ count }}</div>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    count: {
      type: Number,
      default: 0,
    },
    hint: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
$base-color: #0071f6;
$empty-color: #f44336;

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

.badge {
  animation: introduceBadge 0.4s linear 0s 1 both;
  background-color: rgba($base-color, 0.2);
  border-radius: 50%;
  height: 25px;
  perspective: 600px;
  position: relative;
  width: 26px;
  margin-right: 4px;
  white-space: nowrap;

  &__label {
    animation: introduceLabel 2s cubic-bezier(0.19, 1, 0.22, 1) 0.2s 1 both,
      rotateLabel 5s linear 3s infinite;
    color: $base-color;
    font-size: 11px;
    font-weight: 400;
    left: 50%;
    position: absolute;
    text-align: center;
    text-shadow: 0 4px 8px rgba($base-color, 0.2);
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &--empty {
    background-color: rgba($empty-color, 0.2);

    background-color: #efebe9;

    .badge__label {
      color: $empty-color;
      text-shadow: 0 4px 8px rgba($empty-color, 0.2);
      text-shadow: 0 4px 8px #d7ccc8;
      color: #795548;
    }
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
</style>
