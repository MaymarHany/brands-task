<template>
  <div>
    <general-table
      :api-url="APIURL"
      :add-component-name="addComponentName"
      :edit-component="editComponent"
      :delete-content="true"
      :block-content="false"
      :edit-content="true"
      :view-content="viewContent"
      :add-type="addType"
      :columns="columns"
      :type="type"
      :selectable="false"
    >

      <template
        #cell(status)="data"
      >
        <b-badge
          class="change-status"
          :variant="changeVaraint(getTypes(data.item.status))"
        >
          {{ getTypes(data.item.status) }}
        </b-badge>
      </template>
    </general-table>
  </div>
</template>

<script>
import GeneralTable from '@/components/general-table/GeneralTable.vue'

export default {
  components: { GeneralTable },
  data() {
    return {
      APIURL: 'admin/sliders',
      addType: 'Add Slide',
      addComponentName: 'add-slider',
      editComponent: 'edit-slider',
      viewContent: false,
      type: 'page',
      columns: [
        { key: 'id', sortable: true },
        { key: 'en_image', label: 'Image' },
        { key: 'en_title', label: 'Title (En)' },
        { key: 'en_caption', label: 'Caption (En)' },
        { key: 'ar_title', label: 'Title (Ar)' },
        { key: 'ar_caption', label: 'Caption (Ar)' },
        { key: 'actions' },
      ],
    }
  },
  methods: {
    changeVaraint(type) {
      // eslint-disable-next-line eqeqeq
      if (type == 'Active') return 'success'

      return 'danger'
    },
    filterTypes(type) {
      const filteredType = this.status.filter(item => item.text !== type)
      this.types = filteredType
    },
    getTypes(type) {
      if (type === 1) {
        return 'Active'
      } if (type === 0) {
        return 'Not Active'
      }
      return 'Active'
    },
  },
}
</script>

<style>

</style>
