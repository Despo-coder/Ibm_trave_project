const  search = async()=> {
   
    const searchInput = document.getElementById('search_input').value.toLowerCase();
    
    // Create Empty Array to store results
    let results = [];
        try {
            const response = await fetch('./travel_recommendation.json');
            const data = await response.json();
            
            // Filter the data based on the search input for the keys
            const matches = Object.keys(data).filter(key => {
              const destinationName=key
               
                return destinationName.slice(0, 5) === searchInput.slice(0, 5).toLowerCase();
                // Reassign the filtered data back to data and ultimately in the matche variable
            }).map(key=>data[key]);
            // Assign matches to the new array with filtered data
               results = matches;
        //    Pass the data to the display function
              displayResults(results);
//   GraceFully Handle Errors
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
      

    


function displayResults(results) {
//   Grab the SearchResults Display Area
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
// Check that there is data being passed if not display no results
    if (results.length === 0) {
        searchResults.textContent = 'No results found';
        return;
    }

// Loop through the results and display the data
    results.forEach(result => {
        const div = document.createElement('div');
    //First Check if the Criteria is countries and dsiplay the data accordingly
        if(result[0].cities) {
           // Display a random set of cities based on index
            const cityIndex = result.map((city, index) => (index))
            const randomIndex = Math.floor(Math.random() * cityIndex.length);
            const places = result[randomIndex].cities;
       
            places.forEach(place => {
                const h2 = document.createElement('h2');
                const p = document.createElement('p');
                const img = document.createElement('img');
                p.textContent = place.description;
                h2.textContent = place.name;
               
                img.src = place.imageUrl
                img.style.width = '400px'; // Adjust the width of the image (example)
                img.style.height = '400px';
                div.appendChild(h2);
                div.appendChild(p);
                div.appendChild(img);
              });
            searchResults.appendChild(div);
            // If no countries display accordingly
        } else {
            result.forEach(place => {
                const h2 = document.createElement('h2');
                const p = document.createElement('p');
                const img = document.createElement('img');
                p.textContent = place.description;
                h2.textContent = place.name;
               
                img.src = place.imageUrl
                img.style.width = '400px'; // Adjust the width of the image (example)
                img.style.height = '400px';
                div.appendChild(h2);
                div.appendChild(p);
                div.appendChild(img);
              });
          searchResults.appendChild(div);
        }
    });
}
