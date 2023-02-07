


const carefulArrayCntr = document.querySelector(`.careful__swiper-video-cntr`)
const carefulArray = document.querySelectorAll(`.careful__video`)


const setDots = () => {
	for (let i = 0; i < carefulArray.length; i++) {
		const dot = document.createElement(`div`);
		document.querySelector(`.careful__swiper-dots`).append(dot);
		dot.setAttribute(
			`style`,
			`background-color: #aaa9a7; width: 9px; height: 9px; border-radius: 50%; cursor: pointer;`
		);
		dot.setAttribute(`id`, `${i}`);
		dot.setAttribute(`class`, `dot`);
		carefulArray[i].setAttribute(`id`, `${i}careful__video`);
	}
};
setDots();


const dots = document.querySelectorAll(`.dot`);
const color = () => {
	for (let i = 0; i < carefulArray.length; i++) {
		if (carefulArray[i].style.right === "0%") {
			dots[i].style.backgroundColor = `#21201f`;
		} else {
			dots[i].style.backgroundColor = `#aaa9a7`;
		}
	}
};
color();


let setMargin = setInterval(() => {
	let r = parseInt(carefulArray[carefulArray.length - 1].style.right)

	if (r < 0) {
		for (let i = 0; i < carefulArray.length; i++) {
			carefulArray[i].style.right = `${parseInt(carefulArray[i].style.right) + 100}%`;
		}
	} else {
		for (let i = 0; i < carefulArray.length; i++) {
			carefulArray[i].style.right = `-${((parseInt(carefulArray[i].id)) * 100)}%`
		}
	}
	color()
}, 15000)

const toggleInterval = () => {
	for (let item of carefulArray) {
		item.addEventListener("play", () => {
			if (!carefulArray[parseInt(item.id)].paused) {
				clearInterval(setMargin);
			}
		});
		item.addEventListener("pause", () => {
			setMargin = setInterval(() => {
				let r = parseInt(carefulArray[carefulArray.length - 1].style.right)

				if (r < 0) {
					for (let i = 0; i < carefulArray.length; i++) {
						carefulArray[i].style.right = `${parseInt(carefulArray[i].style.right) + 100}%`;
					}
				} else {
					for (let i = 0; i < carefulArray.length; i++) {
						carefulArray[i].style.right = `-${((parseInt(carefulArray[i].id)) * 100)}%`
					}
				}
				color();
			}, 15000)
		});
	}
};
toggleInterval()


for (let item of dots) {
	item.onmouseover = () => {
		if (item.style.backgroundColor == "rgb(170, 169, 167)") {
			item.style.backgroundColor = "#6c6c6c";
		}
	};
	item.onmouseout = () => {
		if (item.style.backgroundColor == "rgb(33, 32, 31)") {
			item.style.backgroundColor = "rgb(33, 32, 31)";
		} else {
			item.style.backgroundColor = "#aaa9a7";
		}
	};
	item.addEventListener('click', () => {
		for (let i = 0; i < carefulArray.length; i++) {
			carefulArray[i].style.right = `-${(parseInt(carefulArray[i].id)) * 100}%`

			carefulArray[i].style.right = `${(parseInt(carefulArray[i].style.right) + (parseInt(item.id)) * 100)}%`
		}
		toggleInterval()
		color();
		clearInterval(setMargin);
		setMargin = setInterval(() => {
			let r = parseInt(carefulArray[carefulArray.length - 1].style.right)
			if (r < 0) {
				for (let i = 0; i < carefulArray.length; i++) {
					carefulArray[i].style.right = `${parseInt(carefulArray[i].style.right) + 100}%`;
				}
			} else {
				for (let i = 0; i < carefulArray.length; i++) {
					carefulArray[i].style.right = `-${((parseInt(carefulArray[i].id)) * 100)}%`
				}
			}
			color();
		}, 15000)
	})
}


// // СЕТАЕМ ИЗНАЧАЛЬНОЕ РАЗПОЛОЖЕНИЕ БЛОКОВ
const setCurrentGap = () => {
	for (let i = 0; i < carefulArray.length; i++) {
		carefulArray[i].style.right = `-${((parseInt(carefulArray[i].id)) * 100)}%`
	}
	color();
}
setCurrentGap()



// // СМЕЩЕНИЕ ПРИ ПЕРЕТАСКИВАНИИ И ПЛАВНЫЙ ВОЗВРАТ ПРИ ОТПУСКАНИИ--------------------------
for (let item of carefulArray) {
	let rrr = false
	let arr = []

	const offsetRight = (i) => {
		return carefulArrayCntr.offsetWidth - (carefulArray[i].offsetWidth + carefulArray[i].offsetLeft)
	}

	// СЕТАЕМ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ НАЖАТИЯ
	item.addEventListener('mousedown', (e) => {



		clearInterval(setMargin);
		rrr = true

		initIndent = []
		touchOffsetX = e.screenX

		for (let i = 0; i < carefulArray.length; i++) {
			initIndent[i] = offsetRight(i)
		}


		// ОБНОВЛЯЕМ ПОЛОЖЕНИЕ ЭЛЕМЕНТОВ ПРИ ДВИЖЕНИИ КУРСОРА
		document.addEventListener('mousemove', (event) => {
			if (!rrr) {
				return
			}

			for (let i = 0; i < carefulArray.length; i++) {


				let target = initIndent[i] + (touchOffsetX - event.screenX)


				carefulArray[i].style.transition = '0s'
				carefulArray[i].style.right = `${target}px`
			}

		})


		document.onmouseup = () => {
			clearInterval(setMargin);
			
			rrr = false





			for (let i = 0; i < carefulArray.length; i++) {
				carefulArray[i].style.transition = '1s ease-in-out'
				arr[i] = Math.abs(offsetRight(i))
			}



			for (let i = 0; i < carefulArray.length; i++) {
				if (Math.min(...arr) == arr[i]) {
					for (let w = 0; w < carefulArray.length; w++) {

						carefulArray[w].style.right = `${ (i * 100) - ((parseInt(carefulArray[w].id)) * 100)}%`






					}
				}
			}

			if (parseInt(carefulArray[carefulArray.length - 1].style.left) < 100) {
				for (let t = 0; t < carefulArray.length; t++) {
					carefulArray[t].style.right = `${(parseInt(carefulArray[t].id) * 100) - ((carefulArray.length - 1) * 100)}%`
				}
			}









			color()
			setMargin = setInterval(() => {
				let r = parseInt(carefulArray[carefulArray.length - 1].style.right)
			
				if (r < 0) {
					for (let i = 0; i < carefulArray.length; i++) {
						carefulArray[i].style.right = `${parseInt(carefulArray[i].style.right) + 100}%`
					}
				} else {
					for (let i = 0; i < carefulArray.length; i++) {
						carefulArray[i].style.right = `-${((parseInt(carefulArray[i].id)) * 100)}%`
					}
				}
				color()
			}, 15000)
		}
	})
}


















































// Получаем коллекцию блоков слайдера
const carefulMobileCntr = document.querySelectorAll(`.careful__mobile-swiper-video-cntr`);

// СОЗДАНИЕ "ТОЧЕК" НА ОСНОВЕ ДЛИНЫ МАССИВА-------------------------------
const setCarefulMobileDots = () => {
	// dots for Careful Mobil
	for (let i = 0; i < carefulMobileCntr.length; i++) {
		const carefulMobileDot = document.createElement(`div`);
		document.querySelector(`.careful__mobile-swiper-dots`).append(carefulMobileDot);
		carefulMobileDot.setAttribute(
			`style`,
			`background-color: #aaa9a7; width: 9px; height: 9px; border-radius: 50%; cursor: pointer;`
		);


		carefulMobileDot.setAttribute(`id`, `${i}mobile-swiper-dot`);
		carefulMobileDot.setAttribute(`class`, `mobile-swiper-dot`);
		carefulMobileCntr[i].setAttribute(`id`, `${i}careful-mobile-video`)
	}
}
setCarefulMobileDots()

// СМЕНА ЦВЕТА ТОЧКИ, РАВНОЙ ЭЛЕМЕНТУ МАССИВА СО ЗНАЧЕНИЕМ left === `3%`---------------------------
const colorCarefulMobile = () => {

	const CarefulMobileDots = document.querySelectorAll(`.mobile-swiper-dot`);
	for (let i = 0; i < carefulMobileCntr.length; i++) {
		if (carefulMobileCntr[i].style.left === `3%`) {

			CarefulMobileDots[i].style.backgroundColor = `#21201f`;
		} else {
			CarefulMobileDots[i].style.backgroundColor = `#aaa9a7`;
		}



		CarefulMobileDots[i].onmouseover = () => {
			if (CarefulMobileDots[i].style.backgroundColor == "rgb(170, 169, 167)") {
				CarefulMobileDots[i].style.backgroundColor = "#6c6c6c";
			}
		}
		CarefulMobileDots[i].onmouseout = () => {
			if (CarefulMobileDots[i].style.backgroundColor == "rgb(33, 32, 31)") {
				CarefulMobileDots[i].style.backgroundColor = "rgb(33, 32, 31)";
			} else {
				CarefulMobileDots[i].style.backgroundColor = "#aaa9a7";
			}
		}
	}
}
colorCarefulMobile()







// ПЕРЕМЕЩАЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ НАЖАТОЙ ТОЧКИ----------------------------------
const setCarefulMobileNewPosition = () => {
	const carefulMobileDots = document.querySelectorAll(`.mobile-swiper-dot`);
	for (let item of carefulMobileDots) {
		item.addEventListener("click", () => {
			for (let i = 0; i < carefulMobileCntr.length; i++) {

				carefulMobileCntr[i].setAttribute(`style`, `left: ${(parseInt(carefulMobileCntr[i].id) * 100) + 3}%`)
				carefulMobileCntr[i].setAttribute(`style`, `left: ${parseInt(carefulMobileCntr[i].style.left) - ((parseInt(item.id)) * 100)}%`)
				carefulMobileCntr[i].style.transition = '1s ease-in-out'
			}
			colorCarefulMobile();
		});
	}
}
setCarefulMobileNewPosition()












// СЕТАЕМ ИЗНАЧАЛЬНОЕ РАЗПОЛОЖЕНИЕ БЛОКОВ
const setCarefulMobileGap = () => {
	for (let i = 0; i < carefulMobileCntr.length; i++) {

		carefulMobileCntr[i].setAttribute(`style`, `left: ${(parseInt(carefulMobileCntr[i].id) * 100) + 3}%`)


	}
}
setCarefulMobileGap()







// СЕТАЕМ ВЫСОТУ ВИДЕО КОНТЕЙНЕРА---------------------
const setCarefulMobileHeight = () => {


	const style = document.createElement(`style`)
	style.setAttribute(`id`, `styleHeight`)
	document.head.appendChild(style)



	const swiper = document.querySelector(`.careful__mobile-swiper`)
	const swiperCntr = document.querySelector(`.careful__mobile-video`)
	// swiperCntr.style.height = swiperCntr.getBoundingClientRect().width / 100 * 177


	swiper.setAttribute(`style`, `height: ${Math.floor(swiperCntr.getBoundingClientRect().width / 100 * 177)}px;`)


}
setCarefulMobileHeight()
window.addEventListener('resize', function () {
	setCarefulMobileHeight()
});






// СМЕЩЕНИЕ ПРИ ПЕРЕТАСКИВАНИИ И ПЛАВНЫЙ ВОЗВРАТ ПРИ ОТПУСКАНИИ--------------------------
for (let item of carefulMobileCntr) {

	// СЕТАЕМ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ НАЖАТИЯ
	item.addEventListener('touchstart', function (event) {
		if (event.targetTouches.length == 1) {
			let touch = event.targetTouches[0]
			touchOffsetX = touch.pageX
		}
		initIndent = []
		for (let i = 0; i < carefulMobileCntr.length; i++) {
			initIndent[i] = carefulMobileCntr[i].getBoundingClientRect().left
		}

	})

	// ОБНОВЛЯЕМ ПОЛОЕНИЕ ЭЛЕМЕНТОВ ПРИ ДВИЖЕНИИ по ТАЧУ
	item.addEventListener('touchmove', function (event) {
		for (let i = 0; i < carefulMobileCntr.length; i++) {
			let target = initIndent[i] - (touchOffsetX - event.changedTouches[0].pageX)

			carefulMobileCntr[i].style.transition = '0s'
			carefulMobileCntr[i].style.left = target + 'px'
		}
	})

	// ЦЕНТРУЕМ ПОЛОЖЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ БЛИЖАЙШЕГО К "left" ПОСЛЕ ОТЖАТИЯ ТАЧА
	item.addEventListener('touchend', function () {
		let arr = []

		for (let i = 0; i < carefulMobileCntr.length; i++) {
			carefulMobileCntr[i].style.transition = '1s ease-in-out'
			arr[i] = Math.abs(parseInt(carefulMobileCntr[i].style.left))
		}


		for (let i = 0; i < carefulMobileCntr.length; i++) {
			if (Math.min(...arr) == arr[i]) {
				for (let w = 0; w < carefulMobileCntr.length; w++) {
					carefulMobileCntr[w].style.left = `${(parseInt(carefulMobileCntr[w].id) * 100) - (i * 100) + 3}%`
				}
			}
		}
		colorCarefulMobile()
	});

}


















































// Получаем коллекцию блоков слайдера
const carefulMobileText = document.querySelectorAll(`.careful__info-item`);

// СОЗДАНИЕ "ТОЧЕК" НА ОСНОВЕ ДЛИНЫ МАССИВА-------------------------------
const setCarefulMobileTextDots = () => {
	// dots for tariff
	for (let i = 0; i < carefulMobileText.length; i++) {
		const carefulMobileTextDot = document.createElement(`div`);
		document.querySelector(`.careful__mobile-text-dots`).append(carefulMobileTextDot);
		carefulMobileTextDot.setAttribute(
			`style`,
			`background-color: #aaa9a7; width: 9px; height: 9px; border-radius: 50%; cursor: pointer;`
		);


		carefulMobileTextDot.setAttribute(`id`, `${i}careful__mobile-text-dot`);
		carefulMobileTextDot.setAttribute(`class`, `careful__mobile-text-dot`);
		carefulMobileText[i].setAttribute(`id`, `${i}careful__mobile-text`)
	}
}
setCarefulMobileTextDots()



// СМЕНА ЦВЕТА ТОЧКИ, РАВНОЙ ЭЛЕМЕНТУ МАССИВА СО ЗНАЧЕНИЕМ left === `3%`---------------------------
const colorCarefulMobileText = () => {

	const carefulMobileDots = document.querySelectorAll(`.careful__mobile-text-dot`);
	for (let i = 0; i < carefulMobileText.length; i++) {
		if (carefulMobileText[i].style.left === `3%`) {
			carefulMobileDots[i].style.backgroundColor = `#21201f`;
		} else {
			carefulMobileDots[i].style.backgroundColor = `#aaa9a7`;
		}



		carefulMobileDots[i].onmouseover = () => {
			if (carefulMobileDots[i].style.backgroundColor == "rgb(170, 169, 167)") {
				carefulMobileDots[i].style.backgroundColor = "#6c6c6c";
			}
		}
		carefulMobileDots[i].onmouseout = () => {
			if (carefulMobileDots[i].style.backgroundColor == "rgb(33, 32, 31)") {
				carefulMobileDots[i].style.backgroundColor = "rgb(33, 32, 31)";
			} else {
				carefulMobileDots[i].style.backgroundColor = "#aaa9a7";
			}
		}
	}
}
colorCarefulMobileText()







// ПЕРЕМЕЩАЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ НАЖАТОЙ ТОЧКИ----------------------------------
const setCarefulMobileTextNewPosition = () => {
	const carefulMobileDots = document.querySelectorAll(`.careful__mobile-text-dot`);
	for (let item of carefulMobileDots) {
		item.addEventListener("touchstart", () => {
			for (let i = 0; i < carefulMobileText.length; i++) {

				carefulMobileText[i].setAttribute(`style`, `left: ${(parseInt(carefulMobileText[i].id) * 100) + 3}%`)
				carefulMobileText[i].setAttribute(`style`, `left: ${parseInt(carefulMobileText[i].style.left) - ((parseInt(item.id)) * 100)}%`)
			}
			colorCarefulMobileText();
		});
	}
}
setCarefulMobileTextNewPosition()












// СЕТАЕМ ИЗНАЧАЛЬНОЕ РАЗПОЛОЖЕНИЕ БЛОКОВ
const setCarefulMobileTextGap = () => {
	for (let i = 0; i < carefulMobileText.length; i++) {
		carefulMobileText[i].setAttribute(`style`, `left: ${(parseInt(carefulMobileText[i].id) * 100) + 3}%`)
	}
}
setCarefulMobileTextGap()







// СМЕЩЕНИЕ ПРИ ПЕРЕТАСКИВАНИИ И ПЛАВНЫЙ ВОЗВРАТ ПРИ ОТПУСКАНИИ--------------------------
for (let item of carefulMobileText) {

	// СЕТАЕМ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ НАЖАТИЯ
	item.addEventListener('touchstart', function (event) {
		if (event.targetTouches.length == 1) {
			let touch = event.targetTouches[0]
			touchOffsetX = touch.pageX
		}
		initIndent = []
		for (let i = 0; i < carefulMobileText.length; i++) {
			initIndent[i] = carefulMobileText[i].getBoundingClientRect().left
			carefulMobileText[i].style.transition = '0s'
		}
	})

	// ОБНОВЛЯЕМ ПОЛОЕНИЕ ЭЛЕМЕНТОВ ПРИ ДВИЖЕНИИ по ТАЧУ
	item.addEventListener('touchmove', function (event) {
		for (let i = 0; i < carefulMobileText.length; i++) {
			let target = initIndent[i] - (touchOffsetX - event.changedTouches[0].pageX)

			carefulMobileText[i].style.left = target + 'px'
		}
	})

	// ЦЕНТРУЕМ ПОЛОЖЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ БЛИЖАЙШЕГО К "left" ПОСЛЕ ОТЖАТИЯ ТАЧА
	item.addEventListener('touchend', function () {
		let arr = []

		for (let i = 0; i < carefulMobileText.length; i++) {
			carefulMobileText[i].style.transition = '1s ease-in-out'
			console.log(carefulMobileText[i].style.transition)
			arr[i] = Math.abs(parseInt(carefulMobileText[i].style.left))
		}


		for (let i = 0; i < carefulMobileText.length; i++) {
			if (Math.min(...arr) == arr[i]) {
				for (let w = 0; w < carefulMobileText.length; w++) {
					carefulMobileText[w].style.left = `${(parseInt(carefulMobileText[w].id) * 100) - (i * 100) + 3}%`
				}
			}
		}
		colorCarefulMobileText()
	});

}








































// Получаем коллекцию блоков слайдера
const nav = document.querySelectorAll(`.nav__li`);




// СМЕНА ЦВЕТА ТОЧКИ, РАВНОЙ ЭЛЕМЕНТУ МАССИВА СО ЗНАЧЕНИЕМ left === `3%`---------------------------
const colorNav = () => {

	const carefulMobileDots = document.querySelectorAll(`.careful__mobile-text-dot`);
	for (let i = 0; i < carefulMobileText.length; i++) {
		if (carefulMobileText[i].style.left === `3%`) {
			carefulMobileDots[i].style.backgroundColor = `#21201f`;
		} else {
			carefulMobileDots[i].style.backgroundColor = `#aaa9a7`;
		}



		carefulMobileDots[i].onmouseover = () => {
			if (carefulMobileDots[i].style.backgroundColor == "rgb(170, 169, 167)") {
				carefulMobileDots[i].style.backgroundColor = "#6c6c6c";
			}
		}
		carefulMobileDots[i].onmouseout = () => {
			if (carefulMobileDots[i].style.backgroundColor == "rgb(33, 32, 31)") {
				carefulMobileDots[i].style.backgroundColor = "rgb(33, 32, 31)";
			} else {
				carefulMobileDots[i].style.backgroundColor = "#aaa9a7";
			}
		}
	}
}
colorNav()







// ПЕРЕМЕЩАЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ НАЖАТОЙ ТОЧКИ----------------------------------
const setNavNewPosition = () => {
	const carefulMobileDots = document.querySelectorAll(`.careful__mobile-text-dot`);
	for (let item of carefulMobileDots) {
		item.addEventListener("touchstart", () => {
			for (let i = 0; i < carefulMobileText.length; i++) {

				carefulMobileText[i].setAttribute(`style`, `left: ${(parseInt(carefulMobileText[i].id) * 100) + 3}%`)
				carefulMobileText[i].setAttribute(`style`, `left: ${parseInt(carefulMobileText[i].style.left) - ((parseInt(item.id)) * 100)}%`)
			}
			colorCarefulMobileText();
		});
	}
}
setCarefulMobileTextNewPosition()
