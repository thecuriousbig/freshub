<template>
<v-flex md8 offset-xs2>
  <v-container fluid grid-list-xl >
    <v-layout row align-center justify-center>
      <v-flex text-xs-center>
        <v-card
        width="1240px"
        height="600px"
        flat
        img=""
        dark>
          <v-card-text>
            <v-layout column>
              <v-flex xs12>
                <h1 class="display-1">FRESH FOODS <br>FOR YOU</h1>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row child-flex justify-center align-center wrap>
              <v-flex fill-height>
                <v-btn outline dark depressed flat large>SHOP NOW</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
    <v-container
    fluid
    grid-list-md>
      <v-layout row wrap align-center>
        <v-flex 
        v-for="category in categories"
        :key="category.name"
        text-md-center>
          <v-card
          height="310px"
          width="363px"
          flat="true"
          hover="true"
          :to="{name:'category',params:{name:category.path}}">
            <v-card-media
            :src="getCategoryUrl(category.name)"
            height="250px"
            >
            </v-card-media>
            <v-card-title primary-title>
              <v-layout align-center>
                <v-flex>
                  <h3 class="display-1">{{category.name}}</h3>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex 
        text-md-center>
          <v-card
          height="310px"
          width="363px"
          flat="true"
          hover="true"
          :to="{name:'category',params:{name:'all'}}">
            <v-card-media
            :src="getCategoryUrl('See All')"
            height="250px"
            >
            </v-card-media>
            <v-card-title primary-title>
              <v-layout align-center>
                <v-flex>
                  <h3 class="display-1">See All</h3>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    <!-- popular product -->
      <v-layout>
        <v-flex>
            <h3 class="display-3">Another Products</h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap >
        <v-flex
        v-for="product in another_products"
        :key="product.Name"
        text-md-center>
          <product-card :product="product"></product-card>
        </v-flex>
      </v-layout>
    <!-- popular product -->
    </v-container>
</v-flex>
</template>

<script>
import Api from '@/services/Api'
import ProductCard from '@/components/ProductCard'
export default {
  name: 'home-page',
  components:{
    'product-card' : ProductCard
  },
  data(){
    return{
      categories:[],
      another_products:[
        {Name:'Egg 1 dozen',Price:42.00,CategoryName:'Egg'},
        {Name:'Lemon 1 ea',Price:42.00,CategoryName:'Vegetable'},
        {Name:'Fish 1 ea',Price:42.00,CategoryName:'Seafood'},
        {Name:'Apple 1 ea',Price:42.00,CategoryName:'Fruit'},
        {Name:'Meat 1 pack',Price:150.00,CategoryName:'Meat'},
        {Name:'Octopus 200 grams',Price:42.00,CategoryName:'Seafood'},
      ]
    }
  },
  mounted: function(){
    this.getCategories();
    this.getAnotherProduct()
  },
  methods:{
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
    async getCategories(){
      try {
        let categories = await Api().get('/api/category')
        this.categories = categories.data.map(category => {
          var newObj = {};
          newObj['name'] = category.Name;
          newObj['path'] = category.Name.toLowerCase();
          return newObj
        })
      } catch (error) {
        console.log('error : '+error);
      }
    },
    async getAnotherProduct(){
      // const category = this.product.CategoryName
      // let another_products = await Api().get('api/product/category/'+category)
      let another_products = await Api().get('api/product')
      this.another_products = (another_products.data).slice(0,5)
    },
  }
}
</script>

<style scoped>

</style>
