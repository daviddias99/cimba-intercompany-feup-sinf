# Backend

### Setup

Make sure you have docker, docker-compose, npm and node installed in your machine.
Then, run `npm i` in `./backend/`.

### Database

1. Run `docker-compose up` (in the root directory of the reposiory), to start PostgreSQL (port 5432) and pgAdmin (port 5050).
2. Login to pgAdmin (http://localhost:5050/) with username = cimba@fe.up.pt and password = password.
3. Add a new server. For host name, use the name of the postgres docker container. Leave the default port. Database name = cimba. Username = cimba. Password = password.

### API

1. After starting the database, run `npm run seed`.
2. Run `npm run dev` to start the server using nodemon.

### Useful links

- http://knexjs.org/
- https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261