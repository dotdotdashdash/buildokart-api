# Development Dockerfile for Medusa
FROM node:20-alpine

# Set working directory
WORKDIR /server

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and pnpm config
# COPY package.json pnpm-lock.yaml*


# Copy source code
COPY . .


# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# RUN pnpm medusa db:migrate
# RUN pnpm seed || echo "Seeding failed, continuing..."

# Expose the port Medusa runs on
EXPOSE 9000 5173

# Start with migrations and then the development server
# ENTRYPOINT ["./start.sh"]

CMD ["pnpm", "dev"]