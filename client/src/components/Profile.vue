<template>
    <v-container fill-height v-bind="{ fluid: isFullWidth }" >
        <v-layout>
            <v-flex justify-center>
                    <h1 style="text-align: left;">Profile Settings</h1>
                    <p style="text-align: left; color:#cecece;">Profile > Edit Settings</p>
                <div style="text-align: center;">
                    <div class="headline" style="text-align: center;">Set Your Picture</div>
                    <div class="image-upload">
                        <img :src="imageSrc" width="150" height="150" >
                        <br>
                        <input ref="picInput" @change="uploadImg" type="file" accept="image/*">
                        <v-btn
                            flat outline
                            :loading="loading3"
                            @click.native="loader = 'loading3'"
                            @click="picBtnClick"
                            :disabled="loading3"
                            color="orange accent-3"
                            class="white--text"
                            style="width: 220px; 
                                    border-radius: 20px; 
                                    height: 40px;
                                    font-family: Roboto;
                                    font-weight: 300;
                                    font-size: 16px;"
                        >
                        Upload picture
                        <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                    </div>
                    <v-card 
                        width="65%"
                        color="white"
                        style="display: inline-block; 
                                padding: 10px 40px; 
                                margin: 40px 0px; 
                                border-radius: 5px;"
                        >
                        <v-card-title primary-title>
                            <div class="headline">Information</div>
                        </v-card-title>
                        <v-card-text style="padding: 0px 16px;">
                            <v-form>
                                <div class="row">
                                    <div class="column" style="width: 33.33%; text-align: left;">
                                        <p>Your Name</p> 
                                    </div> 
                                    <div class="column" style="width: 33.33%">
                                        <v-text-field name="first" label="First Name" type="text">
                                        </v-text-field>
                                    </div>
                                    <div class="column" style="width: 33.33%">
                                        <v-text-field name="last" label="Last Name" type="text">
                                        </v-text-field>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="column" style="width: 33.33%; text-align: left;">
                                        <p>User ID</p> 
                                    </div> 
                                    <div class="column" style="width: 66.66%">
                                        <v-text-field disabled name="id" label="IDXXXXX" type="text">
                                        </v-text-field>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="column" style="width: 33.33%; text-align: left;">
                                        <p>Address</p> 
                                    </div> 
                                    <div class="column" style="width: 66.66%">
                                        <v-text-field name="first" label="First Name" type="text">
                                        </v-text-field>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="column" style="width: 33.33%; text-align: left;">
                                        <p>Email</p> 
                                    </div> 
                                    <div class="column" style="width: 66.66%">
                                        <v-text-field disabled name="email" label="example@hotmail.com" type="text">
                                        </v-text-field>
                                    </div>
                                </div>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    <div class="text-xs-center">
                        <v-btn 
                            round dark
                            color="orange accent-3"
                            style="width: 220px; 
                                   height: 40px;
                                   font-family: Roboto;
                                   font-weight: 300;
                                   font-size: 16px;
                                   ">Save Settings</v-btn>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Profile',
    data() {
        return {
            loader: null,
            loading3: false,
            imageSrc: "",
        }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    methods:{
        uploadImg: function(e) {
            var files = e.target.files;
            if(!files[0]){
                return;
            }
            var data = new FormData();
            data.append('media',files[0]);
            var reader = new FileReader();
            reader.onload =(e) =>{
                this.imageSrc = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        },
        picBtnClick(){
            this.$refs.picInput.click()
        }
    },
  }
</script>

<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
.headline {
    font-size: 24px!important;
    font-weight: 400;
    line-height: 32px!important;
    letter-spacing: normal!important;
}
h1 {
    font-size: 30px!important;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.34;
    letter-spacing: normal;
    text-align: left;
    color: #606060;
}
.headline{
    font-family: Roboto;
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
    font-family: Roboto;
    font-size: 18px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.24;
    letter-spacing: normal;
    text-align: left;
    color: #606060;
}
.row:after {
    content: "";
    clear: both;
}
.row {
    display: flex;
    align-items: center;
    padding: 0px;
}
.column {
    float: left;
    padding: 0px 20px 0px 0px;
}
.image-upload > input[type="file"]{
    display: none;
}
</style>