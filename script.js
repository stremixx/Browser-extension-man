document.addEventListener('DOMContentLoaded', () => {

    const darkModeButton = document.getElementById('darkMode');
    const extensionItemsDiv = document.querySelector('.extension-items');
    const filterButtons = document.querySelectorAll('.button-ext-top');
    const body = document.body;

    let extensionsData = [];
    let currentFilter = 'all';

    // Function to render extensions based on the current filter
    const renderExtensions = () => {
        let filteredData = extensionsData;

        if (currentFilter === 'active') {
            filteredData = extensionsData.filter(item => item.isActive);
        } else if (currentFilter === 'inactive') {
            filteredData = extensionsData.filter(item => !item.isActive);
        }

        // Create HTML for each extension and join them together
        const htmlContent = filteredData.map((item, index) => {
            // Use a unique ID based on the item name for stability
            const uniqueId = item.name.replace(/\s+/g, '-');
            return `
                <div class="extension-card" data-id="${uniqueId}">
                    <img src="${item.logo}" alt="${item.name} logo">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    
                    <div class="toggles">
                        <div class="button-ext remove-button">Remove</div>
                        <input type="checkbox" id="toggleSwitch-${uniqueId}" class="toggle-switch-checkbox" ${item.isActive ? 'checked' : ''}>
                        <label for="toggleSwitch-${uniqueId}" class="toggle-switch-label"></label>
                    </div>
                
                </div>
            `;
        }).join('');

        //Insert the formatted content into the div
        extensionItemsDiv.innerHTML = htmlContent;
    };

    fetch('./data.json')
        //parse the response as JSON 
        .then(response => response.json())
        //display parsed data on display
        .then(data => {
            extensionsData = data;
            renderExtensions(); // Initial render with 'all'
        })
        .catch(error => {
            console.error('Error fetching or parsing JSON:', error);
            extensionItemsDiv.innerHTML = '<p>Oh ohhh, data not loaded. Check the console for errors.</p>';
        });

    // Event delegation for remove and toggle actions
    extensionItemsDiv.addEventListener('click', (event) => {
        const target = event.target;
        const card = target.closest('.extension-card');
        if (!card) return;

        const cardId = card.dataset.id;
        const extensionIndex = extensionsData.findIndex(ext => ext.name.replace(/\s+/g, '-') === cardId);

        // Handle remove button click
        if (target.classList.contains('remove-button')) {
            if (extensionIndex > -1) {
                extensionsData.splice(extensionIndex, 1); // Remove from data array
                renderExtensions(); // Re-render the list
            }
        }

        // Handle toggle switch change (we listen for click on the container)
        if (target.classList.contains('toggle-switch-label')) {
            if (extensionIndex > -1) {
                extensionsData[extensionIndex].isActive = !extensionsData[extensionIndex].isActive;
                // If we are in a filtered view, the card might need to be removed from the view
                if (currentFilter === 'active' || currentFilter === 'inactive') {
                    setTimeout(() => renderExtensions(), 400); // Wait for animation
                }
            }
        }
    });

    // Filter button logic
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            button.classList.add('active-filter');
            currentFilter = button.id.replace('filter-', '');
            renderExtensions();
        });
    });

    //dark mode code
    darkModeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const darkModeIcon = darkModeButton.querySelector('.darkMode-icon');

        if (body.classList.contains('dark-mode')) {
            //dark mode is on, show the sun
            darkModeIcon.src = './assets/images/icon-sun.svg';
            darkModeIcon.alt = 'switch to lightMode';
        } else {
            //dark mode is turned off, show the luna
            darkModeIcon.src = './assets/images/icon-moon.svg';
            darkModeIcon.alt = 'switch to darkMode';
        }
    });



});
