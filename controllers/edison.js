var mraa = require('mraa');

/* selects it for digital output*/

var kitchen_lights = new mraa.Gpio(9)
kitchen_lights.dir(mraa.DIR_OUT);
var ls_lights = new mraa.Gpio(10)
ls_lights.dir(mraa.DIR_OUT);
var mb_lights = new mraa.Gpio(11)
mb_lights.dir(mraa.DIR_OUT);
var kitchen_burner = new mraa.Gpio(12)
kitchen_burner.dir(mraa.DIR_OUT);
var mb_pc = new mraa.Gpio(13)
mb_pc.dir(mraa.DIR_OUT);
var mb_tv = new mraa.Gpio(14)
mb_tv.dir(mraa.DIR_OUT);





function kitchen_lights_control(action){
    if(action){
        kitchen_lights.write(1);
    }

    else kitchen_lights.write(0);
}


function kitchen_burner_control(action){
    if(action){
        kitchen_burner.write(1);
    }

    else kitchen_burner.write(0);
}


function ls_lights_control(action){
    if(action){
        ls_lights.write(1);
    }

    else ls_lights.write(0);
}


function mb_lights_control(action){
    if(action){
        mb_lights.write(1);
    }

    else mb_lights.write(0);
}

function mb_pc_control (action){
    if(action){
        mb_pc.write(1);
    }

    else mb_pc.write(0);
}


function mb_tv_control(action) {
    if(action){
        mb_tv.write(1);
    }

    else mb_tv.write(0);
}

/* Starting Analog Values */
var analogPin0 = new mraa.Aio(0);

/* Servo Control */
var pwmPin = new mraa.Pwm(6);
pwmPin.period_ms(20);
pwmPin.pulsewidth_ms(10);
pwmPin.pulsewidth_us(1500); 
pwmPin.enable(true);  


/* Main Gate  */

var main_gate = new mraa.Pwm(6);
main_gate.period_ms(20);
main_gate.pulsewidth_ms(10);
main_gate.pulsewidth_us(1300);
main_gate.enable(true);


/* Main Gate Control */

function main_gate_control (action) {
    if(action){
        main_gate.pulsewidth_us(2500);
    }

    else {main_gate.pulsewidth_us(500);}

    main_gate.enable(true);
}

/* Living Space Door */
var ls_door  = new mraa.Pwm(3);
ls_door.period_ms(20);
ls_door.pulsewidth_ms(10);


/* Living Space Door Control */
function ls_door_control (action){
    if(action){
        ls_door.pulsewidth_us(2500);
    }

    else {ls_door.pulsewidth_us(500);}

  ls_door.enable(true);
}

module.exports = {
   ls_lights_control:ls_lights_control,
   ls_door_control:ls_door_control,
   kitchen_lights_control:kitchen_lights_control,
   kitchen_burner_control:kitchen_burner_control,
   mb_lights_control:mb_lights_control,
   mb_pc_control:mb_pc_control,
   mb_tv_control:mb_tv_control,
   main_gate_control:main_gate_control,
   
};
