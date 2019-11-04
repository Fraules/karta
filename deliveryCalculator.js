ymaps.ready(init);

function init() {
    // Стоимость за километр.
    var DELIVERY_TARIFF = 27,
    // Минимальная стоимость.
        MINIMUM_COST = 300
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
        route.model.setParams({results: 12}, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function () {
            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
                // Получим протяженность маршрута.
                var length = route.getActiveRoute().properties.get("distance"),

// Добавить несклько авто


                // Вычислим стоимость доставки.
                    price = calculate(Math.round(length.value / 1000)),
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
                                        '<td><span>' + price + ' р.</span></td></tr>' +
                                        '<tr>' +
                                            '<td>3-Х ТОННИК</td>' +
                                            '<td>' + length.text + '</td>'+
                                            '<td><span>' + price + ' р.</span></td>' +
                                            '</tr>' +
                                                '<tr>' +
                                                '<td>5-ТИ ТОННИК</td>' +
                                                '<td>' + length.text + '</td>' + 
                                                '<td><span>' + price + ' р.</span></td>'+
                                                '</tr>'+
                                                    '<tr>' +
                                                    '<td>10-ТИ ТОННИК</td>'+
                                                    '<td>' + length.text + '</td>' +
                                                    '<td><span>' + price + ' р.</span></td>' +
                                                    '</tr>' +
                                                        '<tr>' +'<td>ФУРА 20 ТОНН</td>'+
                                                        '<td>' + length.text + '</td>'+
                                                        '<td><span>' + price + ' р.</span></td>'+
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
                                                                        '</tr>'+
                                                        '</table>');
                                            
                                
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                        // Откроем балун.
                        activeRoute.balloon.open();
                    }
                });
            });

    // Функция, вычисляющая стоимость доставки.
    function calculate(routeLength) {
        return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
    }
}
 
    
