<template>
  <div class="d-flex justify-content-center">
    <b-col
      cols="12"
      md="4"
    >
      <b-card>
        <div class="contact-box center-version">
          <div class="d-flex align-items-center flex-column">

            <div>
              <b-avatar
                size="100"
                :src="contact.image"
                :text="avatarText(contact.name)"
                class="mb-2"
              />
            </div>
            <h3 class="mb-2">
              <strong>{{ contact.name }} </strong>
            </h3>

          </div>
          <div class="product_gifts-info">
            <ul>
              <li>
                <feather-icon
                  icon="UserIcon"
                /> position: {{ contact.position }}
              </li>
              <li>
                <feather-icon
                  icon="LayoutIcon"
                /> Company: {{ contact.company }}
              </li>
              <li>
                <feather-icon
                  icon="MailIcon"
                /> Email: {{ contact.email }}
              </li>
              <li>
                <feather-icon
                  icon="PhoneIcon"
                /> Mobile : {{ contact.mobile }}
              </li>
              <li>
                <feather-icon
                  icon="CalendarIcon"
                /> Created At : {{ contact.created_at | formatDate }}
              </li>
              <li>
                <feather-icon
                  icon="CalendarIcon"
                /> Updated At : {{ contact.updated_at | formatDate }}
              </li>

              <li>
                <feather-icon
                  icon="ColumnsIcon"
                /> Message Details : {{ contact.message }}
              </li>

            </ul>
          </div>
        </div>
      </b-card>

    </b-col>
  </div>

</template>

<script>
import axios from 'axios'
import { ref } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
  },

  setup() {
    const contact = ref({})

    return {
      contact,
      avatarText,

    }
  },
  mounted() {
    this.viewcontact(this.$route.params.id)
  },
  methods: {

    async viewcontact(id) {
      if (id) {
        await axios.get(`admin/contacts/${id}`).then(res => {
          if (res.status === 200) {
            this.contact = res.data?.data
          }
        })
      }
    },

  },
}
</script>

  <style scoped lang="scss">
  .padd span {
    padding: 2px;
  }
  .change-status {
    cursor: pointer;
  }
  .product_gifts-info ul {
  list-style: none;
  li {
    padding-top: 1rem;
  }
}
  </style>
