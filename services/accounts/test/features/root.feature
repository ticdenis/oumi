Feature: Root

  Scenario: Visit root
    When I request GET method at "/" url
    Then I expect response to have status as "200"
    And I expect response to match:
      """
      {
      "data": "Account service",
      "errors": null
      }
      """
