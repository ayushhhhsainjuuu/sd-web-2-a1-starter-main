"use strict";

// sample data - expanded Star Wars characters with varied ages
const characters = [
  { id: 1, name: "Luke Skywalker", age: 23 },
  { id: 2, name: "Darth Vader", age: 45 },
  { id: 3, name: "Princess Leia", age: 23 },
  { id: 4, name: "Obi-Wan Kenobi", age: 57 },
  { id: 5, name: "Yoda", age: 900 },
  { id: 6, name: "Han Solo", age: 32 },
  { id: 7, name: "Chewbacca", age: 234 },
  { id: 8, name: "R2-D2", age: 33 },
  { id: 9, name: "C-3PO", age: 112 },
  { id: 10, name: "Padmé Amidala", age: 27 },
];

// broken test data for exercise 6
const brokenCharacters = [
  { id: 11, age: 20 }, // missing name
  { id: 12, name: "Mace Windu", age: 53 },
  { id: 13, age: 30 }, // missing name
  { id: 14, name: "", age: 40 }, // empty name (treat as error)
  { id: 15, name: "Rey", age: 19 },
];

document.addEventListener("DOMContentLoaded", () => {
  // Exercise 1
  renderNamesToList(characters, "names-list");

  // Exercise 2
  const under40 = characters.filter((c) => c.age < 40);
  under40.forEach((c) => console.log(c.name));
  renderNamesToList(under40, "young-characters-list");

  // Exercise 3 (reusable function)
  renderNamesToList(characters, "function-list");

  // Exercise 4 (age filter function)
  renderByAgeThreshold(characters, 40, "age-filter-list");

  // Exercise 5 (error handling using broken array too)
  renderNamesWithErrors(characters, "error-handling-list", "error-messages");

  // Exercise 6 (test error handling with broken array)
  renderNamesWithErrors(
    brokenCharacters,
    "broken-array-list",
    "broken-array-errors"
  );
});

/**
 * Clears a UL and renders character names into it.
 */
function renderNamesToList(array, listId) {
  const ul = document.getElementById(listId);
  if (!ul) return;

  ul.innerHTML = "";

  array.forEach((character) => {
    console.log(character.name);
    const li = document.createElement("li");
    li.textContent = character.name;
    ul.appendChild(li);
  });
}

/**
 * Filters by age threshold and renders results.
 */
function renderByAgeThreshold(array, threshold, listId) {
  const filtered = array.filter((c) => c.age < threshold);
  filtered.forEach((c) => console.log(c.name));
  renderNamesToList(filtered, listId);
}

/**
 * Renders names with error handling:
 * - If name is missing/empty, logs and shows error message in error container.
 */
function renderNamesWithErrors(array, listId, errorDivId) {
  const ul = document.getElementById(listId);
  const errorDiv = document.getElementById(errorDivId);
  if (!ul || !errorDiv) return;

  ul.innerHTML = "";
  errorDiv.innerHTML = "";

  array.forEach((character, index) => {
    const hasValidName =
      character &&
      Object.prototype.hasOwnProperty.call(character, "name") &&
      typeof character.name === "string" &&
      character.name.trim().length > 0;

    if (!hasValidName) {
      const msg = `Error: Item at index ${index} (id: ${
        character?.id ?? "unknown"
      }) is missing a valid "name" property.`;

      console.error(msg);

      const p = document.createElement("p");
      p.classList.add("error-message");
      p.textContent = msg;
      errorDiv.appendChild(p);

      return;
    }

    const li = document.createElement("li");
    li.textContent = character.name;
    ul.appendChild(li);
  });
}
