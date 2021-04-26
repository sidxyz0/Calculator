var currentDivText = "";
var previousTextType = "";
var decimalCount = 0;
var results = 0;
function Calculator(clickedButton, type) {
     this.clickedButton = clickedButton;
     this.type = type;
     console.log(type);
     // console.log(clickedButton);
     // console.log(type);


     var prevDivText = "";
     this.check = function () {

          //checking for repeated symbols
          if ((previousTextType == "symbol") && (type == "symbol")) {
               console.log(type);
               return false;
          }
          // if (symbolCount > 1) {
          //      return false;
          // }

          //checking for repeated decimals
          if (currentDivText.includes(".") && !(currentDivText.includes("÷") || currentDivText.includes("*") || currentDivText.includes("-") || currentDivText.includes("+")) && (clickedButton == ".")) {
               return false;
          }
          if ((decimalCount > 1) && (clickedButton == ".")) {
               return false;
          }


          //returning true only if above conditions are not met
          else {
               if (clickedButton == ".")
                    decimalCount++;
               previousTextType = type;
               console.log(previousTextType);
               return true;
          }
     }

     this.append = function () {
          currentDivText = currentDivText + clickedButton;
          console.log(currentDivText);
          $(".currentdiv").text(currentDivText);
     }

     this.result = function () {
          results = eval(currentDivText);
          $(".prevdiv").text(currentDivText);
          currentDivText = results.toString();
          $(".currentdiv").text(currentDivText);
     }

     this.clear = function () {
          currentDivText = "";
          previousTextType = "";
          decimalCount=0;
          $(".currentdiv").text("");
          $(".prevdiv").text("");
     }


     this.del = function () {
          if(currentDivText[currentDivText.length-1]=="."){
               decimalCount--;
          }
          currentDivText = currentDivText.substring(0, currentDivText.length - 1);
          if((currentDivText[currentDivText.length-1]=="0")||(currentDivText[currentDivText.length-1]=="1")||(currentDivText[currentDivText.length-1]=="2")||(currentDivText[currentDivText.length-1]=="3")||(currentDivText[currentDivText.length-1]=="4")||(currentDivText[currentDivText.length-1]=="5")||(currentDivText[currentDivText.length-1]=="6")||(currentDivText[currentDivText.length-1]=="7")||(currentDivText[currentDivText.length-1]=="8")||(currentDivText[currentDivText.length-1]=="9")){
               previousTextType="number";
          }
          if((currentDivText[currentDivText.length-1]=="+")||(currentDivText[currentDivText.length-1]=="-")||(currentDivText[currentDivText.length-1]=="÷")||(currentDivText[currentDivText.length-1]=="*")){
               previousTextType="symbol";
          }
          $(".currentdiv").text(currentDivText);
     }




}

$("button").click(function () {
     var clickedButton = $(this).text();
     var type = $(this).attr("class");
     var buttonObj = new Calculator(clickedButton, type);
     if ((clickedButton != "=") && (clickedButton != "CLEAR") && (clickedButton != "DEL") && (buttonObj.check())) {
          buttonObj.append();
     }
     if (clickedButton == "=") {
          buttonObj.result();
     }
     if (clickedButton == "CLEAR") {
          buttonObj.clear();
     }
     if (clickedButton == "DEL") {
          buttonObj.del();
     }
});