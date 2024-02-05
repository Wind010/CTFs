FROM node:current-alpine3.18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your application will run on
EXPOSE 3000

# SECRET_KEY and FLAG must be passed in.
# docker run -e FLAG=YOUR_FLAG -e SECRET_KEY=YOUR_SECRET_KEY <image_name>
# or
# docker run --env-file env.list <image_name>

# Command to run the application
CMD ["npm", "start"]
