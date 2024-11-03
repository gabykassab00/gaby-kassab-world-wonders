document.addEventListener('DOMContentLoaded', () => {
    const detailofwonder = document.getElementById('wonder-details');
    
    if (detailofwonder) {
        const urlparameter = new URLSearchParams(window.location.search);
        const theidwonder = urlparameter.get('id');

        console.log('wonder id:', theidwonder)
        fetch(`https://www.world-wonders-api.org/v0/wonders/${theidwonder}`)
            .then(response => response.json())
            .then(wonder => {
                detailofwonder.innerHTML = `
                    <h2>${wonder.name}</h2>
                    <img src="${wonder.links.images[0]}" alt="${wonder.name}">
                    <p><strong>Location:</strong> ${wonder.location}</p>
                    <p><strong>Built in:</strong> ${wonder.build_year}</p>
                    <p><strong>Summary:</strong> ${wonder.summary}</p>
                    <p><strong>Time Period:</strong> ${wonder.time_period}</p>
                    <p><strong>Categories:</strong> ${wonder.categories.join(', ')}</p>
                `;
            })
            .catch(error => console.error('Error fetching the wonder details:', error));
    } else {
        fetch('https://www.world-wonders-api.org/v0/wonders')
            .then(response => response.json())
            .then(data => {
                const listofwonder = document.getElementById('wonders-list');
                data.forEach(wonder => {
                    const itemofwonder = document.createElement('div');
                    itemofwonder.classList.add('wonder-item');

                    itemofwonder.innerHTML = `
                        <h2>${wonder.name}</h2>
                        <img src="${wonder.links.images[0]}" alt="${wonder.name}">
                        <p>${wonder.location}</p>
                        <p>${wonder.summary}</p>
                        <a href="wonder.html?id=${wonder.Id}">View Details</a>
                    `;

                    listofwonder.appendChild(itemofwonder);
                });
            })
            .catch(error => console.error('Error fetching the wonders:', error));
    }
});
