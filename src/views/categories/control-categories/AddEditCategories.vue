<template>
  <b-card>
    <validation-observer
      ref="infoRules"
      v-slot="{ invalid }"
      tag="form"
    >
      <b-row>
        <b-col md="6">
          <!-- Name (En)-->
          <validation-provider
            #default="validationContext"
            name="Name (En)"
            rules="required"
          >
            <b-form-group
              label="Name (En)"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="categoryForm.en_name"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Name (En)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- name -->
          <validation-provider
            #default="validationContext"
            name="Name (Ar)"
            rules="required"
          >
            <b-form-group
              label="Name (Ar)"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="categoryForm.ar_name"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Name (Ar)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>

        <b-col cols="6">
          <b-media
            no-body
            class="mb-1"
          >
            <b-media-aside>
              <b-link>
                <b-img
                  ref="previewEl"
                  v-img
                  rounded
                  :src="categoryForm.image"
                  height="100"
                  width="100"
                />
              </b-link>
              <!--/ image -->
            </b-media-aside>

            <b-media-body>
              <!-- upload button -->
              <b-button
                variant="primary"
                size="sm"
                class="mb-75 mr-75"
                @click="selectImg()"
              >
                Upload Image
              </b-button>
              <b-form-file
                ref="refImg"
                accept=".jpg, .png, .jpeg"
                :hidden="true"
                plain
                @change="changeImage($event)"
              />
              <!--/ upload button -->
            </b-media-body>
          </b-media>
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
            :disabled="invalid || Object.values(errors).length > 0"
            @click="addcategory()"
          >
            Save Changes
          </b-button>
          <b-button
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            :disabled="invalid || Object.values(errors).length > 0"
            @click="addcategory()"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'

export default {
  data() {
    return {
      required,
      id: this.$store.state.generalIds.id,
      loader: false,
      file: '',
      image: '',
      en_image: '',
      errors: {},

    }
  },
  setup() {
    const { getValidationState } = formValidation()
    const categoryForm = ref({
      image: null,

    })
    // eslint-disable-next-line camelcase
    const file = ref('')

    return {
      getValidationState,
      categoryForm,
      file,
    }
  },
  mounted() {
    this.showCategory()
  },
  methods: {

    selectImg() {
      this.$refs.refImg.$el.click()
    },

    changeImage(e) {
      // eslint-disable-next-line prefer-destructuring
      this.image = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.categoryForm.image = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.image = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    showCategory() {
      if (this.$route.params.id) {
        axios.get(`admin/categories/${this.$route.params.id}`).then(res => {
          // eslint-disable-next-line prefer-destructuring
          this.categoryForm = res.data.data[0]
        })
      } else {
        return false
      }
      return true
    },
    addcategory() {
      if (this.$route.params.id) {
        this.loader = true
        const formData = new FormData()
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.categoryForm) {
          if (key !== 'image') {
            formData.append(key, this.categoryForm[key])
            console.log(key, this.categoryForm[key])
          }
        }
        formData.delete('image')
        formData.delete('features')
        formData.delete('created_at')

        if (this.image) {
          formData.append('image', this.image)
        }
        axios.post(`admin/categories/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'categories' })
            this.$toasted.show('Updated Successfully', {
              name: 'top-center',
              duration: 3000,
            })
          }
        }).finally(() => {
          this.loader = false
        })
      } else {
        const formData = new FormData()
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.categoryForm) {
          if (key !== 'image') {
            formData.append(key, this.categoryForm[key])
            console.log(key, this.categoryForm[key])
          }
        }
        formData.delete('image')
        if (this.image) {
          formData.append('image', this.image)
        }

        this.loader = true
        axios.post('admin/categories', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'categories' })
            this.$toasted.show('Created Successfully', {
              name: 'top-center',
              duration: 3000,
            })
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
      }
    },

  },

}
</script>

  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  </style>
