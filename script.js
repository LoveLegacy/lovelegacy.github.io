var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: '',
        weatherSymbol: '',
        weather: ''
    }
});

var week = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
var timerID = setInterval(updateTime, 1000);
updateTime();
updateWeather();
function updateTime() {
    var date = new Date();
    var cd = new Date(date.getTime() + 1000*60*60);
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2);
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
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
      // do something with jsonResponse
      console.log(jsonResponse);

      clock.weatherSymbol = "owf owf-" + jsonResponse.weather[0].id;
      clock.weather = jsonResponse.main.temp;
    });

}