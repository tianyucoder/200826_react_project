// 登录组件
import React, { Component } from 'react'
import { NavBar, InputItem,Button,Toast} from 'antd-mobile';
import {reqVerifyCode,reqLogin} from '../../api'
import github from './imgs/github.png'
import qq from './imgs/qq.png'
import wechat from './imgs/wechat.png'
import {phoneReg,verifyCodeReg} from '../../utils/reg'
import './index.less'

export default class Login extends Component {

	state = {
		phone:'',
		verifyCode:'',
		time:60,
		canClick:true
	}

	//保存数据
	saveData = (type)=>{
		return (value)=>{
			//如果用户输入的数据，符合要求，那么维护进状态
			if(type === 'phone' && phoneReg.test(value)) return this.setState({[type]:value})
			if(type === 'verifyCode' && verifyCodeReg.test(value)) return this.setState({[type]:value})
			this.setState({[type]:''})
		}
	}

	//获取验证码的回调
	getVerifyCode = async()=>{
		//获取手机号、按钮状态
		const {phone,canClick} = this.state
		//如果按钮不可点击，终止逻辑
		if(!canClick) return
		//校验手机号
		if(!phone) return Toast.fail('手机号格式不合法', 1);
		//更新状态让获取验证码按钮不可点击
		this.setState({canClick:false})
		//开启定时器更新倒计时
		this.timer = setInterval(()=>{
			let {time} = this.state
			time--
			//若倒计时结束
			if(time <= 0){
				clearInterval(this.timer)
				return this.setState({canClick:true,time:60})
			}
			this.setState({time})
		},1000)
		//发送请求
		await reqVerifyCode(phone)
		Toast.success('验证码发送成功')
	}

	//登录的回调
	login = async()=>{
		//获取手机号，验证码
		const {phone,verifyCode} = this.state
		if(!(phone && verifyCode)) return Toast.fail('请检查手机号或验证码格式', 2);
		const result = await reqLogin(phone,verifyCode)
		const {code,message} = result
		if(code === 20000) {
			Toast.success('登录成功！')
			this.props.history.push('/usercenter')
		}
		else Toast.fail(message)
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}

	render() {
		const {time,canClick,phone,verifyCode} = this.state
		return (
			<div className="login">
				{/* 顶部导航区 */}
				<NavBar mode="light">手机验证码登录</NavBar>

				{/* 手机验证码输入框 */}
				<InputItem onChange={this.saveData('phone')} clear placeholder="请输入手机号"/>

				{/* 验证码输入框 */}
				<div className="verify-input">
					<InputItem onChange={this.saveData('verifyCode')}  clear placeholder="请输入验证码"/>
					<button 
						className="verify-btn" 
						style={{color:canClick ? '#F40700' : 'gray'}}
						onTouchEnd={this.getVerifyCode}
					>获取验证码{canClick ? '' : `(${time})`}</button>
				</div>
				
				{/* 登录按钮 */}
				<Button
					 onTouchEnd={this.login} 
					 type="primary"
					 disabled={(phone && verifyCode) ? false : true}
				>登录</Button>
				
				{/* 底部其他登录方式区 */}
				<footer className="footer">
					<span className="other">其他登录方式</span>
					<div className="login-type">
						<img src={github} alt=""/>
						<img src={qq} alt=""/>
						<img src={wechat} alt=""/>
					</div>	
					<span className="footer-text">未注册的手机号，验证后会自动创建硅谷账号，登录即代表您同意：
					<a href="http://www.atguigu.com">《硅谷隐私政策》</a>
					</span>
				</footer>
			</div>
		)
	}
}
