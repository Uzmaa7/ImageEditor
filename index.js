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
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets")



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

function createFilters(){
    //return an array with all the keys in string form ['brightness' 'contrast'...........]
    Object.keys(filters).forEach(key => {

        const filterElement = createFilterElement(key , filters[key].unit, filters[key].value,  filters[key].min, filters[key].max);

        filterContainer.appendChild(filterElement);
    })
}

createFilters();

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

    filterContainer.innerHTML = "";
    createFilters();
})

downloadBtn.addEventListener("click" , () => {
    const link = document.createElement("a");
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})


const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    hueRotate: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturate: 80,
    hueRotate: 10,
    blur: 0,
    grayscale: 20,
    sepia: 40,
    opacity: 100,
    invert: 0
  },

  oldSchool: {
    brightness: 95,
    contrast: 110,
    saturate: 70,
    hueRotate: 0,
    blur: 1,
    grayscale: 40,
    sepia: 60,
    opacity: 100,
    invert: 0
  },

  dramatic: {
    brightness: 90,
    contrast: 140,
    saturate: 120,
    hueRotate: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  blackAndWhite: {
    brightness: 100,
    contrast: 120,
    saturate: 0,
    hueRotate: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  warm: {
    brightness: 105,
    contrast: 105,
    saturate: 120,
    hueRotate: 15,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0
  },

  cool: {
    brightness: 100,
    contrast: 105,
    saturate: 110,
    hueRotate: 190,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  faded: {
    brightness: 110,
    contrast: 80,
    saturate: 70,
    hueRotate: 0,
    blur: 0,
    grayscale: 10,
    sepia: 20,
    opacity: 100,
    invert: 0
  },

  dreamy: {
    brightness: 115,
    contrast: 90,
    saturate: 110,
    hueRotate: 0,
    blur: 3,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0
  }
};


Object.keys(presets).forEach(presetName => {
    const presetBtn = document.createElement("button");
    presetBtn.classList.add("btn");
    presetBtn.innerText = presetName;
    presetsContainer.appendChild(presetBtn);


    presetBtn.addEventListener("click", () => {
        const preset = presets[presetName];

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName]
        })

        applyFilters()

        filterContainer.innerHTML = ""
        createFilters()
    })
})
