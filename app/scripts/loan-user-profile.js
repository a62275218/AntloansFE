console.log('hahaha');

$(document).ready(function(){
  $('.email_notify').click(function(){
    $('.email_notify').toggleClass('enable');
  })

  $('.sms_notify').click(function(){
    $('.sms_notify').toggleClass('enable');
  })

})
