//个人中心组件
import React, { Component } from 'react'
import {Toast,NavBar,Button} from 'antd-mobile'
import {reqVerifyToken} from '../../api'
import './index.less'

export default class UserCenter extends Component {

	state = {
		nickName:'',
		phone:'',
		avatar:''
	}

	async componentDidMount(){
		const result = await reqVerifyToken()
		const {code,message,data} = result
		if(code !== 20000) {
			Toast.fail(message)
			this.props.history.replace('/login')
		}else{
			const {nickName,phone,avatar} = data
			this.setState({nickName,phone,avatar})
		}
	}

	render() {
		const {nickName,phone,avatar} = this.state
		return (
			<div className="user-info">
				<NavBar mode="light">个人中心</NavBar>
				<img className="avatar" src={avatar} alt=""/>
				<div className="nick-name">昵称：{nickName}</div>
				<Button type="primary">退出登录</Button>
			</div>
		)
	}
}
