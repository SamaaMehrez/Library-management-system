
   const slider = document.querySelector('.slider');
   const prevBtn=this.document.getElementById('prevBtn')
   const nextBtn = document.getElementById('nextBtn');
   let scrollAmount = 0;
   const scrollStep = 100; 
   const maxScroll = slider.scrollWidth - slider.clientWidth; 
   nextBtn.addEventListener('click', () => {
    if (scrollAmount < maxScroll) {
        scrollAmount += scrollStep;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
            });
        }
    });

    prevBtn.addEventListener('click', () => {
        if (scrollAmount > 0) {
            scrollAmount -= scrollStep;
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });
