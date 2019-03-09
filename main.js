var canvas = document.getElementById("canvas")
var actions = document.getElementById("actions")
var context = canvas.getContext("2d")
var eraser = document.getElementById("eraser")
var brush = document.getElementById("brush")
var clear = document.getElementById("clear")
var save = document.getElementById("save")
var brushColor
var brushSmall = document.getElementById("small")
var brushMiddle = document.getElementById("middle")
var brushLarge = document.getElementById("large")
var brushSize

listenToUser(canvas)
autoFillWindow()

/*********************/
var eraserEnabled = false

eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add("on")
  brush.classList.remove("on")
}
brush.onclick = function(){
  eraserEnabled = false
  eraser.classList.remove("on")
  brush.classList.add("on") 
}
clear.onclick = function(){
  console.log("clear")
  context.clearRect(0,0,document.documentElement.clientWidth,document.documentElement.clientHeight)
}
save.onclick = function(){
  var url = canvas.toDataURL("image/jpg")
  var a = document.createElement("a")  
  document.body.appendChild(a)
  a.href = url  
  a.download = "yourpic"
  a.click()
}




var colorList = document.getElementsByClassName("colorList")

for(var i = 0 ; i < colorList.length ; i++){
  colorList[i].style.background = colorList[i].id
  colorList[i].onclick = function(){
    var others = this.parentNode.children;
    for(var k = 0 ; k < others.length ; k++){
      others[k].className = "colorList"
    }
    brushColor = this.id
    this.classList.add("onColor") 
  }
}



brushSmall.onclick = function(){
   var others = this.parentNode.children;
    for(var k = 0 ; k < others.length ; k++){
      others[k].className = "lineList"
    }
  brushSize = 1
  brushSmall.classList.add("onLine") 
}
brushMiddle.onclick = function(){
   var others = this.parentNode.children;
    for(var k = 0 ; k < others.length ; k++){
      others[k].className = "lineList"
    }
  brushSize = 3
  brushMiddle.classList.add("onLine") 
}
brushLarge.onclick = function(){
   var others = this.parentNode.children;
    for(var k = 0 ; k < others.length ; k++){
      others[k].className = "lineList"
    }
  brushSize = 5
  brushLarge.classList.add("onLine") 
}

/**********************/

function listenToUser(canvas1){
  var using = false
  var lastPoint = {x:undefined,y:undefined}

  if(document.body.ontouchstart !== undefined){
      canvas1.ontouchend=function(d){
      using = false
    }

    canvas1.ontouchstart=function(d){  
      using = true  
      if(eraserEnabled){
        context.clearRect(d.touches[0].clientX,d.touches[0].clientY,10,10)
      }else{
        lastPoint = {x:d.touches[0].clientX,y:d.touches[0].clientY}
      }
    }

    canvas1.ontouchmove=function(d){
      var x = d.touches[0].clientX
      var y = d.touches[0].clientY
    
      newPoint = {x:x,y:y}
    
      if(using&&!eraserEnabled){    
        drawCircle(x,y,brushSize/2)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
      }else if(using&&eraserEnabled){
        context.clearRect(x,y,10,10)
      }
    }
  }else{
    canvas1.onmouseup=function(d){
      using = false
    }

    canvas1.onmousedown=function(d){  
      using = true  
      if(eraserEnabled){
        context.clearRect(d.clientX,d.clientY,10,10)
      }else{
        lastPoint = {x:d.clientX,y:d.clientY}
      }
    }

    canvas1.onmousemove=function(d){
      var x = d.clientX
      var y = d.clientY
    
      newPoint = {x:x,y:y}
    
      if(using&&!eraserEnabled){    
        drawCircle(x,y,0.5)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
      }else if(using&&eraserEnabled){
        context.clearRect(x,y,10,10)
      }
    }
  }
  

}



function autoFillWindow(){
  function fillWindow(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
  fillWindow()

  window.onresize = function(){
    fillWindow()
  }
}

function drawLine(x1,y1,x2,y2){  
  context.beginPath()  
  context.strokeStyle = brushColor
  context.moveTo(x1,y1)
  context.lineTo(x2,y2)
  context.lineWidth = brushSize
  context.stroke()
  context.closePath()
}

function drawCircle(x,y,radius){  
  context.beginPath()  
  context.arc(x,y,radius,0,Math.PI *2)
  context.fillStyle = brushColor
  context.fill()
}

