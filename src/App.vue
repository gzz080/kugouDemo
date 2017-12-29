<template>
  <div id="app">
    <HeadLogo></HeadLogo>
    <rankHead v-if="head.toggle" :title="head.title" :bgColor="head.style"></rankHead>
    <HeadNav v-else></HeadNav>
    <router-view/>
    <Player></Player>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import HeadLogo from './components/HeadLogo.vue'
import HeadNav from './components/HeadNav.vue'
import Player from './components/player.vue'
import rankHead from './components/rankHead.vue'
export default {
	computed:{
		...mapGetters(['head'])
	},
	components:{HeadLogo,HeadNav,Player,rankHead}
}
</script>

