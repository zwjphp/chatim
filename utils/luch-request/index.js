import Request from "./request"

const http = new Request()

http.setConfig((config) => {
	config.baseUrl = uni.getStorageSync('URL')
	console.log(config.baseUrl);
	config.header = {
		...config.header,
	}
	config.custom = {
		auth: true
	}
	return config
})

http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之后拦截器 */
	config.header = {
		...config.header,
	}
	if (config.custom.auth) {
		let Authorization = uni.getStorageSync('Authorization');
		config.params.Authorization = Authorization;
		if (!Authorization) {
			cancel('token 不存在')
		}
	} else {
		// 不需要token
	}
	return config
})

http.interceptor.response((response) => {
	if (response.statusCode == 401) {
		
	}
	
	return response.data
}, (response) => {
	if (response.statusCode == 400 || response.statusCode == 401) {
		// token不存在，跳转登录
		uni.showToast({
			title: '请重新登录!',
			duration: 2000
		});
		setTimeout(function() {
			uni.removeStorageSync('UID');
			uni.reLaunch({
				url: '/pages/login/login?backtype=1',
			})
		},1000);
		return 
	}
	if (response.statusCode == 500) {
		uni.showToast({
			title: '网络错误，请稍后再试！',
			duration: 2000
		});
		return response
		
	}
})

export {
	http
}

