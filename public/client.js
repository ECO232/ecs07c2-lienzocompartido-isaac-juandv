const socket = io();

let size = 20;
let r = 0;
let g = 0;
let b = 0;
let identificador = 0;

let elementos = [];
let cursores = [];

function setup(){
    createCanvas(400, 400);
    r = int(Math.random ()*255);
    g = int(Math.random ()*255);
    b = int(Math.random()*255);
    identificador = int(random()*1000);
    console.log("identificador: ", identificador)
    changeColor()
}

function draw() {
    background(220);

    elementos.forEach((element) => {
        fill(element.r, element.g, element.b);
        ellipse(element.x, element.y, element.size, element.size)
    });

    cursores.forEach((cursor) => {
        fill(0, 0, 0);
        ellipse(cursor.x, cursor.y, cursor.size, cursor.size)
    });
}



// ///////
// function width() {
//     sizeSlider = document.getElementById('size');
//     sizeSlider.addEventListener('input', updateSize);
//     size = parseInt(sizeSlider.value);
//     socket.emit ('cambiar-tamaño', elemento);
//   }



function changeColor() {
    const colorPicker = document.getElementById("colorPicker");
    const colorValue = document.getElementById('colorValue');

    
    colorPicker.addEventListener("change", (event) => {
        colorValue.textContent = event.target.value;
        const color = event.target.value;
        const colorRGB = hexToRgb(color);
        
        r=colorRGB.r
        g=colorRGB.g
        b=colorRGB.b

        const elemento = {
            x: mouseX,
            y: mouseY,
            r: r,
            g: g,
            b: b,
            size
            };
        
        socket.emit("cambiar-color", elemento);
    });
        
}


function hexToRgb(hex) {

    hex = hex.replace(/^#/, '');

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

function mousePressed(){
    const elemento = {
    x: mouseX,
    y: mouseY,
    r: r,
    g: g,
    b: b,
    size
    };

    socket.emit ('enviar-elemento', elemento);
}


function mouseDragged(){
    const elemento = {
    x: mouseX,
    y: mouseY,
    r: r,
    g: g,
    b: b,
    size,
    id: identificador
    };

    socket.emit ('enviar-cursor', elemento);

    console.log("enviando")
}


socket.on('elemento-recibido', (elemento) => {

    console. log ("recibiendo-elemento:", elemento)
    elementos.push (elemento)
});


socket.on('cursor-recibido', (elemento) => {

    console.log("recibiendo-cursor:", elemento)

    let cursorIndex = cursores.findIndex((item) => elemento.id == item.id)

    if(cursorIndex!=-1){
    cursores[cursorIndex] = elemento;
    }

    else {
    cursores.push(elemento)
    }
});

socket.on('color-recibido', (elemento) => {

    console. log ("recibiendo-color:", elemento)
    elementos.push (elemento)
});
