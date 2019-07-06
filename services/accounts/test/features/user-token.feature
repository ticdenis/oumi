Feature: User Token

  As a guest I would like to authenticate with expected values.

  Scenario: Should authenticate
    Given JSON request body as:
      """
      {
      "email": "test@oumi.com",
      "password": "secret"
      }
      """
    When I request POST method at "/auth" url
    Then I expect response to have status as "200"
    And I expect response to match with a JWT

  Scenario: Should throw a user email not found or password not match error
    Given JSON request body as:
      """
      {
      "email": "no-reply@oumi.com",
      "password": "secret"
      }
      """
    When I request POST method at "/auth" url
    Then I expect response to have status as "404"
