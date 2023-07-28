# Api REst PlayStudios Challenge

## Starting 🚀



### Prerequisites 📋

```
Nodejs 14.x.x or higher
```

### Installation 🔧


A little intro about the installation. 
```
$ git clone https://github.com/juliocesar898/api-rest-play-studios.git
$ cd /api-rest-play-studios
$ npm install
$ npm run dev
```

📘 Full Swagger GUI are available at http://localhost:40000/api/docs or http://24.199.109.40/api/docs

## Create new user ✔
```
curl POST --location 'localhost:4000/api/auth/signup' \
--header 'Content-Type: application/json' \
--data '{
    "username": "new user",
    "email": "user123456",
    "password": "password1234",
    "phone": "+12345678"
}'
```


## Login User 🔐
```
curl POST --location 'localhost:4000/api/auth/signin' \
--header 'Content-Type: application/json' \
--data '{
    "email": "user123456",
    "password": "password1234"
}'
```

## Change Password 🔑
```
curl POST --location 'localhost:4000/api/auth/change-password' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer token' \
--data '{
    "newPassword": "mypass123456"
}'
```

## Deployment 📦

This project was deployed on Digital Ocean, you can see the docs in http://24.199.109.40/api/docs

## Built with 🛠️

_Mention the tools you used to create your project_

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Manager
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS


## Author ✒️

* **Julio Flores** - *Initial Work* - [juliocesar898](https://github.com/juliocesar898)
This project is licensed under the License (Your License) - see the file [LICENSE.md](LICENSE.md) for details



---
⌨️ By [juliocesar898](https://github.com/juliocesar898) 😊