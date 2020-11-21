FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy package json
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm update

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "npm", "start" ]