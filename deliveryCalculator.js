ymaps.ready(init);

function init() {
    // Стоимость за километр.
    var DELIVERY_TARIFF = 20,

    // Минимальная стоимость.
        MINIMUM_COST = 500;
       
       /*
МИНИВЕН                 20
КАБЛУК                  20
СОБОЛЬ                  20
ГАЗЕЛЬ                  27
3 ТОННИК                30
5 ТОННИК                32
10 ТОННИК               44
ФУРА 20 ТОНН            52
БОРТ                    20
РЕФРИЖИРАТОР            20
МАНИПУЛЯТОР             20 
КРАН                    20  
*/ 


var CAR_GAZEL = 27;
var Car_3_tonn = 30;
var Car_5_tonn= 32;
var Car_10_tonn= 44;
var Car_20_tonn= 52;

        myMap = new ymaps.Map('map', {
            center: [55.753960, 37.620393],
            zoom: 9,
            controls: []
        }),  
    // Создадим панель маршрутизации.
        routePanelControl = new ymaps.control.RoutePanel({
            options: {
                // Добавим заголовок панели.
                showHeader: true,
                title: 'Расчёт доставки'
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({
            options: {
                size: 'small',
                float: 'none',
                position: {
                    bottom: 145,
                    right: 10
                }
            }
        });
        

    // Пользователь сможет построить только автомобильный маршрут.
         // Минивен , Каблук, Соболь, Газель, 3-х тонник, 5-ти тонник, 10-ти тонник, фура 20 тонн, Борт, Рефрижиратор, Манипультор, Кран

    routePanelControl.routePanel.options.set({
        types: {auto: true},  
    
    });

    // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
    //routePanelControl.routePanel.state.set({
    //    fromEnabled: false,
    //    from: 'Москва, Льва Толстого 16'
    // });

    myMap.controls.add(routePanelControl).add(zoomControl);

    // Получим ссылку на маршрут.
    routePanelControl.routePanel.getRouteAsync().then(function (route) {
        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({results: 1}, true);
        
  //http://qaru.site/questions/15040/formatting-a-number-with-exactly-two-decimals-in-javascript
        function round(value, exp) {
            if (typeof exp === 'undefined' || +exp === 0)
              return Math.round(value);
          
            value = +value;
            exp = +exp;
          
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
              return NaN;
          
            // Shift
            value = value.toString().split('e');
            value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
          
            // Shift back
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
          }
        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function () {
            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
                 
                // Получим протяженность маршрута.
                var length = route.getActiveRoute().properties.get("distance"),

           

                // Вычислим стоимость доставки.
              
                    price = calculate(Math.round(length.value / 1000));
                    CAR_GAZEL =  (Math.round(length.value / 1000) * 27).toFixed(2);
                    Car_3_tonn =  (Math.round(length.value * 30 / 1000).toFixed(2));
					Car_5_tonn = (Math.round(length.value * 32 / 1000).toFixed(2));
					Car_10_tonn = (Math.round(length.value * 44 / 1000).toFixed(2));
					Car_20_tonn = (Math.round(length.value * 52 / 1000).toFixed(2));
                // Создадим макет содержимого балуна маршрута.

                    balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<table>' +
                     '<span>Расчет стоимости доставки</span>' +
                      '<tr>' +
                        '<th>МАШИНА</th>' +
                        '<th>РАССТОЯНИЕ</th>' +
                        '<th>СТОИМОСТЬ</th>' +
                        '</tr>' +
                            '<tr>' +
                            '<td>МИНИВЕН</td>' +
                            '<td>' + length.text + '</td>' +
                            '<td><span>' + price + ' р.</span></td></tr>' +
                            '<tr>' +
                                '<td>КАБЛУК</td>' +
                                '<td>' + length.text + '</td>' +
                                '<td><span>' + price + ' р.</span></td></tr>' +
                                '<tr>' +
                                    '<td>СОБОЛЬ</td>' +
                                    '<td>' + length.text + '</td>' +
                                    '<td><span>' + price + ' р.</span></td>'+
                                '</tr>' +
                                        '<tr>' +
                                        '<td>ГАЗЕЛЬ</td>'+
                                        '<td>' + length.text + '</td>' +
                                        '<td><span>' + CAR_GAZEL+ ' р.</span></td></tr>' +
                                        '<tr>' +
                                            '<td>3-Х ТОННИК</td>' +
                                            '<td>' + length.text + '</td>'+
                                            '<td><span>' + Car_3_tonn + ' р.</span></td>' +
                                            '</tr>' +
                                                '<tr>' +
                                                '<td>5-ТИ ТОННИК</td>' +
                                                '<td>' + length.text + '</td>' + 
                                                '<td><span>' + Car_5_tonn + ' р.</span></td>'+
                                                '</tr>'+
                                                    '<tr>' +
                                                    '<td>10-ТИ ТОННИК</td>'+
                                                    '<td>' + length.text + '</td>' +
                                                    '<td><span>' + Car_10_tonn + ' р.</span></td>' +
                                                    '</tr>' +
                                                        '<tr>' +'<td>ФУРА 20 ТОНН</td>'+
                                                        '<td>' + length.text + '</td>'+
                                                        '<td><span>' + Car_20_tonn + ' р.</span></td>'+
                                                        '</tr>'+
                                                            '<tr>' +
                                                            '<td>БОРТ</td>'+
                                                            '<td>' + length.text + '</td>'+
                                                            '<td><span>' + price + ' р.</span></td>'+
                                                            '</tr>' +
                                                                '<tr>' +
                                                                '<td>РЕФРИЖИРАТОР</td>' +
                                                                '<td>' + length.text + '</td>'+
                                                                '<td><span>' + price + ' р.</span></td>' +
                                                                '</tr>'+
                                                                    '<tr>'+
                                                                    '<td>МАНИПУЛЯТОР</td>' +
                                                                    '<td>' + length.text + '</td>' +
                                                                    '<td><span>' + price + ' р.</span></td>' +
                                                                    '</tr>'+
                                                                        '<tr>'+
                                                                        '<td>КРАН</td>'+
                                                                        '<td>' + length.text + '</td>' +
                                                                        '<td><span>' + price + ' р.</span></td>'+
                                                                        '</tr>'+'</table>');
                                        
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                        // Откроем балун.
                        activeRoute.balloon.open();
                    }
                });
            });

    // Функция, вычисляющая стоимость доставки.
    function calculate(routeLength) {
        return Math.trunc(routeLength * DELIVERY_TARIFF, CAR_GAZEL, Car_3_tonn, Car_5_tonn, Car_10_tonn, Car_20_tonn);
    }
}
 
    
