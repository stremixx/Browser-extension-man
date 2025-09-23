document.addEventListener('DOMContentLoaded', () => {

    const darkModeButton = document.getElementById('darkMode');
    const extensionButton = document.querySelectorAll('.button-ext');
    const body = document.body;

    fetch('./data.json')
    //parse the respoonse as JSON 
    .then(response => response.json())
    //display parsed data on display
    .then(data => {
        //get the html element where you want to display the data
        const extensionItemsDiv = document.querySelector('.extension-items');

        // Create HTML for each extension and join them together
        const htmlContent = data.map(item => {
            return `
                <div class="extension-card">
                    <img src="${item.logo}" alt="${item.name} logo">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="button-ext">${item.isActive ? 'Disable' : 'Enable'}</button>
                </div>
            `;
        }).join('');

        //Insert the formatted content into the div
        extensionItemsDiv.innerHTML = htmlContent;
    })
    //error handling
    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
        document.querySelector('.extension-items').innerHTML = '<p>Oh ohhh, data not loaded. Check the console for errors.</p>';
    });
});
