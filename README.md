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

