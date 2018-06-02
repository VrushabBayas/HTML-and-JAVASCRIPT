document.getElementById("myForm").addEventListener("submit", saveBookMark);

function saveBookMark(e) {
  e.preventDefault();
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;
  var error = document.getElementById("error");
  if (!siteName || !siteUrl) {
    var error_msg = "Empty feild are not allowed";
    error.innerHTML = error_msg;
    return false;
  } else {
    error.innerHTML = "";
  }
  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  //   //localstorage test
  //   localStorage.setItem("test", "hello");
  //   console.log("bookmark: ", bookmark);
  //   console.log("Localstorage", localStorage.getItem("test"));
  //   console.log("Localstorage remove", localStorage.removeItem("test"));
  //test if bookmark is null
  if (localStorage.getItem("bookmarks") === null) {
    //init array
    var bookmarks = [];
    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //get bookmarks from the local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log("bookmarks: ", bookmarks);
    //add bookmark to the array
    bookmarks.push(bookmark);
    //send it to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  //re-fetch book mark
  fetchBookmark();
}
//fetch all the bookmarks
function fetchBookmark() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bookmarkResults = document.getElementById("bookmarkResults");

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarkResults.innerHTML +=
      '<div class="well">' +
      "<h3>" +
      name +
      '<a class="btn btn-primary " target="_blink" href="' +
      url +
      '">Visit</a> ' +
      '<a class="btn btn-dark " onclick="deleteBookmark(\'' +
      url +
      '\')" target="_blink" href="#">Delete</a> ';
    +"</h3>" + "</div>";
  }
}
function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //loop throgh bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  //re-set back to local storag
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //re-fetch book mark
  fetchBookmark();
}
