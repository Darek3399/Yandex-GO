
// Получаем коллекцию блоков слайдера
const tariffItems = document.querySelectorAll(`.tariff__cntr`);

// СОЗДАНИЕ "ТОЧЕК" НА ОСНОВЕ ДЛИНЫ МАССИВА-------------------------------
const setTariffDots = () => {
	// dots for tariff
	for (let i = 0; i < tariffItems.length; i++) {
		const tariffDot = document.createElement(`div`);
		document.querySelector(`.tariff__dots`).append(tariffDot);
		tariffDot.setAttribute(
			`style`,
			`background-color: #aaa9a7; width: 9px; height: 9px; border-radius: 50%; cursor: pointer;`
		);


		tariffDot.setAttribute(`id`, `${i}tariff__dot`);
		tariffDot.setAttribute(`class`, `tariff__dot`);
	}
}
setTariffDots()

// СМЕНА ЦВЕТА ТОЧКИ, РАВНОЙ ЭЛЕМЕНТУ МАССИВА СО ЗНАЧЕНИЕМ left === `3%`---------------------------
const colorTariff = () => {

	const tariffDots = document.querySelectorAll(`.tariff__dot`);
	for (let i = 0; i < tariffItems.length; i++) {
		if (tariffItems[i].style.left === `3%`) {

			tariffDots[i].style.backgroundColor = `#21201f`;
		} else {
			tariffDots[i].style.backgroundColor = `#aaa9a7`;
		}



		tariffDots[i].onmouseover = () => {
			if (tariffDots[i].style.backgroundColor == "rgb(170, 169, 167)") {
				tariffDots[i].style.backgroundColor = "#6c6c6c";
			}
		}
		tariffDots[i].onmouseout = () => {
			if (tariffDots[i].style.backgroundColor == "rgb(33, 32, 31)") {
				tariffDots[i].style.backgroundColor = "rgb(33, 32, 31)";
			} else {
				tariffDots[i].style.backgroundColor = "#aaa9a7";
			}
		}
	}
}
colorTariff()

// ПЕРЕМЕЩАЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ НАЖАТОЙ ТОЧКИ----------------------------------
const setTariffNewPosition = () => {
	const tariffDots = document.querySelectorAll(`.tariff__dot`);
	for (let item of tariffDots) {
		item.addEventListener("click", () => {
			for (let i = 0; i < tariffItems.length; i++) {
				tariffItems[i].style.left = `${((parseInt(tariffItems[i].id) - 1) * 100) + 3}%`
				tariffItems[i].style.left = `${parseInt(tariffItems[i].style.left) - ((parseInt(item.id)) * 100)}%`
			}
			colorTariff();
		});
	}
}
setTariffNewPosition()

// СЕТАЕМ ИЗНАЧАЛЬНОЕ РАЗПОЛОЖЕНИЕ БЛОКОВ
const setTariffGap = () => {
	for (let i = 0; i < tariffItems.length; i++) {
		tariffItems[i].style.left = `${((parseInt(tariffItems[i].id) - 1) * 100) + 3}%`
	}
}
setTariffGap()

// СМЕЩЕНИЕ ПРИ ПЕРЕТАСКИВАНИИ И ПЛАВНЫЙ ВОЗВРАТ ПРИ ОТПУСКАНИИ--------------------------
for (let item of tariffItems) {

	// СЕТАЕМ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ НАЖАТИЯ
	item.addEventListener('touchstart', function (event) {
		if (event.targetTouches.length == 1) {
			let touch = event.targetTouches[0]
			touchOffsetX = touch.pageX
		}
		initIndent = []
		for (let i = 0; i < tariffItems.length; i++) {
			initIndent[i] = tariffItems[i].getBoundingClientRect().left
		}

	})

	// ОБНОВЛЯЕМ ПОЛОЕНИЕ ЭЛЕМЕНТОВ ПРИ ДВИЖЕНИИ по ТАЧУ
	item.addEventListener('touchmove', function (event) {
		for (let i = 0; i < tariffItems.length; i++) {
			let target = initIndent[i] - (touchOffsetX - event.changedTouches[0].pageX)

			tariffItems[i].style.transition = '0s'
			tariffItems[i].style.left = target + 'px'
		}
	})

	// ЦЕНТРУЕМ ПОЛОЖЕНИЕ БЛОКОВ В ЗАВИСИМОСТИ ОТ БЛИЖАЙШЕГО К "left" ПОСЛЕ ОТЖАТИЯ ТАЧА
	item.addEventListener('touchend', function () {
		let arr = []


		for (let i = 0; i < tariffItems.length; i++) {
			arr[i] = Math.abs(parseInt(tariffItems[i].style.left))
			tariffItems[i].style.transition = '1s ease-in-out'
		}


		for (let i = 0; i < tariffItems.length; i++) {
			if (Math.min(...arr) == arr[i]) {
				for (let w = 0; w < tariffItems.length; w++) {
					tariffItems[w].style.left = `${((parseInt(tariffItems[w].id) - 1) * 100) - (i * 100) + 3}%`
				}
			}
		}
		colorTariff()
	});

}









































const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', "i");

const style = document.createElement(`style`)
document.head.appendChild(style)





// nav----------------------------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	style.insertAdjacentHTML(`beforeend`, `
		.nav {
		  justify-content: space-between;
		}
		.nav__logo {
		  margin-right: 20px;
		}
		.nav__logo img {
		  width: 105px;
		}
		.nav__ul {
		  font-size: 15px;
		}
		.nav__button {
		  margin-left: 20px;
		  padding: 14px 36px;
		  border-radius: 12px;
		  font-size: 14px;
		}`)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
		.nav {
			justify-content: center;
		}
		.nav__logo img {
		  width: 158px;
		}
		.nav__ul {
		  font-size: 16px;
		}
		.nav__button {
		  padding: 0 51px;
		  height: 50px;
		  border-radius: 18px;
		  font-size: 20px;
		}
		
		@media screen and (max-width: 787px) {
		  .nav__logo img {
			 width: 140px;
		  }
		  .nav__button {
			 padding: 0 45px;
		  }
		  .nav__button a {
			 font-size: 16px;
		  }
		}`)
}








// header-------------------------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	style.insertAdjacentHTML(`beforeend`, `
			.header__b-picture{
				display: none;
			}
		`)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
		.header__s-picture{
			display: none;
		}
		.header__button {
			font-size: 24px;
			padding: 32px 64px;
			border-radius: 24px;
		}
		`)
}




// b-w-city-------------------------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	style.insertAdjacentHTML(`beforeend`,
		`.b-w-city__mobi{
			font-size: 36px;
			max-width: 100vw;

		}
		.b-w-city__desc{
			display: none;
		}
		.b-w-city__links{
			width: 100%;
			max-width: 100%;
		}
		.b-w-city__scooter{
			position: relative;
			width: fit-content;
		}
		.b-w-city__scooter img{
			position: absolute;
			width: 63px;
			right: -30px;
			top: 10px
		}
		.b-w-city__single-img{
			width: 100%;
		}
		.b-w-city__single-img img{
			width: 95%;
			margin: 0 auto;
			display: block;
			max-width: 95%;
		}
		.b-w-city__double-img{
			right: -30px;
		}
		`
	)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
			.b-w-city__mobi{
				display: none;
			}
		`)
}






// map-video------------------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	style.insertAdjacentHTML(`beforeend`, `
			.how-rent__h1{
				font-size: 36px;
				padding-bottom: 36px;
			}
			.how-rent{
				display: flex;
				flex-direction: column;
			}
			.how-rent__video-desc{
				display: none;
			}
			.how-rent__arrow-desc {
				display: none;
			}
			.how-rent__img {
				height: 88px;
			}
			.how-rent__img-cntr {
				margin-bottom: 16px;
			}
			.how-rent__text {
				font-size: 28px;
				margin-bottom: 48px;
			}
			.how-rent__text-small{
				width: 250px;
			}
			.how-rent__info-cntr {
				order: 3;
				margin-top: 40px;
				margin-bottom: 170px;

			}
		`)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
		.how-rent__video-mobile{
			display: none;
		}
		.how-rent__arrow-mobile {
			display: none;
		}
		`)
}







// DONE!---------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	style.insertAdjacentHTML(`beforeend`, `
		.done__text{
			font-size: 28px;
			padding: 24px 44px;
		}
		`)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
		`)
}






// TARIFF---------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	style.insertAdjacentHTML(`beforeend`, `
	.tariff-desc {
		display: none;
	}
	.ticket{
		width: 97%;
		margin: 0 auto;
		padding-top: 48px;
		padding-bottom: 48px;
		border-radius: 56px;
	}
	.ticket__cntr{
		width: 97%;
		max-width: 100%;
		padding: 0 12px;
	}
	.ticket__plus-img {
		position: unset;
		width: 100%;
		margin-bottom: 32px;
	}
	.ticket__h2{
		width: 100%;
		max-width: 100%;
		font-size: 36px;
	}
	.ticket__text{
		width: 100%;
		max-width: 100%;
		font-size: 18px;
		padding: 0 12px;
	}
	.ticket__slide-items{
	 flex-direction: column;
	}
	.ticket__slide-item{
		width: 100%;
	}
	`)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
	.tariff-mobile {
		display: none;
	}
	`)
}














// CAREFUL---------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	document.querySelector(`.careful__info-h2`).innerHTML = `Катайтесь нежно`
	style.insertAdjacentHTML(`beforeend`, `
	.careful__swiper{
		display: none;
	}
	.careful{
		margin-top: 0;
		min-width: 97%;
	}
	.careful__info{
		width: 97%;
		padding: 0 24px;
		margin: 0 auto;
		padding-top: 32px;
		padding-bottom: 98px;
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
	}
	.careful__info-h2{
		font-size: 36px;
		max-width: 920px;
		margin: 0 auto;
		margin-bottom: 24px;
		margin-left: 20px;
	}
	.careful__info-grid{
		max-width: 920px;
		margin: 0 auto;
		grid-template-columns: 1fr;
	}
	.careful__info-item{
		width: 100%;
		max-width: 920px;
		margin: 0 auto;
		grid-template-columns: 1fr;
		margin-bottom: 24px;
	}
	.careful__info-item-title{
		font-size: 28px;
	}
	.careful__info-item-text{
		font-size: 18px;
	}








	.careful__green-heart{
		width: 97%;
		margin: 0 0 0 0;
		margin-top: -100px;
		padding: 32px;
		transform: translate(0);
	}
	.careful__green-heart-text{
		font-size: 22px;
		width: 100%;
		max-width: 100%;
		line-height: 120%;
	}

	
@media screen and (max-width: 814px) {
	.careful__green-heart{
		margin-top: -120px;
	}
}

	`)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
	.careful__mobile-swiper {
		display: none;
	}
	`)
}




// MAP---------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	style.insertAdjacentHTML(`beforeend`, `
	.map{
		padding: 64px 16px 32px 16px;
	}
	.map__title{
		font-size: 36px;
	}
	.map__text{
		font-size: 22px;
	}
	`)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
	`)
}













// WOWNLOAD---------------------------------------------------------------
if (devices.test(navigator.userAgent)) {
	style.insertAdjacentHTML(`beforeend`, `
	.download{
		padding-bottom: 72px;
	}
	.download__mobile-button{
		display: block;
	}
	.download__title{
		display: none;
	}
	.download__text{
		display: none;
	}
	.download__big-phone-img-cntr{
		display: none;
	}
	.download__qr-img-cntr{
		display: none;
	}
	.download__cntr {
		padding: 0 16px;
	}
	`)
}
else {
	style.insertAdjacentHTML(`beforeend`, `
	`)
}











// link---------------------------------------------------------------
const mLink = document.querySelector(`.header__span`)
const descLink = document.querySelector(`.header__span`)
if (devices.test(navigator.userAgent)) {
	mLink.insertAdjacentHTML(`beforeend`, `
	<a id="download"></a>
	`)
}
else {
	descLink.insertAdjacentHTML(`beforeend`, `
		<a id="download" style="position: absolute; top: 0"></a>
	`)
}




