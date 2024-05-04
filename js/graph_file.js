// Inspiration: https://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/

function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function () {
        var obj = this;
        obj.dd.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
        });
        obj.opts.on('click', function () {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            opt.siblings().removeClass('selected');
            opt.filter(':contains("' + obj.val + '")').addClass('selected');
        }).change();
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
};

$(function () {
    // create new variable for each menu
    var dd1 = new DropDown($('#noble-gases'));
    var dd2 = new DropDown($('#graph-type'));
    // var dd2 = new DropDown($('#other-gases'));
    $(document).click(function () {
        // close menu on document click
        $('.wrap-drop').removeClass('active');
    });
});
var element = document.querySelector("body");

var open = true;
$("#sidebar-btn").click(function(){

  element.requestFullscreen()
  .then(function() {
  	// element has entered fullscreen mode successfully
  })
  .catch(function(error) {
  	// element could not enter fullscreen mode
  	// error message
  	console.log(error.message);
  });

  if(open == true){
    $("#sidebar").animate({right:'-290px'});
    open = false;
  }else{
    $("#sidebar").animate({right:'0px'});
    open = true;
  }

  console.log("clicked");
});
