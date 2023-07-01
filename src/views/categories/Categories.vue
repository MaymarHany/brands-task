<template>
  <div>
    <general-table
      :api-url="APIURL"
      :viw-component="viwComponent"
      :add-component-name="addComponentName"
      :edit-component="editComponent"
      :delete-content="true"
      :block-content="false"
      :edit-content="true"
      :view-content="true"
      :add-type="addType"
      :columns="columns"
      :type="type"
      :selectable="false"
    />
  </div>
</template>

<script>
import GeneralTable from '@/components/general-table/GeneralTable.vue'

export default {
  components: { GeneralTable },
  data() {
    return {
      APIURL: 'admin/categories',
      addType: 'Add Category',
      viwComponent: 'view-category',
      addComponentName: 'add-categories',
      editComponent: 'edit-categories',
      viewContent: true,
      type: 'page',
      columns: [
        { key: 'id', sortable: true },
        { key: 'image', label: 'Image' },
        { key: 'en_name', label: 'Name (En)' },
        { key: 'ar_name', label: 'Name (Ar)' },
        { key: 'actions' },
      ],
    }
  },
}
</script>

<style>

</style>
