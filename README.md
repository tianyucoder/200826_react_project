### 1.antd的基本使用：
		(1).yarn add antd
		(2).引入样式：import 'antd/dist/antd.css';
		(3).根据文档引入组件

### 2.antd按需引入样式
		(1).yarn add react-app-rewired customize-cra babel-plugin-import
		(2).修改package.json，内容如下：
			.....
			  "scripts": {
					"start": "react-app-rewired start",
					"build": "react-app-rewired build",
					"test": "react-app-rewired test",
					"eject": "react-scripts eject"
				},
		  .....
		(3).在根目录下创建：config-overrides.js，内容如下：
			const { override, fixBabelImports } = require('customize-cra');
			module.exports = override(
					fixBabelImports('import', {
						libraryName: 'antd', //对哪个库进行按需引入
						libraryDirectory: 'es', //样式模块作为ES6模块处理
						style: 'css',//处理的css样式
					}),
				);


### 3.antd自定义主题
		(1).yarn add less less-loader
		(2).修改config-overrides.js，内容如下：
				const { override, fixBabelImports,addLessLoader } = require('customize-cra');
				module.exports = override(
						fixBabelImports('import', {
							libraryName: 'antd', //对哪个库进行按需引入
							libraryDirectory: 'es', //样式模块作为ES6模块处理
							style: true,//处理原文件样式
						}),
						addLessLoader({
							lessOptions:{
								javascriptEnabled: true, //允许js更改修改antd的less文件中的变量
								modifyVars: { '@primary-color': 'green' },
							}
						}),
					);

### 4.antd-mobile配置：
		修改config-overrides：
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

### 5.react脚手架中的rem适配
		参考【vue_react脚手架rem适配.md】配置即可















