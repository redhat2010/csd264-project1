[![Work in Repl.it](https://classroom.github.com/assets/work-in-replit-14baed9a392b3a25080506f3b7b6d57f295ec2978f6f33ec97e36a161684cbe9.svg)](https://classroom.github.com/online_ide?assignment_repo_id=4263117&assignment_repo_type=AssignmentRepo)
# CSE264 Project 1: Playing with JavaScript and REST
## Due: Monday, March 15, 2021 at 11:59 PM

In this assignment, you will be developing some code to create a small Reddit search interface.

All the code you need is in this GitHub Classroom repo. 

### Instructions 
You will be implementing a function called "SearchReddit". SearchReddit will take one parameter (which should be of type String). 
It will use this string parameter to search for posts on Reddit.com using the reddit Search API. For example, you can use the URI https://www.reddit.com/search.json?q=cats+boots to search Reddit for all Posts with "cats and boots" in the title (**Notice:**  the spaces have become +’s in this case, and other special characters will need to be URI encoded) You can read more about the Reddit search API here: https://www.reddit.com/wiki/search. 
Once you have this json file, go through each entry (which should be a Post), and look up the link and comment Karma of each user who was an author in the posts returned from your search query. You can look up any reddit user by name using the following URL pattern (See https://www.reddit.com/user/hafizshb/about.json as an example of an Reddit user look up given the Reddit user "hafizshb"). The comment_karma and link_karma elements will be what you are looking for. 

Construct an array that includes: The Title of the Reddit post from the Search Query,  the Reddit users name who is the author of that post, the comment Karma of that user, and the link Karma of that user. 

This array should:
* Get rid of any duplicate users (never look up the same user twice as defined by username)
* Be ordered from highest to lowest Link Karma
* Each element in the array should be {RedditPost, RedditUser, LinkKarma, CommentKarma}

SearchReddit should go through this array and print the contents of the array in HTML using the provided addHTML function. It takes one parameter which is a String. 

For example for 
```json
{
   "RedditPost":"This Cat has Boots", 
   "RedditUser":"not_a_cat", 
   "LinkKarma":32,
   "CommentKarma":62,
} 
```
should convert to the string: 
> User not_a_cat wrote the post "This Cat has Boots" and 32 Link Karma and 62 Comnment Karma 

This string should be passed to the addHTML function.

Other things to consider:
* Use no outside javascript libraries. No jQuery, etc. 
* You need to use Fetch for grabbing json from the REST API (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* You can use any part of ES6 Javascript.
* Use a modern web browser with support for ES6 (i.e. Chrome/Firefox)
* Check your inputs ( The parameter for SearchReddit must be a String, check it or try to convert it)
* Use the developer tools in your browser to help with debugging
* You will need to have a local server to run javascript from a local source on your browser. If you have python installed on your computer, you can run "python -m SimpleHTTPServer” in your cloned repo directory from the command line. Then in your browser go to http://localhost:8000/ You should see the html file and be able to run the javascript code. 
    *  You can also use tools like repl.it to run code in the browser as well, a link to it is included in this repo
* Do not rely on Global Variables! Multiple versions/copies of SearchReddit should work the same and not interfere with each other. Use closure and local scopes to not cause side effects!

### Grading
* **80 Points** - Current code works as expected (You enter a search term in the HTML document, and the correct results are displayed in the formatted stated in the README)
* **10 Points** - Functions only accept parameters as expected (checks types) and works with other code/functions not included in this assignment. Do not rely on Global Variables. You code should not have side effects.
* **10 Points** - well commented and easy to read/follow

* If code doesn't run/compile you can get no more than a 65 (max grade). But please write comments and a README to explain the process, what you were trying to do. 
