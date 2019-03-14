<template>
	<q-layout view="lHh Lpr lFf">
		<q-layout-header>
			<div>
				<q-toolbar inverted color="blue">
					<q-btn flat round dense icon="mdi-looks" size="lg" style="color:red" @click="$router.push({path:`/`})"/>

					<q-toolbar-title>Official Lotteries</q-toolbar-title>
					<span>{{item}}</span>
					<span></span>
					<q-btn flat round dense size="lg" icon="mdi-cart" @click="cartList"/>
            <q-page-sticky position = "top-right" >
          	<cart-list v-if="$store.state.showCartList"></cart-list>
           </q-page-sticky>
				</q-toolbar>
			</div>
		</q-layout-header>

		<q-page-container style="background-color: #3652a4">
			<q-btn flat color="white" size="medium">Play</q-btn>
			<q-btn flat color="white" size="medium">Results</q-btn>
			
			<router-view/>
		</q-page-container>
	</q-layout>
</template>

<script>

import store from "./../store/index";
import cartList from "../../src/components/cartlist"
import {QPageSticky} from "quasar"
export default {
	name: "MyLayout",
  store,
  components: {cartList, QPageSticky},
	data() {
		return {
     
    
		};
	},

  mounted(){
		if(!this.$store.state.itemList.length){
					if(localStorage.getItem('powerball')){
						this.$store.state.itemList = JSON.parse(localStorage.getItem('powerball'));
					}
				}
	},
	methods: {
		

		totalCartCount(total, number) {
			return total + number;
    },
    
    cartList(){
			
			 this.$store.commit('switchCartListState')
		
    }
	},
	computed: {
		item() {
			let itemList = this.$store.state.itemList;
			let count = [];
			itemList.length
				? itemList.forEach(item => {
						count.push(item.qty);
				  })
				: null;
			return itemList.length ? count.reduce(this.totalCartCount) : 0;
		}
 

  },

};
</script>

<style>
</style>
