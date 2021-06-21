// MIT License
// Copyright (c) 2020 Luis Espino
/*
This code is based of the code in the Github repository of MSC. Luis Espino.
Professor of the University "San Carlos de Guatemala"

*/
var stados=[];
var visitados=0;


var timeout;

function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}

function test(states) {
	var location = states[0];
	var state = states[0] == "A" ? states[1] : states[2];
	validateVisitedStates(states);
	var action_result = reflex_agent(location, state);
	
	document.getElementById("log").innerHTML += "<br>Actual: ".concat(states[0]).concat(",  Espacio A: ").concat(states[1]).concat(",   Espacio B: ").concat(states[2]).concat("    | Action: ").concat(action_result).concat(" ") ;
	
	if (action_result == "CLEAN") {
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") states[2] = "CLEAN";

	}
	else if (action_result == "RIGHT"){ 
		states[0] = "B";
		var r = getRandomInt(0,10);
		r>=5? states[1]="DIRTY": states[1]="CLEAN"
		r = getRandomInt(0,10);
		r<5? states[2]="DIRTY": states[2]="CLEAN"
	}
	else if (action_result == "LEFT"){
		states[0] = "A";
		var r = getRandomInt(0,10);
		r>=5? states[1]="DIRTY": states[1]="CLEAN"
		r = getRandomInt(0,10);
		r<5? states[2]="DIRTY": states[2]="CLEAN"
	}
	printStates();
	if(stados.length>=8){
		clearTimeout(timeout)
		return;
	}
	timeout = setTimeout(function () { test(states); }, 2000);
}

function printStates() {
	document.getElementById("count").innerHTML = "Visitados: ".concat(visitados)
	document.getElementById("states").innerHTML = "<thead><tr><th>Location</th><th>Espacio A</th><th>Espacio B</th></tr></thead>";
	for (var i = 0; i < stados.length; i++) {
		document.getElementById("states").innerHTML += "<tr><td>" + stados[i].Location + "</td><td>" + stados[i].RoomA + "</td><td>" + stados[i].RoomB + "</td></td>";
	}
}

function validateVisitedStates(states) {

    console.log(stados.length)
    if(stados.length===0){
        stados.push({Location:states[0],RoomA:states[1],RoomB:states[2]});
            visitados++;


    }
    if(stados.length>0){
        var xx=false;
        for(var x=0; x<stados.length;x++){
            if((stados[x].Location===states[0] && stados[x].RoomA===states[1] && stados[x].RoomB===states[2])){
                xx=true;
                
    
            }
    
        }
        if(!xx){
            stados.push({Location:states[0],RoomA:states[1],RoomB:states[2]});
                visitados++;
        }

    }
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);