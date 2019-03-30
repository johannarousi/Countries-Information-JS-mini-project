// Global variables
let wrapper = document.querySelector(".wrapper");
let subtitle = document.querySelector(".subtitle");
let subtitleForStats = document.querySelector(".subtitle-for-stats");
let searchInput = document.querySelector(".search");
let buttons = document.querySelector(".buttons");
let isAZ = false;
let isCapital = false;
let isPopulation = false;
console.log(buttons);

let sortNameBtn = document.querySelector(".name");
let sortCapitalBtn = document.querySelector(".capital");
let sortPopulationBtn = document.querySelector(".population");

let populationDiv = document.querySelector(".top-ten-population");
let languagesDiv = document.querySelector(".top-ten-languages");

// We should have copies from the countriesObject so that we don't change the original one
const copyCountries = [...countries];
const copyCountriesTwo = [...countries];
const copyCountriesThree = [...countries];

// Filter function
const filterCountries = (arr, search) => {
  const filteredCountries = arr.filter(country => {
    let { name, capital, languages } = country;
    let isName = name.toLowerCase().includes(search);
    let isCapital = capital.toLowerCase().includes(search);
    let isLanguages = languages
      .join()
      .toLowerCase()
      .includes(search);
    return isName || isCapital || isLanguages;
  });
  let result = search == "" ? arr : filteredCountries;
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

// array in reversed alphabetic order with country name
// const nameArr = copyCountries.sort(function(a, b) {
//   let x = a.name.toLowerCase();
//   let y = b.name.toLowerCase();
//   if (x > y) {
//     return -1;
//   }
//   if (x < y) {
//     return 1;
//   }
//   return 0;
// });

// but because the original is in alphabetic order we can just reverse it
const reversedArr = countries.slice().reverse();

// array in alphabetic order with capitals
const capitalArr = copyCountriesTwo.sort(function(a, b) {
  let x = a.capital.toLowerCase();
  let y = b.capital.toLowerCase();
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
});

// array in descending order with population
const populationArr = copyCountriesThree.sort(function(a, b) {
  let x = a.population;
  let y = b.population;
  return y - x;
});

// Event listeners for sort-buttons
buttons.addEventListener("click", e => {
  // console.log(e.target.className);
  let searchTerm = e.target.value.toLowerCase();
  if (e.target.className === "btn name") {
    function buttonFunction() {
      let i = document.querySelector("i");
      if (i.className === "fas fa-sort-alpha-down") {
        showCountries(filterCountries(reversedArr, searchTerm));
        i.className = "fas fa-sort-alpha-up";
        sortNameBtn.style.backgroundColor = "#E6C9A7";
        console.log("true");
      } else if (i.className === "fas fa-sort-alpha-up") {
        i.className = "fas fa-sort-alpha-down";
        sortNameBtn.style.backgroundColor = "#fff";
        showCountries(filterCountries(countries, searchTerm));
      }
    }
    buttonFunction();
  } else if (e.target.className === "btn capital") {
    showCountries(filterCountries(capitalArr, searchTerm));
  } else {
    showCountries(filterCountries(populationArr, searchTerm));
  }
});

// Event listener to get search input
searchInput.addEventListener("input", e => {
  let searchTerm = e.target.value.toLowerCase();

  showCountries(filterCountries(countries, searchTerm));
});

// default function that shows all the countries in alphabetitc order by  country names when the page is loaded
showCountries(filterCountries(countries, searchInput.value));

// STATISTICS TEN MOST POPULATED COUNTRIES AND TEN MOST LANGUAGES
const tenPopulated = populationArr.slice(0, 10);
//  tenLanguages
console.log(copyCountries[0].languages);
let emptyArr = [];
copyCountries.forEach(country => {
  country.languages.forEach(language => {
    emptyArr.push(language);
  });
});

// counting the population of the world
let count = 0;
countries.forEach(country => {
  // console.log(country.population);
  count = count + country.population;
});
const worldPopulation = count;

// the most populated country
// const mostPopulatedCountry = countries[0].population; // chinas population

const createPopulationContent = content => {
  const { name, population } = content;
  let width = (population / worldPopulation) * 100;
  return `<p>${name}</p>
  <div class="container">
<div class="population-bar" style="width: ${width}%">${population}</div>
  </div>`;
};

// const createMostLanguages = content => {
//   const {name, population} = content;
// let width =
//   return `<p>${name}</p>
//   <div class="container">
// <div class="population-bar" style="width: "></div>
// </div>`;
// };
// function that shows the countries statistics in the bottom of the page
const showCountriesPopulation = arr => {
  let contents = "";
  // wrapper.innerHTML = "";
  arr.forEach((country, i) => {
    contents += createPopulationContent(country);
  });
  populationDiv.innerHTML = contents;
};

showCountriesPopulation(tenPopulated);
subtitleForStats.textContent = "Ten most populated countries";
