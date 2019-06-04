<template>
  <v-app>
    <v-container fill-height>
      <v-layout row wrap>
        <v-flex xs12 xl12 justify-center wrap>
          <h1 style="text-align:left;">Create Work Order</h1>
          <p style="text-align:left;">Workorder > Create</p>
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
                        <p style="text-align:left;">Manager</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <v-text-field 
                          v-model="workOrderItem.ManagerID" 
                          value="0000" prefix="ST" 
                          single-line
                          :counter="5"
                          :rules="[(v) => v.length <= 5 || 'Enter 5 numbers']"
                          :mask="mask"
                          required></v-text-field>
                      </v-flex> 
                    </v-layout>
                                      
                    <v-layout wrap align-center>
                      <v-flex xs12 sm6 md4>
                        <p style="text-align:left;">Staff</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <v-text-field 
                          v-model="workOrderItem.StaffID" 
                          value="0000" prefix="ST" 
                          single-line
                          :counter="5"
                          :rules="[(v) => v.length <= 5 || 'Enter 5 numbers']"
                          :mask="mask"
                          required></v-text-field>
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
                <div class="headline">Duty Information</div>
                <v-card-text style="padding: 0px 0px;">
                  <v-form>
                    <v-layout wrap align-center>
                      <v-flex xs12 sm6 md4>
                        <p style="text-align:left;">Duty</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <v-radio-group v-model="workOrderItem.DutyName" row :mandatory="false">
                          <v-radio label="Import" value="Import" ></v-radio>
                          <v-radio label="Export" value="Export"></v-radio>
                          <v-radio label="Package" value="Package"></v-radio>
                        </v-radio-group>
                        <!-- <p v-if="workOrderItem.duty == 'Export' || workOrderItem.duty ==  'Package'">{{ workOrderItem.duty || 'null'}}</p> -->
                      </v-flex> 
                    </v-layout>
                                      
                    <v-layout wrap align-center row v-if="workOrderItem.DutyName == 'Import'" >
                        <v-flex xs12 sm6 md4>
                          <p  style="text-align:left;">MO ID</p>
                        </v-flex>
                        <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                          <v-text-field 
                            prefix="MO"
                            name="input-1-3" 
                            single-line v-model="workOrderItem.OrderID" 
                            :counter="5"
                            :rules="[(v) => v.length <= 5 || 'Enter 5 numbers']"
                            :mask="mask"
                            required></v-text-field>
                        </v-flex> 
                    </v-layout>
                    <v-layout wrap align-center row v-if="workOrderItem.DutyName == 'Export'" >
                        <v-flex xs12 sm6 md4>
                          <p  style="text-align:left;">PO ID</p>
                        </v-flex>
                        <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                          <v-text-field 
                            prefix="PO"
                            name="input-1-3" 
                            single-line v-model="workOrderItem.OrderID" 
                            :counter="5"
                            :rules="[(v) => v.length <= 5 || 'Enter 5 numbers']"
                            :mask="mask"
                            required></v-text-field>
                        </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center>
                      <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Order Date/time</p>
                    </v-flex>
                    <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                      <p>{{ moment().format('L, LT') }}</p>
                    </v-flex> 
                  </v-layout>
                  <v-layout wrap align-center>
                    <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Due Date/time</p>
                    </v-flex>
                    <v-flex xs12 sm6 md8 >
                      <v-dialog
                        ref="dialog"
                        persistent
                        v-model="modal"
                        lazy
                        full-width
                        width="290px"
                        :return-value.sync="dueDate">
                        <v-text-field
                          slot="activator"
                          label="Select date"
                          v-model="dueDate"
                          prepend-icon="event"
                          readonly
                          ></v-text-field>
                          <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(dueDate)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex> 
                    </v-layout>
                    <v-layout wrap align-center>
                      <v-flex xs12 sm6 md4></v-flex>
                      <v-flex xs12 sm6 md8 >
                        <v-menu
                          ref="menu"
                          :close-on-content-click="false"
                          v-model="menu2"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                          :return-value.sync="dueTime">
                          <v-text-field
                            slot="activator"
                            label="Select time"
                            v-model="dueTime"
                            prepend-icon="access_time"
                            readonly>
                          </v-text-field>
                          <v-time-picker 
                            v-model="dueTime" 
                            @change="$refs.menu.save(dueTime)"
                            ></v-time-picker>
                        </v-menu>
                      </v-flex> 
                    </v-layout>
                  </v-form>
                </v-card-text>
              </v-card-title>
            </v-card>
            <div v-if="workOrderItem.DutyName == 'Package'">
              <v-card 
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
                                  v-model="editedItem.OrderList"
                                  label="Product"
                                  class="input-group--focused"
                                  item-text="Name"
                                  :rules="[() => editedItem.OrderList.Name.length > 0 || 'This field is required']"
                                  required
                                ></v-select>
                              </v-flex>
                                <!-- <p>{{editedItem.orderList}}</p> -->
                                <!-- :rules="[(v) => v.length >= 0 || 'More than 0']"  เอาออกมาจาก v-text-field ข้างล่าง ทำให้ไม่มี err--> 
                              <v-flex xs12 sm12 md12>  
                                <v-text-field 
                                  v-if="editedItem.OrderList.Name != ''"
                                  v-model="editedItem.OrderList.Amount" 
                                  :value="0" 
                                  label="Amount"
                                  return-masked-value
                                  mask="#####"
                                  :rules="[() => editedItem.OrderList.Amount > 0 || 'This field is required']"
                                  required
                                  type="number"></v-text-field>                   
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
                  :items="workOrderItem.OrderList"
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
                          <v-list-tile v-for="(dropdown,i) in dropdowns" :key="i" @click="dropdownAction(dropdown.value,props.item)">
                            <v-list-tile-title>{{ dropdown.text }}</v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </div>
              
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
import WorkOrderService from '@/services/WorkOrderService';
import ProductStorageService from '@/services/ProductStorageService';
export default {
    data () {
      return {
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
        dueDate:null,
        dueTime:null,
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
        workOrderList: [],
        editedIndex: -1,
        editedItem: {
          ManagerID: '',
          StaffID: '',
          DutyID: '',
          OrderID:0,
          OrderDateTime: null,
          DueDateTime: null,
          OrderList: 
            {
              Name: '',
              ProductID: 0,
              Unit: '',
              Amount: 0,
            }
        },
        defaultItem: {
          ManagerID: '',
          StaffID: '',
          DutyID: '',
          OrderID:0,
          OrderDateTime: null,
          DueDateTime: null,
          OrderList: 
            {
              Name:'',
              ProductID: 0,
              Unit: '',
              Amount:0,
            }
        },
        workOrderItem: {
          ManagerID: '',
          StaffID: '',
          DutyName: '',
          OrderID:0,
          OrderDateTime: moment().format('L, LT'),
          DueDateTime: null,
          OrderList: []
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    watch: {
    dialog (val) {
      val || this.close()
    },
    date (val) {
      this.dueDate = this.formatDate(this.date)
    }
  },
  async mounted() {
    this.products = (await ProductStorageService.getProduct()).data
    console.log('product: ', this.products)
  },
    methods: {
    dropdownAction (dropdownValue,item) {
    this.editedIndex = this.workOrderItem.OrderList.indexOf(item)
    this.editedItem.OrderList = Object.assign({}, item)
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
      this.editedItem.OrderList = Object.assign({}, this.defaultItem.OrderList)
      this.editedIndex = -1
      this.dialog = false
    },

    cancelSettings () {
      this.$router.push({path: '/work-order'})
    },

    async saveSettings () {
      this.workOrderItem.DueDateTime = `${this.dueDate},${this.dueTime}`
      console.log(this.workOrderItem.DueDateTime )
      var result = (await WorkOrderService.createWorkOrder(this.workOrderItem)).data
      console.log('result : ' , result)
      this.$router.push({path: '/work-order'})
    },

    save () {
      
      if (this.editedIndex > -1) {
        Object.assign(this.workOrderItem.OrderList[this.editedIndex], this.editedItem.OrderList)
        
      } else {
        if(this.editedItem.OrderList.Name == '' || this.editedItem.OrderList.Amount == 0)
          this.close()
        else{
          if(this.workOrderItem.OrderList.length > 0 && this.workOrderItem.OrderList.indexOf(this.editedItem.OrderList) != -1){
            // console.log('already have')
            // console.log(this.editedItem.orderList.amount)
            // const index = this.materialOrderItem.orderList.indexOf(this.editedItem.orderList)
            // console.log(this.materialOrderItem.orderList[index].amount)
          }
          else this.workOrderItem.OrderList.push(this.editedItem.OrderList)
        }
      }
      console.log(this.workOrderItem)
      this.close()
    },

    deleteItem (item) {
      const index = this.workOrderItem.OrderList.indexOf(item)
      confirm('Are you sure you want to cancel this order?') && this.workOrderItem.OrderList.splice(index, 1)
      this.editedIndex = -1
      this.editedItem.OrderList= Object.assign({}, this.defaultItem.OrderList)
    },

    editItem () {
      this.dialog = true
    },
  },
  filters: {
    moment: function () {
      this.workOrderItem.currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
      return this.workOrderItem.currentDateTime;
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
 