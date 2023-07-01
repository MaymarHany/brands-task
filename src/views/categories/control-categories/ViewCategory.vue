<template>
  <div
    v-if="dataLoad"
    class="text-center mt-5"
  >
    <b-spinner
      type="grow"
      label="Loading..."
    />
  </div>
  <div
    v-else
    class="d-flex justify-content-center"
  >
    <b-col
      cols="12"
      md="12"
    >
      <b-card>
        <b-row>
          <b-col
            cols="12"
            md="3"
          >
            <div>
              <img
                class="w-100 catImg"
                :src="category.image"
              >
            </div>

          </b-col>
          <b-col
            cols="12"
            md="7"
          >
            <div>
              <h1 class="text-secondary font-weight-bold mb-2">
                {{ category.en_name }}
              </h1>
            </div>
            <div>
              <ul>
                <li
                  v-for="(feature, index) in category.features"
                  :key="index"
                >
                  <h4>
                    {{ feature.en_title }}
                  </h4>
                  <p>
                    {{ feature.en_description }}
                  </p>
                </li>
              </ul>
            </div>
          </b-col>
        </b-row>
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
    const category = ref({})
    const dataLoad = false
    return {
      category,
      dataLoad,
      avatarText,

    }
  },
  mounted() {
    this.viewcategory(this.$route.params.id)
  },
  methods: {

    async viewcategory(id) {
      if (id) {
        this.dataLoad = true
        await axios.get(`admin/categories/${id}`).then(res => {
          if (res.status === 200) {
            this.dataLoad = false

            this.category = res.data?.data[0]
          }
        })
      }
    },

  },
}
</script>

  <style scoped lang="scss">
  .catImg{
    border-radius:24px;

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
