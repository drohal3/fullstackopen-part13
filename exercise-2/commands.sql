CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL CHECK( url <> '' ),
    title text NOT NULL CHECK( title <> '' ),
    likes numeric NOT NULL DEFAULT 0
);

insert into blogs (author, url, title) values ('Dominik Rohal', 'www.drohal.com', 'My book 1');
insert into blogs (author, url, title) values ('Dominik Rohal', 'www.drohal.com', 'My book 2');