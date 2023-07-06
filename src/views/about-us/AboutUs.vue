<template>
  <div>
    <general-table
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
      :about-type="true"
    >
      <template
        v-slot:cell(content)="value"
      >
        <div class="desTrim">
          {{ value.item.content }}
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
      APIURL: 'about-us/about_us',
      addType: 'Add Section',
      addComponentName: 'add-about-us',
      editComponent: 'edit-about-us',
      viewContent: true,
      type: 'page',
      columns: [
        { key: 'id', sortable: true },
        { key: 'image', label: 'Image' },
        { key: 'title', label: 'Title' },
        { key: 'position', label: 'Position' },
        { key: 'content', label: 'Content' },
        { key: 'created_at', label: 'Created At' },
        { key: 'actions' },
      ],
    }
  },
}
</script>

<style>

</style>
