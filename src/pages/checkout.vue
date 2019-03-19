<template>
	<div id="checkout">
		<h3>Checkout</h3>

		<q-stepper ref="stepper2" color="primary" v-model="step2" vertical>
			<q-step default name="campaign" title="Order Summary">
				<div v-for="info in this.$store.state.itemList" :key="info.name">
					<p>{{info.name}} &nbsp * &nbsp {{info.qty}}</p>
				</div>
				<h4>Total: {{this.$store.getters.totalAmount}}</h4>
				<q-stepper-navigation>
					<q-btn class="q-ml-sm" color="primary" @click="$refs.stepper2.next()">Continue</q-btn>
				</q-stepper-navigation>
			</q-step>

			<q-step name="ad_group" title="User Info">
				<q-field style="margin-bottom: 5px;">
					<q-input
						v-model="email"
						type="email"
						float-label="*Email"
						:error="$v.email.$error"
						@keyup.enter="submit"
						@blur="$v.email.$touch"
					/>
					<!-- <q-input v-model="password" type="password" float-label="Password" />
					<q-input v-model="password" type="password" float-label="Password with no toggle button" no-pass-toggle />-->
					<q-input
						v-model="mobile"
						type="tel"
						float-label="*Phone Number"
						:error="$v.mobile.$error"
						@blur="$v.mobile.$touch"
						@keyup.enter="submit"
					/>
					<!-- <q-input v-model="address" type="text" float-label="Your Residential Address"  />		 -->
					<!-- <q-search icon="place" color="amber" v-model="address" float-label="Seach for a place" @change="initAutocomplete"/> -->
					<div class="mapcomp">
						<q-icon name="mdi-map-marker" size="16px" color="primary"/>
						<vue-google-autocomplete
							id="map"
							class="form-control"
							placeholder="Please type your address"
							v-on:placechanged="getAddressData"
							:country="['au', 'nz']"
						></vue-google-autocomplete>
					</div>
				</q-field>

				<q-stepper-navigation>
					<q-btn color="primary" @click="submit">Continue</q-btn>
					<q-btn class="q-ml-sm" color="primary" flat @click="$refs.stepper2.previous()">Back</q-btn>
				</q-stepper-navigation>
			</q-step>

			<q-step name="payment" icon="attach_money" title="Payment">
				<q-field style="margin-bottom: 20px">
					<p class="caption">Deposit Card</p>
					<q-radio v-model="cardradio" val="visa" color="primary" label="Visa"/>
					<q-radio
						v-model="cardradio"
						val="mastercard"
						color="amber"
						label="MasterCard"
						style="margin-left: 10px"
					/>
					
					<q-input v-model="cardnumber" type="number" float-label="Card Number" style="margin-bottom:20px"></q-input>
					<p class="caption">Expired Date</p>
					<q-btn-dropdown split color="black" outline :label="cardmonth" >
						<q-list v-for="n in months" :key="n">
							<q-item  v-close-overlay @click.native="getTheMonth(n)">
								<q-item-main>
									{{n}}
								</q-item-main>
							</q-item>
						</q-list>
					</q-btn-dropdown>

					<q-btn-dropdown split color="black" outline :label="cardyear" style="margin-left:15px">
						<q-list v-for="n in years" :key="n">
							<q-item  v-close-overlay @click.native="getTheYear(n)">
								<q-item-main>
									{{n}}
								</q-item-main>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-field>
				<q-stepper-navigation>
					<q-btn color="primary" @click="placeOrder">Place Your Order</q-btn>
					<q-btn class="q-ml-sm" color="primary" flat @click="$refs.stepper2.previous()">Back</q-btn>
				</q-stepper-navigation>
			</q-step>

			<q-step name="create_ad" title="Order Information">
				<h4 >Success! Your Order Number is {{orderNumber}}</h4>
			</q-step>

			
		</q-stepper>
	</div>
</template>


<script>
import {
	QStepper,
	QStep,
	QStepperNavigation,
	QField,
	QInput,
	QSearch,
	QRadio,
	QBtnDropdown
} from "quasar";
import store from "./../store/index";
import axios from 'axios'
import { required, email, numeric, helpers } from "vuelidate/lib/validators";
import VueGoogleAutocomplete from "vue-google-autocomplete";
const mobileCheck = helpers.regex(
	"mobileCheck",
	/^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/
);

export default {
	store,
	components: {
		QStepper,
		QStep,
		QStepperNavigation,
		QField,
		QInput,
		QSearch,
		VueGoogleAutocomplete,
		QRadio,
		QBtnDropdown
	},
	data() {
		return {
			step2: "first",
			email: "",
			mobile: "",
			error: false,
			address: "",
			cardradio: "visa",
			months:['01','02','03','04','05','06','07','08','09','10','11','12'],
			cardnumber: "",
			cardmonth: "MM",
			cardyear:"YYYY",
			years:['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
			orderNumber: ""
			
		};
	},

	validations: {
		email: { required, email },
		mobile: { required, numeric, mobileCheck }
	},

	mounted() {
		// this.$refs.address.foucus()
	},

	methods: {
		submit() {
			if (this.email == "" && this.mobile == "") {
				this.$q.notify("Please fillin the required information.");
				return;
			}
			if (!this.$v.email.$error && !this.$v.mobile.$error) {
				this.$refs.stepper2.next();
			} else {
				this.$q.notify("Please review fields again .");
				return;
			}
		},

		getAddressData: function(addressData, placeResultData, id) {
			this.address = addressData;
		},

		getTheMonth(month){
			this.cardmonth = month
			
		},

		getTheYear(year){
			this.cardyear = year
			
		},

		placeOrder(){
			//check the third party return result, if success, go to save the info to database
			console.log(this.email, this.mobile, this.$store.state.itemList)
			
			let userInfo={email: this.email,
			              mobile: this.mobile}
			let item = this.$store.state.itemList
			let totalAmount = this.$store.getters.totalAmount
			
			
			axios.post('/order/add', {item, totalAmount, userInfo})
            .then(res=>{
				console.log(res.data)
                if(res.status === 200 && res.data.code ===0){
					this.$q.notify({
          				color: 'positive', 
          				position: 'bottom',
          				message: "Place Order Success" ,
					})
					this.orderNumber = res.data.data.orderNumber
					this.$refs.stepper2.next()
					//delete localstorage info
					this.$store.commit('emptyCart')
                }else{
                    this.$q.notify(res.error)
                }
            })
			
		}
	}
};
</script>

<style lang="stylus" scoped>
#checkout {
	background: #fff;
	max-width: 750px;

	h3 {
		padding-top: 20px;
		font-weight: bolder;
		text-align: center;
	}

	.mapcomp {
		margin-top: 10px;
	}

	#map {
		outline: 0;
		border-width: 0 0 1px;
		border-color: grey;
		width: 100%;
	}

	#map:focus {
		border-color: black;
	}
}
</style>

