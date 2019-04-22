Feature: Change Password

  As an user I would like to change password with expected values.

  Scenario: Should change password
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I set JSON request body as:
      """
      {
      "newPassword": "123456",
      "oldPassword": "secret"
      }
      """
    Then I request PUT method at "/change-password" url
    And I expect response to have status as "200"

  Scenario: Should throw a user error not found
    Given I authenticated as user "test@oumi.com" with password "secret" and id "DEBE0D06-3C96-42A3-8083-461653208E7D"
    When I set JSON request body as:
      """
      {
      "newPassword": "123456",
      "oldPassword": "secret"
      }
      """
    Then I request PUT method at "/change-password" url
    And I expect response to have status as "404"
    And I expect response to match:
      """
      {
      "data": null,
      "errors": [{
      "code": "USER_NOT_FOUND",
      "message": "The <DEBE0D06-3C96-42A3-8083-461653208E7D> user id not found"
      }]
      }
      """

  Scenario: Should throw a password not match error
    Given I authenticated as user "test@oumi.com" with password "secret" and id "DEBE0D06-3C96-42A3-8083-461653208E7D"
    When I set JSON request body as:
      """
      {
      "newPassword": "123456",
      "oldPassword": "dadada"
      }
      """
    Then I request PUT method at "/change-password" url
    And I expect response to have status as "409"
    And I expect response to match:
      """
      {
      "data": null,
      "errors": [{
      "code": "PASSWORD_NOT_MATCH",
      "message": "The <dadada> password not match"
      }]
      }
      """
