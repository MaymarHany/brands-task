<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>
    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <notification-dropdown /> -->
      <locale-vue />
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ accountForm.FullName }}
            </p>

          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
// import { getAuth, signOut } from 'firebase/auth'

import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { mapGetters } from 'vuex'
import NotificationDropdown from './NotificationDropdown.vue'
import LocaleVue from './Locale.vue'

export default {
  components: {
    LocaleVue,
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    // eslint-disable-next-line vue/no-unused-components
    BDropdownDivider,
    BAvatar,
    // Navbar Components
    DarkToggler,
    // eslint-disable-next-line vue/no-unused-components
    NotificationDropdown,
  },

  Localeprops: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      countries: {},
      country_id: 1,
    }
  },
  computed: {
    ...mapGetters({
      accountForm: 'login/userInfo',
    }),

  },
  mounted() {
  },

  methods: {
    logout() {
      // const auth = getAuth()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user_info')
      this.$router.push({ name: 'login' })
    },

    // getUser() {
    //   const { userInfo } = this.$store.getters.login.userInfo
    //   this.accountForm = userInfo
    //   console.log(userInfo)
    // },
  },
}
</script>

<style scoped>
span.balance {
    font-size: 16px;
    padding-top: 5px;
    font-weight: bold;
}
</style>
