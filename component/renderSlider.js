export default function renderSlider(tipoaAlim) {
    const section = document.createElement("section");
    section.classList.add("slider-section");

    const contenedor = document.createElement("div");
    contenedor.classList.add("slider-contenedor");

    tipoaAlim.forEach((e, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");

        const h1 =  document.createElement("h1");
        h1.innerText = e.nombre;
        slide.appendChild(h1);

        const img = document.createElement("img");
        img.src = e.link;
        img.addEventListener('dragstart', (e) => e.preventDefault())
        slide.appendChild(img);

        addMentodos(slide, index, contenedor);
  
        contenedor.appendChild(slide);
    });

    section.appendChild(contenedor);

    return section;
};

function addMentodos(slide, index, contenedor) {
    let xInicial, xDespues, diferencia, diferenciaMin = 100;

    // eventos para toutch -------------------------
    slide.addEventListener("touchstart", (e) => {
        xInicial = e.touches[0].clientX;
    });

    slide.addEventListener("touchmove", (e) => {
        xDespues = e.changedTouches[0].clientX;
        diferencia = xInicial - xDespues;
        arrastrarImg();
    });

    slide.addEventListener("touchend", (e) => {
        indexFinal = index + getDireccion();
        xInicial = 0, xDespues = 0;
        
        if (indexFinal < 0) indexFinal = 0;
        if(indexFinal > contenedor.children.length -1) indexFinal = contenedor.children.length -1;

        Math.abs(diferencia) > diferenciaMin ? moverImg() : centrarImg();
    });

    // eventos para mouse --------------------------
    slide.onmousedown = seleccionarElemento;

    function seleccionarElemento(e) {
        xInicial = e.clientX;
        e.preventDefault();
        document.onmousemove = moverElemento;
        document.onmouseup = soltarElemento;
    };

    function moverElemento(e) {
        xDespues = e.clientX;
        diferencia = xInicial - xDespues;
        arrastrarImg();
    };

    function soltarElemento(e) {
        document.onmousemove = null;
        document.onmouseup = null;
        xInicial = 0, xDespues = 0;

        indexFinal = index + getDireccion();
    
        if (indexFinal < 0) indexFinal = 0;
        if(indexFinal > contenedor.children.length -1) indexFinal = contenedor.children.length -1;
        
        Math.abs(diferencia) > diferenciaMin ? moverImg() : centrarImg();
    }

    // comportamiento ------------------------------
    function getDireccion() {
        if (diferencia > 0) return 1;
        else if (diferencia < 0) return -1;
        else return 0;
    };

    function arrastrarImg(){
        contenedor.style.transform = `translateX(${-window.innerWidth * index - diferencia}px)`
    };

    function centrarImg(){
        contenedor.style.transform = `translateX(${-window.innerWidth * index}px)`
    };
};

// cuando la ventana cambiar el tamaño centraliza la imagen seleccionada ---------------
let indexFinal = 0;

window.addEventListener("resize", (e) => {
    moverImg();
});

function moverImg() {
    const contenedor = document.querySelector(".slider-contenedor");
    if (contenedor) {
        contenedor.style.transform = `translateX(${-window.innerWidth * (indexFinal)}px)`
        console.log(indexFinal)
    };
};


