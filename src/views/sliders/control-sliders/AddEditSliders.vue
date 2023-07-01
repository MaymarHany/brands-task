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
                v-model="sliderForm.en_title"
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
                v-model="sliderForm.ar_title"
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
          <!-- Caption -->

          <validation-provider
            #default="validationContext"
            rules="required"
            name="Caption (En)"
          >
            <b-form-group
              label="Caption (En)"
              label-for="Link"
            >
              <b-form-textarea
                id="Link"
                v-model="sliderForm.en_caption"
                trim
                type="text"
                placeholder="Caption"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- Caption -->

          <validation-provider
            #default="validationContext"
            rules="required"
            name="Caption (Ar)"
          >
            <b-form-group
              label="Caption (Ar)"
              label-for="Link"
            >
              <b-form-textarea
                id="Link"
                v-model="sliderForm.ar_caption"
                trim
                type="text"
                placeholder="Caption"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- Link -->
          <validation-provider
            #default="validationContext"
            name="Link (En)"
            rules="required"
          >
            <b-form-group
              label="Link (En)"
              label-for="link"
            >
              <b-form-input
                id="link"
                v-model="sliderForm.en_link"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Link"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- Link -->
          <validation-provider
            #default="validationContext"
            name="Link (Ar)"
            rules="required"
          >
            <b-form-group
              label="Link (Ar)"
              label-for="link"
            >
              <b-form-input
                id="link"
                v-model="sliderForm.ar_link"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Link"
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
                  :src="sliderForm.en_image"
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
                @click="selectEnImg()"
              >
                Upload Image (En)
              </b-button>
              <b-form-file
                ref="refEnImg"
                accept=".jpg, .png, .jpeg"
                :hidden="true"
                plain
                @change="changeEnImage($event)"
              />
              <!--/ upload button -->
            </b-media-body>
          </b-media>
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
                  :src="sliderForm.ar_image"
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
                @click="selectArImg()"
              >
                Upload Image (Ar)
              </b-button>
              <b-form-file
                ref="refArImg"
                accept=".jpg, .png, .jpeg"
                :hidden="true"
                plain
                @change="changeArImage($event)"
              />
              <!--/ upload button -->
            </b-media-body>
          </b-media>
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
            @click="addSlider()"
          >
            Save Changes
          </b-button>
          <b-button
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            @click="addSlider()"
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
      ar_image: '',
      en_image: '',
      errorMsg: '',

    }
  },
  setup() {
    const { getValidationState } = formValidation()
    const sliderForm = ref({
      ar_image: null,
      en_image: null,

    })
    // eslint-disable-next-line camelcase
    const file = ref('')

    return {
      getValidationState,
      sliderForm,
      file,
    }
  },
  mounted() {
    this.showSlider()
  },
  methods: {

    selectArImg() {
      this.$refs.refArImg.$el.click()
    },
    selectEnImg() {
      this.$refs.refEnImg.$el.click()
    },
    changeEnImage(e) {
      // eslint-disable-next-line prefer-destructuring
      this.en_image = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.sliderForm.en_image = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.en_image = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    changeArImage(e) {
      // eslint-disable-next-line prefer-destructuring
      this.ar_image = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.sliderForm.ar_image = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.ar_image = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    showSlider() {
      if (this.$route.params.id) {
        axios.get(`admin/sliders/${this.$route.params.id}`).then(res => {
          this.sliderForm = res.data.data
        })
      } else {
        return false
      }
      return true
    },
    addSlider() {
      if (this.$route.params.id) {
        this.loader = true
        const formData = new FormData()

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.sliderForm) {
          if (key !== 'ar_image' || key !== 'en_image') {
            formData.append(key, this.sliderForm[key])
          }
        }
        formData.delete('ar_image')
        formData.delete('en_image')
        if (this.ar_image) {
          formData.append('ar_image', this.ar_image)
        }
        if (this.en_image) {
          formData.append('en_image', this.en_image)
        }

        axios.post(`admin/sliders/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200) {
            this.$router.push({ name: 'sliders' })
            this.$toasted.show('Updated Successfully', {
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
      } else {
        const formData = new FormData()
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.sliderForm) {
          if (key !== 'ar_image' || key !== 'en_image') {
            formData.append(key, this.sliderForm[key])
            console.log(key, this.sliderForm[key])
          }
        }
        formData.delete('ar_image')
        formData.delete('en_image')
        if (this.ar_image) {
          formData.append('ar_image', this.ar_image)
        }
        if (this.en_image) {
          formData.append('en_image', this.en_image)
        }

        this.loader = true
        axios.post('admin/sliders', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'sliders' })
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
