document.addEventListener('DOMContentLoaded', () => {
    loadAnimals('dogs');
});

async function loadAnimals(type) {
    let url;
    switch(type) {
        case 'dogs':
            url = 'https://freetestapi.com/api/v1/dogs';
            break;
        case 'cats':
            url = 'https://freetestapi.com/api/v1/cats';
            break;
        case 'birds':
            url = 'https://freetestapi.com/api/v1/birds';
            break;
    }

    const response = await fetch(url);
    const animals = await response.json();
    displayAnimals(animals, type);
    setActiveType(type);
}

function displayAnimals(animals, type) {
    const animalCards = document.getElementById('animal-cards');
    animalCards.innerHTML = '';

    animals.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}">
            <h3>${animal.name}</h3>
            <p>${animal.origin || animal.species || animal.breed_group}</p>
        `;
        card.addEventListener('click', () => showPopup(animal, type));
        animalCards.appendChild(card);
    });
}

function showPopup(animal, type) {
    const popup = document.getElementById('popup');
    const popupDetails = document.getElementById('popup-details');
    
    let details = `
        <h2>${animal.name}</h2>
        <img src="${animal.image}" alt="${animal.name}">
    `;

    switch(type) {
        case 'dogs':
            details += `
                <p>Breed Group: ${animal.breed_group}</p>
                <p>Size: ${animal.size}</p>
                <p>Lifespan: ${animal.lifespan}</p>
                <p>Origin: ${animal.origin}</p>
                <p>Temperament: ${animal.temperament}</p>
                <p>Colors: ${animal.colors.join(', ')}</p>
                <p>${animal.description}</p>
            `;
            break;
        case 'cats':
            details += `
                <p>Origin: ${animal.origin}</p>
                <p>Temperament: ${animal.temperament}</p>
                <p>Colors: ${animal.colors.join(', ')}</p>
                <p>${animal.description}</p>
            `;
            break;
        case 'birds':
            details += `
                <p>Species: ${animal.species}</p>
                <p>Family: ${animal.family}</p>
                <p>Habitat: ${animal.habitat}</p>
                <p>Place of Found: ${animal.place_of_found}</p>
                <p>Diet: ${animal.diet}</p>
                <p>Weight: ${animal.weight_kg} kg</p>
                <p>Height: ${animal.height_cm} cm</p>
                <p>${animal.description}</p>
            `;
            break;
    }

    popupDetails.innerHTML = details;
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

async function searchAnimals() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const activeType = document.querySelector('nav ul li a.active').textContent.toLowerCase();
    let url;
    
    switch(activeType) {
        case 'dogs':
            url = `https://freetestapi.com/api/v1/dogs?search=${query}`;
            break;
        case 'cats':
            url = `https://freetestapi.com/api/v1/cats?search=${query}`;
            break;
        case 'birds':
            url = `https://freetestapi.com/api/v1/birds?search=${query}`;
            break;
    }

    const response = await fetch(url);
    const animals = await response.json();
    displayAnimals(animals, activeType);
}

function setActiveType(type) {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === type) {
            link.classList.add('active');
        }
    });
}