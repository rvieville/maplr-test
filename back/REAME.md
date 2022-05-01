## Mapler-test ( backend )

This backend provide you few route to manage a Hockey team / player.

## Set up

In order to set up the data base run this command
```
npm run build
```

this command will run `set-up.sh` located in scripts directory and execute `add-data.ts`.

`set-up.sh` will create the Hockey base and all the needed tables.
`add-data.ts` will parse data from data.json in mysql folder and add all the data in the differents table.

## Run project

In order to run the API
```
npm run dev ( live reload )
```
Or
```
npm run start
```

## Available route

There are 3 route available in this API.
- GET : ```/api/team/{year}```
  - use to get all information related to a team (coach, players, year ...)
- POST : ```/api/team/{year} with player in body```
  - use to create a player
- PUT: ```/api/player/{id}/captain```
  - use to set a player a captain
