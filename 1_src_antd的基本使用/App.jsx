import React, { Component } from 'react'
import { DatePicker,Button,Input,message} from 'antd';
import {WechatOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

export default class App extends Component {

	demo1 = ()=>{
		message.success('操作成功',1)
	}

	demo2 = ()=>{
		message.warning('删除失败',7)
	}
	
	render() {
		return (
			<div>
				<button>点我</button>
				<Button type="primary" onClick={this.demo1}>确认</Button>
				<Button type="danger" onClick={this.demo2}>删除</Button>
				<DatePicker/>
				<WechatOutlined />
				<Input placeholder="请出入内容" style={{width:'100px'}}/>
				<Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
			</div>
		)
	}
}
