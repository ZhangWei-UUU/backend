# Backend

## 远程分支管理

1. 本地仓库添加生产分支
```
git remote add <branchName> <username>@<ip>:~/pathname/xx.git
```

2. 查看本地仓库远程分支

```
git branch -a
```

3. 删除分支
## PM2管理

## Swagger
Swagger 编辑器可以让开发者在浏览器中使用YAM文件编辑Swagger API sepcifications并实时预览文件。 使用Swagger 工具可以生成有效合法的JSON文件。

和Editor有关的两个NPM包：

1. [swagger-editor](https://www.npmjs.com/package/swagger-editor)

2. [swagger-editor-dist](https://www.npmjs.com/package/swagger-editor-dist)

如果仅仅是单页面应用，那就使用前者。如果是大型项目就使用后者。

## 使用Docker 运行Swagger

```
docker pull swaggerapi/swagger-editor
docker run -d -p 任意端口:8080 swaggerapi/swagger-editor
```

如果不使用官方镜像，使用自定义镜像

```
# Install npm packages (if needed)
npm install

# Build the app
npm run build

# Build an image
docker build -t swagger-editor .

# Run the container
docker run -d -p 80:8080 swagger-editor
```

## 数据传输的格式区别

1. 普通格式

```
"application/json"
"application/xml"
```

2. 表单格式

```
application/x-www-form-urlencoded
```

3. 上传格式

```
multipart/form-data
```

> 原则上，除GET请求之外都应该在数据传输中进行加密权限验证,同时swagger服务器应和后台接口处于一个服务器中。


