<template>
  <v-app>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 xl12 style="text-align:left">
          <h1 class="header" style="display:inline-flex;float:left;">Export List</h1>
          <div style="display:inline-flex;float:right;">
            <v-btn depressed color="amber" dark slot="activator" class="mb-2" round @click="createExport">+ Create Export</v-btn> 
          </div>
        </v-flex>
       
        <v-flex xs12>
          <div>
  
            <v-dialog v-model="dialogViewMore" max-width="55%">
              <v-card>
                <v-card-title>
                  <span class="headline">Export Order List</span>
                  <!-- <p>{{purchaseOrderList[0].purchaseOrderDetails}}</p> -->
                </v-card-title>
                <v-card-text style="padding:0px;">
                  <v-data-table
                  :headers="exportDetailHeaders"
                  :items="this.exportDetailTemp"
                  hide-actions
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.ExportID }}</td>
                    <td class="text-xs-center">{{ props.item.Product.Name }}</td>
                    <td class="text-xs-center">{{ props.item.Product.Unit }}</td>
                    <td class="text-xs-center">{{ props.item.Amount }}</td>
                  </template>
                </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
      
            <v-data-table
              :headers="headers"
              :items="exportList"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.ID }}</td>
                <td class="text-xs-center">{{ props.item.PurchaseOrderID }}</td>
                <td class="text-xs-center">{{ props.item.PurchaseOrder.ShippingAddress }}</td>
                <td class="text-xs-center">{{ props.item.PurchaseOrder.User.UserName }}</td>
                <td class="text-xs-center">{{ props.item.DepartureDate }}</td>
                <td class="text-xs-center">{{ props.item.Staff.ID }}</td>
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
import ExportService from '@/services/ExportService'
export default {
  data: () => ({
    dropdowns: [{text:'View More',value:1}],
    dialog: false,
    statusChangeDialog: false,
    statusRadio: '',
    dialogViewMore: false,
    lookupIndex: -1,
    exportDetailTemp:[],
    exportDetailHeaders: [
      {
        text: 'ExportID',
        align: 'center',
        sortable: true,
        value: 'exportID'
      },
      {
        text: 'Product Name',
        align: 'center',
        sortable: true,
        value: 'productName'
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
        text: 'ID',
        align: 'center',
        sortable: true,
        value: 'ID'
      },
      {
        text: 'Purchase Order ID',
        align: 'center',
        sortable: true,
        value: 'purchaseOrderID'
      },
      {
        text: 'Customer Address',
        align: 'center',
        sortable: true,
        value: 'customerAddress'
      },
      {
        text: 'UserName',
        align: 'center',
        sortable: true,
        value: 'usename'
      },
      {
        text: 'Staff Name',
        align: 'center',
        sortable: true,
        value: 'staffName'
      },
      {
        text: 'Departure Date',
        align: 'center',
        sortable: true,
        value: 'departure date'
      }
    ],
    exportList: [],
    editedIndex: -1,
    editedItem: {
      ExportID: 0,
      PurchaseOrderID: '',
      customerAddress: '',
      staffName: '',
      departureDate: '',
      reason: '',
      status: ''
    },
    defaultItem: {
      exportID: 0,
      purchaseOrderID: '',
      customerAddress: '',
      staffName: '',
      departureDate: '',
      reason: '',
      status: ''
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
    this.exportList = (await ExportService.getExport()).data
    console.log('exportList : ', this.exportList)
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
    exportList (val) {
      val || this.getExportList()
    }
    // statusChangeDialog (val) {
    //   val || this. closeStatusDialog()
    // }
  },
  methods: {
    createExport() {
      this.$emit('clicked',{name:'create-export'})
    },

    dropdownAction (dropdownValue,item) {
      this.editedIndex = this.exportList.indexOf(item)
      this.editedItem = Object.assign({}, item)
     if (dropdownValue == 1) {
        this.dialogViewMore = true
        this.show(item)
      }
    },

    async show(item) {//TO DO: ExportService.getExportDetailByID
      this.exportDetailTemp = (await ExportService.getExportDetailByID(item.ID)).data

    },

    async getExportList () {
      this.exportList = (await ExportService.getExport()).data
        console.log('exportList : ', this.exportList)
    },


    async saveStatus () {
      this.editedItem.status = this.statusRadio
      await ExportService.updateExport(this.editedItem)
      this.closeStatusDialog()
    },

    closeStatusDialog () {
      this.statusRadio = ''
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.statusChangeDialog = false
    },

    closeViewMoreDialog () {
      this.dialogViewMore = false
      this.lookupIndex = -1
    },

    editItem () {
      this.dialog = true
    },
  }
}
</script>

<style scoped>
.header {
  font-family: Roboto;
  font-size: 30px;
  color: #606060;
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
</style>
