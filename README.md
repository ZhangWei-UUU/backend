# Backend

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

> 原则上，除GET请求之外都应该在数据传输中进行加密权限验证

## sample.YAML

```yaml
# swagger版本号
swagger: "2.0" 
info:
  description: "This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters."
  # 当前API接口的版本号
  version: "2.0.0"
  # API接口名称
  title: "测试"
  
  termsOfService: ""
  contact:
    email: "apiteam@swagger.io"
  license:
    name: "Apache 2.0"
    url: "http://www.apache.org/licenses/LICENSE-2.0.html"
# 后台API主机的网址
host: "petstore.swagger.io"
# 基础统一的路径
basePath: "/v2"
# 
tags:
- name: "fff"
  description: "Everything about your Pets"
  externalDocs:
    description: "Find out more"
    url: "http://swagger.io"
- name: "store"
  description: "Access to Petstore orders"
- name: "user"
  description: "Operations about user"
  externalDocs:
    description: "Find out more about our store"
    url: "http://swagger.io"

# 通信方式

schemes:
- "https"
- "http"

# 路由
paths:
  /pet:
    post:
      tags:
      - "pet"
      summary: "Add a new pet to the store"
      description: ""
      operationId: "addPet"
      # 数据输入格式
      consumes:
      - "application/json"
      - "application/xml"
      # 数据输出格式
      produces:
      - "application/xml"
      - "application/json"
      # 参数
      parameters:
      - in: "body"
        name: "body"
        description: "Pet object that needs to be added to the store"
        required: true
        schema:
          $ref: "#/definitions/Pet"
      responses:
        405:
          description: "Invalid input"
      security:
      - petstore_auth:
        - "write:pets"
        - "read:pets"
  /pet/{petId}:
    get:
      tags:
      - "pet"
      summary: "Find pet by ID"
      description: "Returns a single pet"
      operationId: "getPetById"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "petId"
        in: "path"
        description: "ID of pet to return"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "successful operation"
          schema:
            $ref: "#/definitions/Pet"
        400:
          description: "Invalid ID supplied"
        404:
          description: "Pet not found"
      security:
      - api_key: []
    post:
      tags:
      - "pet"
      summary: "Updates a pet in the store with form data"
      description: ""
      operationId: "updatePetWithForm"
      consumes:
      - "application/x-www-form-urlencoded"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "petId"
        in: "path"
        description: "ID of pet that needs to be updated"
        required: true
        type: "integer"
        format: "int64"
      - name: "name"
        in: "formData"
        description: "Updated name of the pet"
        required: false
        type: "string"
      - name: "status"
        in: "formData"
        description: "Updated status of the pet"
        required: false
        type: "string"
      responses:
        405:
          description: "Invalid input"
      security:
      - petstore_auth:
        - "write:pets"
        - "read:pets"
    delete:
      tags:
      - "pet"
      summary: "Deletes a pet"
      description: ""
      operationId: "deletePet"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "api_key"
        in: "header"
        required: false
        type: "string"
      - name: "petId"
        in: "path"
        description: "Pet id to delete"
        required: true
        type: "integer"
        format: "int64"
      responses:
        400:
          description: "Invalid ID supplied"
        404:
          description: "Pet not found"
      security:
      - petstore_auth:
        - "write:pets"
        - "read:pets"
```