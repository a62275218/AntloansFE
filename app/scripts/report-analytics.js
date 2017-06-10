$(document).ready(function(){
   $('#analytics_btn').click(function(){
      $('#analytics_btn').addClass('show_light');
      $('#sales_btn').removeClass('show_light');
      $('#deals_btn').removeClass('show_light');
      $('#log_btn').removeClass('show_light');
      $('#charts_list').show();
      $('#sales_list').hide();
      $('#deals_list').hide();
      $('#log_list').hide();

   });

   $('#sales_btn').click(function(){
      $('#analytics_btn').removeClass('show_light');
      $('#sales_btn').addClass('show_light');
      $('#deals_btn').removeClass('show_light');
      $('#log_btn').removeClass('show_light');
      $('#charts_list').hide();
      $('#sales_list').show();
      $('#deals_list').hide();
      $('#log_list').hide();
   });

   $('#deals_btn').click(function(){
      $('#analytics_btn').removeClass('show_light');
      $('#sales_btn').removeClass('show_light');
      $('#deals_btn').addClass('show_light');
      $('#log_btn').removeClass('show_light');
      $('#charts_list').hide();
      $('#sales_list').hide();
      $('#deals_list').show();
      $('#log_list').hide();
   });

   $('#log_btn').click(function(){
      $('#analytics_btn').removeClass('show_light');
      $('#sales_btn').removeClass('show_light');
      $('#deals_btn').removeClass('show_light');
      $('#log_btn').addClass('show_light');
      $('#charts_list').hide();
      $('#sales_list').hide();
      $('#deals_list').hide();
      $('#log_list').show();
   });




});
