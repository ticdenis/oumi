FROM oumi/node

COPY ./packages/shared/ ./packages/shared/

COPY ./packages/user/ ./packages/user/
COPY ./packages/debt/ ./packages/debt/
COPY ./packages/payment/ ./packages/payment/

COPY ./services/transactions/ ./services/transactions/

RUN yarn install

RUN yarn build

WORKDIR /app/services/transactions/dist

EXPOSE 3002

CMD ["node", "./main.js"]
