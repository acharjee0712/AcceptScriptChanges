# Accept Suite Integration with .Net Core WEB API

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Pre-requisites to work on donet Authorize.Net suite

The below are the pre-requisites .
*	Windows 10 professional
*	Internet information services 10

## Very detailed explanation of each product type.
Authorized.Net Accept suite has below products.
*	Accept JS
*	Accept UI
*	Accept Hosted
*	Accept Customer

Detailed explanation of each product are available in the below links.
https://developer.authorize.net/api/reference/features/accept.html
https://developer.authorize.net/api/reference/features/acceptjs.html
https://developer.authorize.net/api/reference/features/accept_hosted.html
https://developer.authorize.net/api/reference/features/customer_profiles.html#Using_the_Accept_Customer_Hosted_Form

## Integration
Constants.js file consists of required URLs that are used for WEB API calls and constant parameters that are used throughout the application.

Below are the URLs that are passed as parameters in script through Ajax calls to invoke the respective WEB API. For this the web service application should be hosted locally and IP address has to be provided in the URL path. 

* AcceptJSRequestUrl : URL to invoke Accept JS web service on payment.
![Image of AcceptJSRequestUrl](Github-Images/AcceptJSRequestUrl.PNG)
* AcceptHostedRequestUrl : URL to get the token value for Accept Hosted.
![Image of HostedRequestUrl](Github-Images/HostedRequestUrl.PNG)
* AcceptCustomerRequestUrl : URL to get the token value for Accept Customer.
![Image of CustomerRequestUrl](Github-Images/CustomerRequestUrl.PNG)
* ValidateCustomerRequestUrl : URL to invoke a web api method to validated customer ID.
![Image of ValidateCustomerUrl](Github-Images/ValidateCustomerUrl.PNG)
 
Below URLs are used to submit form with token value inorder to load the payment form.

* HostedFormUrl : Used for Accept Hosted form.
![Image of HostedFormUrl](Github-Images/HostedFormUrl.PNG)
* CustomerFormUrl : Used for Accept Customer form.
![Image of CustomerFormUrl](Github-Images/CustomerFormUrl.PNG)
 
The following are the parameters with values that remains constant throughout the application. These parameters are used in script through Ajax calls for performing payments.

* ClientKey 
![Image of clientKey](Github-Images/clientKey.PNG)

* ApiLoginID
![Image of apiLogin](Github-Images/apiLogin.PNG)

* ApiTransactionKey
![Image of apiTransactionKey](Github-Images/apiTransactionKey.PNG)


### Create Website on IIS

*	Open IIS as Administrator.

*	Right click on sites and select “Add Website”. 

*	Provide Site name and physical path to the app’s deployment folder(C:\inetpub\wwwroot\Publish)

*	Choose https binding.

* 	Select SSL Certificate from drop down.

*   Click OK.

	![Add-Website](Github-Images/Add-Website.png)

## browse the website

Sample URL: https://10.173.192.248:5008/index_all.html

![Image of dashboard](Github-Images/dashboard.PNG)