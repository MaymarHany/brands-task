<template>
  <div>
    <general-table
      :api-url="APIURL"
      :delete-content="true"
      :viw-component="viwComponent"
      :block-content="false"
      :edit-content="false"
      :view-content="viewContent"
      :add-type="addType"
      :columns="columns"
      :type="type"
      :selectable="false"
    >
      <template
        v-slot:cell(message)="value"
      >
        <div class="desTrim">
          {{ value.item.message }}
        </div>
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
      APIURL: 'admin/contacts',
      viwComponent: 'view-contact',
      viewContent: true,
      type: 'page',
      columns: [
        { key: 'id' },
        { key: 'name', label: 'Name' },
        { key: 'mobile', label: 'Mobile' },
        { key: 'position', label: 'Position' },
        { key: 'email', label: 'Email' },
        { key: 'company', label: 'Company' },
        { key: 'message', label: 'Message' },
        { key: 'created_at', label: 'Created At' },

        { key: 'actions' },
      ],
    }
  },
}
</script>

<style>

</style>
