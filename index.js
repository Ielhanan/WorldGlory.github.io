


  var initArrey = ["1","2","3","4","5","6","7","8","9","10","J","Q","K"];
  var i=0;
  var x =[];

var gameStart=document.getElementById("startButton");
gameStart.addEventListener("click",startFunct);



function startFunct(Arrey){
    document.getElementById("startButton").remove();
     x.push(initArrey[Math.floor(Math.random()*initArrey.length)]);
     i++;
    console.log( document.getElementById("firstCard").innerHTML="your first card :"+ x);
    var above=document.getElementById("above");
    var below=document.getElementById("below");
    above.innerHTML="above";
    below.innerHTML="below";
    above.addEventListener("click",secondFunct("above"));
    below.addEventListener("click",secondFunct("below"));
};

function secondFunct(action){
    let temp=x.slice(-1) /* save the last resul , its to avoid when its the same number in row*/
    x.push(initArrey[Math.floor(Math.random()*initArrey.length)]);
    
  //  checkDoubels(i);
    if(action.localeCompare("above")==0)
   {
       console.log("ok");
       console.log(temp);
       console.log(x.slice(-1));
        if(x.slice(-1)<temp)
        {
        document.getElementById("finalResult").innerHTML="YOU LOSE";
        }
   } 
   if(action=="below"){

   }
}
  

function checkDoubels(i){
    while(x[i]==x[i-1])
    {
    x.push(initArrey[Math.floor(Math.random()*initArrey.length)]);
    i++;
    }
};