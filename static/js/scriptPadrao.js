//darkreader darkreader--proxy

function injectProxy() {
    document.dispatchEvent(
        new CustomEvent("__darkreader__inlineScriptsAllowed")
    );
    const addRuleDescriptor = Object.getOwnPropertyDescriptor(
        CSSStyleSheet.prototype,
        "addRule"
    );
    const insertRuleDescriptor = Object.getOwnPropertyDescriptor(
        CSSStyleSheet.prototype,
        "insertRule"
    );
    const deleteRuleDescriptor = Object.getOwnPropertyDescriptor(
        CSSStyleSheet.prototype,
        "deleteRule"
    );
    const removeRuleDescriptor = Object.getOwnPropertyDescriptor(
        CSSStyleSheet.prototype,
        "removeRule"
    );
    const shouldWrapDocStyleSheets =
        location.hostname.endsWith("pushbullet.com") ||
        location.hostname.endsWith("ilsole24ore.com");
    const documentStyleSheetsDescriptor = shouldWrapDocStyleSheets ?
        Object.getOwnPropertyDescriptor(Document.prototype, "styleSheets") :
        null;
    const cleanUp = () => {
        Object.defineProperty(
            CSSStyleSheet.prototype,
            "addRule",
            addRuleDescriptor
        );
        Object.defineProperty(
            CSSStyleSheet.prototype,
            "insertRule",
            insertRuleDescriptor
        );
        Object.defineProperty(
            CSSStyleSheet.prototype,
            "deleteRule",
            deleteRuleDescriptor
        );
        Object.defineProperty(
            CSSStyleSheet.prototype,
            "removeRule",
            removeRuleDescriptor
        );
        document.removeEventListener("__darkreader__cleanUp", cleanUp);
        document.removeEventListener(
            "__darkreader__addUndefinedResolver",
            addUndefinedResolver
        );
        if (shouldWrapDocStyleSheets) {
            Object.defineProperty(
                Document.prototype,
                "styleSheets",
                documentStyleSheetsDescriptor
            );
        }
    };
    const addUndefinedResolver = (e) => {
        customElements.whenDefined(e.detail.tag).then(() => {
            document.dispatchEvent(
                new CustomEvent("__darkreader__isDefined", {
                    detail: { tag: e.detail.tag }
                })
            );
        });
    };
    document.addEventListener("__darkreader__cleanUp", cleanUp);
    document.addEventListener(
        "__darkreader__addUndefinedResolver",
        addUndefinedResolver
    );
    const updateSheetEvent = new Event("__darkreader__updateSheet");

    function proxyAddRule(selector, style, index) {
        addRuleDescriptor.value.call(this, selector, style, index);
        if (
            this.ownerNode &&
            !this.ownerNode.classList.contains("darkreader")
        ) {
            this.ownerNode.dispatchEvent(updateSheetEvent);
        }
        return -1;
    }

    function proxyInsertRule(rule, index) {
        const returnValue = insertRuleDescriptor.value.call(
            this,
            rule,
            index
        );
        if (
            this.ownerNode &&
            !this.ownerNode.classList.contains("darkreader")
        ) {
            this.ownerNode.dispatchEvent(updateSheetEvent);
        }
        return returnValue;
    }

    function proxyDeleteRule(index) {
        deleteRuleDescriptor.value.call(this, index);
        if (
            this.ownerNode &&
            !this.ownerNode.classList.contains("darkreader")
        ) {
            this.ownerNode.dispatchEvent(updateSheetEvent);
        }
    }

    function proxyRemoveRule(index) {
        removeRuleDescriptor.value.call(this, index);
        if (
            this.ownerNode &&
            !this.ownerNode.classList.contains("darkreader")
        ) {
            this.ownerNode.dispatchEvent(updateSheetEvent);
        }
    }

    function proxyDocumentStyleSheets() {
        const docSheets = documentStyleSheetsDescriptor.get.call(this);
        const filtered = [...docSheets].filter((styleSheet) => {
            return !styleSheet.ownerNode.classList.contains("darkreader");
        });
        return Object.setPrototypeOf(filtered, StyleSheetList.prototype);
    }
    Object.defineProperty(
        CSSStyleSheet.prototype,
        "addRule",
        Object.assign({}, addRuleDescriptor, { value: proxyAddRule })
    );
    Object.defineProperty(
        CSSStyleSheet.prototype,
        "insertRule",
        Object.assign({}, insertRuleDescriptor, { value: proxyInsertRule })
    );
    Object.defineProperty(
        CSSStyleSheet.prototype,
        "deleteRule",
        Object.assign({}, deleteRuleDescriptor, { value: proxyDeleteRule })
    );
    Object.defineProperty(
        CSSStyleSheet.prototype,
        "removeRule",
        Object.assign({}, removeRuleDescriptor, { value: proxyRemoveRule })
    );
    if (shouldWrapDocStyleSheets) {
        Object.defineProperty(
            Document.prototype,
            "styleSheets",
            Object.assign({}, documentStyleSheetsDescriptor, {
                get: proxyDocumentStyleSheets
            })
        );
    }
}


(function(a, s, y, n, c, h, i, d, e) {
    s.className += ' ' + y;
    h.start = 1 * new Date;
    h.end = i = function() { s.className = s.className.replace(RegExp(' ?' + y), '') };
    (a[n] = a[n] || []).hide = h;
    setTimeout(function() {
        i();
        h.end = null
    }, c);
    h.timeout = c;
})(window, document.documentElement, 'async-hide', 'dataLayer', 1500, { 'GTM-N9P432P': true });

window.dataLayer = window.dataLayer || [];

function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-148419930-1', { 'optimize_id': 'GTM-N9P432P' });


function implementExperimentA(value) {
    console.log("nice", value);
    if (value == '1' && alternativeLanding > 0 && !searchingService) {
        $(".newHomepage").hide();
        $("#mainMenu").show().css("display", "flex");
        $("body").css("background-image", "url(https://voalis.com/images/homepageimg/circles.png)").css("background-color", "rgb(24, 24, 24)");
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.scrollTo(0, $("#voalisCardsBannerTop").offset().top - 15);
        }
    }
}

gtag('event', 'optimize.callback', { name: 'UiCOKwDJScupb-Y2U9S4ew', callback: implementExperimentA });



var storage = window.localStorage;

var appMode = false;
if (matchMedia('(display-mode: standalone)').matches) appMode = true;

var auth = storage.getItem("auth");
var loggedIn = (auth != null);
if (loggedIn) auth = auth.split(",");

var savedNoLogin = storage.getItem("savedNoLogin");
if (savedNoLogin == null) savedNoLogin = {};
else {
    savedNoLogin = JSON.parse(savedNoLogin);
    $("body").hide();
}


var alterPassCode = "";

function checkAlteringPass() {
    if (storage.getItem("alterPass")) {
        alterPassCode = storage.getItem("alterPass");
        $("#mainMenu").fadeOut(250).delay(250).css("visibility", "");
        $("#alterPassMenu").fadeIn(250);
        storage.removeItem("alterPass");
    }
}

function openCardRequest() {
    $("#mainMenu, #bottomBar").fadeOut(250);
    if (loggedIn) window.location = "https://voalis.com/dashboard";
    else window.location = "https://voalis.com/create";
}

function openPopular() {
    $("#mainMenu").fadeOut(250);
    window.location = "https://voalis.com/top";
}

function editMode() {
    $("#openCardRequestRect").attr("stroke", "rgb(30,60,160)");
    $("#firstButtonText1").text("Editar meu");
    $("#firstButtonText2").text("Voalis card existente").attr("x", "98");
    $("#firstButtonUndertext").text("Ou, criar um novo cartão").attr("x", "115").css("cursor", "pointer");

    $("#firstButtonUndertext").click(function() {
        storage.clear();
        openCardRequest();
    });
}

var loadedScripts = [];

jQuery.loadScript = function(url, callback) {
    if (loadedScripts.includes(url)) return callback();
    loadedScripts.push(url);

    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

var loadedIntTelCss = true;

function openEditCardMenu() {
    if (!loadedIntTelCss) {
        $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.8/css/intlTelInput.css" integrity="sha256-rTKxJIIHupH7lFo30458ner8uoSSRYciA0gttCkw1JE=" crossorigin="anonymous" />');
        $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.8/js/intlTelInput.min.js");
        loadedIntTelCss = true;
    }


    $(".newHomepage, #serviceSearch").fadeOut(250);
    $("#mainMenu").fadeOut(250).delay(250).css("visibility", "");
    $("#loginMenu").fadeIn(250).parent()
    if (Object.keys(savedNoLogin).length == 0) $("#loginMenu").css("backdrop-filter", "invert(1)");

    window.scrollTo(0, 0);
}

function nopeShake(obj) {
    $(obj).shake({
        direction: "left",
        distance: 7,
        speed: 70,
        times: 2
    });
}

function sendData(data, onComplete, url) {
    var base = "https://voalis.com/";
    if (url == undefined) url = "processinfo.php";
    url = base + url;

    $.ajax(url, {
        type: 'POST',
        data: data,
        success: function(result) {
            onComplete(result)
        },
        error: function(result) {
            onComplete(result)
        }
    });
}

var filledSavedDiv = false;

function fillSavedDiv() {
    if (filledSavedDiv) return false;
    filledSavedDiv = true;

    var cardsSavedDiv = $("#cardsSavedDiv");
    cardsSavedDiv.html("");

    var cardsSavedKeys = Object.keys(savedNoLogin);

    for (var i = 0; i < cardsSavedKeys.length; i++) {
        var thisCard = savedNoLogin[cardsSavedKeys[i]];
        var imgSrc = "";


        if (thisCard['logo'] == 1) {
            imgSrc = "https://voalis.com/userassets/thumbnails/logos/" + thisCard['code'] + ".jpg";
        } else {
            if (thisCard['background'] == "custom") {
                imgSrc = "https://voalis.com/userassets/thumbnails/custombackgrounds/" + thisCard['code'] + ".jpg";
            } else {
                imgSrc = "https://voalis.com/cardassets/backgrounds/thumbnails/3_" + thisCard['background'] + ".jpg";
            }
        }


        cardsSavedDiv.append(
            '<div class="likedDivCard" style="background-color:#' + thisCard['frameColor'] + '66" onclick="openCard(\'' + thisCard['code'] + '\',\'?svnliked\')">' +
            '<div class="likedDivCardImage" style="background-image:url(\'' + imgSrc + '\');background-position: top;"></div>' +
            '<div>' +
            '<div class="likedDivCardTopText">' + thisCard['name'] + '</div>' +
            '<div class="likedDivCardBottomText">' + thisCard['description'] + '</div>' +
            '</div>' +
            '</div>'
        );
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function loginCard() {
    if (curLoginMethod == "phone") var loginCode = internationalPhoneNumber.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL).split(" ").join("-");
    else var loginCode = $("#loginMenuIdentificationMethodTextbox").val();

    if (curLoginMethod == 'voalis') loginCode = loginCode.replace(/\s/g, '');

    console.log(loginCode);

    var loginPassword = $("#loginMenuPasswordTextbox").val();

    if (loginCode.length == 0) return nopeShake($("#loginError").text("Por favor digite o link do seu cartão."));
    //if(!/^([a-z0-9A-Z]{6,18})$/.test(loginCode)) 

    if (curLoginMethod == "phone" && internationalPhoneNumber.isValidNumber() == false)
        return nopeShake($("#loginError").text("Numero inválido."));
    if (!/^(.{4,64})$/.test(loginPassword)) return nopeShake($("#loginError").text("Senha incorreta."));

    sendData({
        "logincardpassword": loginPassword,
        "logincardcode": loginCode,
        "logincardmethod": curLoginMethod
    }, onValidateCardLogin);
}

function requestCardNewPassword() {
    if (curLoginMethod == "phone") var newPasswordCode = internationalPhoneNumber.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL).split(" ").join("-");
    else var newPasswordCode = $("#requestNewPasswordIdentificationMethodTextbox").val();

    //if(!/^([a-z0-9A-Z]{6,18})$/.test(newPasswordCode)) return nopeShake($("#requestCardEditError").text("Link inválido"));
    //if(!validateEmail(newPasswordEmail)) return nopeShake($("#requestCardEditError").text("Email incorreta"));

    sendData({
        "requestCardNewPasswordLoginInfo": newPasswordCode,
        "requestCardNewPasswordLoginMethod": curLoginMethod
    }, onValidateCardEditRequest);
}

function alterPass() {
    var alterPassNew = $("#alterPassNewPasswordInput").val();
    var alterPassNewAgain = $("#alterPassNewPasswordAgainInput").val();

    if (alterPassNew != alterPassNewAgain) return nopeShake($("#alterPassError").text("As senhas não coincidem."));
    if (alterPassNew.length < 6) return nopeShake($("#alterPassError").text("Senha muito pequena."));
    if (alterPassNew.length > 64) return nopeShake($("#alterPassError").text("Senha muito pequena."));

    sendData({
        "alterCardPasswordAlterCode": alterPassCode,
        "alterPassNewPassword": alterPassNew
    }, onValidateAlterPass);
}

function onValidateCardLogin(response) {
    result = JSON.parse(response);
    if (result.status == "done") {
        storage.setItem("auth", [result.username, result.authKey]);
        if (document.referrer.startsWith("https://voalis.com/c/") && !document.referrer.includes("/create")) window.location = document.referrer;
        else window.location = "https://voalis.com/dashboard";
    }

    if (result.errorCode == "1") return nopeShake($("#loginError").text(ziggyLoginMethodNames[curLoginMethod] + " inválido."));
    if (result.errorCode == "2") return nopeShake($("#loginError").text("Senha incorreta"));
}

function onValidateCardEditRequest(response) {
    result = JSON.parse(response);
    if (result.status == "done") return requestNewPasswordComplete();
    if (result.errorCode == "1") return nopeShake($("#requestCardEditError").text(ziggyLoginMethodNames[curLoginMethod] + " inválido."));
    if (result.errorCode == "3") return nopeShake($("#requestCardEditError").text("Código de alteração já foi enviado hoje."));
}

function onValidateAlterPass(response) {
    result = JSON.parse(response);
    if (result.status == "done") return alterPasswordComplete();
    else return nopeShake($("#alterPassError").text("Ocorreu um erro."));
}

function requestNewPasswordComplete() {
    $("#requestNewPasswordMenu").fadeOut(250);
    $("#loginMenuHeader").hide();
    $("#requestNewPasswordDoneMenu").delay(250).fadeIn(250);
    $("#requestNewPasswordDoneText").html("Enviaremos por loginMethod seu link <br>de alteração de senha.".replace("loginMethod", (curLoginMethod == "phone" ? "WhatsApp" : "Email")));
}


function alterPasswordComplete() {
    $("#alterPassMenu").fadeOut(250);
    $("#alterPassDone").delay(250).fadeIn(250);
    setTimeout(function() {
        location.reload();
    }, 4000);
}

jQuery.loadScript = function(url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

var firebaseConfig = {
    apiKey: "AIzaSyDMc9SJqhK6FtT9HxmQsdTwLgVhzjsvSuw",
    authDomain: "voalis-cards.firebaseapp.com",
    databaseURL: "https://voalis-cards.firebaseio.com",
    projectId: "voalis-cards",
    storageBucket: "voalis-cards.appspot.com",
    messagingSenderId: "898447027720",
    appId: "1:898447027720:web:c9816ca8856e6e382bebbd",
    measurementId: "G-H83H22YY51"
};

function loadFirebaseAnalytics() {
    $.loadScript("https://www.gstatic.com/firebasejs/7.9.0/firebase-app.js", function() {
        firebase.initializeApp(firebaseConfig);
        $.loadScript("https://www.gstatic.com/firebasejs/7.9.1/firebase-analytics.js", function() {
            firebase.analytics();
        });
    });
}

function registerNewPageGoogleAnalytics(page, title) {
    if (gtag == null) return false;

    gtag('config', 'UA-148419930-1', {
        'page_title': title,
        'page_path': ('/' + page)
    });
}

function testWebP(callback) {
    var webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    webP.onload = webP.onerror = () => {
        callback(webP.height === 2);
    };
};

function loadSVGImages(webp) {
    $("image").each(function() {
        var thisSrc = this.getAttribute("data-src");
        if (webp && (thisSrc.endsWith("img1.png") || thisSrc.endsWith("img2.png"))) thisSrc = thisSrc.replace(".png", ".webp");
        console.log(thisSrc);
        $(this).attr("href", thisSrc).attr("xlink:href", thisSrc);
    });
}

var alternativeLanding = 0;

$(function() {
    if (storage.getItem("alterKey") != null) storage.clear();

    var mainMenuSVG = $("#mainMenuSVG_pt").show();
    mainMenuSVG.removeAttr("viewBox")[0].setAttribute("viewBox", "0 0 352.81 961.18");

    $("#bottomBar").css("visibility", "visible");

    /*
    if( alternativeLanding > 0 && !ignoreLandingPage ) {
        $(".newHomepage").hide();
        $("#mainMenu").show().css("display","flex");
        $("body").css("background-image","url(' . $GLOBALS['siteurl'] . 'images/homepageimg/circles.png)").css("background-color","rgb(24, 24, 24)");
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            window.scrollTo(0,$("#voalisCardsBannerTop").offset().top-15);		}
    }
    */

    /*
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $("#mainMenuSVG").attr("width","74.71vh").attr("maxheight","1600px").removeAttr('viewBox')[0].setAttribute("viewBox","0 0 352.81 961.18");
        window.scrollTo(0,$("#voalisCardsBannerTop").offset().top-15);
    } else {
        $("#mainMenuSVG").attr("width","100vw").attr("height","1600px").removeAttr('viewBox')[0].setAttribute("viewBox","-250 250 850 450");
    }*/


    /*
    if (storage.getItem("auth") != null && auth[0] != null) {
        mainMenuSVG.hide();
        if (appMode == true) window.location = "https://voalis.com/c/" + auth[0];
        else {
                $(".hideOnLogin").hide();
                $(".loggedIn").show();
            //window.location = 'https://voalis.com/dashboard';
        	
        }
    } else { */


    if (appMode == true) {
        //$("#editCardMenu").fadeIn(250);
        //$("#mainMenu").hide();
        loadFirebaseAnalytics();
    }

    if (loggedIn) {
        $(".hideOnLogin").hide();
        $(".loggedIn").show();
    }

    //$("#firstButtonUndertext").text("Ou, faça login no seu card").attr("x","110").css("cursor","pointer");
    $("#firstButtonUndertext").click(function() {
        openEditCardMenu();
    });


    $('#loginMenuPasswordTextbox').on('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            loginCard();
        }
    });

    $('#searchBarInput').on('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            modifyURL(searchState, $('#searchBarInput').val());
        }
    });


    checkAlteringPass();

    //$("#firstButtonUndertext").hide();
    $("#mainMenu").css("visibility", "");
    testWebP(loadSVGImages);

    var topLocationText = "";

    if (language != "pt" && language != "es" && ipLocationCountry != "BR") {
        $("#topCardsContainer").hide();
    } else {
        $("#topCardsContainer").show();
        if (topNearMe['top']['stateMode'] == 1) {
            topLocationText = fullStateNameArtigo[topNearMe['top']['location']] + " " + fullStateName[topNearMe['top']['location']];
            $("#topLocationText").click(function() {
                askState();
            }).css("cursor", "pointer");
        } else {
            topLocationText = fullStateName[topNearMe['top']['location']];
            $("#topLocationText").css("text-decoration", "");
        }
    }

    $("#topLocationText").text(topLocationText + ".");

    $("#searchbarLocationText").text(fullStateNameArtigo[searchState] + " " + fullStateName[searchState]);

    topKeys = Object.keys(topNearMe);

    for (var i = 0; i < topKeys.length; i++) {
        var curCard = topKeys[i];
        if (curCard == "top") continue;

        curCard = topNearMe[curCard];
        console.log(curCard);

        console.log(curCard);

        var backgroundPath = "https://voalis.com/";

        if (curCard['background'] == "custom") backgroundPath += "userassets/thumbnails/custombackgrounds/" + curCard['code'] + ".jpg";
        else backgroundPath += "cardassets/backgrounds/thumbnails/3_" + curCard['background'] + ".jpg";

        background = 'background: url("' + backgroundPath + '");background: linear-gradient(to bottom right, rgba(0, 0, 0,1),rgba(255, 255, 255, 0)),url("' + backgroundPath + '");background-size: cover;';

        $("#topCards").append("<div onclick='openCard(\"" + curCard['code'] + "\")' class='topCardFeatured" + (curCard['boostlevel'] > 0 ? ' topCardFeaturedBoost' : '') + "' style='" + background + "'><div>" + curCard['name'] + "</div><div>" + curCard['description'] + "</div>" + (curCard['boostlevel'] > 0 ? "<div style='position:absolute;bottom:7px;right:7px;'><img src='https://voalis.com/images/service-boost-icon.png' style='width:31px;'></img></div>" : "") + "</div>");
    }

    if (false) {
        showCategoryImages();
        fillCardsOnScroll = false;
        justCheckingCategories = true;
        $("#serviceSearchCards, .newHomepage").hide();
        $("#topbar").show();
        $("#chooseCategoryDiv").css("pointer-events", "none");
    }

    if (searchingService) {
        $(".newHomepage").hide();
        $("#serviceSearch, #topbar").show();

        if (!justCheckingCategories) getServices();

        if (searchQuery != "") {
            $("#serviceSearchText").html("Onde encontrar " + titleCase(searchQuery) + "<br>" + $("#searchbarLocationText").text() + "?").show();
        }
    }

    if (ipLocationCountry == "BR" || searchingService) $(".serviceOpeners").css("visibility", "visible");
    else {
        $("#newHomepage, #newHomepageBottomPadding").hide()
        $("#mainMenu").show().css("display", "flex");
        if (language == "es") {
            $("#spanishTopInOldKnowMore").show().parent().show();
            setTimeout(function() {
                document.querySelector("#spanishTopInOldKnowMore").appendChild(document.querySelector("#topCardsContainer"));
            }, 250);
        }
    }

    if (searchQuery != null) $("#searchBarInput").val(searchQuery);

    if (searchCategory > -1) {
        $("#currentCategoryText").text(categories[searchCategory]).parent().show();
        $("#resetCategory").show();
    } else {
        $("#noCategory").show();
    }

    if (Object.keys(savedNoLogin).length > 0) {
        if (!searchingService && !loggedIn && !ignoreSavedNoLogin) {
            fillSavedDiv();
            $("#cardsSavedContainer").show();
            $(".newHomepage, #bottomBar").hide();

            $("body").css("background-image", "url()");
            $("body").css("background-color", "#2f2e4e");
        }

        $("body").show();
    }

    if (inIframe) {
        $("#topbar").hide();
    }
});

var ignoreSavedNoLogin = false;

var justCheckingCategories = false;
var fillCardsOnScroll = true;

function swap(json) {
    var ret = {};
    for (var key in json) ret[json[key]] = key;
    return ret;
}

var fullStateName = {
    'AC': 'Acre',
    'AL': 'Alagoas',
    'AP': 'Amapá',
    'AM': 'Amazonas',
    'BA': 'Bahia',
    'CE': 'Ceará',
    'DF': 'Distrito Federal',
    'ES': 'Espírito Santo',
    'GO': 'Goías',
    'MA': 'Maranhão',
    'MT': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais',
    'PA': 'Pará',
    'PB': 'Paraíba',
    'PR': 'Paraná',
    'PE': 'Pernambuco',
    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',
    'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',
    'RR': 'Roraíma',
    'SC': 'Santa Catarina',
    'SP': 'São Paulo',
    'SE': 'Sergipe',
    'TO': 'Tocantins',
    'pt': 'perto de você',
    'es': 'perto de você'
}

var fullStateNameInv = swap(fullStateName);

var fullStateNameArtigo = {
    'AC': 'no',
    'AL': 'em',
    'AP': 'no',
    'AM': 'no',
    'BA': 'na',
    'CE': 'no',
    'DF': 'no',
    'ES': 'em',
    'GO': 'em',
    'MA': 'no',
    'MT': 'no',
    'MS': 'no',
    'MG': 'em',
    'PA': 'no',
    'PB': 'em',
    'PR': 'no',
    'PE': 'em',
    'PI': 'no',
    'RJ': 'no',
    'RN': 'no',
    'RS': 'no',
    'RO': 'em',
    'RR': 'em',
    'SC': 'em',
    'SP': 'em',
    'SE': 'no',
    'TO': 'em',
}

var askStateSelectVal;

function askState() {
    askStateSelectVal = searchState;

    $.confirm({
        title: 'Escolha seu estado',
        backgroundDismiss: true,
        content: '<select onchange="askStateSelectVal = this.value" style="margin-left: 8px;width: 160px;"><option value="AC">Acre</option> <option value="AL">Alagoas</option> <option value="AP">Amapá</option> <option value="AM">Amazonas</option> <option value="BA">Bahia</option> <option value="CE">Ceará</option> <option value="DF">Distrito Federal</option> <option value="ES">Espírito Santo</option> <option value="GO">Goías</option> <option value="MA">Maranhão</option> <option value="MT">Mato Grosso</option> <option value="MS">Mato Grosso do Sul</option> <option value="MG">Minas Gerais</option> <option value="PA">Pará</option> <option value="PB">Paraíba</option> <option value="PR">Paraná</option> <option value="PE">Pernambuco</option> <option value="PI">Piauí</option> <option value="RJ">Rio de Janeiro</option> <option value="RN">Rio Grande do Norte</option> <option value="RS">Rio Grande do Sul</option> <option value="RO">Rondônia</option> <option value="RR">Roraíma</option> <option value="SC">Santa Catarina</option> <option value="SP">São Paulo</option> <option value="SE">Sergipe</option> <option value="TO">Tocantins</option> </select>'.replace('value="' + searchState + '"', 'value="' + searchState + '" selected'),
        icon: 'fa fa-question-circle',
        animation: 'scale',
        closeAnimation: 'scale',
        opacity: 0.8,
        useBootstrap: false,
        boxWidth: '200px',
        buttons: {
            'ok': {
                text: 'Escolher estado',
                btnClass: 'btn-blue',
                action: function() {
                    changeState(askStateSelectVal);
                }
            }
        }
    });
}

function changeState() {
    modifyURL(askStateSelectVal);
}

function modifyURL(changeSearchState, changeSearchQuery, changeSearchCategory) {
    if (changeSearchState != null) searchState = changeSearchState;
    if (changeSearchQuery != null) searchQuery = changeSearchQuery;
    if (changeSearchCategory != null) searchCategory = changeSearchCategory;

    searchQuery = searchQuery.split(" ").join("-");

    window.location = "https://voalis.com/s/" + fullStateName[searchState].split(" ").join("-") + "/" + (searchCategory == -1 ? "" : searchCategory + "/") + searchQuery
}

var currentLat = -2167740;
var currentLong = -4145530;
var ipState = 'RJ';

var searchState = "RJ";
var searchQuery = "";
var searchCategory = -1;

var searchingService = ""


if (searchState.length == 2) searchState = searchState.toUpperCase();
else searchState = fullStateNameInv[searchState.split("-").join(" ").replace("/", "")];





var categories = {
    0: "Outros",
    1: "Medicina",
    2: "Jurídico",
    3: "Gastronomia & Bebidas",
    4: "Educação",
    6: "Transportes & Entregas",
    7: "Pets",
    8: "Esportes & Outdoors",
    9: "Residencial & Doméstico",
    10: "Reformas, Reparos & Instalações",
    11: "Beleza & Estética",
    12: "Eventos & Festas",
    13: "Tecnologia",
    14: "Arquitetura & Engenharia",
    15: "Turismo",
    16: "Roupas & Acessórios",
    17: "Contabilidade & Financeiro",
    18: "Religioso",
    19: "Mecânica & Veículos",
    20: "Mídia & Design",
    21: "Seguradoras",
    22: "Saúde & Bem Estar",
    23: "Hortifrúti & Rural",
    24: "Infantil",
    25: "Antiguidades & Objetos de Artes",
    26: "Administração & Negócios",
    27: "Corretagem & Administração de Imóveis",
    28: "Beneficentes",
    29: "Assistencia Técnica",
    30: "Esotéricos",
    31: "Eróticos",
    32: "Varejo",
    33: "Móveis & Interiores",
    34: "Segurança",
    35: "Industrial",
    36: "Eleições 2020"
};

var categoriesInv = swap(categories);

function fillCategoriesSelectBoxes() {
    var categoryValues = Object.values(categories).slice(1).sort().concat([categories[0]]);
    for (var i = 0; i < categoryValues.length; i++) {
        $('.serviceCategoriesSelect').append($('<option>', {
            value: categoriesInv[categoryValues[i]],
            text: categoryValues[i]
        }));
    }

    $('.serviceCategoriesSelect').addClass('serviceCategoriesSelectFilled').removeClass('serviceCategoriesSelect');
}

/*
var categoryImages = {
    'adm.png':26,
    'ant.png':25,
    'arq.png':14,
    'ass.png':29,
    'bel.png':11,
    'ben.png':28,
    'cas.png':9,
    'con.png':17,
    'cor.png':27,
    'edu.png':4,
    'esp.png':8,
    'eve.png':12,
    'gas.png':3,
    'hor.png':23,
    'inf.png':24,
    'jur.png':2,
    'mec.png':19,
    'med.png':1,
    'mid.png':20,
//	'out.png':0,
    'pet.png':7,
    'ref.png':10,
    'rel.png':18,
    'rou.png':16,
    'sau.png':22,
    'seg.png':21,
    'tec.png':13,
    'tra.png':6,
    'tur.png':15
};
*/

//var categoryImagesInv = swap(categoryImages);

var categoriesCount = [14, 27, 22, 2, 20, 11, 1, 3, 13, 0, 10, 34, 33, 19, 16, 32, 4, 15, 26, 9, 12, 18, 17, 8, 21, 29, 6, 30, 31, 7, 28, 35, 24, 23, 36, 25];

categoriesCount.splice(categoriesCount.indexOf(0), 1);
categoriesCount.push(0);



//categoryImagesAddr = Object.keys(categoryImages);

var filledCategoryImages = false;

/*
for(var i = 0; i<categoryImagesAddr.length;i++) {
        if (categoriesCount.indexOf(categoryImages[categoryImagesAddr[i]]) == -1) continue;
        $("#cardsCategorySelectMenu").append("<img onclick='filterByCat(" + categoryImages[categoryImagesAddr[i]] + ")' src='https://voalis.com/service/categories/" + categoryImagesAddr[i] + "' class='" + (mobileVersion?"categoryImageMobile":"categoryImage") + "'></img>");
    }
*/

function fillCategoryImages() {
    for (var i = 0; i < categoriesCount.length; i++) {
        //console.log(categoryImagesInv[categoriesCount[i]]);
        /*if (categoryImagesAddr.indexOf(categoryImagesInv[categoriesCount[i]]) == -1) {
            console.log("No img for", categories[categoriesCount[i]]);
            continue;
        }*/

        $("#cardsCategorySelectMenu").append("<img style='cursor:pointer;' onclick='modifyURL(searchState,\"\",\"" + categoriesCount[i] + "\")' src='https://voalis.com/service/categories/" + categoriesCount[i] + ".png' class='" + (mobileVersion ? "categoryImageMobile" : "categoryImage") + "'></img>");
    }

    filledCategoryImages = true;
}

var showingCategoryImages = false;
var animatingCategoryImages = false;

function showCategoryImages() {
    if (animatingCategoryImages) return;
    animatingCategoryImages = true;

    if (!filledCategoryImages) fillCategoryImages();

    if (showingCategoryImages) {


        $("#cardsCategorySelectMenu").css("height", "100%");

        setTimeout(function() {
            $("#cardsCategorySelectMenu").css("height", "0%");
        }, 100);

        $("#noCategory").css("margin-bottom", "0px");

        setTimeout(function() {
            $("#noCategory").hide();

            if (searchCategory > -1) $("#hasCategory, #resetCategory").show();
            else $("#noCategory").show();

            $("#noCategory").html("Ou, <u>pesquisar por categoria</u>");
        }, 800);



        animatingCategoryImages = false;
    } else {
        $("#hasCategory, #resetCategory").hide();
        $("#cardsCategorySelectMenu").show().css("height", "200%");

        setTimeout(function() {
            $("#cardsCategorySelectMenu").css("height", "auto");
            animatingCategoryImages = false;
        }, 500);

        $("#noCategory").text("Ou, pesquise por categoria: ").css("margin-bottom", "15px").show();
    }

    showingCategoryImages = !showingCategoryImages;
}







var topKeys;

function titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

var ziggyLoginMethodNames = {
    "phone": "Número de Telefone",
    "voalis": "Nome de Usuário",
    "email": "Email"
}

var curLoginMethod;

function openLoginZiggy(loginMethod) {
    curLoginMethod = loginMethod;

    $("#loginMenuHeader").html("Digite seu loginMethod e senha<br> de sua conta Voalis para fazer login.".replace("loginMethod", ziggyLoginMethodNames[loginMethod]));

    if (loginMethod != "phone") $("#loginMenuIdentificationMethodTextbox").attr("placeholder", ziggyLoginMethodNames[loginMethod]);
    else {
        //$("#loginMenuHeader").html("");
        internationalizeLoginInput("#loginMenuIdentificationMethodTextbox");
    }

    $("#chooseLoginMethod").fadeOut(125, function() {
        $("#loginMenuActual").fadeIn(125);
    });
}


var ipLocationCountry = "BR";
var ipLocationState = "RJ";
var language = "pt";


function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var inIframe = inIframe();

var showService = false;

if (ipLocationCountry == "BR" && true) {
    showService = true;
}

var internationalPhoneNumber;

function internationalizeLoginInput(input) {
    if (internationalPhoneNumber != null) deinternationalizeInput();

    internationalPhoneNumber = window.intlTelInput(document.querySelector(input), {
        dropdownContainer: document.body,
        initialCountry: ipLocationCountry,
        preferredCountries: "",
        autoPlaceholder: "aggressive",
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.8/js/utils.js",
    });
}

function deinternationalizeInput() {
    if (internationalPhoneNumber == null) return;
    internationalPhoneNumber.destroy();
    internationalPhoneNumber = null;
}

function openForgotPasswordMenu() {
    $('#loginMenuActual').fadeOut(250);
    $('#requestNewPasswordMenu').delay(150).fadeIn(250);
    $("#loginMenuHeader").html("Digite seu loginMethod<br>para resetar sua senha.".replace("loginMethod", ziggyLoginMethodNames[curLoginMethod]));

    if (curLoginMethod != "phone") $("#requestNewPasswordIdentificationMethodTextbox").attr("placeholder", ziggyLoginMethodNames[curLoginMethod]);
    else internationalizeLoginInput("#requestNewPasswordIdentificationMethodTextbox");
}

var topNearMe = {
    "dinamica": {
        "code": "dinamica",
        "logo": 1,
        "name": "DINAMICA  ENGENHARIA ",
        "boostlevel": 1,
        "background": "architect7",
        "framecolor": "876a1d",
        "description": "ENGENHARIA E MARCENARIA "
    },
    "mirianmanoel": {
        "code": "mirianmanoel",
        "logo": 0,
        "name": "Mirian Manoel da Silva",
        "boostlevel": 1,
        "background": "science2",
        "framecolor": "9964bd",
        "description": "Psic\u00f3loga  CRP- 06\/51526-4"
    },
    "frigorifico": {
        "code": "frigorifico",
        "logo": 1,
        "name": "FRIGOR\u00cdFICO NOSSA CARNE",
        "boostlevel": 0,
        "background": "custom",
        "framecolor": "000000",
        "description": "Carnes de qualidade"
    },
    "daianastore": {
        "code": "daianastore",
        "logo": 0,
        "name": "Daiana_Store ",
        "boostlevel": 0,
        "background": "custom",
        "framecolor": "000000",
        "description": "Loja Online"
    },
    "top": {
        "stateMode": 0,
        "location": "pt"
    }
};
/*
        <main class="wrapper">
          <section class="section parallax bg1">
          </section>
        </main>
        */


var gettingServices = false;

var cards = [];

function getServices() {
    if (gettingServices) return false;
    gettingServices = true;
    console.log("Getting: " + cardsShown.length);
    sendData({
        'getservices': 1,
        'getservicesstate': searchState,
        'getservicescategory': searchCategory,
        'getservicescutstart': cardsShown.length,
        'getserviceslatitude': currentLat,
        'getserviceslongitude': currentLong,
        'getservicesuser': (loggedIn ? auth[0] : ""),
        'getservicessearch': searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }, receiveServices);
}

var cardsShown = [];
var cardsToShow = [];

function getCardsToShow() {
    cardsToShow = [];

    var cardsKeys = Object.keys(cards);

    for (var j = 0; j < cardsKeys.length; j++) {
        if (cardsShown.indexOf(cardsKeys[j]) != -1) continue;
        var card = cards[cardsKeys[j]];
        cardsToShow.push(card);
    }

    cardsToShow.reverse();
}

var addingMoreCards = false;
var imagesFinishedLoading = true;

function resetImagesFinishedLoading() {
    imagesFinishedLoading = false;

    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => {
        img.onload = img.onerror = resolve;
    }))).then(() => {
        imagesFinishedLoading = true;
    });
}


var disableOpenCard = false;

function openCard(card, ext) {
    if (ext == null) ext = "";
    if (disableOpenCard) return;
    window.location = "https://voalis.com/c/" + card + ext;
}

function tempDisableOpenCard() {
    disableOpenCard = false;
    setTimeout(function() {
        disableOpenCard = true;
    }, 10000);
}

function showCard(amount, delay, main) {
    if (addingMoreCards && main == undefined) return false;
    if (cardsToShow.length == 0) return false;

    resetImagesFinishedLoading();

    addingMoreCards = true;

    var card = cardsToShow.pop();

    var logoPath = "";
    if (card.logo == 1) logoPath = "https://voalis.com/userassets/thumbnails/logos/" + card.code + ".jpg";

    console.log(card);

    $("#serviceSearchCards").append(
        '<div onclick="openCard(\'' + card.code + '\')" class="serviceSearchCardContainer" ' + (card.background == "custom" ? '' : 'style="background-position:50%"') + ' id="serviceSearchCardContainer-' + card.code + '"><div>' +
        '<div class="serviceSearchCard">' +
        '<div><div>' + card.name + '</div>' +
        (card.logo == 1 ? '<img onerror="$(this).after(\'<div></div>\').remove()" src=' + logoPath + '></img>' : '<div></div>') +
        '<div>' + card.description + '</div>' +
        '</div>' +
        (card.boost > 0 ? '<div style="position:absolute;top:0px;right:0px;"><img src="https://voalis.com/images/service-boost-icon.png" style="height: auto; border-radius: 0px; border-bottom-left-radius: 15px; margin: auto; margin-top: -8px;width:31px;"></img></div>' : '') +
        ' ' +
        '</div> </div> </div>'
    );


    latest = $("#serviceSearchCardContainer-" + card.code);

    var backgroundPath = "https://voalis.com/";
    if (card.background == "custom") backgroundPath += "userassets/thumbnails/custombackgrounds/" + card.code + ".jpg";
    else backgroundPath += "cardassets/backgrounds/thumbnails/3_" + card.background + ".jpg";

    if (card.logo == 0) latest.find(":first-child").css("backdrop-filter", "blur(3px)")



    console.log(backgroundPath);

    latest.css("background-image", "url('" + backgroundPath + "')");

    cardsShown.push(card.code);

    if (amount > 0) setTimeout(function(amount, delay) {
        showCard(amount, delay, true)
    }, delay, amount - 1, delay);
    else addingMoreCards = false;
}

var mobileVersion = false;

function receiveServices(response) {
    cards = JSON.parse(response);
    getCardsToShow();

    if (Object.keys(cards).length == 0 && $("#serviceSearchCards").html() == "") $("#serviceSearchCardsNotFound").show();

    if (Object.keys(cards).length < 10) outtaCards = true;
    gettingServices = false;
    showCard((mobileVersion ? 2 : 4), (mobileVersion ? 350 : 150), true);
}

function onWindowResize() {
    mobileVersion = (window.innerWidth <= 600);
};

document.querySelector("body").onresize = onWindowResize;
onWindowResize();

var outtaCards = false;
var addingMoreCards = false;

$(window).scroll(function() {
    if (!fillCardsOnScroll) return false;

    if (($("#serviceSearch").css("display") != "none") && $(window).scrollTop() + window.innerHeight > $(document).height() - 250) {
        if (cardsToShow.length == 0 && !outtaCards) {
            getServices();
        } else if (!outtaCards && imagesFinishedLoading) {
            showCard((mobileVersion ? 1 : 2), (mobileVersion ? 500 : 150));
        }
    }
});


var deferredPrompt;
var swRegistration;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function registerAppPromptInteractions(subtype, extra) {
    if (extra == null) extra = "";
    sendData({
        "voaliscardclicks": "6",
        "voaliscardclickscode": "main",
        "voaliscardclickssubtype": subtype,
        "voaliscardclicksextra": extra
    }, pass);
}

window.addEventListener('appinstalled', (evt) => {
    registerAppPromptInteractions("5");
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("https://voalis.com/serviceworker.js").then(function(registration) {
            swRegistration = registration;
            console.log("ServiceWorker registration successful with scope: ", registration.scope);
        }, function(err) {
            console.log("ServiceWorker registration failed: ", err);
        });
    });
}

console.log(navigator.userAgent);