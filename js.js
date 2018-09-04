/*
 * Created by Sun Wen on 2018/9/3.
 */
$(function (){
	var container = $('.container')
	var scroller = $('.scroller')
	document.body.addEventListener('touchmove', function (e){
		e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
	}, {passive: false}); //passive 参数不能省略，用来兼容ios和android
	container.width(window.innerWidth)
	container.height(window.innerHeight)
	// 初始化
	let [startx, starty, totalx, totaly, movex, movey, y, time1, time2, time, distancey, g] = [0]
	let maxX = 0;
	let maxY = -(scroller.height() - container.height()) //top最大值  totaly
	//事件绑定
	scroller.bind('touchstart', window, touchstart)
	scroller.bind('touchmove', window, touchmove)
	scroller.bind('touchend', window, touchend)
	function touchstart(e){
		// console.log(e.originalEvent);
		let touch = e.originalEvent.targetTouches[0];
		starty = touch.clientY;
		time1 = new Date().getTime()
		distancey = totaly
		scroller.stop(true, false)
		animationEnd()
		g = 0
		movey = 0
		time = 0
	}
	function touchmove(e){
		let touch = e.originalEvent.targetTouches[0];
		let nowy = touch.clientY;
		movey = nowy - starty;//y方向上移动的距离
		distancey = totaly + movey
		if ((distancey < 0)) {//边界的控制
			if (totaly + movey > maxY) {
				y = distancey
			} else {
				y = maxY
			}
		} else {
			y = 0
		}
		scroller.css('top', y)
	}
	function touchend(e){
		if ((distancey < 0)) {//边界的控制
			if (totaly + movey > maxY) {
				totaly = distancey
			} else {
				totaly = maxY
			}
		} else {
			totaly = 0
		}
		moveSlowly(movey)
	}
	function moveSlowly(movey){
		// console.log(movey);
		time2 = new Date().getTime()
		time = time2 - time1
		if ((Math.abs(movey) > 200) && (time < 200)) {
			g = (movey / time).toFixed(1)	//加速度计算
			totaly = totaly * (1 - g * 0.3);
				if ((totaly < 0)) {//边界的控制
					if (totaly > maxY) {
						scroller.animate({'top': totaly}, 1000, 'easeOutSine', animationEnd)
					} else {
						scroller.animate({'top': maxY}, 1000, 'easeOutSine', animationEnd)
					}
				} else {
					scroller.animate({'top': 0}, 1000, 'easeOutSine', animationEnd)
				}
		}
	}
	function animationEnd(){
		totaly = scroller.position().top
	}
})
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
*/
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing,
	{
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d){
			//alert(jQuery.easing.default);
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInQuad: function (x, t, b, c, d){
			return c * (t /= d) * t + b;
		},
		easeOutQuad: function (x, t, b, c, d){
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		easeInCubic: function (x, t, b, c, d){
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic: function (x, t, b, c, d){
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart: function (x, t, b, c, d){
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart: function (x, t, b, c, d){
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint: function (x, t, b, c, d){
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint: function (x, t, b, c, d){
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine: function (x, t, b, c, d){
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOutSine: function (x, t, b, c, d){
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOutSine: function (x, t, b, c, d){
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		easeInExpo: function (x, t, b, c, d){
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d){
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d){
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (x, t, b, c, d){
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOutCirc: function (x, t, b, c, d){
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOutCirc: function (x, t, b, c, d){
			if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		easeInElastic: function (x, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic: function (x, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d / 2) == 2) return b + c;
			if (!p) p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		easeInBack: function (x, t, b, c, d, s){
			if (s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s){
			if (s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack: function (x, t, b, c, d, s){
			if (s == undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		easeInBounce: function (x, t, b, c, d){
			return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d){
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOutBounce: function (x, t, b, c, d){
			if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
			return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	});
