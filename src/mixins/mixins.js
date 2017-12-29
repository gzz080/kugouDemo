 export const mixin={
	methods:{
		//点击歌曲列表播放歌曲
		playAudio(index){
			var hash=this.songList[index].hash
			var info={
				list:this.songList,
				index:index
			}
			this.$store.commit('setListInfo',info)
			this.$store.dispatch('getSong',hash)
			document.getElementById('audioPlay').play()
		}
	}
}
