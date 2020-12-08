// 登录组件
import React, { Component } from 'react'
import { NavBar, InputItem,Button} from 'antd-mobile';
import './index.less'

export default class Login extends Component {
	render() {
		return (
			<div className="login">
				{/* 顶部导航区 */}
				<NavBar mode="light">手机验证码登录</NavBar>
				{/* 手机验证码输入框 */}
				<InputItem clear placeholder="请输入手机号"/>
				{/* 验证码输入框 */}
				<div className="verify-input">
					<InputItem clear placeholder="请输入验证码"/>
					<button className="verify-btn">获取验证码</button>
				</div>
				{/* 登录按钮 */}
				<Button type="primary">登录</Button>
			</div>
		)
	}
}
