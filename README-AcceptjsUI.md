# Accept.js with UI Description

In this we embed the built-in ANET hosted form in our application to capture and send sensitive payment information directly to Authorize.Net.

##Workflow

By default shopping cart information is displayed on the page. A Pay button is defined on the page and when the customer clicks the button a pop up with built-in hosted Payment form is opened. 
There is a predefined angular directive for button, just need fill the values for button.

[button image]

[pop up image]

The customer fills the payment information in the form, and clicks the pay button.The Accept script sends the payment information directly to Authorize.Net and receives a payment nonce. The script passes the payment nonce to the response handler function for the button which we have defined and
from response handler function we will receive the payment nonce/token.

[image]

After receiving the payment nonce / token, we will pass this token along with other non payment details to the AcceptJSRequestUrl web API.

Accept JS plugin has been developed by the VISA Team and Dispatch Data functionality is already present in that plugin. Accept.js extracts the payment details from customer’s form and sends them directly from the customer's web browser to Authorize.Net, which returns a payment nonce/token.

[image]

After receiving the payment nonce / token, we will pass this token and other required details to AcceptJSRequestUrl web API. Based on the response code whether Success / Failed we will read the response and will display the confirmation page on the screen.

[image]