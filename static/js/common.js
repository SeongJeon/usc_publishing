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
	gnbEvent: function(num, vv){
		var spd = 300,  pc=0, mo=0, ifval,
		 	header = $("#header"), gnb = $("#gnb"), _idx, 
		 	ary = num.split(",");
		 	dim = "<span class='dimd'></span>";

		 vv == false ? ifval=false : ifval=true;



	 	function pcGnb(){
	 		if(pc==1) return false;

	 		$('.btn-search-open button').unbind("click");
	 		$("#gnb-search .btn-close").unbind("click");
	 		$('.btn-menu-open a').unbind("click");
	 		$("#gnb h2 a,#gnb h3 a").unbind("click");
	 		$(".header-bottom").show();

			$("h2 a", gnb).on("mouseenter", function(){
				var $this = $(this);

				if($this.hasClass("btn-category")) _idx = 5;
				else _idx = $this.closest("li").index();

				if(!header.hasClass('open')) $("#wrap").prepend(dim);

				$this.closest("h2").addClass("over");
				$("h2", gnb).not($this.closest("h2")).removeClass("over");

				if(ifval==true) $("h2", gnb).not("h2.over").next(".depth2menu").hide();
				
				header.addClass("open").stop().animate({"padding-bottom": ary[_idx]+'px'}, spd, 'swing', function(){
					if(ifval==true) $this.closest("h2").next(".depth2menu").fadeIn(100);
					else $('.depth2menu').fadeIn(100);
				});
			})
			gnb.on("mouseleave", function(){
				$("h2.over", gnb).removeClass("over");
				$(".depth2menu").fadeOut(50);
				header.stop().animate({'padding-bottom': 0}, spd, 'swing', function(){
					$("#wrap .dimd").fadeOut(100, function(){
						$(this).remove();
						header.removeClass("open");
					})
				});
			})

			pc++, mo=0;
		};

		function moGnb(){
			if(mo==1) return false;

			gnb.unbind("mouseleave");
			$("h2 a", gnb).unbind("mouseenter");

			// 주메뉴 열기
			$('.btn-menu-open button').on("click", function(){
				$(".gnb > li:first-child .depth2menu",gnb).show();
				$(".gnb > li:first-child h2 a",gnb).addClass("clicked");

				$("#wrap").prepend(dim).find("#header").addClass("open");
				$(this).attr({"aria-expanded": true});
				$("#gnb-mo").show().animate({'right': 0}, spd, "swing").focus();
				return false;
			});
			// 주메뉴 닫기
			$('#gnb-mo .btn-close').on("click", function(){
				$("#gnb-mo").animate({'right': -100+"%"}, spd, "swing", function(){
					$(this).hide();
					$(".btn-menu-open button").attr({"aria-expanded": false}).focus();
					$("#wrap .dimd").remove();
					header.removeClass("open");
				});

				$(".clicked", gnb).removeClass("clicked");
				$(".depth2menu", gnb).hide();
				$(".depth3menu", gnb).hide();
				return false;
			});
			// 주메뉴 1depth
			$("#gnb h2 a").on("click", function(){
				var $this = $(this);

				if($this.closest("li").find('.group').length < 1) return;

				if($this.hasClass("clicked")) return false;

				$this.addClass("clicked");
				$this.closest("h2").next(".depth2menu").show();
				$this.closest("li").siblings().find(".depth2menu").hide();
				$this.closest("li").siblings().find(".clicked .depth3menu").hide();
				$this.closest("li").siblings().find(".clicked").removeClass("clicked");

				return false;
			});
			// 주메뉴 2depth
			$("#gnb h3 a").on("click", function(){
				var $this = $(this).closest(".group");

				if($this.find(".depth3menu").length < 1) return;

				$this.siblings(".group.clicked").removeClass("clicked").find(".depth3menu").slideUp(spd);
				$this.closest(".menugroup").siblings(".menugroup").find(".clicked").removeClass("clicked").find(".depth3menu").slideUp(spd);
				$this.toggleClass('clicked').find(".depth3menu").slideToggle(spd);
			})

			// 검색영역 열기
			$('.btn-search-open button').on("click", function(){
				$(this).attr({"aria-expanded": true});
				$("#gnb-search").show().animate({"left": 0}, spd, function(){
					$(this).find("input[type=text]").focus();
				});
				return false;
			})
			// 검색영역 닫기
			$("#gnb-search .btn-close").on("click", function(){
				$("#gnb-search").animate({"left": -100+'%'}, spd, function(){
					$(this).hide();
				});
				$(".btn-search-open button").attr({"aria-expanded": false}).focus();
				return false;
			})

			mo++, pc=0;
		};

		// default
		if($(window).width() > 1024 ) pcGnb();
		else moGnb();

		// resize
		$(window).resize(function(){
			if($(window).width() > 1024) pcGnb();
			else moGnb();
		})
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
	// SUBPAGE TOP VISUAL
	var compTopbg = (function(){
		if($(".top-visual-zone").length < 1) return false;

		var vz = $(".top-visual-zone"),
			 bg = vz.find(".bgimg").attr("src");

		vz.css({"background": "url("+bg+") no-repeat 50% 50%", "background-size": "cover"});
	})();

	// TAB 
	var compTab = (function(){
		$('*[role=tab]').on("click", function(){
			var $this = $(this), gototab = "#"+$this.attr("aria-controls"), spd=300, motion;

			if($this.closest("*[role=tablist]").attr('data-js') == 'false') return;


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

		var spd=300, pc = true, _w = 156;

		if($(window).width() < 1025) pc = false;
		else pc = true;
		
		$(".icon-sns, .icon-qrcode").on("click", function(){
			var $this = $(this);

			if($(".page-utile").hasClass('none')) return false;

			if(pc==true) _w = 156;
			else _w = 115;

			$this.addClass('open').attr("aria-expanded", true);		
			$this.closest(".page-utile").addClass("none");

			if($this.hasClass('icon-qrcode')) {
				$this.next("div[role='dialog']").stop().slideDown(spd);
			}else {
				$this.next("div[role='dialog']").stop().show(0,function(){
					$(this).animate({"width": _w+'px'},spd).focus();

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

		$(window).on("resize", function(){
			if($(window).width() < 1025) pc = false;
			else pc = true;
		})
	})();

	// DATEPICKER
	var compDatepicker = (function(){
		$( ".js-datepicker" ).datepicker({
			selectOtherMonths: true,
			showOtherMonths: true,
			dateFormat: 'yy-mm-dd'
		});
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