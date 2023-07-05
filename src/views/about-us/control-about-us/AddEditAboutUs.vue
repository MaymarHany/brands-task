<template>
  <div
    v-if="dataLoad"
    class=" text-center my-2"
  >
    <b-card>
      <b-spinner
        type="grow"
        label="Loading..."
      />
    </b-card>

  </div>
  <b-card v-else>
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
                v-model="aboutForm.title_en"
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
                v-model="aboutForm.title_ar"
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
          <!-- Content -->

          <validation-provider
            #default="validationContext"
            rules="required"
            name="Content"
          >
            <b-form-group
              label="Content (En)"
              label-for="Content"
            >
              <b-form-textarea
                id="Content"
                v-model="aboutForm.content_en"
                trim
                type="text"
                placeholder="Content (En)"
                :state="getValidationState(validationContext)"
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
              label="Content (Ar)"
              label-for="Content"
            >
              <b-form-textarea
                id="Content"
                v-model="aboutForm.content_ar"
                trim
                type="text"
                placeholder="Content (Ar)"
                :state="getValidationState(validationContext)"
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
                v-model="aboutForm.position"
                type="number"
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
                  :src="aboutForm.image"
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
        >  <b-button
             v-if="!loader && $route.params.id"
             variant="primary"
             class="mr-1"
             :disabled="invalid || Object.values(errors).length > 0 "
             @click="addType()"
           >
             Save Changes
           </b-button>
          <b-button
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            :disabled="invalid || Object.values(errors).length > 0"
            @click="addType()"
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
import axios from 'axios'
import { required } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'

export default {
  components: {
  },
  data() {
    return {
      id: this.$route.params.id,
      required,
      allSelected: [],
      indeterminate: false,
      loader: false,
      loaderCard: false,
      validationErrors: {},
      errorMsg: '',
      errors: {},
      file: '',
      dataLoad: false,
      cardsCount: 1,
      image: '',

    }
  },
  setup() {
    const { getValidationState } = formValidation()
    // eslint-disable-next-line camelcase
    const images = ref([])

    const aboutForm = ref({
      type: 'ABOUT_US',
      image: null,
    })
    return {
      getValidationState,
      aboutForm,
      images,
    }
  },

  mounted() {
    this.showType()
  },
  methods: {
    getId(video) {
      return this.$youtube.getIdFromUrl(video.url)
    },
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
            this.aboutForm.image = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.image = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    selectIcon(index) {
      this.$refs[`refIcon${index}`][0].$el.click()
    },

    changeIcon(e, index) {
      // eslint-disable-next-line prefer-destructuring
      this.images[index] = e.target.files[0]
      const input = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      img.onload = () => {
        if (input.files) {
          const reader = new FileReader()
          reader.onload = er => {
            this.cards[index].icon = er.target.result
          }

          // eslint-disable-next-line prefer-destructuring
          this.images[index] = input.files[0]
          reader.readAsDataURL(input.files[0])
        }
      }
    },
    closeModal() {
      this.$refs.editCard.hide()
    },

    changeProfile(e) {
      // eslint-disable-next-line prefer-destructuring
      // this.images = e.target.files[0]

      const input = e.target
      if (input.files) {
        for (let i = 0; i < input.files.length; i += 1) {
          const url = URL.createObjectURL(input.files[i])
          const img = new Image()
          img.src = window.URL.createObjectURL(input.files[i])
          img.onload = () => {
            this.aboutForm.images.push({ url })
            this.images.push(input.files[i])
          }
        }

        // eslint-disable-next-line prefer-destructuring
      }
    },
    deleteImg(id, index) {
      if (id) {
        axios.get(`admin/delete_campaign_media/${id}`).then(res => {
          if (res.status === 200) {
            this.showType()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Deleted Succesfully',
                icon: 'BellIcon',
                variant: 'success',
              },
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Server Error',
                icon: 'BellIcon',
                variant: 'danger',
              },
            })
          }
        }).catch(() => {
        // this.formData = new FormData()
        }).finally(() => {
          this.dataLoad = false
        })
      } else {
        this.aboutForm.images.splice(index, 1)
        this.images.splice(index, 1)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Deleted Succesfully',
            icon: 'BellIcon',
            variant: 'success',
          },
        })
      }
    },
    deleteCard(id, index) {
      if (this.cardsCount > 1) {
        if (id) {
          axios.get(`admin/delete_card/${id}`).then(res => {
            if (res.status === 200) {
              this.showType()
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Deleted Succesfully',
                  icon: 'BellIcon',
                  variant: 'success',
                },
              })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Server Error',
                  icon: 'BellIcon',
                  variant: 'danger',
                },
              })
            }
          }).catch(() => {
            // this.formData = new FormData()
          }).finally(() => {
            this.loader = false
          })
        } else {
          this.cards.splice(index, 1)
          this.cardsCount -= 1
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Deleted Succesfully',
              icon: 'BellIcon',
              variant: 'success',
            },
          })
        }
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'At Least one card is required',
            icon: 'BellIcon',
            variant: 'danger',
          },
        })
      }
    },
    deleteVideo(id, index) {
      if (id) {
        axios.get(`admin/delete_campaign_media/${id}`).then(res => {
          if (res.status === 200) {
            this.showType()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Deleted Succesfully',
                icon: 'BellIcon',
                variant: 'success',
              },
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Server Error',
                icon: 'BellIcon',
                variant: 'danger',
              },
            })
          }
        }).catch(() => {
          // this.formData = new FormData()
        }).finally(() => {
          this.loader = false
        })
      } else {
        this.videos.splice(index, 1)

        this.videosCount -= 1

        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Deleted Succesfully',
            icon: 'BellIcon',
            variant: 'success',
          },
        })
      }
    },
    openCardDialog(card) {
      this.cardEdit = card
      this.$refs.editCard.show()
    },
    showType() {
      this.dataLoad = true

      if (this.$route.params.id) {
        axios.get(`admin/about-us-show/${this.$route.params.id}`).then(res => {
          // eslint-disable-next-line prefer-destructuring
          this.aboutForm = res.data.data[0]
        }).catch(() => {
        }).finally(() => {
          this.dataLoad = false
        })
      } else {
        return false
      }
      return true
    },
    editCard() {
      this.loaderCard = true
      this.cardEdit.product_gift_id = this.cardEdit.id
      axios.post(`admin/about-us-sections/${this.cardEdit.id}`, this.cardEdit).then(res => {
        if (res.status === 200) {
          this.$refs.editCard.hide()

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
        } else if (error.response.status === 422) {
          this.errorMsg = error.response.data.errors
        }
      }).finally(() => {
        this.loaderCard = false
      })
    },
    addType() {
      if (this.$route.params.id) {
        this.loader = true
        const formData = new FormData()
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.aboutForm) {
          if (key !== 'image') {
            formData.append(key, this.aboutForm[key])
          }
        }
        formData.delete('image')
        if (this.image) {
          formData.append('image', this.image)
        }

        axios.post(`admin/about-us-sections/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'about-us' })
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
          } else if (error.response.status === 422) {
            this.errorMsg = error.response.data.errors
          }
        }).finally(() => {
          this.loader = false
        })
      } else {
        this.loader = true
        const formData = new FormData()
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.aboutForm) {
          if (key !== 'image') {
            formData.append(key, this.aboutForm[key])
          }
        }
        formData.delete('image')
        if (this.image) {
          formData.append('image', this.image)
        }

        axios.post('admin/about-us-sections', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'about-us' })
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
          } else if (error.response.status === 422) {
            this.errorMsg = error.response.data.errors
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

  .deleteImgIcon{
    cursor: pointer;
    color: grey;
  }
 .conOfIcon{
  background: linear-gradient(225.53deg, #4881FF -32.29%, #3BE692 135.95%);
  width: 48px;
height: 48px;
padding: 12px;
border-radius: 8px;

 }

  </style>
