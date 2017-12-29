<template>
	<div class="search-main">
		<div class="search">
			<input placeholder="歌手/歌名/拼音" v-model="searchVal">
			<a @click.stop="search">搜索</a>
		</div>
		<div class="search-recommend" v-show="togglePanel">
			<div class="recommend-title">最近热门</div>
			<mt-cell v-for="(item,index) in recommendList" :title="item.keyword" @click.native="replaceInput(index)"></mt-cell>
		</div>
		<div class="search-result" v-show="!togglePanel">
			<div class="result-title">共有{{total}}条搜索结果</div>
			<mt-cell v-for="(song,index) in songList" :title="song.filename" @click.native.stop="playAudio(index)">
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
				recommendList:[],
				searchVal:'',
				togglePanel:true,
				total:0
			}
		},
		created(){
			Indicator.open({
	          text: '加载中...',
	          spinnerType: 'snake'
	        });
	        this.$http.get('/aproxy/api/v3/search/hot?format=json&plat=0&count=30').then((data)=>{
	        	console.log(data)
	        	this.recommendList=data.data.data.info
	        	Indicator.close();
	        })
		},
		methods:{
			search(){
				if(this.searchVal.trim()){
					Indicator.open({
			          text: '加载中...',
			          spinnerType: 'snake'
			        })
					this.$http.get(`${aproxy}/api/v3/search/song?format=json&keyword=${this.searchVal}&page=1&pagesize=30&showtype=1`).then((data)=>{
						console.log(data)
						this.togglePanel=false
						this.songList=data.data.data.info
						this.total=data.data.data.total
						Indicator.close();
					})
				}
			},
			replaceInput(index){
				this.searchVal=this.recommendList[index].keyword
				this.search()
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/mixin.scss';
	.search-main{
		padding-top: 12px;
		.search{
			position: fixed;
			top: 50px;
			left: 0;
			z-index: 3;
			width: 100%;
			padding: 10px;
			background: #fbfbfb;
			height: 55px;
			@include flex;
			font-size: 16px;
			input{
				flex: 1;
				border:1px solid #e5e5e5;
				border-radius: 5px;
				height: 100%;
				padding-left: 30px;
				background: url('http://m.kugou.com/v3/static/images/index/search_icon.png') no-repeat 6px center;
				background-color: #fff;
				background-size: contain;
				background-position: 6px -1px;
				font-size:14px;
			}
			a{
				display: block;
				background: #2ba2fa;
				line-height: 34px;
				width: 60px;
				margin-left: 15px;
				text-align: center;
				color: #fff;
				border-radius:5px;
			}
		}
		.search-recommend{
			.recommend-title{
				font-size: 16px;
				color:#00bfff;
				padding:10px;
			}
		}
		.result-title{
			background:#e1e1e1;
			padding:5px 10px;
			font-size:16px;
			color:#484848;
		}
	}
</style>