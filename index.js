let filters = {
    brightness : {
        value : 100,
        min : 0,
        max : 200,
        unit: "%"
    },
    contrast : {
        value : 100,
        min : 0,
        max : 200,
        unit: "%"
    },
    saturate : {
        value : 100,
        min : 0,
        max : 200,
        unit: "%"
    },
    hueRotate  : {
        value : 0,
        min : 0,
        max : 300,
        unit: "deg"
    },
    blur : {
        value : 0,
        min : 0,
        max : 20,
        unit: "px"

    },
    grayscale :{
        value : 0,
        min : 0,
        max : 100,
        unit: "%"
    },
    sepia : {
        value : 0,
        min : 0,
        max : 100,
        unit: "%"
    },
    opacity : {
        value : 100,
        min : 0,
        max : 100,
        unit: "%"
    },
    invert : {
        value : 0,
        min : 0,
        max : 100,
        unit: "%"
    }
}

const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let image = null;
const resetBtn = document.querySelector("#reset-btn");

const filterContainer = document.querySelector(".filters");

function createFilterElement(name , unit = "%", value , min , max){

    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filters[name].value = input.value
        applyFilters()

    })

    return div;
}


//return an array with all the keys in string form ['brightness' 'contrast'...........]
Object.keys(filters).forEach(key => {

    const filterElement = createFilterElement(key , filters[key].unit, filters[key].value,  filters[key].min, filters[key].max);

    filterContainer.appendChild(filterElement);
})


imageInput.addEventListener("change", (event) => {

    file = event.target.files[0];

    const imagePlaceholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    imagePlaceholder.style.display = "none";
    
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img,0,0)
    }

})


function applyFilters(){
    canvasCtx.clearRect(0, 0, imageCanvas.width , imageCanvas.height)

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturate.value}${filters.saturate.unit})
    hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim()

    canvasCtx.drawImage(image , 0, 0)
}


 
resetBtn.addEventListener("click", () => {
        filters = {
        brightness : {
            value : 100,
            min : 0,
            max : 200,
            unit: "%"
        },
        contrast : {
            value : 100,
            min : 0,
            max : 200,
            unit: "%"
        },
        saturate : {
            value : 100,
            min : 0,
            max : 200,
            unit: "%"
        },
        hueRotate  : {
            value : 0,
            min : 0,
            max : 300,
            unit: "deg"
        },
        blur : {
            value : 0,
            min : 0,
            max : 20,
            unit: "px"

        },
        grayscale :{
            value : 0,
            min : 0,
            max : 100,
            unit: "%"
        },
        sepia : {
            value : 0,
            min : 0,
            max : 100,
            unit: "%"
        },
        opacity : {
            value : 100,
            min : 0,
            max : 100,
            unit: "%"
        },
        invert : {
            value : 0,
            min : 0,
            max : 100,
            unit: "%"
        }
    }
    applyFilters();
})

