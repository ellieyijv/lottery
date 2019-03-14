
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       example
//     }
//   })

//   return Store
// }


import Vue from 'vue'
import Vuex from 'vuex'
import { set } from 'mongoose';



Vue.use(Vuex)

function savePowerBall(state) {
  const parsed = JSON.stringify(state.itemList);
  localStorage.setItem('powerball', parsed); 
}

export default new Vuex.Store({
  state:{
    showCartList: false,
    itemList:[] 
  },

  // getters:{
  //    userName(state){
  //       return state.name + 'hello'
  //    }
  // },


  getters:{
    totalAmount(state){
      let itemList = state.itemList;
      let total = 0;
      itemList.forEach(item => {
          total = total + item.qty * item.price
      });
      return total.toFixed(2)
    }
  },
  mutations:{
    increment(state, item){
       let index = state.itemList.findIndex(one=>one.name == item.title)
       if (index == -1) {
           const product = {
             name: item.title,
             qty: 1,
             price: item.price,
             subtitle: item.subTitle
           }
           state.itemList.push(product)
           
      }else {
        state.itemList[index].qty ++
      }
        savePowerBall(state);
    },

    removeItem(state, item){
        let index = state.itemList.findIndex(one=>one.name === item.name)
        console.log(index)
        if(index != -1){
          this.state.itemList.splice(index, 1);
        }
        savePowerBall(state);
    },

    emptyCart(state){
      this.state.itemList = []
      savePowerBall(state)
    },

    switchCartListState(state, setState){
      if(setState == null){
        this.state.showCartList = !this.state.showCartList
      }else{
        this.state.showCartList = setState
      }
    },

    addQty(state,item){
        this.state.itemList.find(v=>v.name === item.name).qty ++
        savePowerBall(state)
        
    },

    minusQty(state, item){
      let itemIndex = this.state.itemList.findIndex(v=>v.name === item.name)
      this.state.itemList[itemIndex].qty = item.qty - 1
      if(this.state.itemList[itemIndex].qty === 0){
        this.state.itemList.splice(itemIndex, 1)
      }
      savePowerBall(state)

    }
 
    
  },
  actions:{
  
    increment(context, item){
         context.commit('increment', item)
       },
    
    removeItem(context, item){
        context.commit('removeItem', item)
    }
  },
  
})