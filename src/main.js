/* eslint-disable */
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

Vue.use(VueSocketio, 'http://localhost:4000')

new Vue({
	router,
	data: {
		isLogin: false,
		userInfo: {
			header_img: 'boy-1.png',
			name: '',
			sex: 0
		}
	},
	sockets: {
		connect () {
			console.log('连接服务器成功！')
		}
	},
	render: h => h(App)
}).$mount('#app')
