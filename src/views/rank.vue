<template>
	<div class="rank">
		<mt-cell v-for="(item,index) in songList" :title="item.rankname" is-link :to="`/rank/${item.rankid}`">
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
			})
			this.$http.get(`${proxy}/rank/list&json=true`).then((data)=>{
				console.log(data)
				this.songList=data.data.rank.list
			}).then(()=>{
				Indicator.close()
			})
		}
	}
</script>