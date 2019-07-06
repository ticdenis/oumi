Feature: Profile

  As an user I would like to get me profile expected values.

  Scenario: Should get profile
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I request GET method at "/profile" url
    Then I expect response to have status as "200"
    And I expect response to match:
      """
      {
      "data": {
      "email": "test@oumi.com",
      "firstname": "Test",
      "id": "A2573A06-538D-46EA-B992-BD9AC911ED18",
      "lastname": "Er",
      "nickname": "oumi",
      "phone": "123456789"
      },
      "errors": null
      }
      """

  Scenario: Should throw a profile error not found
    Given I authenticated as user "test@oumi.com" with password "secret" and id "A2573A06-538D-46EA-B992-BD9AC911ED18"
    When I request GET method at "/profile" url
    Then I expect response to have status as "404"
    And I expect response to match:
      """
      {
      "data": null,
      "errors": [{
      "code": "USER_NOT_FOUND",
      "message": "The <A2573A06-538D-46EA-B992-BD9AC911ED18> user id not found"
      }]
      }
      """
