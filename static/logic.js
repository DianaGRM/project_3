let url = 'http://127.0.0.1:5503/api'

d3.json(url).then(d=>{
    
    //Function for making the string lists into list type
    function tolist(list){
        
        let newlist = list.split(",");
        return(newlist)
    }
    //Changing the data of the columns genres and countries
    for (let i = 0; i < d.length; i++) {
            
            d[i].genres = tolist(d[i].genres);
            d[i].production_countries = tolist(d[i].production_countries);
    
    }
    console.log(d)
    //options 
    // options type 
      options_type = ["MOVIE","SHOW"];
      let selectElement = document.getElementById("selDataset")
      for (const option of options_type) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
      }

    //options genres
    options_genres=[]
    for (let i = 0; i < d.length; i++) {
        for (let j = 0; j < d[i].genres.length; j++) {
            if(!options_genres.includes(d[i].genres[j])){
                options_genres.push(d[i].genres[j]);
            }   
        }
    }
    let selectElement2 = document.getElementById("selDataset2")
      for (const option of options_genres) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement2.appendChild(optionElement);
    }

    //option country
    options_production_countries=[]
      for (let i = 0; i < d.length; i++) {
          for (let j = 0; j < d[i].production_countries.length; j++) {
              if(!options_production_countries.includes(d[i].production_countries[j])){
                  options_production_countries.push(d[i].production_countries[j]);
              }   
          }
    }

    let selectElement3 = document.getElementById("selDataset3")
      for (const option of options_production_countries) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement3.appendChild(optionElement);
    }
        
        
    
   
    
    
});