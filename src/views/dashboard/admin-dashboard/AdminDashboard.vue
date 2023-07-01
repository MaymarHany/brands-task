<template>
  <b-row>
    <b-col
      cols="12"
    >
      <b-card class="text-center">
        <b-link class="brand-logo">
          <img
            v-img
            :src="require('@/assets/images/logo/logo.png')"
            width="200"
          >
        </b-link>
        <b-card-title class="my-1">
          Welcome to propertyNet! 👋
        </b-card-title>
      </b-card>
    </b-col>

  </b-row>
</template>

<script>
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {

  },

  data() {
    return {
      dashboard: {},
    }
  },
  computed: {

  },

  mounted() {
    this.getDahboard()
  },
  setup() {
    const resolveTransactinsStatusVariantAndIcon = status => {
      if (status === true) return { variant: 'light-success', icon: 'CheckCircleIcon' }

      return { variant: 'light-danger', icon: 'InfoIcon' }
    }

    const resolveTransactionsMethod = method => {
      if (method === 'received_money') return { variant: 'light-success', icon: 'ArrowDownRightIcon' }

      return { variant: 'light-info', icon: 'ArrowUpLeftIcon' }
    }

    return {
      resolveTransactinsStatusVariantAndIcon,
      resolveTransactionsMethod,
    }
  },
  methods: {
    async getDahboard(params) {
      try {
        const { data } = await axios.get(`admin/statistics?country_id=${this.currentCountry.id}`, { params })
        this.dashboard = data.data
      } catch (error) {
        if (error.response.status === 500) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Server Error',
              icon: 'BellIcon',
              variant: 'danger',
            },
          })
        }
      }
    },
  },
}
</script>

<style>

</style>
