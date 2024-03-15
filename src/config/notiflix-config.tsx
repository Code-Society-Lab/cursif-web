import { Notify } from 'notiflix/build/notiflix-notify-aio';

if (typeof window !== 'undefined') {
	Notify.init({
		position: 'right-top',
		cssAnimation: true,
		cssAnimationDuration: 400,
		cssAnimationStyle: 'zoom',
		success: {
			background: '#32c682',
			textColor: '#fff',
			childClassName: 'notiflix-notify-success',
			notiflixIconColor: 'rgba(0,0,0,0.2)',
			fontAwesomeClassName: 'fas fa-check-circle',
			fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
			backOverlayColor: 'rgba(50,198,130,0.2)',
		},
		failure: {
			background: '#ff5549',
			textColor: '#fff',
			childClassName: 'notiflix-notify-failure',
			notiflixIconColor: 'rgba(0,0,0,0.2)',
			fontAwesomeClassName: 'fas fa-times-circle',
			fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
			backOverlayColor: 'rgba(255,85,73,0.2)',
		},
		warning: {
			background: '#eebf31',
			textColor: '#fff',
			childClassName: 'notiflix-notify-warning',
			notiflixIconColor: 'rgba(0,0,0,0.2)',
			fontAwesomeClassName: 'fas fa-exclamation-circle',
			fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
			backOverlayColor: 'rgba(238,191,49,0.2)',
		},
		info: {
			background: '#26c0d3',
			textColor: '#fff',
			childClassName: 'notiflix-notify-info',
			notiflixIconColor: 'rgba(0,0,0,0.2)',
			fontAwesomeClassName: 'fas fa-info-circle',
			fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
			backOverlayColor: 'rgba(38,192,211,0.2)',
		},
	});
}

export { Notify };