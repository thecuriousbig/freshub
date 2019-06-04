<template>
    <v-flex md8 offset-xs2>
        <v-container grid-list-lg align-center>
        <v-layout row wrap>
            <v-flex xs12 xl12 style="text-align:left">
            <h1 class="header" style="display:inline-flex;float:left;">Purchase Order History</h1>
            </v-flex>
        
            <v-flex xs12 xl12>
                <v-layout row wrap>
                    <v-dialog v-model="viewInfo" max-width="811px">
                        <v-card>
                            <v-card-title>
                            </v-card-title>
                            <v-card-text>
                                <v-data-table
                                    :headers="infoHeaders"
                                    :items="selected_PO"
                                    hide-actions
                                    class="elevation-1"
                                    must-sort = true
                                >
                                    <template slot="items" slot-scope="props">
                                        <td class="text-xs-center">{{ props.item.Product.CategoryName }}</td>
                                        <td class="text-xs-center">{{ props.item.Product.Name }}</td>
                                        <td class="text-xs-center">{{ props.item.Product.Unit }}</td>
                                        <td class="text-xs-center">{{ props.item.Amount }}</td>
                                        <td class="text-xs-center">{{ props.item.Cost }}</td>
                                    </template>
                                    <template slot="footer">
                                        <td colspan="80%">
                                            <strong>Total Price</strong>
                                        </td>
                                        <td colspan="20%">
                                            <strong>{{TotalPrice}}</strong>
                                        </td>
                                    </template>
                                </v-data-table>
                                
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="grey" round outline flat @click.native="close()">Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-data-table
                    :headers="headers"
                    :items="historyList"
                    hide-actions
                    must-sort
                    class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>
                            <v-icon color="green" v-if="props.item.Status==='Delivered'">check</v-icon>
                            <v-icon color="orange" v-else>access_time</v-icon>
                        </td>
                        <td>{{ props.item.ID }}</td>
                        <td class="text-xs-center">{{ moment(props.item.OrderDate).format("DD MMMM YYYY") }}</td>
                        <!-- <td class="text-xs-center">{{ props.item.shipping }}</td> -->
                        <!-- <td class="text-xs-center">{{ props.item.shippingAddress }}</td> -->
                        <td class="text-xs-center">{{ PaymentMethod[props.item.PaymentID] }}</td>
                        <td class="text-xs-center">{{ moment(props.item.DeliverDate).format("DD MMMM YYYY") }}</td>
                        <td class="text-xs-center">{{ props.item.TotalPrice }}</td>
                        <td class="justify-center layout px-0">
                        <v-menu offset-y>
                            <v-btn icon slot="activator">
                            <v-icon color="grey">more_vert</v-icon>
                            </v-btn>
                            <v-list>
                            <v-list-tile v-for="dropdown in dropdowns" :key="dropdown.text" @click="onViewInfo(props.item.ID)">
                                <v-list-tile-title>{{ dropdown.text }}</v-list-tile-title>
                            </v-list-tile>
                            </v-list>
                        </v-menu>
                        </td>
                    </template>
                    </v-data-table>
                </v-layout>
            </v-flex>

        </v-layout>
        </v-container>
    </v-flex>
</template>

<script>
import Api from '@/services/Api'
export default {
  data: () => ({
    dropdowns: [{text:'View Info',value: 1}],
    dialog: false,
    viewInfo: false,
    statusRadio: '',
    headers: [
      {
        text: 'Status',
        align: 'center',
        sortable: true,
        value: 'Status'
      },
      {
        text: 'Purchase Order ID',
        align: 'center',
        sortable: true,
        value: 'ID'
      },
      {
        text: 'Order Data/Time',
        align: 'center',
        sortable: true,
        value: 'OrderDate'
      },
      // {
      //   text: 'Ship to',
      //   align: 'center',
      //   sortable: true,
      //   value: 'shipping'
      // },
      // {
      //   text: 'Shipping Address',
      //   align: 'center',
      //   sortable: true,
      //   value: 'shippingAddress'
      // },
      {
        text: 'Payment Method',
        align: 'center',
        sortable: true,
        value: 'PaymentID'
      },
      {
        text: 'Due Data/Time',
        align: 'center',
        sortable: true,
        value: 'DeliverDate'
      },
      {
        text: 'Total Price',
        align: 'center',
        sortale: true,
        value: 'TotalPrice'
      }
    ],
    historyList: [
        {
            ID: 'PO1001',
            items:[
                    {
                        pic:'PO1001 PIC',
                        productName:'NAME 1001',
                        unit:'grams',
                        quantity:2,
                        cost: 250
                    },
                    {
                        pic:'PO1002 PIC',
                        productName:'NAME 1002',
                        unit:'grams',
                        quantity:1,
                        cost: 100
                    },
                    {
                        pic:'PO1003 PIC',
                        productName:'NAME 1003',
                        unit:'grams',
                        quantity:2,
                        cost: 200
                    },
            ],
            OrderDate: '06 April 2018 9:00 AM.',
            shipping: 'Big Tanatorn',
            shippingAddress: 'Apple road, Mango city',
            PaymentID: 'Credit/Debit card',
            DeliverDate: '06 April 2018 13:00 PM.',
            TotalPrice: 1000
        },
        {
            ID: 'PO1002',
            items:[
                    {
                        pic:'PO1001 PIC',
                        productName:'NAME 1001',
                        unit:'grams',
                        quantity:2,
                        cost: 1000
                    },
                    {
                        pic:'PO1002 PIC',
                        productName:'NAME 1002',
                        unit:'grams',
                        quantity:20,
                        cost: 150
                    },
            ],
            OrderDate: '06 April 2018 9:00 AM.',
            shipping: 'Big Tanatorn',
            shippingAddress: 'Apple road, Mango city',
            PaymentID: 'Cash',
            DeliverDate: '06 April 2018 13:00 PM.',
            TotalPrice: 5000
        },
        {
            ID: 'PO1003',
            items:[
                    {
                        pic:'PO1001 PIC',
                        productName:'NAME 1001',
                        unit:'grams',
                        quantity:1,
                        cost: 250
                    },
            ],
            OrderDate: '06 April 2018 9:00 AM.',
            shipping: 'Big Tanatorn',
            shippingAddress: 'Apple road, Mango city',
            PaymentID: 'Cash',
            DeliverDate: '06 April 2018 13:00 PM.',
            TotalPrice: 250
        },
    ],
    editedIndex: -1,
    editedItem: {
      puchaseOrderId: 0,
      OrderDate: '',
      shipping: '',
      shippingAddress: '',
      PaymentID: '',
      DeliverDate: '',
      TotalPrice: ''
    },
    defaultItem: {
      puchaseOrderId: 0,
      OrderDate: '',
      shipping: '',
      shippingAddress: '',
      PaymentID: '',
      DeliverDate: '',
      TotalPrice: ''
    },
    //info
    infoHeaders:[
        {
            text: 'Item',
            align: 'center',
            sortable: true,
            value: 'Product.CategoryName'
        },
        {
            text: 'Product Name',
            align: 'center',
            sortable: true,
            value: 'Product.Name'
        },
        {
            text: 'Unit',
            align: 'center',
            sortable: true,
            value: 'Product.Unit'
        },
        {
            text: 'Quantity',
            align: 'center',
            sortable: true,
            value: 'Amount'
        },
        {
            text: 'Cost',
            align: 'center',
            sortable: true,
            value: 'Cost'
        },
    ],
    selected_PO:[],
    PaymentMethod:{},
    TotalPrice:0
  }),
  mounted(){
    this.getPaymentMethod()
    this.getPrevPO()
  },
  methods:{
    async onViewInfo(ID){
        this.viewInfo = true
        this.selected_PO = await this.getSelectedPO(ID)
    },
    async getSelectedPO(ID){
      try {
        let PO_detail = await Api().get('api/purchaseorder/detail/'+ID)
        let PO_detail_process = await Promise.all(
          PO_detail.data.map(async (PO) =>{
            let result = await Api().get('api/product/'+PO.ProductID)
            PO['Product'] = result.data
            PO['Cost'] = PO.Product.Price * PO.Amount
            return PO
          })
        )
        PO_detail_process['Cost'] = PO_detail_process
        this.TotalPrice = 0;
        PO_detail_process.forEach(PO=>{
            this.TotalPrice = this.TotalPrice + PO.Cost
        })
        return PO_detail_process
      } catch (error) {
        console.log('error : '+error);
      }
    },
    close() {
      this.viewInfo = false
    },
    async getPrevPO(){
      const userID = 1
      try {
        let prevPOs = await Api().get('/api/purchaseorder/user/'+userID)
        // prevPOs.data.sort()
        this.historyList = prevPOs.data
        // this.historyList = prevPOs.data.filter(PO => {
        //   return PO.Status === 'Delivered'
        // })
      } catch (error) {
        console.log('error : '+error);
      }
    },
    async getPaymentMethod(PaymentID){
      try {
        let PaymentMethod = await Api().get('/api/payment')
        this.PaymentMethod = PaymentMethod.data.reduce((obj,val,key)=>{
          obj[val.ID] = val.PaymentMethod;
          return obj
        },{})
      } catch (error) {
        console.log('error : '+error);
      }
      
    }
  }
}
</script>

<style scoped>
.header {
  font-family: Roboto;
  font-size: 24px;
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
