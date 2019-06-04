<template>
  <div class="body">
    <v-layout justify-center fill-height row wrap>
      <v-flex xs12 md8 xl8 >
        <div class="row" style="margin-top: 23vh; max-height: 645px; min-height: 500px; max-width:1075px;">
          <div class="column" id="left-column">
            <div style="display: table-cell; vertical-align: middle;">
              <h1 class = "Header1" style="margin-bottom: 5%; color: #444444;">
                Login
              </h1>
              <p style="text-align: left; margin-bottom: 0px; color: #606060; font-size: 16px;">
                Please contact to Admin, if you don’t have an account
              </p>
              <v-form>
                <v-text-field name="email"
                  label="Log in" type="text"
                  v-model="email" required>
                </v-text-field>
                <v-text-field name="password"
                  label="Password" type="password"
                  v-model="password" required>
                </v-text-field>
                <v-alert outline color="red"
                  transition="scale-transition" :value="alert">
                  {{error}}
                </v-alert>
              </v-form>
              <v-btn round dark color="amber darken-3" class="button" @click="login">Login</v-btn>
            </div>
          </div>
          <div class="column" id="right-column">
            <div style="display: table-cell; vertical-align: middle;">
              <h1 class = "Header1" style="text-align: center; margin-bottom: 5%; color: #ffffff;">
                Welcome 
              </h1>
              <p style="text-align: center; margin-bottom: 0px; color: #ffffff; font-size: 20px;">
                FRESHUB gives fresh foods every day for you!
              </p>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      alert: false
    }
  },
  methods: {
    ...mapActions([
      'LOGIN_STAFF'
    ]),
    login(){
      this.LOGIN_STAFF({
        email : this.email,
        password : this.password
      }).then(()=>{
        this.$router.push({name:'dashboard'})
      })
    }
  }
}
</script>

<style scoped>
.body{
  background-image: url(http://res.cloudinary.com/tanatornbig/image/upload/v1522986178/geo-darwin-39403-unsplash_l6dor8.png);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  
}
.button{
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  box-shadow: 0px 6px 18px 0 rgba(239, 138, 23, 0.5);
  width: 120px;
  height: 40px;
}
.Header1 {
  mix-blend-mode: undefined;
  font-family: Roboto;
  font-size: 48px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 2.4px;
  text-align: left;
  
}
#left-column{
  text-align: left;
  box-shadow: 0px 10px 100px 0 rgba(0, 0, 0, 0.3);
  background-color:#FFFFFF;
  padding: 0 9%; 
  border-radius: 10px 0px 0px 10px;
}
#right-column{
  padding: 0 9%; 
  border-radius: 0px 10px 10px 0px; 
  margin: 0px auto; 
  background-image: url(http://res.cloudinary.com/tanatornbig/image/upload/v1522983256/image_ipvxjs.png); 
  background-size: cover;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.column {
  float: left;
  width: 50%;
  padding: 10px;
  min-height: 500px;
  max-height: 645px; 
  display: table;
}
.p{
  
  font-family: Roboto;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: 0.2px;
  text-align: left;
  
}

</style>
