const  search = async()=> {
   
    const searchInput = document.getElementById('search_input').value.toLowerCase();
    
    try {
        const response = await fetch('./travel_recommendation.json');
        const data = await response.json();
        console.log(data)
        console.log(searchInput)
        const beaches = [];
        Object.values(data).forEach(entries => {
            if (Array.isArray(entries)) {
                entries.forEach(entry => {
                    if (typeof entry === 'object') {    
                        Object.values(entry).forEach(value => {
                            if (typeof value === 'string' && value.toLowerCase().includes(searchInput.toLowerCase())) {
                                 beaches.push(entry);
                                     }
                                     });

                    }
                } ) 
            }
        })

        // const filteredData = data.filter(place => {
        //     return place.name.toLowerCase().includes(searchInput) || place.type.toLowerCase() === searchInput;
        // });
        displayResults(beaches);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.textContent = 'No results found';
        return;
    }

    results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = `${result.name} - ${result.type}`;
        searchResults.appendChild(div);
    });
}
