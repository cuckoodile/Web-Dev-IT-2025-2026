FROM node:22-slim

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./

# Install all dependencies including dev dependencies
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 8001

CMD ["npm", "run", "dev", "--", "--host"]