# Next Level Week 2 - Rocketseat
This application was created at [Next Level Week](https://nextlevelweek.com/)  of [Rocketseat](https://rocketseat.com.br)

## Lessons
  - Lesson 01 - Acelerando sua evolução
    * In this lesson, the landing page and page of list of teachers was created moreover we created two global components (Header and TeacherItem)

  - Lesson 02 - Olhando as oportunidades
    * In this lesson, the application API was created using express and knex/sqlite to the database

  - Lesson 03 - A escolha da stack
    * In this lesson, was created the connection of back-end with the front-end, we saw useState and useEffect of React

  - Lesson 04 - Até 2 anos em 2 meses
    * In this lesson, we started the mobile application using the react native and react-navigation to navigation between screens

  - Lesson 05 - A milha extra
    * In this lesson, we finish the mobile application, and was created the connection of back-end with front-end using axios

## Usage application
#### Instalation
   1. Open terminal
   2. Paste this code: `git clone https://github.com/nvrsantos/2nlw-rocketseat.git`
   3. Enter in folder of project with:`cd 2nlw-rocketseat`
  
#### Start Server (After of clone the project...)
   1. Enter in server folder:`cd server`
   2. Create the database with: `yarn knex:migrate` or `npm knex:migrate`
   3. Start server with:`yarn start` or `npm start`
   
#### Start Web (After of clone the project and server running)
   1. Enter in web folder:`cd web`
   2. Start project with:`yarn start` or `npm start`
      
#### Start Mobile (After of clone the project and server running)
   1. Enter in mobile folder:`cd mobile`
   2. Change the url of api:`cd ./src/services`
   3. Change the `baseUrl` of file api.ts to the url of backend in your pc
   4. Back to folder root: `cd ../..`
   5. Start project with:`yarn start` or `npm start`
