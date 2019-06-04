<template>
<v-flex md8 offset-xs2>
  <v-container fluid grid-list-xl >
    <v-layout row wrap>
      <v-flex xs2></v-flex>
      <v-flex xs8>
        <v-container fluid grid-list-md>
          <v-layout row>
            <v-flex xs7>
              <v-card
              flat 
              dark>
                <v-card-media
                v-if="selected_product"
                :src="getCategoryUrl(selected_product.CategoryName)"
                width="485px"
                height="485px"
                >
                </v-card-media>
                <v-card-media
                v-else
                :src="require('@/assets/meat.png')"
                width="485px"
                height="485px"
                >
                </v-card-media>
              </v-card>
            </v-flex>
            <v-flex xs5>
              <v-card
              height="485px"
              flat>
                <v-card-title primary-title>
                  <div v-if="selected_product">
                    <h3>{{selected_product.Name}}</h3>
                    <h2>$ {{selected_product.Price}}</h2>
                  </div>
                  <div v-else>
                    <h3>Rib Eye Steak 500g./pack</h3>
                    <h2>$ 150 baht</h2>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-container fluid>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field 
                        label="value" 
                        v-model="qty"
                        type="Integer"
                        :rules="[rules.required,rules.qty]"
                        :suffix="selected_product.Unit">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 align-left>
                        <p>Actual weight may vary from estimate 
                          due to seasonality and/or sourcing.</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex>
                        <v-btn :disabled="notNumberCheck" @click="onAddToCart" color="warning" round large>Add to cart</v-btn>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex>
                        <v-btn :to="{name:'cart'}" outline color="warning" round large>View cart</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs2></v-flex>
    </v-layout>
  </v-container>
  <v-container fluid grid-list-md>
    <v-layout row align-left>
      <p class="display-1">Another Products</p>
    </v-layout>
    <!-- another product -->
      <v-layout row wrap >
        <v-flex
        v-for="product in another_products"
        :key="product.name"
        text-md-center>
          <product-card :product="product"></product-card>
        </v-flex>
      </v-layout>
    <!-- another product -->
  </v-container>
</v-flex>  
</template>

<script>
import ProductCard from '@/components/ProductCard'
import Api from '@/services/Api'
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  name: 'product',
  components:{
    'product-card' : ProductCard
  },
  data(){
    return{
      selected_product:{
        Name:'Rib Eye Steak 500g./pack',
        Price:150.00,
        CategoryName:'Meat',
        Unit:'packs'
      },
      qty:0,
      notNumberCheck:true,
      another_products:[
        {Name:'Egg 1 dozen',Price:42.00,CategoryName:"Egg"},
        {Name:'Lemon 1 ea',Price:42.00,CategoryName:"Vegetable"},
        {Name:'Fish 1 ea',Price:42.00,CategoryName:"Seafood"},
        {Name:'Apple 1 ea',Price:42.00,CategoryName:"Fruit"},
        {Name:'Meat 1 pack',Price:150.00,CategoryName:"Meat"},
        {Name:'Octopus 200 grams',Price:42.00,CategoryName:"Seafood"},
      ],
      rules:{
        required:(value)=> !!value || 'Required.',
        qty:(value) => !!Number.isInteger(value) || 'Please input integer more than 0'
      }
    }
  },
  mounted(){
    this.getProduct()
    // this.init()
  },
  watch:{
    $route(to,from){
      this.init()
      this.getProduct()
    },
    qty(newVal,oldVal){
      const newInt = Number.parseInt(newVal)
      if(newInt){
        this.qty = newInt
      }
      this.notNumberCheck = (!newInt||newInt<=0)?true:false;
    },
  },
  computed:{
    ...mapState([
      'cart'
    ])
  },
  methods:{
    ...mapActions([
      'ADD_TO_CART'
    ]),
    init(){
      this.qty = 0
    },
    getImgUrl(img){
      return require('@/assets/'+img)
    },
    getCategoryUrl(category){
      var img;
      if(category==='Egg')
      {
          img = 'egg.png'
      }else if(category==='Fruit'){
          img = 'fruits.png'
      }
      else if(category==='Meat'){
          img = 'meat.png'
      }
      else if(category==='Seafood'){
          img = 'octopus.png'
      }
      else if(category==='Vegetable'){
          img = 'leaf.png'
      }
      else{
          img = 'apple.png'
      }
      return this.getImgUrl(img)
      },
    async getProduct(){
      const id = this.$route.params.id
      let product = await Api().get('api/product/'+id)
      this.selected_product = product.data
      this.getAnotherProduct()
    },
    async getAnotherProduct(){
      // const category = this.product.CategoryName
      // let another_products = await Api().get('api/product/category/'+category)
      let another_products = await Api().get('api/product')
      this.another_products = another_products.data
    },
    async onAddToCart(){
      var cost = Number(this.selected_product.Price) * this.qty
      var product = {
        ID : this.selected_product.ID,
        Name : this.selected_product.Name,
        Unit : this.selected_product.Unit,
        Quantity : this.qty,
        Cost : cost
      }
      this.ADD_TO_CART((product))
    },
  }
}
</script>

<style scoped>

</style>
