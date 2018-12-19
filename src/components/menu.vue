<template>
	<ul class="menu-cell">
		<li @click="aaa"><img src="@/assets/images/header/boy-1.png" width="50" alt=""></li>
	</ul>
</template>

<script>

export default {
	name: 'Menu',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App',
			socket: null
		}
	},
	mounted () {
	},
	methods: {
		aaa () {
		}
	}
}
</script>

<style lang="scss">
.menu-cell {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	background-color: #303841;
	li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 80px;
	}
}
</style>
