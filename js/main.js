/*var aux = document.getElementsByClassName("coord")[0];
var alt = aux.offsetHeight;
*/

ej1=document.getElementById("lienzo1");
lienzo1=ej1.getContext("2d"); //Alisto el canvas para que funcione
var vectorDistancia = [];
var range = document.getElementById("range");
var spanText = document.getElementsByClassName("rango");

var rango = function rango(){
    return{
        valueRange: range.value,
    };
}

var canvasPaint = function canvasPaint(distancia,numero){
    let auxBand = true;
    vectorDistancia.push(distancia);
    lienzo1.clearRect(0,0,600,300);
    let posicionNew = rango();

    //horizontal
    for (let i = 1; i < 60; i++) {
        lienzo1.beginPath();
        lienzo1.moveTo(10*i,0);
        lienzo1.lineTo(10*i,600);
        lienzo1.lineWidth = 1;
        lienzo1.strokeStyle = "white";
        lienzo1.stroke();
        lienzo1.closePath();
    }
    //vertical
    for (let j = 1; j < 60; j++) {
        lienzo1.beginPath();
        lienzo1.moveTo(0,10*j);
        lienzo1.lineTo(600,10*j);
        lienzo1.lineWidth = 1;
        lienzo1.strokeStyle = "white";
        lienzo1.stroke();
        lienzo1.closePath();
    }
        //EJEX
        lienzo1.beginPath(); // Pongo el lápiz
        lienzo1.moveTo(300,0); // lo ubicó para iniciar el dibujo
        lienzo1.lineTo(300,300); // trazo la linea hasta este punto
        lienzo1.strokeStyle = "black"; // pintar trazo
        lienzo1.stroke(); // levanto el lápiz
        lienzo1.closePath(); // me alisto para realizar otra parte del dibujo

        //EJE Y
        lienzo1.beginPath(); // Pongo el lápiz
        lienzo1.moveTo(0,150);// lo ubicó para iniciar el dibujo
        lienzo1.lineTo(600,150);// trazo la linea hasta este punto
        lienzo1.strokeStyle = "black"; // pintar trazo
        lienzo1.stroke();// levanto el lápiz
        lienzo1.closePath();// me alisto para realizar otra parte del dibujo

        //arco
        lienzo1.beginPath();
        lienzo1.arc(300,150,140,2*Math.PI,0);
        lienzo1.lineWidth = 3;
        lienzo1.fillStyle = "rgba(0,0,0,0)";
        lienzo1.fill();
        lienzo1.stroke();
        lienzo1.closePath();


    for (let i = 0; i < vectorDistancia.length; i++) {
        lienzo1.beginPath();
        lienzo1.arc(300,150,vectorDistancia[i],0,2*Math.PI,0);
        lienzo1.lineWidth = 3;
        if(vectorDistancia[i]>=140 && vectorDistancia[i]<141){
            lienzo1.strokeStyle = "black";
        }else{
            lienzo1.strokeStyle = "crimson";
        }
        lienzo1.stroke();
        lienzo1.closePath();
    }

    for (let i = 0; i < spanText.length; i++) {
        spanText[i].textContent = posicionNew.valueRange;  
    }
}

var Canvas = function Canvas(){        
    let mousePos,distancia;
    let numero;
    let max=255;
    let min=0;

    ej1.addEventListener('mousemove', function(evt){
        mousePos = getMousePos(ej1, evt);
        distancia=Math.sqrt(Math.pow((0-mousePos.x),2)+Math.pow((0-mousePos.y),2));

            canvasPaint();
            lienzo1.beginPath();
            if(mousePos.x>=0 && mousePos.y>=0){
                lienzo1.arc(300,150,distancia,0,2*Math.PI,0); // Primer Cuadrante
            }else if(mousePos.x<0 && mousePos.y>0){
                lienzo1.arc(300,150,distancia,0,2*Math.PI,0); // Segundo Cuadrante
            }else if(mousePos.x<0 && mousePos.y<0){
                lienzo1.arc(300,150,distancia,0,2*Math.PI,0); // Tercer Cuadrante
            }else if(mousePos.x>0 && mousePos.y<0){
                lienzo1.arc(300,150,distancia,0,2*Math.PI,0); //Cuarto Cuadrante
            }
            lienzo1.lineWidth = 1;
            lienzo1.strokeStyle="rgba(0,0,255,1)";
            lienzo1.fillStyle="rgba(0,0,0,0)";
            lienzo1.fill();
            lienzo1.stroke();
            lienzo1.closePath();
            
            containerX.textContent = mousePos.x/10;
            containerY.textContent = mousePos.y/10;
    });

    ej1.addEventListener('click',function(evt){

        mousePos = getMousePos(ej1, evt);
        distancia=Math.sqrt(Math.pow((0-mousePos.x),2)+Math.pow((0-mousePos.y),2));

        voltimetro(mousePos.x/10,mousePos.y/10);

            if(mousePos.x<300 && mousePos.y<150){
                numero = Math.floor(Math.random()*(max-min)+min);
                canvasPaint(distancia,numero);
            }else{
                numero = Math.floor(Math.random()*(max-min)+min);
                canvasPaint(distancia,numero);
            }

            if(band){
                containerx.textContent = mousePos.x/10;
                containery.textContent = mousePos.y/10;
            }
    })
}

function centrarCanvas(){
    let medicion = document.getElementsByClassName("container")[0];
    let altura = medicion.offsetHeight;
    let ancho = medicion.offsetWidth;
    let paddingaltura = (altura-600)/2;
    let marginWidth = (ancho-600)/2;

    medicion.style.paddingTop = paddingaltura+"px";
    medicion.style.paddingBottom = paddingaltura+"px";

    return{
        canvasCoordY: paddingaltura,
        canvasCoordX: marginWidth
    };
}

var containerX = document.getElementById("posX");
var containerY = document.getElementById("posY");
var containerx = document.getElementById("posx");
var containery = document.getElementById("posy");
var medicionVolt = document.getElementById("volt");
var band = false;
var bandAux = true;



range.addEventListener("change",function(){
    let posicionNew = rango();
    //let spanText = document.getElementsByClassName("rango");
    range.value = posicionNew.valueRange;
    for (let i = 0; i < spanText.length; i++) {
        spanText[i].textContent = posicionNew.valueRange;  
    }
    for (let i = 0; i < vectorDistancia.length; i++) {
        vectorDistancia[i]=0;
    }
    canvasPaint();
})



var voltimetro = function voltimetro(posX,posY){
    let rangoFinal = rango();
    //alert(rangoFinal.valueRange);
    let posicionX = posX;
    let posicionY = posY;
    
    let distancia;
    let distanciaAux = 0;
    let distanciaAuxF = 0;
    let distanciaF = 0;

    distancia=Math.sqrt(Math.pow((0-posicionX),2)+Math.pow((0-posicionY),2))
    //alert(distancia);
    if(distancia>=14){
        medicionVolt.textContent = 0;
    }else if(distancia<14){
        //alert(distancia);
        distanciaAux = rangoFinal.valueRange/14;
        //console.log("DistanciaAux: "+distanciaAux);
        distanciaAuxF = distancia*distanciaAux;
        //console.log("Distancia: "+distancia);
        distanciaF = (rangoFinal.valueRange-distanciaAuxF).toFixed(3);
        //console.log("DistanciaF: "+distanciaF);
        medicionVolt.textContent = distanciaF+" volt";
    }
}

function getMousePos(canvas, evt) {
    let coordCanvas = centrarCanvas();
    let idLienzo = document.getElementById("lienzo1");
    let altura = idLienzo.offsetWidth;

    const x = (coordCanvas.canvasCoordX+0.5);
    const y = (coordCanvas.canvasCoordY);
    //alert(altura);
    return {
        x: evt.clientX-(300+x),
        y: ((evt.clientY-(300+y))*-1)
    };
}

/**
 * Toma de Datos
 * */ 

function selecionarVolt(){
    let btnvolt = document.getElementById("btnVolt");
    let selectVolt = document.getElementById("voltaje");


    btnvolt.addEventListener("click",function(){
       let containerVisible = document.getElementsByClassName("containerVisible")[0];
       containerVisible.style.display = "block";
       selectVolt.setAttribute("disabled","");
       btnvolt.setAttribute("disabled","");
       band = true;
       let valor = selectVolt.value;
            if(band){ 
                verificarCoord(valor);
            }
       //alert(valor);
    })

    function verificarCoord(valor){
        let btnVericar = document.getElementById("btn");
        let mensajeVerificado = document.getElementById("guardado");
        let i = 0;
        let lista_li = document.getElementsByClassName("lista__li")[i];
     

        btnVericar.addEventListener("click",function(){
            let valorX;
            let valorY;
            let auxVolt = parseFloat(medicionVolt.textContent);
            valor = parseFloat(valor);
            console.log(auxVolt);
            console.log(valor);
                if(auxVolt>=valor && auxVolt<valor+1){
                    valorX = containerx.textContent;
                    valorY = containery.textContent;
                    mensajeVerificado.textContent = "Valor Guardado";
                    mensajeVerificado.style.backgroundColor = "#4CAF50";
                    mensajeVerificado.style.color = "white";
                        
                    if(bandAux){
                        lista_li = document.getElementsByClassName("lista__li")[i];
                        i++;
                        lista_li.style.backgroundColor = "#4CAF50";
                            if(i==7) {i=0; bandAux=false};
                    }else{
                        mensajeVerificado.style.display="none";
                    }
                }else{
                    valorX = containerx.textContent;
                    valorY = containery.textContent;
                    mensajeVerificado.textContent = "Valor Erroneo";
                    mensajeVerificado.style.backgroundColor = "#F2DEDE";
                    mensajeVerificado.style.color = "red";

                        if(bandAux){
                            lista_li = document.getElementsByClassName("lista__li")[i];
                            lista_li.style.backgroundColor = "red";
                        }else{
                            mensajeVerificado.style.display="none";
                        }
                }
        })
    }

}
canvasPaint();
Canvas();
selecionarVolt();