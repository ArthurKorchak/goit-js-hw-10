import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const inputForm = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

inputForm.addEventListener('input', debounce(event => {
    const data = event.target.value.trim();
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    if (data) {
        fetchCountries(data)
            .then(resp => {if (resp){render(resp)}});
    };
}, DEBOUNCE_DELAY));

function render(resp) {
    resp.map(({ capital, flags, languages, name, population }) => {
        if (resp.length === 1) {
            countryInfo.innerHTML = `
                <div class="articleTitle">
                    <img class="examples__img" src="${flags.svg}" alt="Прапор країни" height="40"/>
                    <h1>${name.common}</h1>
                </div>
                <p><b>Capital:</b> ${capital[0]}</p>
                <p><b>Population:</b> ${population}</p>
                <p><b>Languages:</b> ${Object.values(languages).reduce((acc, el, i) => i === 0 ? acc = `${el}` : acc += `, ${el}`, [])}</p>
            `;
        } else {
            countryList.insertAdjacentHTML('beforeend', `
                <div class="articleTitle">
                    <img class="examples__img" src="${flags.svg}" alt="Прапор країни" width="40px"/>
                    <p>${name.common}</p>
                </div>
            `);
        };
    });
};