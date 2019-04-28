Feature: New Pay

  As an user I would like to send a new pay with expected values.

  Scenario: Should send a new pay
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I set JSON request body as:
      """
      {
      "debtId": "496E0C23-ED63-4725-B391-DE908C5ECF65",
      "id": "E1968E99-5E69-4EF5-B3C8-EED4DD556044",
      "quantity": 100,
      "message": "A message"
      }
      """
    Then I request POST method at "/payments" url
    And I expect response to have status as "201"

  Scenario: Should throw a user error not found
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I set JSON request body as:
      """
      {
      "debtId": "496E0C23-ED63-4725-B391-DE908C5ECF65",
      "id": "E1968E99-5E69-4EF5-B3C8-EED4DD556044",
      "quantity": 100,
      "message": "A message"
      }
      """
    Then I request POST method at "/payments" url
    And I expect response to have status as "404"
