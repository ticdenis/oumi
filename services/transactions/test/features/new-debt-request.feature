Feature: New Debt Request

  As an user I would like to send a new debt request with expected values.

  Scenario: Should send a new debt request
    Given I authenticated as user "test@oumi.com" with password "secret" and id "AC9A3554-9EEB-4450-A1BE-22D8ABA32B47"
    When I set JSON request body as:
      """
      {
      "amount": 100,
      "concept": "Hello World",
      "currency": "EUR",
      "debtorId": "CE034EB5-C6E3-4A99-B429-A9F9F44C3DEC",
      "id": "C87084D5-FBE5-4FC5-8353-E835029D08FF",
      "loanerId": "AC9A3554-9EEB-4450-A1BE-22D8ABA32B47"
      }
      """
    Then I request POST method at "/debts/requests" url
    And I expect response to have status as "201"

  Scenario: Should throw a user error not found
    Given I authenticated as user "test@oumi.com" with password "secret" and id "AC9A3554-9EEB-4450-A1BE-22D8ABA32B47"
    When I set JSON request body as:
      """
      {
      "amount": 100,
      "concept": "Hello World",
      "currency": "EUR",
      "debtorId": "CE034EB5-C6E3-4A99-B429-A9F9F44C3DEC",
      "id": "C87084D5-FBE5-4FC5-8353-E835029D08FF",
      "loanerId": "AC9A3554-9EEB-4450-A1BE-22D8ABA32B47"
      }
      """
    Then I request POST method at "/debts/requests" url
    And I expect response to have status as "404"
