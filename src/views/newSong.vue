<template>
	<div class="newSong">
		<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="(banner,index) in banners">
		  	<a :href="banner.extra.tourl">
				<img :src="banner.imgurl" :title="banner.title">
			</a>
		  </mt-swipe-item>
		</mt-swipe>
		<mt-cell v-for="(song,index) in songList" :title="song.filename" @click.native.stop="playAudio(index)">
		  <img src="../assets/image/download_icon.png" width="20" height="20">
		</mt-cell>

	</div>
</template>
<script>
	import {Indicator} from 'mint-ui'
	import {mixin} from '../mixins/mixins.js'
	import {proxy,aproxy,bproxy} from '../http/httpname.js'
	export default {
		mixins:[mixin],
		data(){
			return{
				banners:[],
				songList:[]
			}
		},
		created(){
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			this.$http.get(`${proxy}/?json=true`).then(data=>{
				console.log(data);
				this.banners=data.data.banner
				this.songList=data.data.data
				Indicator.close()
			}).then(()=>{
				Indicator.close()
			})
		}
	}
</script>
<style>
	.mint-swipe {
		height: 39vw !important;
	}
</style>