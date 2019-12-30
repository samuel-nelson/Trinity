/*
 * jQuery UI Autocomplete HTML Extension
 *
 * Copyright 2010, Scott Gonzalez (http://scottgonzalez.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/scottgonzalez/jquery-ui-extensions
 */

if ( typeof($.ui) != 'undefined' ) {
	(function( $ ) {

	var proto = $.ui.autocomplete.prototype,
		initSource = proto._initSource;

	function filter( array, term ) {
		var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
		return $.grep( array, function(value) {
			return matcher.test( $( "<div>" ).html( value.label || value.value || value ).text() );
		});
	}

	$.extend( proto, {
		_initSource: function() {
			if ( this.options.html && $.isArray(this.options.source) ) {
				this.source = function( request, response ) {
					response( filter( this.options.source, request.term ) );
				};
			} else {
				initSource.call( this );
			}
		},

		_renderItem: function( ul, item) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
				.appendTo( ul );
		}
	});

	})( jQuery );
}


///////////////////
// global functions
///////////////////
// menu open close functions
var tiClear, tiOverClear;

// detect type of device
function is_touch_device() {  
	try {  
		document.createEvent("TouchEvent");  
		return true;  
	} catch (e) {  
		return false;  
  	}  
}
// START Ian added this for form submission and pagenation stuff
function UpdateAddToCartForm(){
		var strMemberShipType = $('#strMemberShipType').find(":selected").val();
		var intStartShipping = $('#intMonth').find(":selected").val();
		var strFrequency = $('#strShippingFrequency').find(":selected").val();
		var strPayTerm = $('#strPaymentTerm').find(":selected").val();
		var HasOngoing = $("#strMemberShipType option[value='Ongoing']").length;
		if(strMemberShipType == 'Seasonal'){
			$("#strShippingFrequency option[value='monthly']").remove();
			$("#strShippingFrequency option[value='othermonth']").remove();
			$('#strShippingFrequency').append($('<option>', {
				value: 'thirdmonth',
				text: 'Seasonal - Every Third Month'
			}));
			
			}
		else if (strMemberShipType != 'Seasonal' && strFrequency == 'thirdmonth'){
			$("#strShippingFrequency option[value='thirdmonth']").remove();
			$('#strShippingFrequency').append($('<option>', {
				value: 'monthly',
				text: 'Monthly'
			}));
			$('#strShippingFrequency').append($('<option>', {
				value: 'othermonth',
				text: 'Every Other Month'
			}));
			
			} 
		if(strPayTerm != 'pay monthly'){
			$("#strMemberShipType option[value='Ongoing']").remove();			
			}
		else if (HasOngoing == 0){
			$('#strMemberShipType').append($('<option>', {
				value: 'Ongoing',
				text: 'Ongoing'
			}));
			
			} 
		 
	}
	
function UpdateAddToCartForm_alternate(){
		var strMemberShipType = $('#strMemberShipType').find(":selected").val();
		var intStartShipping = $('#intMonth').find(":selected").val();
		var strFrequency = $('#strShippingFrequency').find(":selected").val();
		var strPayTerm = $("input[name='strpaymentTerm']:checked").val();
		var HasOngoing = $("#strMemberShipType option[value='Ongoing']").length;
		
		var Full3month = $('#3Month_Full').html() ;
		var Full6month = $('#6Month_Full').html() ;
		var Full12month = $('#12Month_Full').html() ;
		var FullSeasonal = $('#Seasonal_Full').html() ;		
		var Monthly3month = $('#3Month_Monthly').html() ;
		var Monthly6month = $('#6Month_Monthly').html() ;
		var Monthly12month = $('#12Month_Monthly').html() ;
		var MonthlySeasonal = $('#Seasonal_Monthly').html() ;
		
		if(strMemberShipType == '3Month'){
			$("#disp_fullprice").html(Full3month);
			$("#disp_monthlyprice").html(Monthly3month);
		}
		else if(strMemberShipType == '6Month'){
			$("#disp_fullprice").html(Full6month);
			$("#disp_monthlyprice").html(Monthly6month);
		}
		else if(strMemberShipType == '12Month'){
			$("#disp_fullprice").html(Full12month);
			$("#disp_monthlyprice").html(Monthly12month);
		}		
		else if(strMemberShipType == 'Seasonal'){
			$("#disp_fullprice").html(FullSeasonal);
			$("#disp_monthlyprice").html(MonthlySeasonal);
		}
		
		if(strMemberShipType == 'Seasonal'){
			$("#strShippingFrequency option[value='monthly']").remove();
			$("#strShippingFrequency option[value='othermonth']").remove();
			$('#strShippingFrequency').append($('<option>', {
				value: 'thirdmonth',
				text: 'Seasonal - Every Third Month'
			}));
			
			}
		else if (strMemberShipType != 'Seasonal' && strFrequency == 'thirdmonth'){
			$("#strShippingFrequency option[value='thirdmonth']").remove();
			$('#strShippingFrequency').append($('<option>', {
				value: 'monthly',
				text: 'Monthly'
			}));
			$('#strShippingFrequency').append($('<option>', {
				value: 'othermonth',
				text: 'Every Other Month'
			}));
			
			} 
		 if(strMemberShipType == 'Ongoing'){
			$("#labelpps").addClass("selected");
			$("#labelpps > input[name='strpaymentTerm']").prop('checked', true);	
			$("#labelpif").removeClass("selected");			
			$("#labelpif > input[name='strpaymentTerm']").prop('checked', false);	
			$("#PaymentTypeDiv").addClass("ti-hide");
			}
		 else if( $("#PaymentTypeDiv").hasClass("ti-hide")) {
			$("#PaymentTypeDiv").removeClass("ti-hide");
			$("#labelpif").addClass("selected");
			$("#labelpif > input[name='strpaymentTerm']").prop('checked', true);	
			$("#labelpps").removeClass("selected");			
			$("#labelpps > input[name='strpaymentTerm']").prop('checked', false);
			}
	}
function UpdateVCShipping(){
	//var y = confirm("This will delete your current selections. Continue?");
//	if (y == true){	
		var strMemberShipType = $('#strMemberShipType').find(":selected").val();
		var intStartShipping = $('#intMonth').find(":selected").val();
		var strFrequency = $('#strShippingFrequency').find(":selected").val();
		if(strMemberShipType == 'Seasonal'){
			$("#strShippingFrequency option[value='monthly']").remove();
			$("#strShippingFrequency option[value='othermonth']").remove();
			$('#strShippingFrequency').append($('<option>', {
				value: 'thirdmonth',
				text: 'Seasonal - Every Third Month'
			}));
			strFrequency = $('#strShippingFrequency').find(":selected").val();
			}
		else if (strMemberShipType != 'Seasonal' && strFrequency == 'thirdmonth'){
			$("#strShippingFrequency option[value='thirdmonth']").remove();
			$('#strShippingFrequency').append($('<option>', {
				value: 'monthly',
				text: 'Monthly'
			}));
			$('#strShippingFrequency').append($('<option>', {
				value: 'othermonth',
				text: 'Every Other Month'
			}));
			strFrequency = $('#strShippingFrequency').find(":selected").val();
			}
			jQuery.ajax(	
				{
					type: "POST",
					url: "components/ajaxfunctions/VarietyClub.cfc?method=getVCShipments",
					data: {membershiptype:strMemberShipType,startshipping:intStartShipping,frequency:strFrequency},
					dataType: "text",
					global: false,        
					
					success: function(responseData)
					{
						$("#shippingoutput").html(responseData);
						$("#GrandTotal").html('$0.00');												
						},
					error: function(xhr, textStatus, errorThrown)
					{
						alert("sorry.. we're having some technical difficulties.");
						
					}
				});	 
		// return true;
//		}
//		else {
//		return false;	
//			}	 
	}
function PagenationSubmit(pageid){
	jQuery('#PageNation_PageID').val(pageid);
	SubmitTheSearchForm();
	}
function NewFilterSubmit(){
	jQuery('#PageNation_PageID').val(1);
	SubmitTheSearchForm();
	}
		
function SubmitTheSearchForm() {	
	var thisOutputClass =  jQuery('#plProds').attr("class");
	jQuery('#output_class').val(thisOutputClass);
	var datastring = jQuery('#FilterForm').serialize();
	 jQuery.ajax(	
	{
		type: "POST",
		url: "components/search.cfc?method=GetFiltered",
		data: {formstuff:datastring},
		dataType: "text",
		global: false,       
		
		success: function(responseData)
		{
			
			if (responseData !== "") {
				jQuery('#FilterResults').html(responseData);
				returnvar = false;
				 }
			else{
				returnvar = true;
				} 
			return returnvar; 
			},
		error: function(xhr, textStatus, errorThrown)
		{
			alert("sorry.. we're having some technical difficulties.");
			
		}
	});   
	}
	
function SubmitTheReviewForm(clubid,pageindex,reviewoffset) {	
	var datastring = 'clubid='+clubid+'&pageindex='+pageindex+'&reviewoffset='+reviewoffset;
	 jQuery.ajax(	
	{
		type: "POST",
		url: "components/search.cfc?method=GetReviews",
		data: {formstuff:datastring},
		dataType: "text",
		global: false,       
		
		success: function(responseData)
		{
			
			if (responseData !== "") {
				jQuery('#productTabs').html(responseData);
				returnvar = false;
				 }
			else{
				returnvar = true;
				}
	 		return returnvar;  
			},
		error: function(xhr, textStatus, errorThrown)
		{
			alert("sorry.. we're having some technical difficulties.");
			
		}
	});
	}
	
function RunFormValidation(formid) {
	var checkoutCells = $('#'+formid).find('.checkout-cell');
	var tempInput = '';
	$.each(checkoutCells, function(index, value){

		tempInput = $(value);
		// check all visible required form elements
		// and all required hidden form elements within visible .checkout-cell elements
		if( tempInput.is(':visible') && tempInput.find('input:radio.required').length ||
		tempInput.find('input.required:visible').length ||
		tempInput.is(':visible') && tempInput.find('input[type="hidden"].required').length ||
		tempInput.is(':visible') && tempInput.find('input:checkbox.required').length ) {
			errorValidation(tempInput.find('input'));
		}else if(tempInput.find('select.required:visible').length) {
			errorValidation(tempInput.find('select'));
		}else if(tempInput.find('textarea.required:visible').length) {
			errorValidation(tempInput.find('textarea'));
		}
	});

	// if any visible missed inputs
	if( $('.missed-input:visible').length ) {
		// prevent form from submitting
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
		// scroll to first missed input
		$('html, body').animate({
			scrollTop: $('.missed-input:eq(0)').offset().top
		}, 1000);
		return false;
	}
	else {
		return true;
		}
}

function RunAddToCartFormValidation(formid) {
	var checkoutCells = $('#'+formid).find('.checkout-cell');
	var tempInput = '';
	$.each(checkoutCells, function(index, value){

		tempInput = $(value);
		// check all visible required form elements
		// and all required hidden form elements within visible .checkout-cell elements
		if( tempInput.is(':visible') && tempInput.find('input:radio.required').length ||
		tempInput.find('input.required:visible').length ||
		tempInput.is(':visible') && tempInput.find('input[type="hidden"].required').length ||
		tempInput.is(':visible') && tempInput.find('input:checkbox.required').length ) {
			errorValidation(tempInput.find('input'));
		}else if(tempInput.find('select.required:visible').length) {
			errorValidation(tempInput.find('select'));
		}else if(tempInput.find('textarea.required:visible').length) {
			errorValidation(tempInput.find('textarea'));
		}
	});

	// if any visible missed inputs
	if( $('.missed-input:visible').length ) {
		// scroll to first missed input
		$('html, body').animate({
			scrollTop: $('.missed-input:eq(0)').offset().top
		}, 1000);
		return false;
	}
	else {
		return true;
		}
}


      
function SubmitCatalogForm() {					
	var datastring = jQuery('#catalogform').serialize();
	var returnvar = '';
	var firstReturn = RunFormValidation('catalogform');
	
	if (firstReturn == true){
	
	 jQuery.ajax(	
	{
		type: "POST",
		url: "components/Requests.cfc?method=UpdateCatalogRequest",
		data: {formstring:datastring},
		dataType: "text",
		global: false,       
		
		success: function(responseData)
		{
			
			if (responseData == "CaptchaError") {
				returnvar = false;
				alert("Are you sure you're not a robot?");
				 }
			else if (responseData == "ERROR") {
				returnvar = false;
				alert("ERROR");
				 }
			else{
				jQuery('#catalogRequestForm').html(responseData);
				jQuery('#topText').html('');
				returnvar = false;
				location.hash = "#formTop";
				} 
			return returnvar; 
			},
		error: function(xhr, textStatus, errorThrown)
		{
			alert("sorry.. we're having some technical difficulties.");
			returnvar = false;
	 		return returnvar;
			
		}
	});    
	}

}
	
function SubmitEmailForm() {					
	var datastring = jQuery('#joinlistform').serialize();
	var returnvar = '';
	var firstReturn = RunFormValidation('joinlistform');
	
	if (firstReturn == true){
	
	 jQuery.ajax(	
	{
		type: "POST",
		url: "components/Requests.cfc?method=UpdateEmailRequest",
		data: {formstring:datastring},
		dataType: "text",
		global: false,        
		
		success: function(responseData)
		{
			
			if (responseData == "CaptchaError") {
				returnvar = false;
				alert("Are you sure you're not a robot?");
				 }
			else if (responseData == "ERROR") {
				returnvar = false;
				alert("ERROR");
				 }
			else{
				var joinemail = $('#userEmail').val();
				var joinDate = new Date();
				var requestdate = $.datepicker.formatDate('mm/dd/yy', joinDate);
				var requestdatetime = joinDate.getHours()+":"+joinDate.getMinutes()+":"+joinDate.getSeconds();
				var optindatetime = requestdate+" "+requestdatetime;

				
				dataLayer.push({
								"joinmailData":
								{
									'emailaddress' : joinemail,
									'request_date': requestdate,
									'opt_in_datetime':optindatetime
								}
								});
				dataLayer.push({
					event: 'join_mail_event'
				});
				jQuery('#emailRequestForm').html(responseData);
				returnvar = false;
				}
	 		return returnvar; 
			
			},
		error: function(xhr, textStatus, errorThrown)
		{
			alert("sorry.. we're having some technical difficulties.");
			returnvar = false;
	 		return returnvar;			
		}
	});    
	}

}	
function SubmitWriteReview() {					
	var datastring = jQuery('#ReviewForm').serialize();
	var returnvar = '';
	var firstReturn = RunFormValidation('ReviewForm');
	
	if (firstReturn == true){
	
	 jQuery.ajax(	
	{
		type: "POST",
		url: "components/Requests.cfc?method=SaveReview",
		data: {formstring:datastring},
		dataType: "text",
		global: false,        
		
		success: function(responseData)
		{
			
			if (responseData == "CaptchaError") {
				returnvar = false;
				alert("Are you sure you're not a robot?");
				 }
			else if (responseData == "ERROR") {
				returnvar = false;
				alert("ERROR");
				 }
			else{
				jQuery('#rightReviewsContainer').html(responseData);
				$('html, body').animate({ scrollTop: 0 });
				returnvar = false;
				}
	 		return returnvar;			
			},
		error: function(xhr, textStatus, errorThrown)
		{
			alert("sorry.. we're having some technical difficulties.");
			returnvar = false;
	 		return returnvar;
		}
	});    
	}

}
	
function SubmitCorpRequest() {					
	var datastring = jQuery('#CorpForm').serialize();
	var returnvar = '';
	var firstReturn = RunFormValidation('CorpForm');
	if (firstReturn == true){
	
	 jQuery.ajax(	
	{
		type: "POST",
		url: "components/Requests.cfc?method=CorpRequest",
		data: {formstring:datastring},
		dataType: "text",
		global: false,        
		
		success: function(responseData)
		{
			
			if (responseData == "CaptchaError") {
				returnvar = false;
				alert("Are you sure you're not a robot?");
				 }
			else if (responseData == "ERROR") {
				returnvar = false;
				alert("ERROR");
				 }
			else{
				jQuery('#ContactContainer').html(responseData);
				location.hash = "#corporateGiftsHeader";
				returnvar = false;
				} 
	 		return returnvar;			
			},
		error: function(xhr, textStatus, errorThrown)
		{
			alert("sorry.. we're having some technical difficulties.");
			returnvar = false;
	 		return returnvar;
		}
	});    
	}
	
}


function SubmitBeerForLifeRequest() {				
	var datastring = jQuery('#b4lForm').serialize();
	var returnvar = '';
	var firstReturn = RunFormValidation('b4lForm');
	if (firstReturn == true){
	
	 jQuery.ajax(	
	{
		type: "POST",
		url: "components/Requests.cfc?method=BeerForLifeRequest",
		data: {formstring:datastring},
		dataType: "text",
		global: false,      
		
		success: function(responseData)
		{
			
			if (responseData == "CaptchaError") {
				returnvar = false;
				alert("Are you sure you're not a robot?");
				 }
			else if (responseData == "ERROR") {
				returnvar = false;
				alert("ERROR");
				 }
			else{
				jQuery('#beerForLifeForm').html(responseData);
				location.hash = "#beerForLifeForm";
				returnvar = false;
				} 
				return returnvar;	
			
			},
		error: function(xhr, textStatus, errorThrown)
		{
			alert("sorry.. we're having some technical difficulties.");
			
		}
	});   
	}
	
}

function errorValidation(element) {
		if ( $(element).attr('id') != 'couponCode' ) {
			var self = element;
			// if empty, remove filled class
			if ( $(element).is(':checkbox') ){
				if ( !$(element).is(':checked') && $(element).hasClass('required') ) {
					$(element).closest('.checkout-cell').addClass('missed-input');
				}
			}else if ( $(element).is('input:radio') ){
				// check if any of the radio buttons were selected
				if ( !$('input[name="'+$(element).attr('name')+'"]:checked').val() && $(element).hasClass('required') ) {
					$(element).closest('.checkout-cell').addClass('missed-input');
				}
			}else if (!$(element).val() || $.trim($(element).val()) == '' ) {   
				// if empty and required, add missed class
				if ( $(element).hasClass('required') ){
					$(element).closest('.checkout-cell').addClass('missed-input');
				}
			}else if($(element).is('select') && !$(element).val()) {
				if ( $(element).hasClass('required') ){
					$(element).closest('.checkout-cell').addClass('missed-input');
				}
			}else {// otherwise add filled and verified (if applicable) classes
				$(element).closest('.checkout-cell').removeClass('missed-input missed-email-input');
			}
		
			// email input has invalid email
			if ( $(element).hasClass('required') && $(element).attr('type') == 'email' && !validEmail($(element).val()) ) {
				$(element).closest('.checkout-cell').addClass('missed-input missed-email-input');
			}
		
			//Password input has invalid Password
			if ( $(element).hasClass('required') && $(element).attr('type') == 'password' && !validPassword($(element).val()) ) {
				switch(passwordErrorControl($(self))) {
					case 'empty-password':
						$(self).closest('.checkout-cell').addClass('missed-input empty-password-input');
						$(self).siblings('.input-error').children().eq(1).text('Please enter a password.');
						break;
					case 'password-with-spaces':
						$(self).closest('.checkout-cell').addClass('missed-input password-with-spaces');
						$(self).siblings('.input-error').children().eq(1).text('Passwords cannot contain spaces.');
						break;
					case 'passwords-are-different':
						$(self).closest('.checkout-cell').addClass('missed-input passwords-are-different');
						$(self).siblings('.input-error').children().eq(1).text('Your Passwords are different.  Please try again.');
						break;
					default:
						break;
				}
			}
		}
	}   



// END Ian added this

// detect credit card by first character
function creditCardTypeFromNumber(num) {
   num = num.replace(/[^\d]/g,'');
   	if (num.match(/^5/)) {
		return 'mc';
   	}else if (num.match(/^4/)) {
		return 'visa';
   	}else if (num.match(/^6/)) {
		return 'disc';
   	}else if (num.match(/^3/)) {
		return 'amex';
	}
   return 'UNKNOWN';
}

// detect width of device
function windowCheck(){
	if ( typeof(window.getComputedStyle) != 'undefined' ){

		var content = window.getComputedStyle(
			document.body, ':after'
		).getPropertyValue('content');

	}else {
		var content = "desktop";
	}
	return content;
}

// check if valid email 
function validEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validPhone(phone){
	var re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
	return re.test(phone);
}
function validPassword(passwordField) {
	if(!$(passwordField).val()) {
		return false;
	}
    var hasLength = $(passwordField).val().length;
	var hasSpaces = ($(passwordField).val().indexOf(' ') > -1) ? false : true;


	return hasSpaces && hasLength;
}
function passwordsEqual() {
    var passwordOneField = $('#passwordOne');
    var passwordTwoField = $('#passwordTwo');
    if(passwordOneField.val().length && passwordTwoField.val().length && passwordOneField.val() != passwordTwoField.val() ) {
        return false;
    }
    return true;
}
function passwordErrorControl(passwordField) {
	// console.log('passwordField = %O', passwordField);
	var passwordFieldValue = passwordField.val();
	// console.log('password Value = %O', passwordFieldValue);


	if(!passwordFieldValue) {
		return 'empty-password';
	}
	if(passwordFieldValue.indexOf(' ') > -1) {
		return 'password-with-spaces';
	}

	if(!passwordsEqual()) {
		return 'passwords-are-different';
	}
}

// home hero 
var homeCurrent = 0;
var homeSlide;
function changeSlide(homeCurrent){
	// remove active class from all elements
	$('.home-nav-link, #homeHeroNav li, .home-hero-img').removeClass('active');
	$('.home-nav-link:eq('+homeCurrent+') .home-nav-img .sprite-img').each(function(){
    	$(this).attr('class','sprite-img '+$(this).attr('data-inactive'));
    });
    $('.home-nav-link .home-nav-text .sprite-img').attr('class','sprite-img sprite-right-gray-shift');
    $('.home-nav-link .home-nav-text').removeClass('black-text');
    // add active class to new slide
	$('.home-nav-link:eq('+homeCurrent+'), #homeHeroNav li:eq('+homeCurrent+'), .home-hero-img:eq('+homeCurrent+')').addClass('active');
	$('.home-nav-link .home-nav-img .sprite-img').not(':eq('+homeCurrent+')').each(function(){
        	$(this).attr('class','sprite-img '+$(this).attr('data-inactive'));
        });
    $('.home-nav-link:eq('+homeCurrent+') .home-nav-img .sprite-img').each(function(){
		$(this).attr('class','sprite-img '+$(this).attr('data-active'));
    });
    $('.home-nav-link:eq('+homeCurrent+') .home-nav-text').addClass('black-text');
    $('.home-nav-link:eq('+homeCurrent+') .home-nav-text .sprite-img').attr('class','sprite-img sprite-right-shift');
}

function initSlider(homeCurrent){
	window.sliderTimer = setInterval(function(){
        // remove active class from all elements
        $('.home-nav-link, #homeHeroNav li, .home-hero-img').removeClass('active');
        $('.home-nav-link:eq('+homeCurrent+') .home-nav-img .sprite-img').each(function(){
        	$(this).attr('class','sprite-img '+$(this).attr('data-inactive'));
        });
        $('.home-nav-link .home-nav-text .sprite-img').attr('class','sprite-img sprite-right-gray-shift');
        $('.home-nav-link .home-nav-text').removeClass('black-text');

        homeCurrent++;
        if ( homeCurrent == homeSlide ){
            homeCurrent = 0; 
        }
        $('.home-nav-link:eq('+homeCurrent+'), #homeHeroNav li:eq('+homeCurrent+'), .home-hero-img:eq('+homeCurrent+')').addClass('active');
        $('.home-nav-link:eq('+homeCurrent+') .home-nav-img .sprite-img').each(function(){
        	$(this).attr('class','sprite-img '+$(this).attr('data-active'));
        });
        $('.home-nav-link:eq('+homeCurrent+') .home-nav-text').addClass('black-text');
        $('.home-nav-link:eq('+homeCurrent+') .home-nav-text .sprite-img').attr('class','sprite-img sprite-right-shift');
    },5000);
}
function testSlider(){
	// desktop and tablet
	if ( ( windowCheck().indexOf('desktop') > -1 || windowCheck().indexOf('tablet') > -1 ) && !$('body').hasClass('lt-ie9') ){
		$('#testQuotesSlider').bxSlider({
			auto: true,
			autoControls: false,
			pause: 5000,
			mode: 'vertical',
			slideMargin: 0,
			pagerCustom: '#testQuotesNav',
			controls: false
		});
	}else {
		$('#testQuotesSlider').bxSlider({
			auto: true,
			autoControls: false,
			pause: 5000,
			pagerCustom: '#testQuotesNav',
			controls: false
		});
	}
}
// address auto complete
var placeSearch, autocomplete;
var streetOne = '';
var streetTwo = '';
var componentForm = {
    street_number: {
        type: 'short_name',
        id: 'addressOne'
    },
    route: {
        type: 'short_name',
        id: 'addressOne'
    },
    locality: {
        type: 'long_name',
        id: 'city'
    },
    administrative_area_level_1: {
        type: 'short_name',
        id: 'state'
    },
    postal_code: {
        type: 'short_name',
        id: 'zip'
    },
    country: {
        type: 'short_name',
        id: 'country'
    }
};
function initAutocomplete() {
// Create the autocomplete object, restricting the search to geographical
// location types.
autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('addressOne')),
    {types: ['geocode']});
autocomplete.setComponentRestrictions({'country': ['us', 'ca']});
// When the user selects an address from the dropdown, populate the address
// fields in the form.
autocomplete.addListener('place_changed', fillInAddress);
}
function addressComponentsToObject(addressComponents){
    var arr = addressComponents || [];
    var retval = {};
    for(var i = 0, j = arr.length; i < j; i++){
        var component = arr[i] || {};
        var types = component.types || [];
        var type = types[0] || "NOT_FOUND";
        retval[type] = component;
    }
    return retval;
}
function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    var components = addressComponentsToObject(place.address_components);
    
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            if ( addressType == 'street_number' ) {
                streetOne = place.address_components[i][componentForm[addressType].type];
            }else if ( addressType == 'route' ){
                streetTwo = place.address_components[i][componentForm[addressType].type];
            }else if ( addressType == 'country' ){
                var country = place.address_components[i][componentForm[addressType].type];
                var lowerCountry = country.toLowerCase();
                $('#'+componentForm[addressType].id).val(lowerCountry);
            }else {
                var val = place.address_components[i][componentForm[addressType].type];
                $('#'+componentForm[addressType].id).val(val);
                $('#'+componentForm[addressType].id).closest('.checkout-cell').removeClass('missed-input');
            }
        }
    }
  
    document.getElementById('addressOne').value = streetOne + ' ' + streetTwo;
    document.getElementById('zip').focus();
    document.getElementById('zip').blur();
    $('#zip').closest('.checkout-cell').removeClass('missed-input');
    // tracking
    if ( document.location.href.indexOf('checkout.cfm') > -1 ){
        var tiTemplate = 'Checkout';
    }else {
        var tiTemplate = 'Add to Cart Page';
    }
    ga('tiAuto.send', 'event', tiTemplate, 'Address Autocomplete', '', {
        'nonInteraction': 1
    });
}
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
        });
    }
}
// end address autocomplete
$(document).ready(function() {
	/////////
	// global
	/////////
	// add class if not touch device 
	if ( is_touch_device() == false ) {
		$('body').addClass('no-touch');
	}

	// tooltips for mobile
	if ( typeof($().modal) != 'undefined' ){
		$('.tooltip .sprite-question-large').popover({
			container: 'body',
			placement: 'top',
			content: function() {
				return $(this).closest('.tooltip').find('.tooltip-content').text();
			}
		});


		$('.shippingpolicy').popover({
			container: 'body',
			placement: 'top',
			content: function() {
				return $(this).closest('.tooltip').find('.tooltip-content').text();
			}
		});

		$('.tooltip .shippingpolicy').on('click', function(e){
			e.stopPropagation();
		});
		
		$('.tooltip .sprite-question-large, .tooltip .sprite-question').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
		});
		
		// hide on body click
		$('body').on('click', function(e){
			$('.tooltip .sprite-question-large').popover('hide');
		});
		$('body').on('click', function(e){
			$('.tooltip .shippingpolicy').popover('hide');
		});
		
		  try {//doing this for optimization purposes to only include this script on beerforlifepage
				var IsBeerForLife = window.location.href.indexOf('beerforlife.html');
				//if at beerforlife page then render this javascript
    			if(IsBeerForLife > 0) {
					$('.tooltip .sprite-question.b4l, .tooltip .sprite-question-large.b4l').on('click', function(e){
						e.preventDefault();
						e.stopPropagation();
								$.ajax({
								type: 'POST',
								url: 'components/Requests.cfc?method=retrieveContextRulesText',
								data: {
								},
								success: function(modalcontent){
										displayModalContestRules(modalcontent);
								}
							});
					});
		
		
					$('body').on('click', function(event){
						var self = this;
						if(($('#b4l_tiModalMessage').length && $('#b4l_tiModalMessage').css('display') == "block" && !$(event.target).parents('#b4l_tiModalMessage').length && $(event.target).attr('id') != 'b4l_tiModalMessage') || $(event.target).hasClass('ti-close-modal') || $(event.target).hasClass('sprite-gray-close')) {
							//remove css once ti-active is added to master css stylesheet
							$('#b4l_tiModalMessage').removeClass('ti-active').css({'display':'none'});
							$('#overlay').removeClass('ti-active').css({'display': 'none'});
						}
					});
					
				}//end if isbeerforlife
			}catch(err) {
			console.log('%c error in document.ready for beerforlife page.  Error to follow:');
			console.warn(err);
  			}
		
		
	}



	// country select
	$('#headerShip input').change(function(){
		$('#headerShip .sprite-img').each(function(){
			$(this).attr('class','sprite-img '+$(this).attr('data-sprite-off'));
		});
		var $country = $('#headerShip input:checked');
		/* Ian added this condition to link to amazingclubs.ca */
		if($country.val() == 'ca') {
			document.location.href = 'https://www.amazingclubs.ca';
			}
		$('#'+$country.val()).find('.sprite-img').attr('class','sprite-img '+$('#'+$country.val()).find('.sprite-img').attr('data-sprite-on'));
		
	});

	// search autocomplete
	$(function() {
	    var availableTags = [
			{
			label: '<a href="../bacon.html">Bacon Club</a>',
			value: 'Bacon Club'
			},
			{
			label: '<a href="../bagel.html">Bagel Club</a>',
			value: 'Bagel Club'
			},
			{
			label: '<a href="../bbq.html">BBQ Sauce Club</a>',
			value: 'BBQ Sauce Club'
			},
			{
			label: '<a href="../beer.html">Beer Club</a>',
			value: 'Beer Club'
			},
			{
			label: '<a href="../breakfastofthemonthclub.html">Breakfast Club</a>',
			value: 'Breakfast Club'
			},
			{
			label: '<a href="../cake.html">Cake Club</a>',
			value: 'Cake Club'
			},
			{
			label: '<a href="../candle.html">Candle Club</a>',
			value: 'Candle Club'
			},
			{
			label: '<a href="../cheese.html">Cheese Club</a>',
			value: 'Cheese Club'
			},
			{
			label: '<a href="../ccake.html">Cheesecake Club</a>',
			value: 'Cheesecake Club'
			},
			{
			label: '<a href="../chocolate.html">Chocolate Club</a>',
			value: 'Chocolate Club'
			},
			{
			label: '<a href="../cigar.html">Cigar Club</a>',
			value: 'Cigar Club'
			},
			{
			label: '<a href="../coffee.html">Coffee Club</a>',
			value: 'Coffee Club'
			},
			{
			label: '<a href="../cookie.html">Cookie Club</a>',
			value: 'Cookie Club'
			},
			{
			label: '<a href="../cupcake.html">Cupcake Club</a>',
			value: 'Cupcake Club'
			},
			{
			label: '<a href="../cupcake-test.html">Cupcake Club</a>',
			value: 'Cupcake Club'
			},
			{
			label: '<a href="../dessert.html">Dessert Club</a>',
			value: 'Dessert Club'
			},
			{
			label: '<a href="../movdin.html">Dinner and a Movie Club</a>',
			value: 'Dinner and a Movie Club'
			},
			{
			label: '<a href="../dinner.html">Dinner Club</a>',
			value: 'Dinner Club'
			},
			{
			label: '<a href="../dogtreat.html">Dog Treat Club</a>',
			value: 'Dog Treat Club'
			},
			{
			label: '<a href="../flower.html">Flower Club</a>',
			value: 'Flower Club'
			},
			{
			label: '<a href="../fruit.html">Fruit Club</a>',
			value: 'Fruit Club'
			},
			{
			label: '<a href="../hotsauce.html">Hot Sauce Club</a>',
			value: 'Hot Sauce Club'
			},
			{
			label: '<a href="../icecream.html">Ice Cream Club</a>',
			value: 'Ice Cream Club'
			},
			{
			label: '<a href="../jamjelly.html">Jam and Jelly Club</a>',
			value: 'Jam and Jelly Club'
			},
			{
			label: '<a href="../jerkyofthemonthclub.html">Jerky Club</a>',
			value: 'Jerky Club'
			},
			{
			label: '<a href="../lobster.html">Lobster Club</a>',
			value: 'Lobster Club'
			},
			{
			label: '<a href="../movie.html">Movie Club</a>',
			value: 'Movie Club'
			},
			{
			label: '<a href="../necktie.html">Necktie Club</a>',
			value: 'Necktie Club'
			},
			{
			label: '<a href="../oliveoil.html">Olive Oil Club</a>',
			value: 'Olive Oil Club'
			},
			{
			label: '<a href="../pasta.html">Pasta Club</a>',
			value: 'Pasta Club'
			},
			{
			label: '<a href="../peanutbutterjelly.html">PB & J Club</a>',
			value: 'PB & J Club'
			},
			{
			label: '<a href="../peanutbutter.html">Peanut Butter Club</a>',
			value: 'Peanut Butter Club'
			},
			{
			label: '<a href="../pickleofthemonthclub.html">Pickle</a>',
			value: 'Pickel Club'
			},			
			{
			label: '<a href="../pieofthemonthclub.html">Pie Club</a>',
			value: 'Pie Club'
			},
			{
			label: '<a href="../pizza.html">Pizza Club</a>',
			value: 'Pizza Club'
			},
			{
			label: '<a href="../popcorn.html">Popcorn Club</a>',
			value: 'Popcorn Club'
			},
			{
			label: '<a href="../salsa.html">Salsa Club</a>',
			value: 'Salsa Club'
			},
			{
			label: '<a href="../steak.html">Sirloin Club</a>',
			value: 'Sirloin Club'
			},
			{
			label: '<a href="../tea.html">Tea Club</a>',
			value: 'Tea Club'
			},
			{
			label: '<a href="../teddy_bear.html">Teddy Bear Club</a>',
			value: 'Teddy Bear Club'
			},
			{
			label: '<a href="../wine.html">Wine Club</a>',
			value: 'Wine Club'
			},
			{
			label: '<a href="../varietyofthemonthclub.html">Variety Club</a>',
			value: 'Variety Club'
			},
			{
			label: '<a href="../giftcertificates.html">Gift Certificates</a>',
			value: 'Variety Club'
			}
	    ];
	    if ( typeof($.ui) !='undefined' ){
	    	$('#search').autocomplete({
				source: availableTags,
				appendTo: '#headerSearchForm',
				html: true, 
				open: function(event, ui){
					if ( $('#headerSearchForm .ui-autocomplete:visible').length ) {
						$('#headerSearch').addClass('search-show-complete');
						// console.log('dropdown visible');
					}
				},
				close:  function(event, ui){
					$('#headerSearch').removeClass('search-show-complete');
				}
		    });
	    }
	});


	///////////
	// main nav
	///////////
	// wrap nav for IE
    if ( $('body.lt-ie9').length ){
    	$('#mainNavTopWrap').wrap('<div class="ie-wrap" />');
    	$('#mainNavBottom').appendTo($('.ie-wrap'));
    }
    
	// navigation
	if ( is_touch_device() == false ) {

		$('#navShopBy').on('mouseenter', function() {
            var nav = $(this);
            nav.data('isHovered', true);
            clearTimeout(tiClear);
            tiOverClear = setTimeout(function() {
                if (nav.data('isHovered')) {
                    nav.addClass('nav-open');
                    $('#mainWrap').addClass('sub-nav-open');
                }
            }, 250);
        }).on('mouseleave', function() {
			var nav = $(this);
			nav.data('isHovered', false);
			clearTimeout(tiOverClear);
        	tiClear = setTimeout(function() {
				nav.removeClass('nav-open');
				$('#mainWrap').removeClass('sub-nav-open');
			}, 250);
        });

        // need help?
        $('#headerHelp').on('mouseenter', function() {
            $(this).addClass('help-open');
        }).on('mouseleave', function() {
			$(this).removeClass('help-open');
        });

	}else {
		$('#navShopBy .nav-header').bind('touchstart mouseenter', function(e){  
			(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
			e.stopImmediatePropagation();
			$('#navShopBy').toggleClass('nav-open');
			$('#mainWrap').toggleClass('sub-nav-open');
			$('#navShopBy .sprite-img.visible-ib-xs').toggleClass('sprite-orange-down sprite-orange-up');
		});
		// not on mobile
		if ( windowCheck().indexOf('mobile') == -1 ) {
			$('#navShopBy').bind('mouseleave', function(e){
				(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	            var nav = $(this);
	            nav.data('isHovered', false);
	            clearTimeout(tiOverClear);
	            tiClear = setTimeout(function() {
	                nav.removeClass('nav-open');
	                $('#mainWrap').removeClass('sub-nav-open');
	            }, 250);
	            $('#navShopBy .sprite-img.visible-ib-xs').removeClass('sprite-orange-down').addClass('sprite-orange-up');
	        });
		}
        

		$('#navShopBy').bind('touchstart', function(e){
		  e.stopPropagation();
		});	

		// need help?
        $('#headerHelp').click(function(e){
        	e.stopPropagation();
        	$(this).toggleClass('help-open');
        });
        $('#headerMobileHelp > a').click(function(e){
        	e.stopPropagation();
        	$('#headerMobileHelpNav').slideToggle();
        });

        // hide open flyouts on body click
		$('body').bind('touchstart', function(e){
			// shop by flyout
			$('#mainNav, .ie-wrap').removeClass('main-nav-open');
			$('#navShopBy').removeClass('nav-open');
			$('#mainWrap').removeClass('main-nav-open');
			$('#headerSearch').removeClass('nav-open');
			$('#headerNavToggleWrap, #checkoutNavToggleWrap').removeClass('main-nav-open');
			$('#headerNavToggleWrap, #checkoutNavToggleWrap').find('.sprite-img').removeClass('sprite-close').addClass('sprite-hamburger');
			// need help?
			$('#headerHelp').removeClass('help-open');
			// search autocomplete
			if ( $('#headerWrap.search-open').length ){
				$('#headerSearch').removeAttr('style');
				$('#headerWrap').removeClass('search-open');
			}
			$('#headerSearch').removeClass('search-show-complete');
		});

		// prevent from closing
		$('#headerNavToggleWrap, #checkoutNavToggleWrap, #headerTabSearch, #headerSearch, #mainNav').bind('touchstart', function(e){
			e.stopPropagation();
		});
	}

	// hamburger menus
	$('#headerNavToggleWrap, #checkoutNavToggleWrap').click(function(e){
		e.stopPropagation();
		$('#mainNav, .ie-wrap').toggleClass('main-nav-open');
		$('#headerSearch').toggleClass('nav-open');
		$('#mainWrap').toggleClass('main-nav-open');
		$(this).toggleClass('main-nav-open');
		$(this).find('.sprite-img').toggleClass('sprite-hamburger sprite-close');
	});

	$('.nav-close-link').click(function(e){
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
		e.stopPropagation();
		// hide all nav on tablet and desktop
		if ( windowCheck().indexOf('tablet') > -1 || windowCheck().indexOf('desktop') > -1 ){
			// hide shop by flyout
			$('#mainNav, .ie-wrap').removeClass('main-nav-open');
			$('#navShopBy').removeClass('nav-open');
			$('#mainWrap').removeClass('main-nav-open');
			$('#headerSearch').removeClass('nav-open');
			$('#headerNavToggleWrap, #checkoutNavToggleWrap').removeClass('main-nav-open');
			$('#headerNavToggleWrap, #checkoutNavToggleWrap').find('.sprite-img').removeClass('sprite-close').addClass('sprite-hamburger');
		}else {
			// hide subnav on mobile
			$('#navShopBy').removeClass('nav-open');
			$('#mainWrap').removeClass('sub-nav-open');
			$('#navShopBy .sprite-img.visible-ib-xs').addClass('sprite-orange-down').removeClass('sprite-orange-up');
		}
	})

	// search on tablet
	$('#headerTabSearch').click(function(e){
		e.stopPropagation();
		$('#headerSearch').show();
		$('#headerWrap').addClass('search-open');
	});

	$('#headerSearch').click(function(e){
		e.stopPropagation();
	});


	///////
	// home
	///////
   	homeSlide = $('.home-hero-img').length;
    
    if ( homeSlide > 1 ) {
    	initSlider(homeCurrent);	
    }    

    $('#homeHeroNav li').click(function(){
    	homeCurrent = $(this).index();
    	clearInterval(sliderTimer);
	    changeSlide(homeCurrent);
	    initSlider(homeCurrent);
    });

    // change on hover 
    if ( !is_touch_device() ){
    	$('.home-nav-link').on('mouseenter', function(e){
	    	homeCurrent = $(this).attr('data-slide');
	    	clearInterval(sliderTimer);
	        changeSlide(homeCurrent);
	    }).on('mouseleave', function() {
			initSlider(homeCurrent);
	    });
    }

    $('.header-phone-number').on('click', function(event){
    	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	});


	// footer 
	$('#backToTop').click(function(){
		$('html, body').animate({ scrollTop: 0 });
	});

	//////////////////
	// product listing
	//////////////////
	// change page layout
	$('.cat-nav-link').click(function(){
		if ( $('#plProds').attr('class') != $(this).attr('data-layout') ){
			$('#plProds').attr('class', $(this).attr('data-layout'));
			$('#plProds .prod-cell').toggleClass('col-md-12 col-md-3');
			$('#plView').removeClass('grid list').addClass($(this).attr('data-layout'));
		}
	});
	// filter functionality
	$('.pl-filter').click(function(){
		$(this).siblings('.pl-filter-list').slideToggle();
		$(this).toggleClass('pl-filter-open');
	});
	$('.pl-filter-label').click(function(){
		$('.pl-filters-wrap, body').toggleClass('filters-open');
	});
	$('#plFilterClose').click(function(){
		$('.pl-filters-wrap, body').removeClass('filters-open');
	});
	// add filter
	$('.pl-filters-wrap select').change(function(){
		// filter
		var filterId = $(this).attr('id');
		var filterVal = $(this).val();
		var filterTxt = $(this).children(':selected').text();
		
		// remove any current buttons
		$('.pl-filter-remove a[data-filter="'+filterId+'"]').each(function(){
			$(this).closest('.pl-filter-remove').remove();			
		});

		// add new buttons
		$('.filter-list').append('<li class="pl-filter-remove">'+
			'<a href="javascript:void(0);" data-filter="'+filterId+'" data-value="'+filterVal+'">'+
				'<span class="sprite-img sprite-gray-close"></span> '+filterTxt+
			'</a>'+
		'</li>')
		$('.filter-clear-all').show();
		
		/* Ian added this to automatically close the filters selection for mobile */
		$('.pl-filters-wrap, body').removeClass('filters-open');
		
		/* Ian added this to show this element */
		$('#plFilterAppliedWrap').removeClass('hidden-md');
	});

	// remove filter
	$('.filter-list').on('click', '.pl-filter-remove a', function(){

		// filter
		var filterId = $(this).attr('data-filter');
		var filterVal = $(this).attr('data-value');

		// reset value of select
		$('#'+filterId).prop('selectedIndex', 0);

		// remove button
		$('.pl-filter-remove a[data-value="'+filterVal+'"]').each(function(){
			$(this).closest('.pl-filter-remove').remove();
			
			/* Ian added this to update the filter results when a button is removed */
			NewFilterSubmit();
		});
		
		/* Ian added this to automatically close the filters selection for mobile */
		$('.pl-filters-wrap, body').removeClass('filters-open');
	});

	// clear all filters
	$('.filter-clear-all').click(function(){
		// reset selects
		$('.pl-filters-wrap select').each(function(){
			$(this).prop('selectedIndex', 0);
		});

		// clear lists
		$('.filter-list').html('')
		$('.filter-clear-all').hide();
		
		/* Ian added this to update the filter results when a button is removed */
		NewFilterSubmit();
		
		/* Ian added this to automatically close the filters selection for mobile */
		$('.pl-filters-wrap, body').removeClass('filters-open');
	});


	// testimonials
	if ( $('#testQuotes').length ){
		testSlider();
	}

	//////////
	// product
	//////////
	// pay in full/per shipment
	//icgdev changed paymentType to strpaymentTerm, Pay Full to Pay In Full
	$('input[name="strpaymentTerm"]').change(function(){
		if ( $('input[name="strpaymentTerm"]:checked').val() == 'Pay In Full' ){
			$('#prodFormDuration').attr('class','prod-form-options pay-in-full-selected');
			$('#ongoinglable').attr('class','prod-form-option white-bg pay-per-shipment');
			$('#ongoinginput').prop('checked', false);
		}else {
			$('#prodFormDuration').attr('class','prod-form-options pay-per-ship-selected');
			
		}
	});
	// add active classes
	// if ( document.location.href.indexOf('product')>-1 ){
	//	$('#mainNav a:contains("Beer Club")').addClass('active');
	//}else if ( document.location.href.indexOf('variety')>-1) {
	//	$('#mainNav a:contains("Variety Club")').addClass('active');
	//}
	// fancy labels
	$('.prod-form-option input').on('change', function(event){		
	    var label = $(this).closest('.prod-form-option');
	    var parentWrapper = $(label).parents('.prod-form-options');
	    var previouslySelectedRadio = parentWrapper.find('label.selected');
	    if($(label).hasClass('selected') && $(label).children(':checkbox').length) {
	    	$(label).removeClass('selected');
		}else {
            if (previouslySelectedRadio.length) {
                previouslySelectedRadio.removeClass('selected');
            }

            $(label).addClass('selected');
        }
	});

	// what you receive
	$('.prod-receive-tab-header').click(function(){
		$(this).toggleClass('receive-open');
		$(this).find('.sprite-img').toggleClass('sprite-gray-up sprite-gray-down');
		$(this).siblings('.prod-receive-tab-content').slideToggle();
	});
	// first open on desktop
	// Ian added tablet and mobile to this 
	if ( windowCheck().indexOf('tablet') > -1 || windowCheck().indexOf('desktop') > -1 || windowCheck().indexOf('mobile') > -1  ) {
		$('#prodContains .product-receive-tab:eq(0) .prod-receive-tab-header').addClass('receive-open');
		$('#prodContains .product-receive-tab:eq(0)').find('.sprite-img').toggleClass('sprite-gray-up sprite-gray-down');
		$('#prodContains .product-receive-tab:eq(0)').find('.prod-receive-tab-content').show();
	}
    // mobile product tabs
    $('.mobile-prod-tab-header').click(function(){
    	var $tab = $(this);
    	// remove active from current tab
    	$('.product-tab-wrap').not($tab.closest('.product-tab-wrap')).removeClass('active');
    	$('.product-tab-wrap').not($tab.closest('.product-tab-wrap')).find('.sprite-img').removeClass('sprite-white-up').addClass('sprite-gray-down');
    	// add active to new tab
    	$tab.closest('.product-tab-wrap').toggleClass('active');
    	$tab.find('.sprite-img').toggleClass('sprite-gray-down sprite-white-up');
    	// scroll to top
    	$('html,body').animate({
			scrollTop: ( $tab.closest('.product-tab-wrap').offset().top )
		});
    });
    // faq
    $('.prod-faq-q').click(function(){
		$(this).find('.sprite-img').toggleClass('sprite-gray-down sprite-gray-up');
		$(this).siblings('.prod-faq-a').slideToggle();
	});
	// product image
	if ( $('#prodImgSlides.bxslider').length ){
		$('#prodImgSlides').bxSlider({
			pagerCustom: '#prodImgNav',
			infiniteLoop: false,
			controls: false, 
			onSliderLoad: function(){
				// make sure page scrolls to correct section
				if ( document.location.hash.length ) {
					$(window).scrollTop($(document.location.hash).offset().top);
				}
			}
		});
	}
	// compare table on mobile
	if ( $('#prodTableSlider').length && windowCheck().indexOf('mobile') >-1 ){
		$('#prodTableSlider').bxSlider({
		    pagerCustom: '#prodCompareNav',
			infiniteLoop: false,
		    controls: false
		});
	}

	// product zoom
	$('#productZoomAnchor').click(function(e){
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
		$('#overlay, #productZoom').fadeIn('fast');
		if ( $('#prodModalImgSlides.bxslider').length ){
			$('#prodModalImgSlides').bxSlider({
			    pagerCustom: '#prodModalImgNav',
			    infiniteLoop: false,
			    controls: false
			});	
		}		
		$('html, body').animate({ scrollTop: $('#productZoom').offset().top });
	});

	// hide + show button
	if ( $('#productCreate').length ){
		$(window).bind('scroll', function(){
			if ( $(document).scrollTop() > ( $('#productCreate').offset().top + $('#productCreate').height() ) || $(document).scrollTop() < $('#productCreate').offset().top ){
				$('#prodStickyCTAWrap').removeClass('hidden');
			}else {
				$('#prodStickyCTAWrap').addClass('hidden');
			}
		});

		// scroll to buy box
		$('#prodStickyCTA').click(function(){
			$('html,body').animate({ scrollTop: $('#productCreate').offset().top });
		});
	}

	///////
	// cart
	///////
	// view shipments
	$('.cart-view-ship').click(function(){
		$(this).closest('.cart-row-wrap').find('.cart-shipments').slideToggle('fast', function(){
		// on mobile - if open, scroll to section
		if ( windowCheck().indexOf('mobile')>-1 && $(this).closest('.cart-row-wrap').find('.cart-shipments:visible').length ) {
		$('html,body').animate({ scrollTop: $(this).closest('.cart-row-wrap').find('.cart-shipments').offset().top });
		}
		});
		$(this).closest('.cart-row-wrap').find('.cart-gift-msg').hide();
		$('.cart-view-msg .sprite-img').attr('class','sprite-img sprite-shift-down');
		// update verbiage
		$(this).html( ($(this).text().indexOf('View')>-1) ? 'Hide Shipments <span class="sprite-img sprite-shift-up"></span>' : 'View Shipments <span class="sprite-img sprite-shift-down"></span>' );
		// make sure gift is closed
		$(this).closest('.cart-row').find('.cart-view-msg').html('View Gift Message <span class="sprite-img sprite-shift-down"></span>');
	});
	// view gift message
	// 
	$('.cart-view-msg').click(function(){
		$(this).closest('.cart-row-wrap').find('.cart-gift-msg').slideToggle('fast', function(){
		// on mobile - if open, scroll to section
		if ( windowCheck().indexOf('mobile')>-1 && $(this).closest('.cart-row-wrap').find('.cart-gift-msg:visible').length ) {
		$('html,body').animate({ scrollTop: $(this).closest('.cart-row-wrap').find('.cart-gift-msg').offset().top });
		}
		});
		$(this).closest('.cart-row-wrap').find('.cart-shipments').hide();
		$('.cart-view-ship .sprite-img').attr('class','sprite-img sprite-shift-down');
		// update verbiage
		$(this).html( ($(this).text().indexOf('View')>-1) ? 'Hide Gift Message <span class="sprite-img sprite-shift-up"></span>' : 'View Gift Message <span class="sprite-img sprite-shift-down"></span>' );

		// make sure cart is closed
		$(this).closest('.cart-row').find('.cart-view-ship').html('View Shipments <span class="sprite-img sprite-shift-down"></span>');
	});

	///////////
	// checkout
	///////////
	// view all items
	$('#checkoutViewAll').click(function(){
		$('#checkoutSummaryExtra').slideDown();
		$(this).hide();
		$('#checkoutViewLess').show();
	});
	// view less items
	$('#checkoutViewLess').click(function(){
		$('#checkoutSummaryExtra').slideUp();
		$(this).hide();
		$('#checkoutViewAll').show();
	});
	// coupon code
	$('#checkoutCodeApply').click(function(e){
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
		$('#checkoutCodeApplied, #checkoutCodeApply').hide();
		$('#checkoutCodeEnter').show();
	});
	// same as shipping address
	//icg david add
	$('#sameAsShip').change(function(){
		if ( $(this).is(':checked') ){
			//alert($('#sameAsShip').val());
			if ($('#sameAsShip').val() == 'Show' ){
				$('#shippAddressWrap').show();
	
				var add = $('#shipAddress').find(':selected').val();
				if ( $.trim(add) != '' ) {
					var addSplit = add.split('|');
					$('#addressOne').val(addSplit[0]).change();
					$('#addressTwo').val(addSplit[1]).change();
					$('#city').val(addSplit[2]).change();
					$('#state').val(addSplit[3]).change();
					$('#zip').val(addSplit[4]).change();
					//$('#phone').val(addSplit[5]).change();
					//$('#email').val(addSplit[6]).change();
					$('#country').val(addSplit[7]).change();
					//$('#firstName').val(addSplit[8]).change();
					//$('#lastName').val(addSplit[9]).change();
				}
			}
			else if ($('#sameAsShip').val() == 'Populate'){
				
				var add = $('#shipAddress').find(':selected').val();
				//alert('hello ' + add);
				if ( $.trim(add) != '' ) {
					var addSplit = add.split('|');
					$('#addressOne').val(addSplit[0]).change();
					$('#addressTwo').val(addSplit[1]).change();
					$('#city').val(addSplit[2]).change();
					$('#state').val(addSplit[3]).change();
					$('#zip').val(addSplit[4]).change();
					//$('#phone').val(addSplit[5]).change();
					//$('#email').val(addSplit[6]).change();
					$('#country').val(addSplit[7]).change();
					//$('#firstName').val(addSplit[8]).change();
					//$('#lastName').val(addSplit[9]).change();
				}
				$('#shippAddressWrap').hide();

			}

		}else {
			$('#shippAddressWrap').hide();
			$('#addressOne').val('').change();
			$('#addressTwo').val('').change();
			$('#city').val('').change();
			$('#state').val('AL').change();
			$('#zip').val('').change();
			//$('#phone').val('').change();
			//$('#email').val('').change();
			$('#country').val('').change();
			//$('#firstName').val('').change();
			//$('#lastName').val('').change();
		}
	});	
	//icg david add
	$('#sameAsShipWithName').change(function(){
		if ( $(this).is(':checked') ){
			//alert($('#sameAsShipWithName').val());
			if ($('#sameAsShipWithName').val() == 'Show' ){
				$('#shippAddressWrap').show();
	
				var add = $('#shipAddressWithName').find(':selected').val();
				if ( $.trim(add) != '' ) {
					var addSplit = add.split('|');
					$('#addressOne').val(addSplit[0]).change();
					$('#addressTwo').val(addSplit[1]).change();
					$('#city').val(addSplit[2]).change();
					$('#state').val(addSplit[3]).change();
					$('#zip').val(addSplit[4]).change();
					$('#phone').val(addSplit[5]).change();
					$('#email').val(addSplit[6]).change();
					$('#country').val(addSplit[7]).change();
					$('#firstName').val(addSplit[8]).change();
					$('#lastName').val(addSplit[9]).change();
				}
			}
			else if ($('#sameAsShipWithName').val() == 'Populate'){
				
				var add = $('#shipAddressWithName').find(':selected').val();
				//alert('hello ' + add);
				if ( $.trim(add) != '' ) {
					var addSplit = add.split('|');
					$('#addressOne').val(addSplit[0]).change();
					$('#addressTwo').val(addSplit[1]).change();
					$('#city').val(addSplit[2]).change();
					$('#state').val(addSplit[3]).change();
					$('#zip').val(addSplit[4]).change();
					$('#phone').val(addSplit[5]).change();
					$('#email').val(addSplit[6]).change();
					$('#country').val(addSplit[7]).change();
					$('#firstName').val(addSplit[8]).change();
					$('#lastName').val(addSplit[9]).change();
				}
				$('#shippAddressWrap').hide();

			}

		}else {
			$('#shippAddressWrap').hide();
			$('#addressOne').val('').change();
			$('#addressTwo').val('').change();
			$('#city').val('').change();
			$('#state').val('AL').change();
			$('#zip').val('').change();
			$('#phone').val('').change();
			$('#email').val('').change();
			$('#country').val('').change();
			$('#firstName').val('').change();
			$('#lastName').val('').change();
		}
	});	
	//use address
	//icg david add
	$('#shipAddress').change(function(){
		var add = $(this).find(':selected').val();
		if ( $.trim(add) == '' ) {
			$('#addressOne').val('').change();
			$('#addressTwo').val('').change();
			$('#city').val('').change();
			$('#zip').val('').change();
			$('#state').val('AL').change();
			//$('#phone').val('').change();
			//$('#email').val('').change();
			$('#country').val('').change();
		}else {
			var addSplit = add.split('|');
			$('#addressOne').val(addSplit[0]).change();
			$('#addressTwo').val(addSplit[1]).change();
			$('#city').val(addSplit[2]).change();
			$('#state').val(addSplit[3]).change();
			$('#zip').val(addSplit[4]).change();
			//$('#phone').val(addSplit[5]).change();
			//$('#email').val(addSplit[6]).change();
			$('#country').val(addSplit[7]).change();
		}
	});
	//use address
	//icg david add
	
	
		 // Email matching error handling
	$('#confirmEmail').on('blur', function() {
		var $emailField        = $('#userEmail');
		var $confirmEmailField = $(this);
		var $confirmEmailWrap  = $confirmEmailField.closest('.form-group');
		if (
			$emailField.val().length
			&& $confirmEmailField.val().length
			&& $emailField.val() != $confirmEmailField.val()
		
		) {
			$confirmEmailWrap.addClass('email-match-error emails-are-different');
			$confirmEmailWrap.find('.input-error')
			 .children().eq(1).text('Emails must match');
		} else {
			$confirmEmailWrap.removeClass('email-match-error emails-are-different');
			$confirmEmailWrap.find('.input-error')
			 .children().eq(1).text(' Please enter a valid email address.');
		}
	});

        // Count characters for essay field
		$('#userEssay').on('input', function() {
			var $self = $(this);
			
			var words_count = countWords($self.val());
			var max_word_count = 250;
			if (words_count > max_word_count) {
				var trimmedtext = getSentenceWithWordLimit($self.val(),max_word_count);
				$self.val(trimmedtext);
			}
			$self.closest('.form-group')
				.find('.characters-typed')
				.text(words_count);
		});
		
	$('#shipAddressWithName').change(function(){
		var add = $(this).find(':selected').val();
		if ( $.trim(add) == '' ) {
			$('#addressOne').val('').change();
			$('#addressTwo').val('').change();
			$('#city').val('').change();
			$('#zip').val('').change();
			$('#state').val('AL').change();
			$('#phone').val('').change();
			$('#email').val('').change();
			$('#country').val('').change();
			$('#firstName').val('').change();
			$('#lastName').val('').change();
		}else {
			var addSplit = add.split('|');
			$('#addressOne').val(addSplit[0]).change();
			$('#addressTwo').val(addSplit[1]).change();
			$('#city').val(addSplit[2]).change();
			$('#state').val(addSplit[3]).change();
			$('#zip').val(addSplit[4]).change();
			$('#phone').val(addSplit[5]).change();
			$('#email').val(addSplit[6]).change();
			$('#country').val(addSplit[7]).change();
			$('#firstName').val(addSplit[8]).change();
			$('#lastName').val(addSplit[9]).change();
		}
	});

	// default mask
	$('#ccNumber').mask('0000 0000 0000 0000');
	$('#cid').mask('0000');

	// credit card detection
	$('#ccNumber').keyup(function() {
		var cardType = creditCardTypeFromNumber($(this).val());
		if (cardType != 'UNKNOWN') {
		 	if (cardType == 'visa') {
				$('#ccNumberWrap').removeClass('mastercard discover amex').addClass('visa');
				$('#strCardType').val('visa');
			} else if (cardType == 'mc') {
				$('#ccNumberWrap').removeClass('visa discover amex').addClass('mastercard');
				$('#strCardType').val('mastercard');
			} else if (cardType == 'disc') {
		    	$('#ccNumberWrap').removeClass('visa mastercard amex').addClass('discover');
				$('#strCardType').val('Discover');
			} else if (cardType == 'amex') {
		    	$('#ccNumberWrap').removeClass('visa mastercard discover').addClass('amex');
				$('#strCardType').val('amex');
			}
			// console.log(cardType);
			// desktop
			$('#ccDesktop .sprite-img').not('.'+cardType).each(function(){
				$(this).attr('class','cc-option sprite-img '+$(this).attr('data-sprite-off')+' '+$(this).attr('data-sprite-card'));
			});
			$('#ccDesktop .sprite-img.'+cardType).attr('class','cc-option sprite-img '+$('#ccDesktop .sprite-img.'+cardType).attr('data-sprite-on')+' '+cardType);

			// masking
			if ( cardType == 'amex' ){
				$('#ccNumber').mask('0000 000000 00000');
			}else {
				$('#ccNumber').mask('0000 0000 0000 0000');
			}
		}else {
			$('#ccNumberWrap').removeClass('visa discover mastercard amex');
			$('#strCardType').val('visa');
			// desktop
			$('#ccDesktop .sprite-img').each(function(){
				$(this).attr('class','cc-option sprite-img '+$(this).attr('data-sprite-on')+' '+$(this).attr('data-sprite-card'));
			});
		}
	});
	// zip code mask
	$('.zipLookup[data-country]').keyup(function(){
		// check country
		var tiCountry = $(this).attr('data-country');
		if ( $('#'+tiCountry).val() == 'ca' ){
		// if Canada, match A1A 1A1
		$(this).mask('S0S 0S0');
		}else {
		// else US, only 5 numbers
		$(this).mask('00000');
		}
	});
	
	// order summary more/less 
	$('.checkout-summary-less').click(function(){
		$(this).closest('.checkout-summary-info').removeClass('open');
	});
	$('.checkout-summary-more').click(function(){
		$(this).closest('.checkout-summary-info').addClass('open');
	});
	// phone number mask
	$('#phone').mask('(000) 000-0000');
	


	function errorValidation(element) {
		if ( $(element).attr('id') != 'couponCode' ) {
			var self = element;
			// if empty, remove filled class
			if ( $(element).is(':checkbox') ){
				if ( !$(element).is(':checked') && $(element).hasClass('required') ) {
					$(element).closest('.checkout-cell').addClass('missed-input');
				}
			}else if ( $(element).is('input:radio') ){
				// check if any of the radio buttons were selected
				if ( !$('input[name="'+$(element).attr('name')+'"]:checked').val() && $(element).hasClass('required') ) {
					$(element).closest('.checkout-cell').addClass('missed-input');
				}
			}else if (!$(element).val() || $.trim($(element).val()) == '' ) {
				// if empty and required, add missed class
				if ( $(element).hasClass('required') ){
					$(element).closest('.checkout-cell').addClass('missed-input');
				}
			}else if($(element).is('select') && !$(element).val()) {
				if ( $(element).hasClass('required') ){
					$(element).closest('.checkout-cell').addClass('missed-input');
				}
			}else {// otherwise add filled and verified (if applicable) classes
				$(element).closest('.checkout-cell').removeClass('missed-input missed-email-input');
			}
		
			// email input has invalid email
			if ( ( $(element).attr('type') == 'email' || $(element).hasClass('email-valid-format') ) && !validEmail($(element).val()) ) {
				if ( $(element).val() != '' ){
					$(element).closest('.checkout-cell').addClass('missed-input missed-email-input');
				}else if ( !$(element).hasClass('required') ) {
					$(element).closest('.checkout-cell').removeClass('missed-input missed-email-input');
				}			
			}
	
			// phone input has invalid number
			if ( $(element).hasClass('phone-valid-format') && !validPhone($(element).val()) ) {
				if ( $(element).val() != '' ){
					$(element).closest('.checkout-cell').addClass('missed-input missed-email-input');
				}else if ( !$(element).hasClass('required') ) {
					$(element).closest('.checkout-cell').removeClass('missed-input missed-email-input');
				}
			}
		
			//Password input has invalid Password
			if ( $(element).hasClass('required') && $(element).attr('type') == 'password' && !validPassword($(element).val()) ) {
				switch(passwordErrorControl($(self))) {
					case 'empty-password':
						$(self).closest('.checkout-cell').addClass('missed-input empty-password-input');
						$(self).siblings('.input-error').children().eq(1).text('Please enter a password.');
						break;
					case 'password-with-spaces':
						$(self).closest('.checkout-cell').addClass('missed-input password-with-spaces');
						$(self).siblings('.input-error').children().eq(1).text('Passwords cannot contain spaces.');
						break;
					case 'passwords-are-different':
						$(self).closest('.checkout-cell').addClass('missed-input passwords-are-different');
						$(self).siblings('.input-error').children().eq(1).text('Your Passwords are different.  Please try again.');
						break;
					default:
						break;
				}
			}
		}
	}   
	
	// error validation
	$('.checkout-cell input.required, .checkout-cell textarea.required, .checkout-cell .select-wrap select.required, input[type="email"], .phone-valid-format, .email-valid-format').blur(function(){
		var self = this;
		errorValidation(this);

	}).change(function(){

		if ( $(this).val() != '' ) {
					
			if ( $(this).attr('type') == 'email' && !validEmail($(this).val()) ) {// email input has invalid email
				$(this).closest('.checkout-cell').addClass('missed-input missed-email-input');
			}else if ( $(this).attr('name') == 'phone' && !validPhone($(this).val()) ) {
				$(this).closest('.checkout-cell').addClass('missed-input');
			}else {// otherwise add filled and verified (if applicable) classes
				$(this).closest('.checkout-cell').removeClass('missed-input missed-email-input');
			}
		}else {// otherwise add filled and verified (if applicable) classes
			$(this).closest('.checkout-cell').removeClass('missed-input missed-email-input');
		}

	});
	// error validation
	$('.checkout-cell select.required').change(function(){

		if ( $(this).val() == '' ) {
					
			if ( $(this).hasClass('required') ) {
				$(this).closest('.checkout-cell').addClass('missed-input');
			}
		}else {// otherwise remove error classes
			$(this).closest('.checkout-cell').removeClass('missed-input');
		}

	});

	$('form').on('submit', function(event){
		var checkoutCells = $(this).find('.checkout-cell');
		var tempInput = '';
		$.each(checkoutCells, function(index, value){
	
			tempInput = $(value);
			// check all visible required form elements
			// and all required hidden form elements within visible .checkout-cell elements
			if( tempInput.is(':visible') && tempInput.find('input:radio.required').length ||
			tempInput.find('input.required:visible').length ||
			tempInput.is(':visible') && tempInput.find('input[type="hidden"].required').length ||
			tempInput.is(':visible') && tempInput.find('input:checkbox.required').length ) {
				errorValidation(tempInput.find('input'));
			}else if(tempInput.find('select.required:visible').length) {
				errorValidation(tempInput.find('select'));
			}else if(tempInput.find('textarea.required:visible').length) {
				errorValidation(tempInput.find('textarea'));
			}else if ( !validEmail(tempInput.find('input[type="email"]').val()) ){
				errorValidation(tempInput.find('input[type="email"]'));
			}else if ( !validEmail(tempInput.find('.email-valid-format').val()) ){
				errorValidation(tempInput.find('.email-valid-format'));
			}else if ( !validPhone(tempInput.find('.phone-valid-format').val()) ) {
				errorValidation(tempInput.find('.phone-valid-format'));
			}
		});
	
		// if any visible missed inputs
		if( $('.missed-input:visible').length ) {
			// prevent form from submitting
			(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
			// scroll to first missed input
			$('html, body').animate({
				scrollTop: $('.missed-input:eq(0)').offset().top
			}, 1000);
		}
	});
	// address autocomplete
	if ( ( $('#checkoutContainer').length || document.location.href.toLowerCase().indexOf('checkout') > -1 ) && !$('body').hasClass('lt-ie9') ) {
        $.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyA2bYmTG0kaA0Fj2yfJQ83Kgm4SiMGE5Nw&libraries=places&callback=initAutocomplete" , function ( data, textStatus, jqxhr ) {
            // disable autocomplete
            $('#addressOne, #addressTwo, #city, #state, #zip').attr('autocomplete','new-password');
            $('#orderForm').attr('autocomplete','off');
        });    
    }
    
	//////////
	// account 
	//////////
	// show more
	$('.account-table-more').click(function(){
		$(this).closest('.account-table-more-wrap').hide();
		$(this).closest('.account-section').find('.account-table-collapsed').show();
	});
	// pause shipments modal
	$('.pause-ship-button').click(function(e){
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
		$('#overlay, #pauseShipModal').fadeIn('fast');
		$('#pauseShipModalOptions').show();
		$('#pauseShipModalConfirm').hide();
		$('html, body').animate({ scrollTop: $('#pauseShipModal').offset().top });
	});
	// pause shipments cta
	$('#pauseShipModalOptions .button').click(function(e){
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
		$('#pauseShipModalOptions').hide();
		$('#pauseShipModalConfirm').show();
	});
	// close modal
	$('.modal-close, #overlay').click(function(){
		$('#overlay, .modal').fadeOut('fast');
	});

	//Options Page Edit Options
    $('a.edit-link').on('click', function(event){
    	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        var allOptionEditElements = $('.options-edit-field');
        var parentColumn = '';

        $.each(allOptionEditElements, function(index, value){
            $(value).removeClass('ti-hide');
            parentColumn = $(value).parents('.col-sm-8');
            parentColumn.removeClass('col-xs-6').addClass('col-xs-12');
            parentColumn.siblings('.col-sm-4').addClass('editing');
            $(value).siblings('.current-option-selected').addClass('ti-hide');
        });
        $('.edit-order-wrap').addClass('ti-hide');

    });
	
	//VC Options Page Edit Options
    $('a.VCedit-link').on('click', function(event){
    	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
		var r = confirm('This will remove your current Variety Club selections.');
		if (r == true){
			document.location.href = '../varietyofthemonthclub.html';
		}
    });

    $('#updateOrder').on('click', function(event){
    	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        var allOptionEditElements = $('.options-edit-field');
        var parentColumn = '';

        $.each(allOptionEditElements, function(index, value){
            $(value).addClass('ti-hide');
            parentColumn = $(value).parents('.col-sm-8');
            parentColumn.addClass('col-xs-6').removeClass('col-xs-12');
            parentColumn.siblings('.col-sm-4').removeClass('editing');
            $(value).siblings('.current-option-selected').removeClass('ti-hide');
        });
        $('.edit-order-wrap').removeClass('ti-hide');
	});

	//Preview Modal Control
	$('.preview-text-print').on('touchstart click', function(event){
	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	$('#overlay').css({'display':'block'});
	$('#personalGiftModal_Print').css({'display':'block'});
	// scroll to top of page if modal is not in view
	if ( $(document).scrollTop() > $('#personalGiftModal_Print').offset().top ){
	$('html, body').animate({ scrollTop: 0 });
	}
	});
	$('.preview-text-email').on('touchstart click', function(event){
	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	$('#overlay').css({'display':'block'});
	$('#personalGiftModal_Email').css({'display':'block'});
	// scroll to top of page if modal is not in view
	if ( $(document).scrollTop() > $('#personalGiftModal_Email').offset().top ){
	$('html, body').animate({ scrollTop: 0 });
	}
	});
	$('.preview-text-mailrecipient').on('touchstart click', function(event){
	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	$('#overlay').css({'display':'block'});
	$('#personalGiftModal_MailRecipient').css({'display':'block'});
	// scroll to top of page if modal is not in view
	if ( $(document).scrollTop() > $('#personalGiftModal_MailRecipient').offset().top ){
	$('html, body').animate({ scrollTop: 0 });
	}
	});
	$('.preview-text-mailme').on('touchstart click', function(event){
	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	$('#overlay').css({'display':'block'});
	$('#personalGiftModal_MailMe').css({'display':'block'});
	// scroll to top of page if modal is not in view
	if ( $(document).scrollTop() > $('#personalGiftModal_MailMe').offset().top ){
	$('html, body').animate({ scrollTop: 0 });
	}
	});

	$('#orderText').on('keyup', function(){
        var self = this;
		if($(self).val().length > 200){
			var trimmedtext = $(self).val().substring(0,200);
			$('#orderText').val(trimmedtext);
			
		}
		$('.characters-typed').text($(self).val().length);
	});

	//Jump to the contact form
	$("#jumpToContactForm").on('touchstart click', function(event){
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        $('html, body').animate({
            scrollTop: $("#corprateContactForm").offset().top
        }, 1000);
	});


	//star functionality
    function addActiveClassUntilClickedElement(element) {
        element.addClass('active');
        if(!element.hasClass('clicked') && element.next().hasClass('sprite-img')) {
            addActiveClassUntilClickedElement(element.next());
        }
    }

    function removeActiveClass(element) {
        // console.log('element in removeActiveClass = %O', element);
        if(!element.hasClass('clicked') && element.hasClass('sprite-img')) {
            element.removeClass('active');
            removeActiveClass(element.prev('.sprite-img'));
        }
    }

    $('.star-rating .sprite-white-star').on('mouseenter', function(event){
        // console.log('hover on sprite-white-star!');
        // console.log('event = %O', event);
        function addActiveClass(element) {
            element.addClass('active');

            if(element.prev().hasClass('sprite-img')) {
                addActiveClass(element.prev());
            }
        }

        function removeActiveClass(element) {
            if(element.next().hasClass('active') && element.next().hasClass('sprite-img')) {
                element.next().removeClass('active');
                removeActiveClass(element.next());
            }
        }

        addActiveClass($(this));
        removeActiveClass($(this));

    });
    $('.star-rating').on('mouseleave', function(event){

        function addActiveClassUntilClickedElement(element) {
            element.addClass('active');
            // console.log('element = %O', element);
            // console.log('addActiveClassUntilClickedElement elment.next = %O', element.next());
            if(!element.hasClass('clicked') && element.next().hasClass('sprite-img')) {
                addActiveClassUntilClickedElement(element.next());
            }
        }

        removeActiveClass($('.star-rating .sprite-img:last'));
        if($('.sprite-img.clicked').length && !$('.sprite-img.clicked').hasClass('active')) {
        	// console.log('running addActiveClassUntilClikcedElement ');
            addActiveClassUntilClickedElement($('.star-rating .sprite-img:first'));
        }
    });

    /* Ian added the starcounter to assign the star value to a hidden form element */
    $('.star-rating .sprite-img').on('touchstart click', function(event) {
        (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
		var starcounter = 0;
		
        function addActiveClassUntilClickedElement(element) {
            element.addClass('active');
			starcounter = starcounter + 1;
			$('#hiddenstars').val(starcounter);
            if (!element.hasClass('clicked') && element.next().hasClass('sprite-img')) {				
                addActiveClassUntilClickedElement(element.next());				
				$('#ratingswrap').removeClass('missed-input');
            }			
        }
		
				

        var self = this;
        var previouslySelectedNumber = $('.sprite-img.clicked');
		

        if (previouslySelectedNumber.length) {
            $('.sprite-img.clicked').removeClass('clicked');
            $(self).addClass('clicked');
            removeActiveClass($('.star-rating .sprite-img:last'));
        }
        $(self).addClass('clicked');
        addActiveClassUntilClickedElement($('.star-rating .sprite-img:first'));
    });


    ////////////
    // corporate
    ////////////
    // phone number mask
	$('#userTel').mask('(000) 000-0000');

	////////////////////////
	// Order Message Control
	////////////////////////
	$('.email-message').on('click', function(){
		$('.recipient-email').removeClass('ti-hide');
		$('.sender-email').removeClass('ti-hide');
        $('.personal-message-container').removeClass('ti-hide');
		$('.giftmessage-date-area').removeClass('ti-hide');
		$('#sendText').text('Send Immediately');
		// console.log('email');
		//$("#sendFutureText").html("* This is the date we will send your gift message.");
	
	});
    $('.mail-message').on('click', function(){
        $('.recipient-email').addClass('ti-hide');
        $('.sender-email').addClass('ti-hide');
        $('.personal-message-container').removeClass('ti-hide');
		$('.giftmessage-date-area').removeClass('ti-hide');
		$('#sendText').text('Send Today');
		
    });
	
    $('.printer-message').on('click', function(){
		 $('.personal-message-container').removeClass('ti-hide');
		 $('.giftmessage-date-area').addClass('ti-hide');
        $('.recipient-email').addClass('ti-hide');
        $('.sender-email').addClass('ti-hide');
       
		
		$('#sendText').text('Send Today');
		
    });
     $('.hide-message-container').on('click', function(){
        $('.personal-message-container').addClass('ti-hide');
		$('.giftmessage-date-area').addClass('ti-hide');
        $('.recipient-email').addClass('ti-hide');
        $('.sender-email').addClass('ti-hide');
	});
    $('.show-date-picker').on('click', function(){
    	$('.date-picker-parent').removeClass('ti-hide');
		//david add
		//$('#datePickerTodayEmail').addClass('ti-hide');
		$('#datePickerTodayMail').addClass('ti-hide');
				  
		//end of david add
        
	});
    $('.hide-date-picker').on('click', function(){
    	$('.date-picker-parent').addClass('ti-hide');
	});

    if($('#datePicker').length) {
    	$('#datePicker').datepicker({minDate: 0});
	}
	if ( $('#divDatePicker').length ) {
		var dateToday = new Date();	
		$('#dateTrigger').click(function(){
		    $('#divDatePickerWrap').fadeIn(200);
	    });

	    $('input[name="strmessageDate"]').change(function(){
	    	setTimeout(function(){
	    		if ( $('#sendFuture:checked').length ) {
	    			// console.log('date in future');
	    			$('#divDatePicker').datepicker({
				        altField: '#hiddenDate',
				        minDate: dateToday,
				        onSelect: function(e) {
				        	// var date = $('#divDatePicker').datepicker('getDate');
				            $('#visibleDate').text($('#hiddenDate').val());
				            $('#divDatePickerWrap').fadeOut(200);
				        }
				    });
					$('#divDatePicker').datepicker('setDate', dateToday);
		    		$('#visibleDate').text($('#hiddenDate').val());
		    	}
				//david icg add 
			
				else {
		    		// console.log('date today');
		    		$('#hiddenDate').val('');
		    	}
				
				
				 if( $('input[name="strGiftCardType"]:checked').val() == 'MailRecipient' ) {  //alert("hi5");
						if ( $('#sendToday').is(':checked')) {
							  $('#datePickerTodayMail').removeClass('ti-hide');
							  $('#datePickerMailMe').addClass('ti-hide');
							  $('#sendFutureTextMail').addClass('ti-hide');
							  $('#sendFutureTextEmail').addClass('ti-hide');
							  //alert("hi3");
						}
						else if  ( $('#sendFuture').is(':checked')) {//alert("hi2");
							 $('#datePickerTodayMail').addClass('ti-hide');
							 $('#datePickerMailMe').addClass('ti-hide');
							 $('#sendFutureTextMail').removeClass('ti-hide');
							 $('#sendFutureTextEmail').addClass('ti-hide');
						}
				   }
				   else if ($('input[name="strGiftCardType"]:checked').val() == 'Print'){
					   	$('.personal-message-container').removeClass('ti-hide');
					   	$('.giftmessage-date-area').addClass('ti-hide');
					
				   }
				   else if ( $('input[name="strGiftCardType"]:checked').val() == 'Email')  { //alert("hi4");
				   		if ( $('#sendToday').is(':checked')){ //alert("hi7");
						  $('#datePickerTodayMail').addClass('ti-hide');
						  $('#datePickerMailMe').addClass('ti-hide');
						  $('#sendFutureTextMail').addClass('ti-hide');
						  $('#sendFutureTextEmail').addClass('ti-hide');
						}
						else if  ( $('#sendFuture').is(':checked')){ //alert("hi8");
							 $('#datePickerTodayMail').addClass('ti-hide');
							 $('#datePickerMailMe').addClass('ti-hide');
							 $('#sendFutureTextMail').addClass('ti-hide');
						     $('#sendFutureTextEmail').removeClass('ti-hide');
						}
				   }
			
	    	},100);
		});
		
		 $('input[name="strSendProduct"]').change(function(){
	    	setTimeout(function(){
	    		if ( $('#sendFuture:checked').length ) {
	    			// console.log('date in future');
	    			$('#divDatePicker').datepicker({
				        altField: '#hiddenDate',
				        minDate: dateToday,
				        onSelect: function(e) {
				        	// var date = $('#divDatePicker').datepicker('getDate');
				            $('#visibleDate').text($('#hiddenDate').val());
				            $('#divDatePickerWrap').fadeOut(200);
				        }
				    });
					$('#divDatePicker').datepicker('setDate', dateToday);
		    		$('#visibleDate').text($('#hiddenDate').val());
		    	}else {
		    		// console.log('date today');
		    		$('#hiddenDate').val('');
		    	}
	    	},100);
		});
	}    



	//////////////////////
	// Reviews Tab Control
	//////////////////////
	if($('#reviewsTab').length && window.location.href.indexOf('#reviewsTab') > -1) {
        $('.prod-tab-nav-wrap.active').removeClass('active');
        $('#reviewsTab').children('a').click();
	}
	
	// hide + show button
	if ( $('#productCreate').length || $('#ProductBuildForm').length ){
		var $form = ( $('#productCreate').length ? $('#productCreate') : $('#ProductBuildForm') );
		$(window).bind('scroll', function(){
			if ( $(document).scrollTop() > ( $form.offset().top + $form.height() ) || $(document).scrollTop() < $form.offset().top ){
				$('#prodStickyCTAWrap').removeClass('hidden');
			}else {
				$('#prodStickyCTAWrap').addClass('hidden');
			}
		});
	
		// scroll to buy box
		$('#prodStickyCTA').click(function(){
			$('html,body').animate({ scrollTop: $form.offset().top });
		});
	}
	
	//-------Reduce Flashing on Product Page ----------
	if($('#prodImgWrap').length) {
    	$.each($('#prodImgWrap img'), function(index, value){
            $(value).css({'visibility':'visible'});
		});
    	$('#prodImgWrap').css({'visibility':'visible'});

	}
	$('.prod-form-option input').each(function(){
		if ( $(this).is(':checked') ) {
			$(this).closest('.prod-form-option').addClass('selected');
		}
	});
	
	//Ian added this to handle mail card date warning message
	
	//$('input:radio[name="strGiftCardType"]').change(
    		//function(){
        		 //if($(this).is(':checked') && $(this).val() == 'MailRecipient') { 
				  // $('#mailrecmsg').removeClass('ti-hide'); 
				  // }
				  // else{
					//   $('#mailrecmsg').addClass('ti-hide'); 
				  // }
			//});
			
			
			
		//david added this to handle more granular messages to show
		$('input:radio[name="strGiftCardType"]').change(
    		function(){
        		 if($(this).is(':checked') && $(this).val() == 'MailRecipient') {  //alert("a");
				    	if ( $('#sendToday').is(':checked')) {   //alert("b");
							  $('#datePickerTodayMail').removeClass('ti-hide');
							  $('#datePickerMailMe').addClass('ti-hide');
							  $('#sendFutureTextMail').addClass('ti-hide');
							  $('#sendFutureTextEmail').addClass('ti-hide');
						}
						else if  ( $('#sendFuture').is(':checked')) {//alert("c");
							 $('#datePickerTodayMail').addClass('ti-hide');
							 $('#datePickerMailMe').addClass('ti-hide');
							 $('#sendFutureTextMail').removeClass('ti-hide');
							 $('#sendFutureTextEmail').addClass('ti-hide');
						}
				   }
				   else if ($(this).is(':checked') && $(this).val() == 'Print'){
					   		$('.personal-message-container').removeClass('ti-hide');
					  		$('.giftmessage-date-area').addClass('ti-hide');				
				   }
				   else if ($(this).is(':checked') && $(this).val() == 'Email') {//alert("d");
					  	if ( $('#sendToday').is(':checked')){   //alert("e");
						  $('#datePickerTodayMail').addClass('ti-hide');
						  $('#datePickerMailMe').addClass('ti-hide');
						  $('#sendFutureTextMail').addClass('ti-hide');
						  $('#sendFutureTextEmail').addClass('ti-hide');
						}
						else if  ( $('#sendFuture').is(':checked')){ //alert("f");
							 $('#datePickerTodayMail').addClass('ti-hide');
							 $('#datePickerMailMe').addClass('ti-hide');
							 $('#sendFutureTextMail').addClass('ti-hide');
						     $('#sendFutureTextEmail').removeClass('ti-hide');
						}
				   }
				   
				   else if ($(this).is(':checked') && $(this).val() == 'MailMe') {//alert("g");
						  $('#datePickerTodayMail').addClass('ti-hide');
						  $('#datePickerMailMe').removeClass('ti-hide');
						  $('#sendFutureTextMail').addClass('ti-hide');
						  $('#sendFutureTextEmail').addClass('ti-hide');
						
				   }
				   
				   if ($(this).is(':checked') && $(this).val() == 'Print') {
					   $('#datePickerMailMe').addClass('ti-hide'); 
				   }
				   if ($(this).is(':checked') && $(this).val() == 'No') {
					   $('#datePickerMailMe').addClass('ti-hide'); 
				   }
				 
				  
			});
			
		
		//end of david add
});


//david add to fix back button issue
	$( document ).ready(function() {
		 if( ($('#labelpps').hasClass('selected')) && ($('#labelpif').hasClass('selected')) ){
			 if ( $('input[name="strpaymentTerm"]:checked').val() == 'Pay In Full' )
			 {
				//alert('pif checked');
			 }
			 else 
			 {
				//alert('pps checked');
				$('#prodFormDuration').attr('class','prod-form-options pay-per-ship-selected');
				$('#labelpif').removeClass('selected');
				
			 }
		 }
		 
		 
		// Listen for Picreel button press	
		document.addEventListener('picreelSubmitPopup', function(){
			//document.cookie = "username=John Doe is now here"; 
			//alert('Button pressed');
			
			var tmpcpn = 'true';
			var cookieName = 'cpn.name';
			var cookieValue = tmpcpn;
			var myDate = new Date();
		    var numberOfDaysToAdd = 2;
		    myDate.setDate(myDate.getDate() + numberOfDaysToAdd); 
			document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate  + ";path=/";
		
			var acookieName = 'cpn.when';
			var amyDate = new Date();
			var anumberOfDaysToAdd = 2;
			amyDate.setDate(amyDate.getDate() + anumberOfDaysToAdd); 
			//getMonth() //January is 0! https://stackoverflow.com/questions/17038105/get-exact-day-from-date-string-in-javascript
			//per Ian we want this format for coldfusion {ts '2018-02-17 11:31:26'} for the cookie value
			var cookieValue = "{ts '"+amyDate.getFullYear()+"-"+(amyDate.getMonth()+1)+"-"+amyDate.getDate()+" "+amyDate.getHours()+":"+amyDate.getMinutes()+":"+amyDate.getSeconds()+"'}";
			document.cookie = acookieName +"=" + cookieValue + ";expires=" + amyDate  + ";path=/";
		
		
		});	 
		 
	});
	
// added to handle partial ship states
//Controls whether each field has a value or not.
var ajaxReady = {
    state: false,
    zip: false
}
//Sets the jQuery elements.
var elements = {
    state: null,
    zip: null
}
//Creates Individual Message Objects
function Message(title, body) {
    this.title = title;
    this.body = body;
}
//Sets Modal Messages
var modalMessage = {
    noShip: new Message('We\'re Sorry! <br> We\'re unable to ship ', ' clubs to the zip code you\'ve provided.'),
    serverError: new Message('We apologize, we are having technical difficulties.',' If you continue to see this message then please contact the number provided below.')
}

//Will only try the server five times before giving up.  This number can be increased to desired amount.
var MAX_NUMBER_OF_ATTEMPTS = 5;

function tiSetAjaxReady(key, bool) {
    ajaxReady[key] = bool;
}

function elementSet(self, elementToSetKey, bool) {
    $.each(elements, function(key, value){
      if(key == elementToSetKey) {
        tiSetAjaxReady(key, bool);
      }
    });
}

function tiRetryAjax(city, state, zip, clubId, attempts) {
    if(attempts < MAX_NUMBER_OF_ATTEMPTS) {
        attempts++;
        tiPerformAjaxCall(city, state, zip, clubId, attempts);
    }else {
        //TODO Display Reload error and if problem persists error.
        console.log('reached the limit of tiRetryAjax')
    }
}

function displayModal(title, message, clubnames) {
  console.log('%c displayModal init!', 'color: purple;');
  	var ModalContent =   '<div class="ti-modal-header">' +
                          '<div class="ti-close-modal""><span class="sprite-img sprite-gray-close"></span> close </div>' +
                          '<h2>' + title + clubnames + message +'</h2>' +
                        '</div>'+
                        '<div class="ti-modal-footer">' +
                          '<p>Please provide an alternate shipping address or choose from any of our other 40 Amazing Clubs to send your gift.</p><p>Questions? Customer service is available 7 days a week from 7am to 10pm Central at ' +
                            '<a href="tel:18005074660" class="ti-customer-support" style="font-weight: bold;">1-800-507-4660</a>' +
                          '</p>' +
                        '</div>';
    if(!$('body').children('#tiModalMessage').length) {
      //TODO add css below to master css file and remove style from that div.
      //#tiModalMessage { display: none; position: fixed; width: 50%; top: 50%; left: 0; right: 0; left: 0; margin: 0 auto; padding: 20px; z-index: 50; background: #fff; border: 1px solid #EFEFEF; }
	   var modalHtml = '<div id="tiModalMessage"></div>';

      $('body').append(modalHtml);
    }
        //TODO Add .ti-active { display: block; }  to master css file and remove css from overlay and tiModalMessage objects below.
	  $('#tiModalMessage').html(ModalContent);
      $('#overlay').addClass('ti-active').css({'display': 'block'});
      $('#tiModalMessage').addClass('ti-active').css({'display': 'block'});
}

function displayModalContestRules(ModalContent) {
  	var ModalContent =   ModalContent;
    if(!$('body').children('#b4l_tiModalMessage').length) {
      //TODO add css below to master css file and remove style from that div.
      //#b4l_tiModalMessage { display: none; position: fixed; width: 50%; top: 50%; left: 0; right: 0; left: 0; margin: 0 auto; padding: 20px; z-index: 50; background: #fff; border: 1px solid #EFEFEF; }
	   var modalHtml = '<div id="b4l_tiModalMessage"></div>';

      $('body').append(modalHtml);
    }
        //TODO Add .ti-active { display: block; }  to master css file and remove css from overlay and b4l_tiModalMessage objects below.
	  $('#b4l_tiModalMessage').html(ModalContent);
      $('#overlay').addClass('ti-active').css({'display': 'block'});
      $('#b4l_tiModalMessage').addClass('ti-active').css({'display': 'block'});
}

function tiPerformAjaxCall(state, zip, clubId, attempts) {
  console.log('%c tiPerformAjaxCall init!' + state +','+ zip +','+ clubId, 'color: purple;');
    $.ajax({
        type: 'POST',
        url: 'components/ClubManager.cfc?method=checkShipStateZip',
        data: {
            clubid: '{"clubids":"'+clubId+'"}',
            state: state,
            zip: zip
        }
    }).done(function(canShip){
        console.log('canShip = %O', canShip);
        //The server should return true or false for if it can ship or not, however, it will be a string.
        console.log('typeof canShip = %O', typeof canShip);
        if(canShip !== "true") {
            displayModal(modalMessage.noShip.title, modalMessage.noShip.body, canShip);

            tiSetAjaxReady('state', false);
            tiSetAjaxReady('zip', false);
            //Disable Add To Cart Button
            $('button[type="submit"]').addClass('ti-disabled');

        }else if(canShip.trim() === "ERROR") {
            //TODO log a server error.
            tiRetryAjax(city, state, zip, clubId, attempts);
        }else {
            //reenable submit button
            $('button[type="submit"]').removeClass('ti-disabled');
        }
    }).fail(function(data) {
        console.log('%c hit fail in ajax call.  data to follow.', 'color: red;');
        console.warn(data);
        tiRetryAjax(city, state, zip, clubId, attempts);
    });	
}







function checkOtherValues() {
  console.log('%c checkOtherValues init!', 'color: purple;');
    //ajaxReady and element have the same keys for the matching elements.
    $.each(elements, function(key, value){
        //Catches customers who have to try a second address in case they don't blur all of the elements the second time around.
        console.log('inside checkOtherValues loop, ajaxReady[key] = %O', ajaxReady[key], ' && key = %O', key);
        if(!ajaxReady[key]) {
            //The element has value if none of the parent elements have the class missed-input
            if(!elements[key].parents('.missed-input').length && elements[key].val()) {
                ajaxReady[key] = true;
            }
        }
    });
}

function initElementCheck(self, clubId, key) {
  console.log('%c initElementCheck init!', 'color: purple;');
    var isComplete = false;
    //If the blurred input does not have a parent with missed-input then it passed validation.
    console.log('$(self).val() = %O', $(self).val());
    if(!$(self).parents('.missed-input').length && $(self).val()) {
        //The city or state has a valid input
        elementSet(self, key, true);
        //Checks to see if a false value should be true.
        checkOtherValues();
        //If all equal true then we are ready to ajax.
        isComplete = ajaxReady.state && ajaxReady.zip;
    }else {
        //The city or state does not have a valid input
        elementSet(self, false);
    }

    if(isComplete) {
        //Reenable add to cart button.
        $('input[type="submit"]').removeClass('ti-disabled');
        //state value, zipcode value, and 0 attempts at the server with this info.
        tiPerformAjaxCall(elements.state.val(), elements.zip.val(), clubId, 0);
    }
}
function getVCeditClubIDs(){
		var VCclubIDlist = '';
		var idHolder ='';
		for(vcloop = 0; vcloop < 13; vcloop++){
			idHolder = $('#strClubID'+vcloop).val();
			if(idHolder != null){
				if(VCclubIDlist != ''){
					VCclubIDlist = VCclubIDlist + ',' + idHolder;
					}
				else{
					VCclubIDlist = idHolder;
					}
				}			
		}
		return VCclubIDlist;	
	}
	

function countWords(str){
	//The script attempts to remove all extra spaces (double spaces etc) before counting.
	s = str.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s.split(' ').length;
}

function getSentenceWithWordLimit(str, wordcount){
	//format before counting
	var s = str.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	
	//split the string into words using the space deliter, with a wordcount specified by the parameter..it returns an array
	var arraystr = s.split(' ', wordcount);
	
	var arrayLength = arraystr.length;
	var returnstr = '' ;
	for (var i = 0; i < arrayLength; i++) {
		returnstr = returnstr.concat(' ',arraystr[i]);
		//console.log(returnstr);
	}
	return returnstr.trim();
}
	
	
$(document).ready(function(){
  try {
	var IsAddToCart = window.location.href.indexOf('addtocart.cfm');
	var IsEditCart = window.location.href.indexOf('EditCart.cfm');
	var IsVCAdd = window.location.href.indexOf('VC_AddToCart.cfm');
	var IsVCEdit = window.location.href.indexOf('vc_edit');
    if(IsAddToCart > 0 || IsEditCart > 0 || IsVCAdd > 0 || IsVCEdit > 0) {
        console.log('%c mikes code init', 'color: grey;');
        elements.zip = $('#zip');   
        //Inits when leaving the city or zipcode inputs
        $(elements.zip).on('blur', function(event){
        	elements.state = $('#state');
			if(IsVCEdit > 0){
				var clubId = getVCeditClubIDs();
				}
			else{
				var clubId = ($('input[name="STRCLUBS"]').length) ? $('input[name="STRCLUBS"]').val() : $('input[name="clubid"]').val();
				}
            console.log('%c zip blur init!', 'color: purple;');
            initElementCheck(this, clubId, 'zip');
        });
        //Inits when leaving the state select.
		// Ian commented this out so that this only fires when changing the zip code
        //$(elements.state).change(function(event){
        //    console.log('%c state change init!', 'color: purple;');
        //   initElementCheck(this, clubId, 'state');
        //});

        $('body').on('click', function(event){
            var self = this;
            if(($('#tiModalMessage').length && $('#tiModalMessage').css('display') == "block" && !$(event.target).parents('#tiModalMessage').length && $(event.target).attr('id') != 'tiModalMessage') || $(event.target).hasClass('ti-close-modal') || $(event.target).hasClass('sprite-gray-close')) {
                //remove css once ti-active is added to master css stylesheet
                $('#tiModalMessage').removeClass('ti-active').css({'display':'none'});
                $('#overlay').removeClass('ti-active').css({'display': 'none'});
                $('#icg_placeorder').removeClass('addtocart-disabled');
            }
        });
        $('form').off('submit');
        $('form').on('submit', function(event){
				
           /* if(!$('button[type="submit"]').hasClass('ti-disabled')) {*/
		   		$('#icg_placeorder').addClass('addtocart-disabled');
                var checkoutCells = $(this).find('.checkout-cell');
                var tempInput = '';
				var passedvalidate = '';
				
                $.each(checkoutCells, function(index, value){
       
                    tempInput = $(value);
                    // check all visible required form elements
                    // and all required hidden form elements within visible .checkout-cell elements
                    if( tempInput.is(':visible') && tempInput.find('input:radio.required').length ||
                    tempInput.find('input.required:visible').length ||
                    tempInput.is(':visible') && tempInput.find('input[type="hidden"].required').length ||
                    tempInput.is(':visible') && tempInput.find('input:checkbox.required').length ) {
                        errorValidation(tempInput.find('input'));
                    }else if(tempInput.find('select.required:visible').length) {
                        errorValidation(tempInput.find('select'));
                    }else if(tempInput.find('textarea.required:visible').length) {
                        errorValidation(tempInput.find('textarea'));
                    }else if ( !validEmail(tempInput.find('input[type="email"]').val()) ){
                        errorValidation(tempInput.find('input[type="email"]'));
                    }else if ( !validEmail(tempInput.find('.email-valid-format').val()) ){
                        errorValidation(tempInput.find('.email-valid-format'));
                    }else if ( !validPhone(tempInput.find('.phone-valid-format').val()) ) {
                        errorValidation(tempInput.find('.phone-valid-format'));
                    }
                });
				
					// if any visible missed inputs
				if( $('.missed-input:visible').length ) {
					// prevent form from submitting
					(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
					// scroll to first missed input
					$('html, body').animate({
						scrollTop: $('.missed-input:eq(0)').offset().top
					}, 1000);
					passedvalidate =  false;
					$('#icg_placeorder').removeClass('addtocart-disabled');
				}
				else {
					passedvalidate =  true;
					}
       				
        });
    }
  }catch(err) {
    console.log('%c error in document.ready.  Error to follow:');
    console.warn(err);
  }

});

function CheckShipZip() {
	//Disable Add To Cart Button  	
	$('#icg_placeorder').addClass('addtocart-disabled');  	
	$('#icg_placeorder').addClass('ti-disabled');
	console.log('%c CheckShipZip init!', 'color: purple;');
	var VCeditCheck = window.location.href.indexOf('vc_edit');
	if(VCeditCheck > 0){
		var clubId = getVCeditClubIDs();
		}
	else{
		var clubId = ($('input[name="STRCLUBS"]').length) ? $('input[name="STRCLUBS"]').val() : $('input[name="clubid"]').val();
		}
	var state = $('#state');
	var zip = $('#zip');
  	if(zip.val().length > 0 && state.val().length > 0){ 
  		$.ajax({
				type: 'POST',
				url: 'components/ClubManager.cfc?method=checkShipStateZip',
				data: {
					clubid: '{"clubids":"'+clubId+'"}',
					state: state.val(),
					zip: zip.val()
				},
				success: function(canShip){
					console.log('canShip = %O', canShip);
					//The server should return true or false for if it can ship or not, however, it will be a string.
					console.log('typeof canShip = %O', typeof canShip);
					if(canShip !== "true") {
						displayModal(modalMessage.noShip.title, modalMessage.noShip.body, canShip);
			
						tiSetAjaxReady('state', false);
						tiSetAjaxReady('zip', false);
						
					}
					else {
						$('#icg_placeorder').removeClass('ti-disabled');
						$('#orderForm').submit();										
						$('#VarietyForm').submit();
					}
					
				}
			});
	}
	else{
  		$('#orderForm').submit();										
		$('#VarietyForm').submit();		
	}
};