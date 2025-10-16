# To Do App User Interface

This is a learning project, implementing an app where users can create lists of task items.

## Tech Stack

- Vite
- Vitest
- Redux
- Redux Thunk and Axios
- Remix Icons as downloaded assets, see [https://remixicon.com/](https://remixicon.com/)
- Docker
- AWS ECR

## Development environment

To run the project, run this to install packages

```bash
npm install
```

To run the development environment, run this:

```bash
npm run dev
```

## Testing

The project is implemented using a TDD approach.

The unit testing library is vitest.

To run the unit tests, run:

```bash
npm run test
```

## Deployment to AWS

### Prepare AWS Environment

Install AWS CLI v2

Create IAM user `main-admin` with the following permissions policies:

- AdministratorAccess

Create an access key and a secret access key for `main-admin`.

Configure credentials and set the keys and choose a default region (e.g. us-east-1) to the AWS CLI configuration:

```bash
aws configure
```

### Build & Push Docker Image

`to-do-ui` is built on a Docker image, which is pushed to AWS ECR.

Make sure you are in the root directory of `to-do-ui`, where the Dockerfile is located.

Replace the `<region>` and `<account_id>` with the region of your choice and the account id of the AWS account id.

```bash
aws ecr create-repository --profile main-admin --repository-name todo-ui
aws ecr get-login-password --profile main-admin | docker login --username AWS --password-stdin <account_id>.dkr.ecr.<region>.amazonaws.com
docker build -t todo-ui .
docker tag todo-ui:latest <account_id>.dkr.ecr.<region>.amazonaws.com/todo-ui:latest
docker push <account_id>.dkr.ecr.<region>.amazonaws.com/todo-ui:latest
```

## Destroy the Deployment

```bash
# Delete ECR repo
aws ecr delete-repository --profile main-admin --repository todo-ui --force
```
