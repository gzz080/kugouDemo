<template>
	<div class="singerlist">
		<mt-cell v-for="(item,index) in singerList" :title="item.singername" is-link :to="`/singerInfo/${item.singerid}`">
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
				singerList:[]
			}
		},
		beforeRouteEnter(to,from,next){
			next(vm=>{
				vm.$store.commit('showHead',true)
				vm.$store.commit('setHeadStyle',{'background':'#2CA2F9'})
				vm.getList()
			})
		},
		beforeRouteLeave(to,from,next){
			this.$store.commit('showHead',false)
			this.$store.commit('setHeadStyle',{'background':'rgba(43,162,251,0)'})
			next()
		},
		methods:{
			getList(){
				Indicator.open({
		          text: '加载中...',
		          spinnerType: 'snake'
		        });
		        const singerID=this.$route.params.id
		        this.$http.get(`${proxy}/singer/list/${singerID}?json=true`).then((data)=>{
		        	console.log(data)
		        	this.singerList=data.data.singers.list.info
		        	this.$store.commit('setHeadTitle',data.data.classname)
		        	Indicator.close()
		        })
			}
		}
	}
</script>