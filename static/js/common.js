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

		if($this.attr("aria-expanded") == 'true') {
			$box.removeClass("open").find("dd").slideUp(spd);
			$this.attr("aria-expanded", "false");
		}else{
			$box.addClass("open").find("dd").slideDown(spd);
			$this.attr("aria-expanded", "true");
		}

		$box.siblings('.open').find('button').attr("aria-expanded", "false");
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
	// slickEvent : function(){
	// 	$('.product-lst').slick({
	// 		dots: false,
	// 		infinite: true,
	// 		speed: 400,
	// 		ltr: true,
	// 		slidesToShow: 7,
	// 		slidesToScroll: 1,
	// 		cssEase: 'linear',
	// 		responsive: [
	// 	    {
	// 	      breakpoint: 767,
	// 	      settings: {
	// 	        slidesToShow: 4,
	// 	        slidesToScroll: 1,
	// 	        infinite: true,
	// 	        dots: false
	// 	      }
	// 	    }
	// 		]
	// 	});
	// },
	// SLICK Pause
	slickPause : function (parentsName, sliderName, el) {
		var $this = $(el), slickName = $this.closest(parentsName).find(sliderName);

		if($this.hasClass('js-pause')){
			$this.removeClass("play").find('span').text("Pause");
			$(slickName).slick('slickPlay');
		}else{
			$this.addClass("play").find('span').text("Play");
			$(slickName).slick('slickPause');
		}

		$this.toggleClass("js-pause");
		return false;
	},

	popupOpenEvent : function(popupId, el){
		var popupName = $('#'+popupId), $this = $(el), dim = '<div class="dimd"></div>';

		if(popupName.hasClass('dim')) $("#wrap").prepend(dim);
		
		$this.attr({'aria-expanded': true});
		popupName.show().css({
			'margin-left': -popupName.width()/2,
			'margin-top': -popupName.height()/2
		});
		return false;
	},
	popupCloseEvent : function(popupId, el){
		var $this = $(el);

		$this.closest("*[role='dialog']").hide();
		$("#wrap .dimd").remove();
		$("*[aria-controls="+popupId+"]").attr("aria-expanded", false).focus();
		return false;
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

	// LNB
	var compLnb = (function(){
		if($("#lnb").length < 1) return false;
		
		var lnb = $("#lnb .menu h2 a"), spd=300;
		 
		lnb.on("click", function(){
			var $this = $(this), 
				 sm = $this.closest("h2").next(".smallmenu"), 
				 lnb = $("#lnb .menu");

			if($this.hasClass('outlnk')) return;

			$this.closest("li").siblings().find(".open").removeClass("open");
			$this.closest("li").siblings().find(".smallmenu").slideUp(spd);

			sm.stop().slideToggle(spd);
			$this.toggleClass("open");

			return false;
		})
	})();

	// Breadcrumb
	var compBreadcrumb = (function(){
		if($(".breadcrumb").length < 1) return false;
		
		var bread = $(".breadcrumb > li > a"), spd=300;
		 
		bread.on("click", function(){
			var $this = $(this), spd=300;

			$this.closest("li").siblings().find(".menu").slideUp(spd);
			$this.closest("li").siblings().find(".open").removeClass('open');

			$this.next(".menu").stop().slideToggle(spd);
			$this.toggleClass("open");
			return false;
		});

		$(document).on("click", "body", function(e){
			if(bread.hasClass("open")){ 
				if(!bread.has(e.target).length){ 
					bread.removeClass("open").next(".menu").slideUp(spd);
				}
			}
		})
	})();

	// Ttitle zone utile
	var compTopUtile = (function(){
		if($(".page-utile").length < 1) return false;

		var spd=300;
		
		$(".icon-sns, .icon-qrcode").on("click", function(){
			var $this = $(this);

			if($(".page-utile").hasClass('none')) return false;

			$this.addClass('open').attr("aria-expanded", true);		
			$this.closest(".page-utile").addClass("none");

			if($this.hasClass('icon-qrcode')) {
				$this.next("div[role='dialog']").stop().slideDown(spd);
			}else {
				$this.next("div[role='dialog']").stop().show(0,function(){
					$(this).animate({"width": 156+'px'},spd);
				});
			}
		});

		$(".title-zone .btn-close").on("click", function(){
			$(".title-zone .page-utile").removeClass("none");

			$(this).closest("div[role='dialog']").hide().removeAttr("style");
			$(this).closest("div[role='dialog']").prev().attr("aria-expanded", false).removeClass("open");
		});

		$(document).on("click", "body", function(e){
			if($(".title-zone .page-utile").hasClass("none")){ 
				if(!$(".title-zone .page-utile").has(e.target).length){ 
					$(".title-zone .page-utile").removeClass("none");
					$(".title-zone div[role='dialog']").hide().removeAttr("style");
					$(".icon-sns, .icon-qrcode").removeClass("open").attr({'aria-expanded': false});
				}
			}
		})
	})();

})


$(document).on("click", "body", function(e){
	if($(".footer-comp-select").hasClass("open")){ 
		if(!$(".footer-comp-select").has(e.target).length){ 
			$(".footer-comp-select").removeClass("open").find('button').attr("aria-expanded", false);
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