$(window).on("load", function() {
	// $("form button").click(function(e){
	// 	if ($(this).attr('value') !== 'false') {
	// 		$(this).attr('value', 'false');
	// 		$(this).click();
	// 	} else {
	// 		e.preventDefault();
	// 	}
	// });

	$("form").submit(function(e){
		if ($(this).attr('id') !== 'submitonce') {
			$(this).attr('id', 'submitonce');
			$(this).submit();
		} else {
			e.preventDefault();
		}
	});
});