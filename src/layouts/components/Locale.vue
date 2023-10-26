<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    right
  >

    <template #button-content>

      <span class="ml-50 text-body">{{ currentLocale.name }}</span>
    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.code"
      @click="storeLanguage(localeObj.code)"
    >

      <span class="ml-50">{{ localeObj.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig'
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ref } from '@vue/composition-api'

export default {
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      return this.locales.find(l => l.code === this.$i18n.locale)
    },
  },
  setup() {
    /* eslint-disable global-require */
    const locales = ref([])

    const {
      isRTL,
    } = useAppConfig()
    return {
      locales,
      isRTL,
    }
  },
  mounted() {
    this.getLangs()
  },
  methods: {
    getLangs() {
      axios.get('Languages').then(res => {
        if (res.status === 200 || res.status === 201) {
          this.locales = res.data.data
        }
      }).catch(error => {
        if (error.response.status === 500) {
          this.$toast({
            component: ToastificationContent,
            props: {
              link: 'Somthing Went Wrong',
              icon: 'BellIcon',
              variant: 'error',
            },
          })
        }
      }).finally(() => {
        this.loader = false
      })
    },
    storeLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('language_code', lang)
      const la = localStorage.getItem('language_code')
      if (la === 'de') {
        this.isRTL = true
      } else {
        this.isRTL = false
      }
    },
  },
}
</script>

<style>

</style>
