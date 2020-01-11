# API 
> ogun tech community website api

## Setup

- Install both Docker and Docker Compose
- In the Project's root folder, run 

    ```bash
        docker-compose -f docker-compose.yml -p ogun-api build
    ```
  This command builds up the API's container. 
  
- To start the container, run 

    ```bash
        docker-compose -f docker-compose.yml -p ogun-api up -d
    ```
  
- In your .env file, change the `DB_HOST` value to `db`.

- Enter into the bash shell by running 
    
    ```bash
        docker exec -it ogun_community_api bash
    ```
  and from there, run migration `adonis migration:run`

- Access the API at `127.0.0.1` or `0.0.0.0`

## Developers
- Azeez Abiodun [https://twitter.com/abbey__web | Abbey Web] 
- Majiyagbe Oluwole [https://twitter.com/moluwole | MOluwole] 

