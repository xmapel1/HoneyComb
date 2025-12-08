Feature: Tag selection

  Scenario: Clicking a tag registers the click
    Given im on the gallery page
    When i click a tag
    Then the tag click is registered