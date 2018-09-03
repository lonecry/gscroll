/*
 * Created by Sun Wen on 2018/9/3.
 */
$(function (){
	// 初始化
	let [startx, starty, totalx, totaly, movex, movey, y, time1, time2, time] = [0, 0, 0, 0, 0, 0, 0]
	let maxX = 0;
	let maxY = -($('.scroller').height() - 736) //top最大值  totaly
	movefuc = undefined
	//事件绑定
	$('.scroller').bind('touchstart', window, touchstart)
	$('.scroller').bind('touchmove', window, touchmove)
	$('.scroller').bind('touchend', window, touchend)
	function touchstart(e){
		let touch = e.originalEvent.targetTouches[0];
		starty = touch.clientY;
		time1 = new Date().getTime()
		distancey = totaly
		// console.log(touch);
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
		$('.scroller').css('top', y)
	}
	function touchend(e){
		if (movey <= 0) {
			// console.log("往上滑动 :" + movey + " px");
		} else {
			// console.log("往下滑动 :" + movey + " px");
		}
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
		if ((Math.abs(movey) > 200) && (time < 300)) {
			// console.log('缓动策略')
			// console.log('时间间隔 :' + time + ' ms');
			var g = (movey / time).toFixed(1)	//加速度计算
			if (movefuc) {
				clearInterval(movefuc)
			}
			var t = 1, s = 0
			movefuc = setInterval(function (){
				if (s < 2000) {
					// console.log('当前位置 :' + totaly);
					totaly = totaly + g * t ^ 2;
					console.log(g, t)
					if ((totaly < 0)) {//边界的控制
						if (totaly > maxY) {
							$('.scroller').css('top', totaly)
						} else {
							$('.scroller').css('top', maxY)
							clearInterval(movefuc)
						}
					} else {
						$('.scroller').css('top', 0)
						clearInterval(movefuc)
					}
				} else {
					clearInterval(movefuc)
				}
				t = t + 0.01;
				s += 50
			}, 10)
		}
	}
})