Parse.initialize("bUpIWG3XoPGQxsS3r1vNfDiDzKExyvUBru97msYU", "TTOqKMRGEhNEeTOuOoPu5hEqdjPf9HX1JXnLU3x8");

var tableElement = '<tr class="generated-row">' +
                      '<td class="active item-name"></td>' +
                      '<td class="success item-description"></td>' +
                      '<td class="warning item-price"></td>' +
                      '<td class="info">' +
                        '<button type="button" class="btn btn-default btn-edit">Edit</button>' +
                        '<button type="button" class="btn btn-default">Delete</button>' +
                      '</td>' +
                    '</tr>';

var NorsemanMenuObject = Parse.Object.extend("NorsemanMenuObject");
var norsemanMenuObject = new NorsemanMenuObject();

function init() {
  if(Parse.User.current() != null) {
    fetchMenu();
  } else {
    $('.auth-form').removeClass('hidden');
  }
}

function fetchMenu() {
  norsemanMenuObject.fetch({
    success: function(myObject) {
      populateTable(myObject);
      $('.auth-form').addClass('hidden');
      $('.main-content').removeClass('hidden');
    },
    error: function(myObject, error) {
      alert('Failed to fetch an object, with error code: ' + error.message);
    }
  });
}

function populateTable(myObject) {
  $('.generated-row').remove();
  myObject.attributes.results.forEach(function(element, i) {
    $(".table").append(tableElement);
    $(".table tr:nth(" + (i + 1) + ")").attr("data-id", element.objectId);
    $(".table tr:nth(" + (i + 1) + ") .btn-edit").attr("onclick", "edit('" + element.objectId + "');");
    $(".table tr:nth(" + (i + 1) + ") td.item-name").text(element.name);
    $(".table tr:nth(" + (i + 1) + ") td.item-description").text(element.description);
    $(".table tr:nth(" + (i + 1) + ") td.item-price").text(element.price);
  });
}

function edit(id) {
  $(".active-edit").removeClass("active-edit");
  $(".table tr[data-id=" + id + "]").addClass("active-edit");
  $('.main-form .item-name').val($(".active-edit .item-name").text());
  $('.main-form .item-description').val($(".active-edit .item-description").text());
  $('.main-form .item-price').val($(".active-edit .item-price").text());
}

function save() {
  var element = $('.active-edit');
  if(element.length) {
    var elementId = element.attr("data-id");
    var elementName = $('.main-form .item-name').val();
    var elementDescription = $('.main-form .item-description').val();
    var elementPrice = $('.main-form .item-price').val();
    norsemanMenuObject.set("objectId", elementId);
    norsemanMenuObject.set("name", elementName);
    norsemanMenuObject.set("description", elementDescription);
    norsemanMenuObject.set("price", elementPrice);

    var fileUploadControl = $("#bg-image-upload")[0];
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var parseFile = new Parse.File("photo.jpg", file);
      norsemanMenuObject.set("background", parseFile);
    }

    norsemanMenuObject.save(null, {
      success: function(myObject) {
        $('.active-edit td.item-name').text(elementName);
        $('.active-edit td.item-description').text(elementDescription);
        $('.active-edit td.item-price').text(elementPrice);
      },
      error: function(myObject, error) {
        alert('Failed to edit an object, with error code: ' + error.message);
      }
    });
  }
}

function login() {
  var username = $('.form-signin input[type="username"]').val();
  var password = $('.form-signin input[type="password"]').val();

  if(username != undefined && password != undefined) { 
    Parse.User.logIn(username, password, {
      success: function(user) {
        fetchMenu();
      },
      error: function(user, error) {
        alert("Failed to log in. Try again");
      }
    });
  }
}

function logout() {
  Parse.User.logOut();
  $('.main-content').addClass('hidden');
  $('.auth-form').removeClass('hidden');
}
