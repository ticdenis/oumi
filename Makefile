# Variables

include .env
export $(shell sed 's/=.*//' .env)

IMAGE = oumi/node

ifndef NETWORK
override NETWORK = default
endif

# Docker Commands

docker-build:
	docker build -f $(PWD)/Dockerfile -t $(IMAGE) .

docker-yarn:
	docker run --rm --network $(NETWORK) -w /app --volume $(PWD)/:/app:delegated $(IMAGE) yarn $(COMMAND)

docker-compose-up:
	docker-compose -f $(PWD)/docker-compose.yml up $(COMMAND)

docker-compose-down:
	docker-compose -f $(PWD)/docker-compose.yml down $(COMMAND)

docker-bash:
	docker run --rm --network $(NETWORK) -w /app --volume $(PWD)/:/app:delegated -it $(IMAGE) bash

docker-exec:
	docker exec -it $(CONTAINER) $(COMMAND)

docker-compose-ps:
	docker-compose -f $(PWD)/docker-compose.yml ps

# Vagrant Commands

vagrant-reset:
	vagrant halt && vagrant destroy -f && rm -rf .vagrant

vagrant-up:
	vagrant up

vagrant-ssh:
	vagrant ssh

vagrant-docker-bash:
	vagrant ssh -c "docker run --rm -it $(IMAGE) bash"

vagrant-stop:
	vagrant halt

vagrant-destroy:
	vagrant destroy -f

vagrant-update:
	vagrant box update
	vagrant provision

# Travis Commands

travis-update-docker-compose:
	sudo rm /usr/local/bin/docker-compose
	curl -L https://github.com/docker/compose/releases/download/$(DOCKER_COMPOSE_VERSION)/docker-compose-`uname -s`-`uname -m` > docker-compose
	chmod +x docker-compose
	sudo mv docker-compose /usr/local/bin
