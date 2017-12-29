<template>
	<div class="rankHead" :style="bgColor">
		<a @click.stop="routerBack"></a>
		<span class="ellipsis">{{title}}</span>
	</div>
</template>

<script>
	export default{
		props:['title','bgColor'],
		methods:{
			routerBack(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/mixin.scss';
	.rankHead{
		@include flex;
		position: fixed;
		width: 100%;
		height: 43px;
		padding: 0 34px 0 10px;
		top: 50px;
		left: 0;
		z-index: 3;
		color:#fff;
		background:-webkit-linear-gradient(top,rgba(0,0,0,.6),transparent);
		a{
			width:24px;
			height:100%;
			background: url('../assets/image/goback_icon.png') no-repeat center;
			background-size: 60%;
		}
		span{
			flex:1;
			text-align: center;
			font-size: 18px;
			padding-left: 5px;
		}
	}
</style>