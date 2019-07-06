# Variables

include .env
export $(shell sed 's/=.*//' .env)

IMAGE = oumi/node

# Docker Commands

docker-build:
	docker build -f $(PWD)/Dockerfile -t $(IMAGE) .

docker-yarn:
	docker run --rm -w /app --volume $(PWD)/:/app:delegated $(IMAGE) yarn $(COMMAND)

docker-compose-up:
	docker-compose -f $(PWD)/docker-compose.yml up $(COMMAND)

docker-compose-down:
	docker-compose -f $(PWD)/docker-compose.yml down $(COMMAND)

docker-bash:
	docker run --rm -it $(IMAGE) bash

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
