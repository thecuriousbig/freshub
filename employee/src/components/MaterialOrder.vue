<template>
  <v-app>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 xl12 style="text-align:left; ">
          <h1 class="header" style="display:inline-flex;float:left;">Material Order List</h1>
          <div style="display:inline-flex;float:right;">
            <v-btn depressed color="amber" dark slot="activator" class="mb-2" round @click="createMO">+ Create MO</v-btn> 
          </div>
        </v-flex>
        
            <v-dialog v-model="statusChangeDialog" max-width="300px">
              <v-card>
                <v-card-title>
                  <span style="text-align:center">Update this status</span>
                </v-card-title>
                <v-card-text>
                  <v-radio-group row v-model="statusRadio">
                    <v-radio label="Delivered" color="blue" value="Delivered"></v-radio>
                    <v-radio label="In Process" color="yellow" value="In Process"></v-radio>
                    <v-radio label="Late" color="red" value="Late"></v-radio>
                  </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="grey" round outline flat @click.native="closeStatusDialog()">Cancel</v-btn>
                    <v-btn color="amber" round  flat @click.native="saveStatus()">Save</v-btn>
                  </v-card-actions>
              </v-card>
            </v-dialog>


        <v-dialog v-model="dialogViewMore" max-width="55%">
          <v-card>
            <v-card-title>
              <span class="headline">Material Order List</span>
              <!-- <p>{{purchaseOrderList[0].purchaseOrderDetails}}</p> -->
            </v-card-title>
            <v-card-text style="padding:0px;">
              <v-data-table
              :headers="materialOrderDetailHeaders"
              :items="this.materialOrderDetailTemp"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.MaterialOrderID }}</td>
                <td class="text-xs-center">{{ props.item.Material.MaterialName }}</td>
                <td class="text-xs-center">{{ props.item.Material.Unit }}</td>
                <td class="text-xs-center">{{ props.item.PricePerUnit }}</td>
                <td class="text-xs-center">{{ props.item.Amount }}</td>
              </template>
            </v-data-table>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-flex xs12>
          <div>
            <v-data-table
              :headers="headers"
              :items="materialOrderList"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.ID }}</td>
                <td class="text-xs-center">{{ props.item.Manufacturer.ManufacturerName }}</td>
                <td class="text-xs-center">{{ moment(props.item.OrderDate).format("DD MMMM YYYY") }}</td>
                <td class="text-xs-center">{{ moment(props.item.DeliverDate).format("DD MMMM YYYY") }}</td>
                <!-- <td class="text-xs-center">{{ props.item.TotalPrice }}</td> -->
                <td class="text-xs-center">{{ props.item.Status }}</td>
                <td class="justify-center layout px-0">
                  <v-menu offset-y>
                    <v-btn icon slot="activator">
                      <v-icon color="grey">more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="dropdown in dropdowns" :key="dropdown.text" @click="dropdownAction(dropdown.value,props.item)">
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
import MaterialOrderService from '@/services/MaterialOrderService'
export default {
  data: () => ({
    dropdowns: [{text:'Update',value: 1},{text:'View More',value:2}],
    dialog: false,
    statusChangeDialog: false,
    statusRadio: '',
    dialogViewMore: false,
    lookupIndex: -1,
    materialOrderDetailTemp:[],
    materialOrderDetailHeaders: [
      {
        text: 'ID',
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
        text: 'Price Per Unit',
        align: 'center',
        sortable: true,
        value: 'pricePerUnit'
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
        text: 'Material Order ID',
        align: 'center',
        sortable: true,
        value: 'materialOrderID'
      },
      {
        text: 'Manufacturer',
        align: 'center',
        sortable: true,
        value: 'manufacturer'
      },
      {
        text: 'Order Date',
        align: 'center',
        sortable: true,
        value: 'orderDate'
      },
      {
        text: 'Deliver Date',
        align: 'center',
        sortable: true,
        value: 'deliverDate'
      },
      {
        text: 'Status',
        align: 'center',
        sortale: true,
        value: 'status'
      }
    ],
    materialOrderList: [],
    editedIndex: -1,
    editedItem: {
      ID: 0,
      ManufacturerID: 0,
      OrderDate: '',
      DeliverDate: '',
      TotalPrice: '',
      Status: ''
    },
    defaultItem: {
      ID: 0,
      ManufacturerID: 0,
      OrderDate: '',
      DeliverDate: '',
      TotalPrice: '',
      Status: ''
    },
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
    this.materialOrderList = (await MaterialOrderService.getMaterialOrder()).data
    console.log('materialorderList -> ', this.materialOrderList)
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    statusChangeDialog (val) {
      val || this.closeStatusDialog()
    },
    materialOrderList (val) {
      val || this.materialOrderList
    },
    dialogViewMore (val) {
      val || this.closeViewMoreDialog()
    },
  },

  methods: {

    dropdownAction (dropdownValue,item) {
      this.editedItem = Object.assign({}, item)
      if (dropdownValue == 1) {
        this.statusChangeDialog = true
      } else if (dropdownValue == 2) {
        this.dialogViewMore = true
        this.show(item)
      } 
    },

    async show(item) {
      this.materialOrderDetailTemp = (await MaterialOrderService.getMaterialOrderDetailByID(item.ID)).data

    },

    async getMaterialOrderList () {
      this.materialOrderList = (await MaterialOrderService.getMaterialOrder()).data
      console.log('materialorderList -> ', this.materialOrderList)
    },

    async deleteItem (item) {
      await MaterialOrderService.deleteMaterialOrder(item.ID).then( deleteLog => {
        console.log('delete log : ', deleteLog)
        this.getMaterialOrderList()
      }).catch( err => {
        console.log('delete error : ', err)
      })
    },

    createMO() {
      this.$emit('clicked',{name:'create-material-order'})
    },

    async saveStatus () {
      this.editedItem.Status = this.statusRadio
      await MaterialOrderService.updateMaterialOrder(this.editedItem).then(a => {
        console.log('update : ', a)
        this.getMaterialOrderList()
      })
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

    close () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.dialog = false
    },
    
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.materialOrderList[this.editedIndex], this.editedItem)
      } else {
        this.materialOrderList.push(this.editedItem)
      }
      this.close()
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
