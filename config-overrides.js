const { override, fixBabelImports,addLessLoader,addPostcssPlugins } = require('customize-cra');
module.exports = override(
	  fixBabelImports('import', {
	    libraryName: 'antd-mobile', //对哪个库进行按需引入
	    libraryDirectory: 'es', //样式模块作为ES6模块处理
	    style: true,//处理原文件样式
		}),
		addLessLoader({
			lessOptions:{
				javascriptEnabled: true, //允许js更改修改antd的less文件中的变量
				 // modifyVars: { '@primary-color': 'green' }, //antd要修改的是@primary-color
				 modifyVars: { 
					 "@brand-primary": "green",
					 "@brand-primary-tap":"rgb(1, 99, 1);"
					},
			}
		}),
		addPostcssPlugins([
			require("postcss-px2rem")({ 
				remUnit: 37.5 //按照设计师的设计稿计算出来的根字体大小
			})
		])
	);