<template>
	<div class="head">
		<img src="http://m.kugou.com/v3/static/images/index/logo.png" @click.stop="index">
		<img style="height:27px" src="http://m.kugou.com/v3/static/images/index/search.png" @click.stop="search">
	</div>
</template>

<script>
	export default {
		methods:{
			search(){
				this.$router.push({ path: '/search' })
			},
			index(){
				this.$router.push({ path: '/' })
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/scss/HeadLogo.scss'
</style>