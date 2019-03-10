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

	// FOOTER
	footerEvent:function(el){
		var $this = $(el), 
			 $box = $(el).closest(".footer-comp-select"),
			 spd=300;

		if($this.attr("aria-expended") == 'true') {
			$box.removeClass("open").find("dd").slideUp(spd);
			$this.attr("aria-expended", "false");
		}else{
			$box.addClass("open").find("dd").slideDown(spd);
			$this.attr("aria-expended", "true");
		}

		$box.siblings('.open').find('button').attr("aria-expended", "false");
		$box.siblings('.open').removeClass("open").find("dd").slideUp(spd);
	},

	// TAB SHOW / HIDE
	tabEvent : function(tabName, hasClassName, contName, liName){
	},

	// GOTO THE TOP 
	gototopEvent : function(el){
		$this = $(el);
		$('html').animate({'scrollTop': 0}, 300, 'swing', function(){
			$('html').find($this.attr('href')).focus();
		});
		return false;
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
})


$(document).on("click", "body", function(e){
	if($(".footer-comp-select").hasClass("open")){ 
		if(!$(".footer-comp-select").has(e.target).length){ 
			$(".footer-comp-select").removeClass("open").find('button').attr("aria-expended", false);
			$(".footer-comp-select").find("dd").slideUp(300);
		}
	}
})




//-------------------------------------------------------------------------
// LOAD
// ----------------------------------------------------------------------- //
$(document).ready(function(){
	$("header").load("header.html");
	$("footer").load("footer.html");
})