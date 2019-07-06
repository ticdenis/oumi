FROM oumi/node

COPY ./packages/shared/ ./packages/shared/

COPY ./packages/user/ ./packages/user/
COPY ./packages/contact/ ./packages/contact/

COPY ./services/accounts/ ./services/accounts/

RUN yarn install

RUN yarn build

WORKDIR /app/services/accounts/dist

EXPOSE 3001

CMD ["node", "./main.js"]
