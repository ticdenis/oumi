# Oumi services

A service of Oumi is the set in use of Oumi packages and third parties.

> Flow

- Route
- Middleware (optional)
- Validator (optional)
- Controller
- Associate Handler (Query / Command) using handler and builder service of package
- Message (Query / Command) with request validated
- Bus
- Response and optional next()
- ...
- Finish
