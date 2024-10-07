USE coordinador_eventos;

CREATE TABLE dates(
    eventUrl TEXT NOT NULL,         -- eventUrl
    date varchar(255) NOT NULL             -- Date value
);

CREATE TABLE events(
    eventUrl TEXT NOT NULL,
    name varchar(255) NOT NULL,
    description TEXT NOT NULL,
    price varchar(255) NOT NULL,
    location varchar(255) NOT NULL,
    imageUrl TEXT NOT NULL,
    datesRaw varchar(255) NOT NULL,
    categories varchar(255) NOT NULL,
    latitud varchar(255) NOT NULL,
    longitud varchar(255) NOT NULL
);

-- comandos utiles MySQL:
-- show databases;