<template>
<div class="quickplayStyle">
   <h4>Grab a QuickPick</h4>
   <p>Looking for options like system and PowerHit entries, multi-weeks and choosing your own numbers? Create your own entry now.</p>
     <q-card  v-for="playItem in plays" :key="playItem.title" inline color="white" class="q-ma-sm">
      <q-card-title>
        {{playItem.title}}
        <span slot="subtitle">{{playItem.subTitle}}</span>
        <span slot="right"  >${{playItem.price}}</span>
        <q-card-actions slot="right" >
            <q-btn flat icon="mdi-cart-plus" style="color:blue" @click="addToCart(playItem)"></q-btn>  
        </q-card-actions>
        
      </q-card-title>
    
    </q-card>
</div>

</template>

<style lang="stylus" scoped>

.quickplayStyle {
    color: white;
    text-align:left;
    margin-left:20px;
    h4 {
       font-weight:bold
    }

    .q-card{
        
        color: #424242 !important; 
    }
    .q-card{
        width:220px;  
    }
     @media screen and (max-width: 1024px){
         .q-card{
        width: 300px;}
    }
    @media screen and (max-width: 600px){
         .q-card{
        width: 90%;}
    }

}
</style>

<script>
import  {QCard, QCardTitle, QCardMain,QCardActions} from "quasar"
import store from './../store/index'
import axios from 'axios'

export default {
  name: 'CompQuickPlay',
  store,
  components: {QCard, QCardTitle, QCardMain, QCardActions},
 

  created () {
    
  },
  mounted () {
    axios
      .get('/powerball/list')
      .then(response => (this.plays = response.data.data))
      .catch(error => console.log(error))
  },
  data(){
      return{
            plays: []
      }
     
  },
   methods: {
       addToCart(playItem){     
         this.$store.dispatch('increment', playItem)
       }
      },
 
}
</script>
