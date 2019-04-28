Feature: End Debt

  As an user I would like to complete a debt request with expected values.

  Scenario: Should complete a debt request
    Given I authenticated as user "test@oumi.com" with password "secret" and id "3CAC1A65-040D-4C51-8BD5-8BE04237B3B3"
    When I set JSON request body as:
      """
      {
      "id": "7C90A92A-4EA8-4EB3-86E6-7B52A3722A64"
      }
      """
    Then I request PUT method at "/debts/requests/complete" url
    And I expect response to have status as "200"

  Scenario: Should throw a debt error not found
    Given I authenticated as user "test@oumi.com" with password "secret" and id "3CAC1A65-040D-4C51-8BD5-8BE04237B3B3"
    When I set JSON request body as:
      """
      {
      "id": "7C90A92A-4EA8-4EB3-86E6-7B52A3722A64"
      }
      """
    Then I request PUT method at "/debts/requests/complete" url
    And I expect response to have status as "404"
