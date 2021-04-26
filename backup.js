function Calculator(clickedButton) { //constructor function
    this.clickedButton = clickedButton;
    var currentDivText = $(".currentdiv").text();
    var previousDivText = currentDivText;
    var previousButton;
    clickedButton = $(clickedButton).text();
    console.log(clickedButton);


    this.display = function () {          //this is how you add method in a constructor function
         $(".currentdiv").text(clickedButton);
    }

    this.append = function () {
         clickedButton = previousDivText + clickedButton;
    }

    this.clearAll = function () {
         clickedButton = "";
         previousDivText = "";
         $(".prevdiv").text("");
         this.display();
    }

    this.delOne = function () {
         clickedButton = currentDivText.substring(0, currentDivText.length - 1);
         console.log(clickedButton);
         this.display();
    }

    this.symbolCheck = function () {
         var countDot = 0;
         var countMinus = 0;
         for (var j = 0; j < currentDivText.length; j++) {
              if (currentDivText.charAt(j) == ".")
                   countDot++;
         }

         if ((currentDivText.includes("÷") || currentDivText.includes("-") || currentDivText.includes("X") || currentDivText.includes("+"))
              && ((clickedButton == "÷") || (clickedButton == "-") || (clickedButton == "X") || (clickedButton == "+"))) {
              return false;
         }

         if (currentDivText.includes(".") && !(currentDivText.includes("÷") || currentDivText.includes("X") || currentDivText.includes("-") || currentDivText.includes("+")) && (clickedButton == "."))
              return false;

         if ((countDot >= 2) && (clickedButton == "."))
              return false;



         else
              return true;
    }

    this.calculateResult = function () {
         var result;
         if (currentDivText.includes("÷") || currentDivText.includes("X") || currentDivText.includes("-") || currentDivText.includes("+")) {
              var firstText = "";
              var lastText = "";

              for (var indexOfSymbol = 0; indexOfSymbol < currentDivText.length; indexOfSymbol++) {
                   if ((currentDivText.charAt(indexOfSymbol) == "÷") || (currentDivText.charAt(indexOfSymbol) == "X") || (currentDivText.charAt(indexOfSymbol) == "-") || (currentDivText.charAt(indexOfSymbol) == "+"))
                        break;
                   firstText = firstText + currentDivText.charAt(indexOfSymbol);
              }
              for (var i = indexOfSymbol + 1; i < currentDivText.length; i++) {
                   lastText = lastText + currentDivText.charAt(i);
              }

              if (currentDivText.includes("÷")) {
                   result = parseFloat(firstText) / parseFloat(lastText);
                   $(".prevdiv").text(currentDivText);
                   $(".currentdiv").text(result);
              }
              if (currentDivText.includes("X")) {
                   result = parseFloat(firstText) * parseFloat(lastText);
                   $(".prevdiv").text(currentDivText);
                   $(".currentdiv").text(result);
              }
              if (currentDivText.includes("-")) {
                   result = parseFloat(firstText) - parseFloat(lastText);
                   $(".prevdiv").text(currentDivText);
                   $(".currentdiv").text(result);
              }
              if (currentDivText.includes("+")) {
                   result = parseFloat(firstText) + parseFloat(lastText);
                   $(".prevdiv").text(currentDivText);
                   $(".currentdiv").text(result);
              }
         }
    }
}


$("button").click(function () {
    var obj1 = new Calculator(this);
    if ((obj1.symbolCheck() == true) && ($(this).text() != "=")) {
         if (($(this).text() != "CLEAR") && ($(this).text() != "DEL")) {
              obj1.append();
              obj1.display();
         }
    }

    if ($(this).text() == "CLEAR") {
         obj1.clearAll();
    }

    if ($(this).text() == "DEL") {
         obj1.delOne();
    }

    if ($(this).text() == "=") {
         obj1.calculateResult();
    }


});