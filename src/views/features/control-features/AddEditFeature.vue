<template>
  <b-card>
    <validation-observer
      ref="infoRules"
      tag="form"
    >
      <b-row>
        <b-col md="6">
          <!-- Title -->
          <validation-provider
            #default="validationContext"
            name="Title (En)"
            rules="required"
          >
            <b-form-group
              label="Title (En)"
              label-for="title"
            >
              <b-form-input
                id="title"
                v-model="featuresForm.en_title"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Title"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- Title -->
          <validation-provider
            #default="validationContext"
            name="Title (Ar)"
            rules="required"
          >
            <b-form-group
              label="Title (Ar)"
              label-for="title"
            >
              <b-form-input
                id="title"
                v-model="featuresForm.ar_title"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Title"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- Description -->

          <validation-provider
            #default="validationContext"
            rules="required"
            name="Description (En)"
          >
            <b-form-group
              label="Description (En)"
              label-for="description"
            >
              <b-form-textarea
                id="description"
                v-model="featuresForm.en_description"
                trim
                type="text"
                placeholder="Description"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- Description -->

          <validation-provider
            #default="validationContext"
            rules="required"
            name="Description (Ar)"
          >
            <b-form-group
              label="Description (Ar)"
              label-for="description"
            >
              <b-form-textarea
                id="description"
                v-model="featuresForm.ar_description"
                trim
                type="text"
                placeholder="Description"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <validation-provider
            #default="validationContext"
            name="Categories"
          >
            <b-form-group
              label="Categories"
              label-for="Categories"
            >
              <v-select
                v-model="featuresForm.category_id"
                :options="categories"
                :filterable="false"
                label="en_name"
                :reduce="categories => categories.id"
                @search="searchCategories"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col
          v-if="errorMsg"
          cols="12"
        >
          <p class="text-danger">
            {{ errorMsg }}
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          class="mt-50"
        >
          <b-button
            v-if="!loader && $route.params.id"
            variant="primary"
            class="mr-1"
            @click="addfeatures()"
          >
            Save Changes
          </b-button>
          <b-button
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            @click="addfeatures()"
          >
            Add
          </b-button>
          <b-button
            v-if="loader"
            variant="primary"
            disabled
            class="mr-1"
          >
            <b-spinner
              small
              type="grow"
            />
            Loading...
          </b-button>
        </b-col>

      </b-row>
    </validation-observer>
  </b-card>
</template>

<script>
import { ref } from '@vue/composition-api'
import formValidation from '@core/comp-functions/forms/form-validation'
import { required } from '@validations'
import axios from 'axios'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      required,
      id: this.$store.state.generalIds.id,
      selected: [],
      allSelected: [],
      indeterminate: false,
      categories: [],
      countryId: '',
      loader: false,
      errorMsg: '',

    }
  },
  setup() {
    const { getValidationState } = formValidation()
    const featuresForm = ref({
    })
    // eslint-disable-next-line camelcase
    const flag_image = ref('')

    return {
      getValidationState,
      featuresForm,
      flag_image,
    }
  },
  mounted() {
    this.getCategories()
    this.showfeatures()
  },
  methods: {
    // eslint-disable-next-line consistent-return
    toggleAll(value, key) {
      if (this.allSelected[key]) {
        // eslint-disable-next-line array-callback-return
        value.items.map(item => {
          this.featuresForm.permission.push(item.id)
        })
      } else {
        // eslint-disable-next-line array-callback-return
        value.items.map(item => {
          this.featuresForm.permission.splice(this.featuresForm.permission.indexOf(item.id), 1)
        })
      }
    },

    showfeatures() {
      if (this.$route.params.id) {
        axios.get(`admin/features/${this.$route.params.id}`).then(res => {
          this.featuresForm = res.data.data
        })
      } else {
        return false
      }
      return true
    },
    async searchCategories(searchQuery) {
      await axios.get(`admin/categories?search=${searchQuery}`).then(res => {
        if (res.status === 200) {
          this.categories = res.data?.data.categories
        }
      })
    },

    async getCategories() {
      await axios.get('admin/categories').then(res => {
        if (res.status === 200) {
          this.categories = res.data?.data
        }
      })
    },
    addfeatures() {
      if (this.$route.params.id) {
        this.loader = true
        const formData = new FormData()

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.featuresForm) {
          formData.append(key, this.featuresForm[key])
        }
        formData.delete('created_at')

        axios.post(`admin/features/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'features' })
            this.$toasted.show('Updated Successfully', {
              position: 'top-center',
              duration: 3000,
            })
          }
        }).catch(error => {
          console.log(error.response, 'error')
          if (error.response.status === 500) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Ooops!!! An Unexpected Internal server error',
                icon: 'BellIcon',
                variant: 'danger',
              },
            })
          } else if (error.response.status === 400) {
            this.errorMsg = error.response.data.error
          }
        }).finally(() => {
          this.loader = false
        })
      } else {
        const formData = new FormData()

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.featuresForm) {
          formData.append(key, this.featuresForm[key])
        }

        this.loader = true
        axios.post('admin/features', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'features' })
            this.$toasted.show('Created Successfully', {
              position: 'top-center',
              duration: 3000,
            })
          }
        }).catch(error => {
          if (error.response.status === 500) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Ooops!!! An Unexpected Internal server error',
                icon: 'BellIcon',
                variant: 'danger',
              },
            })
          } else if (error.response.status === 400) {
            this.errorMsg = error.response.data.error
          }
        }).finally(() => {
          this.loader = false
        })
      }
    },

  },

}
</script>

  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  </style>
