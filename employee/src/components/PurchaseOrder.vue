<template>
  <v-app>
    <v-container grid-list-lg align-center>
      <v-layout row wrap>
        <v-flex xs12 xl12 style="text-align:left">
          <h1 class="header">Purchase Order List</h1>
        </v-flex>
       
        <v-flex xs12 xl12>
          <div>
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
                  <span class="headline">Purchase Order List</span>
                  <!-- <p>{{purchaseOrderList[0].purchaseOrderDetails}}</p> -->
                </v-card-title>
                <v-card-text style="padding:0px;">
                  <v-data-table
                  :headers="purchaseOrderDetailHeaders"
                  :items="this.purchaseOrderDetailTemp"
                  hide-actions
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left" style="font-weight: bold;">{{ props.item.ProductID }}</td>
                    <td class="text-xs-center">{{ props.item.Product.Name }}</td>
                    <td class="text-xs-center">{{ props.item.Product.Price }}</td>
                    <td class="text-xs-center">{{ props.item.Product.Amount }}</td>
                    <td class="text-xs-center">{{ props.item.Product.Amount * props.item.Product.Price}}</td>
                  </template>
                </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>

            <v-data-table
              :headers="headers"
              :items="purchaseOrderList"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.ID }}</td>
                <td class="text-xs-center">{{ moment(props.item.OrderDate).format("DD MMMM YYYY") }}</td>
                <td class="text-xs-center">{{ props.item.User.UserName }}</td>
                <td class="text-xs-center">{{ props.item.User.Address }}</td>
                <td class="text-xs-center">{{ props.item.PaymentMethod.PaymentMethod }}</td>
                <td class="text-xs-center">{{ moment(props.item.DeliverDate).format("DD MMMM YYYY") }}</td>
                <td class="text-xs-center">{{ props.item.TotalPrice }}</td>
                <td class="text-xs-center">{{ props.item.User.TelNo }}</td>
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
import PurchaseOrderService from '@/services/PurchaseOrderService'
export default {
  data: () => ({
    dropdowns: [{text:'Update',value: 1},{text:'View More',value:2}],
    dialog: false,
    dialogViewMore: false,
    statusChangeDialog: false,
    statusRadio: '',
    lookupIndex: -1,
    headers: [
      {
        text: 'PO ID',
        align: 'center',
        sortable: true,
        value: 'purchaseOrderID'
      },
      {
        text: 'Order Date/Time',
        align: 'center',
        sortable: true,
        value: 'orderDateTime'
      },
      {
        text: 'User Name',
        align: 'center',
        sortable: true,
        value: 'userName'
      },
      {
        text: 'Address',
        align: 'center',
        sortable: true,
        value: 'address'
      },
      {
        text: 'Payment Method',
        align: 'center',
        sortable: true,
        value: 'paymentMethod'
      },
      {
        text: 'Due Data/Time',
        align: 'center',
        sortable: true,
        value: 'dueDateTime'
      },
      {
        text: 'Total Price',
        align: 'center',
        sortable: true,
        value: 'totalPrice'
      },
      {
        text: 'Tel No.',
        align: 'center',
        sortable: true,
        value: 'telNo'
      },
      {
        text: 'Status',
        align: 'center',
        sortale: true,
        value: 'status'
      }
    ],
    purchaseOrderDetailHeaders: [
      {
        text: 'ProductID',
        align: 'center',
        sortable: true,
        value: 'img'
      },
      {
        text: 'Product Name',
        align: 'left',
        sortable: true,
        value: 'productName'
      },
      {
        text: 'Price Per Unit',
        align: 'center',
        sortable: true,
        value: 'pricePerUnit'
      },
      {
        text: 'Qauntity',
        align: 'center',
        sortable: true,
        value: 'amount'
      },
      {
        text: 'Cost',
        align: 'center',
        sortable: true,
        value: 'cost'
      }
    ],
    purchaseOrderList: [],
    purchaseOrderDetailTemp:[],
    editedIndex: -1,
    editedItem: {
      ID: 0,
      OrderDate: '',
      User: {
        UserName: '',
        Address: '',
        TelNo: ''
      },
      PaymentMethod:{PaymentMethod: ''}, 
      DeliverDate: '',
      TotalPrice: '',
      Status: ''
    },
    defaultItem: {
      ID: 0,
      OrderDate: '',
      User: {
        UserName: '',
        Address: '',
        TelNo: ''
      },
      PaymentMethod:{PaymentMethod: ''}, 
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
    this.purchaseOrderList = (await PurchaseOrderService.getPurchaseOrder()).data
    console.log('purchaseOrderList : ', this.purchaseOrderList)
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
    purchaseOrderList (val) {
      val || this.purchaseOrderList
    }
  },

  methods: {

    dropdownAction (dropdownValue,item) {
      this.editedItem = Object.assign({}, item)
      //update
      if (dropdownValue == 1) {
        this.statusChangeDialog = true
      } else if (dropdownValue == 2) {
        this.dialogViewMore = true
        this.show(item)
      }
    },

    async show(item) {
      this.purchaseOrderDetailTemp = (await PurchaseOrderService.getPurchaseOrderDetailByID(item.ID)).data

    },

    async getPurchaseOrderList () {
      this.purchaseOrderList = (await PurchaseOrderService.getPurchaseOrder()).data
        console.log('purchaseOrderList : ', this.purchaseOrderList)
    },

    async saveStatus () {
      this.editedItem.Status = this.statusRadio
      await PurchaseOrderService.updatePurchaseOrder(this.editedItem).then(a => {
        console.log('update : ', a)
        this.getPurchaseOrderList()
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
        Object.assign(this.purchaseOrderList[this.editedIndex], this.editedItem)
      } else {
        this.purchaseOrderList.push(this.editedItem)
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
