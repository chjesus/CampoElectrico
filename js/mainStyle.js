
    let centrar = ()=>{
        let container = document.getElementById("container__particles");
        let footer = document.getElementsByClassName("footer")[0];
        let tam = container.offsetHeight;
        let tamVentana = window.innerHeight;
    
        let padd = ((tamVentana-39) - tam)/2;
    
        if(padd>0){
            container.style.paddingTop = (padd)+"px";
            container.style.paddingTop = (padd)+"px";
        }
    }

 centrar()
