<template>
	<div class="playDetail">
		<div class="singerBg" :style="{backgroundImage:`url(${audio.imgUrl})`}">	
		</div>
		<div class="singerBg-filter" :style="{backgroundImage:`url(${audio.imgUrl})`}">
		</div>
		<div class="play-content">
			<div class="songTitle">
				<a @click.stop="routerBack"></a>
				<span class="ellipsis">{{audio.title}}</span>
			</div>
			<div class="singerImg">
				<img :src="audio.imgUrl">
			</div>
			<div class="songLrc">
				<div class="lrccontent" :style="{marginTop:lrcMargin + 'px'}">
					<p v-for="(item,index) in songLrc" :class="{lrcColor:audio.currentLength>=item.seconds}">{{item.lrcContent}}</p>
				</div>
			</div>
			<div class="progressBar">
				<span class="playTime">{{audio.currentLength | time}}</span>
				<mt-range v-model="audio.currentLength" :bar-height="3" :max="audio.songLength" id="range" @click.native="rangChange">
				</mt-range>
				<span class="playTime">{{audio.songLength | time}}</span>
			</div>
			<div class="songBtn">
				<i class="prevSong" @click.stop="prev"></i>
				<i class="play" :class="{'pause':isPlay}" @click.stop="playStatus"></i>
				<i class="nextSong" @click.stop="next"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default {
		computed:{
			...mapGetters(['audio','isPlay']),
			songLrc(){
				if(this.audio.lrc){
					let lrc=this.audio.lrc.split('\r\n');
					lrc.splice(-1,1);
					let lrcArr=[];
					for(let item of lrc){
						let obj={};
						let seconds=parseInt(item.substr(1,5).split(':')[0])*60+parseInt(item.substr(1,5).split(':')[1])
						obj.seconds=seconds
						obj.lrcContent=item.substr(10)
						lrcArr.push(obj)
					}
					return lrcArr
				}
			},
			lrcMargin(){
				if(this.songLrc){
					const lrcColor=document.querySelectorAll('.lrcColor')
					const margintop=(lrcColor.length-2) * (-20)
					for(let ele of lrcColor) {
			            ele.className = 'lrcColor'
			        }
					if(lrcColor[lrcColor.length - 1]){
						lrcColor[lrcColor.length - 1].className = 'lrcColor active'
					}
					return this.audio.currentLength +margintop - this.audio.currentLength
				}
			}
		},
		filters:{
			time(value){
	        var length = Math.floor(parseInt(value));
	        var minute = Math.floor(value / 60);
	        if (minute < 10) {
	          minute = '0' + minute;
	        }
	        var second = length % 60;
	        if (second < 10) {
	          second = '0' + second;
	        }
	        return minute + ':' + second;
	      }
		},
		methods:{
			routerBack(){
				this.$router.go(-1)
			},
			prev(){
				this.$store.dispatch('prev')
			},
			next(){
				this.$store.dispatch('next')
			},
			playStatus(){
				if(this.isPlay){
					document.getElementById('audioPlay').pause()
				}else{
					document.getElementById('audioPlay').play()
				}
				this.$store.commit('isPlay',!this.isPlay)
			},
			rangChange(e){
				console.log(this.songLrc)
				let rangeWidth=document.getElementById('range').clientWidth
				let offset=e.offsetX
				let clickLength = Math.floor(offset * this.audio.songLength / rangeWidth)
				if(offset < rangeWidth){
					this.$store.commit('setAudioTime',clickLength)
					this.$store.commit('setCurrent',true)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/playDetail.scss';
</style>