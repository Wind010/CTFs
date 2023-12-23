# Use the official Python base image
FROM python:3.13.0a2-alpine3.19

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the Python script into the container
COPY . .


# If behind corporate firewall, may need --no-check-certificate
RUN apk update && apk upgrade

RUN apk add --no-cache bash \
                       ca-certificates \
                       gcc \
                       build-base \
                       linux-headers \
                       libffi-dev \
    && rm -rf /var/cache/apk/*
    

ARG TRUSTED_PYPI_HOSTS=""
    
# If behind corporate firewall try uncomment.
#ARG TRUSTED_PYPI_HOSTS="--trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org"

RUN python -m pip install ${TRUSTED_PYPI_HOSTS} --upgrade pip && \
  python -m pip install ${TRUSTED_PYPI_HOSTS} -r "requirements.txt"


# Define the command to run the Python script when the container starts
CMD ["python", "ctf.py"]