$(document).ready(function () {
  var bookList = $("#book-list");
  var addBookForm = $("#add-book");

  refreshBookList();

  bookList.on("click", "button", deleteBook);
  addBookForm.on("submit", handleAddBook);

  function deleteBook() {
    var id = $(this).data("id");
    sendDeleteRequest(id);
    //    $(this).parent().remove();
  }

  function handleAddBook(event) {
    var title = $("input#title").val();
    var author = $("input#author").val();
    var method = $("input#submit-btn").data("method");
    if (title.trim().length > 0 &&
      author.trim().length > 0) {
      var book = {
        "title": title,
        "author": author,
      };

      sendGenericRequest("http://localhost:8282/books/",
        method,
        book,
        refreshBookList);
    }

    event.preventDefault();
    return false;
  }

  function sendDeleteRequest(id) {
    sendGenericRequest("http://localhost:8282/books/" + id,
      "DELETE",
      undefined,
      refreshBookList);
  }



  function refreshBookList() {
    sendGenericRequest("http://localhost:8282/books/",
      "GET",
      undefined,
      function (books) {
        console.log("Działa! :)");
        var renderingPoint = $("#book-list");
        renderBookList(renderingPoint, books);
      });
  }

  function renderBookList(renderingPoint, books) {
    renderingPoint.empty();
    var ul = $("<ul>");
    for (var i = 0; i < books.length; i++) {
      var id = books[i].id;
      var title = books[i].title;
      var author = books[i].author;

      var li = $("<li>");
      var delBtn = "<button data-id='" + id + "'>Delete</button>";

      li.html(title + "; " + author + " " + delBtn);
      ul.append(li);
    }

    renderingPoint.append(ul);
  }

  function sendGenericRequest(url, method, data, successHandler) {
    $.ajax({
      url: url,
      type: method,
      data: data === undefined ? "" : JSON.stringify(data),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
    }).done(function (data) {
      if (successHandler !== undefined) {
        successHandler(data);
      }
    }).fail(function (xhr, status, errorThrown) {
      console.log("BŁĄD!", xhr, status, errorThrown);
    });
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
