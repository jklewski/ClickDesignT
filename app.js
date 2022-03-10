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
termiteButton.addEventListener('click', () => {
    if (termiteButton.checked) {
        //add polygon layer
        layersTermite_yes = L.geoJSON(spec[0].features[0], {
            style: { color: "red", weight: 1, opacity: 0.5, fillColor: "red", fillOpacity: 0.5 }
        }).addTo(map);
        layersTermite_no = L.geoJSON(spec[0].features[1], {
            style: { color: "green", weight: 1, opacity: 0.5, fillColor: "green", fillOpacity: 0.5 }
        }).addTo(map);
        //add multipoint layer (needs to be converted to layer)


    } else {
        map.removeLayer(layersTermite_yes)
        map.removeLayer(layersTermite_no)
    }
})
boringButton.addEventListener('click', () => {
    if (boringButton.checked) {
        //add polygon layer
        layersBoringYes = L.geoJSON(spec[0].features[2], {
            style: { color: "blue", weight: 1, opacity: 0.5, fillColor: "blue", fillOpacity: 0.5 }
        }).addTo(map);
    } else {
        map.removeLayer(layersBoringYes)
    }
})