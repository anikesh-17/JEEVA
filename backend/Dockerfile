FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the API port
EXPOSE 4000

# Run the Node Express server
CMD ["npm", "start"]
