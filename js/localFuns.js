//activate links on click.
function activate(link){
    for(let link1 of links){
        link1.classList.remove(`active`);
    }
    link.classList.add(`active`);
}


//adds the icons and text in services section.
function servicesFun(res){
    let i = 0;
    let class1;
    for(let res1 of res){
        if( i%2 == 0){
            class1 = `wow animate__backInLeft`;
        }else{
            class1 = `wow animate__backInRight`;
        }
        rowsInServices.innerHTML +=`
            <div class="cards mx-5 ${class1}" data-wow-delay="${i*0.5}s">
                <div class="div-img"><img src="img/drawings/${res1.icon}" alt=""></div>
                <h2>${res1.title}</h2>
                <p>${(res1.description).substring(0,250).replaceAll(`L10N`, `<span class="firstColor">L10N</span>`)
                    .replaceAll(`House`,`<span class="secondColor">House</span>`)}... <span class="firstColor" data-obj='${JSON.stringify(res1)}' onclick="popup(this)" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</span></p>
            </div>
        `;
        i++;
    }
}


//show a popup onclick
function popup(res1){
    let currentRes = JSON.parse(res1.dataset.obj);
    console.log(currentRes)
    modalBody.innerHTML =`
        <div class="main-header">
            <h3>
                ${currentRes.title}
            </h3>
        </div>
        <div class="container">
            <p>
                ${currentRes.description.replaceAll(`L10N`, `<span class="firstColor">L10N</span>`)
                    .replaceAll(`House`,`<span class="secondColor">House</span>`)}
            </p>
            <img src="img/${currentRes.img}" alt="">
        </div>
            ${sectionsJenirator(currentRes.sections)}
    `
}
function sectionsJenirator(sections){
    let sectionsInPopup = '';
    for(let section of sections){
        sectionsInPopup +=`
            <div class="section-container">
                <h4>
                    ${section.title}
                </h4>
                <ol type="1">
                    ${pointsJenirator(section)}
                </ol>
            </div>
        `
    }
    return sectionsInPopup;
}

function pointsJenirator(section){
    let pointsInPopup = "";
    for(let point of section.points){
        pointsInPopup +=`
            <li>${point}</li>
        `
    }
    return pointsInPopup
}




function linksDefult(href){
    let id = href.replace(`#`,``);
    let currentSection = document.querySelector(`[id="${id}"]`);
    let topSection = currentSection.offsetTop;
    let navHeight = nav.offsetHeight;
    window.scrollTo({
        top: topSection - navHeight,
        behavior: "smooth"
    });
}


function navScroll(){
    hrefLinks.forEach(function (href) {
    let windowTop = this.scrollY;
    let sectionTop = document.querySelector(href).offsetTop;
    let sectionBottom = sectionTop + document.querySelector(href).offsetHeight;

    if (windowTop >= sectionTop - heightOfNav && windowTop < sectionBottom - heightOfNav) {
      activate(document.querySelector(`nav a[href="${href}"]`));
    }
    if(windowTop != 0){
      nav.classList.add(`light`);
    }else{
      nav.classList.remove(`light`);
    }
    });
}



function offcanvasFun(){
    let color;
    let i = 0;
    fetch(`https://semicode.tech/api/v1/l10nhouse/languages`)
    .then((res) => res)
    .then((res) => res.json())
    .then(function(res){
        for(let item of res){
            if(i%2 == 0){
            color = `firstColor`;
            }else{
                color = `secondColor`;
            }
            languageOffcanvas.innerHTML +=`
                <div class="container ${color}" data-index="${i}">
                <h1>${item.continent}</h1>
                <ul type="none">
                    ${langList(item.languages)}
                </ul>
                </div>
            `;
            ++i;
        }
    })
}


function langList(languages){
    let list = ``;
    for(let lang of languages){
        list +=`
        <li><i class="fa-regular fa-circle-dot"></i>${lang}</li>
        `;
    }
    return list;
}

function sectorsFun(){
    fetch(`https://semicode.tech/api/v1/l10nhouse/sectors`)
    .then((res) => res)
    .then((res) => res.json())
    .then(function(res){
        for(let item of res){
            sectorModal.innerHTML +=`
                <div class="col">
                    <div class="div-img">
                    <img src="img/drawings/${item.icon}" alt="">
                    </div>
                    <div class="text">
                    <p>${item.name}</p>
                    </div>
                </div>
            `;
        }
    })
}