# AI Agent Configuration

## Introduction

This project is designed to help you configure and manage AI agents. It provides a user-friendly interface for setting up agents, managing conversations, and monitoring performance. Key features include:

- Agent management
- Conversation tracking
- Performance analytics
- Team management
- System settings

## Installation

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (version 9.6.0 or higher)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/reevolutiva-it/kimfe-cr.git
   cd kimfe-cr
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

## Usage

### Common Commands

- **Start development server**: `pnpm dev`
- **Build for production**: `pnpm build`
- **Start production server**: `pnpm start`
- **Run tests**: `pnpm test`
- **Lint code**: `pnpm lint`
- **Fix lint issues**: `pnpm lint:fix`
- **Format code**: `pnpm format:write`
- **Check formatting**: `pnpm format:check`

### Examples

- To start the development server:

  ```bash
  pnpm dev
  ```

-

## Configuration

### Environment Variables

- `NODE_ENV`: Set to `development`, `test`, or `production` to specify the environment.
- `PORT`: The port on which the server will run (default is `3000`).
- `DATABASE_URL`: The URL of the database to connect to.
- `API_KEY`: The API key for accessing external services.
- `SECRET_KEY`: A secret key used for encryption and session management.
- `LOG_LEVEL`: The level of logging detail (e.g., `info`, `warn`, `error`).

### Configuration Files*

- `tsconfig.json`: TypeScript configuration
- `next.config.js`: Next.js configuration
- `postcss.config.js`: PostCSS configuration
- `prettier.config.js`: Prettier configuration
- `.eslintrc.cjs`: ESLint configuration
- `.stylelintrc.json`: Stylelint configuration

## Dockerfile

To create a `Dockerfile` for this project, follow these steps:

1. Use a Node.js base image:

   ```Dockerfile
   FROM node:18-alpine
   ```

2. Set the working directory to `/app`:

   ```Dockerfile
   WORKDIR /app
   ```

3. Copy the necessary files:

   ```Dockerfile
   COPY package.json pnpm-lock.yaml ./
   ```

4. Install dependencies:

   ```Dockerfile
   RUN npm install -g pnpm
   RUN pnpm install
   ```

5. Copy the source code:

   ```Dockerfile
   COPY . .
   ```

6. Build the project:

   ```Dockerfile
   RUN pnpm run build
   ```

7. Expose the port:

   ```Dockerfile
   EXPOSE 3000
   ```

8. Start the application:

   ```Dockerfile
   CMD ["pnpm", "start"]
   ```

## Scripts

The following scripts are available in `package.json`:

- `build`: Build the project
- `check`: Run linting and type checking
- `dev`: Start the development server
- `lint`: Run ESLint
- `lint:fix`: Fix ESLint issues
- `preview`: Build and start the production server
- `start`: Start the production server
- `typecheck`: Run TypeScript type checking
- `format:write`: Format code with Prettier
- `format:check`: Check code formatting with Prettier
- `test`: Run tests with Jest
- `test:types`: Run TypeScript type tests
- `test:all`: Run all tests

## Linting and Formatting

This project uses ESLint, Stylelint, and Prettier for linting and formatting. The `lint.sh` script is available for running lint checks:

```bash
./lint.sh
```

## Testing

This project uses Jest for testing. To run tests, use the following command:

```bash
pnpm test
```

## Deployment

To deploy the project, follow these steps:

1. Build the project:

   ```bash
   pnpm build
   ```

2. Start the production server:

   ```bash
   pnpm start
   ```

## Contributing

We welcome contributions! Please follow these guidelines:

- Follow the coding standards
- Submit pull requests for review
- Report issues and bugs

## License

This project is licensed under the MIT License.
