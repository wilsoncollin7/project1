// var movieTitle = ""; //grabbed from id: #movieTitleInput
// var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieTitle + "&api-key=fcbAXVUQU4auE0F0Q4KVCPAWLHAZWgnG";

var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=the+little+mermaid&api-key=fcbAXVUQU4auE0F0Q4KVCPAWLHAZWgnG";

function getReview () {
   $.ajax({
   url: reviewURL,
   method: "GET"
 }).then(function(response) {
   console.log(response);

   var reviewDiv = $("<div>");
   var reviewP = $("<p>");
   var reviewLink = $("<a>").attr("href", response.results[0].link.url).attr("target", "_blank").text("Click Here for NYTimes Movie Review");

   reviewP.append(reviewLink);
   reviewDiv.append(reviewP);
   $(".col-md-8").append(reviewDiv);
 });
};

getReview();