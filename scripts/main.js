jQuery( document ).ready( function( $ ) {


	// Add class to elements when they're in view
	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop(),
			docViewBottom = docViewTop + $(window).height();

		var elemTop = $( elem ).offset().top,
			elemBuffer = $( window ).width > 600 ? 200 : 50,
			elemBottom = elemTop + elemBuffer;

		return ( elemBottom <= docViewBottom );
	}

	function fadeInSpotted() {
		$( '.tracker' ).each( function () {
			$( this ).addClass( 'will-spot' );
			if ( $( this ).offset().top < $( window ).height() ) {
				$( this ).addClass( 'spotted' );
			}
		} );
	}

	if ( $( '.tracker' ).length ) {
		$( window ).on( 'load', function () {
			fadeInSpotted();
		} );
		$( window ).scroll( function () {
			$( '.tracker' ).each( function () {
				if ( isScrolledIntoView( this ) === true ) {
					$( this ).addClass( 'spotted' );
				}
			} );
		} );
	}


	// Parallax effect on the fade blocks
	var scroll = window.requestAnimationFrame ||
				 window.webkitRequestAnimationFrame ||
				 window.mozRequestAnimationFrame ||
				 window.msRequestAnimationFrame ||
				 window.oRequestAnimationFrame ||
				 // IE Fallback, you can even fallback to onscroll
				 function(callback){ window.setTimeout(callback, 1000/60) };

	function loop(){

		var windowOffset = window.pageYOffset;
		if (( windowOffset < $( window ).outerHeight() )
                && ( $( window ).width() < 600  )) {
            $( '.fade-block' ).css({
				'transform': 'translateY( ' + Math.ceil ( windowOffset * 0.3 ) + 'px)',
				'opacity': 1 - ( windowOffset * 0.003 )
			});
        }

		scroll( loop )

	}
	loop();

});
