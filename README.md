# PROJET DEV API B3 #

# Par André CLAVERIA B3 Dev à Paris Ynov Campus #
# Liste de l'application #

- nodemailer
- mongoose
- Admin, Company, Freelance, Visitor
- Mission
- Modifier
- Ajout 
- Validators
- Verify
- Recherche que par ville

# Préquis #

- npm i
- Faire un fichier .en et rajouter les variables suivantes :
    - MONGODB_USER=
    - MONGODB_PASSWORD=
    - MONGODB_CLUSTER=
    - PORT=
    - JWT_SECRET=
    - ADMIN=
    - COMPANY=
    - FREELANCE=

# Comment lancer le projet #

- npm start
- node src/app.js
- npm run dev (pour nodemon)

# Par ou commencer #

    Dans localhost:PORT/api/v1/admin/register

- Faite un post :
{
    userMail : example@ynov.com,
    userPassword : test1234
}

    puis localhost:PORT/api/v1/admin/login
- Faite un post :
{
    userMail : "example@ynov.com",
    userPassword : "test1234"
}

    et prenez le userToken et mettez le dans le .env

    Dans localhost:PORT/api/v1/company/register

- Faite un post :
{
    "firstName": "Andre",
    "lastName": "Claveria",
    "userMail": "example@ynov.com",
    "userPassword": "ynov1234",
    "companyName": "Paris Ynov Campus",
    "companyStatus": "SARL",
    "companySiret": "123456789",
}

    puis localhost:PORT/api/v1/company/login
- Faite un post :
{
    userMail : example@ynov.com,
    userPassword : "ynov1234"
}

    et prenez le userToken et mettez le dans le .env

    Dans localhost:PORT/api/v1/company/register
    
- Faite un post :
{
    "firstName": "Andre",
    "lastName": "Claveria",
    "userMail": "example@ynov.com",
    "userPassword": "ynov1234",
    "userExp": 123,
    "dailyTax": 100
}

    puis localhost:PORT/api/v1/company/login
- Faite un post :
{
    userMail : "example@ynov.com",
    userPassword : "ynov1234"
}

    et prenez le userToken et mettez le dans le .env



