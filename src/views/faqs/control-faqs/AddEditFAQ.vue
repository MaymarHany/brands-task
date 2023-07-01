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
            name="Question In Arabic"
            rules="required"
          >
            <b-form-group
              label="Question In Arabic"
              label-for="question_ar"
            >
              <b-form-input
                id="question_ar"
                v-model="FAQsForm.ar_question"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Question In Arabic"
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
            name="Question In English"
            rules="required"
          >
            <b-form-group
              label="Question In English"
              label-for="question_en"
            >
              <b-form-input
                id="question_en"
                v-model="FAQsForm.en_question"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="question In English"
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
            name="Answer In Arabic"
            rules="required"
          >
            <b-form-group
              label="Answer In Arabic"
              label-for="answer_ar"
            >
              <b-form-input
                id="answer_ar"
                v-model="FAQsForm.ar_answer"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Answer In Arabic"
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
            name="Answer In English"
            rules="required"
          >
            <b-form-group
              label="Answer In English"
              label-for="answer_en"
            >
              <b-form-input
                id="answer_en"
                v-model="FAQsForm.en_answer"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="answer In English"
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
            @click="addFaqs()"
          >
            Save Changes
          </b-button>
          <b-button
            v-if="!loader && !$route.params.id"
            variant="primary"
            class="mr-1"
            @click="addFaqs()"
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
  components: {
  },
  data() {
    return {
      required,
      id: this.$store.state.generalIds.id,
      selected: [],
      allSelected: [],
      indeterminate: false,
      allPermissions: [],
      users: [],
      countries: [],
      countryId: '',
      errorMsg: '',
      loader: false,
    }
  },
  setup() {
    const { getValidationState } = formValidation()
    const FAQsForm = ref({
    })
    // eslint-disable-next-line camelcase
    const flag_image = ref('')

    return {
      getValidationState,
      FAQsForm,
      flag_image,
    }
  },
  mounted() {
    this.showFaqs()
  },
  methods: {
    // eslint-disable-next-line consistent-return
    toggleAll(value, key) {
      if (this.allSelected[key]) {
        // eslint-disable-next-line array-callback-return
        value.items.map(item => {
          this.FAQsForm.permission.push(item.id)
        })
      } else {
        // eslint-disable-next-line array-callback-return
        value.items.map(item => {
          this.FAQsForm.permission.splice(this.FAQsForm.permission.indexOf(item.id), 1)
        })
      }
    },

    showFaqs() {
      if (this.$route.params.id) {
        axios.get(`admin/faqs/${this.$route.params.id}`).then(res => {
          this.FAQsForm = res.data.data
        })
      } else {
        return false
      }
      return true
    },

    addFaqs() {
      if (this.$route.params.id) {
        this.loader = true
        const formData = new FormData()

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in this.FAQsForm) {
          formData.append(key, this.FAQsForm[key])
        }

        axios.post(`admin/faqs/${this.$route.params.id}`, formData).then(res => {
          if (res.status === 200) {
            this.$router.push({ name: 'faqs' })
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
        for (const key in this.FAQsForm) {
          formData.append(key, this.FAQsForm[key])
        }

        this.loader = true
        axios.post('admin/faqs', formData).then(res => {
          if (res.status === 200 || res.status === 201) {
            this.$router.push({ name: 'faqs' })
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
                title: 'Somthing Went Wrong',
                icon: 'BellIcon',
                variant: 'error',
              },
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
        })
          .finally(() => {
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
