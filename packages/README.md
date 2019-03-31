# Oumi packages

An Oumi package is a set of components shared among several Oumi services.

> Write

- Data, Command
- Service (Either<Error, void>), BuilderService (Constructor)
- CommandHandler (command -> input [VO])

> Read

- Data, Query
- Response, DataTransformer
- Service (Either<Error, Response>), BuilderService (Constructor)
- QueryHandler (query -> input [VO])

> Flow

- Command/Query
- Bus
- Handler
- Service
