[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![TravisCI](https://travis-ci.com/ticdenis/oumi.svg?branch=master)](https://travis-ci.com/ticdenis/oumi)

# Oumi

Oumi is a platform to control the state of your debts.

### Before Development

```bash
make vagrant-up

make vagrant-ssh

make docker-yarn COMMAND="lint"

make docker-yarn COMMAND="test"

make docker-yarn NETWORK="oumi_database" COMMAND="workspace @oumi-service/accounts run migrator migrate"

make docker-yarn NETWORK="oumi_database" COMMAND="workspace @oumi-service/transactions run migrator migrate"
```

### Dev

```bash
make docker-compose-up COMMAND="proxy postgres ..."
```
