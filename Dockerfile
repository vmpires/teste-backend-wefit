FROM node

WORKDIR /usr/app

COPY ./package.json /usr/app/
COPY prisma ./prisma/

RUN yarn install

COPY . .

EXPOSE 4568

CMD ["yarn", "start:prod" ]
