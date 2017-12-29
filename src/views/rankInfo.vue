<template>
	<div class="rankInfo">
		<div class="rankInfo-banner" :style="{backgroundImage:`url(${imgUrl})`}">
			<p>上次更新时间：{{getToday()}}</p>
		</div>
		<div class="rankInfo-list">
			<mt-cell v-for="(song,index) in songList" :title="song.filename" @click.native.stop="playAudio(index)">
				<span class="rankInfo-index" :class="{'rank-list-good':index<3,'rank-list-first' : index==0, 'rank-list-second' : index==1, 'rank-list-third' : index==2}">{{index+1}}</span>
			  	<img src="../assets/image/download_icon.png" width="20" height="20">
			</mt-cell>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	import {mixin} from '../mixins/mixins.js'
	import {proxy,aproxy,bproxy} from '../http/httpname.js'
	export default {
		mixins:[mixin],
		data(){
			return{
				songList:[],
				imgUrl:'',
				opacity:0
			}
		},
		//通过路由的before钩子解除router-view缓存限制
		beforeRouteEnter(to,from,next){
			next(vm=>{
				vm.$store.commit('showHead',true)
				vm.getList();
				window.onscroll=()=>{
					vm.opacity=window.pageYOffset/250
					vm.$store.commit('setHeadStyle',{background:`rgba(43,162,251,${vm.opacity})`})
				}
			})
		},
		beforeRouteLeave(to,from,next){
			this.$store.commit('showHead',false)
			window.onscroll=null
			next()
		},
		methods:{
			getToday(){
				const time = new Date()
				const year = time.getFullYear()
				let month = time.getMonth() + 1
				let date = time.getDate()
				if(month < 10) month = '0' + month
				if(date < 10) date = '0' + date
				return `${year}-${month}-${date}`
			},
			getList(){
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				})
				const infoID=this.$route.params.id;
				this.$http.get(`${proxy}/rank/info/?rankid=${infoID}&page=1&json=true`).then((data)=>{
					console.log(data)
					this.songList=data.data.songs.list
					this.imgUrl=data.data.info.banner7url.replace('{size}','400')
					this.$store.commit('setHeadTitle',data.data.info.rankname)
				}).then(()=>{
					Indicator.close()
				})
			}
		}
	}
</script>

<style lang='scss'>
	.rankInfo-banner{
		height: 200px;
		position: relative;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: 50%;
		margin-top: -45px;
		p{
			position: absolute;
			background: -webkit-linear-gradient(bottom,rgba(0,0,0,.6),transparent);
			line-height: 42px;
			width: 100%;
			left: 0;
			bottom: 0;
			padding: 0 10px;
			color: #fff;
			font-size: 14px;
		}
	}
	.rank-list-good {
		display: inline-block;
		padding: 2px 8px;
		left: 12px !important;
		border-radius: 8px;
		color: #fff;
		margin-top: 3px !important;
	}
	.rankInfo-index{
		position: absolute;
		left: 20px;
		font-size: 12px;
		margin-top: 4px;
	}
	.rankInfo .mint-cell-title{
		padding-left:35px;
		padding-right: 10px;
	}
	.rank-list-first {
		background-color: #E80000;
	}
	
	.rank-list-second {
		background-color: #FF7200;
	}
	
	.rank-list-third {
		background-color: #F8B300;
	}
</style>