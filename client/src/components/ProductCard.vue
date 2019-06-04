<template>
    <v-card
          height="310px"
          width="233px"
          flat
          hover>
            <v-card-media
            :src="getCategoryUrl(product.CategoryName)"
            height="169px">
            </v-card-media>
            <v-card-text>
                <v-layout row>
                <v-flex>
                  <h3>{{product.Name}}</h3>
                  <h2> $ {{product.Price}}</h2>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-layout row>
                <v-flex>
                  <v-btn :to="/product/+product.ID" round color="warning" dark>View Product</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
</template>

<script>
export default {
    props:['product'],
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
    }
}
</script>

<style>

</style>
