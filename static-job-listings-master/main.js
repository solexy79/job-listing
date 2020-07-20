
const main = document.getElementById('main');
const filterTags = document.querySelector('.filtertags');
const filterBox = document.querySelector('.filter-box');

var filterTagsArr = [];


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var data = JSON.parse(xhttp.responseText) ;

         // to print out the the DOM
      
       var render = '';

        //looping through the array gotten from the json file
      
       for(let i = 0; i <data.length ; i++){
        //  making an empty tags array
         var tags = [];

         //to get and push the role,level.... of each developer into the tags array
         tags.push(data[i].role);
         tags.push(data[i].level);
    
          for(let x of data[i].tools){
            tags.push(x);
          }

          for(let x of data[i].languages){
            tags.push(x);
          }

          // is the developer new/featured or not
          var displayNew = data[i].new;

          var displayFeatured = data[i].featured;

          var featuredJob = data[i].featured;

          //if they are then display else dont display 
          if(displayNew === true){
            displayNew = 'block'
          }else{
            displayNew = 'none'
          }

          if(displayFeatured === true){
            displayFeatured = 'block'
          }else{
            displayFeatured = 'none'
          }

          if(featuredJob === true){
            featuredJob = 'block'
          }else{
            featuredJob = 'none'
          }


          //looping through and putting all tags in the output variable
          var output =''
          for(y = 0; y <tags.length ; y++){
            output += `<p class="tag">${tags[y]}</p>`

          }   

      //rendering the info on the DOM
      render +=   
         `<div class="dev-list">
            <div class="featuredJob" style = 'display: ${featuredJob}'></div>
            <div class='logo-div'>
              <img src="${data[i].logo}" class= 'logo' >
            </div>
            <div class = 'details'>
              <div class= 'top'>
                <p class="company"> ${data[i].company} </p>
                <p class='new' style = 'display: ${displayNew}' > NEW!</p>
                <p class='featured' style = 'display: ${displayFeatured} '> FEATURED</p>
              </div>

              <div class= 'middle'>
                <p class="position"> ${data[i].position} </p>
              </div>

              <div class= 'bottom'>
                <p class="posted"> ${data[i].postedAt} </p>
                <p>.</p>
                <p  class="contract"> ${data[i].contract} </p>
                <p>.</p>
                <p class="location"> ${data[i].location} </p>
              </div>

            </div>
            <div class="tags">
              ${output}
            </div> 
          </div> `   
          } 
      }

       main.innerHTML = render;
    
};
xhttp.open("GET", "data.json", true);
xhttp.send();

main.addEventListener('click', function addfilter (e){
  var text =e.target.innerText;
  if(e.target.classList.contains('tag') &&filterTagsArr.includes(text) === false &&filterTagsArr.length < 3 ){
      filterTagsArr.push(text);
      filterTags.innerHTML += (`<div class="filtertag"><p>${text}</p><button>x</button></div>`)
  }else if (filterTagsArr.length = 0 ) {
    filterTags.innerHTML = ''
  }
})
filterBox.addEventListener('click', (e) =>{
    if(e.target.classList.contains('clear') ){
      // filterBox.innerHTML =`
      // <div class="filtertag"></div>
      // <div class="cleardiv">
      //   <button class="clear">Clear</button>
      // </div>`
  
      filterTagsArr = [];
      console.log(filterTagsArr);
      console.log(filterTags);
    }
})



