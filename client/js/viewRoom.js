
var old_min =  0.;
var old_max =  559;

if (worldToRender.roomSize=="Medium")
{
var roomScale = 1;
}
else if (worldToRender.roomSize=="Small")
{
var roomScale = 0.5;
}
else
{
var roomScale  = 1.5;
}



var mainRoomSize = 190*roomScale; //Controls the main room Size

function changeVal(roomSize, old_value){

if (roomSize=="Small")
{
var new_min =  -40;
var new_max =  40;
}
else if (roomSize=="Medium")
{
var new_min =  -180;
var new_max =  180;
}
else{
var new_min =  -400;
var new_max =  400;
}

return (((old_value - old_min) / (old_max - old_min) ) * (new_max - new_min) + new_min);

}

function getRandomArbitrary(roomSize) {

if (roomSize=="Small")
{
var min =  0;
var max =  45;
}
else if (roomSize=="Medium")
{
var min=  0;
var max =  190;
}
else{
var min=  0;
var max =  410;
}
 return Math.random() * (max - min) + min;
}

 function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 