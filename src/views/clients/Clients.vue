<template>
  <div>
    <general-table
      ref="clientTable"
      :api-url="APIURL"
      :add-component-name="addComponentName"
      :edit-component="editComponent"
      :delete-content="true"
      :block-content="false"
      :edit-content="false"
      :view-content="false"
      :add-type="addType"
      :columns="columns"
      :type="type"
      :selectable="false"
    >
      <template #cell(logo)="data">
        <b-img
          v-img
          width="250"

          :src="data.item.logo"
        />
      </template>

    </general-table>
    <div>
      <b-modal
        id="client"
        ref="genmodal"
        hide-footer
        centered
        size="lg"
        title="Client"
      >
        <add-client />
      </b-modal>
    </div>
  </div>
</template>

<script>
import GeneralTable from '@/components/general-table/GeneralTable.vue'
import AddClient from './control-clients/AddClients.vue'

export default {
  components: { GeneralTable, AddClient },
  data() {
    return {
      APIURL: 'admin/clients',
      addType: 'Add Client',
      addComponentName: 'add-client',
      editComponent: 'edit-client',
      viewContent: true,
      type: 'modal',
      columns: [
        { key: 'id', sortable: true },
        { key: 'logo', label: 'Logo' },
        { key: 'actions' },
      ],
    }
  },
}
</script>

<style>

</style>
