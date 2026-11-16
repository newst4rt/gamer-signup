const handleLogin = (event) => {
    event.preventDefault(); // Prevent of refreshing page

    // Get the "form" element that triggered the event
    const currentForm = event.target; 

    // Create a FormData object from the form
    const formData = new FormData(currentForm); 
    console.log(formData)

    const user = formData.get('username');    // Get Username
    const email = formData.get('email');    // Get Email
    const password = formData.get('pw');    // Get Password
    const checkbox = formData.get('checkbox')
    console.log(`${email}:${password}`);

    if (!checkbox) {
        const checkBoxFinePrint = document.querySelector(`.form-fineprint.require-terms.error`);    
        const borderCheckBox = document.querySelector(`.empty-field.checkbox`); 
        const reqterms = document.querySelector('.req.terms')
        borderCheckBox.style.border = "1px solid #FF837A" 
        reqterms.style.color = "#FF837A"
        checkBoxFinePrint.style.display = "block"     
        return false
    }

    if (check_usermail(email, "mail") && check_usermail(user, "username") && checkPasswordStrength(document.querySelector("#password")) && repPassword(document.querySelector("#rep-password"))) {
        console.log("everything has been validated ! let's go ahead")
        document.querySelector('.reg-formula').style.display = "none"
        document.querySelector('.handshake-complete').style.display = "block"
        document.querySelector('.desc-complete .username').innerHTML = user
        document.querySelectorAll('.locked').forEach(e => {
            e.style.display = "block"
            e.style.color = "white"
        });
        document.querySelectorAll('.valid').forEach(e => {
            e.style.display = "none"
        });
        document.querySelectorAll('.req-counter').forEach(e => {
            e.innerHTML = "PROVISIONED"
        });
        
    }
    //currentForm.reset();                    // Reset <input> fields
};

function check_usermail(value, type) {

    let regex;

    if (type == "username") {
        regex = /^[\w\d_-]{3,100}$/;
    } else if (type == "mail") {
        regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
    }

    return regex.test(value)
}

const target_usermail = (event, type) => {
    console.log(type)
    const value = event.target.value
    const finePrintError = document.querySelector(`.form-fineprint.${type}.error`);

    if (value.length == 0) {
    }

    if (value.length > 0) {
        console.log("his")
        document.querySelector(".req-callsign").style.display = "none"
    } 

    if (check_usermail(value, type)) {
        event.target.style.removeProperty("border");
        finePrintError.style.removeProperty("display")
        event.target.style.removeProperty("outline")
        event.target.nextElementSibling.style.display = "block"
        document.querySelector(`.req.valid.${type}`).style.display = "block"
        document.querySelector(`.req.error.${type}`).style.removeProperty('display')
        document.querySelector(`.req.${type}`).style.display = "none"
        if(type == "username") {
            document.querySelector(`.subcontainer.title`).innerHTML = value
            document.querySelector(`.subcontainer.title`).style.color = "white"
        }
        return true

    } else {
        console.log("fail")
        event.target.style.border = "1px solid #FF837A";
        event.target.style.outline = "none";
        finePrintError.style.display = "block";
        event.target.nextElementSibling.style.removeProperty("display");
        document.querySelector(`.req.valid.${type}`).style.removeProperty('display')
        document.querySelector(`.req.error.${type}`).style.display = "block"
        document.querySelector(`.req.${type}`).style.display = "none"
        if(type == "username") {
            document.querySelector(`.subcontainer.title`).innerHTML = "UNASSIGNED"
            document.querySelector(`.subcontainer.title`).style.color = "#808892"
        }

    }
    return false

}

function showPassword(event, type) {
    console.log(type)
    const pwBox = document.querySelector(`#${type}`);
    console.log(pwBox)
    pwBox.type = pwBox.type === "password" ? "text" : "password";
    
    const toggleBtOn = document.querySelector(`.toggle-${type}.on`);
    const toggleBtOff = document.querySelector(`.toggle-${type}.off`);
    console.log(toggleBtOff)
    if (toggleBtOn.classList.contains("hidden")) {
        console.log("hi")
        toggleBtOn.classList.remove("hidden")
        toggleBtOff.classList.add("hidden");
    } else {
        toggleBtOn.classList.add("hidden");
        toggleBtOff.classList.remove("hidden");

    }

}

function checkPasswordStrength(event) {
    const regexDigit = /\d/;
    const regexSymbol = /\W/;
    const regexUpper = /[A-Z]/;

    let value;
    let ev;

    if (event instanceof Event) {
        value = event.target.value
        ev = event.target
    } else {
        value = event.value
        ev = event
    }

    console.log(event.target)
    const defaultPwFineprint = document.querySelector(`.form-fineprint.password`);
    const finePrintError = document.querySelector(`.form-fineprint.password-one.error`);
    

    const pwbarOne = document.querySelector(`.pwsec-bar.one`);
    const pwbarTwo = document.querySelector(`.pwsec-bar.two`);
    const pwbarThree = document.querySelector(`.pwsec-bar.three`);
    const pwbarFour = document.querySelector(`.pwsec-bar.four`);
    const finePrintFair = document.querySelector(`.form-fineprint.fair`);
    const finePrintGood = document.querySelector(`.form-fineprint.good`);
    const finePrintStrong = document.querySelector(`.form-fineprint.strong`);

    const gridLeftOn = document.querySelector(`.req.valid.password`);
    const gridLeftOff = document.querySelector(`.req.password`);
    const gridLeftError = document.querySelector(`.req.error.password`);

    const truemark = document.querySelector(`.truemark.password`);
    const repPassword = document.querySelector(`#rep-password`)
    const repPwlen = repPassword.value
    if (repPwlen.length > 0) {
        repPassword.dispatchEvent(new Event('input'));
    }


    /* INIT */
    finePrintFair.style.display = "none";
    finePrintGood.style.display = "none";
    finePrintStrong.style.display = "none";

    pwbarOne.style.backgroundColor = "#303D4A";
    pwbarTwo.style.backgroundColor = "#303D4A"
    pwbarThree.style.backgroundColor = "#303D4A"
    pwbarFour.style.backgroundColor = "#303D4A"

    if (value.length > 8 && regexDigit.test(value) && regexUpper.test(value) && regexSymbol.test(value) || value.length > 16 && regexUpper.test(value) && (regexDigit.test(value) || regexSymbol.test(value))) {
        pwbarOne.style.backgroundColor = "#BDF339";
        pwbarTwo.style.backgroundColor = "#BDF339";
        pwbarThree.style.backgroundColor = "#BDF339";
        pwbarFour.style.backgroundColor = "#BDF339";
        finePrintStrong.style.display = "flex";
        gridLeftOn.style.display = "block";
        gridLeftOff.style.display = "none";
        gridLeftError.style.display = "none"
        truemark.style.display = "block";


        return true
    }

    if (value.length > 15 || value.length > 8 && (regexUpper.test(value) || regexDigit.test(value)) && (regexUpper.test(value) || regexSymbol.test(value))) {
        pwbarOne.style.backgroundColor = "#BDF339";
        pwbarTwo.style.backgroundColor = "#BDF339";
        pwbarThree.style.backgroundColor = "#BDF339";
        finePrintGood.style.display = "grid";
        gridLeftOn.style.display = "block";
        gridLeftOff.style.display = "none";
        gridLeftError.style.display = "none"
        truemark.style.display = "block";
        return true
    }

    if (value.length > 7) {
        ev.style.removeProperty("border");
        ev.style.removeProperty("outline");
        pwbarOne.style.backgroundColor = "#FFC44F";
        pwbarTwo.style.backgroundColor = "#FFC44F";
        finePrintError.style.display = "none";
        defaultPwFineprint.style.display = "grid";
        finePrintFair.style.display = "grid";
        truemark.style.display = "block";
        gridLeftOn.style.display = "block";
        gridLeftOff.style.display = "none";
        gridLeftError.style.display = "none"
        return true
    }


    if ((value.length > 0) && (value.length < 8)) {
        ev.style.border = "1px solid #FF837A";
        ev.style.outline = "none";
        pwbarOne.style.backgroundColor = "#F8847E";
        defaultPwFineprint.style.display = "none";
        finePrintError.style.display = "grid";
        gridLeftOn.style.display = "none";
        gridLeftOff.style.display = "none";
        gridLeftError.style.display = "block"
    }

    if (value.length == 0) {
        gridLeftOn.style.display = "none";
        gridLeftOff.style.display = "block";
        truemark.style.display = "none";

    }
    console.log("casjda")
    return false
}



function repPassword(event) {

    let value
    let ev

    const formPassword = document.querySelector(`#password`);
    const truemark = document.querySelector(`.truemark.password-sec`);
    const formFinePrintError = document.querySelector(`.form-fineprint.password-sec.error`)

    const gridLeftInit = document.querySelector(`.req.confirm`);
    const gridLeftOff = document.querySelector(`.req.error.confirm`);
    const gridLeftOn = document.querySelector(`.req.valid.confirm`);

    if (event instanceof Event) {
        value = event.target.value
        ev = event.target
    } else {
        value = event.value
        ev = event
    }

    if (formPassword.value.length == 0) {
        gridLeftOff.style.display = "none";
        gridLeftOn.style.display = "none";
        gridLeftInit.style.display = "block";
    }

    console.log(formPassword.value)
    if (formPassword.value == value) {
        console.log("test")
        truemark.style.display = "block";
        formFinePrintError.style.display = "none";
        ev.style.removeProperty("border");
        ev.style.removeProperty("outline");
        gridLeftOff.style.display = "none";
        gridLeftOn.style.display = "block";
        gridLeftInit.style.display = "none";
        return true

    } else {
        truemark.style.display = "none";
        formFinePrintError.style.display = "block";
        ev.style.border = "1px solid #FF837A";
        ev.style.outline = "none";
        gridLeftOff.style.display = "block";
        gridLeftOn.style.display = "none";
        gridLeftInit.style.display = "none";
        return false
    }
}

function checkBoxTerms(event) {
    const reqterms = document.querySelector('.req.terms')
    const validterms = document.querySelector('.req.valid.terms')
    if (event.target.checked) {
        console.log("sdas")
        reqterms.style.display = "none"
        validterms.style.display = "block"
        return true
    } else {
        reqterms.style.display = "block"
        validterms.style.display = "none"
        return false
    }

}

function counterReq() {

    let count = 0
    if (uCount) {
        count++
    }
    if (mCount) {
        count++
    }
    if (pCount) {
        count++
    }
    if (cCount) {
        count++
    }
    if (tCount) {
        count++
    }

    const reqCounterSub = document.querySelector('.req-counter.sub')
    const reqCounterMain = document.querySelector('.req-counter.main')
    const submitBtn = document.querySelector('.submitbtn')
    reqCounterMain.textContent = `${count}/5 READY`;
    reqCounterSub.textContent = `${count}/5 READY`;
    if(count==5) {
        reqCounterMain.style.color = "#BDF339"
        reqCounterSub.style.color = "#BDF339"
        submitBtn.classList.add('fullfilled');
        submitBtn.value="TRANSMITTING_";

    } else {
        reqCounterMain.style.color = "#6B7179"
        reqCounterSub.style.color = "#6B7179"
        submitBtn.classList.remove('fullfilled');
        submitBtn.value="INITIALIZE ACCOUNT";


    }

}

let uCount;
let mCount;
let pCount;
let cCount;
let tCount;



const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', handleLogin);

const usernameForm = document.querySelector('#username');
usernameForm.addEventListener('input', (event) => { 
    if(target_usermail(event, "username")) {
        uCount = true
    } else {
        uCount = false
    }    
    counterReq()
})

const emailForm = document.querySelector('#email');
emailForm.addEventListener('input', (event) => {
    if(target_usermail(event, "mail")) {
        mCount = true
    } else {
        mCount = false
    }
    counterReq()
})

const passwordForm = document.querySelector('#password');
passwordForm.addEventListener('input', (event) => { 
    if(checkPasswordStrength(event)) {
        console.log("haha")
        pCount = true
    } else {
        pCount = false
        cCount = false
    }
    counterReq()
})

const passwordFormSec = document.querySelector('#rep-password');
passwordFormSec.addEventListener('input', (event) => { 
    if(repPassword(event)) {
        cCount = true
    } else {
        cCount = false

    }
    counterReq()
})

const checkBoxForm = document.querySelector('.checkbox');
checkBoxForm.addEventListener('change', (event) => { 
    console.log("trigger")
    if(checkBoxTerms(event)) {
        tCount = true
    } else {
        tCount = false
    }
    counterReq()
})

usernameForm.dispatchEvent(new Event('input'));
emailForm.dispatchEvent(new Event('input'));
checkBoxForm.dispatchEvent(new Event('change'));




