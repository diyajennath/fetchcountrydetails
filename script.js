function fetchCountryDetails() {
    const countryName = document.getElementById('countryInput').value.trim();

    if (!countryName) {
        alert('Please enter a country name.');
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            displayCountryDetails(data[0]); 
        })
        .catch(error => {
            document.getElementById('countryDetails').innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

function displayCountryDetails(country) {    
    const flagElement = document.getElementById('flag');
    flagElement.src = country.flags.svg;
    flagElement.style.display = 'block';
    
    const countryNameElement = document.getElementById('countryName');
    countryNameElement.innerHTML = `<strong>Country:</strong> ${country.name.common}`;
    
    const populationElement = document.getElementById('population');
    populationElement.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;
   
    const currencyElement = document.getElementById('currency');
    const currencies = country.currencies
        ? Object.values(country.currencies)
            .map(currency => `${currency.name} (${currency.symbol})`)
            .join(', ')
        : 'N/A';
    currencyElement.innerHTML = `<strong>Currency:</strong> ${currencies}`;
}
