window.addEventListener('load', function() {
	var html = document.documentElement;
	var nav_main = document.querySelector('.nav_main')

	window.addEventListener('scroll', function() {
		if (html.scrollTop > 120) {
			nav_main.style.backgroundColor = 'rgba(250,250,250,.85)';
		} else {
			nav_main.style.backgroundColor = 'rgba(250,250,250,1)';
		}
	})


	var snav = document.querySelector('.nav_don');
	snav.onclick = function() {
		if (snav.className == 'nav_don active') {
			snav.className = 'nav_don';
		} else {
			snav.className += ' active';
		}
	}
})
