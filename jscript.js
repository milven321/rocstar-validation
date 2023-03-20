const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const nickname = document.getElementById('nickname');
const country = document.getElementById('country');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

year.addEventListener("change", function() {
  var selectedYear = year.value;
  var minimumYear = new Date().getFullYear() - 18;

  var selectedMonth = month.value;

  var selectedDay = day.value;

  var selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
  var minimumDate = new Date(minimumYear, 0, 1);

  if (selectedDate > minimumDate) {
    setError(day, "You must be 18 years or older to proceed.");

    year.value = "Year";
    month.value = "Month";
    day.value = "Day";
  }else{
    SuccessMsg(nicknameVal);
  }

});

form.addEventListener('submit', e => {
    e.preventDefault();

    validates();
});

const sendData = (nicknameVal, sRate, Count) => {
    if(sRate === Count){
        swal("Hello " + nicknameVal , "You are Registered", "success");
        form.reset();
    }

}

const SuccessMsg = (nicknameVal) => {
    let conContr = document.getElementsByClassName('controller');
    var Count = conContr.length - 1;
    for(var i = 0; i < conContr.length; i++){
        if(conContr[i].className === "controller success"){
            var sRate = 0 + i;
            console.log(sRate);
            sendData(nicknameVal, sRate, Count);
        
    } else{
            return false;
        }
    }
}

const setError = (element, message) => {
    const conControl = element.parentElement;
    const errorDisplay = conControl.querySelector('.error');
    conControl.className = "controller error";

    errorDisplay.innerText = message;
    conControl.classList.add('error');
    conControl.classList.remove('success')
}

const setSuccess = element => {
    const conControl = element.parentElement;
    const errorDisplay = conControl.querySelector('.error');
    conControl.className = "controller success";

    errorDisplay.innerText = '';
    conControl.classList.add('success');
    conControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validates = () => {
    const emailVal = email.value.trim();
    const passVal = password.value.trim();
    const nicknameVal = nickname.value.trim();


    if(emailVal === '') {
        setError(email, 'Please enter you email');
    } else {
        setSuccess(email);
    }

    if(passVal === '') {
        setError(password, 'Please enter your password');
    } else {
        setSuccess(password);
    }

    if(nicknameVal === '') {
        setError(nickname, 'Please enter your Nickname');
    } else {
        setSuccess(nickname);
    }

    if(country.selectedIndex <= 0) {
        setError(country, 'Please select a country');
    } else {
        setSuccess(country);
    }

    
    if (day.selectedIndex <= 0 || month.selectedIndex <= 0 || year.selectedIndex <= 0) {
        setError(day, 'Please select a day, month, and year for your birthdate.');
    } else{
        setSuccess(day);
    
    }

    if (!checkbox1.checked) {
        setError(checkbox1,"Please check this field");
    } else {
        setSuccess(checkbox1);
    }

    if (!checkbox2.checked || checkbox2.checked) {
        setSuccess(checkbox2);
    }

        SuccessMsg(nicknameVal);
    
};

email.addEventListener("input", function(){

    if (!isValidEmail(email.value)) {
        setError(email, 'Please enter a valid email address');
    } else {
        setSuccess(email);
    }

});

password.addEventListener("input", function(){
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    if (!strongRegex.test(password.value) || password.value.length < 8 || password.value.length > 30){
        setError(password, "Must be between 8-30 characters, including one uppercase character and one number");
    }else{  
        setSuccess(password);
    }
});

nickname.addEventListener("input", function(){
    var strongRegex = new RegExp("^(?=.*[!@#\$%\^&\*.=\*+||\?/\//,'\^])");
    if (strongRegex.test(nickname.value) || nickname.value.length < 6 || nickname.value.length > 16) {
        setError(nickname, "Must be between 6-16 characters, and only contains letters, numbers, hyphens and underscores")
    } else{
        setSuccess(nickname);
    }
});
