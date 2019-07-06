FROM oumi/node

COPY ./packages/shared/ ./packages/shared/

COPY ./packages/user/ ./packages/user/
COPY ./packages/movement/ ./packages/movement/

COPY ./services/transactions/ ./services/transactions/

RUN yarn install

RUN yarn build

WORKDIR /app/services/transactions/dist

EXPOSE 3002

CMD ["node", "./main.js"]
