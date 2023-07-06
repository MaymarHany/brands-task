<template>
  <div>
    <slot :status="moduleStatus" />
    <b-card v-if="!moduleStatus">
      <b-row class="mb-2 justify-content-end">

        <bulk-actions
          v-if="selectable"
          ref="actions"
          :api-url="apiUrl"
          :add-type="addType"
          :bulk-delete="bulkDelete"
          :go-to-page-or-open-modal="goToPageOrOpenModal"
          :guard="guard"
          :selected="selected"
        >

          <template v-slot:addbtn>
            <b-button
              v-if="addType.length "
              variant="primary"
              @click="goToPageOrOpenModal()"
            >
              <span class="text-nowrap"> {{ addType }} </span>
            </b-button>

          </template>
        </bulk-actions>

        <template v-if="exportData">

          <vue-json-to-csv
            :json-data="exportedData"
            :labels="exportLabels"
          >
            <b-button
              v-if="!loadExport"
              variant="secondary"
            >
              <span class="text-nowrap">Export </span>
            </b-button>
          </vue-json-to-csv>

          <b-button
            v-if="loadExport"
            variant="secondary"
            disabled
            class="mr-1"
          >
            <b-spinner
              small
              type="grow"
            />
            Loading...
          </b-button>
        </template>

        <b-button
          v-if="!selectable && addType.length "
          ref="actions"
          variant="primary"
          class=" mx-1"
          @click="goToPageOrOpenModal()"
        >
          <span class="text-nowrap"> {{ addType }} </span>
        </b-button>
      </b-row>
      <b-row class="mb-2">
        <b-col
          v-if="searchBox"
          cols="12"
          md="3"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-form-input
            v-model="searchQuery"
            v-debounce:500ms="searchTable"
            :disabled="searchType && selectedSearchType==null"
            class="d-inline-block"
            placeholder="Search..."
          />
        </b-col>

      </b-row>
      <b-col
        v-if="aboutType"
        cols="12"
        md="3"
      >
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="Show List Of"
        >
          <b-form-radio-group
            id="radio-group-2"
            v-model="selectedAboutType"
            :aria-describedby="ariaDescribedby"
            name="radio-sub-component"
            @change="getAllData"
          >
            <b-form-radio
              value="0"
            >
              About Us
            </b-form-radio>
            <b-form-radio
              value="1"
            >
              Home
            </b-form-radio>

          </b-form-radio-group>
        </b-form-group>
      </b-col>
      <b-row>
        <b-col
          md="12"
        >
          <div
            v-if="dataLoad"
            class=" text-center my-2"
          >
            <b-spinner
              type="grow"
              label="Loading..."
            />
          </div>
          <b-table
            v-else
            ref="productsTable"
            :key="tableDataKey"
            :items="rows"
            :fields="columns"
            :current-page="currentPage"
            aria-busy="true"
            class="position-relative"
            responsive
            show-empty
            bordered
            primary-key="id"
            :selectable="selectable"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :select-mode="selectMode"
            :no-local-sorting="true"
            @row-selected="onRowSelected"
          >

            <template v-slot:cell(created_at)="value">
              {{ value.item.created_at | formatDate }}
            </template>
            <template v-slot:cell(avatar)="value">
              <b-avatar
                size="50"
                :src="value.item.avatar"
                class="mb-2"
              />
            </template>
            <template v-slot:cell(en_image)="value">
              <b-img
                v-img
                width="70"

                :src="value.item.en_image"
              /></template>

            <template v-slot:cell(image)="value">
              <b-img
                v-img
                width="70"

                :src="value.item.image"
              /></template>
            <template
              v-slot:cell(en_description)="value"
            >
              <div class="desTrim">
                {{ value.item.en_description }}
              </div>
            </template>
            <template
              v-slot:cell(ar_description)="value"
            >
              <div class="desTrim">
                {{ value.item.ar_description }}
              </div>
            </template>
            <template
              v-slot:cell(en_caption)="value"
            >
              <div class="desTrim">
                {{ value.item.en_caption }}
              </div>
            </template>
            <template
              v-slot:cell(ar_caption)="value"
            >
              <div class="desTrim">
                {{ value.item.ar_caption }}
              </div>
            </template>

            <template
              v-for="(_, slotName) of $scopedSlots"
              v-slot:[slotName]="scope"
            >
              <slot
                :name="slotName"
                v-bind="scope"
              />
            </template>
            <!-- eslint-disable-next-line vue/no-unused-vars -->
            <template v-slot:head(select)="data">
              <span v-if="selected.length < 1"> {{ data.field.label }} </span>
              <b-form-checkbox
                v-else
                class="custom-control-primary"
                @change="selectAllRows($event)"
              />
            </template>
            <template #cell(select)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <b-form-checkbox
                  class="custom-control-primary"
                  disabled
                />
              </template>
            </template>
            <template #cell(actions)="data">
              <slot
                name="actions"
                v-bind="data"
              >
                <div class="padd">
                  <span
                    v-if="viewContent"
                    title="View"
                  >
                    <feather-icon
                      icon="EyeIcon"
                      class="cursor-pointer"
                      @click="viewPage(data.item)"
                    />
                  </span>
                  <span
                    v-if="editContent "
                    title="Edit"
                  >
                    <feather-icon
                      icon="EditIcon"
                      class="cursor-pointer"
                      @click="editToPage(data.item.id)"
                    />
                  </span>
                  <span
                    v-if="blockContent &&data.item.status!='Blocked' "
                    title="Block"
                  >
                    <feather-icon
                      icon="UserMinusIcon"
                      class="cursor-pointer"
                      @click="viewmodel(data.item.id,1)"
                    />
                  </span>
                  <span
                    v-if="data.item.status=='Blocked' "
                    title="UnBlock"
                  >
                    <feather-icon
                      icon="UserPlusIcon"
                      class="cursor-pointer"
                      @click="viewmodel(data.item.id , 0)"
                    />
                  </span>
                  <span
                    v-if="deleteContent"
                    title="Delete"
                  >
                    <feather-icon
                      id="popover-button-1"
                      icon="TrashIcon"
                      class="cursor-pointer"
                      @click="deleteRow(data.item.id)"
                    />
                  </span>
                </div>
              </slot>
            </template>
            <template #cell(name)="data">
              <b-media vertical-align="center">

                <b-link
                  class="font-weight-bold d-block text-nowrap"
                  @click="viewPage(data.item)"
                >
                  {{ data.item.name }}
                </b-link>
                <small
                  v-if="data.item.username"
                  class="text-muted"
                >@{{ data.item.username }}</small>
                <small
                  v-if="data.item.name_ar"
                  class="text-muted"
                >{{ data.item.name_ar }}</small>

              </b-media>
            </template>
            <template #cell(activation_at)="data">
              {{ data.item.activation_at.slice(0, 10) }}
            </template>

          </b-table>
        </b-col>
      </b-row>

    </b-card>
  </div>
</template>

<script>
/* eslint-disable camelcase */

import axios from 'axios'
import { avatarText } from '@core/utils/filter'
import useAppConfig from '@core/app-config/useAppConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters } from 'vuex'
import handleFormData from '@/global-compositions/handleFormData'
import BulkActions from './BulkActions.vue'
import table from './table'

export default {
  components: {
    BulkActions,
  },

  props: {
    apiUrl: {
      type: String,
      default: () => '',
    },
    addType: {
      type: String,
      default: () => '',
    },
    addComponentName: {
      type: String,
      default: () => '',
    },
    editComponent: {
      type: String,
      default: () => '',
    },
    viwComponent: {
      type: String,
      default: () => '',
    },
    type: {
      type: String,
      default: () => '',
    },
    typeModel: {
      type: String,
      default: () => '',
    },
    columns: {
      type: Array,
      default: () => [],
    },
    viewContent: {
      type: Boolean,
      default: () => true,
    },
    exportData: {
      type: Boolean,
      default: () => false,
    },
    aboutType: {
      type: Boolean,
      default: () => false,
    },
    editContent: {
      type: Boolean,
      default: () => true,
    },
    deleteContent: {
      type: Boolean,
      default: () => true,
    },
    blockContent: {
      type: Boolean,
      default: () => true,
    },

    searchBox: {
      type: Boolean,
      default: () => false,
    },

    selectable: {
      type: Boolean,
      default: () => false,
    },
    guard: {
      type: String,
      default: () => '',
    },
    urlType: {
      type: String,
      default: () => '',
    },
    role: {
      type: [String, Number],
      default: () => '',
    },
    exportTable: {
      type: Boolean,
      default: () => true,
    },
  },

  data() {
    return {
      rows: [],
      totalRows: null,
      isBusy: false,
      selectedSearchType: this.$route.query.type,
      searchCodeQuery: '',
      selectedAboutType: '0',
      currentPage: 1,
      perPage: 15,
      searchQuery: this.$route.query.search,
      exportedData: [],
      popoverShow: false,
      loader: false,
      currentTime: '',
      showEmpty: 'loading...',
      modes: ['multi', 'single', 'range'],
      selectMode: 'multi',
      selected: [],
      page: 1,
      sortBy: '',
      dataKey: '',
      sortDesc: '',
      loadExport: false,
      dataLoad: 'false',
      tableDataKey: 0,

    }
  },
  computed: {

    ...mapGetters({ currentCountry: 'app/getCountry' }),
    exportLabels() {
      if (this.apiUrl.includes('users')) {
        return {
          name: { title: 'Name' },
          email: { title: 'Email' },
          mobile: { title: 'Mobile' },
          country_name: { title: 'Country' },
          is_verified: { title: 'Verified' },
          status: { title: 'Status' },
          created_at: { title: 'Created At' },
        }
      }
      return {
        user_name: { title: 'Name' },
        user_mobile: { title: 'Mobile' },
        status: { title: 'Status' },
        total: { title: 'Total' },
        date: { title: 'Created At' },
      }
    },

  },
  setup() {
    const { moduleStatus } = table()
    const resolveActiveUser = role => {
      if (role === true) return 'Active'

      return 'Not Active'
    }
    const { formData, setFormData } = handleFormData()
    const { skin } = useAppConfig()
    const resolveActive = role => {
      if (role === '1') return 'Active'

      return 'Not Active'
    }

    const resolveActiveOrFalse = role => {
      // eslint-disable-next-line eqeqeq
      if (role == 'true') return 'Active'

      return 'Not Active'
    }

    const perPageOptions = [10, 25, 50, 100]

    return {
      resolveActiveUser,
      resolveActive,
      resolveActiveOrFalse,
      skin,
      formData,
      setFormData,
      avatarText,
      perPageOptions,
      moduleStatus,
    }
  },

  mounted() {
    this.getAllData(this.$route.query?.page)
    // this.getRouting()
    this.getCurrentDateTime()
  },
  methods: {
    exportToPDF() {
      const self = this
      this.loadExport = true
      const promis = axios.get(this.apiUrl, { params: { limit: self.perPage, export: 'pdf' }, responseType: 'arraybuffer' })
      return promis.then(res => {
        if (res.status === 200) {
          const blob = new Blob([res.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = 'exported.pdf'
          link.click()
        }
      }).finally(() => {
        this.loadExport = false
      })
    },
    // exportToCSV() {
    //   this.loadExport = true
    //   const self = this
    //   const promis = axios.get(this.apiUrl, { params: { limit: self.perPage, export: 'csv' }, responseType: 'arraybuffer' })
    //   return promis.then(res => {
    //     if (res.status === 200) {
    //       const blob = new Blob([res.data], { type: 'application/csv' })
    //       const link = document.createElement('a')
    //       link.href = window.URL.createObjectURL(blob)
    //       link.download = 'exported.csv'
    //       link.click()
    //     }
    //   }).finally(() => {
    //     this.loadExport = false
    //   })
    // },
    onRowSelected(items) {
      const rows = []
      // eslint-disable-next-line array-callback-return
      items.map(item => {
        rows.push(item.id)
      })
      this.selected = rows
    },
    selectAllRows(rows) {
      if (rows) {
        this.$refs.productsTable.selectAllRows()
      } else {
        this.$refs.productsTable.clearSelected()
      }
    },
    onClose() {
      this.popoverShow = false
    },
    showPopover() {
      this.popoverShow = true
    },
    changeStatus(data) {
      this.$swal({
        title: 'Are you sure that you want to change status?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Change it!',
      }).then(result => {
        if (result.isConfirmed) {
          if (data.active === false) {
            this.setFormData(data)
            this.formData.append('activation_at', this.currentTime)
            this.formData.append('_method', 'PUT')
            axios.post(`${this.apiUrl}/${data.id}`, this.formData).then(res => {
              if (res.status === 200) {
                this.$swal(
                  'Changed!',
                  'Changed Successfully.',
                  'success',
                )
                this.getAllData()
              }
            })
          } else {
            this.setFormData(data)
            this.formData.append('activation_at', '')
            this.formData.append('_method', 'PUT')
            axios.post(`${this.apiUrl}/${data.id}`, this.formData).then(res => {
              if (res.status === 200) {
                this.$swal(
                  'Changed!',
                  'Changed Successfully.',
                  'success',
                )
                this.getAllData()
              }
            })
          }
        }
      })
    },
    changeSchangeActivetatus(data) {
      this.$swal({
        title: 'Are you sure that you want to change status?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Change it!',
      }).then(result => {
        if (result.isConfirmed) {
          if (data.is_active === false) {
            this.setFormData(data)
            this.formData.append('is_active', 1)
            if (data.expire_at) {
              this.formData.append('expire_at', data.expire_at.slice(0, 10))
            }
            this.formData.append('_method', 'PUT')
            axios.post(`${this.apiUrl}/${data.id}`, this.formData).then(res => {
              if (res.status === 200) {
                this.$swal(
                  'Changed!',
                  'Changed Successfully.',
                  'success',
                )
                this.getAllData()
              }
            })
          } else {
            this.setFormData(data)
            this.formData.append('is_active', 0)
            if (data.expire_at) {
              this.formData.append('expire_at', data.expire_at.slice(0, 10))
            }
            this.formData.append('_method', 'PUT')
            axios.post(`${this.apiUrl}/${data.id}`, this.formData).then(res => {
              if (res.status === 200) {
                this.$swal(
                  'Changed!',
                  'Changed Successfully.',
                  'success',
                )
                this.getAllData()
              }
            })
          }
        }
      })
    },
    editToPage(id) {
      if (this.type === 'page') {
        this.$router.push({ name: this.editComponent, params: { id } })
      } else {
        this.$parent.$refs.genmodal.show(id)
        this.$store.commit('generalIds/SET_ID', id)
      }
    },
    viewmodel(id, isBlocked) {
      if (isBlocked === 1) {
        this.$parent.$refs['block-modal'].show(id)
      } else {
        this.$parent.$refs['unblock-modal'].show(id)
      }
      this.$store.commit('generalIds/SET_ID', id)
    },
    viewPage(data) {
      if (this.viwComponent) {
        this.$router.push({ name: this.viwComponent, params: { id: data.id } })
        this.$store.commit('generalIds/SET_ID', data.id)
      } else {
        this.$parent.$refs['view-modal'].show()
        this.$store.commit('generalIds/SET_ID', data.id)
      }
    },
    goToPageOrOpenModal() {
      if (this.type === 'page') {
        this.$router.push({ name: this.addComponentName })
      } else {
        this.$parent.$refs.genmodal.show()
      }
    },
    getAllDataToExport() {
      const params = {

        search: this.searchQuery || this.$route.query.search,
        country_id: this.currentCountry.id,
        type: (this.searchType === true && (this.searchQuery !== '' || this.$route.query.search !== '')) ? this.$route.query.type : null,

      }
      Object.keys(params).forEach(k => (!params[k] && params[k] !== undefined) && delete params[k])

      const promis = axios.get(this.apiUrl, {
        params,
      })
      return promis.then(res => {
        if (res.status === 200) {
          const items = res.data?.data[Object.keys(res.data?.data)[0]]
          this.exportedData = items
          // this.$refs.productsTable.refresh()
          // this.getRouting()
        }
      }).catch(error => {
        if (error.response.status === 500) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Server Error',
              icon: 'BellIcon',
              variant: 'danger',
            },
          })
        }
      }).finally(() => {
        this.loader = false
      })
    },
    getAllData(page) {
      this.dataLoad = true

      const params = {
        search: this.searchQuery || this.$route.query.search,

      }
      if (this.aboutType) {
        if (this.selectedAboutType === '0') {
          this.apiUrl = 'about-us/about_us'
        } else {
          this.apiUrl = 'home-about-us'
        }
      }
      const promis = axios.get(this.apiUrl, {
        params,
      })
      return promis.then(res => {
        if (res.status === 200) {
          const items = res.data?.data
          this.rows = items

          this.totalRows = res.data.data.count
          this.$router.push({ query: { ...this.$route.query, page } }).catch(() => {})
          this.page = page
          if (this.exportData) {
            this.getAllDataToExport()
          }
          // this.$refs.productsTable.refresh()
          // this.getRouting()
        }
      }).catch(error => {
        if (error.response.status === 500) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Server Error',
              icon: 'BellIcon',
              variant: 'danger',
            },
          })
        }
      }).finally(() => {
        this.dataLoad = false
        this.loader = false
      })
    },
    deleteRow(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          if (this.apiUrl.includes('about-us/about_us') || this.apiUrl.includes('about-us/services') || this.apiUrl.includes('home-about-us')) {
            axios.delete(`admin/about-us/${id}`).then(() => {
              this.$swal(
                'Deleted!',
                'Deleted Successfully.',
                'success',
              )
              this.getAllData()
            }).finally(() => {
              this.loading = false
            })
          } else if (this.apiUrl.includes('about-us-features')) {
            axios.delete(`admin/about-us-features/${id}`).then(() => {
              this.$swal(
                'Deleted!',
                'Deleted Successfully.',
                'success',
              )
              this.getAllData()
            }).finally(() => {
              this.loading = false
            })
          } else {
            axios.delete(`${this.apiUrl}/${id}`).then(() => {
              this.$swal(
                'Deleted!',
                'Deleted Successfully.',
                'success',
              )
              this.getAllData()
            }).finally(() => {
              this.loading = false
            })
          }
        }
      })
    },

    async searchTable() {
      this.dataLoad = true
      let skip = 0
      const page = this.$route.query?.page
      if (page !== 1 && page !== undefined) {
        skip = page * 10 - 10
      } else {
        skip = 0
      }
      const searchParams = {
        skip,
        search: this.searchQuery,
        type: (this.searchType === true && this.searchQuery !== '') ? this.selectedSearchType : null,
        code: (this.searchCode === true && this.searchCodeQuery !== '') ? this.searchCodeQuery : null,

      }
      Object.keys(searchParams).forEach(k => (!searchParams[k] && searchParams[k] !== undefined) && delete searchParams[k])
      this.$router.push({ query: { ...searchParams } }).catch(() => {})

      const response = await axios.get(`${this.apiUrl}`, {
        params: searchParams,
      }).catch(() => {})
      this.dataLoad = false

      this.rows = response.data?.data[Object.keys(response.data?.data)[0]]
      this.totalRows = response.data.data.count
      this.perPage = 10
      this.page = response.data.meta?.per_page
    },

    getCurrentDateTime() {
      const today = new Date()

      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

      const dateTime = `${date} ${time}`

      this.currentTime = dateTime
    },
    bulkDelete() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          axios.post(`${this.apiUrl}/bulk-destroy`, {
            ids: this.selected,
          }).then(() => {
            this.$swal(
              'Deleted!',
              'Deleted Successfully.',
              'success',
            )
            this.getAllData()
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    sortData(e) {
      const self = this
      const sortType = () => {
        if (e.sortDesc) return 'DESC'
        return 'ASC'
      }
      const promis = axios.get(this.apiUrl,
        {
          params: {
            limit: self.perPage,
            search: self.searchQuery || self.$route.query.search,
            type: this.selectedSearchType,
            sort_colum: e.sortBy,
            sort_type: sortType(),
          },
        })
      return promis.then(res => {
        if (res.status === 200) {
          const items = res.data?.data
          this.rows = items
          this.totalRows = res.data.data.count
          this.perPage = res.data.meta?.per_page
        }
      }).catch(error => {
        if (error.response.status === 500) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Server Error',
              icon: 'BellIcon',
              variant: 'danger',
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
.padd span {
  padding: 2px;
}
#table-spinner {
    position: absolute;
    right: 50%;
    top: 5rem;
    z-index: 999999999
}
.change-status {
  cursor: pointer;
}
@import '@core/scss/vue/libs/vue-select.scss';
</style>
