<template>
  <b-card>
    <validation-observer
      ref="infoRules"
      v-slot="{ invalid }"
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
                v-model="featuresForm.title_en"
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
                v-model="featuresForm.title_ar"
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
          <!-- content -->

          <validation-provider
            #default="validationContext"
            rules="required"
            name="content (En)"
          >
            <b-form-group
              label="content (En)"
              label-for="content"
            >
              <quill-editor
                ref="myQuillEditor"
                v-model="featuresForm.content_en"
                :options="editorOption"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <!-- content -->

          <validation-provider
            #default="validationContext"
            rules="required"
            name="content (Ar)"
          >
            <b-form-group
              label="content (Ar)"
              label-for="content"
            >

              <quill-editor
                ref="myQuillEditor"
                v-model="featuresForm.content_ar"
                :options="editorOption"
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
            rules="required"
            name="About"
          >
            <b-form-group
              label="About Us Section (id - title)"
              label-for="About"
            >
              <v-select
                v-model="featuresForm.about_us_id"
                :options="about"
                :filterable="false"
                label="title"
                :reduce="about => about.id"
                @search="searchAbout"
              >
                <template
                  slot="option"
                  slot-scope="option"
                >
                  {{ option.id }} - {{ option.title }}
                </template>
                <template
                  slot="selected-option"
                  slot-scope="option"
                >
                  {{ option.id }} - {{ option.title }}
                </template>
              </v-select>

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
                <div class="conOfIcon">
                  <b-img
                    ref="previewEl"
                    v-img
                    rounded
                    :src="featuresForm.icon"
                    width="24"
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
                @click="selectIcon()"
              >
                Upload Image
              </b-button>
              <b-form-file
                ref="refIcon"
                accept=".jpg, .png, .jpeg"
                :hidden="true"
                plain
                @change="changeIcon($event)"
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
            :disabled="invalid || Object.values(errors).length > 0"
            @click="addfeatures()"
          >
            Save Changes
          </b-button>
          <b-button
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            :disabled="invalid || Object.values(errors).length > 0"
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
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    vSelect,
    quillEditor,
  },
  data() {
    return {
      required,
      id: this.$store.state.generalIds.id,
      selected: [],
      allSelected: [],
      indeterminate: false,
      about: [],
      countryId: '',
      loader: false,
      errorMsg: '',
      errors: {},
      icon: '',
      editorOption: {

        placeholder: 'Enter Text',
        theme: 'snow',
      },
    }
  },
  setup() {
    const { getValidationState } = formValidation()
    const featuresForm = ref({
      icon: null,
    })

    return {
      getValidationState,
      featuresForm,
    }
  },
  mounted() {
    this.getAbout()
    this.showfeatures()
  },
  methods: {
    selectIcon() {
      this.$refs.refIcon.$el.click()
    },

    changeIcon(e) {
      // eslint-disable-next-line prefer-destructuring
      this.icon = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.featuresForm.icon = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.icon = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },

    showfeatures() {
      if (this.$route.params.id) {
        axios.get(`admin/about-us-features/${this.$route.params.id}`).then(res => {
          // eslint-disable-next-line prefer-destructuring
          this.featuresForm = res.data.data[0]
        })
      } else {
        return false
      }
      return true
    },
    async searchAbout(searchQuery) {
      await axios.get(`admin/about-us/about_us?search=${searchQuery}`).then(res => {
        if (res.status === 200) {
          this.about = res.data?.data.about
        }
      })
    },

    async getAbout() {
      await axios.get('about-us/about_us').then(res => {
        if (res.status === 200) {
          this.about = res.data?.data
        }
      })
    },
    addfeatures() {
      if (this.$route.params.id) {
        this.loader = true
        const formData = new FormData()

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.featuresForm) {
          if (key !== 'icon') {
            formData.append(key, this.featuresForm[key])
          }
        }
        formData.delete('icon')
        formData.delete('created_at')

        if (this.icon) {
          formData.append('icon', this.icon)
        }

        axios.post(`admin/about-us-features/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'about-us-features' })
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
        for (const key in this.featuresForm) {
          if (key !== 'icon') {
            formData.append(key, this.featuresForm[key])
          }
        }
        formData.delete('icon')

        if (this.icon) {
          formData.append('icon', this.icon)
        }
        this.loader = true
        axios.post('admin/about-us-features', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'about-us-features' })
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
   .conOfIcon{
  background: linear-gradient(225.53deg, #4881FF -32.29%, #3BE692 135.95%);
  width: 48px;
height: 48px;
padding: 12px;
border-radius: 8px;

 }
  @import '@core/scss/vue/libs/vue-select.scss';
  </style>
