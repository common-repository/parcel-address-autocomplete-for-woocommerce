
/* Ajax call to get address data */
jQuery(document).ready(function(){
var imgurl = gatJsVars.imageURL;
var accessToken = gatJsVars.getToken;
var apiDomain = gatJsVars.getApiDomain;

  var availableTags = [];
    jQuery("input#billing_address_1").autocomplete({
  		autoFocus: true,
      source: function(request, response) {
      jQuery('input#billing_address_1').css("background","white url("+imgurl+") right center no-repeat");
      var accesData =[];  
      var availableTags = [];    
        jQuery.ajax({
         url: apiDomain+"?count=8",
         dataType:'json',
         async:true,
          data: {
            q: request.term
          },
          beforeSend: function (xhr) {
       	 xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
       	
   		 },

          success: function(data) {

            if(data.addresses.length == 0){
             
              jQuery('input#billing_address_1').css('background','');
              
            }else{

              jQuery.each(data.addresses, function(idx, obj) {
                accesData.push(obj.full_address);
                response(accesData);
                jQuery('input#billing_address_1').css('background','');

              });

            }
  
            
            
    	 }

                
      });
 
      },
       minLength: 3,
      select: function(event, ui) {
              var getValue = ui.item.value;
            var last_comma = getValue.lastIndexOf(",");
            var getCityAddress = getValue.substring(0, last_comma);
            var getCityAndPostCode = getValue.substring(last_comma+2, getValue.length) ;

            var lastSpace = getCityAndPostCode.lastIndexOf(" ");
            
            var lastSpaceCity = getCityAddress.lastIndexOf(" ");

            var getCity = getCityAndPostCode.substring(0, lastSpace);
           
            var last_comma_address = getCityAddress.lastIndexOf(",");
          
            var getstate = getCityAddress.substring(last_comma_address+2, getCityAddress.length);
             var getCityAddress = getCityAddress.substring(0, last_comma_address);
            var getPostCode = getCityAndPostCode.substring(lastSpace+1, getCityAndPostCode.length);
           
                       jQuery('input#billing_address_1').val(getCityAddress);
            jQuery('input#billing_city').val(getCity);
            jQuery('input#billing_address_2').val(getstate);
            jQuery('input#billing_postcode').val(getPostCode);

             return false;
        }
    });

});



