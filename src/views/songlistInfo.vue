<template>
	<div class="songlistInfo">
		<div class="banner" :style="{backgroundImage:'url('+ imgurl + ')'}">
		</div>
		<div class="introduce">
			<p :class="{'hide':hide}">{{intro}}</p>
			<span :class="{'hide':hide}" @click.stop="clickHide"></span>
		</div>
		<div>
			<mt-cell v-for="(song,index) in songList" :title="song.filename" @click.native.stop="playAudio(index)">
			  <img src="../assets/image/download_icon.png" width="20" height="20">
			</mt-cell>
		</div>
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
				songList:[],
				opacity:0,
				imgurl:'',
				intro:'',
				hide:true
			}
		},
		beforeRouteEnter(to,from,next){
			next(vm=>{
				vm.$store.commit('showHead',true)
				vm.getlist()
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
			getlist(){
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				const infoID=this.$route.params.id
				this.$http.get(`${proxy}/plist/list/${infoID}?json=true`).then((data)=>{
					console.log(data)
					this.songList=data.data.list.list.info
					this.imgurl=data.data.info.list.imgurl.replace('{size}', '400')
					this.intro=data.data.info.list.intro
					this.$store.commit('setHeadTitle',data.data.info.list.specialname)
					Indicator.close()
				})
			},
			clickHide(){
				this.hide=!this.hide
			}
		}
	}
</script>

<style lang="scss">
	.songlistInfo{
		.banner{
			margin-top: -45px;
			height: 250px;
		    background-repeat: no-repeat;
		    background-size: 100%;
		    background-position: 50%;
		}
		.introduce{
			padding: 10px;
			font-size: 16px;
			position: relative;
			text-align: justify;
			padding-right: 40px;
			border-bottom: 5px solid rgb(241, 241, 241);
			p{
				line-height: 135%;
				overflow: hidden;
				transition: all .5s;
			}
			p.hide{
				height:1.35em;
			}
			span{
				display: block;
				width:24px;
				height:24px;
				position:absolute;
				top: 10px;
				right: 10px;
				background:url('../assets/image/open_icon.png');
				background-size:100%;
			}
			span.hide{
				background:url('../assets/image/close_icon.png');
				background-size:100%;
			}
		}
	}
</style>