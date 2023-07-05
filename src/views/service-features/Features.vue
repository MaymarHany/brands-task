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
      <template v-slot:cell(icon)="value">
        <div
          v-if="value.item.icon"
          class="conOfIcon"
        >

          <b-img
            v-img
            width="24"

            :src="value.item.icon"
          />
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
      APIURL: 'about-us-features',
      addType: 'Add Features',
      addComponentName: 'add-service-features',
      editComponent: 'edit-service-features',
      viewContent: false,
      type: 'page',
      columns: [
        { key: 'id', sortable: true },
        { key: 'icon', label: 'icon' },
        { key: 'title', label: 'Title' },
        { key: 'position', label: 'Position' },
        { key: 'description', label: 'Description' },
        { key: 'created_at', label: 'Created At' },
        { key: 'actions' },
      ],
    }
  },
}
</script>

<style>
 .conOfIcon{
  background: linear-gradient(225.53deg, #4881FF -32.29%, #3BE692 135.95%);
  width: 48px;
height: 48px;
padding: 12px;
border-radius: 8px;

 }
</style>
