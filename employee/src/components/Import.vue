<template>
  <v-app>
    <v-container grid-list-lg align-center>
      <v-layout row wrap>
        <v-flex xs12 xl12 style="text-align:left">
          <h1 class="header" style="display:inline-flex;float:left;">Import List</h1>
          <div style="display:inline-flex;float:right;">
            <v-btn depressed color="amber" dark slot="activator" class="mb-2" round @click="createImport">+ Create Import</v-btn> 
          </div>
        </v-flex>
       
        <v-flex xs12 xl12>
          <div>

            <v-dialog v-model="dialogViewMore" max-width="55%">
              <v-card>
                <v-card-title>
                  <span class="headline">Import Order List</span>
                  <!-- <p>{{purchaseOrderList[0].purchaseOrderDetails}}</p> -->
                </v-card-title>
                <v-card-text style="padding:0px;">
                  <v-data-table
                  :headers="importDetailHeaders"
                  :items="importDetailTemp"
                  hide-actions
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.MaterialID }}</td>
                    <td class="text-xs-center">{{ props.item.Material.MaterialName }}</td>
                    <td class="text-xs-center">{{ props.item.Material.Unit }}</td>
                    <td class="text-xs-center">{{ props.item.Amount }}</td>
                  </template>
                </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>

            <v-data-table
              :headers="headers"
              :items="importList"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.ID }}</td>
                <td class="text-xs-center">{{ props.item.MaterialOrderID }}</td>
                <td class="text-xs-center">{{ props.item.Staff.FirstName }}</td>
                <td class="text-xs-center">{{ props.item.MaterialOrder.Manufacturer.ManufacturerName }}</td>
                <td class="text-xs-center">{{ props.item.ArrivedDate }}</td>
                <td class="justify-center layout px-0">
                  <v-menu offset-y>
                    <v-btn icon slot="activator">
                      <v-icon color="grey">more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="(dropdown,i) in dropdowns" :key="i" @click="dropdownAction(dropdown.value,props.item)">
                        <v-list-tile-title>{{ dropdown.text }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-flex>

      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import ImportService from '@/services/ImportService'
export default {
  data: () => ({
    dropdowns: [{text:'View More',value:1}],
    dialog: false,
    dialogViewMore: false,
    statusChangeDialog: false,
    statusRadio: '',
    lookupIndex: -1,
    importDetailTemp:[],
    importDetailHeaders: [
      {
        text: 'MaterialID',
        align: 'center',
        sortable: true,
        value: 'materialID'
      },
      {
        text: 'Material Name',
        align: 'center',
        sortable: true,
        value: 'materialName'
      },
      {
        text: 'Unit',
        align: 'center',
        sortable: true,
        value: 'unit'
      },
      {
        text: 'Amount',
        align: 'center',
        sortable: true,
        value: 'amount'
      }
    ],
    headers: [
      {
        text: 'Import ID',
        align: 'center',
        sortable: true,
        value: 'importID'
      },
      {
        text: 'Material Order ID',
        align: 'center',
        sortable: true,
        value: 'materialOrderID'
      },
      {
        text: 'Recipient Name',
        align: 'center',
        sortable: true,
        value: 'recipientName'
      },
      {
        text: 'Manufacturer Name',
        align: 'center',
        sortable: true,
        value: 'manufacturerName'
      },
      {
        text: 'Arrived Date',
        align: 'center',
        sortable: true,
        value: 'arrivedDate'
      }
    ],
    importList: [],
    editedIndex: -1,
    editedItem: {
      ImportID: 0,
      MaterialOrderID: 0,
      RecipientName: '',
      Reason: '',
      ArrivedDate: '',
      Status: ''
    },
    defaultItem: {
      ImportID: 0,
      MaterialOrderID: 0,
      RecipientName: '',
      Reason: '',
      ArrivedDate: '',
      Status: ''
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    pages () {
      if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null) 
          return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  async mounted () {
    this.importList = (await ImportService.getImport()).data
    console.log('importList : ', this.importList)
  },


  watch: {
    dialog (val) {
      val || this.close()
    },

    statusChangeDialog (val) {
      val || this.closeStatusDialog()
    },
    
    dialogViewMore (val) {
      val || this.closeViewMoreDialog()
    },

    importList (val) {
      val || this.getImportList()
    }
    // statusChangeDialog (val) {
    //   val || this. closeStatusDialog()
    // }
  },
  methods: {

    createImport() {
      this.$emit('clicked',{name:'create-import'})
    },

    dropdownAction (dropdownValue,item) {
      this.editedIndex = this.importList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (dropdownValue == 1) {
        this.dialogViewMore = true
        this.show(item)
      }
    },

    async show(item) { //TO DO: ImportService.getImportDetailByID
      this.importDetailTemp = (await ImportService.getImportDetailByID(item.ID)).data
    },

    async getImportList () {
      this.importList = (await ImportService.getImport()).data
        console.log('importList : ', this.importList)
    },

    closeViewMoreDialog () {
      this.dialogViewMore = false
      this.lookupIndex = -1
    }
  }
}
</script>

<style scoped>
.header {
  font-family: Roboto;
  font-size: 30px;
  color: #606060;
}
.headline{
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.68;
    letter-spacing: normal;
    text-align: left;
    color: #ff9f1c;
} 
.row:after {
  content: "";
  clear: both;
}
.column {
  float: left;
  display: table;
  padding: 0px 20px 0px 0px;
}
.attrubuteText {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.24;
  letter-spacing: normal;
  text-align: left;
  color: #606060;
}
</style>
