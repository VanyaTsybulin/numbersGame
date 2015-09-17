window.onload = function(){
    (function(){
        var GAME = function () {
            this.settings = {
                debug: 'true',
                gameWrapper: 'gameWrapper',
                defaultElementsCount: 9,
                colorsSet :['#231E5E','#A09CD1','#35E4E4','#EFD924','#DEA029', '#8206C0' , '#BCC1F8']
            };
            this.elementsArray = [];
            this.gameWrapper = document.getElementsByClassName(this.settings.gameWrapper)[0];
            this.getRandom = function(min, max){
                return Math.round(Math.random() * (max - min) + min);
            };
            this.initGameArray = function () {
                if (this.settings.debug == "true"){
                    this.elementsArray = [[1,2,3,4,6,7,7,8,9],[2,3,4,6,5,7,8,1,9]];
                }else{
                    for(var i=0; i<2; i++){
                        var array = [];
                        this.elementsArray.push(array);
                        for(var j=0; j< this.settings.defaultElementsCount; j++){
                            var rand = this.getRandom(1,this.settings.defaultElementsCount);
                            this.elementsArray[this.elementsArray.length - 1 ].push(rand);
                        }
                    }
                }


            };
            this.handlers = function(){
                var clicked = null;
                var self = this;
                function addListener(element, eventName, handler) {
                    if (element.addEventListener) {
                        element.addEventListener(eventName, handler, false);
                    }
                    else if (element.attachEvent) {
                        element.attachEvent('on' + eventName, handler);
                    }
                    else {
                        element['on' + eventName] = handler;
                    }
                }
                var gameItems = this.gameWrapper.getElementsByClassName('gameItem');
                for (var i=0; i< gameItems.length; i++){
                    addListener( gameItems[i],'click', handlerAction);
                }

                function handlerAction(){
                    var tempClicked = this;
                    this.classList.add('clicked');

                    if (clicked){
                        (function(){
                                var tempCrd = {
                                    row: parseInt(tempClicked.getAttribute('row')),
                                    col: parseInt(tempClicked.getAttribute('col'))
                                };
                                var clickedCrd = {
                                    row: parseInt(clicked.getAttribute('row')),
                                    col: parseInt(clicked.getAttribute('col'))
                                };

                                //if neighbor elements
                            //check for single element double click
                            if ((parseInt(tempCrd.row) == parseInt(clickedCrd.row)) && (parseInt(tempCrd.col) == parseInt(clickedCrd.col))){
                                var clickedElements = Array.prototype.slice.call(self.gameWrapper.getElementsByClassName('clicked'));
                                clickedElements.forEach(function(item){
                                    item.classList.remove('clicked');
                                })
                            }else{
                                //check if elemets numbers are equal or returns correct sum
                                if(
                                    (self.elementsArray[tempCrd.row][tempCrd.col] == self.elementsArray[clickedCrd.row][clickedCrd.col]) ||
                                    (self.elementsArray[tempCrd.row][tempCrd.col] + self.elementsArray[clickedCrd.row][clickedCrd.col] == self.settings.defaultElementsCount+1 )){
                                    //если элементы являются прямыми соседями по одной строке или столбцу
                                    if (
                                        ((Math.abs(tempCrd.row - clickedCrd.row)<=1) && (tempCrd.col == clickedCrd.col)) ||
                                        ((Math.abs(tempCrd.col - clickedCrd.col)<=1) && (tempCrd.row == clickedCrd.row))
                                    ){
                                        self.elementsArray[tempCrd.row][tempCrd.col] = 0;
                                        self.elementsArray[clickedCrd.row][clickedCrd.col]  = 0;
                                        tempClicked.classList.add('remove');
                                        clicked.classList.add('remove');

                                    }else{
                                        //проверяем на совпадения элемента в конце строке с первым в новой строке
                                        //проверка на разность строк
                                        if (Math.abs(parseInt(tempCrd.row) - parseInt(clickedCrd.row)) == 1 ){
                                            if (((tempCrd.col ==  self.settings.defaultElementsCount - 1 ) && (clickedCrd.col == 0))||
                                                ((tempCrd.col == 0 ) && (clickedCrd.col ==  self.settings.defaultElementsCount - 1))){
                                                console.log("works");
                                            }

                                        }


                                    }
                                    var clickedElements = Array.prototype.slice.call(self.gameWrapper.getElementsByClassName('clicked'));
                                    clickedElements.forEach(function(item){
                                        item.classList.remove('clicked');
                                    })

                                }else{
                                    var clickedElements = Array.prototype.slice.call(self.gameWrapper.getElementsByClassName('clicked'));
                                    clickedElements.forEach(function(item){
                                        item.classList.remove('clicked');
                                    })
                                }

                            }
                        })();
                        clicked =null;
                        self.reRender();

                    }else{
                        clicked = this;

                    //self.reRender();
                    }

                }
            };
            this.reRender = function(){
                        var gameElements = this.gameWrapper.getElementsByClassName('gameItem');
                        for(var i=0; i< gameElements.length; i++){
                            var row = gameElements[i].getAttribute('row');
                            var col = gameElements[i].getAttribute('col');
                            gameElements[i].innerHTML = this.elementsArray[row][col];
                        }

            };
            this.render = function(){
                for(var i=0; i<this.elementsArray.length; i++){
                    for(var j=0; j<this.settings.defaultElementsCount; j++){
                        var element = document.createElement('span');
                        element.setAttribute('row', i);
                        element.setAttribute('col', j);
                        element.className = "gameItem";
                        var colorNumber = this.getRandom(0,this.settings.colorsSet.length-1);
                        element.style.background = this.settings.colorsSet[colorNumber];
                        var elementValue = this.elementsArray[i][j];
                        if (elementValue > 0){
                            element.innerHTML = this.elementsArray[i][j];
                        }else{
                            element.innerHTML = '-';
                        }
                        this.gameWrapper.appendChild(element);
                    }
                }

            };

            this.init = function(){
                this.initGameArray();
                this.render();
                this.handlers();

                //fill up elementsArray

            };
            this.init();
        };
        var game = new GAME();
    })();
};