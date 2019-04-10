# xd-cli
[![NPM version](https://img.shields.io/npm/v/xd-cli.svg)](https://www.npmjs.com/package/xd-cli)
[![npm download](https://img.shields.io/npm/dw/xd-cli.svg)](https://www.npmjs.com/package/xd-cli)

## 预想实现功能
- 拿本地IPv4`ip`
- 静态起服务`server`(支持自定义端口号server 1234，默认7777)
![ip和server](https://inpm-images.oss-cn-shenzhen.aliyuncs.com/WechatIMG11.png?Expires=1554889155&OSSAccessKeyId=TMP.AQHChD1fOmmVI4K_ouQbBZsm4Lj-52kdu9bAUGyZKZzq8p7KPwmKJszNhxNNMC4CFQDJhRFXssUcGiLIC6imwJQK4G7xaQIVAMt3mEM4M9IBQa-fIrBOQ6Ny0qux&Signature=2pybfjRrhKG8bftRoKpAa7Z%2F8Qc%3D)

![压缩图片资源`rar`(速度较快，压缩效果不及tinify，且暂时不能传参)](https://inpm-images.oss-cn-shenzhen.aliyuncs.com/WechatIMG16.png?Expires=1554889533&OSSAccessKeyId=TMP.AQHChD1fOmmVI4K_ouQbBZsm4Lj-52kdu9bAUGyZKZzq8p7KPwmKJszNhxNNMC4CFQDJhRFXssUcGiLIC6imwJQK4G7xaQIVAMt3mEM4M9IBQa-fIrBOQ6Ny0qux&Signature=O5kwNOHfacC8%2Bhuq4qNy9Zz5t4c%3D)

![压缩图片资源`tinify`(速度较慢，压缩效果好，受tinify_api限制(每月500张，对于一般项目而言应该是够了)](https://inpm-images.oss-cn-shenzhen.aliyuncs.com/WechatIMG17.png?Expires=1554889548&OSSAccessKeyId=TMP.AQHChD1fOmmVI4K_ouQbBZsm4Lj-52kdu9bAUGyZKZzq8p7KPwmKJszNhxNNMC4CFQDJhRFXssUcGiLIC6imwJQK4G7xaQIVAMt3mEM4M9IBQa-fIrBOQ6Ny0qux&Signature=B5XFAb9h8gNzhnlSG%2FJwjRbIOrc%3D)

![支持网路图片压缩后存本地`tinify http://asdf.png`](https://inpm-images.oss-cn-shenzhen.aliyuncs.com/WechatIMG9.png?Expires=1554889593&OSSAccessKeyId=TMP.AQHChD1fOmmVI4K_ouQbBZsm4Lj-52kdu9bAUGyZKZzq8p7KPwmKJszNhxNNMC4CFQDJhRFXssUcGiLIC6imwJQK4G7xaQIVAMt3mEM4M9IBQa-fIrBOQ6Ny0qux&Signature=VjgowpoBOxuxlu9mMZE3c393jGw%3D)

![快速生成项目模版`xd ls`](https://inpm-images.oss-cn-shenzhen.aliyuncs.com/WechatIMG12.png?Expires=1554889467&OSSAccessKeyId=TMP.AQHChD1fOmmVI4K_ouQbBZsm4Lj-52kdu9bAUGyZKZzq8p7KPwmKJszNhxNNMC4CFQDJhRFXssUcGiLIC6imwJQK4G7xaQIVAMt3mEM4M9IBQa-fIrBOQ6Ny0qux&Signature=rA7zRr74y9bWtPEsOK1iRRebOfE%3D)
- 自动化爬虫
- 图片自动上传七牛云返回cdn链接

## 项目模版是主要功能点
- 移动端h5-vue
- 移动端h5-react
- 管理中后台admin-vue
- 管理中后台admin-angular6☑️
- 官网pc-vue
- 小程序-wepy☑️
- 小程序-taro
- go后台模版
- express后台模版

## 公用UI组件库
- 针对移动端h5
- 针对管理中后台admin
- 针对小程序