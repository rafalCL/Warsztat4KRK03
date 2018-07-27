$(document).ready(function(){

  refreshBookList();

  function refreshBookList(){
    $.ajax({url: "http://localhost:8282/books/",
           }).done(function(books){
      console.log("Działa! :)");
      var renderingPoint = $("#book-list");
      renderBookList(renderingPoint, books);
    }).fail(function(xhr, status, errorThrown){
      console.log("BŁĄD!", xhr, status, errorThrown);
    });
  }

  function renderBookList(renderingPoint, books){
    var ul = $("<ul>");
    for(var i=0; i< books.length; i++){
      var id = books[i].id;
      var title = books[i].title;
      var author = books[i].author;

      var li = $("<li>");
      li.text(id + "; " + title + "; " + author);
      ul.append(li);
    }

    renderingPoint.append(ul);
  }

//  $.ajax({
//    url:"http://date.jsontest.com",
//  }).done(function(sentDate){
//    console.log("Serwer wysłał odpowiedź. Poniżej wartość.");
//    console.log(sentDate);
//  }).fail(function(xhr, status, errorThrown){
//    console.log(xhr, status, errorThrown);
//  });
//
//  $.ajax({
//    url:"https://swapi.co/api/people/4/",
//  }).done(function(response){
//    console.log("Serwer wysłał odpowiedź. Poniżej wartość.");
//    console.log(response);
//  }).fail(function(xhr, status, errorThrown){
//    console.log(xhr, status, errorThrown);
//  });

});
