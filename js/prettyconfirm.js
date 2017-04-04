var _prettyConfirmCore = function(params){
  //From : http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  params = $.extend({
    className: "primary",
    acceptCallback: function(){},
    cancelCallback: function(){},
    closeOnAccept: false,
    showAccept: true,
    showCancel: true,
    extraParams: {},
    title: '',
    content: ''
  }, params);

  params.uuid = guid();

  function centerBox(){
    $('.prettyconfirm_box').css({ top: (($(window).height() / 2) - ($('.prettyconfirm_box').height() / 2)) + "px" });
  }

  var pcObject = {
    uuid: params.uuid,
    close: function(){
      $('#' + params.uuid).remove();
    },
    render: function(){
      $('body').prepend(
        $('<div>')
          .addClass('prettyconfirm_container')
          .attr('id', params.uuid)
          .append(
            $('<div>')
              .addClass('prettyconfirm_box')
                .append('<div class="pc_header ' + params.className + '">'+ params.title +'</div>')
                .append('<div class="pc_content">' + params.content + '</div>')
                .append('<div class="pc_footer"></div>')
          )
      );

      //If we show cancel button
      if(params.showCancel){
        $('.pc_footer').append(
          $('<button class="btn btn-warning pull-right" style="margin-left:10px;"><i class="ion ion-close"></i> Annuler </button> ')
        );

        $('.prettyconfirm_container > .prettyconfirm_box').find('.btn-warning').click(function(){
          params.cancelCallback(params.extraParams);
          $('#' + params.uuid).remove();
        });

      }

      //If we show accept button
      if(params.showAccept){
        $('.pc_footer').append(
          $('<button class="btn btn-success pull-right"><i class="ion ion-checkmark"></i> Valider </button> ')
        );

        $('.prettyconfirm_container > .prettyconfirm_box').find('.btn-success').click(function(){
          params.acceptCallback(params.extraParams);
          if(params.closeOnAccept) $('#' + params.uuid).remove();
        });
      }

      //If jquery ui is loaded, make the box draggable
      if(typeof $('.prettyconfirm_box').draggable !== "undefined"){
        $('.pc_header').css({ 'cursor': 'move' });

        //Disable selection
        $('.prettyconfirm_container').disableSelection();

        //Enable draggable on hover header
        $('.pc_header').on('mouseover', function(){
          $('.prettyconfirm_box').draggable({ disabled : false });
        });

        //Disable draggable on mouse leave header
        $('.pc_header').on('mouseleave', function(){
          $('.prettyconfirm_box').draggable({ disabled : true });
        });

        //If it's draggable, prevent the hidden box case if the user play around :p
        $('.prettyconfirm_container').dblclick(function(){
          $('.prettyconfirm_container').remove();
        });
      }

      centerBox();
    }
  }

  pcObject.render();

  return pcObject;
}

var _prettyConfirm = {
  redirect: function(url, title, content){
    return new _prettyConfirmCore({
      className: 'error',
      acceptCallback: function(){
        window.location.href = url;
      },
      title: title,
      content: content
    });
  },
  confirm: function(params){
    return new _prettyConfirmCore(params);
  }
}
