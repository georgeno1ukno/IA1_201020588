var heuristica = [[120,-20,20,5,5,20,-20,120],
[-20,-40,-5,-5,-5,-5,-40,-20],
[20,-5,15,3,3,15,-5,20],
[5,-5,3,3,3,3,-5,5],
[5,-5,3,3,3,3,-5,5],
[20,-5,15,3,3,15,-5,20],
[-20,-40,-5,-5,-5,-5,-40,-20],
[120,-20,20,5,5,20,-20,120]];

function valorMin(estado, turno, xAnt, yAnt, prof){
    var peorValor = 100000;

    var otroTurno=0;
    if(turno == 1){
        otroTurno = 0;
    }
    else{
        otroTurno = 1;
    }

    if (prof <= 0){
        return heuristica[xAnt][yAnt];
        //#*getValorEstado(estado, turno)
    }
    else{
        var posiblesMovimientos = getMovimientosValidos(estado, turno);
        posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

        for (let [d1, d2] of posiblesMovimientos) {
            //#print("Min",x,y)
            var copiaEstado = getCopiaEstado(estado);
            hacerMovimiento(copiaEstado, turno, d1, d2);
            var valor = valorMax(copiaEstado, otroTurno, d1, d2, prof-1);
            if(valor < peorValor){
                peorValor = valor;
            }
        }
        return peorValor
    }
}

function valorMax(estado, turno, xAnt, yAnt, prof){
    var mejorValor = -10000;

    if(turno == 1){
        otroTurno = 0
    }
    else{
        otroTurno = 1
    }

    if (prof <= 0){
        return heuristica[xAnt][yAnt];
        //#*getValorEstado(estado, turno)
    }
    else {
        var posiblesMovimientos = getMovimientosValidos(estado, turno);
        posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

        for (let [d1, d2] of posiblesMovimientos) {
            var copiaEstado = getCopiaEstado(estado);
            hacerMovimiento(copiaEstado, turno, d1, d2);
            var valor = valorMin(copiaEstado, otroTurno, d1, d2, prof-1);
            if(valor > mejorValor){
                mejorValor = valor
            }
        }
        return mejorValor;
    }
}

function getMovimientoMiniMax(estado, turno){

    var otroTurno=0;
    var posiblesMovimientos = getMovimientosValidos(estado, turno);
    posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

    for (let [d1, d2] of posiblesMovimientos) {
        if (esEsquina(d1,d2)){
        return String(d2)+""+String(d1)
        }
    }
            
    if(turno == 1){
        otroTurno = 0;
    }
    else{
        otroTurno = 1;
    }

    var mejorValor = -100000;
    var mejorValor2 = -1;
    var mejorMovimiento = -1;

    //print(posiblesMovimientos)

    for (let [d1, d2] of posiblesMovimientos) {
        //#print("getMovimientoMiniMax ",x,y,mejorMovimiento)
        var copiaEstado = getCopiaEstado(estado);
        hacerMovimiento(copiaEstado, turno, x, y);
        //#valor = getValorEstado(estado, turno)*heuristica[x][y]
        //#valor = heuristica[x][y]
        var valor = valorMin(copiaEstado, otroTurno, x, y, 3);
        var valor2 = getValorEstado(estado, turno);
        //#print(valor)
        if((valor > mejorValor) || (valor == mejorValor && valor2 > mejorValor2)){
            mejorMovimiento = String(y)+""+String(x);
            mejorValor = valor;
            mejorValor2 = valor2;
        }
    }

    return mejorMovimiento;
}

function getMovimiento(estado, turno) {

    var posiblesMovimientos = getMovimientosValidos(estado, turno);
    posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

    for (let [d1, d2] of posiblesMovimientos) {
        if (esEsquina(d1, d2)){
            return (String(d2) + "" + String(d1));
        }
    }

    var mejorValor = -10000
    var mejorMovimiento = -1

    for (let [d1, d2] of posiblesMovimientos) {
        var copiaEstado = getCopiaEstado(estado);
        hacerMovimiento(copiaEstado, turno, d1, d2);
        var valor = heuristica[d1][d2];
        if(valor > mejorValor){
            mejorMovimiento = String(d2)+""+String(d1);
            mejorValor = valor;
        }
    }
        
    return mejorMovimiento;
}

function esEsquina(x, y) {
    return (x == 0 && y == 0) || (x == 7 && y == 0) || (x == 0 && y == 7) || (x == 7 && y == 7);
}

function hacerMovimiento(estado, turno, xMov, yMov) {
    var movimientosVoltear = esMovimientoValido(estado, turno, xMov, yMov);

    if (movimientosVoltear == false) {
        return false;
    }
    estado[xMov][yMov] = turno;
    for (let [d1, d2] of movimientosVoltear) {
        estado[d1][d2] = turno;
    }
    return true;
}


function getCopiaEstado(estado) {
    var copiaEstado = getNuevoEstado();

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            copiaEstado[x][y] = estado[x][y];
        }
    }
    return copiaEstado;
}


function getValorEstado(estado, turno) {
    var valor = 0;

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            if (estado[x][y] == turno) {
                valor += 1;
            }
        }
    }
    return valor;
}

function getMovimientosValidos(estado, turno) {
    var movimientos = [];

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            if (esMovimientoValido(estado, turno, x, y) != false) {
                movimientos.push([x, y]);
            }
        }
    }
    return movimientos;

}



function esMovimientoValido(estado, turno, xMov, yMov) {
    var otroTurno=0;
    if (estado[xMov][yMov] != 2 || !estaEnTablero(xMov, yMov)) {
        return false;
    }

    estado[xMov][yMov] = turno;

    if (turno == 1) {
        otroTurno = 0;
    }
    else {
        otroTurno = 1;
    }

    var movimientosVoltear = []

    var nuevin = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

    for (var iti = 0; iti < 8; iti++) {
        //console.log("varx", nuevin[iti][0], "vary", nuevin[iti][1])
        var xdir = nuevin[iti][0];
        var ydir = nuevin[iti][1];
        var x = xMov;
        var y = yMov;

        x += xdir;
        y += ydir;

        if (estaEnTablero(x, y) && (estado[x][y] == otroTurno)) {
            x += xdir;
            y += ydir;

            if (!estaEnTablero(x, y)) {
                continue;
            }
            while (estado[x][y] == otroTurno) {
                x += xdir;
                y += ydir;
                if (!estaEnTablero(x, y)) {
                    break;
                }


            }
            if (!estaEnTablero(x, y)) {
                continue;
            }
            if (estado[x][y] == turno) {
                while (true) {
                    x -= xdir;
                    y -= ydir;
                    if ((x == xMov) && (y == yMov)) {
                        break;
                    }
                    movimientosVoltear.push([x, y]);

                }


            }




        }

    }
    estado[xMov][yMov] = 2;
    if (movimientosVoltear.length == 0) {
        return false
    }
    return movimientosVoltear;
}

function estaEnTablero(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7
}

function getEstado(estado) {
    var aarray = [];
    for (var i = 0; i < estado.length; i++) {
        aarray.push(Number(estado.charAt(i)));
    }
    var nuevoestado = [];
    nuevoestado = getNuevoEstado();
    var x = 0;
    var y = 0;
    for (var j in aarray) {
        nuevoestado[x][y] = aarray[j];
        x += 1;
        if (x == 8) {
            x = 0;
            y += 1;
        }
    }
    return nuevoestado;
}


function getNuevoEstado() {
    var estado = [];

    for (var xi = 0; xi < 8; xi++) {

        estado.push([2, 2, 2, 2, 2, 2, 2, 2]);
    }

    //getEstado("2222222222222222222222222222221022222201222222222222222222222222222222");
    return estado;


}
/*
function pruebas() {
    var nuevin = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
    for (let [d1, d2] of nuevin) {
        console.log("x", d1); //Should return numbers from 1 to 9
        console.log("y", d2);
    }
    return "end";
}
*/
exports.principal = function inicio(estado, turno){
    //var turno = 1;
            //var estado = "2222222222222222222222222221022222201222222222222222222222222222";
            //#print(estado)
            var destado = getEstado(estado)
            //#dibujarEstado(estado)
            //#print(getMovimientosValidos(estado, turno))
            //#respuesta = getMovimientoMiniMax(estado, turno)
            var respuesta = getMovimiento(destado, turno)
            //#print(respuesta)
            //#respuesta = '00'
            
            return respuesta
}
/* 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
} */
/* 
var turnoac = getParameterByName('turno');
var estadoac = getParameterByName('estado');

console.log(turnoac);
console.log(estadoac); */
/* 
//var matriz = Array.from(estadoac).map(Number);

document.getElementById("algoritmo").textContent=String(principal(estadoac,turnoac)).trim();
//console.log("Haber si funciona: ------******",principal()); */
