let links = document.querySelectorAll(`.nav-link`),
    nav = document.querySelector(`nav`),
    heightOfNav = nav.offsetHeight,
    hrefLinks =[`#Home`,`#AboutUs`,`#Services`,`#WhyUs`,`#Language`],
    icons = document.querySelectorAll(`#Services .container .div-img img`),
    rowsInServices = document.querySelector(`#Services .container .row`),
    modalBody = document.querySelector(`.modal .modal-body`),
    languageOffcanvas = document.querySelector(`#Language .offcanvas .offcanvas-body`),
    sectorModal = document.querySelector(`#Language .modal-content.sector .modal-body .row`);

    



links.forEach(function(link){
    link.addEventListener(`click`, function(e){
        e.preventDefault();
        linksDefult(link.getAttribute(`href`));
        activate(link);

    });
});




window.addEventListener("scroll", function () {
  navScroll();
});


fetch("https://semicode.tech/api/v1/l10nhouse/services")
.then((res) => res)
.then((res) => res.json())
.then((res) =>{servicesFun(res)})//adds the icons and text in services section.





