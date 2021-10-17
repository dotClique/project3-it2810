# Plan for project 3

-

## Development

FOR REVIEWERS: IF YOU DO NOT ALREADY HAVE DOCKER INSTALLED, DO NOT TRY TO START THE DEVELOPMENT SERVER

### Running the server

To start the development server, you have to have docker and docker-compose installed. The run from the directory `project3-it2810`:

```bash
$ docker-compose up -d
```

The images are built to have hot-reload when code is changed in the `src/` directories. When you do changes to other folders, you have to build again:

```bash
$ docker-compose build
```

If you do a change to the database or someething that would change the node_modules folder a lot (like `npm uninstall` something or changing the database schema), you have to build everything from scratch with:

```bash
$ docker-compose build --no-cache
```

### Development environment

To develop in this environment, you have to do `npm install` in three directories (just `cd` into them):

- project3-it2810
- project3-frontend
- project3-backend

If you do a fundamental change in the databse schema, you might have to delete the database for the project to run. To do so:

```bash
# Find the running docker containers (including the databse docker image)
$ docker ps
# Now take the container id of the postgres database, replace it with <containerid> and run the following command
$ docker exec -it <containerid> bash
# Log in to the database
$ psql -U postgres
# Find specific databse (probably it2810-project3)
$ \l
# Delete the database
$ DROP DATABASE "it2810-project3";

# You can also delete specific tables by logging directly into the database itself
$ psql -U postgres -d it2810-project3 # OR log in from psql postgres with `$ \connect it2810-project3`
# View tables
$ \dt
# Delete specific table with <tablename> (remeber to do it with "" if the name contains special chars)
$ DROP TABLE <tablename>;
```
