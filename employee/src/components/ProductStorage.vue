<template>
  <v-app>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 xl12 justify-center wrap>
          <h1 class="header" style="float:left;">Storage of Products</h1>
        </v-flex>
        <v-flex xs12 xl12 justify-center wrap>
          <p style="text-align:left;">Storage > Product</p>
        </v-flex>
        
        <v-flex xs8 xl8 stlye="text-align:left">
            <v-radio-group row v-model="filterRadio" :mandatory="false" >
              <v-radio label="All" value="all"></v-radio>
              <v-radio label="Fruit" value="Fruit"></v-radio>
              <v-radio label="Vegetable" value="Vegetable"></v-radio>
              <v-radio label="Meat" value="Meat"></v-radio>
              <v-radio label="Seafood" value="Seafood"></v-radio>
              <v-radio label="Egg" value="Egg"></v-radio>
            </v-radio-group>
        </v-flex>
        <v-flex xs4 xl4>
          <div style="display:inline-flex; float:left;">
            <v-dialog v-model="dialog" max-width="600px">
                <v-btn v-if="isAdmin" depressed color="amber" dark slot="activator" class="mb-2" round >+ Add New Product</v-btn> 
                <v-card  style="padding:24px; border-radius: 10px;">
                  <v-card-title>
                    <span class="headline" style="padding:0x;">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md6 style="padding: 30px 0px;">
                          <p style="text-align:left;">Product Name</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field 
                            label="Enter material name" 
                            v-model="editedItem.Name"
                            :rules="[() => editedItem.ProductName != '' || 'This field is required']"
                            required></v-text-field>
                        </v-flex>
                        
                        <v-flex xs12 sm6 md6 style="padding: 30px 0px;">
                          <p style="text-align:left;">Product Unit</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field 
                            label="Enter material unit" 
                            v-model="editedItem.Unit"
                            :rules="[() => editedItem.Unit != '' || 'This field is required']"
                            required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6 md6 v-if="editedItem.Name != ''" style="padding: 30px 0px;">
                          <p style="text-align:left;">Category</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6 v-if="editedItem.Name != ''">
                          <v-select
                            :items="categories"
                            v-model="editedItem.CategoryName"
                            label="Category"
                            class="input-group"
                            item-text="category"
                            :rules="[() => editedItem.CategoryName!= '' || 'This field is required']"
                            required
                          ></v-select>
                        </v-flex>

                        <v-flex xs12 sm6 md6 v-if="editedItem.Name != ''" style="padding: 30px 0px;">
                          <p style="text-align:left;">Price per unit</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field 
                            v-if="editedItem.Name != ''"
                            v-model="editedItem.Price"
                            :value="0" 
                            label="Price"
                            return-masked-value
                            mask="#####"
                            type="number"
                            :rules="[() => editedItem.Price > 0 || 'Price must more than 0',
                                    () => editedItem.Price != '' || 'This field is required']"
                            required
                            ></v-text-field>  
                        </v-flex>

                        <v-flex xs12 sm6 md6 v-if="editedItem.Name != ''" style="padding: 30px 0px;">
                          <p style="text-align:left;">Amount</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field 
                            v-if="editedItem.Name != ''"
                            v-model="editedItem.Amount" 
                            :value="0" 
                            label="Amount"
                            return-masked-value
                            mask="#####"
                            type="number"
                            :rules="[() => editedItem.Price != '' || 'This field is required']"
                            required
                            ></v-text-field>  
                        </v-flex>

                        <v-flex xs12 sm6 md6 v-if="editedItem.Name != ''" style="padding: 30px 0px;">
                          <p style="text-align:left;">Image link</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field 
                            v-if="editedItem.Name != ''"
                            label="Enter image link" 
                            v-model="editedItem.img"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed outline color="grey" @click.native="close" round>Cancel</v-btn>
                    <v-btn depressed dark color="amber" @click.native="save" round>Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </div>
        </v-flex>
        <v-layout row wrap >
          <!-- Mocking card -->
          <v-flex>
              <v-container fluid grid-list-md>
                <v-layout row wrap justify-start>
                  <v-flex 
                    xs12 sm4 md4 lg3 xl2
                    v-for="(product,i) in productStorageList" 
                    v-if="product.CategoryName == filterRadio && filterRadio != ''"
                    :key="i" 
                    style="margin:0em 1em 0em 0em;">
                    <v-card flat tile hover style="border-radius: 5px; border: solid 1px #ebebeb;">
                      <v-card-media
                        :src="`${product.img}`"
                        height="170px"
                      >
                      </v-card-media>
                      <v-card-title primary-title style="padding: 16px;">
                        <v-layout wrap>
                          
                          <v-flex xs12 sm12 md8>
                            <p style="text-align:left; font-weight: bold;">{{product.Name}}</p>
                          </v-flex>
                          <v-flex xs12 sm12 md4>
                            <p style="text-align:right;">PD{{product.ProductID}}</p>
                          </v-flex>

                           <v-flex xs12 sm12 md12>
                            <p style="text-align:left;">{{product.Price}} Baht / {{product.Unit}}</p>
                          </v-flex>

                          <v-flex xs12 sm12 md12>
                            <p style="text-align:left;">{{product.CategoryName}}</p>
                          </v-flex>
                          <v-flex xs12 sm8 md8>
                            <p style="text-align:left;">Avaliable: {{product.Amount}}</p>
                          </v-flex>
                          <v-flex xs12 sm4 md4 style="padding: 0px;">
                            
                            <v-card-actions style="float:right; padding: 0px;">
                              <v-menu>
                                <v-btn icon slot="activator">
                                  <v-icon color="grey">more_vert</v-icon>
                                </v-btn>
                                <v-list>
                                  <v-list-tile v-for="(dropdown,i) in dropdowns" :key="i" @click="dropdownAction(dropdown.value,product)">
                                    <v-list-tile-title>{{ dropdown.text }}</v-list-tile-title>
                                  </v-list-tile>
                                </v-list>
                              </v-menu>
                            </v-card-actions>
                          </v-flex>
                        </v-layout>
                      </v-card-title>
                      
                    </v-card>
                  </v-flex>

                  <v-flex 
                    xs12 sm4 md4 lg3 xl2
                    v-for="(product,i) in productStorageList" 
                    v-if="filterRadio =='all'"
                    :key="i" 
                    style="margin:0em 1em 0em 0em;">
                    <v-card flat tile hover style="border-radius: 5px; border: solid 1px #ebebeb;">
                      <v-card-media
                        :src="`${product.img}`"
                        height="170px"
                      >
                      </v-card-media>
                      <v-card-title primary-title style="padding: 16px;">
                        <v-layout wrap>
                          
                          <v-flex xs12 sm12 md8>
                            <p style="text-align:left; font-weight: bold;">{{product.Name}}</p>
                          </v-flex>
                          <v-flex xs12 sm12 md4>
                            <p style="text-align:right;">PD{{product.ID}}</p>
                          </v-flex>

                           <v-flex xs12 sm12 md12>
                            <p style="text-align:left;">{{product.Price}} Baht / {{product.Unit}}</p>
                          </v-flex>

                          <v-flex xs12 sm12 md12>
                            <p style="text-align:left;">{{product.CategoryName}}</p>
                          </v-flex>
                          <v-flex xs12 sm8 md8>
                            <p style="text-align:left;">Avaliable: {{product.Amount}}</p>
                          </v-flex>
                          <v-flex xs12 sm4 md4 style="padding: 0px;">
                            <v-card-actions style="float:right; padding: 0px;">
                              <v-menu>
                                <v-btn icon slot="activator">
                                  <v-icon color="grey">more_vert</v-icon>
                                </v-btn>
                                <v-list>
                                  <v-list-tile v-for="(dropdown,i) in dropdowns" :key="i" @click="dropdownAction(dropdown.value,product)">
                                    <v-list-tile-title>{{ dropdown.text }}</v-list-tile-title>
                                  </v-list-tile>
                                </v-list>
                              </v-menu>
                            </v-card-actions>
                          </v-flex>
                        </v-layout>
                      </v-card-title>
                      
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductStorageService from '@/services/ProductStorageService'
export default {
  data : () => ({
    filterRadio : 'all',
    categories: ['fruit','vegetable','meat','seafood','egg'],
    dropdowns: [{text:'Edit',value:1},{text:'Delete',value:2}],
    dialog: false,
    editedIndex: -1,
    productStorageList:[],
    //Product Attribute
    editedItem: {
      Name:'',
      ID: '',
      Price: 0,
      Unit: '',
      Amount: 0,
      CategoryName: '',
      img: ''
    },
    defaultItem: {
      Name:'',
      ID: '',
      Price: 0,
      Unit: '',
      Amount: 0,
      CategoryName: '',
      img: ''
    },
    productItem: {
      Name:'',
      ID: '',
      Price: 0,
      Unit: '',
      Amount: 0,
      CategoryName: '',
      img: ''
    }
  }),
  computed: {
    ...mapGetters([
      'isAdmin'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'Add New Product' : 'Edit Product'
    },
  },
  async mounted() {
    this.productStorageList = (await ProductStorageService.getProduct()).data
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    productStorageList (val) {
      val || this.getProduct()
    }
  },
  methods: {
    dropdownAction (dropdownValue,item) {
      this.editedIndex = this.productStorageList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (dropdownValue == 1) {
        console.log(this.item)
        this.editItem ()
      } else if (dropdownValue == 2) {
        this.deleteItem (item)
      }
    },
    async getProduct() {
      this.productStorageList = (await ProductStorageService.getProduct()).data
      console.log('getProduct : ', this.productStorageList)
    },
    
    async deleteItem (item) {
      await ProductStorageService.deleteProduct(item)
      this.getProduct()
    },

    close () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.dialog = false
    },
    
    async save () {
      if (this.editedIndex > -1) {
        await ProductStorageService.updateProduct(this.editedItem)
      } else {
        if(this.editedItem.Name == '' || this.editedItem.CategoryName == '' || this.editedItem.Price == 0 ) {
          this.close()
        } else {
          await ProductStorageService.createProduct(this.editedItem).then( product => {
            console.log('product res : ', product)
          })
        }
      }
      this.getProduct()
      this.close()
    },
    
    editItem () {
      this.dialog = true
    },
  }
}
</script>

<style scope>

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
p {
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    margin: 0px;
    color: #606060;
}
.header {
  font-family: Roboto;
  font-size: 30px;
  color: #606060;
}
</style>
