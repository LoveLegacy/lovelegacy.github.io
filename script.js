var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: '',
        weatherSymbol: '',
        weather: '',
        countDown: ''
    }
});

var week = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

function updateTime() {
    var date = new Date();
    var cd = new Date(date.getTime() + 2000*60*60);
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2);
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];

    setTimeout(updateTime, 1000);
};

function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}

function updateWeather(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,se&appid=29b385e81f7478e6a6c9b323fcba6fdd&units=metric')
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResponse) {
      clock.weatherSymbol = "owf owf-" + jsonResponse.weather[0].id;
      clock.weather = Math.round(jsonResponse.main.temp);

      setTimeout(updateWeather, 1000*60);
    });

}

function updateCountDown(){
    today=new Date();
    var one_day=1000*60*60*24;

    var vacation=new Date(today.getFullYear(), 06, 16);
    var classic=new Date(today.getFullYear(), 07, 26);

    if (today.getMonth()==11 && today.getDate()>25) {
        vacation.setFullYear(vacation.getFullYear()+1); 
        classic.setFullYear(classic.getFullYear()+1); 
    }  
    
    var vacationDaysLeft = (Math.ceil((vacation.getTime()-today.getTime())/(one_day)));
    var classicDaysLeft = (Math.ceil((classic.getTime()-today.getTime())/(one_day)));

    clock.vacationDaysLeft = vacationDaysLeft;
    clock.classicDaysLeft = classicDaysLeft;

    setTimeout(updateCountDown, 1000*60);
}

updateTime();
updateWeather();
updateCountDown();