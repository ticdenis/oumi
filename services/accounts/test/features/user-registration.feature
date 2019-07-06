Feature: User Registration

  As a guest I would like to register with expected values.

  Scenario: Should register an user
    Given JSON request body as:
      """
      {
      "email": "test@oumi.com",
      "firstname": "Test",
      "id": "D00FC4D9-539C-4019-88F6-B242275FFDC3",
      "lastname": "Er",
      "nickname": "oumi",
      "password": "secret",
      "phone": "123456789"
      }
      """
    When I request POST method at "/users" url
    Then I expect response to have status as "201"

  Scenario: Should throw a user email already exists error
    Given JSON request body as:
      """
      {
      "email": "test@oumi.com",
      "firstname": "Test",
      "id": "D00FC4D9-539C-4019-88F6-B242275FFDC3",
      "lastname": "Er",
      "nickname": "oumi",
      "password": "secret",
      "phone": "123456789"
      }
      """
    When I request POST method at "/users" url
    Then I expect response to have status as "409"
    And I expect response to match:
      """
      {
      "data": null,
      "errors": [{
      "code": "USER_ALREADY_EXISTS",
      "message": "The <test@oumi.com> user email already exists"
      }]
      }
      """
