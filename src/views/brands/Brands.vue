<template>
  <div>
    <general-table
      ref="brandsTable"
      :api-url="APIURL"
      :add-component-name="addComponentName"
      :edit-component="editComponent"
      :delete-content="true"
      :block-content="false"
      :edit-content="true"
      :view-content="false"
      :add-type="addType"
      :columns="columns"
      :type="type"
      :selectable="false"
    >
      <template #cell(createdAt)="data">
        {{ data.item.createdAt | formatDate }}
      </template>
      <template #cell(Activation)="data">
        <b-button
          v-if="!Boolean(data.item.isActive)"
          size="sm"
          variant="primary"
          @click="activateBrand(data.item.id ,data.item.isActive )"
        >
          Activate
        </b-button>
        <b-button
          v-else
          size="sm"
          variant="secondary"
          @click="activateBrand(data.item.id ,data.item.isActive )"
        >
          Deactivate
        </b-button>
      </template>
    </general-table>

  </div>
</template>

<script>
import axios from 'axios'
import GeneralTable from '@/components/general-table/GeneralTable.vue'

export default {
  components: { GeneralTable },
  data() {
    return {
      APIURL: 'Brand',
      addType: 'Add Brand',
      viwComponent: 'view-Brand',
      addComponentName: 'add-brands',
      editComponent: 'edit-brands',
      viewContent: true,
      type: 'page',
      columns: [
        { key: 'id', sortable: true },
        { key: 'image', label: 'Image' },
        { key: 'name', label: 'Name' },
        { key: 'createdAt', label: 'Created At' },
        { key: 'Activation', label: 'Activation' },
        { key: 'actions' },
      ],
    }
  },
  methods: {
    activateBrand(id, isActive) {
      if (isActive === false) {
        this.$swal({
          title: 'Activate',
          text: 'Are you sure you want to activate this brand ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Activate!',
        }).then(result => {
          if (result.isConfirmed) {
            axios
              .post(`Brand/Activation/${id}`)
              .then(() => {
                this.$swal('Activated!', 'Activated Successfully.', 'success')

                this.$refs.brandsTable.getAllData()
              })
              .finally(() => {
                this.loading = false
              })
          }
        })
      } else {
        this.$swal({
          title: 'Deactivate Brand',
          text: 'Are you sure you want to Deactivate this brand?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Deactivate!',
        }).then(result => {
          if (result.isConfirmed) {
            axios
              .post(`Brand/Activation/${id}`)
              .then(() => {
                this.$swal('Deactivated!', 'Deactivated Successfully.', 'success')

                this.$refs.brandsTable.getAllData()
              })
              .finally(() => {
                this.loading = false
              })
          }
        })
      }
    },

  },
}
</script>

<style>

</style>
