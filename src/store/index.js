import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo, checkSession} from '@/api/user.client.gw'

Vue.use(Vuex)

const state = {
	loginUser: null,
	currentSelectedNav: '1-1'
}

const getters = {
  currentSelectedNav: state => state.currentSelectedNav
}

const mutations = {
	userLogin(state, loginUser) {
		state.loginUser = loginUser;
	},
	updateCurrentSelectedNav: (state, currentSelectedNav) => { state.currentSelectedNav = currentSelectedNav }
}

const actions = {
	async checkSession({commit}) {
		try{
			const res = await checkSession()
			if (res.data.status == 'success') {
				commit('userLogin', res.data.user);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	saveUserInfo({commit}, userInfo) {
		commit('userLogin', userInfo);
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
