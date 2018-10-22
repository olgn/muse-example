From node:8

# Create app directory
WORKDIR /usr/src/server

# Install app dependencies
COPY package*.json ./

RUN yarn install

# Install muse-js
RUN cd ./node_modules/muse-js/ && yarn

# Install noble
RUN apt-get update && apt-get install -y sudo libcap2-bin bluetooth bluez libbluetooth-dev libudev-dev

# Allow noble to run without root access
RUN sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

# Bundle server source
COPY . .

# Server runs on port 5000
EXPOSE 5000
CMD ["yarn", "start"]