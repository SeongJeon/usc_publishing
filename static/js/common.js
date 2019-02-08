// 진입 모바일
if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	$("body").addClass("mobile");
	if(navigator.userAgent.match(/iP(hone|od)|iPad/)) {$("body").addClass("ios");}
}else{$("body").addClass("pc"); }

if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.match(/iP(hone|od)|iPad/) == null) {
	$("body").addClass("safari");
}

var downy = {
	// GNB
	gnbEvent: function(){
		var $header = $("#header"), $gnb = $("#gnb"), spd = 200, pc=0, mo=0, tablet=0;

		// default
		if($(window).width() > 1024 ) pcGnb();
		else if($(window).width() > 767) tabletGnb();
		else moGnb();

		// resize
		$(window).resize(function(){
			if($(window).width() > 1024) pcGnb();
			else if($(window).width() > 767) tabletGnb();
			else moGnb();
		})

		// PC GNB
		function pcGnb(){
			if(pc==1) return false;
			// unbind
			$('h2', $gnb).off("click");
			$('body').off("click");
			// default
			$header.css({'padding-bottom': "0"}).removeClass("open");
			$("li.on", $gnb).removeClass('on').find(".depth").hide();
			$gnb.show();
			// mouse over
			$('h2', $gnb).on("mouseenter", function(){
				var _this = $(this);
				if($gnb.find("li.on").length < 1) {
					$header.stop().animate({"padding-bottom": "60px"}, spd, 'swing', function(){
						_this.next(".depth").fadeIn(spd);
					});
				}else {
					_this.closest("li").siblings().find('.depth').hide();
					_this.next(".depth").fadeIn(spd);
				}
				_this.closest("li").addClass("on").siblings().removeClass("on");
			})
			// mouse leave
			$header.on("mouseleave", function(){
				$(this).stop().animate({"padding-bottom": "0"}, 0);
				$("li.on",$gnb).removeClass('on').find('.depth').hide();
			})
			pc++, mo=0, tablet=0;
		}
		// MOBILE GNB
		function moGnb(){
			if(mo==1) return false;
			// unbind
			$('h2', $gnb).off("mouseenter");
			$('h2', $gnb).off("click");
			$('body').off("click");
			$header.off("mouseleave");
			// default
			$gnb.hide();
			$header.css({"padding-bottom": "0"}).removeClass("open");
			$("li.on", $gnb).removeClass("on").find(".depth").hide();
			// gnb open
 			$(".btn-gnb").on("click", function(){
 				$gnb.fadeIn(spd);
 			})
 			// gnb close
 			$(".btn-gnb-close").on("click", function(){
 				$gnb.hide();
 				$("li.on", $gnb).removeClass("on").find(".depth").hide();
 			})
 			// gnb menu click
 			$("h2", $gnb).on("click", function(){
 				var _this = $(this).closest("li");
 				if(_this.hasClass("on")){
					_this.find(".depth").slideUp(spd);
 				}else{
 					_this.siblings().find(".depth").slideUp(spd);
 					_this.find(".depth").slideDown(spd);
 				}
 				_this.toggleClass("on").siblings().removeClass('on');
 				return false;
 			})
 			mo++, pc=0, tablet=0;
		}
		// TABLET GNB
		function tabletGnb(){
			if(tablet==1) return false;
			// unbind
			$('h2', $gnb).off("mouseenter");
			$('h2', $gnb).off("click");
			$header.off("mouseleave");
			// default
			$gnb.show();

			// click
			$('h2', $gnb).on("click", function(){
				var _this = $(this);
				if($gnb.find("li.on").length < 1) {
					$header.stop().animate({"padding-bottom": "60px"}, spd, 'swing', function(){
						_this.next(".depth").fadeIn(spd);
						$header.addClass("open");
					});
				}else {
					if(_this.closest("li").hasClass("on")){
						$header.stop().animate({"padding-bottom": "0"}, 0).removeClass("open");
						_this.closest("li").find('.depth').hide();
					}else{
						_this.closest("li").siblings().find('.depth').hide();
						_this.next(".depth").fadeIn(spd);
					}
				}
				_this.closest("li").toggleClass("on").siblings().removeClass("on");
				return false;
			})
			// body click
			$('body').on("click", function(e){
				if($header.hasClass("open")){
					if(!$header.has(e.target).length){
						$header.stop().animate({"padding-bottom": "0"}, spd).removeClass("open");
						$("li.on",$gnb).removeClass('on').find('.depth').hide();
					}
				}
			})
			tablet++, mo=0, pc=0;
		}
	},

	// TAB SHOW / HIDE
	tabEvent : function(tabName, hasClassName, contName, liName){
		if($(tabName).length < 1) return false;
		liName == undefined ? liName = "li" : liName;

		var curr = 0, spd=500;

		// default
		$(contName).eq($(tabName).find("."+hasClassName).index()).show().siblings(contName).hide();
		$(contName).eq($(tabName).find("."+hasClassName).index()).show().siblings(contName).css({
			"overflow-y": 'hidden',
			'height': 0
		});

		// click
		$(tabName).find(liName).on("click", function(){
			if($(this).hasClass(hasClassName)) return false;

			curr = $(this).index();
			$(this).addClass(hasClassName).siblings().removeClass(hasClassName);
			$(contName).eq(curr).fadeIn(spd).siblings(contName).hide();
			$(contName).eq(curr).css({
				"height": "auto"
			}).siblings(contName).css({
				"height": 0
			});

			return false;
		});
	},

	// slick
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
	}
}


$(document).ready(function(){
	// MAIN GNB
	downy.gnbEvent();
	// MAIN TAB
	var mainTab = (function(){
		if($("#container").hasClass("main") == false) return false;

		var curr = 0, spd=500, contName = '.tab-contents', tabName = '.tab-list-zone', hasClassName = 'current', liName = 'li', sc;

		// default
		downy.slickEvent();
		$(contName).eq($(tabName).find("."+hasClassName).index()).addClass('on').show().siblings(contName).css({'height': 0
		});

		// click
		$(tabName).find(liName).on("click", function(){
			if($(this).hasClass(hasClassName)) return false;

			if($(this).hasClass("closed")){
				sc = $(window).scrollTop();
				$("#wrap").css({"top": -sc+"px"});
				$("#layer").fadeIn(spd).addClass("open");
				$("body, html").css({"overflow": "hidden"});
			}else{
				curr = $(this).index();
				$(this).addClass(hasClassName).siblings().removeClass(hasClassName);
				$(contName).eq(curr).addClass('on').css({"height": "auto"}).siblings(contName).removeClass('on').css({"height": 0});
			}

			return false;
		});
		// layer popup
		// $('.tab-contents.tab1 .product-lst').find("li:nth-child(3)").on("click", function(){
		// 	sc = $(window).scrollTop();
		// 	$("#wrap").css({"top": -sc+"px"});
		// 	$("#layer").fadeIn(500).addClass("open");
		// 	$("body, html").css({"overflow": "hidden"});
		// 	return false;
		// });
		$("#layer .btn-close").on("click", function(){
			$("#layer").hide(0, function(){
				$(this).removeClass("open");
				$("#wrap").css({"top": 0});
				$("body, html").css({"overflow": ""});
				$(window).scrollTop(sc);
			});
		});
	})();

	// PRODUCT SLIDER
	var productIntroduce =(function(){
		if($("#content").hasClass("downy-introduce") == false) return false;

		// slick
		downy.slickEvent();

		// 임시 팝업 CLICK - 컨텐츠 오픈 후 삭제
		/*
		var sc;
		$('.itd-tab').find("li:nth-child(3)").on("click", function(){
			sc = $(window).scrollTop();
			$("#wrap").css({"top": -sc+"px"});
			$("#layer").fadeIn(500).addClass("open");
			$("body, html").css({"overflow": "hidden"});
			return false;
		})
		// 임시 팝업 CLOSED CLICK - 컨텐츠 오픈 후 삭제
		$("#layer .btn-close").on("click", function(){
			$("#layer").hide(0, function(){
				$(this).removeClass("open");
				$("#wrap").css({"top": 0});
				$("body, html").css({"overflow": "inherit"});
				$(window).scrollTop(sc);
			});
		})
		*/

	})();

	// ready popup
	var readyPop = (function(){
		if($("#content").hasClass("downy-introduce") == false) return false;

		var btn = $(".product-lst .btn-type2.color2");

		btn.on("click", function(){
			var v = $(this).attr("href"), html = '<p class="noti-ready">준비중입니다.</p>', _this = $(this);

			if(v == "#" || v == null || v==undefined){
				if($(this).hasClass("ready")) return false;

				$(this).addClass("ready").after(html);
				setTimeout(function() {
					_this.removeClass("ready").next(".noti-ready").animate({"opacity": 0}, 200, function(){
						$(this).remove();
					})
				 }, 1500);
				return false;
			}
		})
	})();

	var closePop = (function(){
		$("#layer.addchoices .btn").on("click", function(){
			$(this).closest("#layer").removeClass("open").hide();
		})
	})();
})
