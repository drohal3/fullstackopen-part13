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

## Exercise 13.9.
**Task:**
Sequelize provides a set of pre-defined [validations](https://sequelize.org/master/manual/validations-and-constraints.html) for the model fields, which it performs before storing the objects in the database.

It's decided to change the user creation policy so that only a valid email address is valid as a username. Implement validation that verifies this issue during the creation of a user.

Modify the error handling middleware to provide a more descriptive error message of the situation (for example, using the Sequelize error message), e.g.
```
{
    "error": [
        "Validation isEmail on username failed"
    ]
}
```

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

Error message when trying to create user with non email username:
```
{
    "error": [
        "Validation error: Validation isEmail on username failed"
    ]
}
```

## Exercise 13.10.
**Task:**
Expand the application so that the current logged-in user identified by a token is linked to each blog added. To do this you will also need to implement a login endpoint POST /api/login, which returns the token.

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

## Exercise 13.11.
**Task:**
Make deletion of a blog only possible for the user who added the blog.

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

## Exercise 13.12.
**Task:**
Modify the routes for retrieving all blogs and all users so that each blog shows the user who added it and each user shows the blogs they have added.

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

## Exercise 13.13.
**Task:**
Implement filtering by keyword in the application for the route returning all blogs. The filtering should work as follows

- GET /api/blogs?search=react returns all blogs with the search word react in the title field, the search word is case-insensitive
- GET /api/blogs returns all blogs

[This](https://sequelize.org/master/manual/model-querying-basics.html#operators) should be useful for this task and the next one.

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

Used `Op.iLike` operator.

## Exercise 13.14.
**Task:**
Expand the filter to search for a keyword in either the title or author fields, i.e.

GET /api/blogs?search=jami returns blogs with the search word jami in the title field or in the author field

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

Constructed where like the following:
```JS
let where = {}

// ...previous conditions

if (req.query.search) {
    where = {...where,
      [Op.or]: [
        { title: {[Op.iLike] : `%${req.query.search}%`} },
        { author: {[Op.iLike] : `%${req.query.search}%`} }
      ]
    }
}
```

## Exercise 13.15.
**Task:**
Modify the blogs route so that it returns blogs based on likes in descending order. Search the [documentation](https://sequelize.org/master/manual/model-querying-basics.html) for instructions on ordering.

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

Ordered achieved by adding the following section in `findAll` options:
```JS
order: [['likes','DESC']]
```

## Exercise 13.16.
Make a route for the application /api/authors that returns the number of blogs for each author and the total number of likes. Implement the operation directly at the database level. You will most likely need the [group by](https://sequelize.org/master/manual/model-querying-basics.html#grouping) functionality, and the [sequelize.fn](https://sequelize.org/master/manual/model-querying-basics.html#specifying-attributes-for-select-queries) aggregator function.

The JSON returned by the route might look like the following, for example:
```js
[
  {
    author: "Jami Kousa",
    articles: "3",
    likes: "10"
  },
  {
    author: "Kalle Ilves",
    articles: "1",
    likes: "2"
  },
  {
    author: "Dan Abramov",
    articles: "1",
    likes: "4"
  }
]
```

**Solution:**
Implemented together with the previous exercises in [exercise-5](./exercise-5).

`/api/authors` response:
```json
[
  {
    "author":"Dominik Rohal",
    "articles":"5",
    "likes":"98"
  },
  {
    "author":"Kristina Bekhit",
    "articles":"1",
    "likes":"0"
  }
]
```

## Exercise 13.17.
**Task:**

Delete all tables from your application's database.

Make a migration that initializes the database. Add created_at and updated_at [timestamps](https://sequelize.org/master/manual/model-basics.html#timestamps) for both tables. Keep in mind that you will have to add them in the migration yourself.

NOTE: be sure to remove the commands User.sync() and Blog.sync(), which synchronizes the models' schemas from your code, otherwise your migrations will fail.

NOTE2: if you have to delete tables from the command line (i.e. you don't do the deletion by undoing the migration), you will have to delete the contents of the migrations table if you want your program to perform the migrations again.

**Solution:**
Implemented in [exercise-17](./exercise-17).

Migration file: [20240321_00_init_notes_users.js](./exercise-17/migrations/20240321_00_init_notes_users.js)

> The columns createdAt and updatedAt are created manually, but the values are handled by database.

## Exercise 13.18.
**Task:**

Expand your application (by migration) so that the blogs have a year written attribute, i.e. a field year which is an integer at least equal to 1991 but not greater than the current year. Make sure the application gives an appropriate error message if an incorrect value is attempted to be given for a year written.

**Solution:**
Implemented together with the previous exercise in [exercise-17](./exercise-17).

Migration file: [20240321_01_added_year_to_blog.js](./exercise-17/migrations/20240321_01_added_year_to_blog.js)

The validation is defined in the blog model, as following:

```
...
year: {
  type: DataTypes.INTEGER,
    validate: {
    isCorrectYear(value) {
      if (parseInt(value) > new Date().getUTCFullYear() || parseInt(value) < 1991) {
        throw new Error('The year must be between 1991 and current year!.');
      }
    }
  }
}
```

An alternative would be to use built-in validators min and max.

## Exercise 13.19.
**Task:**

Give users the ability to add blogs on the system to a reading list. When added to the reading list, the blog should be in the unread state. The blog can later be marked as read. Implement the reading list using a connection table. Make database changes using migrations.

In this task, adding to a reading list and displaying the list need not be successful other than directly using the database.

**Solution:**
Implemented together with the previous exercises in [exercise-17](./exercise-17).

Created `reading_list` as a connection table with reference to `blog`'s and `users`'s `id` and attribute `read` with a boolean value.

Generated and executed query when rerunning the app:
```
CREATE TABLE IF NOT EXISTS "reading_list" ("id"  SERIAL , "user_id" INTEGER NOT NULL REFERENCES "users" ("id"), "blog_id" INTEGER NOT NULL REFERENCES "blogs" ("id"), "read" BOOLEAN DEFAULT false, PRIMARY KEY ("id"));
```

