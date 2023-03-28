# Node.
FROM node:18.15.0

# Work directory.
RUN mkdir -p /app
WORKDIR /app

# Copy file to the container.
COPY . /app

# Install dependencies.
RUN apt-get update
RUN apt-get install -yq chromium
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN npm install

# Executable.
ENV CHROME_BIN=/usr/bin/chromium-browser

# Port.
EXPOSE 3000

# Run app.
CMD ["npm", "run", "start"]