Feature: New Contact Request

  As an user I would like to send a contact request with expected values.

  Scenario: Should send a new contact request
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I set JSON request body as:
      """
      {
      "message": "Hello friend",
      "nickname": "oweme",
      "requesterId": "34B21FD2-6DE6-41E1-AFF3-887BBA70F0E9"
      }
      """
    Then I request POST method at "/contacts/requests" url
    And I expect response to have status as "201"

  Scenario: Should throw a contact error not found
    Given I authenticated as user "test@oumi.com" with password "secret" and id "4957D4F7-A480-4A40-8DB5-B6F86739E8CE"
    When I set JSON request body as:
      """
      {
      "message": "Hello friend",
      "nickname": "oweme",
      "requesterId": "34B21FD2-6DE6-41E1-AFF3-887BBA70F0E9"
      }
      """
    Then I request POST method at "/contacts/requests" url
    And I expect response to have status as "404"
    And I expect response to match:
      """
      {
      "data": null,
      "errors": [{
      "code": "CONTACT_NOT_FOUND",
      "message": "The <4957D4F7-A480-4A40-8DB5-B6F86739E8CE> contact id not found"
      }]
      }
      """
