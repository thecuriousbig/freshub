<template>
  <v-app>
    <v-container fill-height>
      <v-layout row wrap>
        <v-flex xs12 xl12 justify-center wrap>
          <h1 style="text-align:left;">Create Import</h1>
          <p style="text-align:left;">Import > Create</p>
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
                        <p style="text-align:left;">Requisition's staff</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <v-text-field 
                          v-model="importItem.RecipientID" 
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
                      <p style="text-align:left;">Arrived Date</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <p>{{ moment().format('YYYY/MM/DD') }}</p>
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
                <div class="headline">Import Details</div>
                <v-card-text style="padding: 0px 0px;">
                  <v-form>
                    <v-layout wrap align-center>
                      <v-flex xs12 sm6 md4>
                        <p style="text-align:left;">Material Order ID</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <v-select
                          :items="materialOrders"
                          v-model="importItem.MaterialOrder"
                          label="Material Order"
                          class="input-group--focused"
                          item-text="ID"
                          :rules="[() => importItem.MaterialOrder.MaterialOrderID !='' || 'This field is required']"
                          required
                        ></v-select>
                        <!-- <p v-if="importItem.manufacturer.manufacturerID != ''">{{ importItem.manufacturer }}</p> -->
                      </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center v-if="importItem.MaterialOrder.MaterialOrderID != 0" >
                      <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Manufacturer</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <p>{{ importItem.MaterialOrder.Manufacturer.ManufacturerName }}</p>
                      </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center v-if="importItem.MaterialOrder.MaterialOrderID != ''">
                      <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Manufacturer's Address</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <p>{{ importItem.MaterialOrder.Manufacturer.Address }}</p>
                      </v-flex> 
                    </v-layout>

                    <v-layout wrap align-center v-if="importItem.MaterialOrder.MaterialOrderID != ''">
                      <v-flex xs12 sm6 md4>
                      <p style="text-align:left;">Phone number</p>
                      </v-flex>
                      <v-flex xs12 sm6 md8 style="padding-right: 8px;">
                        <p>{{ importItem.MaterialOrder.Manufacturer.TelNo }}</p>
                      </v-flex> 
                    </v-layout>          

                  </v-form>
                </v-card-text>
              </v-card-title>
            </v-card>
              <v-card
                v-if="importItem.MaterialOrder.MaterialOrderID != ''" 
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
                                  :items="materials"
                                  v-model="editedItem.ImportDetail"
                                  label="Material"
                                  class="input-group--focused"
                                  item-text="MaterialName"
                                  :rules="[() => editedItem.ImportDetail.MaterialName != null || 'This field is required']"
                                  required
                                ></v-select>
                              </v-flex>
                                <!-- <p>{{editedItem.ImportDetail}}</p> -->
                                <!-- <p>{{editedItem.MaterialOrder.OrderList}}</p> -->
                              <v-flex xs12 sm12 md12>  
                                <v-text-field 
                                  v-if="editedItem.ImportDetail != ''"
                                  v-model="editedItem.ImportDetail.Amount" 
                                  :value=0 
                                  label="Amount"
                                  return-masked-value
                                  mask="#####"
                                  type="number"
                                  :rules="[() => editedItem.ImportDetail.Amount > 0 || 'This field is required']"
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
                  :items="importItem.ImportDetail"
                  hide-actions
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.ID }}</td>
                    <td class="text-xs-center">{{ props.item.MaterialName }}</td>
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
import ImportService from '@/services/ImportService'
import MaterialStorageService from '@/services/MaterialStorageService'
import MaterialOrderService from '@/services/MaterialOrderService'

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
        materialOrders:[],
        materials:[],
        headers: [
          {
            text: 'MaterialID',
            align: 'center',
            sortable: true,
            value: 'materialID'
          },
          {
            text: 'Material',
            align: 'center',
            sortable: true,
            value: 'material'
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
          RecipientID: 0,
          ArrivedDate: moment().format('YYYY/MM/DD') ,
          MaterialOrder: {
            MaterialOrderID:0,
            OrderDate:'',
            DeliverDate:'',
            Manufacturer: 
            {
              ID: 0,
              ManufacturerName: '',
              Address: '',
              TelNo: ''
            },
          },
          ImportDetail:[]
        },
        defaultItem: {
          RecipientID: 0,
          ArrivedDate: moment().format('YYYY/MM/DD') ,
          MaterialOrder: {
            MaterialOrderID:0,
            OrderDate:'',
            DeliverDate:'',
            Manufacturer: 
            {
              ID: 0,
              ManufacturerName: '',
              Address: '',
              TelNo: ''
            },
          },
          ImportDetail:[]
        },
        importItem: {
          RecipientID: 0,
          ArrivedDate: moment().format('YYYY/MM/DD') ,
          MaterialOrder: {
            MaterialOrderID:0,
            OrderDate:'',
            DeliverDate:'',
            Manufacturer: 
            {
              ID: 0,
              ManufacturerName: '',
              Address: '',
              TelNo: ''
            },
          },
          ImportDetail:[]
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      
    },
    watch: {
    dialog (val) {
      val || this.close()
    },
    materials (val) {
      val || this.getMaterialList()
    },
    materialOrders (val) {
      val || this.getMaterialOrderList()
    }
  },
  async mounted() {
    this.materials = (await MaterialStorageService.getMaterial()).data
    this.materialOrders = (await MaterialOrderService.getMaterialOrder()).data
  },
  methods: {
    dropdownAction (dropdownValue,item) {
    this.editedIndex = this.importItem.ImportDetail.indexOf(item)
    this.editedItem.ImportDetail = Object.assign({}, item)
    if (dropdownValue == 1) {
        this.editItem ()
      } else {
        this.deleteItem (item)
      }
    },
    async getMaterialList() {
      this.materials = (await MaterialStorageService.getMaterial()).data
    },

    async getMaterialOrder() {
      this.materialOrders = (await MaterialOrderService.getMaterialOrder()).data
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
      this.editedItem.ImportDetail = Object.assign({}, this.defaultItem.ImportDetail)
      this.editedIndex = -1
      this.dialog = false
    },

    cancelSettings () {
      this.$router.push({path: '/import'})
    },

    async saveSettings () {
      await ImportService.createImport(this.importItem)
      this.$router.push({path: '/import'})
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.importItem.ImportDetail[this.editedIndex], this.editedItem.ImportDetail)
        
      } else {
        if(this.editedItem.ImportDetail.MaterialName == '' || this.editedItem.ImportDetail.Amount == 0)
          this.close()
        else {
          console.log(this.importItem)
          if(this.importItem.ImportDetail.length > 0 && this.importItem.ImportDetail.indexOf(this.editedItem.ImportDetail) != -1){
            // console.log('already have')
            // console.log(editedItem.purchaseOrder.OrderList.amount)
            // const index = this.exportItem.purchaseOrder.OrderList.indexOf(this.editedItem.purchaseOrder.OrderList)
          }
          else this.importItem.ImportDetail.push(this.editedItem.ImportDetail)
        }
      }
      this.close()
    },

    deleteItem (item) {
      const index = this.importItem.ImportDetail.indexOf(item)
      confirm('Are you sure you want to cancel this order?') && this.importItem.ImportDetail.splice(index, 1)
      this.editedIndex = -1
      this.editedItem.ImportDetail = Object.assign({},this.defaultItem.ImportDetail)
    },

    editItem () {
      this.dialog = true
    },
  },
  filters: {
    moment: function () {
      this.importItem.currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
      return this.importItem.currentDateTime
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
 