const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const brand = urlParams.get('brand');
const type = urlParams.get('type');
const step = urlParams.get('step');
const project = urlParams.get('project');
const condition = urlParams.get('condition');
const look = urlParams.get('look');


fetch('https://main--cabotstain--deckreyes.aem.page/deck.json?sheet=master')
  .then(response => response.json())
  .then(response => {
    
    console.log(response);

    //const product_name = response.data[0].name;   
    // Display title
    if (step === 'one'){
      document.getElementById('header-here').textContent = '1. What exterior wood surface are you staining?' ;
    }

    if (step === 'two'){
    document.getElementById('header-here').textContent = '2. What does your project look like?' ;
    }

    if (step === 'three'){
      document.getElementById('header-here').textContent = '3. My wood has?' ;
      }
    
    if (step === 'four'){
      document.getElementById('header-here').textContent = '4. What is the look you want?' ;
      }
   

    //Display the last trade date
    //document.getElementById('product-name').textContent = product_name;

    for (var i=0; i < response.total; i++){
      if (response.data[i].brand === brand && response.data[i].type === type && step === 'one'){          
          document.getElementById('surface-type-here').innerHTML += "<br />"
          document.getElementById('surface-type-here').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[i].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
          document.getElementById('surface-type-here').innerHTML += "<a href=\"wizard?brand=cabot&type=condition&project=" + response.data[i].id + "&step=two\">" + response.data[i].name + "</a>"
          document.getElementById('surface-type-here').innerHTML += "<br />"
      } 
      if (response.data[i].brand === brand && response.data[i].type === type && step === 'two'){          
        document.getElementById('surface-type-here').innerHTML += "<br />"
        document.getElementById('surface-type-here').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[i].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
        document.getElementById('surface-type-here').innerHTML += "<a href=\"wizard?brand=cabot&type=issues&project=" + project + "&condition=" + response.data[i].id +  "&step=three\">" + response.data[i].name + "</a>"
        document.getElementById('surface-type-here').innerHTML += "<br />"
      } 
      if (response.data[i].brand === brand && response.data[i].type === type && step === 'three'){          
        document.getElementById('surface-type-here').innerHTML += "<br />"
        document.getElementById('surface-type-here').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[i].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
        document.getElementById('surface-type-here').innerHTML += "<a href=\"wizard?brand=cabot&type=look" + "&project=" + project + "&condition=" + condition + "&step=four\">" + response.data[i].name + "</a>"
        document.getElementById('surface-type-here').innerHTML += "<br />"
      } 
      if (response.data[i].brand === brand && response.data[i].type === type && step === 'four'){          
        document.getElementById('surface-type-here').innerHTML += "<br />"
        document.getElementById('surface-type-here').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[i].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
        document.getElementById('surface-type-here').innerHTML += "<a href=\"display-product?look=" + response.data[i].id + "&condition=" + condition + "&project=" + project + "\">" + response.data[i].name + "</a>"
        document.getElementById('surface-type-here').innerHTML += "<br />"
      }     
    }  

  })
  .catch(error => {
    console.log('Error fetching products', error);
  });