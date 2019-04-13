#!/bin/bash

set -e

PROGRAM=$0
COMMAND=$1
OPTION=$2

APP="oumi"
IMAGE="node"
COMPOSE="docker-compose.yml"
ROOT=$(git rev-parse --show-toplevel)

function usage {
    echo "usage: $PROGRAM command [options]"
    echo "command: "
    echo "  build     Build docker images"
    echo "  start     Start docker stack"
    echo "  stop      Stop docker stack"
    echo "  yarn      (install|clean|build)"
    echo "  services  Show $APP services"
    echo "  logs      Show $APP service logs"
    echo "  up        Scale to 0 $APP service"
    echo "  dowb      Scale to 1 $APP service"
    echo "  test      Test all $APP packages & services"
    exit 1
}

case $COMMAND in
  "build")
    docker build --file Dockerfile --tag="$APP/$IMAGE" .;;
  "yarn")
    docker run --rm --workdir /app --volume $ROOT:/app:delegated $APP/$IMAGE yarn $OPTION;;
  "start")
    docker stack deploy --compose-file $COMPOSE $APP;;
  "stop")
    docker stack rm $APP;;
  "services")
    docker stack services $APP;;
  "logs")
    docker service logs $APP\_$OPTION -f;;
  "down")
    docker service scale $APP\_$OPTION\=0;;
  "up")
    docker service scale $APP\_$OPTION\=1;;
  *)
    usage ;;
esac
