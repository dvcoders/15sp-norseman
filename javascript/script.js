Parse.initialize('bUpIWG3XoPGQxsS3r1vNfDiDzKExyvUBru97msYU', 'TTOqKMRGEhNEeTOuOoPu5hEqdjPf9HX1JXnLU3x8');

var pageElement = '<section class="section page">' +
                      '<section class="placeholder">' +
                        '<header class="name"></header>' +   //name
                        '<section class="description"></section>' + //description
                        '<footer>' +
                          '<i class="fa fa-usd"></i>' +
                          '<span class="price"></span>' +     //price
                        '</footer>' +
                      '</section>' +
                    '</section>';

var NorsemanMenuObject = Parse.Object.extend('NorsemanMenuObject');
var norsemanMenuObject = new NorsemanMenuObject();

norsemanMenuObject.fetch({
  success: function(myObject) {
    myObject.attributes.results.forEach(function(element, i) {
      $(pageElement).insertAfter('.section:nth(' + (i) + ')');
      if(element.background) {
      $('.page:nth(' + i + ')').css({
                                      'background': 'url(' + element.background._url + ') no-repeat center center',
                                      'background-size': 'cover'
                                    });
      }
      $('.page:nth(' + i + ') .placeholder').addClass(element.placeholder);
      $('.page:nth(' + i + ') .name').text(element.name);
      $('.page:nth(' + i + ') .description').text(element.description);
      $('.page:nth(' + i + ') .price').text(element.price);
    });

    initFullPage();
  },
  error: function(myObject, error) {
    alert('Failed to fetch an object, with error code: ' + error.message);
  }
});

function initFullPage() {
  $('#fullpage').fullpage({
    'navigation': true,
    'menu': true,
    'verticalCentered': false,
    'easingcss3': 'ease-in-out'
  });
}
