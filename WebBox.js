// This is the JS file for the WebBox project.
var box;
var isDown = false;
var boxCount = 0;
var xPos = 0;
var yPos = 0;


function newBox(){
    var button = document.getElementById("create_box");
    //click event on button to create a new box
    button.addEventListener('click', (event)=>{
        //increment box count so we can set up unique 'IDs'
        boxCount++;
        //create the box and a header div to handle the box moving
        var newBox = document.createElement('div');
        var newBoxHeader = document.createElement('div');
        newBoxHeader.setAttribute('class', 'header');
        newBox.appendChild(newBoxHeader);
        newBox.setAttribute('class', 'box');
        newBox.setAttribute('id', boxCount);

        //mousedown event for moving the box
        newBoxHeader.addEventListener('mousedown', mouseDown, true);
       
        //create resize divs that will take care of resizing the box, each has it's own mousedown event to activate the resize function below
        var resizerTopLeft = document.createElement('div');
        resizerTopLeft.setAttribute('class', 'resizer top-left');
        resizerTopLeft.addEventListener('mousedown', resize);

        var resizerTopRight = document.createElement('div');
        resizerTopRight.setAttribute('class', 'resizer top-right');
        resizerTopRight.addEventListener('mousedown', resize);

        var resizerBotLeft = document.createElement('div');
        resizerBotLeft.setAttribute('class', 'resizer bot-left');
        resizerBotLeft.addEventListener('mousedown', resize);

        var resizerBotRight = document.createElement('div');
        resizerBotRight.setAttribute('class', 'resizer bot-right');
        resizerBotRight.addEventListener('mousedown', resize);

        var resizerTop = document.createElement('div');
        resizerTop.setAttribute('class', 'resizer-ns top');
        resizerTop.addEventListener('mousedown', resize);

        var resizerBot = document.createElement('div');
        resizerBot.setAttribute('class', 'resizer-ns bot');
        resizerBot.addEventListener('mousedown', resize)

        var resizerLeft = document.createElement('div');
        resizerLeft.setAttribute('class', 'resizer-we left');
        resizerLeft.addEventListener('mousedown', resize);

        var resizerRight = document.createElement('div');
        resizerRight.setAttribute('class', 'resizer-we right');
        resizerRight.addEventListener('mousedown', resize);

        newBox.appendChild(resizerTopLeft);
        newBox.appendChild(resizerTopRight);
        newBox.appendChild(resizerBotLeft);
        newBox.appendChild(resizerBotRight);
        newBox.appendChild(resizerTop);
        newBox.appendChild(resizerBot);
        newBox.appendChild(resizerLeft);
        newBox.appendChild(resizerRight);

 

        var startX, startY, startWidth, startHeight, cbox, cWidth, cHeight, resizer, minSize, startX, startMouseX, startMouseY;
        
        function resize(e){
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;
            startWidth = 100;
            startHeight = 0;
            minSize = 100;
            resizer = this;
            cbox = document.getElementById(this.parentElement.id);
            startMouseX = this.parentElement.getBoundingClientRect().left;
            startMouseY = this.parentElement.getBoundingClientRect().top;
            xDirection = "";
            yDirection = "";
            direction = "";

            window.addEventListener('mousemove', startResize);
            window.addEventListener('mouseup', stopResize);
        }
        function startResize(e){
            if(resizer.classList.contains('top-left')){
                //switch cursor based on resizer directions
                document.body.style.cursor = 'nwse-resize'
                //the width will be the original width minus the mouse X position minus the parent left bound
                cWidth = startWidth - (e.clientX - startMouseX);
                //the height is the original height minus the current mouse Y position minus the parent top bound
                cHeight = startHeight - (e.clientY - startMouseY);
                //if the width/height we are expanding to is greater than the minimum set
                if(cWidth > minSize){
                    //set the box width
                    cbox.style.width = cWidth + 'px';
                    //shifts the box x position according to the increased width essentially giving the illusion that the x position has moved
                    cbox.style.left = startX + (e.clientX - startMouseX) +'px';
                }
                //same principal applies to the height and the rest of the resizers below
                if(cHeight > minSize){
                    cbox.style.height = cHeight + 'px';
                    cbox.style.top = startY + (e.clientY - startMouseY)+'px';
                }
                
            } else if (resizer.classList.contains('bot-right')){
                document.body.style.cursor = 'nwse-resize';
                cWidth = startWidth + (e.clientX - startMouseX);
                cHeight = startHeight + (e.clientY - startMouseY);
                if(cWidth > minSize){
                    cbox.style.width = cWidth + 'px';
                }
                if(cHeight > minSize){
                    cbox.style.height = cHeight + 'px';
                }
            } else if(resizer.classList.contains('top-right')){
                document.body.style.cursor = 'nesw-resize';
                cWidth = startWidth + (e.clientX - startMouseX);
                cHeight = startHeight - (e.clientY - startMouseY);
                if(cWidth > minSize){
                    cbox.style.width = cWidth + 'px';
                }
                if(cHeight > minSize){
                    cbox.style.height = cHeight + 'px';
                    cbox.style.top = startY + (e.clientY - startMouseY) +'px';
                }
            } else if (resizer.classList.contains('bot-left')){
                document.body.style.cursor = 'nesw-resize';
                cWidth = startWidth - (e.clientX - startMouseX);
                cHeight = startHeight + (e.clientY - startMouseY);
                if(cWidth > minSize){
                    cbox.style.width = cWidth + 'px';
                    cbox.style.left = startX + (e.clientX - startMouseX) + 'px';
                }
                if(cHeight > minSize){
                    cbox.style.height = cHeight + 'px';
                }
            } else if(resizer.classList.contains('top')){
                document.body.style.cursor = 'ns-resize'
                cHeight = startHeight - (e.clientY - startMouseY);
                if(cHeight > minSize){
                    cbox.style.height = cHeight + 'px';
                    cbox.style.top = startY + (e.clientY - startMouseY) + 'px';
                }
            } else if(resizer.classList.contains('bot')){
                document.body.style.cursor = 'ns-resize'
                cHeight = startHeight + (e.clientY - startMouseY);
                if(cHeight > minSize){
                    cbox.style.height = cHeight + 'px';
                }
            } else if (resizer.classList.contains('left')){
                document.body.style.cursor = 'ew-resize';
                cWidth = startWidth - (e.clientX - startMouseX);
                if(cWidth > minSize){
                    cbox.style.width = cWidth + 'px';
                    cbox.style.left = startX + (e.clientX - startMouseX) +'px'
                }
            } else if (resizer.classList.contains('right')){
                document.body.style.cursor = 'ew-resize'
                cWidth = startWidth + (e.clientX - startMouseX);
                if(cWidth > minSize){
                    cbox.style.width = cWidth + 'px';
                }
            }
           
        }

        function stopResize(e){
            //set cursor back to default and remove the event listeners
            document.body.style.cursor = 'default';
            window.removeEventListener('mousemove', startResize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }

        //these three functions take care of the box movement
        function mouseUp(){
            isDown = false;
            box.style.border = 'none';
        };
        function mouseDown(e){ 
            isDown = true;
            box = document.getElementById(this.parentElement.id);
            //create a highlight effect when a box is selected
            box.style.border = 'solid yellow 7px';
            //original x and y positions with an offset relative to the left and top parent element
            xPos = e.clientX - box.offsetLeft;
            yPos = e.clientY - box.offsetTop;
            
            window.addEventListener('mousemove', boxMove, true);
            window.addEventListener('mouseup', mouseUp, false);
        };
        function boxMove(e){
            //if the isDown boolean is true
            if(isDown){
                //the if statements handle the boxes moving out of view, for this assignment, I used a fixed container div to make things simpler in testing, if it were in production, I would change the bounds to the window
                let contain = document.getElementById('box_container');
                let topContain = contain.getBoundingClientRect().top;
                let botContain = contain.getBoundingClientRect().bottom;
                let leftContain = contain.getBoundingClientRect().left;
                let rightContain = contain.getBoundingClientRect().right;
                if (box.getBoundingClientRect().right  > rightContain) {
                    box.style.position = 'absolute';
                    box.style.left =  xPos +'px';
                    window.removeEventListener('mousemove', boxMove,true)
                    return;
                } else if(box.getBoundingClientRect().left < leftContain){
                    box.style.position = 'absolute';
                    box.style.left = xPos + 'px';
                    window.removeEventListener('mousemove', boxMove, true);
                    return;
                } else if (box.getBoundingClientRect().top < topContain){
                    box.style.position = 'absolute';
                    box.style.top = yPos + 'px';
                    window.removeEventListener('mousemove', boxMove, true);
                    return;
                }else if (box.getBoundingClientRect().bottom > botContain){
                    box.style.position = 'absolute';
                    box.style.top = -yPos + 'px';
                    window.removeEventListener('mousemove', boxMove, true);
                    return;
                }
                //if none of the if statements pass then the box can be freely moved
                box.style.position = 'absolute';
                box.style.top = (e.clientY - yPos) + 'px';
                box.style.left = (e.clientX - xPos) + 'px';
                
            } else {
                window.removeEventListener('mousemove', boxMove, true)
            } 
        };
        
        document.getElementById('box_container').appendChild(newBox);
    });
};
newBox();


