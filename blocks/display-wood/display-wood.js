

fetch('https://main--cabotstain--deckreyes.aem.page/deck.json?sheet=wood')
  .then(response => response.json())
  .then(response => {
    
    console.log(response);

    document.getElementById('wood1').innerHTML  = "<option value=\"wood1\">" + response.data[0].name
    document.getElementById('wood1').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[0].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\"></option>"
    document.getElementById('wood2').innerHTML  = "<option value=\"wood2\">" +response.data[1].name
    document.getElementById('wood2').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[1].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\"></option>"
    document.getElementById('wood3').innerHTML  = response.data[2].name
    document.getElementById('wood3').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[2].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
    document.getElementById('wood4').innerHTML  = response.data[3].name
    document.getElementById('wood4').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[3].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
    document.getElementById('wood5').innerHTML  = response.data[4].name
    document.getElementById('wood5').innerHTML += "<img loading=\"eager\"  src=\"" + response.data[4].image + "?width=200&amp;format=jpg&amp;optimize=medium\" width=\"200\" height=\"200\">"
    document.getElementById('wood6').innerHTML  = response.data[5].name
    
              
  }
  )
  .catch(error => {
    console.log('Error fetching products', error);
  });
