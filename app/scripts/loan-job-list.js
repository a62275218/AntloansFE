
$(document).ready(function(){

  // $('.dropbtn').mouseenter(function(){
  //    $('.dropbtn i').removeClass('fa-chevron-down');
  //    $('.dropbtn i').addClass('fa-chevron-up');
  // });
  //
  // $('.dropbtn').mouseleave(function(){
  //    $('.dropbtn i').removeClass('fa-chevron-up');
  //    $('.dropbtn i').addClass('fa-chevron-down');
  // });

//  left bar js

  $('.left_arrow i').click(function(){
       $status=$('.left_bar').attr('data-status');
       if ($status=='open'){
          $('.left_arrow i').removeClass('fa-chevron-left');
          $('.left_arrow i').addClass('fa-chevron-right');
          $('.left_bar').css('width','5%');
          $('.right_part').css('width','95%');
          $('.left_bar ul li').css('padding-left','20px');
          $('.left_bar ul li a').hide();
          $('.left_bar').attr('data-status','close');
       } else if ($status=='close'){
         $('.left_arrow i').addClass('fa-chevron-left');
         $('.left_arrow i').removeClass('fa-chevron-right');
         $('.left_bar').css('width','13%');
         $('.right_part').css('width','87%');
         $('.left_bar ul li').css('padding-left','25%');
         $('.left_bar ul li a').show();
         $('.left_bar').attr('data-status','open');
       }
  })

  // show more tool js

  $('.showBtn').click(function(){
    $('.tool_bar_middle').toggleClass('show_block');
    $('.tool_bar_below').toggleClass('show_block');
    $value = $('.showBtn span').text();
    if ($value=='show more'){
      $('.showBtn i').removeClass('fa-plus').addClass('fa-minus');
      $('.showBtn span').text('show less');
    }else if ($value=='show less'){
      $('.showBtn i').removeClass('fa-minus').addClass('fa-plus');
      $('.showBtn span').text('show more');
    }
  })
})
