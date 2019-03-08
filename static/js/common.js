// 진입 모바일
if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	$("body").addClass("mobile");
	if(navigator.userAgent.match(/iP(hone|od)|iPad/)) {$("body").addClass("ios");}
}else{$("body").addClass("pc"); }

if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.match(/iP(hone|od)|iPad/) == null) {
	$("body").addClass("safari");
}

var usc = {
	// GNB
	gnbEvent: function(){
	},

	// TAB SHOW / HIDE
	tabEvent : function(tabName, hasClassName, contName, liName){
		
	},

	// SLICK 예시
	slickEvent : function(){
		$('.product-lst').slick({
			dots: false,
			infinite: true,
			speed: 400,
			ltr: true,
			slidesToShow: 7,
			slidesToScroll: 1,
			cssEase: 'linear',
			responsive: [
		    {
		      breakpoint: 767,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: false
		      }
		    }
			]
		});
	},
	// SLICK Pause
	slickPause : function (slickName, el) {
		var slickName = $(slickName), $this = $(el);

		if($this.hasClass('js-pause')){
			slickName.slick('slickPlay');
			$('span', $this).text("Pause");
		} else{
			slickName.slick('slickPause');
			$('span', $this).text("Play");
		}

		$this.toggleClass("js-pause");
	}
}


$(document).ready(function(){
	// TAB 
	var compTab = (function(){
		$('*[role=tab]').on("click", function(){
			var $this = $(this), gototab = "#"+$this.attr("aria-controls"), spd=300, motion;

			if($this.closest("*[role=tablist]").attr('data-js') == 'false') return false;


			$this.closest("*[role=tablist]").attr('data-animation') == 'fade' ? motion = 'fade' : motion = 'show'; 

			if(motion == 'fade'){
				$(gototab).fadeIn(spd).siblings("*[role=tabpanel]").fadeOut(spd);
			}else{
				$(gototab).show().siblings("*[role=tabpanel]").hide();
			}

			$this.closest("*[role=presentation]").siblings("*[role=presentation]").find("*[role=tab]").removeAttr("aria-selected");
			$this.attr("aria-selected", true);

			return false;
		})
	
	})();

	
	// MAIN GNB
	// usc.gnbEvent();
})




//-------------------------------------------------------------------------
// LOAD
// ----------------------------------------------------------------------- //
$(document).ready(function(){
	$("header").load("header.html");
	$("footer").load("footer.html");
})