# Use the latest nginx:alpine since setup is more steps than installing node.
FROM nginx:alpine

# May need to add --no-check-certificates to workaround some firewalls.
RUN apk update --no-check-certificate && apk add --no-check-certificate npm

# Server code
COPY server/ /usr/src/app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Client code - Could use server to host the client code also with http-server.
COPY client/login.html /usr/share/nginx/html/
COPY client/css/styles.css /usr/share/nginx/html/css/
COPY client/js/login.js /usr/share/nginx/html/js/

# Copy Nginx default configuration with adjusted index
COPY client/nginx-default.conf /etc/nginx/conf.d/default.conf


# Firewall workaround
RUN npm config set strict-ssl false

# Install server dependencies
WORKDIR /usr/src/app/server

# Firewall workaround
RUN npm config set strict-ssl true

# Expose port 3000 and 80 for HTTP server and client traffic
EXPOSE 3000 80


# SECRET_KEY and FLAG must be passed in.
# docker run -e FLAG=YOUR_FLAG -e SECRET_KEY=YOUR_SECRET_KEY <image_name>
# or
# docker run --env-file env.list <image_name>
 
# Start NPM and Nginx web server
# Since we're breaking single-responsibility for container we run nginx in background.
#RUN npm start & nginx -g 'daemon on;'
CMD ["sh", "-c", "nginx -g 'daemon on;'; npm start"] 
#CMD ["sh", "-c", "nginx -g 'daemon off;'"] 
