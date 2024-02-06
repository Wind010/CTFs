# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy your HTML and JavaScript files to the Nginx web server directory
COPY login.html /usr/share/nginx/html/
COPY css/styles.css /usr/share/nginx/html/css/
COPY js/login.js /usr/share/nginx/html/js/

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
