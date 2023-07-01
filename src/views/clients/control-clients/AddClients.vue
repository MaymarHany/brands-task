<template>
  <div>
    <validation-observer
      ref="infoRules"
      tag="form"
    >
      <b-row>

        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Logo"
            label-for="logo"
          >
            <b-form-file
              accept=".jpg, .png, .gif"
              placeholder="Choose file"
              @change="onChange"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          md="12"
        >
          <div class="border rounded p-1">
            <h4 class="mb-1">
              Logo
            </h4>
            <b-media
              no-body
              vertical-align="center"
            >
              <b-media-aside>
                <b-img
                  :src="preview"
                  height="120"
                  width="270"
                />
              </b-media-aside>
            </b-media>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          class="mt-50"
        >
          <b-button
            v-if="!loader"
            variant="primary"
            class="mr-1"
            @click="addClient()"
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
  </div>
</template>

<script>
import axios from 'axios'
import formValidation from '@core/comp-functions/forms/form-validation'

import handleFormData from '@/global-compositions/handleFormData'

export default {
  data() {
    return {

      userForm: {},
      id: this.$store.state.generalIds.id,
      loader: false,
      preview: null,
      image: null,
    }
  },
  setup() {
    const { getValidationState } = formValidation()

    const { formData, setFormData } = handleFormData()

    return {
      getValidationState,
      formData,
      setFormData,
    }
  },
  mounted() {
  },
  methods: {
    onChange(e) {
      this.userForm.logo = e.target?.files[0]
      const input = e.target
      if (input.files) {
        const reader = new FileReader()
        reader.onload = er => {
          this.preview = er.target.result
        }
        // eslint-disable-next-line prefer-destructuring
        this.image = input.files[0]
        reader.readAsDataURL(input.files[0])
      }
    },
    closeModal() {
      this.userForm = {

        logo: '',
      }
      this.$bvModal.hide('client')
    },

    addClient() {
      this.loader = true
      this.setFormData(this.userForm)

      axios.post('admin/clients', this.formData).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.$parent.$parent.$parent.$refs.clientTable.getAllData()
          this.closeModal()
          this.$toasted.show('Added Successfully', {
            position: 'top-center',
            duration: 3000,
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
