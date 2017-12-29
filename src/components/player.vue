<template>
	<div class="audio-view" :class="{'hideAudioPanel':toggleHide}">
		<audio :src="audio.songUrl" autoplay id="audioPlay" @ended="next" @error="next" @timeupdate="change"></audio>
		<div class="audio-panel-control" :class="{'hideAudio':toggleHide}" @click.stop="togglePanel">
			<mt-spinner type="snake" :size="27" v-show="audioLoadding"></mt-spinner>
		</div>
		<div class="audio-panel">
			<img :src="audio.imgUrl" @click.stop="playDetail">
			<div @click.stop="playDetail">
				<p class="ellipsis">{{audio.title}}</p>
				<p class="singer ellipsis">{{audio.singer}}</p>
			</div>
			<span class="play" @click.stop="audioplay" :class="{'pause':isPlay}"></span>
			<span class="nextsong" @click.stop="next"></span>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data(){
			return{
				toggleHide: false,//显示隐藏播放器
			}
		},
		computed:{
			...mapGetters(['audio','audioLoadding','showPlayer','isPlay'])
		},
		methods:{
			change(){
				var time=document.getElementById('audioPlay').currentTime
				if(this.audio.currentFlag){
					document.getElementById('audioPlay').currentTime=this.audio.currentLength
					this.$store.commit('setCurrent',false)
				}else{
					this.$store.commit('setAudioTime',time)
				}
			},
			togglePanel(){
				this.toggleHide=!this.toggleHide;
			},
			playDetail(){
				console.log(this.showPlayer)
				if(this.showPlayer){
					this.$router.push({path:'/playDetail'})
				}
			},
			audioplay(){
				if(this.showPlayer){
					if(this.isPlay){
						document.getElementById('audioPlay').pause();
					}else{
						document.getElementById('audioPlay').play();
					}
					this.$store.commit('isPlay',!this.isPlay)
				}
			},
			next(){
				this.$store.dispatch('next')
			}
		}
	}
</script>
<style lang="scss">
	@import '../assets/scss/player.scss'
</style>