<template>
  <b-card>
    <div
      v-if="loader"
      class=" text-center my-2"
    >
      <b-spinner
        type="grow"
        label="Loading..."
      />
    </div>
    <validation-observer
      v-else
      ref="infoRules"
      tag="form"
    >
      <b-row>
        <b-col md="6">
          <!-- Email -->
          <validation-provider
            #default="validationContext"
            name="Email"
          >
            <b-form-group
              label="Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="socialForm.email"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Email"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- Mobile -->
          <validation-provider
            #default="validationContext"
            name="Mobile"
          >
            <b-form-group
              label="Mobile"
              label-for="Mobile"
            >
              <b-form-input
                id="Mobile"
                v-model="socialForm.mobile"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Mobile"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- landline -->

          <validation-provider
            #default="validationContext"
            name="Landline"
          >
            <b-form-group
              label="Landline"
              label-for="landline"
            >
              <b-form-input
                id="landline"
                v-model="socialForm.landline"
                trim
                autofocus
                placeholder="Landline"
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
            name="linkedin"
          >
            <b-form-group
              label="linkedin"
              label-for="Link"
            >
              <b-form-input
                id="linkedin"
                v-model="socialForm.linkedin"
                trim
                autofocus
                placeholder="linkedin"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- facebook -->
          <validation-provider
            #default="validationContext"
            name="facebook"
          >
            <b-form-group
              label="facebook"
              label-for="Facebook"
            >
              <b-form-input
                id="Facebook"
                v-model="socialForm.facebook"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Facebook"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- twitter -->
          <validation-provider
            #default="validationContext"
            name="twitter"
          >
            <b-form-group
              label="Twitter"
              label-for="Twitter"
            >
              <b-form-input
                id="twitter"
                v-model="socialForm.twitter"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Twitter"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- insagram -->
          <validation-provider
            #default="validationContext"
            name="insagram"
          >
            <b-form-group
              label="Insagram"
              label-for="Insagram"
            >
              <b-form-input
                id="insagram"
                v-model="socialForm.insagram"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Insagram"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>

      </b-row>
      <b-row>
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
                  :src="socialForm.en_color_logo"
                  height="80"
                  width="300"
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
                Upload Color Logo (En)
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
                  :src="socialForm.ar_color_logo"
                  height="80"
                  width="300"
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
                Upload Color Logo (Ar)
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
                  :src="socialForm.en_white_logo"
                  height="80"
                  width="300"
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
                @click="selectEnWLogo()"
              >
                Upload White Logo (En)
              </b-button>
              <b-form-file
                ref="refEnWLogo"
                accept=".jpg, .png, .jpeg"
                :hidden="true"
                plain
                @change="changeEnWLogo($event)"
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
                  :src="socialForm.ar_white_logo"
                  height="80"
                  width="300"
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
                @click="selectArWLogo()"
              >
                Upload White Logo (Ar)
              </b-button>
              <b-form-file
                ref="refArWLogo"
                accept=".jpg, .png, .jpeg"
                :hidden="true"
                plain
                @change="changeArWLogo($event)"
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
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            @click="addSocial()"
          >
            Save Changes
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
      ar_color_logo: '',
      en_color_logo: '',
      ar_white_logo: '',
      en_white_logo: '',
    }
  },
  setup() {
    const { getValidationState } = formValidation()
    const socialForm = ref({
      ar_color_logo: null,
      en_color_logo: null,
      ar_white_logo: null,
      en_white_logo: null,

    })
    // eslint-disable-next-line camelcase
    const file = ref('')

    return {
      getValidationState,
      socialForm,
      file,
    }
  },
  mounted() {
    this.showSocial()
  },
  methods: {
    selectArWLogo() {
      this.$refs.refArWLogo.$el.click()
    },
    selectEnWLogo() {
      this.$refs.refEnWLogo.$el.click()
    },
    selectArImg() {
      this.$refs.refArImg.$el.click()
    },
    selectEnImg() {
      this.$refs.refEnImg.$el.click()
    },
    changeArWLogo(e) {
      // eslint-disable-next-line prefer-destructuring
      this.ar_white_logo = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.socialForm.ar_white_logo = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.ar_white_logo = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    changeEnWLogo(e) {
      // eslint-disable-next-line prefer-destructuring
      this.en_white_logo = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.socialForm.en_white_logo = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.en_white_logo = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    changeEnImage(e) {
      // eslint-disable-next-line prefer-destructuring
      this.en_color_logo = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.socialForm.en_color_logo = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.en_color_logo = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    changeArImage(e) {
      // eslint-disable-next-line prefer-destructuring
      this.ar_color_logo = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.socialForm.ar_color_logo = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.ar_color_logo = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    showSocial() {
      this.loader = true

      axios.get('admin/socials').then(res => {
        this.loader = false

        this.socialForm = res.data.data
      })
    },
    addSocial() {
      const formData = new FormData()
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in this.socialForm) {
        if (key !== 'ar_color_logo' || key !== 'en_color_logo' || key !== 'en_white_logo' || key !== 'ar_white_logo') {
          formData.append(key, this.socialForm[key])
          console.log(key, this.socialForm[key])
        }
      }
      formData.delete('ar_color_logo')
      formData.delete('en_color_logo')
      formData.delete('ar_white_logo')
      formData.delete('en_white_logo')
      if (this.ar_white_logo) {
        formData.append('ar_white_logo', this.ar_white_logo)
      }
      if (this.en_white_logo) {
        formData.append('en_white_logo', this.en_white_logo)
      }
      if (this.ar_color_logo) {
        formData.append('ar_color_logo', this.ar_color_logo)
      }
      if (this.en_color_logo) {
        formData.append('en_color_logo', this.en_color_logo)
      }

      this.loader = true
      axios.put('admin/socials', formData).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.showSocial()
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
  },

}
</script>

  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  </style>
