/* This document will contain all the javascript for my single page application */
/*I will continue this after I wake up let me sleep */

//TODO: Add a function that modifies the history so that the back button can be pressed and
// users can navigate easier.
// TODO: Add drug, drug interaction Checker.
// TODO: google how to search an array in  javascript
getTopics()
drugInteractionSearch()

function getTopics() {
	if (localStorage.getItem('topicz')) {
		let topicz = JSON.parse(localStorage.getItem('topicz'))
		let total_topics = topicz.length;
		// Creat an unordered list to add the topics to 
		let unorderedTopicList = document.createElement('ul');
		let find_topic_list_div = document.querySelector('#topicList');

		for (let i = 0; i < total_topics; i++) {
			let listItem = document.createElement('li');
			//console.log(topicz[i])
			listItem.innerText = topicz[i][0]["Level 1 Heading"];

			listItem.setAttribute('id', `level1heading${i}`)
			unorderedTopicList.append(listItem)
			console.log(topicz[i][0]["Level 1 Heading"]);
			new_topic = topicz[i];
			find_topic_list_div.append(unorderedTopicList)
			displayTopics(new_topic, i);
		};
		displayTopicFully(topicz)
	} else {
		fetch('/booklet')
			.then(response => response.json())
			.then(topics => {
				let topicz = topics;
				localStorage.setItem("topicz", JSON.stringify(topicz))
				let total_topics = topicz.length;
				// Creat an unordered list to add the topics to 
				let unorderedTopicList = document.createElement('ul');
				let find_topic_list_div = document.querySelector('#topicList');
				


				for (let i = 0; i < total_topics; i++) {
					let listItem = document.createElement('li');
					

					//console.log(topicz[i])
					listItem.innerText = topicz[i][0]["Level 1 Heading"];

					listItem.setAttribute('id', `level1heading${i}`)
					unorderedTopicList.append(listItem)
					console.log(topicz[i][0]["Level 1 Heading"]);
					new_topic = topicz[i];
					find_topic_list_div.append(unorderedTopicList)
					displayTopics(new_topic, i);
				};
				displayTopicFully(topicz)
			})
	}

}


function displayTopics(new_topic, Heading1TrackingNumber) {
	let current_level_2 = '';
	let listItem1 = document.querySelector(`#level1heading${Heading1TrackingNumber}`)
	let level_2_headings_list = document.createElement('ul')
	
	listItem1.append(level_2_headings_list)
	let counter = 0
	let index_tracker = 0

	new_topic.forEach(head => {

		if (head["Level 2 Heading"] !== current_level_2) {

			/* make sure that i set the current level 2 heading to what this level 2 heading is since it is new*/
			current_level_2 = head["Level 2 Heading"];

			counter++
			let level_2_list_heading = document.createElement('li')
			
			level_2_list_heading.innerHTML = head["Level 2 Heading"]
			// add the level_2_list_heading to the level_2_headings_list
			level_2_headings_list.append(level_2_list_heading);

			let level_3_list_headings = document.createElement('ul');
			level_3_list_headings.classList.add("list-disc")
			/*add this level_3_list_headings list to the level_2_list_heading 
			but first set the a unique Id so that I can search for it later
			*/
			level_3_list_headings.setAttribute('id', `level3list${Heading1TrackingNumber}${counter}`);

			level_2_list_heading.append(level_3_list_headings);
			/*Create a list item to have the level 3 heading so that I can append it  to the level_3_list_headings*/
			let level_3_list_heading = document.createElement('li');
			
			level_3_list_heading.innerHTML = head["Level 3 Heading"];

			level_3_list_heading.dataset.groupy = `${Heading1TrackingNumber}`
			level_3_list_heading.dataset.topic = `${index_tracker}`
			level_3_list_heading.setAttribute('class', `level3topic`);

			/* Adding the just created level 3 list heading to the entire list of level 3 list Headings */

			level_3_list_headings.append(level_3_list_heading);


		} else if (head["Level 2 Heading"] === current_level_2) {
			/* what I am doing now is since I know that whatever it is I am looking for now
			 there is already a level 3 list that has been created.
			 the only thing I have to do is find that level 3 list and append a new level 3 list heading.*/
			my_now_level_3_list = document.querySelector(`#level3list${Heading1TrackingNumber}${counter}`);
			let new_list_item_to_add_the_new_level_3_heading = document.createElement('li');
			
			new_list_item_to_add_the_new_level_3_heading.addEventListener('click', displayTopicFully(head))
			new_list_item_to_add_the_new_level_3_heading.innerHTML = head["Level 3 Heading"];
			new_list_item_to_add_the_new_level_3_heading.dataset.groupy = `${Heading1TrackingNumber}`;
			new_list_item_to_add_the_new_level_3_heading.dataset.topic = `${index_tracker}`;

			new_list_item_to_add_the_new_level_3_heading.setAttribute('class', `level3topic`);
			my_now_level_3_list.append(new_list_item_to_add_the_new_level_3_heading);
		};
		index_tracker++
	});
}

function displayTopicFully(topicz) {
	all_level_3_topics = document.querySelectorAll('.level3topic')

	all_level_3_topics.forEach(topic => topic.addEventListener('click', () => {
		console.log('The topic has been clicked')
		let let_hide_the_topics = document.querySelector("#topicList")
		let_hide_the_topics.style.display = 'none'
		let first_level = parseInt(topic.dataset.groupy);
		let second_level = parseInt(topic.dataset.topic);
		let current_topic = topicz[first_level][second_level];

		back_button = document.createElement('button');
		back_button.innerText = "Back"
		back_button.addEventListener('click', () => {
			let_hide_the_topics.style.display = 'block';

			//hiding the topic presentation
			document.querySelector('#topicPresentation').style.display = 'none'

		})

		let topic_presentation = document.querySelector('#topicPresentation');
		topic_presentation.style.display = 'block'
		let heading_1 = `<h6>${current_topic["Level 1 Heading"]}</h3>`
		let heading_2 = `<h5>${current_topic["Level 2 Heading"]}</h4>`
		let heading_3 = `<h3>${current_topic["Level 3 Heading"]}</h3>`
		let background = `<h4>Background and Clinical Features</h4><div>${current_topic["Background and Clinical Features"]}</div>`
		let investigations = `<h4>Investigations</h4><div>${current_topic["Tests"]}</div>`
		let Treatment_Notes = `<h4>Treatment Notes</h4><div>${current_topic["Treatment Notes"]}</div>`
		let notes = `<h4>Notes</h4><div>${current_topic["Notes"]}</div>`
		let Pharmacy = `<h4>Pharmacy</h4><div>${current_topic["Pharmacy"]}</div>`
		let Complications = `<h4>Complications</h4><div>${current_topic["Complications"]}</div>`
		let Prevention = `<h4>Prevention</h4><div>${current_topic["Prevention"]}</div>`
		topic_presentation.innerHTML = heading_3 + heading_2 + heading_1 +
			background + investigations + Treatment_Notes + Pharmacy + Complications + Prevention + notes
		topic_presentation.append(back_button)
	}))

}

/* This functions here are to  help me search for drug drug interactions that I can find from the interaction API*/

function drugInteractionSearch() {
	// find the interaction checker button
	let interactionCheckerButton = document.querySelector('#interactionSearchButton');
	let interactionNav = document.querySelector('#Interaction-nav')
	// add an event listen that hides both the list  and presentation topics 
	interactionCheckerButton.addEventListener('click', () => {
		// find the topic list and topic presentation then hide them.
		let topicListDiv = document.querySelector('#topicList');
		topicListDiv.style.display = 'none';
		let topicPresentation = document.querySelector('#topicPresentation');
		topicPresentation.style.display = 'none';
		// find the div that has the interaction checker form and display it
		let drugInteractionCheckerDiv = document.querySelector('#drugInteractionChecker');
		drugInteractionCheckerDiv.style.display = 'block';
		// hiding the interactions search button
		interactionCheckerButton.style.display='none';
		interactionNav.style.display='block'
	});

	document.querySelector('#interactionCheckerForm').addEventListener('submit', function (event) {
		event.preventDefault();
		searchDrug()
	})
}

// this function will actually search and decide where to send the search.

function searchDrug() {
	console.log('The search button has been clicked')
	// search for the single drug interaction button and see if it's been checked.
	let singleDrug = document.querySelector('#interaction').checked
	let compareDrugs = document.querySelector('#list').checked
	let interactionDisplay = document.querySelector("#interactionDisplay")
	interactionDisplay.innerHTML = ""

	if (singleDrug) {
		// get the value in the search box
		let searchBoxValue = document.querySelector('#searchBox').value;
		//making sure that the search box isn't just an empty string
		if (searchBoxValue.trim().length === 0) {
			let message = "Please enter at least one drug in the search box"
		} else {
			// fetch for and search for the drug in question.
			fetch(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${searchBoxValue.trim()}&search=1`)
				.then(response => response.json())
				.then(drugRxcui => {
					// I will deal with the drug  rxcui in here.
					console.log("This is Just the single drug part:")
					console.log(JSON.stringify(drugRxcui))
					// now we are checking if a rxnorm ID exists for said drug if it exists then we proceed. 
					// if not then we say ok enter a valid drug
					let rxnormIdArrayBoolean = drugRxcui["idGroup"].hasOwnProperty("rxnormId")
					if (rxnormIdArrayBoolean) {
						let rxnormId = parseInt(drugRxcui["idGroup"]["rxnormId"][0])
						console.log(rxnormId)
						fetch(`https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${rxnormId}`)
						.then(response => response.json())
						.then(interactionDataObject => {
							console.log(interactionDataObject)
							// Getting the array of the data for each interaction grouped by the source:
							let all_inter = 0
							let interactionsGroupedArray = interactionDataObject["interactionTypeGroup"]
							interactionsGroupedArray.forEach(drugInteractionDataSource => {
								let sourceName = drugInteractionDataSource["sourceName"]
								let interactionTypeArray = drugInteractionDataSource["interactionType"]
								
								interactionTypeArray.forEach(interactionPairDataset => {
									let interactionPairData1 = interactionPairDataset["interactionPair"]
									let interactionPairData = interactionPairData1
									interactionPairData.forEach(interObject => {
										all_inter++
										let description = interObject["description"]
										let firstDrug = interObject["interactionConcept"][0]["minConceptItem"]["name"]
										let secondDrug = interObject["interactionConcept"][1]["minConceptItem"]["name"]
										let severity = interObject["severity"]
										console.log(`\n${firstDrug} vs ${secondDrug}\n\tSeverity: ${severity}\n\tDescription: ${description}\n\tSource: ${sourceName}`)
										let interactionCard=	`
										<div class="card text-center my-4 col-md-8 mx-auto">
										<div class="card-body">
										  <h5 class="card-title">${firstDrug} vs ${secondDrug}</h5>
										  <p class="card-text">${description}</p
										  <span>Severity:${severity}<span><br>
										  <span>Source:${sourceName}<span>
										</div>
									  </div>
									   `
										  interactionDisplay.insertAdjacentHTML('beforeend', interactionCard)
									})
									
								})
							})
							console.log(all_inter)
						})
					} else {
						console.log("Please Enter a Valid Drug name. But it could be your drug doesn't exist in our database")
					}
				})
		}
	} else if (compareDrugs) {
		console.log("We are comparing drugs");
		let searchBoxValue = document.querySelector('#searchBox').value;
		console.log(searchBoxValue)
		let comparisonArray = searchBoxValue.split(',')
		console.log(comparisonArray)
		let the_codes_array = []
		let invalidDrugEncountered = false // initialize flag variable
		let promises = comparisonArray.map(drug => fetch(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drug}&search=1`).then(response => response.json()))
		Promise.all(promises)
			.then(dataArray => {
				dataArray.forEach(drugRxcui => {
					let rxnormIdArrayBoolean = drugRxcui["idGroup"].hasOwnProperty("rxnormId")
					if (rxnormIdArrayBoolean) {
						let rxnormId = drugRxcui["idGroup"]["rxnormId"][0]
						the_codes_array.push(rxnormId)
					} else {
				invalidDrugEncountered = true // set flag variable to true
				console.log("Please, enter a valid drug")
					}
				})
				console.log(the_codes_array)
		if (invalidDrugEncountered && interactionDisplay.innerText.indexOf("Please, enter a valid drug")) { // check flag variable
			interactionDisplay.append("Please, enter a valid drug") // append message only once
		}
				search_query = the_codes_array.join("+")
				console.log(search_query)
				fetch(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${search_query}`)
					.then(response => response.json())
					.then(drugInteractionData => {
						console.log("We are now logging the drug interaction object or dictionary")

						// Let's first check if this returned a group that has the interaction data.
						
						if (drugInteractionData.hasOwnProperty("fullInteractionTypeGroup")) {
							let full_interaction_list = drugInteractionData["fullInteractionTypeGroup"]
							console.log(drugInteractionData)
							full_interaction_list.forEach(interaction => {
								let interaction_list = interaction["fullInteractionType"]
								let information_source = interaction['sourceName']
								interaction_list.forEach(subinteraction => {
									let drug1 = subinteraction["minConcept"][0]["name"]
									let drug2 = subinteraction["minConcept"][1]["name"]
									let severity = subinteraction['interactionPair'][0]['severity']
									let description = subinteraction['interactionPair'][0]['description']
									console.log(`${drug1} vs ${drug2}\n\tSeverity:${severity}\n\t${description}\n\tSource:${information_source}\n\n`)
								let interactionCard=	`<div class="card text-center my-4">
									<div class="card-body">
									  <h5 class="card-title">${drug1} vs ${drug2}</h5>
									  <p class="card-text">${description}</p
									  <span>Severity:${severity}<span><br>
									  <span>Source:${information_source}<span>
									</div>
								  </div>`
								  	interactionDisplay.insertAdjacentHTML('beforeend', interactionCard)
																
								})
							})
						} else {
							interactionDisplay.innerHTML=""
							console.log("The Database doesn't have the information you are looking for")
							let message = "The Database doesn't have the information you are looking for"
							let interactionCard=`
							<div class="card text-center">
									<div class="card-body">
									  <h5 class="card-title"></h5>
									  <p class="card-text">${message}</p>
									  <span><span><br>
									  <span><span>
									</div>
								  </div>`
							interactionDisplay.insertAdjacentHTML('beforeend', interactionCard)
						}


					})
			})

	} else {
		let message = "Please Select what you would like to Search for"
	}
}

// This funciotn will be here just to show what information to display to the user. 
function showDrugInterations(where_to_display, interaction_to_display) {

}