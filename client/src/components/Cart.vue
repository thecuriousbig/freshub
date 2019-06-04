<template>
<v-container fill-height grid-list-lg>
  <v-layout row wrap>
    <v-flex xs12 style="text-align:left">
      <h1 class="header">Cart</h1>
      <p style="text-align: left; color:#cecece;">Profile > Edit Settings</p>
    </v-flex>
    <v-flex  justify-center xs6>
      <v-data-table
        :headers="headers"
        :items="cart.products"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center"></td>
          <td class="text-xs-center">{{ props.item.Name }}</td>
          <td class="text-xs-center">{{ props.item.Unit }}</td>
          <td class="text-xs-center">{{ props.item.Quantity }}</td>
          <td class="text-xs-center">{{ props.item.Cost }}</td>
          <td class="justify-center layout px-0">
            <v-btn flat icon @click="onDeleteItem(props.item.ID)">
                <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="footer">
          <td colspan="100%">
            <v-layout justify-end row wrap>
              <v-flex xs12>
                <strong>Shipping Fee</strong>
                <v-spacer></v-spacer>
                <strong>{{shippingFee}}</strong>
              </v-flex>
            <v-flex xs12>
              <strong>Total Price</strong>
              <v-spacer></v-spacer>
              <strong>{{TotalPrice}}</strong>
              <p>VAT included, where applicable</p>
            </v-flex>
            <v-flex xs12>
              <v-btn :to="{name: 'home-page'}" outline round color="warning" >Continue Shopping</v-btn>
            </v-flex>
            </v-layout>
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Ship to</v-subheader>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                label="First Name"
                v-model="PO.FirstName"
                required>
                </v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                label="Last Name"
                v-model="PO.LastName"
                required>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Email</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                label="John.Doe@example.com"
                v-model="PO.Email"
                required>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Tel No.</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                label="Tel No."
                :mask="tel.mask"
                v-model="PO.TelNo"
                :value="tel.value"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Shipping address</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                label="Your shipping address"
                required
                v-model="PO.ShippingAddress"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Deliver Date</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="PO.DeliverDate">
                  <v-text-field
                  slot="activator"
                  label="YYYY-MM-DD"
                  v-model="PO.DeliverDate"
                  readonly
                  required
                  append-icon="eve"
                  >
                  </v-text-field>
                  <v-date-picker v-model="PO.DeliverDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(PO.DeliverDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>                    
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Payment Method</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-radio-group v-model="PO.PaymentID" :mandatory="false" row >
                  <v-radio label="Cash on delivery" color="warning" value="2"></v-radio>
                  <v-radio label="Credit / Debit Card" color="warning" value="1"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs4>
              </v-flex>
              <v-flex xs4>
                <v-btn @click="onCreatePO" outline round color="warning" >Proceed to pay</v-btn>
              </v-flex>
              <v-flex xs4>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
    
</v-container>  
</template>
<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  data: ()=>({
      headers:[
          {
              text:'Item',
              align:'center',
              sortable: false,
              value:'src'
          },
          {
              text:'Product Name',
              align:'center',
              sortable: false,
              value:'name'
          },
          {
              text:'Unit',
              align:'center',
              sortable: false,
              value:'unit'
          },
          {
              text:'Quantity',
              align:'center',
              sortable: false,
              value:'quantity'
          },
          {
              text:'Cost',
              align:'center',
              sortable: false,
              value:'price'
          },
      ],
      // cart:[
      //     {
      //         src:'Rib Eye Steak 500g./pack',
      //         name:'Rib Eye Steak 500g./pack',
      //         unit:150,
      //         quantity:1,
      //     },
      //     {
      //         src:'Egg 1 dozen (NO.1)',
      //         name:'Egg 1 dozen (NO.1)',
      //         unit:42,
      //         quantity:2,
      //     }
      // ],
      tel:{
          mask : '###-###-####',
          value: '1234567890'
      },
      menu:false,
      deliverDate:null,
      paymentMethod:null,
      shippingFee:'FREE',
      PO:{
        FirstName: 'John',
        LastName: 'Doe',
        Email:'BiGGY@gmail.com',
        TelNo:'0123456789',
        ShippingAddress:'123 JSON Rd. JavaScript ECMA 12345 Thailand',
        OrderDate: '',
        DeliverDate: '', 
        PaymentID:'2'
      },
      // TotalPrice:'FREE',
  }),
  computed:{
    ...mapGetters([
      'cart','TotalPrice','isLoggedIn'
    ]),
  },
  mounted(){
    this.PO.OrderDate = this.moment().format('YYYY-MM-DD')
  },
  methods:{
    ...mapActions([
      'RESET_CART','CREATE_PO'
    ]),
    ...mapActions({
      DELETE_PRODUCT : 'DELETE_PRODUCT_IN_CART'
    }),
    onDeleteItem(ProductID){
      this.DELETE_PRODUCT(ProductID)
    },
    onResetCart(){
      this.RESET_CART()
    },
    onCreatePO(){
      if(this.isLoggedIn){
        this.CREATE_PO(this.PO)
        this.RESET_CART()
      }
      else{
        alert('Please Log in first')
      }
    }
  }
}
</script>
<style scoped>

</style>
