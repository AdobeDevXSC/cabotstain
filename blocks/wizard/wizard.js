
// get the URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var dictFilterParameters = {};
urlParams.forEach((value, key) => {dictFilterParameters[key] = value;});

// retrieve the configuration document
const urlBase = window.location.protocol + '//' + window.location.host;
fetch(urlBase + '/deck.json?sheet=master')
  .then(response => response.json())
  .then(response => {
  
  // filter list of questions that qualify for display
  var questionList = [];
  for (var i=0; i < response.total; i++) {

    // if type is in the url then it is not the first question
    if ('type' in dictFilterParameters) {

      // review only questions for this brand and type
      if (response.data[i].brand === dictFilterParameters['brand'] && response.data[i].type === dictFilterParameters['type'])  {
      
         // assume eligible until determined not
         var eligible = true;

        // rules are different for product eligibility versus question eligibility
        if (dictFilterParameters['type'] === "product") {

          // loop through each of the eligibility condition for the question 
          for (var key in response.data[i]) {
            
            // ignore the URL parameters of type and brand
            if ((key == 'surface') || (key == 'condition') || (key == 'issues') || (key == 'look')) {

              // check to make sure the eligibility condition column for the questiois not blank, if blank not relevant   
              if (response.data[i][key] != "") {

                // check if the value is not select and there is a value in the eligibility condition column for the question, then the product is not displayed
                if ((dictFilterParameters[key] == null) && response.data[i][key] != "") eligible = false;

                // check if the value is not in the eligibility condition column for the question, if not then the product is not displayed
                if (response.data[i][key].search(dictFilterParameters[key]) == -1) eligible = false;
              } 
            }
          } 
        } else {

          // loop through each of the eligibility condition for the question 
          for (var key in dictFilterParameters) {
            
            // ignore the URL parameters of type and brand
            if ((key != 'type') && (key != 'brand')) {

              // check to make sure the eligibility condition column for the questiois not blank, if blank not relevant   
              if (response.data[i][key] != "") {

                // check if the value is not in the eligibility condition column for the question, if not then the question is not displayed
                if (response.data[i][key].search(dictFilterParameters[key]) == -1) eligible = false
              } 
            }
          }
        }

        // if eligible add to list
        if (eligible ) questionList.push(response.data[i]);
      }
    } else {
      if (response.data[i].brand === dictFilterParameters['brand'] && response.data[i].start) questionList.push(response.data[i]);
    }
  }

  // build URL parameter for redirection
  var anchorURLParameters = "";
  for (var key in dictFilterParameters){

    // do not include the type in the url parameter string - this is computed at the anchor link generation
    if (key != 'type') anchorURLParameters += '&' + key + '=' + dictFilterParameters[key];
  }
  
  for (var i=0; i < questionList.length; i++) {

    // display the step number and question
    if (i === 0) {

      document.getElementById('header-here').textContent = questionList[0].step + ". " + questionList[0].question ;
    }

    // build list of options for the question
    document.getElementById('surface-type-here').innerHTML += "<br />"
    document.getElementById('surface-type-here').innerHTML += "<img loading=\"eager\"  src=\"" + questionList[i].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
   
    // if this is a product link to the product detail page else next question
    if (dictFilterParameters['type'] === "product") {
    
      document.getElementById('surface-type-here').innerHTML += "<a href=" +  questionList[i].url + ">" + questionList[i].name + "</a>"
    } else {
    
      document.getElementById('surface-type-here').innerHTML += "<a href=\"wizard?type=" + questionList[i].next + "&" + questionList[i].type + "=" + questionList[i].id + anchorURLParameters + "\">" + questionList[i].name + "</a>"
    }

    document.getElementById('surface-type-here').innerHTML += "<br />"
  }

  })
  .catch(error => {
    
    console.log('Error fetching products', error);
  });