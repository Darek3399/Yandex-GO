
const mTicketSlides = document.querySelectorAll(`.mticket__slide-item`);


// СОЗДАНИЕ "ТОЧЕК" НА ОСНОВЕ ДЛИНЫ МАССИВА-------------------------------
const setMTicketDots = () => {
// dots for mticket
	for (let i = 0; i < mTicketSlides.length; i++) {
		const mTicketSlidesDot = document.createElement(`div`);
		document.querySelector(`.mticket__dots`).append(mTicketSlidesDot);
		mTicketSlidesDot.setAttribute(
			`style`,
			`background-color: #aaa9a7; width: 9px; height: 9px; border-radius: 50%; cursor: pointer;`
		);

		mTicketSlidesDot.setAttribute(`id`, `${i}mticket__dot`);
		mTicketSlidesDot.setAttribute(`class`, `mticket__dot`);
	}
}
setMTicketDots()
// СМЕНА ЦВЕТА ТОЧКИ, РАВНОЙ ЭЛЕМЕНТУ МАССИВА СО ЗНАЧЕНИЕМ left === `3%`---------------------------
const colorMTicket = () => {
		const mTicketSlidesDots = document.querySelectorAll(`.mticket__dot`);
	for (let i = 0; i < mTicketSlides.length; i++) {
		if (mTicketSlides[i].style.left === `3%`) {

			mTicketSlidesDots[i].style.backgroundColor = `#21201f`;
		} else {
			mTicketSlidesDots[i].style.backgroundColor = `#aaa9a7`;
		}
	}
}
colorMTicket()
// ПЕРЕМЕЩАЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ НАЖАТОЙ ТОЧКИ----------------------------------
const setMTicketNewPosition = () => {
	const mTicketSlidesDots = document.querySelectorAll(`.mticket__dot`);
	for (let item of mTicketSlidesDots) {
		item.addEventListener("click", () => {
			for (let i = 0; i < mTicketSlides.length; i++) {
				mTicketSlides[i].style.left = `${((parseInt(mTicketSlides[i].id) - 1) * 100) + 3}%`
				mTicketSlides[i].style.left = `${parseInt(mTicketSlides[i].style.left) - ((parseInt(item.id)) * 100)}%`
			}
			colorMTicket();
		})

		
		item.onmouseover = () => {
			if (item.style.backgroundColor == "rgb(170, 169, 167)") {
				item.style.backgroundColor = "#6c6c6c";
			}
		}
		item.onmouseout = () => {
			if (item.style.backgroundColor == "rgb(33, 32, 31)") {
				item.style.backgroundColor = "rgb(33, 32, 31)";
			} else {
				item.style.backgroundColor = "#aaa9a7";
			}
		}



	}
}
setMTicketNewPosition()
// СЕТАЕМ ИЗНАЧАЛЬНОЕ РАЗПОЛОЖЕНИЕ БЛОКОВ
const setMTicketGap = () => {
	// console.log(parseInt(mTicketSlides[i].id))
	for (let i = 0; i < mTicketSlides.length; i++) {
		mTicketSlides[i].style.left = `${((parseInt(mTicketSlides[i].id) - 1) * 100) + 3}%`
	}
}
setMTicketGap()
// СМЕЩЕНИЕ ПРИ ПЕРЕТАСКИВАНИИ И ПЛАВНЫЙ ВОЗВРАТ ПРИ ОТПУСКАНИИ--------------------------
for (let item of mTicketSlides) {

	// СЕТАЕМ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ НАЖАТИЯ
	item.addEventListener('touchstart', function (event) {
		if (event.targetTouches.length == 1) {
			let touch = event.targetTouches[0]
			touchOffsetX = touch.pageX
		}
		initIndent = []
		for (let i = 0; i < mTicketSlides.length; i++) {
			initIndent[i] = mTicketSlides[i].getBoundingClientRect().left
		}

	})

	// ОБНОВЛЯЕМ ПОЛОЕНИЕ ЭЛЕМЕНТОВ ПРИ ДВИЖЕНИИ по ТАЧУ
	item.addEventListener('touchmove', function (event) {
		for (let i = 0; i < mTicketSlides.length; i++) {
			let target = initIndent[i] - (touchOffsetX - event.changedTouches[0].pageX)

			mTicketSlides[i].style.transition = '0s'
			mTicketSlides[i].style.left = target + 'px'
		}
	})

	// ЦЕНТРУЕМ ПОЛОЖЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ БЛИЖАЙШЕГО К "left" ПОСЛЕ ОТЖАТИЯ ТАЧА
	item.addEventListener('touchend', function () {
		let arr = []

		for (let i = 0; i < mTicketSlides.length; i++) {
			mTicketSlides[i].style.transition = '1s ease-in-out'
			arr[i] = Math.abs(parseInt(mTicketSlides[i].style.left))
		}


		for (let i = 0; i < mTicketSlides.length; i++) {
			if (Math.min(...arr) == arr[i]) {
				for (let w = 0; w < mTicketSlides.length; w++) {
					mTicketSlides[w].style.left = `${((parseInt(mTicketSlides[w].id) - 1) * 100) - (i * 100) + 3}%`
				}
			}
		}
		colorMTicket()
	});

}

