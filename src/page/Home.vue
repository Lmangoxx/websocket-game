<template>
<div class="home-cell">
	<div class="login-cell" v-if="!$root.isLogin">
		<div class="content">
			<div class="content-item text-center">
				<div class="header-img-select" @mouseover="showHeaderImgBoxs = true" @mouseleave="showHeaderImgBoxs = false">
					<img :src="require(`@/assets/images/header/${$root.userInfo.header_img}`)"
					>
					<transition name="">
						<ul class="header-img-list cf" v-if="showHeaderImgBoxs">
							<li v-for="num in 9" :key="num" @click="$root.userInfo.header_img = `${$root.userInfo.sex ? 'girl-' : 'boy-'}${num}.png`">
								<img :src="require(`@/assets/images/header/${$root.userInfo.sex ? 'girl-' : 'boy-'}${num}.png`)" alt="">
							</li>
						</ul>
					</transition>
				</div>
			</div>
			<div class="content-item"><input type="text" v-model="$root.userInfo.name"  placeholder="请输入昵称"></div>
			<div class="content-item">
				<button @click="join">确定</button>
			</div>
		</div>
	</div>
	<div class="sidebar-cell">
		<div class="user-info">
			<img :src="require(`@/assets/images/header/${$root.userInfo.header_img}`)" width="42">
		</div>
		<ul class="menu">
			<li class="active"><i class="icon-messages"></i></li>
			<li><i class="icon-gamepad"></i></li>
			<li><i class="icon-settings"></i></li>
		</ul>
	</div>
	<div class="main-cell">
		<ul class="user-list">
			<li>{{userList.length}}</li>
			<transition-group name="list">
				<template v-for="(item, index) in userList">
					<li :key="index" v-if="item.id !== $root.userInfo.id">
						<img width="42" :src="require(`@/assets/images/header/${item.header_img}`)" alt="">
						{{item.name}}
					</li>
				</template>
			</transition-group>
		</ul>
		<div class="content-cell">
			<div class="header-cell">
				<h4>欢迎来到聊天室</h4>
			</div>
			<ul class="message-cell">
				<transition-group name="list">
					<li
						v-for="(item, index) in messageList"
						:key="index"
					>
						<div v-if="item.type === 'message'"
							:class="['message cf', {
								'active': item.id === $root.userInfo.id
							}]"
						>
							<div class="header-img"><img :src="require(`@/assets/images/header/${item.header_img}`)" alt=""></div>
							<div class="text">{{htmlFormat(item.message)}}</div>
						</div>
						<div class="other" v-else>
							<span>{{item.time}} {{item.name}}{{item.type === 'join' ? '加入聊天室' : '已退出聊天室'}}</span>
						</div>
					</li>
				</transition-group>
			</ul>
			<div class="action-cell">
				<input cols="30" rows="10" v-model="message" @keyup.enter="submit" placeholder="请输入聊天内容" />
				<div class="button" @click="submit">
					<i class="icon-send"></i>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
/* eslint-disable */

export default {
	name: 'Home',
	data () {
		return {
			showHeaderImgBoxs: false,
			message: '',
			userList: [],
			messageList: []
		}
	},
	components: {
	},
	mounted () {
		async function async1(){
			console.log('async1 start')
			await async2()
			console.log('async1 end')
		}
		async function async2(){ // 去掉了 async 关键字
			console.log('async2')
		}
		console.log('script start')
		setTimeout(function(){
			console.log('setTimeout')
		},0)  
		async1()
		new Promise(function(resolve){
			console.log('promise1')
			resolve()
		}).then(function(){
			console.log('promise2')
		}).then(function(){
			console.log('promise3')
		}).then(function(){
			console.log('promise4')
		}).then(function(){
			console.log('promise5')
		})
		
		console.log('script end')
	},
	sockets: {
		changeUsers (data) {
			this.userList = []
			for (const key in data) {
				this.userList.push(data[key])
			}
		},
		getUserInfo (data) {
			this.$root.userInfo = data
		},
		message (data) {
			this.messageList.push(data)
		}
	},
	methods: {
		join () {
			this.$root.isLogin = true
			this.$socket.emit('join', this.$root.userInfo)
		},
		submit () {
			if (this.message) {
				this.$socket.emit('message', {
					id: this.$root.userInfo.id,
					message: this.message
				})
				this.message = ''
			}
		},
		htmlFormat (val) {
			return val
		}
	}
}
</script>

<style lang="scss">
$--header-img-layout: 42px;
$--menu-width-base: 81px;
$--action-height-base: 50px;
$--message-text-background: #f6f8fa;
$--message-header-img-margin: 20px;
.home-cell {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	display: flex;
}
.login-cell {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 2;
	color: #fff;
	background-color: $--color-primary;
	img {
		cursor: pointer;
	}
	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500px;
	}
	.header-img-select {
		position: relative;
		display: inline-block;
		width: $--header-img-layout;
		height: $--header-img-layout + 20px;
		padding-bottom: 20px;
	}
	.header-img-list {
		position: absolute;
		top: 60px;
		left: 50%;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
		transform: translateX(-50%);
		&:before {
			content: '';
			position: absolute;
			top: -8px;
			left: 50%;
			margin-left: -8px;
			border-bottom: 8px solid #fff;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
		}
		li {
			float: left;
			width: 33.33%;
			height: $--header-img-layout;
			margin: 10px 0;
			text-align: center;
			img {
				width: $--header-img-layout;
			}
		}
	}
}
.sidebar-cell {
	position: relative;
	width: $--menu-width-base;
	height: 100vh;
	border-right: 1px solid $--border-color-base;
	padding: 15px 0;
	text-align: center;
	.user-info {
		width: 100%;
		height: $--header-img-layout;
	}
	.menu {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 26px;
		color: #aebcce;
		li {
			padding: 10px 0;
			cursor: pointer;
			i {
				display: inline-block;
				width: $--header-img-layout;
				height: $--header-img-layout;
				line-height: $--header-img-layout;
				border-radius: 4px;
			}
			&.active, &:hover {
				i {
					color: #fff;
					background-color: $--color-primary;
				}
			}
		}
	}
}
.main-cell {
	display: flex;
	width: 100%;
	height: 100vh;
	flex: 1;
	.header-cell {
		height: 70px;
		line-height: 70px;
		font-size: 16px;
		text-align: center;
		border-bottom: 1px solid $--border-color-base;
	}
	.content-cell {
		flex: 1;
	}
	.user-list {
		width: 240px;
		height: inherit;
		background-color: #f6f8fa;
	}
	.message-cell {
		height: calc(100vh - 70px - 50px);
		padding: 15px 30px;
		overflow-y: scroll;
		li {
			padding: 10px 0;
			.message {
				.header-img {
					float: left;
					width: $--header-img-layout;
					height: $--header-img-layout;
					margin: 0 $--message-header-img-margin 0 0;
					border-radius: 100%;
					overflow: hidden;
				}
				.text {
					position: relative;
					float: left;
					max-width: 70%;
					padding: 15px;
					color: #2c3d53;
					line-height: 26px;
					background-color: $--message-text-background;
					border-radius: 10px 10px 10px 10px;
					&::after {
						content: '';
						position: absolute;
						top: 10px;
						left: -10px;
						border-right: 10px solid $--message-text-background;
						border-top: 10px solid transparent;
						border-bottom: 10px solid transparent;
					}
				}
				&.active {
					.header-img {
						float: right;
						margin: 0 0 0 $--message-header-img-margin;
					}
					.text {
						float: right;
						color: #fff;
						background-color: $--color-primary;
						&::after {
							content: '';
							position: absolute;
							left: auto;
							right: -10px;
							border-left: 10px solid $--color-primary;
							border-right-width: 0px;
						}
					}
				}
			}
			.other {
				font-size: 13px;
				color: $--color-info;
				text-align: center;
				margin: 0 auto;
				span {
					background-color: #efefef;
					border-radius: 4px;
					padding: 3px 10px;
				}
			}
		}
	}
	.action-cell {
		display: flex;
		height: $--action-height-base;
		border-top: 1px solid $--border-color-base;
		input {
			flex: 1;
			height: inherit;
			padding: 15px;
		}
		.button {
			width: 61px;
			line-height: $--action-height-base;
			text-align: center;
			border-left: 1px solid $--border-color-base;
			background-color: $--color-primary;
			cursor: pointer;
			i {
				display: inline-block;
				width: 100%;
				font-size: 28px;
				color: #fff;
			}
		}
	}
}
.list-enter-active, .list-leave-active {
	transition: all .3s;
}
.list-enter, .list-leave-to{
	opacity: 0;
	transform: translateY(30px);
}
</style>
