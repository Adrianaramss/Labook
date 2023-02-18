-- Active: 1675260429876@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT *FROM users;
 DROP TABLE users;

INSERT INTO users (id, name, email, password, role)
VALUES
   ("U001", "Adriana", "adriana@gmail.com", "adriana123","admin"),
   ("U002", "Poliana", "poliana@gmail.com", "poliana33","normal"),
   ("U003", "Maria", "maria@gmail.com", "maria10", "normal"),
   ("U004", "josé", "josé@gmail.com", "jose50", "normal");


CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

SELECT *FROM posts;
DROP TABLE posts;

INSERT INTO posts (id, creator_id, content)
VALUES
   ("P1","U001","Hoje e dia de role com o dog!"),
   ("P2","U002","A vida reflete aquilo que você sente. Sinta gratidão!"),
   ("P3","U003","Não tenha pressa. Amanhã será um novo recomeço!"),
   ("P4","U004"," Vamos happy hour!");


CREATE TABLE likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
        
 );

DROP TABLE likes_dislikes;

 SELECT *From likes_dislikes;

 INSERT INTO likes_dislikes (user_id, post_id, like)
 VALUES
 ("U001","P1",0),
 ("U002","P2",1),
 ("U003","P3",0),
 ("U004","P4",1);

SELECT 
posts.id,
posts.creator_id,
posts.content,
posts.like,
posts.dislike,
posts.created_at,
posts.updated_at,
users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = user_id;

SELECT FROM posts;

