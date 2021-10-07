let colors = ['#8FBBAF', '#F67280', '#C06C84', '#665C84'];
let bodyStyles = document.body.style;
let siteNameIn = document.getElementById('siteName');
let siteURLIn = document.getElementById('siteURL');
let sitesContainer = document.querySelector('.sites-container');
let fi = document.querySelectorAll('.color');
let siteList = document.getElementsByClassName('site-item');
let saveBtn = document.getElementById('save');
let allSites;
if (localStorage.getItem('sites') == null) {
    allSites = [];
} else {
    allSites = JSON.parse(localStorage.getItem('sites'));
    displaySite();
}
saveBtn.addEventListener('click', addSite);

function setColor() {

    for (let i = 0; i < colors.length; i++) {
        fi[i].addEventListener('click', () => {


            bodyStyles.setProperty('--main', colors[i]);




        })
    }
}
setColor();

function addSite() {

    if (checkName() == true || checkURL() == true) {

    } else {
        if (siteNameIn.value == '' || siteURLIn.value == '') {
            alert('Please fill all fields')
        } else {
            var site = {
                name: siteNameIn.value,
                URL: siteURLIn.value
            };
            allSites.push(site);
            localStorage.setItem('sites', JSON.stringify(allSites));
            displaySite('new');

            clearSite();
            siteURLIn.classList.remove('is-invalid');
        }
    }

}

function displaySite(added) {
    var content = '';
    for (let i = allSites.length - 1; i > 0; i--) {
        console.log(i)
        content += ` <div class="site-item  d-flex justify-content-between align-items-center my-2 pl-2 pr-1 w-100 mx-auto ">
                    <p class="site-item-p  font-weight-bold text-capitalize  mt-3">
                    ${allSites[i].name}
                    </p>
                    <div class="site-btns">
                        <button class="site-item-visit py-1 px-2">

                            <a href="${allSites[i].URL}" class="text-capitalize " target="_blank">visit <i
                                    class="fas fa-arrow-right"></i></a>
                        </button>
                        <button onclick="deleteSite(${i})" class="site-item-delete  text-capitalize py-1 px-2">delete <i
                                class="fas fa-trash"></i></button>
                    </div>
                </div>`




    }
    sitesContainer.innerHTML = content;
    if (added == 'new') {
        document.querySelectorAll('.site-item')[0].classList.add('last');
    }

}

function clearSite() {
    siteURLIn.value = "";
    siteNameIn.value = "";
}

function deleteSite(item) {
    allSites.splice(item, 1);
    displaySite();
    localStorage.setItem('sites', JSON.stringify(allSites));
}



function checkName() {
    displaySite();
    var alert = ``;
    for (let i = 0; i < allSites.length; i++) {
        if (siteNameIn.value == allSites[i].name) {

            alert = `<div class="text-uppercase text-center alert alert-danger my-1 pl-2 pr-1 w-75 mx-auto" role="alert">
this name already exsits!!!!
</div>`

            let temp = sitesContainer.innerHTML;
            sitesContainer.innerHTML = alert + temp;
            return true;

        }


    }




}

function checkURL() {
    var alert = ``;
    displaySite();
    var siteRegex = /^(https|http|ftp):\/\//
    if (!siteRegex.test(siteURLIn.value)) {
        siteURLIn.value = '';
        siteURLIn.setAttribute('placeholder', `URL should start with https:// or http://`);
        siteURLIn.classList.add('is-invalid');
        return true;
    }

    for (let i = 0; i < allSites.length; i++) {
        if (siteURLIn.value == allSites[i].URL) {
            alert = `<div class="text-uppercase text-center alert alert-danger my-2 pl-2 pr-1 w-75 mx-auto" role="alert">
this url already exsits!!!!
</div>`
            let temp = sitesContainer.innerHTML;
            sitesContainer.innerHTML = alert + temp;
            return true;

        }


    }

}