
$(document).ready(function(){
    $(".glyphicon-th-list").click(function(){
      $(".modelShowClass").addClass("list");
    });
    $(".glyphicon-th").click(function(){
        $(".modelShowClass").removeClass("list");
    })
  });