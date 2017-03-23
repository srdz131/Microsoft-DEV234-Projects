var select1 = document.getElementById("select1");
var select2 = document.getElementById("select2");
var name1 = document.getElementById("name1");
var name2 = document.getElementById("name2");
var cost1 = document.getElementById("cost1");
var cost2 = document.getElementById("cost2");
var speed1 = document.getElementById("speed1");
var speed2 = document.getElementById("speed2");
var cargo1 = document.getElementById("cargo1");
var cargo2 = document.getElementById("cargo2");
var passengers1 = document.getElementById("passengers1");
var passengers2 = document.getElementById("passengers2");
var pic = document.getElementById("pic");
//listeners for change
var sel = select1;
sel.addEventListener('change', function() {

    //restart red tiles
    name1.style.color = "yellow";
    cost1.style.background = "white";
    speed1.style.background = "white";
    cargo1.style.background = "white";
    passengers1.style.background = "white";
    return sel = select1.value;
});

var sel2 = select2;
sel2.addEventListener('change', function() {

    //restart red tiles
    name2.style.color = "yellow"
    cost2.style.background = "white";
    speed2.style.background = "white";
    cargo2.style.background = "white";
    passengers2.style.background = "white"
    return sel2 = select2.value;
});
//////////////////////////




function run(genFunc) {
    const genObj = genFunc();

    function iterate(iteration) {
        if (iteration.done) {
            return Promise.resolve(iteration.value);
        }
        return Promise.resolve(iteration.value)
            .then(function(x) {
                iterate(genObj.next(x));
            }).catch(function(x) {
                iterate(genObj.throw(x));
            })
    }
    try {
        return iterate(genObj.next());
    } catch (ex) {
        return Promise.reject(ex);
    }
};
//////////GENERATOR
function* gen() {
    var shipRequest = yield fetch("http://swapi.co/api/starships/" + sel + '/'); //fetch 1st req
    var ship = yield shipRequest.json();


    //render data
    name1.innerHTML = ship.name;
    cost1.innerHTML = ship.cost_in_credits;
    speed1.innerHTML = ship.max_atmosphering_speed;
    cargo1.innerHTML = ship.cargo_capacity;
    passengers1.innerHTML = ship.passengers;




    var shipRequest2 = yield fetch("http://swapi.co/api/starships/" + sel2 + '/'); //fetch 2nd req
    var ship2 = yield shipRequest2.json();

    //render data
    name2.innerHTML = ship2.name;
    cost2.innerHTML = ship2.cost_in_credits;
    speed2.innerHTML = ship2.max_atmosphering_speed;
    cargo2.innerHTML = ship2.cargo_capacity;
    passengers2.innerHTML = ship2.passengers;


    //checks for difference between values if value1 higher than value2, background color=red
    if (parseInt(ship.cost_in_credits) > parseInt(ship2.cost_in_credits)) {
        cost1.style.background = "red";
    } else if (parseInt(ship2.cost_in_credits) > parseInt(ship.cost_in_credits)) {
        cost2.style.background = "red";
    } else if (parseInt(ship.cost_in_credits) == parseInt(ship2.cost_in_credits)) {
        console.log('same');
    }

    if (parseInt(ship.max_atmosphering_speed) > parseInt(ship2.max_atmosphering_speed)) {
        speed1.style.background = "red";
    } else if (parseInt(ship2.max_atmosphering_speed) > parseInt(ship.max_atmosphering_speed)) {
        speed2.style.background = "red";
    } else if (parseInt(ship.max_atmosphering_speed) == parseInt(ship2.max_atmosphering_speed)) {
        console.log('same');
    }

    if (parseInt(ship.cargo_capacity) > parseInt(ship2.cargo_capacity)) {
        cargo1.style.background = "red";
    } else if (parseInt(ship2.cargo_capacity) > parseInt(ship.cargo_capacity)) {
        cargo2.style.background = "red";
    } else if (parseInt(ship.cargo_capacity) == parseInt(ship2.cargo_capacity)) {
        console.log('same capacity');
    }

    if (parseInt(ship.passengers) > parseInt(ship2.passengers)) {
        passengers1.style.background = "red";
    } else if (parseInt(ship2.passengers) > parseInt(ship.passengers)) {
        passengers2.style.background = "red";
    } else if (parseInt(ship.passengers) == parseInt(ship2.passengers)) {
        console.log('equal passengers');
    }


}


document.getElementById("button").addEventListener('click', function() {
    run(gen).catch(function(err) {
        alert(err.message);
    });
})
