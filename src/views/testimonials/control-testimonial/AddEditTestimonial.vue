<template>
  <b-card>
    <validation-observer
      ref="infoRules"
      tag="form"
    >
      <b-row>
        <b-col md="6">
          <!-- Name -->
          <validation-provider
            #default="validationContext"
            name="Name"
            rules="required"
          >
            <b-form-group
              label="Name"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="testimonialForm.name"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Name"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- position -->
          <validation-provider
            #default="validationContext"
            name="Position"
            rules="required"
          >
            <b-form-group
              label="Position"
              label-for="position"
            >
              <b-form-input
                id="position"
                v-model="testimonialForm.position"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Position"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>

        <b-col md="6">
          <!-- Content -->

          <validation-provider
            #default="validationContext"
            rules="required"
            name="Content"
          >
            <b-form-group
              label="Content"
              label-for="Content"
            >
              <b-form-textarea
                id="Content"
                v-model="testimonialForm.content"
                trim
                type="text"
                placeholder="Content"
                :state="getValidationState(validationContext)"
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
                  :src="testimonialForm.avatar"
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
            @click="addTestimonial()"
          >
            Save Changes
          </b-button>
          <b-button
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            @click="addTestimonial()"
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
      avatar: '',
      en_image: '',
      errorMsg: '',

    }
  },
  setup() {
    const { getValidationState } = formValidation()
    const testimonialForm = ref({
      avatar: null,

    })
    // eslint-disable-next-line camelcase
    const file = ref('')

    return {
      getValidationState,
      testimonialForm,
      file,
    }
  },
  mounted() {
    this.showTestimonial()
  },
  methods: {

    selectImg() {
      this.$refs.refImg.$el.click()
    },

    changeImage(e) {
      // eslint-disable-next-line prefer-destructuring
      this.avatar = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.testimonialForm.avatar = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.avatar = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    showTestimonial() {
      if (this.$route.params.id) {
        axios.get(`admin/testimonials/${this.$route.params.id}`).then(res => {
          this.testimonialForm = res.data.data
        })
      } else {
        return false
      }
      return true
    },
    addTestimonial() {
      if (this.$route.params.id) {
        this.loader = true
        const formData = new FormData()
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.testimonialForm) {
          if (key !== 'avatar') {
            formData.append(key, this.testimonialForm[key])
            console.log(key, this.testimonialForm[key])
          }
        }
        formData.delete('avatar')
        if (this.avatar) {
          formData.append('avatar', this.avatar)
        }
        axios.post(`admin/testimonials/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200) {
            this.$router.push({ name: 'testimonials' })
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
        for (const key in this.testimonialForm) {
          if (key !== 'avatar') {
            formData.append(key, this.testimonialForm[key])
            console.log(key, this.testimonialForm[key])
          }
        }
        formData.delete('avatar')
        if (this.avatar) {
          formData.append('avatar', this.avatar)
        }

        this.loader = true
        axios.post('admin/testimonials', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'testimonials' })
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
