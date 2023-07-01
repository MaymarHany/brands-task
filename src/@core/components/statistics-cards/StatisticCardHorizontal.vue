<template>
  <b-card no-body>
    <slot />
    <b-card-body class="d-flex justify-content-between align-items-center">
      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder">
          {{ statistic }}
        </h2>
        <span>{{ statisticTitle }}</span>
      </div>
      <b-avatar
        v-if="symbol==''"
        :variant="`light-${color}`"
        size="45"
      >
        <feather-icon
          size="21"
          :icon="icon"
        />

      </b-avatar>
      <div
        v-if="symbol!==''"
        class="conOfSymbol"
      >
        <span
          class="symbol-txt"
        >{{ symbol }}</span>
      </div>

    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BAvatar,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
      default: () => '',

    },
    statistic: {
      type: [Number, String],
      default: () => '',
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
<style scoped>
.symbol-txt{
  font-size: 0.857rem;
    font-weight: 600;
    color: #4881FF;
}
.conOfSymbol{
  border-radius: 50px;
  width: 45px;
    height: 45px;
    background: #FEF1E7;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
