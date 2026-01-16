FROM node:22-slim

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install all dependencies including dev dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

EXPOSE 8001

CMD ["pnpm", "run", "dev", "--", "--host"]