<template>
  <b-card>
    <validation-observer
      ref="infoRules"
      v-slot="{ invalid }"
      tag="form"
    >
      <b-row
        v-for="index in brandsCount"
        :key="index"
        class="w-100 m-0"
      >
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
                v-model="brandForm[index - 1].value"
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
          <validation-provider
            #default="validationContext"
            name="Languages"
          >
            <b-form-group
              label="Languages"
              label-for="Languages"
            >
              <v-select
                v-model="brandForm[index - 1].langId"
                :options="langs"
                :filterable="false"
                label="name"
                :reduce="langs => langs.id"
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

                <div class="conOfImage">
                  <b-img
                    ref="previewEl"
                    v-img
                    rounded
                    :src="brandForm[index - 1].image"
                    height="100"
                    width="100"
                  />
                </div>
              </b-link>
              <!--/ image -->
            </b-media-aside>

            <b-media-body>
              <!-- upload button -->
              <b-button
                variant="primary"
                size="sm"
                class="mb-75 mr-75"
                @click="selectImage(index-1)"
              >
                Upload image
              </b-button>
              <b-form-file
                :ref="`refImage${index-1}`"
                accept=".jpg, .png, .jpeg"
                :hidden="true"
                plain
                @change="changeImage($event,index-1)"
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
            @click="addBrand()"
          >
            Save Changes
          </b-button>
          <b-button
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            :disabled="invalid || Object.values(errors).length > 0"
            @click="addBrand()"
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
import vSelect from 'vue-select'

import axios from 'axios'
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
      loader: false,
      file: '',
      image: '',
      en_image: '',
      errors: {},
      langs: [],
      brandsCount: 1,

    }
  },
  setup() {
    const { getValidationState } = formValidation()
    const brandForm = ref([{
      value: '',
      langId: '',
      image: null,

    }])
    // eslint-disable-next-line camelcase
    const file = ref('')
    const images = ref([])
    return {
      getValidationState,
      brandForm,
      file,
      images,
    }
  },
  mounted() {
    this.showBrand()
    this.getLangs()
  },
  methods: {

    selectImage(index) {
      this.$refs[`refImage${index}`][0].$el.click()
    },

    changeImage(e, index) {
      // eslint-disable-next-line prefer-destructuring
      this.images[index] = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.brandForm[index].image = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.images[index] = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    getLangs() {
      axios.get('Languages').then(res => {
        if (res.status === 200 || res.status === 201) {
          this.langs = res.data.data
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
      })
    },
    showBrand() {
      if (this.$route.params.id) {
        axios.get(`Brand/${this.$route.params.id}`).then(res => {
          // eslint-disable-next-line prefer-destructuring
          this.brandForm = res.data.data
        })
      } else {
        return false
      }
      return true
    },
    addBrand() {
      if (this.$route.params.id) {
        this.loader = true
        const formData = new FormData()
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        if (this.brandForm) {
          // eslint-disable-next-line no-restricted-syntax
          for (let index = 0; index < this.brandsCount; index += 1) {
            if (this.brandForm[index].id === undefined) {
              formData.append(`NameByLang[${index}][langId]`, this.brandForm[index].langId)
              formData.append(`NameByLang[${index}][value]`, this.brandForm[index].value)
              formData.append('Image', this.images[index])
            }
          }
        }
        formData.delete('image')

        axios.post(`Brand/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'brands' })
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
        if (this.brandForm) {
          // eslint-disable-next-line no-restricted-syntax
          for (let index = 0; index < this.brandsCount; index += 1) {
            if (this.brandForm[index].id === undefined) {
              formData.append(`NameByLang[${index}][langId]`, this.brandForm[index].langId)
              formData.append(`NameByLang[${index}][value]`, this.brandForm[index].value)
              formData.append('Image', this.images[index])
            }
          }
        }
        formData.delete('image')
        this.loader = true
        axios.post('Brand', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'brands' })
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
