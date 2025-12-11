(function(){
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;

    
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') body.classList.add('dark');
    else if (saved === 'light') body.classList.remove('dark');
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark');
    }

    
    function updateButton(){
        themeBtn.textContent = body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
    }
    updateButton();

    
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
        updateButton();
    });

    
    document.querySelectorAll('.container1 a').forEach(a => {
        a.setAttribute('target','_blank');
        a.setAttribute('rel','noopener noreferrer');
    });

    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {threshold:0.12});

    document.querySelectorAll('section, .container1 .box1, .container2 .box1, .container2 .box2').forEach(el=>{
        el.style.transform = 'translateY(18px)';
        el.style.opacity = '0';
        el.style.transition = 'all 520ms cubic-bezier(.2,.9,.2,1)';
        observer.observe(el);
    });

    
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading','lazy');
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
    });

})();


(function(){
    const role1 = document.getElementById('role1');
    const role2 = document.getElementById('role2');
    const section = document.querySelector('section');
    if(!role1 || !role2 || !section) return;

    let firstVisible = true;
    const setVisibility = () => {
        role1.style.display = firstVisible ? '' : 'none';
        role2.style.display = firstVisible ? 'none' : '';
    };

    
    const interval = setInterval(() => {
        firstVisible = !firstVisible;
        setVisibility();
    }, 2000);

    
    section.addEventListener('click', () => {
        firstVisible = !firstVisible;
        setVisibility();
        clearInterval(interval);
        setInterval(() => {
            firstVisible = !firstVisible;
            setVisibility();
        }, 2000);
    });
})();
(function(){
    const links = Array.from(document.querySelectorAll('.nav-link'));
    const sections = links.map(a => document.querySelector(a.getAttribute('href')));

    function onScroll(){
        const y = window.scrollY + Math.min(window.innerHeight * 0.25, 200);
        let idx = sections.findIndex(sec => sec && (sec.offsetTop + sec.offsetHeight) > y);
        if(idx === -1) idx = sections.length - 1;
        links.forEach(l => l.classList.remove('active'));
        if(links[idx]) links[idx].classList.add('active');
    }

    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    onScroll();
})();