import Vue from 'vue'
import Router from 'vue-router'
import newSong from '../views/newSong.vue'
import rank from '../views/rank.vue'
import songlist from '../views/songlist.vue'
import singer from '../views/singer.vue'
import rankInfo from '../views/rankInfo.vue'
import playDetail from '../views/playDetail.vue'
import search from '../views/search.vue'
import songlistInfo from '../views/songlistInfo.vue'
import singerlist from '../views/singerlist.vue'
import singerInfo from '../views/singerInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path:'/',
    	component:newSong
    },{
    	path:'/rank',
    	component:rank
    },{
    	path:'/songlist',
    	component:songlist
    },{
    	path:'/singer',
    	component:singer
    },{
        path:'/rank/:id',
        component:rankInfo
    },{
        path:'/playDetail',
        component:playDetail
    },{
        path:'/search',
        component:search
    },{
        path:'/songlist/:id',
        component:songlistInfo
    },{
        path:'/singerlist/:id',
        component:singerlist
    },{
        path:'/singerInfo/:id',
        component:singerInfo
    }
  ]
})
