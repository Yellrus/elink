<template>
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
      <i :class="network.icon"></i>
      <span>{{ network.name }}</span>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  name: 'SocialSharing',
  props: {
    sharing: {
      type: Object,
      default: () => ({}),
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
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  a {
    display: block;
    background-color: #fff;
    box-shadow: 10px 3px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 2px 10px;
    border-radius: 3px;
    font-size: 12px;
    will-change: transform;
    opacity: 0.9;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    color: #fff;
    margin-bottom: 8px;

    &:hover {
      transform: translateY(-2px);
      opacity: 1;
    }
    &:active {
      transform: translateY(0);
    }
    &:not(:last-child) {
      margin-right: 8px;
    }

  }
}
</style>
