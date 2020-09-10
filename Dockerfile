FROM node:12.16.0

WORKDIR /code

COPY package.json /code/package.json
RUN npm install
COPY . /code
CMD [ "npm", "start" ]

COPY . .
