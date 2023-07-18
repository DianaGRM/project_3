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


    //country runtime summary
    let country = ("Country: " + d[0].production_countries)
    runtime_data = []
     //data
     for (let i = 0; i < d.length; i++) {
      if(d[i].type=="MOVIE"){
        
       if (d[i].production_countries.includes(d[0].production_countries[0])){
         
        if(d[i].genres.includes(d[0].genres[0])){

          runtime_data.push(d[i].runtime);
          
        }
      }
     }
     }
     console.log(runtime_data)
     let total_ele = ("Total elements: " + runtime_data.length)
     let mean = ("Mean: " + d3.mean(runtime_data));
     let median = ("Median: " + d3.median(runtime_data));
     let max = ("Max runtime: " + d3.max(runtime_data));
     let min = ("Min runtime: "+ d3.min(runtime_data));

     let summary_data = [country,total_ele, mean, median, max, min]

     let parentelement = document.getElementById("runtime-stats");

    //Initialize default page

    function init(){
      //summary 

      summary_data = [country,total_ele, mean, median, max, min]

      for(var element of summary_data){
        var listielement = document.createElement("p");
        listielement.textContent = element;
        parentelement.appendChild(listielement);
      }
    }

    //update data with the dropdowns 
    d3.selectAll("#selDataset").on("change", updatePlotly);
    d3.selectAll("#selDataset2").on("change", updatePlotly);
    d3.selectAll("#selDataset3").on("change", updatePlotly);

    function updatePlotly(){  
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
      let dropdownMenu2 = d3.select("#selDataset2");
      let dropdownMenu3 = d3.select("#selDataset3");
      // Assign the value of the dropdown menu option to a variable
      let dataset = dropdownMenu.property("value");
      let dataset2 = dropdownMenu2.property("value");
      let dataset3 = dropdownMenu3.property("value");

      //loop

      //update summary
      runtime_data = []
     //data of the selected dropdowns
     for (let i = 0; i < d.length; i++) {
      if(d[i].type==dataset){
        
       if (d[i].production_countries.includes(dataset3)){
         
        if(d[i].genres.includes(dataset2)){

          runtime_data.push(d[i].runtime);
          
        }
      }
     }
     }
     //get the new information
     let country = ("Country: " + dataset3)
     let total_ele = ("Total elements: " + runtime_data.length)
     let mean = ("Mean: " + d3.mean(runtime_data));
     let median = ("Median: " + d3.median(runtime_data));
     let max = ("Max runtime: " + d3.max(runtime_data));
     let min = ("Min runtime: "+ d3.min(runtime_data));

     summary_data = [country,total_ele, mean, median, max, min]
     parentelement = document.getElementById("runtime-stats");

     //replace the data
     for (var index=0; index < summary_data.length; index++){
                    
      var listitemelement = parentelement.getElementsByTagName("p")[index];

      listitemelement.textContent = summary_data[index];

      
  }




    }
   
    
    init();
});