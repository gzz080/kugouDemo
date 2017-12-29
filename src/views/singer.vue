<template>
	<div class="singer-classify">
		<ul>
			<li @click.stop="goRouter(88)">热门歌手</li>
		</ul>
		<ul>
			<li @click.stop="goRouter(1)">华语男歌手</li>
			<li @click.stop="goRouter(2)">华语女歌手</li>
			<li @click.stop="goRouter(3)">华语组合</li>
		</ul>
		<ul>
			<li @click.stop="goRouter(4)">日韩男歌手</li>
			<li @click.stop="goRouter(5)">日韩女歌手</li>
			<li @click.stop="goRouter(6)">日韩组合</li>
		</ul>
		<ul>
			<li @click.stop="goRouter(7)">欧美男歌手</li>
			<li @click.stop="goRouter(8)">欧美女歌手</li>
			<li @click.stop="goRouter(9)">欧美组合</li>
		</ul>
	</div>
</template>

<script>
	export default {
		methods:{
			goRouter(id){
				this.$router.push({path:`/singerlist/${id}`})
			}
		}
	}
</script>

<style lang="scss">
	.singer-classify{
		padding: 0 10px;
		ul{
			margin: 15px 0;
			border:1px solid #e4e4e4;
			border-radius: 5px;
			background: #fbfbfb;
			li{
				padding: 12px 15px;
				border-bottom: 1px solid #e4e4e4;
				position: relative;
				font-size: 15px;
				&:after{
					content: '';
					display: block;
					width: 12px;
					height: 100%;
					position: absolute;
					top: 0;
					right: 10px;
					background: url('../assets/image/arrow_icon.png') no-repeat 50%;
					background-size: 12px;
				}
			}
			li:last-of-type{
				border-bottom: none
			}
		}
	}
</style>