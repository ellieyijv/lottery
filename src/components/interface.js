import axios from 'axios'
import Base from './base'

export default class Interface extends Base {
    getOmit(issue){ 
        return axios.get('/get/omit', {
            data:{
                issue: issue
            }
        })
            .then(res=>{
                // res.data.issue = issue
                this.setOmit(res.data )
            })
            .catch(err =>{
                console.log(error)
            })

        }

   getOpenCode(issue){
        return axios.get('/get/opencode', {
            data:{
                issue: issue
            }
        })
        .then(res=>{
           
            this.setOpenCode(res.data )
        })
        .catch(err =>{
            console.log(error)
        })
   }


   getState(issue){
        return axios.get('/get/state', {
            data:{
                issue: issue
            }
        })
        .then(res=>{
            console.log("get code success")
        })
        .catch(err =>{
            console.log(error)
        })
    }
}