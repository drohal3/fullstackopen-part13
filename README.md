# FullStack Open - Part12: Using relational databases
Part 13 of the Full Stack online course https://fullstackopen.com/en/part13


## Exercise 13.1.
**Task:**

Create a GitHub repository for the application and create a new Fly.io or Heroku application for it, as well as a Postgres database. As mentioned here you might set up your database also somewhere else, and in that case the Fly.io of Heroku app is not needed.

Make sure you are able to establish a connection to the application database.

**Solution:**

I will use docker to run Postgres database.

```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -p 54321:5432 postgres
```

```
docker exec -it <container_id> psql -U postgres postgres
```

## Exercise 13.2.
**Task:**
On the command-line, create a blogs table for the application with the following columns:

- id (unique, incrementing id)
- author (string)
- url (string that cannot be empty)
- title (string that cannot be empty)
- likes (integer with default value zero)

Add at least two blogs to the database.

Save the SQL-commands you used at the root of the application repository in a file called commands.sql

**Solution:**
The solution is in [exercise-2/commands.sgl](./exercise-2/commands.sql) file.

`\d` shows the following:

```
                            Table "public.blogs"
 Column |  Type   | Collation | Nullable |              Default              
--------+---------+-----------+----------+-----------------------------------
 id     | integer |           | not null | nextval('blogs_id_seq'::regclass)
 author | text    |           |          | 
 url    | text    |           | not null | 
 title  | text    |           | not null | 
 likes  | numeric |           | not null | 0
Indexes:
    "blogs_pkey" PRIMARY KEY, btree (id)
Check constraints:
    "blogs_title_check" CHECK (title <> ''::text)
    "blogs_url_check" CHECK (url <> ''::text)
```

After adding 2 records, `SELECT * from blogs;` returns:
```
 id |    author     |      url       |   title   | likes 
----+---------------+----------------+-----------+-------
  1 | Dominik Rohal | www.drohal.com | My book 1 |     0
  2 | Dominik Rohal | www.drohal.com | My book 2 |     0
(2 rows)
```

## Exercise 13.3.
**Task:**
Create a functionality in your application which prints the blogs in the database on the command-line, e.g. as follows:
```
$ node cli.js
Executing (default): SELECT * FROM blogs
Dan Abramov: 'On let vs const', 0 likes
Laurenz Albe: 'Gaps in sequences in PostgreSQL', 0 likes
```

**Solution:**
Functionality implemented in [exercise3/cli.js](./exercise-3/cli.js)

running with `node cli.js`, output:
```
...
Executing (default): SELECT * FROM blogs
Dominik Rohal: My book 1, 0 likes
Dominik Rohal: My book 2, 0 likes
```

## Exercise 13.4.
**Task:**
Transform your application into a web application that supports the following operations

- GET api/blogs (list all blogs)
- POST api/blogs (add a new blog)
- DELETE api/blogs/:id (delete a blog)

**Solution:**

Example POST body to create new blog:
```
{
    "author": "Dominik Rohal",
    "url": "dominikrohal.com",
    "title": "The best book 1"
}
```

Response `201`:
```
{
    "likes": 0,
    "id": 2,
    "author": "Dominik Rohal",
    "url": "dominikrohal.com",
    "title": "The best book 1"
}
```

Solution is implemented in [exercise-4/cli.js](exercise-4/cli.js)

## Exercise 13.5.
**Task:**
Change the structure of your application to match the one in the course material, or to follow some other similar clear convention.

**Solution:**

Run database in Docker
```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -p 54321:5432 postgres
```
Navigate to [exercise-5](./exercise-5)
```bash
cd ./exercise-5
```
Install dependencies
```bash
npm install
```
Start app
```bash
node index.js
```

Solution implemented in [exercise-5](./exercise-5) folder.

## Exercise 13.6.
**Task:**
Also, implement support for changing the number of a blog's likes in the application, i.e. the operation

PUT /api/blogs/:id (modifying the like count of a blog)

The updated number of likes will be relayed with the request:
```
{
likes: 3
}
```

**Solution:**
Implemented together with the previous exercise in [exercise-5](./exercise-5).

## Exercise 13.7.
**Task:**
Centralize the application error handling in middleware as in [part 3](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#moving-error-handling-into-middleware). You can also enable middleware [express-async-errors](https://github.com/davidbanham/express-async-errors) as we did in [part 4](https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch).

The data returned in the context of an error message is not very important.

At this point, the situations that require error handling by the application are creating a new blog and changing the number of likes on a blog. Make sure the error handler handles both of these appropriately.

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

404 error kept in the router. Handled `SequelizeDatabaseError` and `SequelizeValidationError` in the middleware. This handles incorrect type and missing value. Additionally, handled unknown endpoint in a middleware.

## Exercise 13.8.
**Task:**
Add support for users to the application. In addition to ID, users have the following fields:

- name (string, must not be empty)
- username (string, must not be empty)

Unlike in the material, do not prevent Sequelize from creating [timestamps](https://sequelize.org/master/manual/model-basics.html#timestamps) created_at and updated_at for users

All users can have the same password as the material. You can also choose to properly implement passwords as in [part 4](https://fullstackopen.com/en/part4/user_administration).

Implement the following routes

- POST api/users (adding a new user)
- GET api/users (listing all users)
- PUT api/users/:username (changing a username, keep in mind that the parameter is not id but username)

Make sure that the timestamps created_at and updated_at automatically set by Sequelize work correctly when creating a new user and changing a username.

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

Example data to create a user:

POST `/api/users`
```
{
    "name": "Dominik Rohal 3",
    "username": "drohal3"
}
```
response:
```
{
    "id": 3,
    "name": "Dominik Rohal 3",
    "username": "drohal3",
    "updatedAt": "2024-03-20T14:26:07.515Z",
    "createdAt": "2024-03-20T14:26:07.515Z"
}
```
>I did token extractor as "global" middleware.

TODO: