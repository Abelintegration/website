// Search for available pages


// Check string similarity
function stringSimilarity(str1, str2) {
	let shorter = str1;
	let longer = str2;

	if(shorter.length > longer.length) {
		shorter = str2;
		longer = str1;
	}

	// No input
	if(longer.length === 0) return -1;

	// Return comparison
	return (longer.length - difference(longer, shorter)) / longer.length;
}


// Get character difference
function difference(str1, str2) {
	str1 = str1.toLowerCase();
	str2 = str2.toLowerCase();

	let costs = [];

	for(let i = 0; i <= str1.length; i++) {
		let lastValue = i;

		for(let j = 0; j <= str2.length; j++) {
			if(i === 0) {
				costs[j] = j;
			}
			else if(j > 0) {
				let newValue = costs[j - 1];

				if(str1[i - 1] !== str2[j - 1]) {
					newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
				}

				costs[j - 1] = lastValue;
				lastValue = newValue;
			}
		}

		if(i > 0) costs[str2.length] = lastValue;
	}

	return costs[str2.length];
}


// Setup search functionality
function setupSearch(pages) {
	let input = document.getElementById('search-input');
	let results = document.getElementById('search-results');

	// Variables for search comparison & display
	let distances = new Array(pages.length);
	let top = new Array(pages.length);

	// Search when clicked
	input.addEventListener('click', () => {
		if(input.value === '') return;

		input.dispatchEvent(new Event('keyup'));
	});

	// Search for pages
	input.addEventListener('keyup', () => {
		while(results.firstChild) results.removeChild(results.firstChild);
		if(input.value === '') return;

		// Get input "distance" compared to each page
		for(let p in pages) {
			distances[p] = stringSimilarity(input.value, pages[p].name);
		}

		// Sort the results (not many pages so bubble sort is fine)
		top = pages.slice(0);

		for(let i in distances) {
			for(let j in distances) {
				if(i === j) continue;

				if(distances[j] < distances[i]) {
					let temp = distances[i];

					distances[i] = distances[j];
					distances[j] = temp;

					// Get the top pages
					temp = top[i];
					top[i] = top[j];
					top[j] = temp;
				}
			}
		}

		// Display the top 5 results
		for(let p = 0; p < 5; p++) {
			if(distances[p] === 0) continue;

			let elem = document.createElement('a');
			elem.href = top[p].path;

			let title = document.createElement('h3');
			title.innerText = top[p].name;

			let path = document.createElement('span');
			path.innerText = top[p].path;

			elem.appendChild(title);
			elem.appendChild(path);

			results.appendChild(elem);
		}
	});
}


// Load pages & set up search
(function() {

	const pageList = [];

	// Get the page list
	let request = new XMLHttpRequest();
	request.open('GET', '/common/pages.csv');

	request.onreadystatechange = () => {
		if(request.readyState !== 4) return;

		let data = request.response.split(',');

		for(let i = 0; i < data.length - 1; i += 2) {
			pageList.push({
				name: data[i].trim(),
				path: data[i + 1].trim()
			});
		}

		setupSearch(pageList);
	}

	request.send();

})();
