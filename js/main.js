// Global variables
let wrapper = document.querySelector(".wrapper");
let subtitle = document.querySelector(".subtitle");
let subtitleForStats = document.querySelector(".subtitle-for-stats");
let searchInput = document.querySelector(".search");
let topTenDiv = document.querySelector(".top-ten");
let sortNameBtn = document.querySelector(".name");
let sortCapitalBtn = document.querySelector(".capital");
let sortPopulationBtn = document.querySelector(".population");
let buttons = document.querySelector(".buttons");
// console.log(buttons);
let buttonsTopTen = document.querySelector(".buttons-top-ten");
// console.log(buttonsTopTen);
const copiedCountries = countries;
let isClicked = false;
let i = document.querySelector("i");

// Filter function for the search input
const filterCountries = (arr, input) => {
  const filteredCountries = arr.filter(country => {
    let { name, capital, languages } = country;
    let isName = name.toLowerCase().includes(input);
    let isCapital = capital.toLowerCase().includes(input);
    let isLanguages = languages
      .join()
      .toLowerCase()
      .includes(input);
    return isName || isCapital || isLanguages;
  });
  let result = input == "" ? arr : filteredCountries;
  subtitle.textContent = `Currently, we have ${
    filteredCountries.length
  } countries`;
  return result;
};

// function for the counrty boxes content: name, capital, language, population and flag
const createContent = content => {
  const { name, capital, languages, population, flag } = content;
  return `<div>
    <h3>${name}</h3>
    <p>${capital}</p>
    <p>${languages.join(", ")}</p>
    <p>${population}</p>
    <img src="${flag}"/>
  </div>`;
};

// function that shows the countries with their info in the page
const showCountries = arr => {
  let contents = "";
  wrapper.innerHTML = "";
  arr.forEach((country, i) => {
    contents += createContent(country);
  });
  wrapper.innerHTML = contents;
};

// default subtitle text
subtitle.textContent = `Currently, we have ${countries.length} countries`;

// sorting functions for sort buttons
const sortByName = () => {
  if (isClicked === false) {
    let sorted = copiedCountries.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
    });
    showCountries(filterCountries(sorted, searchInput.value.toLowerCase()));
    isClicked = true;
    i.className = "fas fa-sort-alpha-up";
    sortNameBtn.style.backgroundColor = "#E6C9A7";
  } else {
    sorted = copiedCountries.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
    });
    showCountries(filterCountries(sorted, searchInput.value.toLowerCase()));
    isClicked = false;
    i.className = "fas fa-sort-alpha-down";
    sortNameBtn.style.backgroundColor = "#fff";
  }
};

const sortByCapital = () => {
  if (isClicked === false) {
    let sorted = copiedCountries.sort((a, b) => {
      if (a.capital < b.capital) {
        return -1;
      }
    });
    showCountries(filterCountries(sorted, searchInput.value.toLowerCase()));
    isClicked = true;
  } else {
    sorted = copiedCountries.sort((a, b) => {
      if (a.capital > b.capital) {
        return -1;
      }
    });
    showCountries(filterCountries(sorted, searchInput.value.toLowerCase()));
    isClicked = false;
  }
};

const sortByPopulation = () => {
  if (isClicked === false) {
    let sorted = copiedCountries.sort((a, b) => {
      if (a.population > b.population) {
        return -1;
      }
    });
    showCountries(filterCountries(sorted, searchInput.value.toLowerCase()));
    isClicked = true;
  } else {
    sorted = copiedCountries.sort((a, b) => {
      if (a.population < b.population) {
        return -1;
      }
    });
    showCountries(filterCountries(sorted, searchInput.value.toLowerCase()));
    isClicked = false;
  }
};

// Event listeners for buttons
buttons.addEventListener("click", e => {
  if (e.target.classList.contains("name")) {
    sortByName();
    e.target.classList.toggle("selected");
    // console.log("name");
  } else if (e.target.classList.contains("capital")) {
    sortByCapital();
    e.target.classList.toggle("selected");
    // console.log("capital");
  } else if (e.target.classList.contains("population")) {
    sortByPopulation();
    e.target.classList.toggle("selected");
    // console.log("population");
  }
});

// Event listener to get search input
searchInput.addEventListener("keyup", e => {
  let searchTerm = e.target.value.toLowerCase();
  showCountries(filterCountries(countries, searchTerm));
});

// default function that shows all the countries in alphabetitc order by  country names when the page is loaded
showCountries(filterCountries(countries, searchInput.value));

// STATISTICS: TEN MOST POPULATED COUNTRIES AND TEN MOST LANGUAGES

// POPULATION GRAPH BAR
// population array in descending order
const populationArr = countries
  .slice()
  .sort((a, b) => b.population - a.population);
const tenPopulated = populationArr.slice(0, 10);

// counting the population of the world
const worldPopulation = () => {
  let count = 0;
  countries.forEach(country => {
    count = count + country.population;
  });
  return count;
};

// function for creating content for the graph bar for population
const createPopulationContent = content => {
  const { name, population } = content;
  let width = (population / worldPopulation()) * 100;
  return `<p>${name}</p>
  <div class="container">
<div class="graph-bar" style="width: ${width}%">${population}</div>
  </div>`;
};

// function that shows the countries statistics in the bottom of the page
const showCountriesPopulation = arr => {
  let contents = "";
  arr.forEach((country, i) => {
    contents += createPopulationContent(country);
  });
  topTenDiv.innerHTML = contents;
};

// default graph bar in the page
showCountriesPopulation(tenPopulated);
subtitleForStats.textContent = "Ten most populated countries";

// LANGUAGES GRAPH BAR
// creating an array that has all the languages from all countries language-arrays
let allTheLanguages = [];
countries.forEach(country => {
  country.languages.forEach(language => {
    allTheLanguages.push(language);
  });
});

const uniqLanguages = new Set(allTheLanguages);

// creating an array of [language, number]- arrays
const languageArr = [];
for (let lang of uniqLanguages) {
  let arr = allTheLanguages.filter(languages => languages === lang);
  console.log(lang + " " + arr.length);
  languageArr.push([lang, arr.length]);
}
// console.log(languageArr);

// sorting the language arr so  that the languages most spoken are first
languageArr.sort((a, b) => {
  return b[1] - a[1];
});
// console.log(languageArr);

// for the graph bar we need only ten most spoken languages
const tenLanguages = languageArr.slice(0, 10);
console.log(tenLanguages);

// function for creating content for language graph bars
// console.log(tenLanguages[0][1]); // 91 english
const createMostLanguages = content => {
  const [lang, number] = content;
  let width = (number / tenLanguages[0][1]) * 100;
  return `<p>${lang}</p>
     <div class="container">
   <div class="graph-bar" style="width: ${width}%">${number}</div>
   </div>`;
};

// function that shows the countries statistics in the bottom of the page when called
const showCountriesLanguage = arr => {
  let contents = "";
  // wrapper.innerHTML = "";
  arr.forEach((lang, i) => {
    contents += createMostLanguages(lang);
  });
  topTenDiv.innerHTML = contents;
};

// Event listener for top-ten buttons
buttonsTopTen.addEventListener("click", e => {
  if (e.target.classList.contains("most-populated")) {
    showCountriesPopulation(tenPopulated);
    subtitleForStats.textContent = "Ten most populated countries";
    console.log("population");
  } else if (e.target.classList.contains("most-languages")) {
    showCountriesLanguage(tenLanguages);
    subtitleForStats.textContent = "Ten most spoken languages";
    console.log("languages");
  }
});
