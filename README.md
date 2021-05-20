# vue3-test

## vue3练习

  - 把vue-cli版本定到4.5以上
  - 在creare的时候可以选择vue版本

## 多页面应用
  - 单个项目里打包多个项目
  - build的时候只能打包想打包的那个，不能整个一起打包
  - 可以同时运行多个项目
## 配置说明
  - pages文件夹下新建项目，项目文件夹名字和文件夹下的html名称最好保持一致，以html名称为准，不可以取相同名字的html
  - 新建一个项目需要在package.json里面修改配置
  ```
  "serve-项目名字": "cross-env page='项目名字' vue-cli-service serve", // 运行的配置
  "build-项目名字": "cross-env page='项目名字' vue-cli-service build", // 打包的配置
  ```
  - 具体打包配置看vue.config.js