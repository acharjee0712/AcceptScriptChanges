var activeCont = "";
window.onload = loadpage();

//Below function gets executed when user clicks on any of the 4 product types in dashboard page
function loadpage() {
    var pageurl = window.location.href;

    //On page load, the content of all the 4 product types is disabled
    var elements = document.getElementsByClassName("productCont");
    for (var x = 0; x < elements.length; x++) {
        elements[x].style.display = "none";
    }

    //Below line reads the product type selected by the user in dashboard page 
    var product = getParameterByName('producttype', window.location.href.toLowerCase());
    if (pageurl.toLowerCase().indexOf("?producttype=") > 0) {

        //If the user clicks Accept.js product type in the dashboard page, the following code gets executed.
        if (product == "acceptjs") {

            //Accept.js doesnt accept customer id
            //If the user passes customer id to Accept.js product, then error message is shown on the page
            if (pageurl.toLowerCase().indexOf("&customerid=") > 0) {

                //The content of all the 4 product types is disabled on the page
                var elements = document.getElementsByClassName("productCont");
                for (var x = 0; x < elements.length; x++) {
                    elements[x].style.display = "none";
                }

                //Below code gets executed on invalid page request by the user
                document.getElementById("invalidPage").innerHTML = "";
                document.getElementById("invalidPage").innerHTML = "Product Type not Found";
                document.getElementById("invalidProduct").style.display = "block";
            }

            //The Accept.js section is displayed on the page
            else {
                document.getElementById("acceptjs").style.display = "block";
                activeCont = "acceptjs";

                //By default credit card radio button is selected for accept js 
                document.getElementById("rdCard").click();
            }
        }

        //If the user clicks Accept.js UI product type in the dashboard page, the following code gets executed
        else if (product == "acceptui") {

            //Accept.js UI doesnt accept customer id
            //If the user passes customer id to Accept.js UI product, then user gets redirected to the error message section
            if (pageurl.toLowerCase().indexOf("&customerid=") > 0) {

                //The content of all the 4 product types is disabled on the page
                var elements = document.getElementsByClassName("productCont");
                for (var x = 0; x < elements.length; x++) {
                    elements[x].style.display = "none";
                }

                //Below code gets executed on invalid page request by the user
                document.getElementById("invalidPage").innerHTML = "";
                document.getElementById("invalidPage").innerHTML = "Product Type not Found";
                document.getElementById("invalidProduct").style.display = "block";
            }
            else {

                //The Accept.js UI section is displayed on the page
                activeCont = "acceptui";
                document.getElementById("acceptui").style.display = "block";
                AcceptUI();
            }
        }

        //If the user clicks Accept Hosted product type in the dashboard page, the following code gets executed.
        else if (product == "accepthosted") {
            activeCont = "accepthosted";

            //Below logic is to check if there are more than one parameter passed in the URL 
            if (pageurl.toLowerCase().indexOf("&") > 0) {

                //Below code gets executed when the user passes customer id in the request URL
                if (pageurl.toLowerCase().indexOf("&customerid=") > 0) {
                    var id = getParameterByName('customerid', window.location.href.toLowerCase());

                    //Validation of customer id will be done by using the below function
                    var result = ValidateCustomer(id);

                    //If the customer id is a valid id, then AcceptHosted function gets executed
                    if (result.valid)
                    {
                        AcceptHosted(id);
                    }
                    else {

                        //If the invalid customer id declared in the URL, then user gets redirected to the error message section
                        var elements = document.getElementsByClassName("productCont");

                        //The content of all the 4 product types is disabled on the page
                        for (var x = 0; x < elements.length; x++) {
                            elements[x].style.display = "none";
                        }
                        document.getElementById("invalidPage").innerHTML = "";
                        document.getElementById("invalidPage").innerHTML = "Customer not Found";
                        document.getElementById("invalidProduct").style.display = "block";
                    }
                }
                else {

                    //Below code gets executed when user passes invalid parameters in the URL                   
                    var elements = document.getElementsByClassName("productCont");
                    for (var x = 0; x < elements.length; x++) {
                        elements[x].style.display = "none";
                    }
                    document.getElementById("invalidPage").innerHTML = "";
                    document.getElementById("invalidPage").innerHTML = "Product Type not Found";
                    document.getElementById("invalidProduct").style.display = "block";

                }
            }
            else {

                //When customer id parameter is not passed in the URL, AcceptHosted function gets executed
                AcceptHosted('');
            }
        }

        //If the user clicks Accept Customer product type in the dashboard page, the following code gets executed.
        else if (product == "acceptcustomer") {
            activeCont = "acceptcustomer";

            //Below line populates the customer id textbox with a valid customer id
            document.getElementById("txtCustomerId").value = globalVars.ValidCustomer;

            //Below code gets executed when the user passes customer id in the request URL
            if (pageurl.toLowerCase().indexOf("&customerid=") > 0) {

                document.getElementById("acceptCustomer").style.display = "none";

                //Below line gets the customer id declared in the url by the user
                var id = getParameterByName('customerid', window.location.href.toLowerCase());

                //Below function checks if the customer id is already validated or not
                //Customer id validaton occurs on click of continue button in dashboard and on accept customer page load
                //In order to avoid multiple validation requests to API, storing the validation status in the session storage
                var customerIdValidationStatus = sessionStorage.getItem('isValidated');

                //If customer id is not validated
                if (customerIdValidationStatus != "true") {

                    //Validation of customer id will be done by using the below function
                    var result = ValidateCustomer(id);

                    //If the customer id is a valid id, then AcceptCustomer function gets executed
                    if (result.valid)
                    {
                        AcceptCustomer(id);
                    }
                    else {

                        //If the invalid customer id declared in the URL, then user gets redirected to the error message section
                        var elements = document.getElementsByClassName("productCont");
                        for (var x = 0; x < elements.length; x++) {
                            elements[x].style.display = "none";
                        }
                        document.getElementById("invalidPage").innerHTML = "";
                        document.getElementById("invalidPage").innerHTML = "Customer not Found";
                        document.getElementById("invalidProduct").style.display = "block";
                    }

                }
                //If customer id is already validated in dashboard page
                else {
                    AcceptCustomer(id);
                    sessionStorage.setItem('isValidated', 'false');
                }
            }
            else {

                //If customer id is not provided in the URL, a pop up to enter customer id is displayed.
                document.getElementById("acceptCustomer").style.display = "block";
            }
        }
        else {

            //Below code gets executed when user passes invalid product type parameters in the URL                   
            document.getElementById("invalidPage").innerHTML = "";
            document.getElementById("invalidPage").innerHTML = "Product Type not Found";
            document.getElementById("invalidProduct").style.display = "block";
        }
    }
    else {

        //Below code gets executed when user passes invalid product type parameters in the URL                   
        if (document.getElementById("invalidPage") != null) {
            document.getElementById("invalidPage").innerHTML = "";
            document.getElementById("invalidPage").innerHTML = "Product Type not Found";
            document.getElementById("invalidProduct").style.display = "block";
        }
    }
}

//Navigation to accept suite pages on button click from dashboard page
function LoadAcceptPage(pageType) {
    switch (pageType) {
        case "acceptJs": window.location.href = "index.html?producttype=acceptjs"; break;
        case "acceptUi": window.location.href = "index.html?producttype=acceptui"; break;
        case "acceptHosted": window.location.href = "index.html?producttype=accepthosted"; break;
        case "acceptCustomer": window.location.href = "index.html?producttype=acceptcustomer"; break;
    }

}

//On cancel button click, the user navigates back to dashboard page
function RedirectToDashboard() {
    window.location.href = "index_all.html";
}

//Below function is used to fetch the values of the parameters(producttype/customerid) passed in the URL. 
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//AcceptUI functionality implementation
function AcceptUI() {

    //To set the action URL for the payment form in Accept UI section
    var form = document.getElementById("paymentForm");
    form.setAttribute("action", globalVars.PageUrl);

    //To set values for accept UI Pay button
    var ele = document.getElementById("btnAcceptUI");

    //Below values are fetched from the constants.js file
    ele.setAttribute("data-apiLoginID", globalVars.ApiLoginID);
    ele.setAttribute("data-clientKey", globalVars.ClientKey);
}

//AcceptHosted functionality implementation
function AcceptHosted(id) {

    var customerId = id;

    // Below Ajax call to API to fetch token in response. Based on token form will be displayed
    $.ajax({
        type: 'GET',
        url: globalVars.AcceptHostedRequestUrl,//Value fetched from the constants.js file
        data: {
            apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
            apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
            iFrameCommunicatorUrl: globalVars.IFrameCommunicatorUrl,//Value fetched from the constants.js file
            customerId: customerId
        },
        contentType: "application/json; charset=utf-8",
		 dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.status)//if the response is success
            {
                //Assign the token value to the hidden field inside the form
                document.getElementById("hostedtoken").value = data.successValue;
                document.getElementById("send_hptoken").setAttribute("action", globalVars.HostedFormUrl);

                //submit form with token to load iframe
                document.getElementById("send_hptoken").submit();
                document.getElementById("acceptHosted").style.display = "block";
                document.getElementById("load_payment").style.display = "block";
            }
            else {

                //on failure, show error message 
                document.getElementById("msgHS").innerHTML = "";
                document.getElementById("msgHS").innerHTML = data.errorMessage;
                var element = document.getElementById("alertHS");
                element.classList.remove("alert-success");
                element.classList.add("alert-danger");
                element.style.display = "block";
                document.getElementById("acceptHosted").style.display = "block";
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            document.getElementById("msgHS").innerHTML = "";
            document.getElementById("msgHS").innerHTML = textStatus;
            var element = document.getElementById("alertHS");
            element.classList.remove("alert-success");
            element.classList.add("alert-danger");
            element.style.display = "block";
        }
    });
}

//to clear the modal dialog window values on reload
function ShowModal() {
    document.getElementById("txtCustomerId").value = "1813212446";
    document.getElementById("invalidCustomer").style.display = "none";
}

//On click of continue button in accept customer pop up in dashboard page
function Redirect() {
    document.getElementById("invalidCustomer").style.display = "none";
    customerId = document.getElementById("txtCustomerId").value;
    if (customerId == "") {
        document.getElementById("txtCustomerId").focus();
        document.getElementById("invalidCustomer").style.display = "inherit";
        document.getElementById("invalidCustomer").innerHTML = "Please enter Customer ID";
    }
    else {

        //Validation of customer id will be done by using the below function
        var result = ValidateCustomer(customerId);

        if (result.valid)//if it is a valid customer id
        {
            if (result.status) {
                window.location.href = "index.html?producttype=acceptcustomer&customerid=" + customerId;
                //if Customer id is already validated
                sessionStorage.setItem('isValidated', 'true');
            }
            else {
                document.getElementById("invalidCustomer").style.display = "inherit";
                document.getElementById("invalidCustomer").innerHTML = result.message;
            }
        }
        else {
            document.getElementById("invalidCustomer").style.display = "inherit";
            document.getElementById("invalidCustomer").innerHTML = result.message;
        }
    }
}

//ValidateCustomer function validates the customer id which is declared in the URL
function ValidateCustomer(id) {
    var customerId;
    customerId = id;
    var result = {};

    //Below ajax call to API to validate the customer id
    $.ajax({
        type: 'GET',
        url: globalVars.ValidateCustomerRequestUrl,//Value fetched from the constants.js file
        data: {
            apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
            apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
            customerId: customerId
        },
        async: false,
        contentType: "application/json; charset=utf-8",
		  dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var valid;
            if (data.status)// if it is valid id
            {
                valid = true;
            }
            else {
                valid = false;
            }
            result = {
                valid: valid,
                status: data.status,
                message: data.errorMessage
            };
        },
        error: function (data, textStatus, errorThrown) {
            result = {
                valid: false,
                status: false,
                message: textStatus
            };
        }
    });
    return result;
}

//AcceptCustomer functionality implementation
function AcceptCustomer(id) {
    var customerId = id;

    // Below Ajax call to API to fetch token in response. Based on token form will be displayed
    $.ajax({
        type: 'GET',
        url: globalVars.AcceptCustomerRequestUrl,//Value fetched from the constants.js file
        data: {
            apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
            apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
            customerId: customerId,
            iFrameCommunicatorUrl: globalVars.IFrameCommunicatorUrl//Value fetched from the constants.js file
        },
        contentType: "application/json; charset=utf-8",
		dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.status)//if response is success
            {
                //Assign the token value to the hidden field inside the form
                document.getElementById("custtoken").value = data.successValue;
                document.getElementById("send_token").setAttribute("action", globalVars.CustomerFormUrl);

                //Submit form with token to load iframe
                document.getElementById("send_token").submit();
                document.getElementById("load_profile").style.display = "block";
            }
            else {
                //on failure, show error message
                document.getElementById("msgCS").innerHTML = "";
                document.getElementById("msgCS").innerHTML = data.errorMessage;
                var element = document.getElementById("alertCS");
                element.classList.remove("alert-success");
                element.classList.add("alert-danger");
                element.style.display = "block";
            }
            document.getElementById("acceptCustomer").style.display = "block";
            document.getElementById("acceptCustomerId").style.display = "none";
            document.getElementById("acceptCustomerManage").style.display = "block";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            document.getElementById("msgCS").innerHTML = "";
            document.getElementById("msgHS").innerHTML = textStatus;
            var element = document.getElementById("alertCS");
            element.classList.remove("alert-success");
            element.classList.add("alert-danger");
            element.style.display = "block";
        }
    });
}

//Show details on click of info icon in accept customer pop up
function showInfo() {
    var display = document.getElementById("idScenarios").style.display;
    if (display == "block") {
        document.getElementById("idScenarios").style.display = "none";
    }
    else {
        document.getElementById("idScenarios").style.display = "block";
    }
}


//On click of radio buttons in Accept.js page
function showData(option) {
    document.getElementById("msg").innerHTML = "";
    document.getElementById("alert").style.display = "none";
    if (option == "card") {
        document.getElementById("bank").style.display = "none";
        document.getElementById("card").style.display = "block";
    }
    else {
        document.getElementById("card").style.display = "none";
        document.getElementById("bank").style.display = "block";
    }
    document.getElementById("btns").style.display = "block";
}

//Accept.js client side validation begin

//To validate fields in Accept JS form
function validatePaymentFields() {
    var sel = document.querySelector('input[name="optradio"]:checked').value;
    if (sel == "card") {
        var cardNo = document.getElementById("cardNumber");
        var expMonth = document.getElementById("expMonth");
        var expYear = document.getElementById("expYear");
        var currentYear = new Date();
        if (cardNo.value == "")
            cardNo.classList.add("error");
        else {
            cardNo.classList.remove("error");
            cardNo.classList.add("success");
        }
        if (expMonth.value == "")
            expMonth.classList.add("error");

        else {
            expMonth.classList.remove("error");
            expMonth.classList.add("success");
        }
        if (expYear.value == "")
            expYear.classList.add("error");

        else {
            expYear.classList.remove("error");
            expYear.classList.add("success");
        }
    }
    else {
        var accountNumber = document.getElementById("accountNumber");
        var routingNumber = document.getElementById("routingNumber");
        var nameOnAccount = document.getElementById("nameOnAccount");

        if (accountNumber.value == "")
            accountNumber.classList.add("error");
        else {
            accountNumber.classList.remove("error");
            accountNumber.classList.add("success");
        }
        if (routingNumber.value == "")
            routingNumber.classList.add("error");
        else {
            routingNumber.classList.remove("error");
            routingNumber.classList.add("success");
        }
        if (nameOnAccount.value == "")
            nameOnAccount.classList.add("error");
        else {
            nameOnAccount.classList.remove("error");
            nameOnAccount.classList.add("success");
        }
        //To get selected value of account type
        var radios = document.getElementsByName('acntradio');
        var val;
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                val = radios[i].value;
                break;
            }
            else {
                val = "";
            }
        }

        if (val == "" || val === null)
            document.querySelector('input[name="acntradio"]').classList.add("error");
        else {
            document.querySelector('input[name="acntradio"]').classList.remove("error");
            document.querySelector('input[name="acntradio"]').classList.add("success");
        }
    }

    var iserror = document.getElementById(sel).getElementsByClassName("error");
    if (iserror.length > 0)//if an element with error class exists
    {
        document.getElementById("msg").innerHTML = "";
        document.getElementById("msg").innerHTML = "Please provide all required fields";
        var element = document.getElementById("alert");
        element.classList.remove("alert-success");
        element.classList.add("alert-danger");
        element.style.display = "block";
        return "false";
    }
    else {
        return "true";
    }
}

//To restrict inputs to allow only numbers in Accept.js page
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//On entering value in textboxes, validate input in Accept.js page
function onTextInput(id) {
    var visa = ["4"];
    var JCb = ["3088"];
    var discover = ["6011", "64", "65"];
    var amex = ["37", "34"];
    var dinersClub = ["38"];
    var masterCard = ["51", "52", "53", "54", "55", "2221", "2222", "2223"];
    var element = document.getElementById(id);
    var cardNumElem = document.querySelector('input[name="cardNumber"]');
    var currentYear = new Date();
    if (element.value == "") {
        cardNumElem.classList.remove("icon-type-mastercard");
        cardNumElem.classList.remove("icon-type-dinersclub");
        cardNumElem.classList.remove("icon-type-amex");
        cardNumElem.classList.remove("icon-type-discover");
        cardNumElem.classList.remove("icon-type-jcb");
        cardNumElem.classList.remove("icon-type-visa");
    }


    if (id == "cardNumber" && element.value != "") {

        if (visa.indexOf(element.value) > -1 || visa.indexOf((element.value).substring(0, 1)) > -1) {
            cardNumElem.classList.add("icon-type-visa");
        }
        else if (JCb.indexOf(element.value) > -1 || JCb.indexOf((element.value).substring(0, 4)) > -1) {
            cardNumElem.classList.add("icon-type-jcb");
        }
        else if (discover.indexOf(element.value) > -1 || discover.indexOf((element.value).substring(0, 4)) > -1 || discover.indexOf((element.value).substring(0, 2)) > -1) {
            cardNumElem.classList.add("icon-type-discover");
        }
        else if (amex.indexOf(element.value) > -1 || amex.indexOf((element.value).substring(0, 2)) > -1) {
            cardNumElem.classList.add("icon-type-amex");
        }
        else if (dinersClub.indexOf(element.value) > -1 || dinersClub.indexOf((element.value).substring(0, 2)) > -1) {
            cardNumElem.classList.add("icon-type-dinersclub");
        }
        else if (masterCard.indexOf(element.value) > -1 || masterCard.indexOf((element.value).substring(0, 4)) > -1 || masterCard.indexOf((element.value).substring(0, 2)) > -1) {
            cardNumElem.classList.add("icon-type-mastercard");
        }
        else {
            cardNumElem.classList.remove("icon-type-mastercard");
            cardNumElem.classList.remove("icon-type-dinersclub");
            cardNumElem.classList.remove("icon-type-amex");
            cardNumElem.classList.remove("icon-type-discover");
            cardNumElem.classList.remove("icon-type-jcb");
            cardNumElem.classList.remove("icon-type-visa");
        }
    }

    if (id == "expMonth") {
        var data = element.value;
        if (!(data >= 1 && data <= 12))//To check month in range 1-12
        {
            document.getElementById("expMonth").value = "";
            element.classList.remove("success");
            element.classList.add("invalid");
        }
        else {
            if (element.value != "") {
                element.classList.remove("invalid");
                element.classList.add("success");
            }
        }
    }

    else {
        if (element.value != "") {
            element.classList.remove("invalid");
            element.classList.remove("error");
            element.classList.add("success");
        }
        else {
            element.classList.remove("invalid");
            element.classList.remove("success");
            element.classList.add("error");
        }
    }
}

//Accept.js client side validation end

//Send payment information on Pay button click in Accept.js page
function sendPaymentDataToAnet() {
    var isvalid = validatePaymentFields();

    //if all fields are valid
    if (isvalid == "true") {
        var authData = {};
        authData.clientKey = globalVars.ClientKey;//Value fetched from the constants.js file
        authData.apiLoginID = globalVars.ApiLoginID;//Value fetched from the constants.js file

        var sel = document.querySelector('input[name="optradio"]:checked').value;

        //Based on the value selected from the radio buttons, either card or bank
        if (sel == "card") {
            var cardData = {};
            cardData.cardNumber = document.getElementById("cardNumber").value;
            cardData.month = document.getElementById("expMonth").value;
            cardData.year = document.getElementById("expYear").value;
            cardData.cardCode = document.getElementById("cardCode").value;
        }
        else {
            var bankData = {};
            bankData.accountNumber = document.getElementById('accountNumber').value;
            bankData.routingNumber = document.getElementById('routingNumber').value;
            bankData.nameOnAccount = document.getElementById('nameOnAccount').value;
            bankData.accountType = document.querySelector('input[name="acntradio"]:checked').value;
        }
        var secureData = {};
        secureData.authData = authData;
        if (sel == "card")
            secureData.cardData = cardData;
        else
            secureData.bankData = bankData;

        //Sending payment data to dispatch data method which is available in accept JS plugin
        Accept.dispatchData(secureData, responseHandler);

    }
}

//Response handler for accept js and accept ui
function responseHandler(response) {

    //if errors occured
    if (response.messages.resultCode === "Error") {
        var i = 0;
        var container = document.getElementById("msg");
        container.innerHTML = "";
        var value = "";
        var element;
        var node;
        element = document.createElement("p");
        node = document.createTextNode("Error Details :");
        element.appendChild(node);
        container.appendChild(element);

        //To display all errors occured
        while (i < response.messages.message.length) {
            var value = response.messages.message[i].code + ": " +
                response.messages.message[i].text;

            //To add error messages to a div
            element = document.createElement("p");
            node = document.createTextNode(value);
            element.appendChild(node);

            container.appendChild(element);
            i = i + 1;
        }
        var msgdiv = document.getElementById("alert");
        msgdiv.classList.remove("alert-success");
        msgdiv.classList.add("alert-danger");
        msgdiv.style.display = "block";
    }
    else {

        //if it is accept ui
        if (activeCont == "acceptui") {
            document.getElementById("dataDescriptor").value = response.opaqueData.dataDescriptor;
            document.getElementById("dataValue").value = response.opaqueData.dataValue;
            document.getElementById("alertUI").style.display = "none";
            var tokenVal = document.getElementById("dataValue").value;

            // Ajax call to API by passing token. Based on the response, if payment gets success confirmation page is displayed to the user
            $.ajax({
                type: 'GET',
                url: globalVars.AcceptJSRequestUrl,//Value fetched from the constants.js file
                data: {
                    apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
                    apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
                    token: tokenVal

                },
                contentType: "application/json; charset=utf-8",
				dataType: "json",
                success: function (data, textStatus, jqXHR) {

                    document.getElementById("msgUI").innerHTML = "";
                    if (data.status)//if payment succeeded
                    {
                        //To disable pay button
                        document.getElementById("btnAcceptUI").disabled = true;

                        //To append current datetime and transaction id in confirmation page
                        var currentdate = new Date();
                        document.getElementById("orderIDUI").innerHTML = data.successValue;
                        document.getElementById("orderDateUI").innerHTML = currentdate;
                        document.getElementById("cartUI").style.display = "none";
                        document.getElementById("confirmDivUI").style.display = "block";
                    }
                    else {
                        //on failure, show error message
                        document.getElementById("msgUI").innerHTML = data.errorMessage;
                        var element = document.getElementById("alertUI");
                        element.classList.remove("alert-success");
                        element.classList.add("alert-danger");
                        element.style.display = "block";
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    document.getElementById("msgUI").innerHTML = "";
                    document.getElementById("msgUI").innerHTML = textStatus;
                    var element = document.getElementById("alertUI");
                    element.classList.remove("alert-success");
                    element.classList.add("alert-danger");
                    element.style.display = "block";
                }
            });

        }
        //if it is accept js
        else {
            paymentFormUpdate(response.opaqueData);
        }
    }
}

//Accept.js paymentFormUpdate functionality implementation
function paymentFormUpdate(opaqueData) {

    document.getElementById("dataDescriptor").value = opaqueData.dataDescriptor;
    document.getElementById("dataValue").value = opaqueData.dataValue;

    // If using your own form to collect the sensitive data from the customer,
    // blank out the fields before submitting them to your server.
    //Clear all fields on submit in accept js
    document.getElementById("cardNumber").value = "";
    document.getElementById("expMonth").value = "";
    document.getElementById("expYear").value = "";
    document.getElementById("cardCode").value = "";
    document.getElementById("accountNumber").value = "";
    document.getElementById("routingNumber").value = "";
    document.getElementById("nameOnAccount").value = "";
    var rds = document.getElementsByName("acntradio");
    var cardNumElem = document.querySelector('input[name="cardNumber"]');
    if (cardNumElem.value == "") {
        cardNumElem.classList.remove("icon-type-mastercard");
        cardNumElem.classList.remove("icon-type-dinersclub");
        cardNumElem.classList.remove("icon-type-amex");
        cardNumElem.classList.remove("icon-type-discover");
        cardNumElem.classList.remove("icon-type-jcb");
        cardNumElem.classList.remove("icon-type-visa");
    }

    //Remove all error and success classes for fields
    for (var i = 0; i < rds.length; i++)
        rds[i].checked = false;

    var element = document.getElementsByClassName('error');
    while (element.length)
        element[0].classList.remove("error");

    element = document.getElementsByClassName('success');
    while (element.length)
        element[0].classList.remove("success");

    document.getElementById("alert").style.display = "none";

    var tokenVal = document.getElementById("dataValue").value;

    // Ajax call to API by passing token.Based on the response, if payment gets success confirmation page is displayed to the user
    $.ajax({
        type: 'GET',
        url: globalVars.AcceptJSRequestUrl,//Value fetched from the constants.js file
        data: {
            apiLoginId: globalVars.ApiLoginID,//Value fetched from the constants.js file
            apiTransactionKey: globalVars.ApiTransactionKey,//Value fetched from the constants.js file
            token: tokenVal
        },
        contentType: "application/json; charset=utf-8",
		dataType: "json",
        success: function (data, textStatus, jqXHR) {
            document.getElementById("msg").innerHTML = "";

            if (data.status)//if payment succeeded
            {
                //To disable pay button
                document.getElementById("btnPayJS").disabled = true;

                //To append current datetime and transaction id in confirmation page
                var currentdate = new Date();
                document.getElementById("orderIDJS").innerHTML = data.successValue;
                document.getElementById("orderDateJS").innerHTML = currentdate;
                document.getElementById("cartJS").style.display = "none";
                document.getElementById("paymentDivJS").style.display = "none";
                document.getElementById("confirmDivJS").style.display = "block";
            }
            else {
                //on failure, show error message
                document.getElementById("msg").innerHTML = data.errorMessage;
                var element = document.getElementById("alert");
                element.classList.remove("alert-success");
                element.classList.add("alert-danger");
                element.style.display = "block";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            document.getElementById("msg").innerHTML = "";
            document.getElementById("msg").innerHTML = textStatus;
            var element = document.getElementById("alert");
            element.classList.remove("alert-success");
            element.classList.add("alert-danger");
            element.style.display = "block";
        }
    });
}

//To close accept customer pop up on cancel button click
function CloseAcceptCustomer() {
    window.location.href = "index_all.html";
}

//iframeCommunicator for accept hosted and accept customer
window.CommunicationHandler = {};
function parseQueryString(str) {
    var vars = [];
    var arr = str.split('&');
    var pair;
    for (var i = 0; i < arr.length; i++) {
        pair = arr[i].split('=');
        vars[pair[0]] = unescape(pair[1]);
    }
    return vars;
}
//Methods for accept hosted iframes that executes on receiving message in iframeCommunicator
CommunicationHandler.onReceiveCommunication = function (argument) {
    params = parseQueryString(argument.qstr)
    parentFrame = argument.parent.split('/')[4];
    frame = null;
    switch (parentFrame) {
        case "manage": frame = document.getElementById("load_profile"); break;
        case "payment": frame = document.getElementById("load_payment"); break;
    }

    switch (params['action']) {
        //To resize iframe
        case "resizeWindow": if (parentFrame == "manage" && parseInt(params['height']) < 1150) {
            //Currently the height and width is adjusted through css
            //params['height']=450;
            //params['width']=800;
        }
            if (parentFrame == "payment" && parseInt(params['height']) < 1000) {
                //Currently the height and width is adjusted through css
                //params['height']=330;
                //params['width']=50;
            }
            if (parentFrame == "payment" && getComputedStyle(document.querySelector(".w100")).width < "687.297px") {
                params['height'] = +params['height'] + 100;
                frame.height = parseInt(params['height']);
                frame.width = parseInt(params['width']);
            }
            else {
                frame.height = parseInt(params['height']);
                frame.width = parseInt(params['width']);
            }

            break;

        case "successfulSave": $('#myModal').modal('hide'); location.reload(false); break;

        case "cancel":
            if (parentFrame == "payment") {
                window.location.href = 'index_all.html';
            }
        //On successful payment in Accept Hosted
        case "transactResponse":
            var transResponse = JSON.parse(params['response']);
            if (parentFrame == "payment") {

                //To hide payment and cart panels and show confirmation page
                document.getElementById("cartHosted").style.display = "none";
                document.getElementById("hostedPayment").style.display = "none";

                //To append current time and date in confirmation page
                var currentdate = new Date(transResponse.dateTime + ' UTC');
                document.getElementById("orderIDHosted").innerHTML = transResponse.transId;
                document.getElementById("orderDateHosted").innerHTML = currentdate;
                document.getElementById("confirmDivHosted").classList.add("hostedPage");
                document.getElementById("confirmDivHosted").style.display = "block";
            }

    }
}
