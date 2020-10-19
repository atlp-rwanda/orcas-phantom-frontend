# fetch base image
FROM node:alpine


# Set working directory
WORKDIR /usr/src/frontend_app

# Create app working directory
#RUN mkdir /usr/src/frontend_app

# Copy all files to working directory
COPY . /usr/src/frontend_app


# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/frontend_app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install

# build the app
RUN npm build

CMD ["npm", "run", "dev"]
