<template>
  <div class="page-500">
    <div class="page-500__message">
      <h1>500</h1>
      <h3>Server Error</h3>
      <h2>It's not you, it's me.</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: '500',
};
</script>

<style lang="scss" scoped>
$light-text-color: #c8fff4;
$dark-text-color: #03dac6;

.page-500 {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(#111, #333, #111);
  background-repeat: no-repeat;
  background-size: cover;
  color: #eee;
}

.page-500__message {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  h1,
  h2,
  h3 {
    margin: 0;
    line-height: 0.8;
  }

  h2,
  h3 {
    font-weight: 300;
    color: $light-text-color;
  }

  h1 {
    font-weight: 700;
    color: $dark-text-color;
    font-size: 8em;
    margin-bottom: 15px;

    @media (max-width: 767px) {
      font-size: 5em;
    }
  }

  h2 {
    margin: 30px 0;
    line-height: 1.2;
  }

  h3 {
    font-size: 2.5em;
    line-height: 1.2;
  }

  h4 {
    display: inline-block;
    margin: 0 15px;
  }

  button {
    background: transparent;
    border: 2px solid $light-text-color;
    color: $light-text-color;
    padding: 5px 15px;
    font-size: 1.25em;
    transition: all 0.15s ease;
    border-radius: 3px;
  }

  button:hover {
    background: $dark-text-color;
    border: 2px solid $dark-text-color;
    color: #111;
    cursor: pointer;
    transform: scale(1.05);
  }
}
</style>
