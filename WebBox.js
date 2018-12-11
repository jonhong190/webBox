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
        newBox.setAttribute('style','left:50 px; top: 50 px')
       
        //create resize divs that will take care of resizing the box, each has it's own mousedown event to activate the resize function below
        var resizerTopLeft = document.createElement('div');
        var resizerTopRight = document.createElement('div');
        var resizerBotLeft = document.createElement('div');
        var resizerBotRight = document.createElement('div');
        var resizerTop = document.createElement('div');
        var resizerBot = document.createElement('div');
        var resizerLeft = document.createElement('div');
        var resizerRight = document.createElement('div');
        
        
        //mousedown event for moving the box
        newBoxHeader.addEventListener('mousedown', mouseDown, true);

        document.getElementById('box_container').append(newBox);
        console.log(newBox.getBoundingClientRect().left, newBox.getBoundingClientRect().top)
        newBox.appendChild(resizerTopLeft);
        newBox.appendChild(resizerTopRight);
        newBox.appendChild(resizerBotLeft);
        newBox.appendChild(resizerBotRight);
        newBox.appendChild(resizerTop);
        newBox.appendChild(resizerBot);
        newBox.appendChild(resizerLeft);
        newBox.appendChild(resizerRight);
        resizerTopLeft.setAttribute('class', 'resizer top-left');
        resizerTopLeft.addEventListener('mouseover', changeCursor);
        resizerTopLeft.addEventListener('mouseout', defaultCursor);
        resizerTopLeft.addEventListener('mousedown', initResize);
        resizerTopRight.setAttribute('class', 'resizer top-right');
        resizerTopRight.addEventListener('mouseover', changeCursor);
        resizerTopRight.addEventListener('mouseout', defaultCursor);
        resizerTopRight.addEventListener('mousedown', initResize);
        resizerBotLeft.setAttribute('class', 'resizer bot-left');
        resizerBotLeft.addEventListener('mouseover', changeCursor);
        resizerBotLeft.addEventListener('mouseout', defaultCursor);
        resizerBotLeft.addEventListener('mousedown', initResize);
        resizerBotRight.setAttribute('class', 'resizer bot-right');
        resizerBotRight.addEventListener('mouseover', changeCursor);
        resizerBotRight.addEventListener('mouseout', defaultCursor);
        resizerBotRight.addEventListener('mousedown', initResize);
        resizerTop.setAttribute('class', 'resizer-ns top');
        resizerTop.addEventListener('mouseover', changeCursor);
        resizerTop.addEventListener('mouseout', defaultCursor);
        resizerTop.addEventListener('mousedown', initResize);
        resizerBot.setAttribute('class', 'resizer-ns bot');
        resizerBot.addEventListener('mouseover', changeCursor);
        resizerBot.addEventListener('mouseout', defaultCursor);
        resizerBot.addEventListener('mousedown', initResize);
        resizerLeft.setAttribute('class', 'resizer-we left');
        resizerLeft.addEventListener('mouseover', changeCursor);
        resizerLeft.addEventListener('mouseout', defaultCursor);
        resizerLeft.addEventListener('mousedown', initResize)
        resizerRight.setAttribute('class', 'resizer-we right');
        resizerRight.addEventListener('mouseover', changeCursor);
        resizerRight.addEventListener('mouseout', defaultCursor);
        resizerRight.addEventListener('mousedown', initResize);




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
                    box.style.top = yPos + 'px';
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
        

        function changeCursor(e){
            console.log(e)
            if(this.classList.contains('top')){
                document.body.style.cursor = 'ns-resize';
            } else if (this.classList.contains('bot')){
                document.body.style.cursor = 'ns-resize';
            } else if (this.classList.contains('right')){
                document.body.style.cursor = 'ew-resize';
            } else if (this.classList.contains('left')){
                document.body.style.cursor = 'ew-resize';
            } else if (this.classList.contains('top-left')){
                document.body.style.cursor = 'nwse-resize';
            } else if (this.classList.contains('top-right')){
                document.body.style.cursor = 'nesw-resize';
            } else if (this.classList.contains('bot-left')){
                document.body.style.cursor = 'nesw-resize';
            } else if (this.classList.contains('bot-right')){
                document.body.style.cursor = 'nwse-resize';
            }
        }
        function defaultCursor(){
            document.body.style.cursor = 'default';
        }


        function initResize(e) {
            e.preventDefault();
            const resizer = this;
            const box = this.parentElement;
            const minSize = 100;
            let startWidth = parseInt(getComputedStyle(box, null).width);
            let startHeight = parseInt(getComputedStyle(box, null).height);
            let startX = parseInt(getComputedStyle(box, null).left);
            let startY = parseInt(getComputedStyle(box, null).top);
            // let startX = box.getBoundingClientRect().left;
            // let startY = box.getBoundingClientRect().top;
            console.log(box.getBoundingClientRect().left, box.getBoundingClientRect().top)
            let startMouseX = e.clientX;
            let startMouseY = e.clientY;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);

            function resize(e) {
                if (resizer.classList.contains('bot-right')) {
                    document.body.style.cursor = 'nwse-resize';
                    const width = startWidth + (e.clientX - startMouseX);
                    const height = startHeight + (e.clientY - startMouseY);
                    if (width > minSize) {
                        box.style.width = width + 'px';
                    }
                    if (height > minSize) {
                        box.style.height = height + 'px';
                    }
                }
                else if (resizer.classList.contains('bot-left')) {
                    document.body.style.cursor = 'nesw-resize';
                    const width = startWidth - (e.clientX - startMouseX);
                    const height = startHeight + (e.clientY - startMouseY);
                    if (width > minSize) {
                        box.style.width = width + 'px';
                        box.style.left = startX + (e.clientX - startMouseX) + 'px';
                        console.log(box)
                    }
                    if (height > minSize) {
                        box.style.height = height + 'px';
                    }

                }
                else if (resizer.classList.contains('top-right')){
                    document.body.style.cursor = 'nesw-resize';
                    const width = startWidth + (e.clientX - startMouseX);
                    const height = startHeight - (e.clientY - startMouseY);
                    if(width > minSize){
                        box.style.width = width + 'px';
                    }
                    if(height > minSize){
                        box.style.height = height + 'px';
                        box.style.top = startY + (e.clientY - startMouseY)+'px';
                        
                    }
                }
                else if(resizer.classList.contains('top-left')){
                    document.body.style.cursor = 'nwse-resize';
                    const width = startWidth - (e.clientX - startMouseX);
                    const height = startHeight - (e.clientY - startMouseY);
                    if(width > minSize){
                        box.style.width = width +'px';
                        box.style.left = startX + (e.clientX - startMouseX)+'px';
                    }
                    if(height > minSize){
                        box.style.height = height + 'px';
                        box.style.top = startY + (e.clientY - startMouseY) +'px';
                    }
                }
                else if (resizer.classList.contains('top')) {
                    document.body.style.cursor = 'ns-resize'
                    const height = startHeight - (e.clientY - startMouseY);
                    if (height > minSize) {
                        box.style.height = height + 'px';
                        box.style.top = startY + (e.clientY - startMouseY) + 'px';
                    }
                }
                else if (resizer.classList.contains('bot')){
                    document.body.style.cursor = 'ns-resize';
                    const height = startHeight + (e.clientY - startMouseY);
                    if(height > minSize){
                        box.style.height = height + 'px';
                    }
                }
                else if(resizer.classList.contains('left')){
                    document.body.style.cursor = 'ew-resize';
                    const width = startWidth - (e.clientX - startMouseX);
                    if(width > minSize){
                        box.style.width = width + 'px';
                        box.style.left = startX + (e.clientX - startMouseX)+'px';
                    }
                }
                else{
                    document.body.style.cursor = 'ew-resize';
                    const width = startWidth + (e.clientX - startMouseX);
                    if(width > minSize){
                        box.style.width = width + 'px';
                    }
                }
            }

            function stopResize(e) {
                document.body.style.cursor = 'default';
                window.removeEventListener('mousemove', resize);
            }
        }
        
        
        
    
    });
};
newBox();