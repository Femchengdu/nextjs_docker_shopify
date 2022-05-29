FROM node:12

ENV PORT 3000
ENV SHOPIFY_STOREFRONT_ACCESS_TOKEN ${APP_STOREFRONT_ACCESS_TOKEN}
ENV SHOPIFY_STORE_DOMAIN ${APP_STORE_DOMAIN}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN yarn

# Copying source files
COPY . /usr/src/app

# Building app
RUN yarn build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"