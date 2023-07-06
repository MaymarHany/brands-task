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
    />
  </div>
</template>

<script>
import GeneralTable from '@/components/general-table/GeneralTable.vue'

export default {
  components: { GeneralTable },
  data() {
    return {
      APIURL: 'admin/features',
      addType: 'Add feature',
      addComponentName: 'add-features',
      editComponent: 'edit-features',
      viewContent: false,
      type: 'page',
      columns: [
        { key: 'id' },
        { key: 'category_en_name', label: 'Category' },
        { key: 'en_title', label: 'Title (En)' },
        { key: 'ar_title', label: 'Title (Ar)' },
        { key: 'en_description', label: 'description (En)' },
        { key: 'ar_description', label: 'description (Ar)' },
        { key: 'actions' },
      ],
    }
  },
}
</script>

<style>

</style>
