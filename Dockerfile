# Use an official Node.js runtime
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies and package-lock.json
COPY package*.json package-lock.json ./
RUN npm install

# Copy the source code
COPY . .

# Build TypeScript (if applicable)
RUN npm run build

# Expose the port used by the app
EXPOSE 8080

# Start the server
CMD ["node", "build/server.js"]