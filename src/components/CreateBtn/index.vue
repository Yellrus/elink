<template>
  <button class="bttn-pill bttn-sm bttn-primary">Создать</button>
</template>

<script>
export default {
  name: 'CreateBtn',
};
</script>

<style lang="scss" scoped>
.bttn-default {
  color: #fff;
}
.bttn-primary,
.bttn,
.bttn-lg,
.bttn-md,
.bttn-sm,
.bttn-xs {
  color: #409eff;
}

.bttn,
.bttn-lg,
.bttn-md,
.bttn-sm,
.bttn-xs {
  margin: 0;
  padding: 0;
  border-width: 0;
  border-color: transparent;
  background: transparent;
  font-weight: 400;
  cursor: pointer;
  position: relative;
}

.bttn-sm {
  padding: 4px 10px;
  font-size: 15px;
  font-family: inherit;
}

.bttn-pill {
  outline: none;
  margin: 0;
  padding: 0;
  border-width: 0;
  border-color: transparent;
  background: transparent;
  font-weight: 400;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  font-family: inherit;
  padding: 5px 12px;
  z-index: 0;
  overflow: hidden;
  border: none;
  border-radius: 4px;
  background: #fff;
  color: #409eff;
  -webkit-transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
  transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
}
.bttn-pill:before,
.bttn-pill:after {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #409eff;
  content: '';
  opacity: 0;
  transition: transform 0.15s cubic-bezier(0.02, 0.01, 0.47, 1),
    opacity 0.15s cubic-bezier(0.02, 0.01, 0.47, 1);
  z-index: -1;
  transform: translate(100%, -25%) translate3d(0, 0, 0);
}
.bttn-pill:hover,
.bttn-pill:focus {
  box-shadow: 0 1px 8px rgba(58, 51, 53, 0.3);
  color: #fff;
  transition: all 0.5s cubic-bezier(0.02, 0.01, 0.47, 1);
  transform: scale(1.02) translate3d(0, 0, 0);
}
.bttn-pill:hover:before,
.bttn-pill:focus:before {
  opacity: 0.15;
  transition: transform 0.2s cubic-bezier(0.02, 0.01, 0.47, 1),
    opacity 0.2s cubic-bezier(0.02, 0.01, 0.47, 1);
  transform: translate3d(50%, 0, 0) scale(0.9);
}
.bttn-pill:hover:after,
.bttn-pill:focus:after {
  opacity: 0.25;
  transition: transform 0.2s 0.05s cubic-bezier(0.02, 0.01, 0.47, 1),
    opacity 0.2s 0.05s cubic-bezier(0.02, 0.01, 0.47, 1);
  transform: translate(50%, 0) scale(1.05);
}
.bttn-pill.bttn-sm {
  padding: 6px 20px;
  font-size: 14px;
  font-family: inherit;
}
.bttn-pill.bttn-sm:hover,
.bttn-pill.bttn-sm:focus {
  box-shadow: 0 1px 6px rgba(58, 51, 53, 0.3);
}

.bttn-pill.bttn-default {
  background: #fff;
  color: #409eff;
}
.bttn-pill.bttn-default:hover,
.bttn-pill.bttn-default:focus {
  color: #409eff;
}
.bttn-pill.bttn-default:before,
.bttn-pill.bttn-default:after {
  background: #409eff;
}
.bttn-pill.bttn-primary {
  background: #409eff;
  color: #fff;
}
.bttn-pill.bttn-primary:hover,
.bttn-pill.bttn-primary:focus {
  color: #fff;
}
.bttn-pill.bttn-primary:before,
.bttn-pill.bttn-primary:after {
  background: #fff;
}
</style>
