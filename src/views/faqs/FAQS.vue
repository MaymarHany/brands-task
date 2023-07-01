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
      APIURL: 'admin/faqs',
      addType: 'Add FAQS',
      addComponentName: 'add-faq',
      editComponent: 'edit-faq',
      viewContent: false,
      type: 'page',
      columns: [
        { key: 'id' },
        { key: 'ar_question', label: 'question In Arabic' },
        { key: 'en_question', label: 'question In English' },
        { key: 'ar_answer', label: 'answer In Arabic' },
        { key: 'en_answer', label: 'answer In English' },
        { key: 'actions' },
      ],
    }
  },
}
</script>

<style>

</style>
