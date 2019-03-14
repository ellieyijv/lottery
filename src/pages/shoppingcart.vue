<template>

	<div id="shoppingcart">
		<div v-if="$store.state.itemList.length" >
			<h3>Cart
				<q-btn flat flex-right class="emptyBtn" @click="emptyCart">Empty Cart</q-btn>
			</h3>

			<q-list highlight v-for="item in itemList" :key="item.name" class="shoppingcartList">
				<q-item>
					<q-item-side>
						<q-item-tile avatar>
							<img src="./../statics/powerball.jpg">
						</q-item-tile>
					</q-item-side>
					<q-item-main>
						<q-item-tile label>{{item.name}} * {{item.qty}}</q-item-tile>
						<q-item-tile sublabel>{{item.subtitle}}</q-item-tile>
					</q-item-main>
					<q-item-side>
						<q-btn icon="mdi-plus" size="xs" @click="addQty(item)"></q-btn>
						<span>{{ item.qty }}</span>
            <q-btn icon="mdi-minus" size="xs" @click="minusQty(item)"></q-btn>
					</q-item-side>
					<q-item-side right>
						<q-btn icon="mdi-close-circle" flat class="rightTopPosition" @click="removeItem(item)"></q-btn>
						<q-item-tile>${{item.price*item.qty}}</q-item-tile>
					</q-item-side>
				</q-item>
				<q-item-separator/>
			</q-list>
			<h3>
				Total:
				<span>${{totalAmount}}</span>
			</h3>
			<q-btn color="primary" class="shoppingcartList" rounded @click="goToCheckout">Check Out</q-btn>
		</div>
		<div v-else>

			<h3>Your Cart Is Empty</h3>
		</div>
	</div>
  
</template>

<script>
import {
	QCard,
	QCardTitle,
	QCardMain,
	QCardActions,
	QListHeader,
	QItem,
	QItemMain,
	QItemSeparator,
	QItemSide,
	QItemTile,
	QInput
} from "quasar";
import store from "./../store/index";
export default {
	store,
	components: {
		QCard,
		QCardTitle,
		QCardMain,
		QCardActions,
		QListHeader,
		QItem,
		QItemMain,
		QItemSeparator,
		QItemSide,
		QItemTile,
		QInput
	},
	data(){
		return{
			
		}
	},

	computed: {
		itemList() {
			return this.$store.state.itemList.length
				? this.$store.state.itemList
				: null;
		},
		totalAmount() {
		
			return this.$store.getters.totalAmount;
		 },
		
		
			 
		
		},
		
    methods: {
    goToCheckout(){
            
				this.$router.push({path: `/checkout`});
		},

		removeItem(playItem) {
        this.$store.dispatch('removeItem', playItem)
		},

		emptyCart(){
        this.$store.commit('emptyCart')
		},

		addQty(item){
				this.$store.commit('addQty', item)
		},

		minusQty(item){
			this.$store.commit('minusQty', item)
		}
		
    }
};
</script>

<style lang="stylus" scoped>
#shoppingcart {
	background: #fff;
    max-width: 750px; 
	h3 {
		padding-top: 20px;
		font-weight: bolder;
		margin: 10px;

		span {
			position: relative;
			float: right;
		}
	}

	.emptyBtn {
		font-size: 14px;
		position: relative;
		float: right;
		color:orange
	}
    .shoppingcartList{
		width:350px
		margin:0 auto 
		display:block
		margin-top: 30px;

		.rightTopPosition{
			position:absolute;
			top:-10px;
			right: -10px;
		}
	}
}
</style>
