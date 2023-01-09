/*
 * This files holds all the code for Project 1.
 */

//Run once broswer has loaded everything
window.onload = function () {

 //Function that adds new Divs to the HTML page
 function addHTML(text)
{
  //Grab the container div
  var start_div = document.getElementById('start');
  //make a new Div element
  var newElement = document.createElement('div');
  //add text to that div
  newElement.innerHTML = text;
  //append it to the main 
  start_div.appendChild(newElement);
}

function SearchReddit (search)
{
  console.log("yes")
  // Encode the search term
  var newSearch = encodeURIComponent(String(search));
  var encodedSearch = newSearch.replace("%20","+");

  // Fetches the results for the specifed search term
  fetch('https://www.reddit.com/search.json?q=' + encodedSearch)
  .then(response => response.json())
  .then(data => {
    var userArray = [];
    var returnArray = [];
    // Iterate through the children (search results)
    for (var entry of data.data.children){
      //console.log(entry)
      var author = entry.data.author;
      // Check if the author has already been added to the array
      if (!returnArray.includes(author)){
        returnArray.push({"ReditPost":entry.data.title, "ReditUser":author})
        //console.log(author)
        // Encode the author's name
        var newAuthor = encodeURIComponent(String(author));
        var encodedAuthor = newAuthor.replace("%20","+");
        // Push the fetch call into an array of promises
        userArray.push(fetch("https://www.reddit.com/user/" + encodedAuthor + "/about.json"));
      }
    }
    // Evaulate the array of fetch call promises
    Promise.all(userArray).then(function (responses) {
      // Get a JSON object from each of the fetch calls
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      // Iterate through the results from the fetch calls
      for (var user of data){
        var name = user.data.name;
        // Find the entry in returnArray for the current author and update their link & comment karma
        updateEntry = returnArray.find(item => item.ReditUser === name);
        updateEntry.LinkKarma = user.data.link_karma;
        updateEntry.CommentKarma = user.data.comment_karma;
      }
      
      // Sorts the returnArray based on Link Karma
      returnArray.sort(function(a, b) {
        if (a.LinkKarma > b.LinkKarma) {
          return -1;
        }
        else if (a.LinkKarma < b.LinkKarma) {
          return 1;
        }
        else {
          return 0;
        }
      })
      
      // Maps the objects of the returnArray to a new array of strings
      var strArray = returnArray.map(x => 'User ' + x.ReditUser + ' wrote the post "' + x.ReditPost + '" and ' + x.LinkKarma + ' Link Karma and ' + x.CommentKarma +' Comment Karma');
      
      // Calls addHTML on the strings from strArray 
      for (str of strArray) {
        addHTML(str);
      }
    })
  });
}

//gran the current form in the HTML document
var form = document.querySelector("form");

//event that listens for form submit
form.addEventListener("submit", function(event) {
  var search_text = form.elements.value.value;
  
  console.log("Saving value", search_text);
  
  //get main DIV
  var start_div = document.getElementById('start');
 
  //Clear main DIV
  start_div.innerHTML = '';

  
  addHTML("Looking up Reddit Users for search term "+search_text);

  
  //uncomment these lines to run your code here
  SearchReddit(search_text);
  
  event.preventDefault();
});

};
