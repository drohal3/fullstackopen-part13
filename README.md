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
