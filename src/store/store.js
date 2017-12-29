import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
import {proxy,aproxy,bproxy} from '../http/httpname.js'

const store=new Vuex.Store({
	state:{
		audio:{
			songUrl:'',
			imgUrl:'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
			title:'',
			singer:'',
			currentLength:0,
			songLength:0,
			currentFlag:false//快进更改播放时间状态
		},//歌曲信息
		audioLoadding:false,//播放歌曲loading
		// detailPlayerFlag: false,//是否显示播放详情
		showPlayer:false,//是否能进入播放详情
		isPlay:false,//播放暂停
		listInfo: {
			songList: [],
			songIndex: 0
		},//当前歌曲播放列表
		head:{
			toggle:false,
			title:'',
			style:{'background': 'rgba(43,162,251,0)'}
		},//显示标题不显示导航
	},
	getters:{
		audio:state=>state.audio,
		audioLoadding: state => state.audioLoadding,
		// detailPlayerFlag: state => state.detailPlayerFlag,
		showPlayer: state => state.showPlayer,
		isPlay: state => state.isPlay,
		head:state => state.head
	},
	mutations:{
		setAudio(state,audio){
			state.showPlayer=true,
			state.audio={...(state.audio),...audio}
		},//修改播放歌曲信息和播放详情状态
		setAudioTime(state,time){
			state.audio.currentLength=time
		},//修改歌曲当前播放时间
		setCurrent(state, flag){
			state.audio.currentFlag = flag
		},//修改快进切换播放时间状态
		isPlay:(state,flag)=>{
			state.isPlay=flag
		},//修改播放暂停
		setListInfo:(state,{list,index})=>{
			state.listInfo.songList=list
			state.listInfo.songIndex=index
		},//修改歌曲播放列表
		toggleAudioLoadding:(state,flag)=>{
			state.audioLoadding=flag
		},//修改播放歌曲初始化loading
		showHead(state, flag){
			state.head.toggle = flag
		},//修改显示标题还是显示导航状态
		setHeadTitle(state, title){
			state.head.title = title
		},//修改标题名字
		setHeadStyle(state, style){
			state.head.style = style
		},//修改标题背景色
		setLrc: (state, lrc) => {
			state.audio = {...(state.audio), lrc}
		},//获取修改歌词
	},
	actions:{
		getSong({commit,state},hash){
			commit('toggleAudioLoadding',true)
			axios.get(`${bproxy}/yy/index.php?r=play/getdata&hash=${hash}`)
			.then((data)=>{
				console.log(data)
				const res=data.data.data
				const songUrl=res.play_url
				const imgUrl=res.img
				const title=res.audio_name
				const songLength=res.timelength/1000
				const singer=res.author_name
				const currentLength=0
				const lrc=res.lyrics
				const audio={songUrl, imgUrl, title, singer, songLength, currentLength}
				commit('setAudio',audio)
				commit('setLrc',lrc)
				commit('isPlay',true)
				commit('toggleAudioLoadding',false)
			})
		},
		next({dispatch,state}){
			const list=state.listInfo.songList
			if (state.listInfo.songIndex == list.length - 1) {
				state.listInfo.songIndex = 0
			} else {
				++state.listInfo.songIndex
			}
			if(list.length>0){
				const hash=list[state.listInfo.songIndex].hash
				dispatch('getSong',hash)
			}
		},
		prev({dispatch,state}){
			const list=state.listInfo.songList
			if (state.listInfo.songIndex == 0) {
				state.listInfo.songIndex = list.length - 1
			} else {
				--state.listInfo.songIndex
			}
			const hash=list[state.listInfo.songIndex].hash
			dispatch('getSong',hash)
		}
	}
})

export default store