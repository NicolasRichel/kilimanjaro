# Kilimanjaro: web application for comptability

This repository contains both Kilimanjaro **app** (frontend) and **service** (backend).<br/>
The code for each part is placed under the corresponding directory.

> :warning: **Note:** different version of Node.js are used to run app & service.<br/>
> A *Node version manager* like [`nvm`](https://github.com/nvm-sh/nvm) is necessary in order to handle that.<br/>
> You can check the `.nvmrc` files to know which version of Node is used in each part.

## Install

| **(1)** Clone this repository:

```
$ git clone https://gitlab.com/NicolasRichel/kilimanjaro.git
$ cd kilimanjaro
```

| **(2)** Service setup (in `service/` directory)

| | **(2.1)** Install dependencies

```
$ nvm use
$ yarn install
```

| | **(2.2)** Create local DB file

```
$ mkdir data
$ touch data/kilimanjaro.db
```

| | **(2.3)** *(Optional)* Set environment variables

> **Note:** the service needs some env vars to be defined in order to work properly.
> While it is possible to define those variables directly as describe below it is not
> recommended to do so. You should refer to the next section on how to start the service
> to see the preferred way to define env vars.

Set the following environment variables in your shell:

```
$ export S001_ALLOWED_ORIGINS=*
$ export S001_DATABASE_URL=sqlite:<path-to-your-local-db-file>
$ export S001_PORT=9001
```

*(Note that you will have to set env vars again each time you open a new shell.)*

| **(3)** Application setup (in `app/` directory)

| | **(3.1)** Install dependencies

```
$ cd app
$ nvm use
$ yarn install
```

| | **(3.2)** Set env file

```
$ cp .env.example .env.local
```

You can then open `.env.local` in your favorite text editor and set variables values
to what fits your need.

## Run

#### Start the service

In order to start the service you can write a short script that does the job for you:<br/>

In the project root directory:

```
$ touch start-service.sh
```

Then open it in your favorite text editor and put this inside:

```bash
#! /bin/bash

cd service/

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use

export S001_ALLOWED_ORIGINS=*
export S001_DATABASE_URL=sqlite:<path-to-your-local-db-file>
export S001_PORT=9001

yarn start

exit 0
```

Finally make it executable and run it:

```
$ chmod u+x start-service.sh
$ ./start-service.sh
```

#### Start the app

To run the application locally:

```
$ cd app
$ nvm use
$ yarn start
```

## License

> You are free to copy, modify, and distribute Kilimanjaro under the terms of the GPL 3.0.<br/>
> See [LICENSE](./LICENSE) for more details.
