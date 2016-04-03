var cartPlantRow = null;
var cartCount = 0;

var totalCostOfPlants = 0;

function payWithPayPal() {
  var link = "http://www.paypal.me/alexkafer/" + totalCostOfPlants;
  //window.location.href = link;
  window.open(link, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
}


function runOnEachClass(className, code) {
  var slides = document.getElementsByClassName(className);
  for(var i = 0; i < slides.length; i++)
  {
      code(slides.item(i));
  }
}

function updateValue(plantIDNumb)
{
  var costs = document.getElementsByClassName("cost" + plantIDNumb);
  var price = costs[costs.length-1].value;


  var values = document.getElementsByClassName("field" + plantIDNumb);
  var quantity = values[values.length-1].value;

  if (quantity == 0) {
    runOnEachClass("price" + plantIDNumb, function(element) {
        element.innerHTML = "$" + price;
        element.style.color = "black";
    });

    var plantPanel = document.getElementById("cart-panel" + plantIDNumb);
    if (plantPanel) {
      plantPanel.parentNode.removeChild(plantPanel);
      cartCount--;
    }

  } else {
    runOnEachClass("price" + plantIDNumb, function(element) {
        element.innerHTML = "<strong>$" + quantity*price+"</strong>";
        element.style.color = "green";
    });

    var plantCart = document.getElementById("plant-cart");
    if (!document.getElementById("cart-panel" + plantIDNumb)) {

      if (cartCount % 4 == 0 || row == null) {
        row = document.createElement("div");
        row.setAttribute("class", "row");
        plantCart.appendChild(row);
      }

      var newPanel = document.getElementById("panel" + plantIDNumb).cloneNode(true);
      newPanel.setAttribute("id", "cart-panel" + plantIDNumb);
      row.appendChild(newPanel);
      cartCount++;
    }
  }



  updateTotal()
}

function updateTotal() {
  var plantIds = [];
  totalCostOfPlants = 0;
  for (i = 1; i <= 73; i++) {
    var costs = document.getElementsByClassName("cost" + i);
    var price = costs[costs.length-1].value;

    var values = document.getElementsByClassName("field" + i);
    var quantity = values[values.length-1].value;

      totalCostOfPlants +=  price*quantity;
  }

  document.getElementById("totalPrice").innerHTML = "$" + totalCostOfPlants;

  runOnEachClass("totalPrice", function(element) {
      element.innerHTML = "$" + totalCostOfPlants;
  });

}


function addPlant(parent, plant) {

          var col = document.createElement("div");
          col.setAttribute("class", "col-md-3");
          col.setAttribute("id", "panel" + plant.id);

          var panel = document.createElement("div");
          panel.setAttribute("class", "panel panel-default");

          var heading = document.createElement("div");
          heading.setAttribute("class", "panel-heading");

          var title = document.createElement("h3");
          title.setAttribute("class", "panel-title");
          title.innerHTML = plant.name;

          var body = document.createElement("div");
          body.setAttribute("class","panel-body");


          var link = document.createElement("a");
          link.setAttribute('onclick', "stepUpField(" + plant.id + ")");
          link.setAttribute('class', "thumbnail");

          var img = document.createElement("img");
          img.setAttribute('src', "images/plants/"+ plant.id + ".jpeg");
          img.setAttribute('class', "img-responsive");

          var footer = document.createElement("div");
          footer.setAttribute('class', "panel-footer");

          var footerStyle = document.createElement("h3");
          footerStyle.className = "text-center";

          var footerText = document.createElement("span");
          footerText.className = "price" + plant.id;
          footerText.innerHTML = "$" + plant.cost;

          footerStyle.appendChild(footerText);
          footer.appendChild(footerStyle);

          var footerCost = document.createElement("input");
          footerCost.setAttribute('type', 'hidden');
          footerCost.setAttribute('value', plant.cost);
          footerCost.setAttribute('class', "cost"+plant.id);

          footer.appendChild(footerCost);



          var inputGroup = document.createElement("div");
          inputGroup.setAttribute("class", "input-group");

          var downButtonFrame = document.createElement("span");
          downButtonFrame.setAttribute("class", "input-group-btn");

          var downButton = document.createElement("button");
          downButton.setAttribute("class", "btn btn-danger");
          downButton.setAttribute("type", "button");
          downButton.setAttribute("onclick", "stepDownField(" + plant.id +  ")");
          downButton.innerHTML = "-";

          downButtonFrame.appendChild(downButton);
          inputGroup.appendChild(downButtonFrame);

          var footerInput = document.createElement("input");
          footerInput.setAttribute('type', 'number');
          footerInput.setAttribute('class', 'form-control field'+plant.id);
          footerInput.setAttribute('placeholder', 'Quantity');
          footerInput.setAttribute('onchange', 'updateValue('+plant.id+')');
          footerInput.setAttribute('min', '0');

          inputGroup.appendChild(footerInput)

          var upButtonFrame = document.createElement("span");
          upButtonFrame.setAttribute("class", "input-group-btn");

          var upButton = document.createElement("button");
          upButton.setAttribute("class", "btn btn-danger");
          upButton.setAttribute("type", "button");
          upButton.setAttribute("onclick", "stepUpField(" + plant.id +  ")");
          upButton.innerHTML = "+";

          upButtonFrame.appendChild(upButton);
          inputGroup.appendChild(upButtonFrame);

          footer.appendChild(inputGroup);



          heading.appendChild(title);
          body.appendChild(link);
          link.appendChild(img);

          panel.appendChild(heading);
          panel.appendChild(body);
          panel.appendChild(footer);
          col.appendChild(panel);

          parent.appendChild(col);
  }

  function setStep(step) {
    var disabled = "col-xs-3 progress-steps-step disabled";
    var active = "col-xs-3 progress-steps-step active";
    var complete = "col-xs-3 progress-steps-step complete";

    choices = [complete, complete, complete, complete, active, disabled, disabled, disabled]

    document.getElementById("step1").className = choices[5-step];
    document.getElementById("step2").className = choices[6-step];


    document.getElementById("step3").className = choices[7-step];
    document.getElementById("step4").className = choices[8-step];

  }

  function showCart() {
    document.getElementById("plant-cart").style.display = "block";
    document.getElementById("plants").style.display = "none";
    document.getElementById("contact").style.display = "none";
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("nextBtn").innerHTML = "Confirm";
    document.getElementById("nextBtn").setAttribute("onclick", "showContact()");
    document.getElementById("confirmation").style.display = "none";
    setStep(2);
  }

  function showPlants() {
    document.getElementById("plant-cart").style.display = "none";
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("plants").style.display = "block";
    document.getElementById("contact").style.display = "none";
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("nextBtn").innerHTML = "Continue";
    document.getElementById("nextBtn").setAttribute("onclick", "showCart()");
    setStep(1);
  }

  function showContact() {
    document.getElementById("plant-cart").style.display = "none";
    document.getElementById("plants").style.display = "none";
    document.getElementById("contact").style.display = "block";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("confirmation").style.display = "none";
    setStep(3);
  }

  function stepUpField(id) {
    runOnEachClass("field" + id, function(element) {
        if (!element.value) {
          element.value = 1;
        } else {
          element.value = Number(element.value) + 1;
        }
    });

    updateValue(id)
  }

  function stepDownField(id) {
    runOnEachClass("field" + id, function(element) {
      if (!element.value || element.value <= 1) {
        element.value = 0;
      } else {
        element.value = Number(element.value) - 1;
      }
    });

    updateValue(id)
  }


      var valida = $('#order-form').validator();

      $.getJSON( "data/plants.json", function( data ) {
        $.each( data, function( categoryName, plants ) {
          // Each Category
          var count = 0;
          var parent = document.getElementById(categoryName);
          var row = null;
          $.each(plants, function( plantIndex, plant ) {
            // Each Plant
            if (count % 4 == 0 || row == null) {
              row = document.createElement("div");
              row.setAttribute("class", "row");
              parent.appendChild(row);
            }

            addPlant(row, plant);
            count++;
            });
        });
      });

      $( document ).ready(function() {
          // Variable to hold request
          var request;
        //  Bind to the submit event of our form
          $("#order-form").submit(function(event){
              // Abort any pending request
              if (request) {
                  request.abort();
              }
              // setup some local variables
              var $form = $(this);

              // Let's select and cache all the fields
              var $inputs = $form.find("input, select, button, textarea");

              // Serialize the data in the form
              var serializedData = $form.serialize();

              // TODO STILL NEED USER DATA
              function addData(name, value) { return serializedData + "&"+name+"="+value;}

              totalCostOfPlants = 0;
              for (i = 1; i <= 73; i++) {
                var costs = document.getElementsByClassName("cost" + i);
                var price = costs[costs.length-1].value;


                var values = document.getElementsByClassName("field" + i);

                var quantity = values[values.length-1].value;

                if (quantity) {
                  totalCostOfPlants += quantity*price;
                }

                serializedData = addData("id" + i, quantity);
              }


              serializedData = addData("Amount",totalCostOfPlants);


              // Let's disable the inputs for the duration of the Ajax request.
              // Note: we disable elements AFTER the form data has been serialized.
              // Disabled form elements will not be serialized.
              $inputs.prop("disabled", true);

              // Fire off the request to /form.php
              request = $.ajax({
                        url: "https://script.google.com/macros/s/AKfycbwmYKWj3nTPbaVoSdy777y9onxB7g2YkMyWltP_UYPA7kxQcAY/exec",
                        type: "post",
                        data: serializedData
                    });

              // Callback handler that will be called on success
              request.done(function (response, textStatus, jqXHR){
                  // Log a message to the console

                  document.getElementById("confirmation").innerHTML = "Thank you for your order! I will contact you shortly!"
                  document.getElementById("confirmation").style.display = "block";


              });

              // Callback handler that will be called on failure
              request.fail(function (jqXHR, textStatus, errorThrown){
                  // Log the error to the console
                  console.error(
                      "The following error occurred: "+
                      textStatus, errorThrown
                  );

                  $("#confirmation").toggleClass("alert-success").toggleClass("alert-danger");
                  document.getElementById("confirmation").innerHTML = "Something may have gone wrong... Please email <a href='mailto:me@alexkafer.com'>me@alexkafer.com</a> to confirm your order."
                  document.getElementById("confirmation").style.display = "block";
              });

              // Callback handler that will be called regardless
              // if the request failed or succeeded
              request.always(function () {
                  // Reenable the inputs
                  $inputs.prop("disabled", false);

                  document.getElementById("plant-cart").style.display = "block";
                  document.getElementById("plants").style.display = "none";


                  document.getElementById("contact").style.display = "none";
                  document.getElementById("nextBtn").style.display = "none";

                  $("#plant-cart :input").prop("disabled", true);
                  setStep(4);
              });

              // Prevent default posting of form
              event.preventDefault();
          });

          $("input[name='payment']").change(function(){
            // Do something interesting here
            if ($(this).val() === 'check') {
              document.getElementById("payment-check").style.display = "block";
              document.getElementById("payment-paypal").style.display = "none";
            } else if ($(this).val() === 'paypal') {
              document.getElementById("payment-paypal").style.display = "block";
              document.getElementById("payment-check").style.display = "none";
            }
          });


        });
