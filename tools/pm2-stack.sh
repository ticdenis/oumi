#!/bin/bash

set -e

PROGRAM=$0
COMMAND=$1
OPTION=$2

APP="oumi"
SERVICE="yarn workspace @oumi-service"
ROOT=$(git rev-parse --show-toplevel)
PM2=$ROOT/node_modules/.bin/pm2

function usage {
    echo "usage: $PROGRAM command [options]"
    echo "command: "
    echo "  list       List $APP services"
    echo "  up         Start $APP services"
    echo "  start      Start $APP service"
    echo "  down       Stop $APP services"
    echo "  stop       Stop $APP service"
    echo "  restart    Restart $APP services"
    echo "  logs       Log $APP service"
    echo "  proxy      Proxy (start|stop|logs) $APP services"
    exit 0
}

case $COMMAND in
  "list")
    $PM2 ls;;
  "up")
    $SERVICE/accounts run serve
    $SERVICE/transactions run serve
    ;;
  "start")
    $SERVICE/$OPTION run serve;;
  "down")
    $PM2 delete /@oumi-service/;;
  "stop")
    $SERVICE/$OPTION run serve:down;;
  "logs")
    $SERVICE/$OPTION run serve:logs;;
  "restart")
    $PM2 restart @oumi-service/$OPTION;;
  "proxy:start")
    docker run --rm -d --name $APP-pm2-proxy \
      -p 3000:3000 \
      -v $ROOT/services/nginx.conf:/etc/nginx/nginx.conf:delegated \
      nginx:1.15-alpine \
      nginx -g 'daemon off;'
    ;;
  "proxy:stop")
    docker rm $APP-pm2-proxy --force;;
  "proxy:logs")
    docker logs $APP-pm2-proxy -f;;
  *)
    usage ;;
esac
