#setup docker deployment
FROM node:20

RUN mkdir hris
RUN cd hris

WORKDIR /hris

COPY . .

RUN npm install

RUN npm run build

CMD npm run start
