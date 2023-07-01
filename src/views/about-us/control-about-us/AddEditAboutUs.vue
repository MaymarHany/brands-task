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
                v-model="typeForm.en_title"
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
                v-model="typeForm.ar_title"
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
                v-model="typeForm.content_en"
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
                v-model="typeForm.content_ar"
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
                v-model="typeForm.position"
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
      </b-row>
      <div
        class="d-flex justify-content-end "
      >
        <b-button
          variant="primary"
          class="mb-1"
          @click="addCard()"
        >
          add Card
        </b-button>
      </div>
      <b-row
        v-for="index in cardsCount"
        :key="index"
      >
        <b-col cols="12">
          <div class="d-flex justify-content-between">
            <p class="primary--text">
              Card {{ index }}
              <!-- <feather-icon
                v-b-tooltip.hover
                class="pointer"
                title="Edit"
                icon="EditIcon"
                color="#f48a36"
                @click="openCardDialog(cards[index - 1])"
              /> -->
            </p>
            <feather-icon
              v-b-tooltip.hover
              class="pointer"
              title="delete"
              icon="Trash2Icon"
              color="red"
              @click="deleteCard(cards[index - 1].id,index)"
            />
          </div>

        </b-col>
        <b-col md="6">
          <!-- Name -->
          <validation-provider
            #default="validationContext"
            :name="`Title (En) ${index}`"
            rules="required"
          >
            <b-form-group
              label="Title (En)"
              label-for="name"
            >
              <b-form-input
                :id="`Title (En) ${index}`"
                v-model="cards[index - 1].title_en"
                autofocus
                :readonly="cards[index - 1].id!==undefined"
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
          <!-- Name -->
          <validation-provider
            #default="validationContext"
            :name="`Title (Ar) ${index}`"
            rules="required"
          >
            <b-form-group
              label="Title (Ar)"
              label-for="name"
            >
              <b-form-input
                :id="`Title (Ar) ${index}`"
                v-model="cards[index - 1].title_ar"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                :readonly="cards[index - 1].id!==undefined"

                placeholder="Title"
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
            :name="`Content (En) ${index}`"
          >
            <b-form-group
              label="Content (En)"
              label-for="description"
            >
              <b-form-textarea
                :id="`Content (En) ${index}`"
                v-model="cards[index - 1].content_en"
                trim
                :readonly="cards[index - 1].id!==undefined"
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
        <b-col md="6">
          <validation-provider
            #default="validationContext"
            rules="required"
            :name="`Content (Ar) ${index}`"
          >
            <b-form-group
              label="Content (Ar)"
              label-for="description"
            >
              <b-form-textarea
                :id="`Content (Ar) ${index}`"
                v-model="cards[index - 1].content_ar"
                trim
                :readonly="cards[index - 1].id!==undefined"
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
      </b-row>

      <div>
        <b-modal
          id="editCard"
          ref="editCard"
          hide-footer
          centered
          title="Edit Card"
        >
          <validation-observer
            ref="infoRules"
            tag="form"
          >
            <b-row>

              <b-col md="6">
                <!-- Name -->
                <validation-provider
                  #default="validationContext"
                  name="Title"
                  rules="required"
                >
                  <b-form-group
                    label="Title (En)"
                    label-for="name"
                  >
                    <b-form-input
                      id="name"
                      v-model="cardEdit.title_en"
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
                <!-- Name -->
                <validation-provider
                  #default="validationContext"
                  name="Title"
                  rules="required"
                >
                  <b-form-group
                    label="Title (Ar)"
                    label-for="name"
                  >
                    <b-form-input
                      id="name"
                      v-model="cardEdit.title_ar"
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
                <validation-provider
                  #default="validationContext"
                  rules="required"
                  name="Content"
                >
                  <b-form-group
                    label="Content (En)"
                    label-for="description"
                  >
                    <b-form-textarea
                      id="description"
                      v-model="cardEdit.content_en"
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
              <b-col md="6">
                <validation-provider
                  #default="validationContext"
                  rules="required"
                  name="Content"
                >
                  <b-form-group
                    label="Content (Ar)"
                    label-for="description"
                  >
                    <b-form-textarea
                      id="description"
                      v-model="cardEdit.content_ar"
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
            </b-row></validation-observer>

          <b-col
            cols="12"
            md="12"
          >
            <b-button
              v-if="!loaderCard"
              variant="primary"
              class="mr-1"
              @click.prevent="editCard"
            >
              Save
            </b-button>
            <b-button
              variant="outline-danger"
              class="closeModal"
              @click="closeModal()"
            >
              Cancel
            </b-button>
            <b-button
              v-if="loaderCard"
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
        </b-modal>
      </div>
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
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    FeatherIcon,
  },
  data() {
    return {
      id: this.$route.params.id,
      isVoucher: false,
      required,
      allSelected: [],
      indeterminate: false,
      countries: [],
      users: [],
      loader: false,
      loaderCard: false,
      validationErrors: {},
      errorMsg: '',
      errors: {},
      file: '',
      dataLoad: false,
      cardsCount: 1,
      videosCount: 1,

      cardEdit:
        {
          title_en: '',
          title_ar: '',
          content_ar: '',
          content_en: '',

        },

      cards: [
        {
          title_en: '',
          title_ar: '',
          content_ar: '',
          content_en: '',

        },
      ],

    }
  },
  setup() {
    const { getValidationState } = formValidation()
    // eslint-disable-next-line camelcase
    const images = ref([])

    const typeForm = ref({
      type: 'ABOUT_US',
    })
    return {
      getValidationState,
      typeForm,
      images,
    }
  },
  mounted() {
    // this.showType()
  },
  methods: {
    getId(video) {
      return this.$youtube.getIdFromUrl(video.url)
    },
    selectFile() {
      this.$refs.refInputEl.$el.click()
    },
    previewVideo() {
      const video = document.getElementById('video-preview')
      const reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.addEventListener('load', () => {
        video.src = reader.result
      })
    },
    closeModal() {
      this.$refs.editCard.hide()
    },
    addCard() {
      this.cards.push({
        title_en: '',
        title_ar: '',
        content_ar: '',
        content_en: '',

      })
      this.cardsCount += 1
    },
    addVideo() {
      this.videos.push({
        url: '',
      })
      this.videosCount += 1
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
            this.typeForm.images.push({ url })
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
        this.typeForm.images.splice(index, 1)
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
        axios.get(`about-us-sections/${this.$route.params.id}`).then(res => {
          this.typeForm = res.data.data.campaign

          if (this.typeForm.cards.length > 0) {
            this.cards = this.typeForm.cards
            this.cardsCount = this.typeForm.cards.length
          } else {
            this.cards = [{
              title_en: '',
              title_ar: '',
              content_ar: '',
              content_en: '',

            }]
            this.cardsCount = 1
          }

          this.videos = this.typeForm.videos
          this.videosCount = this.typeForm.videos.length
        }).catch(() => {
          // this.formData = new FormData()
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
      axios.post(`admin/card_update/${this.cardEdit.id}`, this.cardEdit).then(res => {
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
        if (this.cards) {
          // eslint-disable-next-line no-restricted-syntax
          for (let index = 0; index < this.cardsCount; index += 1) {
            if (this.cards[index].id === undefined) {
              formData.append(`cards[${index}][title_ar]`, this.cards[index].title_ar)
              formData.append(`cards[${index}][title_en]`, this.cards[index].title_en)
              formData.append(`cards[${index}][content_ar]`, this.cards[index].content_ar)
              formData.append(`cards[${index}][content_en]`, this.cards[index].content_en)
            }
          }
        }

        formData.append('product_gift_id', this.$route.params.id)

        axios.post(`about-us-sections/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200) {
            this.$router.push({ name: 'campaigns' })
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

        if (this.cards) {
          // eslint-disable-next-line no-restricted-syntax
          for (const card of this.cards) {
            formData.append('cards[]', card)
          }
        }

        axios.post('about-us-sections', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'campaigns' })
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
  video{width: 200px;
  margin: 0px 10px}

  </style>
