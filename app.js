const popup = document.querySelector(".popup")
const main_popup = document.querySelector(".main-popup")
window.addEventListener('click', (e) => {
    if (e.target == document.querySelector('.popup-overlay')) {
        main_popup.style.cssText = 'animation: slide-out .5s ease; animation-fill-mode: forwards'
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    }
})

//function for changing the style when mouse over
function newstyle(e) {
    var targetLayer = e.target;
    targetLayer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
        opacity: 0.5,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        targetLayer.bringToFront();
    }
}
//for resetting the style when mouse leaves
function resetStyle(e) {
    countryLayers.resetStyle(e.target);
}
function clickEvent(e) {
    //check if the target has any info
    var cname = e.target.feature.properties.NAME_EN
    var labels = ['Recorded Insects',
        'Recorded Subterranean termites',
        'Recored drywood termites',
        'Insects considered by building code?',
        'Existing regulations',
        'National durability requirements',
        'Source',
        'Recommended termite preventive measure',
        'Reference standard - Durability',
        'Durability requirements (other standards)',
        'Market feedback',
        'Reference service life performance',
        'National service life recommendation',
        'EU Reference for preservatives',
        'National Reference for preservatives',
        'Quality labels',
        'Requirements regarding biocidal products',
        'Regulations for PCO',
        'Source'];

    for (let i = 0; i < cinfo.length; i++) {
        //if correct country, create a new div for adding text
        if (cname.includes(cinfo[i].NAME_EN)) {
            var divEl = document.querySelector(".popup-content")
            for (let j = 0; j < Object.keys(cinfo[0]).length - 2; j++) {
                //create one text node for each entry
                var node = document.createElement("p");
                var desc = document.createElement("p");
                node.className = "popup-txt"
                node.className = "popup-desc"
                node.innerText = String(cinfo[i]['F' + (j + 1)].replace("\n", "\n"));
                desc.innerText = String(labels[j] + "\n");
                divEl.appendChild(desc);
                divEl.appendChild(node);
                divEl.appendChild(document.createElement("br"));
            }
        }
        else {
        }
        const popup = document.querySelector(".popup")
        const main_popup = document.querySelector(".main-popup")
        popup.style.display = 'flex';
        main_popup.style.cssText = 'animation: slide-in .5s ease; animation-fill-mode: forwards'
    }
}

//set two above functions to fire on layer basis
function onEachFeature(feature, layer) {
    layer.on({
        click: clickEvent,
        mouseover: newstyle,
        mouseout: resetStyle
    });
}
var map = L.map('map').setView([55, 15], 3);
L.tileLayer.provider('Stamen.Terrain').addTo(map);
layers = []
layers_pts = []
countryLayers = L.geoJSON(countryborders, {
    style: { "color": "#ff0000", "opacity": 0.0, "fillOpacity": 0.0 },
    onEachFeature: onEachFeature,
    mouseover: newstyle
}).addTo(map);

handleForm = document.querySelector(".form")
termiteButton = handleForm[0];
boringButton = handleForm[1];
model1Button = handleForm[2];
model2Button = handleForm[3];
model3Button = handleForm[4];

layersTermite_yes = L.geoJSON(spec[0].features[6], {
    style: { color: "red", weight: 1, opacity: 0, fillColor: "red", fillOpacity: 0 }
}).addTo(map);
layersTermite_no = L.geoJSON(spec[0].features[7], {
    style: { color: "green", weight: 1, opacity: 0, fillColor: "green", fillOpacity: 0 }
}).addTo(map);

termiteButton.addEventListener('click', () => {
    if (termiteButton.checked) {
        fadeLayer([layersTermite_yes,layersTermite_no], 0, 0.5, 0.02, 10)        
    } else {
        fadeLayer([layersTermite_yes,layersTermite_no], 0.5, 0, -0.02, 10)   
    }
    })

layersBoringYes = L.geoJSON(spec[0].features[8], {
    style: { color: "blue", weight: 1, opacity: 0, fillColor: "blue", fillOpacity: 0 }
}).addTo(map);

boringButton.addEventListener('click', () => {
    if (boringButton.checked) {
        fadeLayer([layersBoringYes], 0, 0.5, 0.02, 10)        
    } else {
        fadeLayer([layersBoringYes], 0.5, 0, -0.02, 10)   
    }
    })


layersModel1_yes = L.geoJSON(spec[0].features[0], {
    style: { color: "red", weight: 1, opacity: 0, fillColor: "red", fillOpacity: 0 }
}).addTo(map);
layersModel1_no = L.geoJSON(spec[0].features[3], {
    style: { color: "green", weight: 1, opacity: 0, fillColor: "green", fillOpacity: 0 }
}).addTo(map);

model1Button.addEventListener('click', () => {
    if (model1Button.checked) {
        fadeLayer([layersModel1_no,layersModel1_yes], 0, 0.5, 0.02, 10)        
    } else {
        fadeLayer([layersModel1_no,layersModel1_yes], 0.5, 0, -0.02, 10)   
    }
    })

layersModel2_yes = L.geoJSON(spec[0].features[1], {
    style: { color: "red", weight: 1, opacity: 0, fillColor: "red", fillOpacity: 0 }
}).addTo(map)
layersModel2_no = L.geoJSON(spec[0].features[4], {
    style: { color: "green", weight: 1, opacity: 0, fillColor: "green", fillOpacity: 0 }
}).addTo(map)

model2Button.addEventListener('click', () => {
    if (model2Button.checked) {
        fadeLayer([layersModel2_no,layersModel2_yes], 0, 0.5, 0.02, 10)        
    } else {
        fadeLayer([layersModel2_no,layersModel2_yes], 0.5, 0, -0.02, 10)   
    }
    })

    layersModel3_yes = L.geoJSON(spec[0].features[2], {
        style: { color: "red", weight: 1, opacity: 0, fillColor: "red", fillOpacity: 0 }
    }).addTo(map)
    layersModel3_no = L.geoJSON(spec[0].features[5], {
        style: { color: "green", weight: 1, opacity: 0, fillColor: "green", fillOpacity: 0 }
    }).addTo(map)
    
    model3Button.addEventListener('click', () => {
        if (model3Button.checked) {
            fadeLayer([layersModel3_no,layersModel3_yes], 0, 0.5, 0.02, 10)        
        } else {
            fadeLayer([layersModel3_no,layersModel3_yes], 0.5, 0, -0.02, 10) 
        }
        })


// Fade-in a one or severl layers
function fadeLayer(lyr, startOpacity, finalOpacity, opacityStep, delay) {
    let opacity = startOpacity;
    let timer = setTimeout(function changeOpacity() {
      if (Math.abs(opacity-finalOpacity)>Math.abs(opacityStep)/2) {
        lyr.map((x) => x.setStyle({fillOpacity:opacity, opacity:opacity}))
        opacity = opacity + opacityStep
      }
      timer = setTimeout(changeOpacity, delay);
    }, delay)
}