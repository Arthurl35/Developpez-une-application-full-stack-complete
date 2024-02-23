CREATE TABLE User (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      email VARCHAR(255) NOT NULL,
                      username VARCHAR(100) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Subscription (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              user_id INT,
                              topic_id INT,
                              is_subscribe BOOLEAN NOT NULL DEFAULT TRUE,
                              FOREIGN KEY (user_id) REFERENCES User(id),
                              FOREIGN KEY (topic_id) REFERENCES Topic(id)
);

CREATE TABLE Topic (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       description TEXT
);

CREATE TABLE Post (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(255) NOT NULL,
                      description TEXT,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      user_id INT,
                      topic_id INT,
                      FOREIGN KEY (user_id) REFERENCES User(id),
                      FOREIGN KEY (topic_id) REFERENCES Topic(id)
);

CREATE TABLE Comment (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         description TEXT,
                         post_id INT,
                         user_id INT,
                         FOREIGN KEY (post_id) REFERENCES Post(id),
                         FOREIGN KEY (user_id) REFERENCES User(id)
);
