# Scheduler

The goal of this project is to be hosted on AWS NestJS & NextJS to be lambdas and sql a bucket.

Tools for development

- DevOps
  - Docker
  - Docker-compose
- BackEnd
  - NestJS
  - Prisma
  - MySQL
- FrontEnd
  - NextJS

## Current Status

Working on user authenticatoin feature.

## Woking Feature

- **Containerizing** This is done by dockerfile and docker-compose
  - Start the server & Database `docker-compose up -d`
  - Stop the server & Database `docker-compose stop`
  - Link terminal to docker-compose container `docker-compose exec -it [CONTAINER_NAME] bash`
    - This is usefull to use prisma comands if you are not using Docker desktop
