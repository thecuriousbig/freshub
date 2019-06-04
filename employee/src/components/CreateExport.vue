<template>
  <v-app>
    <v-container fill-height>
      <v-layout row wrap>
        <v-flex xs12 xl12 justify-center wrap>
          <h1 style="text-align:left;">Create Export</h1>
          <p style="text-align:left;">Export > Create</p>
            <v-card color="White" width="75%" style="display: inline-block; 
              margin: 20px 0px;
              padding: 10px 40px;
              border--radius: 5px;">
              <v-card-title primary-title>
                <div class="headline">Person In Charge</div>
                <v-card-text style="padding: 0px 0px;">
                  <v-form>
                    <v-layout wrap align-center>
                      <v-flex xs12 sm6 md4>
                        <p style="text-align:left;">Staff</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <v-text-field 
                          v-model="exportItem.StaffID" 
                          value="0000" prefix="ST" 
                          single-line
                          :counter="5"
                          :rules="[(v) => v.length <= 5 || 'Enter 5 numbers']"
                          :mask="mask"></v-text-field>
                      </v-flex> 
                    </v-layout>

                    
                    
                  </v-form>
                </v-card-text>
              </v-card-title>
            </v-card>    
            <v-card color="White" width="75%" style="display: inline-block; 
                margin: 20px 0px;
                padding: 10px 40px;
                border--radius: 5px;">
              <v-card-title primary-title>
                <div class="headline">Export Details</div>
                <v-card-text style="padding: 0px 0px;">
                  <v-form>
                    <v-layout wrap align-center>
                      <v-flex xs12 sm6 md4>
                        <p style="text-align:left;">Purchase Order ID</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <v-select
                          :items="purchaseOrders"
                          v-model="exportItem.PurchaseOrder"
                          label="Purchase Order"
                          class="input-group"
                          item-text="ID"
                          :rules="[() => exportItem.PurchaseOrder.PurchaseOrderID >= 0 || 'This field is required']"
                          required
                        ></v-select>
                        <!-- <p v-if="exportItem.purchaseOrder.purchaseOrderID != ''">{{ exportItem.purchaseOrder }}</p> -->
                      </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center v-if="exportItem.PurchaseOrder.PurchaseOrderID != ''" >
                      <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Order Date/time</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <p>{{ exportItem.PurchaseOrder.OrderDateTime}}</p>
                      </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center v-if="exportItem.PurchaseOrder.PurchaseOrderID != ''">
                      <v-flex xs12 sm6 md4>
                        <p style="text-align:left;">Departure Date</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 >
                        <v-dialog
                          ref="dialog"
                          persistent
                          v-model="modal"
                          lazy
                          full-width
                          width="290px"
                          :return-value.sync="exportItem.DepartureDate">
                          <v-text-field
                            slot="activator"
                            v-model="date"
                            prepend-icon="event"
                            readonly                            
                            :hint='"Please select date before "+moment(exportItem.PurchaseOrder.DeliverDate).format("DD MMMM YYYY")'
                            persistent-hint                                                        
                            ></v-text-field>
                            <v-date-picker 
                              v-model="date" 
                              scrollable
                              :max='exportItem.PurchaseOrder.DeliverDate'>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.dialog.save(exportItem.DepartureDate)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                        <!-- <p>{{formatDate(exportItem.purchaseOrder.deliverDate)}}</p> -->
                      </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center v-if="exportItem.PurchaseOrder.PurchaseOrderID != ''" >
                      <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Customer name</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <p>{{ exportItem.PurchaseOrder.UserName }}</p>
                      </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center v-if="exportItem.PurchaseOrder.PurchaseOrderID != ''">
                      <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Customer's Address</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <p>{{ exportItem.PurchaseOrder.ShippingAddress }}</p>
                      </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center v-if="exportItem.PurchaseOrder.PurchaseOrderID != ''">
                      <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Phone number</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <p>{{ exportItem.PurchaseOrder.TelNo }}</p>
                      </v-flex> 
                    </v-layout>          

                  </v-form>
                </v-card-text>
              </v-card-title>
            </v-card>
              <v-card 
                v-if="exportItem.PurchaseOrder.PurchaseOrderID != ''"
                depressed
                color="White" 
                width="75%"  
                style="display: inline-block; 
                  margin: 10px 0px 20px 0px;
                  padding: 0px 0px;
                  border--radius: 5px;">              
                <v-card-text style="padding: 24px 0px 14px 56px;">
                <v-layout wrap row justify-space-between>
                  <v-flex xs6 class="headline">Order List</v-flex>
                  <v-flex xs6 >
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-btn depressed color="amber" dark slot="activator" class="mb-2" round >+ Add new item</v-btn>
                      <v-card>
                        <v-card-title style="padding: 16px 16px 0px 16px;">
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12 sm12 md12 >
                                <v-select
                                  :items="products"
                                  v-model="editedItem.PurchaseOrder.OrderList"
                                  label="Products"
                                  class="input-group--focused"
                                  item-text="Name"
                                  :rules="[() => editedItem.PurchaseOrder.OrderList.Name.length > 0 || 'This field is required']"
                                  required
                                ></v-select>
                              </v-flex>
                                <!-- <p v-if="editedItem.OrderList.material != ''">{{editedItem.OrderList}}</p> -->
                              <v-flex xs12 sm12 md12>  
                                <v-text-field 
                                  v-if="editedItem.PurchaseOrder.OrderList.Name != ''"
                                  v-model="editedItem.PurchaseOrder.OrderList.Amount" 
                                  :value="0" 
                                  label="Amount"
                                  return-masked-value
                                  mask="#####"
                                  type="number"
                                  :rules="[() => editedItem.PurchaseOrder.OrderList.Amount > 0 || 'This field is required']"
                                  required
                                  ></v-text-field>                   
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" flat @click.native="close">Cancel</v-btn>
                          <v-btn color="amber" flat @click.native="save">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                </v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="exportItem.OrderList"
                  hide-actions
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.ID }}</td>
                    <td class="text-xs-center">{{ props.item.Name }}</td>
                    <td class="text-xs-center">{{ props.item.Unit }}</td>
                    <td class="text-xs-center">{{ props.item.Amount }}</td>
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
              </v-card>
              <v-card 
                color="White" 
                width="75%"  
                style="display: inline-block; 
                  margin: 20px 0px;
                  padding: 10px 40px;
                  border--radius: 5px;">
                <v-card-title primary-title>
                  <div class="headline">Reason</div>
                  <v-card-text style="padding: 0px 0px;">
                    <v-container fluid style="padding: 0px 0px;">
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            name="input-1"
                            label="Enter your reason . . ."
                            v-model="exportItem.Reason"
                            textarea></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card-title>
              </v-card>
              <div>    
                <v-btn depressed round dark outline color="amber" class="button"  style="height:40px; width:164px;" @click.native="cancelSettings">Cancel</v-btn>
                <v-btn depressed round dark color="amber" class="button"  style="height:40px; width:164px;" @click.native="saveSettings">Save Settings</v-btn>
              </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import moment from 'moment';
import ExportService from '@/services/ExportService';
import PurchaseOrderService from '@/services/PurchaseOrderService';
import ProductStorageService from '@/services/ProductStorageService'


export default {
    data () {
      return {
        checkManu: 0,
        mask: '#####',
        date: null,
        column: null,
        row: null,
        selected: '',
        menu2: false,
        menu: false,
        modal: false,
        dialog: false,
        statusChangeDialog: false,
        dropdowns: [{text:'Edit',value:1},{text:'Delete',value:2}],
        purchaseOrders: [],
        products:[],
        headers: [
          {
            text: 'ProductID',
            align: 'center',
            sortable: true,
            value: 'productID'
          },
          {
            text: 'Product',
            align: 'center',
            sortable: true,
            value: 'product'
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
          },
          {
            text: 'Action',
            align: 'center',
            sortable: true,
            value: 'action'
          }
        ],
        editedIndex: -1,
        editedItem: {
          StaffID: '',
          PurchaseOrder:
          { 
            ID: '',
            UserName: '',
            ShippingAddress: '',
            TelNo: '',
            OrderDateTime: '',
            DeliverDate: '',
            OrderList: 
              {
                ProductID: 0,
                Name: '',
                Unit: '',
                Amount: 0
              }
          },
          DepartureDate: '',
          Reason: ''
        },
        defaultItem: {
          StaffID: '',
          PurchaseOrder:
          { 
            ID: '',
            UserName: '',
            ShippingAddress: '',
            TelNo: '',
            OrderDateTime: '',
            DeliverDate: '',
            OrderList: 
              {
                ProductID: 0,
                Name: '',
                Unit: '',
                Amount: 0
              }
          },
          DepartureDate: '',
          Reason: ''
        },
        exportItem: {
          StaffID: '',
          PurchaseOrder:
          { 
            ID: '',
            UserName: '',
            ShippingAddress: '',
            TelNo: '',
            OrderDateTime: '',
            DeliverDate: '',
          },
          DepartureDate: '',
          Reason: '',
          OrderList: []
        },
        purchaseOrdersIDs:[]
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      
    },
    async mounted() {
      this.products = (await ProductStorageService.getProduct()).data
      console.log(this.products);
      
      this.purchaseOrders = (await PurchaseOrderService.getPurchaseOrder()).data
    },
    watch: {
    dialog (val) {
      val || this.close()
    },
    purchaseOrders( val) {
      val || this.getPurchaseOrder()
    },
    products(val) {
      val || this.getProduct()
    },
    date (val) {
        this.exportItem.departureDate = this.formatDate(this.date)
    },

  },
  methods: {
    async getpurchaseOrder () {
       this.purchaseOrders = (await PurchaseOrderService.getPurchaseOrder()).data
    },
    async getProduct() {
      this.products = (await ProductStorageService.getProduct()).data
    },
    dropdownAction (dropdownValue,item) {
    this.editedIndex = this.exportItem.OrderList.indexOf(item)
    this.editedItem.PurchaseOrder.OrderList = Object.assign({}, item)
    if (dropdownValue == 1) {
        this.editItem ()
      } else {
        this.deleteItem (item)
      }
    },

    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
    },

    parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    moment: function (date) {
      return moment(date)
    },

    close () {
      this.editedItem.PurchaseOrder.OrderList = Object.assign({}, this.defaultItem.PurchaseOrder.OrderList)
      this.editedIndex = -1
      this.dialog = false
    },

    cancelSettings () {
      this.$router.push({path: '/export'})
    },

    async saveSettings () {
      await ExportService.createExport({
        "StaffID": this.exportItem.StaffID,
        "DepartureDate": this.exportItem.DepartureDate,
        "PurchaseOrderID": this.exportItem.PurchaseOrder.ID,
        "Reason": this.exportItem.Reason,
        "OrderList": this.exportItem.OrderList
})
      this.$router.push({path: '/export'})
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.exportItem.OrderList[this.editedIndex], this.editedItem.PurchaseOrder.OrderList)
        
      } else {
        if(this.editedItem.PurchaseOrder.OrderList.product == '' || this.editedItem.PurchaseOrder.OrderList.amount == '0')
          this.close()
        else{
          // console.log('Check length ' + this.exportItem.OrderList.length)
          // console.log('Check index ' + this.exportItem.OrderList.indexOf(this.editedItem.PurchaseOrder.OrderList))
          if(this.exportItem.OrderList.length >0 && this.exportItem.OrderList.indexOf(this.editedItem.PurchaseOrder.OrderList) != -1){
            // console.log('already have')
            // console.log(editedItem.PurchaseOrder.OrderList.amount)
            // const index = this.exportItem.OrderList.indexOf(this.editedItem.PurchaseOrder.OrderList)
            // console.log(this.editedItem.PurchaseOrder.OrderList[index].amount)
          }
          else this.exportItem.OrderList.push(this.editedItem.PurchaseOrder.OrderList)
        }
      }
      console.log(this.exportItem)
      this.close()
    },

    deleteItem (item) {
      const index = this.exportItem.OrderList.indexOf(item)
      confirm('Are you sure you want to cancel this order?') && this.exportItem.OrderList.splice(index, 1)
      this.editedIndex = -1
      this.editedItem.PurchaseOrder.OrderList= Object.assign({},this.defaultItem.PurchaseOrder.OrderList)
    },

    editItem () {
      this.dialog = true
    },
  },
  filters: {
    moment: function () {
      this.exportItem.currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
      return this.exportItem.currentDateTime;
    }
  }
}
</script>

<style scoped>
v-text-field{
    margin-right: 8px;
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
h1{
    font-family: Roboto;
    font-size: 30px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.34;
    letter-spacing: normal;
    text-align: left;
    color: #606060;
}
p {
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.24;
    letter-spacing: normal;
    text-align: left;
    color: #606060;
}

 </style>
 