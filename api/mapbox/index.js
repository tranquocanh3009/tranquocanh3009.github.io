mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbnF1b2NhbmgzMDA5IiwiYSI6ImNrOHZsMHp6ajBkajgzZ282cTUxbXp1dnEifQ.Wu-3h9DOFbunDmHXKzGuIA';

var map = new mapboxgl.Map({
container: 'map', // container id
style: 'style.json', // stylesheet location
center: [106.693603, 10.770175], // starting position [lng, lat]
zoom: 2 // starting zoom
});


function draw() {
    loadImage()
}

