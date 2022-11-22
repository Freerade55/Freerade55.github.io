

const select = document.getElementById('select')
const coordsAll = []
let checkName = ''
const dataZayavki = document.getElementById('dataZayavki')
const dateToday = new Date()
dataZayavki.value = dateToday.toLocaleDateString()


const inputs = document.querySelectorAll('input')


const arr_inputs = []
inputs.forEach(x=>{
    
    if(x.id !== 'dataZayavki'){
        arr_inputs.push(x)

    }
})
const edit = document.querySelector('#edit')
const add = document.querySelectorAll('#add')


const option = document.querySelectorAll('option')
const button = document.querySelectorAll('#otpravka')


edit.addEventListener( "click", event => {
    const trs = document.querySelectorAll('tr')

    trs.forEach(x=>{

        if (x.style.backgroundColor === 'orange') {
           
        
           for(const td in x.children) {
            if(td === '1') {
                continue
            }else if(td === '3') {
                
                option[0].innerHTML = x.children[td].innerHTML
            }
            
            else if(td === '0'){
                arr_inputs[0].value = x.children[td].innerHTML

            }
            else if(td === '2') {
                arr_inputs[1].value = x.children[td].innerHTML
            }
            else if(td === '4') {
                arr_inputs[2].value = x.children[td].innerHTML
            }
            else if(td === '5') {
                arr_inputs[3].value = x.children[td].innerHTML
            }
            else if(td === '6') {
                arr_inputs[4].value = x.children[td].innerHTML
            }
            else if(td === '7') {
                arr_inputs[5].value = x.children[td].innerHTML
            }
            else if(td === '8') {
                arr_inputs[6].value = x.children[td].innerHTML
            }
            else if(td === '9') {
                arr_inputs[7].value = x.children[td].innerHTML
            }


             
           }
        }
    
    })
    
    button[0].innerHTML = 'Изменить'
    button[0].setAttribute('disabled', true)

    




})



add[0].addEventListener( "click", event => {
    inputs.forEach(x => {
        if(x.value !== dateToday.toLocaleDateString()) {
            x.value = ''
        }
        
    })
    option[0].innerHTML = 'Выберите Исполнителя'
    button[0].innerHTML = 'Отправить'

    button[0].removeAttribute('disabled')
    })


















const getDataByInn = async () => {


    const res = await fetch('https://85.175.216.81:5021/select', {
        method:'GET',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
       
// запрашиваем пользователей
    })
    
    const json = await res.json()
    console.log(json)

    json.forEach(x => {
        const newOption = document.createElement('option')
        newOption.innerHTML = x[1]
        newOption.setAttribute('id', `${x[0]}`)
        select.appendChild(newOption)
    })
// добавляется имя исполнителя и атрибут


}





getDataByInn()



ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [43.5991700, 39.7256900],
            zoom: 14,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });



        myPlacemark = createPlacemark([43.5991700, 39.7256900]);
        myMap.geoObjects.add(myPlacemark);
        
    // Слушаем клик на карте.
       
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
            myPlacemark.events.add('dragend', function () {
                
                getAddress(myPlacemark.geometry.getCoordinates());
            });
      
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });




    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }
    
    myPlacemark.events.add('dragend', function () {
        getAddress(myPlacemark.geometry.getCoordinates());
    });


    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
       
        myPlacemark.properties.set('iconCaption', 'поиск...');

        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });

               
    writeAddress(coords, myPlacemark.properties['_data'].balloonContent)
                
    });
    
  
   
    }

}


const writeAddress = async (coords, address) => {
    if (address != undefined) {
    const addressInput = document.getElementById('address')
    let array = address.split(',')
    let res = []
    array = array.map(function (el) {
        return el.trim();
      }); 

    array.forEach(x => {
        if (x !== 'Россия' && x !== 'Краснодарский край' && x !== 'Сочи')
        {
            res.push(x)
        }
    })
    
    res = res.join(', ')
   
    addressInput.value = res
    coordsAll.push(coords)
    
// тут обрезается адрес
}
    }



const getButton = document.getElementById('otpravka')

getButton.addEventListener( "click", event => {

const allInputs = document.querySelectorAll('input')
const getSelect = document.getElementById('select')

if (getSelect.value === 'Выберите Исполнителя') {
    alert('Выберите Исполнителя!')
    
}else{


const toBd = {}
toBd[`ispolnitel`] = getSelect.value
toBd[`coords`] = coordsAll.slice(-1)

allInputs.forEach(x => {
    toBd[`${x.id}`] = x.value
})


for(let value in select.children) {

    if(select.children[value].innerHTML === getSelect.value) {
        toBd[`ispolnitelId`] = select.children[value].id

    }
}


taskAdd(toBd)


const getTbody = document.getElementsByTagName('tbody')

const tr = document.createElement('tr')
const fragment = document.createDocumentFragment()
let sortArray = []

sortArray.push(toBd.nomerZayavki, toBd.dataZayavki, toBd.srokIspolnenya, toBd.ispolnitel, toBd.object, toBd.address, toBd.zadachi, 
toBd.contacts, toBd.initiator, toBd.comment, 'Не выполнено')
   
sortArray.forEach(x=>{
    const td = document.createElement('td')
    td.innerText = x
    fragment.appendChild(td)

})

tr.appendChild(fragment)

tr.addEventListener( "click", event => {

    const allTr = document.querySelectorAll('tr')
    allTr.forEach(x => {
        if (x.style.backgroundColor === 'orange') {
            x.style.backgroundColor = 'white'
        }
    })

    tr.style.backgroundColor = 'orange'

    

})
getTbody[0].appendChild(tr)

getSelect.value = 'Выберите Исполнителя'
dataZayavki.value = dateToday.toLocaleDateString()
allInputs.forEach(x => {
    if(x.value !== dateToday.toLocaleDateString()) {
        x.value = ''
    }
    
})
// делается таблица внизу

}

})




const taskAdd = async (toBd) => {
    const res = await fetch('https://85.175.216.81:5021/getTask', {
        method:'POST',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(toBd)

    })
    

// вносится в бд


}










    
