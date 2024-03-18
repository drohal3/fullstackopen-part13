# FullStack Open - Part12: Using relational databases
Part 13 of the Full Stack online course https://fullstackopen.com/en/part13


## Exercise 13.1.
**Task:**

Create a GitHub repository for the application and create a new Fly.io or Heroku application for it, as well as a Postgres database. As mentioned here you might set up your database also somewhere else, and in that case the Fly.io of Heroku app is not needed.

Make sure you are able to establish a connection to the application database.

**Solution:**

I will use docker to run Postgres database.

```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
```

```
docker exec -it <container_id> psql -U postgres postgres
```

