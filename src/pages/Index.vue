<template>
	<q-page class="flex" >
		<div id="indexPage">
    <div class="powerball">
			<h4>Play Powerball</h4>
			<div>
				  <q-carousel
						arrows
						infinite
						height="150px"
          >
      
						<q-carousel-slide class="bg-white" v-for="item in drawAnnounces" :key="item.index" >
									<div style="height: 150px">
									<p style="font-size: x-large; font-weight: bold;">Draw No {{item.drawNo}}</p>
										<p style="font-size: large; font-weight: bold; color: #3652a4" >{{item.drawNo===1190? lastTime: 'Announced Soon' }}</p>
									<p>	{{item.drawDate.substr(0,10)}}</p>
								
									</div>
						</q-carousel-slide>
        </q-carousel>
				
			</div>
			<div class="btnBackground">
				<q-btn-group push>
				<q-btn outline @click="quickPlay" :class="{ active: isShowPlay }">Quick Play</q-btn>
				<q-btn outline @click="playOwn" :class="{ active: !isShowPlay }">Create Your Own</q-btn>
				</q-btn-group>
			</div>
			<comp-create-own v-if="!isShowPlay"></comp-create-own>
			<comp-quick-play v-if="isShowPlay"></comp-quick-play>
    </div>
	</div>
	</q-page>
</template>

<style lang="stylus" scoped>
#indexPage {
  width:100%;

	.powerball {
    text-align: center;
		h4 {
			color: white; 
			margin-bottom: 0;
		}
	}

	.btnBackground{
		background: white;

		.active{
				background: #3652a4 !important;
				color: white;
		}
		.q-btn-group{
			margin-right:10px; 
			
		}
	}

}
</style>


<script>
import {QCarousel, QCarouselSlide, QCard, QCardTitle, QCardMain, QBtnGroup } from 'quasar'
import CompCreateOwn from './../components/createowncomp'
import CompQuickPlay from './../components/quickPlayComp'
import Timer from "../../src/components/timer";
import axios from 'axios'
export default {
	name: "PageIndex",
	components: {QCarousel, QCarouselSlide, CompCreateOwn, CompQuickPlay, QBtnGroup},
	data(){
		return{
		  lastTime: '',
			drawAnnounces: [],
			isShowPlay: true,
	
		}	
	},

	created() {
	 
	 axios
      .get('/powerball/list')
			.then(response => (this.drawAnnounces = response.data.data))
			.then(()=>{ let end = new Date(this.drawAnnounces[0].drawDate).getTime()
								const timer = new Timer();
							  timer.countDown(end, this.update, this.handle)
							
			})
			.catch(error => console.log(error))
	
	},
	methods: {
		quickPlay(){
        this.isShowPlay = true
		},
		playOwn(){
				this.isShowPlay = false	
		},
		update(lastTime) {
			this.lastTime = lastTime;
		},
		handle() {
			console.log("Finished");
		},
	}
};
</script>
