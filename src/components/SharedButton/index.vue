<template>
  <el-dropdown>
    <el-button
      class="share-button"
      icon="el-icon-share"
      circle
      plain
      :disabled="isDisabled"
      size="small"
      type="primary"
    />
    <el-dropdown-menu slot="dropdown">
      <div class="ShareNetworks">
        <ShareNetwork
          v-for="network in networks"
          :key="network.network"
          :network="network.network"
          :style="{ backgroundColor: network.color }"
          :url="sharing.url"
          :title="sharing.title"
          :description="sharing.description"
        >
          <el-dropdown-item class="ShareNetworks__dropdownItem">{{ network.name }}</el-dropdown-item>
        </ShareNetwork>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'SharedButton',
  props: {
    sharing: {
      type: Object,
      default: () => ({}),
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    networks: [
      {
        network: 'facebook',
        name: 'Facebook',

        color: '#1877f2',
      },
      {
        network: 'telegram',
        name: 'Telegram',
        color: '#0088cc',
      },
      {
        network: 'twitter',
        name: 'Twitter',
        color: '#1da1f2',
      },
      {
        network: 'vk',
        name: 'Vk',
        color: '#4a76a8',
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        color: '#25d366',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.ShareNetworks {
  display: flex;
  flex-direction: column;

  a {
    display: block;
    font-size: 12px;
    will-change: transform;
    opacity: 0.9;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    color: #fff;

    &:hover {
      transform: translateX(-2px);
      opacity: 1;
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__dropdownItem {
    padding: 2px 12px;
    color: #fff;

    &:hover {
      background-color: transparent;
      color: #fff;
    }
  }
}
</style>
