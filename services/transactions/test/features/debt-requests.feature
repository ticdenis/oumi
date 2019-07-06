Feature: Debt Requests

  As an user I would like to get me debt requests.

  Scenario: Should get debt requests
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I request GET method at "/debts/requests" url
    Then I expect response to have status as "200"

  Scenario: Should throw a debt error not found
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I request GET method at "/debts/requests" url
    Then I expect response to have status as "404"
