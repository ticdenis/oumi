Feature: User Contacts

  As an user I would like to get my contacts.

  Scenario: Should get my contacts
    Given I authenticated as user "test@oumi.com" with password "secret"
    When I request GET method at "/users/contacts" url
    Then I expect response to have status as "200"
    And I expect response to match:
      """
      {
      "data": [{
      "debts": [{
      "amount": 100,
      "currency": "EUR"
      }],
      "firstname": "Cont",
      "id": "64C55E0A-8C49-4B40-9D88-C3202CCAAFA2",
      "lastname": "Act",
      "nickname": "contact"
      }],
      "errors": null
      }
      """

  Scenario: Should throw a user error not found
    Given I authenticated as user "test@oumi.com" with password "secret" and id "6E8B183E-8363-4108-9FEA-8C1B6B0A7C93"
    When I request GET method at "/users/contacts" url
    Then I expect response to have status as "404"
    And I expect response to match:
      """
      {
      "data": null,
      "errors": [{
      "code": "USER_NOT_FOUND",
      "message": "The <6E8B183E-8363-4108-9FEA-8C1B6B0A7C93> user id not found"
      }]
      }
      """
