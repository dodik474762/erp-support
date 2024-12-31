#setup docker deployment
FROM node:20

RUN mkdir erp-support
RUN cd erp-support

WORKDIR /erp-support

COPY . .

RUN npm install

RUN npm run build

CMD npm run start
