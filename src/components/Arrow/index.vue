<template>
  <div class="arrow">
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: 'Arrow',
};
</script>

<style lang="scss" scoped>
.arrow {
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  height: 20px;
  position: absolute;
  width: 0.25rem;
  left: 50%;
  top: 50%;
  margin-top: -5px;
  z-index: 2;
  transform: translateX(-24px) rotate(-90deg);
  pointer-events: none;
  user-select: none;
}
.arrow span {
  display: block;
  width: 30px;
  height: 30px;
  border-bottom: 5px solid #06a8ff;
  border-right: 5px solid #06a8ff;
  transform: rotate(45deg);
  margin: -10px;
  animation: animate 1.5s infinite;
}
.arrow span:nth-child(2) {
  animation-delay: -0.2s;
}
.arrow span:nth-child(3) {
  animation-delay: -0.4s;
}
@keyframes animate {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-20px, -20px);
  }
  50% {
    opacity: 0.03;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(20px, 20px);
  }
}
</style>
