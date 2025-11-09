document.addEventListener('DOMContentLoaded',() =>{
    const hamburger =document.querySelector('.hamburger');
    const mobileNav =document.querySelector('.mobile-nav');

    const toggleMenu = () => {
        const isActibe = mobileNav.classList.contains('active');

        if(!isActibe){
        //開く
        mobileNav.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden'; //スクロール無効
        }else{
        //閉じる
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = ''; //スクロール復帰
        }
    };

    hamburger.addEventListener('click',toggleMenu);

    //メニュー内リンククリックを閉じる
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';

        });
    });  
});