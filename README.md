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

This can be done using the single command from the directory `project3-it2810`:
```bash
$ npm run install:all
```
This runs npm install in all 3 directories. 

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

# Production

The content is currently in /usr/local/share/project3-it2810 on the VM.

On the VM we have git, docker, docker-compose and nginx installed. The apache server is stopped. 

The nginx config file is in "/etc/nginx/sites-enabled/projects".
The "etc/nginx/sites-enabled/projects" file has a hard link to the "/etc/nginx/sites-available/projects" file via the ln command. 

The projects config file is as follows: 
```nginx
server {
  listen 80;

  location / {
        proxy_pass http://localhost:3500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
  }

  location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
  }
}
```

# Deploying a new version

When a new version of the website should be deployed, push the changes to GitLab. Then pull the changes on the VM (the projects is already cloned in "/usr/local/share/project3-it2810/, just cd in here and do `sudo git checkout master && sudo git pull`").

Then stop the running server with 
```bash
$ sudo docker-compose down
```

Build the new server with 
```bash
$ sudo docker-compose -f docker-compose.prod.yml build
```
If substantial changes are made, the `--no-cache` flag might need to be added. If big changes to the database has been made, then you might have to change the database itself, like explained earlier. 

Run the server with 
```bash
$ sudo docker-compose -f docker-compose.prod.yml up -d
```

If you do changes to the config file in /etc/nginx/sites-enables/projects, you have to restart the nginx server with
```bash
$ sudo systemctl restart nginx
```



