<template>
	<div>
		<q-list v-if="$store.state.showCartList" highlight style="background: #fff" separator >
			<q-list-header style="font-size: 18px; color:black">Total: ${{totalAmount}}
             
            </q-list-header>
            <div v-for="item in itemList" :key="item.name">
			<q-item >
				<q-item-side>
					<q-item-tile avatar>
						<img src="./../statics/powerball.jpg">
					</q-item-tile>
				</q-item-side>
				<q-item-main >{{item.name}}</q-item-main>
				<q-item-side right>
                    <q-item-tile>qty:{{item.qty}}</q-item-tile>
					<q-item-tile>${{item.price}}</q-item-tile>
				</q-item-side>     
			</q-item>
            <q-item-separator/>
            </div>
            <q-item-side right>
            <q-btn color="primary" @click="goToShoppingCart">Go To Cart</q-btn>
            </q-item-side>
		</q-list>
	</div>
</template>

<script>
import {
	QList,
	QListHeader,
	QItem,
	QItemMain,
	QItemSeparator,
	QItemSide,
    QItemTile,
    
} from "quasar";
import store from "./../store/index";
export default {
    store,
	components: {
		QListHeader,
		QItem,
		QItemMain,
		QItemSeparator,
		QItemSide,
        QItemTile,
       
    },
    computed: {
        itemList(){
            return this.$store.state.itemList.length?this.$store.state.itemList : null
        },
        totalAmount(){
            return this.$store.getters.totalAmount
        }
        
    },
    methods: {
       goToShoppingCart(amount){
		   this.$store.commit('switchCartListState', false)
           this.$router.push({path:`/shoppingcart`})     
       }
	},
	
};
</script>
