# Use the official Python base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the Python script into the container
COPY . .

RUN apt-get update && apt-get install -y ca-certificates --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Updates /etc/ssl/certs
RUN update-ca-certificates

ARG TRUSTED_PYPI_HOSTS="--trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org"

RUN python -m pip install ${TRUSTED_PYPI_HOSTS} --upgrade pip \
    && pip install ${TRUSTED_PYPI_HOSTS} -r "requirements.txt"

RUN python -m pip install ${TRUSTED_PYPI_HOSTS} pip-system-certs psutil

# Define the command to run the Python script when the container starts
CMD ["python", "ctf.py"]