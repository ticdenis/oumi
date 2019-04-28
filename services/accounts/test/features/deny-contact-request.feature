Feature: Deny Contact Request

  As an user I would like to deny a contact request with expected values.

  Scenario: Should deny a contact request
    Given I authenticated as user "test@oumi.com" with password "secret" and id "F92A818C-F5E9-4792-8F59-64B41E851558"
    When I set JSON request body as:
      """
      {
      "contactId": "EA6262AC-4E35-405B-ADBA-D3A0FA41C02C"
      }
      """
    Then I request PUT method at "/contacts/requests/confirm" url
    And I expect response to have status as "200"

  Scenario: Should throw a contact error not found
    Given I authenticated as user "test@oumi.com" with password "secret" and id "F92A818C-F5E9-4792-8F59-64B41E851558"
    When I set JSON request body as:
      """
      {
      "contactId": "EA6262AC-4E35-405B-ADBA-D3A0FA41C02C"
      }
      """
    Then I request PUT method at "/contacts/requests/confirm" url
    And I expect response to have status as "404"
