import moment from 'moment'
import Vue from 'vue'

Vue.filter('date',(value,type)=>{
    return moment(value).format(type)
})
