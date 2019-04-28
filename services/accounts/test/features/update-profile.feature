Feature: Update Profile

  As an user I would like to update me profile with expected values.

  Scenario: Should update profile
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I set JSON request body as:
      """
      {
      "firstname": "Prue",
      "lastname": "Bas",
      "nickname": "oweme",
      "phone": "987654321"
      }
      """
    Then I request PUT method at "/profile" url
    And I expect response to have status as "200"

  Scenario: Should throw a user error not found
    Given I authenticated as user "test@oumi.com" with password "secret" and id "180B5568-3227-47FA-A68F-467923957F87"
    When I set JSON request body as:
      """
      {
      "firstname": "Prue",
      "lastname": "Bas",
      "nickname": "oweme",
      "phone": "987654321"
      }
      """
    Then I request PUT method at "/profile" url
    And I expect response to have status as "404"
    And I expect response to match:
      """
      {
      "data": null,
      "errors": [{
      "code": "USER_NOT_FOUND",
      "message": "The <180B5568-3227-47FA-A68F-467923957F87> user id not found"
      }]
      }
      """
