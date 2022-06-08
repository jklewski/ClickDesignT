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


speciesName = [];
familyName = [];
nlayers = spec[0].features.length
for (let i = 0; i < nlayers; i++) {
    speciesName[i] = spec[0].features[i].properties.Name
    familyName[i] = spec[0].features[i].properties.Family
}

var unique = familyName.filter(function(itm, i, a) {
    return i == familyName.indexOf(itm);
});

for (var i in unique) {
    family = unique[i]
    div = document.createElement("div")
    div.id = family.replace(' ','_')
    btn = document.createElement("input")
    btn.type = "checkbox"
    btn.id = family.replace(' ','_')+"-b"
    btn.value = family.replace(' ','_');
    btn.className = 'familyButtons'
    //btn.onclick = function () { toggleLayer(this.id) }
    p = document.createElement("span");
    p.innerHTML = family + " <i class=icon-collapse id='"+family+"-c'></i> ";
    br = document.createElement("br");
    div.appendChild(btn)
    div.appendChild(p)
    div.appendChild(br)
    //create sublist of species
    sub_div = document.createElement("div")
    sub_div.className = 'speciesButtonGroups'
    sub_div.id = family.replace(' ','_') + 'species'
    for (var j in familyName) {
        if (familyName[j] == unique[i]) {
            btn_sub = document.createElement("input")
            btn_sub.type = "checkbox"
            btn_sub.id = speciesName[j].replace(' ','_')
            btn_sub.className = family.replace(' ','_')+"speciesButtons"
            // Event Listener:
            btn_sub.addEventListener('change', function(event) {
                toggleLayer(this)
            });
            p_sub = document.createElement("span");
            p_sub.innerHTML = speciesName[j]
            sub_div.appendChild(btn_sub)
            sub_div.appendChild(p_sub)
            br = document.createElement("br");
            sub_div.appendChild(br)
            sub_div.style.display = 'none'
        } 
    }
    div.appendChild(sub_div)
    document.getElementById("buttons").appendChild(div)
    document.getElementById(family+"-c").onclick = function() {
    family=(this.id.slice(0,this.id.length-2))
    sub_div = document.getElementById(family.replace(' ','_')+'species')
    if (sub_div.style.display=='none') {sub_div.style.display=''}
    else {sub_div.style.display='none'}
    }
}

var familyButtons = document.querySelectorAll(".familyButtons")
for (let i=0;i<familyButtons.length;i++) {
    btn = familyButtons[i]
    btn.onclick = function(){
            speciesButtons = document.querySelectorAll("." + this.id.slice(0,this.id.length-2) + "speciesButtons")
            for (let j = 0; j<speciesButtons.length; j++) {
                speciesButtons[j].checked = !speciesButtons[j].checked;
                triggerEvent(speciesButtons[j], 'change');
            }
    }
}



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
    infoModal = document.querySelector('#myModal')


    //check if the target has any info
    var cname = e.target.feature.properties.NAME_EN
    var labels = [
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

    listNames = cinfo.map((x)=> x.NAME_EN)
    id = listNames.findIndex( (x) => x==cname)

    for (let i = 1; i < 7; i++) {  
                var textDiv = document.getElementById("text" + i)
                var headP = document.getElementById("head" + i)
                var node = document.createElement('p')
                node.innerText = String(cinfo[id]['F' + (i+4)].replace("\n", "\n"));
                headP.innerText = String(labels[i])
                textDiv.appendChild(node);
                textDiv.appendChild(document.createElement("br"));
            }

        $('#myModal').modal('show');
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
L.tileLayer.provider('Stamen.TonerLite').addTo(map);
layers = []
layers_pts = []
countryLayers = L.geoJSON(countryborders, {
    style: { "color": "#ff0000", "opacity": 0.0, "fillOpacity": 0.0 },
    onEachFeature: onEachFeature,
    mouseover: newstyle
}).addTo(map);



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

function toggleLayer(btn) {
    species = btn.id.replace('_',' ')
    id = speciesName.findIndex((x)=> x==species)
    id_family = unique.findIndex((x) => x==spec[0].features[id].properties.Family)
    if (btn.checked) {
    layers[id] = L.geoJSON(spec[0].features[id], {
        style: { color: "red", weight: 1, opacity: 0.5, fillColor: selectColor(id_family), fillOpacity: 0.35 }
    }).addTo(map);
    } else {
        map.removeLayer(layers[id])
    }
    countryLayers.bringToFront()
}

//function to trigger event when checkboxes are checked from JS
function triggerEvent(element, eventName) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, false, true);
    element.dispatchEvent(event);
  }

  //select number of colors
  function selectColor(number) {
    const hue = number * 137.508; // use golden angle approximation
    return `hsl(${hue},50%,75%)`;
  }




modelLayers = []
modelButtons = document.querySelectorAll(".model")

for (let i=0;i<modelButtons.length;i++) {
    modelButton = modelButtons[i]
    modelButton.onclick = function() {
        console.log(this.id)
        modelId = this.id[this.id.length-1]

        if (this.checked) {  
          modelLayers[modelId] = L.geoJSON(modelPolygons[0].features[modelId], {
                style: { color: "red", weight: 1, opacity: 0, fillColor: "red", fillOpacity: 0.5 }
          }).addTo(map);        
        } else {
            map.removeLayer(modelLayers[modelId])
        }
        }
}




