<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<style lang="scss">
@import '@/assets/style/common.scss';
[class^=icon-] {
	font-family: 'iconfont';
}
body {
	font-family: 'webfont', 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c323e;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
