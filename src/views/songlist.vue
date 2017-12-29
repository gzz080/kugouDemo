<template>
	<div class="songlist">
		<mt-cell v-for="(item,index) in songList" :title="item.specialname" :label="String(item.playcount)" is-link :to="`/songlist/${item.specialid}`">
		  <img slot="icon" :src="item.imgurl.replace('{size}','400')" width="60" height="60">
		</mt-cell>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	import {proxy,aproxy,bproxy} from '../http/httpname.js'
	export default {
		data(){
			return{
				songList:[]
			}
		},
		created(){
			Indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			this.$http.get(`${proxy}/plist/index&json=true`).then((data)=>{
				console.log(data)
				this.songList=data.data.plist.list.info
				Indicator.close()
			})
		}
	}
</script>

<style>
	.songlist .mint-cell{
		padding-right: 0;
	}
	.songlist .mint-cell-text{
		position: absolute;
		left: 90px;
		top: 23px;
		height: 18px;
		line-height: 18px;
		overflow: hidden;
		padding-right: 40px;
	}
	.songlist .mint-cell-label {
	    position: absolute;
	    left: 90px;
	    top: 40px;
	    padding-left: 15px;
	    background: url('../assets/image/icon_music.png') no-repeat left center;
	    background-size: 12px;
	}
</style>