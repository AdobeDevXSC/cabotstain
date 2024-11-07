const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const look = urlParams.get('look');
const condition = urlParams.get('condition');
const project = urlParams.get('project');

console.log(look)


fetch('https://main--cabotstain--adobedevxsc.aem.page/deck.json?sheet=products-matrix')
  .then(response => response.json())
  .then(response => {
    
    console.log(response);

    //const product_name = response.data[0].name;   
    // Display title
    document.getElementById('result-here').textContent = 'Results' ;

    //Display the last trade date
    //document.getElementById('product-name').textContent = product_name;

    for (var i=0; i < response.total; i++){
      if (response.data[i].look === look){          
        document.getElementById('product-name').innerHTML += "<br />"
        document.getElementById('product-name').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[i].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
        document.getElementById('product-name').innerHTML += response.data[i].name
        document.getElementById('product-name').innerHTML += "<br />"
       } 
      } 
  })
  .catch(error => {
    console.log('Error fetching products', error);
  });