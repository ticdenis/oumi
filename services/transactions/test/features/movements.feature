Feature: Movements

  As an user I would like to get my movements.

  Scenario: Should get my movements
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I request GET method at "/movements" url
    Then I expect response to have status as "200"

  Scenario: Should throw a user error not found
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I request GET method at "/movements" url
    Then I expect response to have status as "404"
