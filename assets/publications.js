const list = document.querySelector("#publication-list");
const searchInput = document.querySelector("#publication-search");
const typeSelect = document.querySelector("#publication-type");
const yearSelect = document.querySelector("#publication-year");
const count = document.querySelector("#publication-count");
const total = document.querySelector("#total-works");
const clearButton = document.querySelector("#clear-filters");
const errorMessage = document.querySelector("#publication-error");
const allowedTypes = new Set(
  (document.querySelector("#publication-filters")?.dataset.types || "")
    .split(",")
    .filter(Boolean)
);

const typeLabels = {
  "book": "Book",
  "book-chapter": "Book chapter",
  "conference-paper": "Conference paper",
  "edited-book": "Edited book",
  "journal-article": "Journal article",
  "lecture-speech": "Lecture or talk",
  "online-resource": "Online resource",
  "preprint": "Preprint",
  "report": "Report",
  "other": "Other"
};

let publications = [];

function addOptions(select, values, label) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label(value);
    select.append(option);
  });
}

function createPublication(work) {
  const article = document.createElement("article");
  article.className = "publication-item";

  const meta = document.createElement("div");
  meta.className = "publication-item-meta";

  const year = document.createElement("strong");
  year.textContent = work.year;

  const type = document.createElement("span");
  type.textContent = typeLabels[work.type] || work.type;

  meta.append(year, type);

  const body = document.createElement("div");
  const title = document.createElement("h3");

  if (work.url) {
    const link = document.createElement("a");
    link.href = work.url;
    link.textContent = work.title;
    link.rel = "noopener";
    title.append(link);
  } else {
    title.textContent = work.title;
  }

  body.append(title);

  if (work.venue) {
    const venue = document.createElement("p");
    venue.textContent = work.venue;
    body.append(venue);
  }

  article.append(meta, body);
  return article;
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedType = typeSelect?.value || "";
  const selectedYear = yearSelect.value;
  const matches = publications.filter((work) => {
    const searchable = `${work.title} ${work.venue}`.toLowerCase();
    return (
      (!query || searchable.includes(query)) &&
      (!selectedType || work.type === selectedType) &&
      (!selectedYear || work.year === selectedYear)
    );
  });

  const fragment = document.createDocumentFragment();
  let currentYear = "";

  matches.forEach((work) => {
    if (work.year !== currentYear) {
      currentYear = work.year;
      const heading = document.createElement("h2");
      heading.className = "publication-year-heading";
      heading.textContent = currentYear;
      fragment.append(heading);
    }
    fragment.append(createPublication(work));
  });

  list.replaceChildren(fragment);
  count.textContent = `${matches.length} ${matches.length === 1 ? "work" : "works"} shown`;
}

async function loadPublications() {
  try {
    const response = await fetch("assets/publications.json");
    if (!response.ok) {
      throw new Error(`Publication request failed: ${response.status}`);
    }

    publications = await response.json();
    if (allowedTypes.size) {
      publications = publications.filter((work) => allowedTypes.has(work.type));
    }
    total.textContent = publications.length;

    const types = typeSelect
      ? [...new Set(publications.map((work) => work.type))].sort((a, b) =>
          (typeLabels[a] || a).localeCompare(typeLabels[b] || b)
        )
      : [];
    const years = [...new Set(publications.map((work) => work.year))].sort((a, b) =>
      b.localeCompare(a)
    );

    if (typeSelect) {
      addOptions(typeSelect, types, (value) => typeLabels[value] || value);
    }
    addOptions(yearSelect, years, (value) => value);
    render();
  } catch (error) {
    count.textContent = "";
    errorMessage.hidden = false;
    console.error(error);
  }
}

[searchInput, typeSelect, yearSelect].filter(Boolean).forEach((control) => {
  control.addEventListener("input", render);
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  if (typeSelect) {
    typeSelect.value = "";
  }
  yearSelect.value = "";
  render();
  searchInput.focus();
});

loadPublications();
