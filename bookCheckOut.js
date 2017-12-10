//Created By Group:5
//variable declarations
var total=0;
var tax=0;
var maintotal = 0;
// declaring an empty Array 
var lsKeys = []; 
// gets the length of the localstorage array
var length = localStorage.length; 
//empty string to display the message
var messageString = "";	

// page load event listeners
window.addEventListener("load", function(){	
	//event listener for the button confirmButton
	document.getElementById("confirmButton").addEventListener("click",placeOrder,false);
	//displays cart items when the page loads.
	loadCartItems(); 
}, false); 


//function to verify name
function verifyName(name){
	var bool = false;
	
	for(var i=0; i<name.length;i++){
		var num = name.charCodeAt(i)
		//checking if name contains only alphabets
		if((num > 64 && num < 91) || (num > 96 && num < 123)|| num==32){
			bool=true;
			}//end if
	}//end for
	if(bool==false){
		alert("Please enter a valid name");
		return false;
	}//end if
	if(name.length == 0 ){
		 alert("Please Enter Name");
		 return false;
	}//end if
	if(name.trim()==""){
		alert("Please enter valid name");
		return false;
	}//end if
	return true;
}//end function verifyName


//function to verify email
function verifyEmail(email){
	//if length is zero
	if(email.length == 0 ){
		 alert("Please Enter an Email ID");
		 return false;
	}//end if
	if(email.trim()==""){
		alert("Please Enter valid email");
		return false;
	}//end if
	//checks if email includes @
	if(email.includes("@")){
		//checks if email includes "."
		var number = email.length - email.lastIndexOf(".") - 1;
		if(number == 3 || number == 2)
			return true;
		else
			alert("Please enter a valid Email ID");
	}//end if
	else
		alert("Please enter a valid Email ID");
}// end function verifyEmail

//function to verify phonenumber
function verifyContact(phone){
	//checks if the number has 10 digits and is not empty
	if(phone.length != 10 || phone == NaN ){
		 alert("Please enter a valid Phone Number");
		 return false;
	}//end if
	return true;
}//end function verifyContact


function placeOrder() {
	//variables to fetch TextBox values
	var name = document.getElementById("nameTextBox").value;
	var email = document.getElementById("emailTextBox").value;
	var phone = document.getElementById("phoneTextBox").value;
	
	if(verifyName(name)){
		if(verifyEmail(email)){
			if(verifyContact(phone)){
				document.getElementById("taxDetails").innerHTML = "<h3>Order received.</h3> Hi, "+name+
															"!!<br/> Thank you for visiting our store! <br/><br/><b>Bill Details</b><br/><b>Total: $"
															+total.toFixed(2)+"</b><br/><b>You Pay after Discount: $"+maintotal.toFixed(2)+"</b>";
				localStorage.clear();
			}//end if verifyContact(phone)
		}// end if verifyEmail(email))
	}// end if verifyName(name)
} // end function placeOrder



function loadCartItems(){	
	for (var i =0; i < length; i++){
		//creates an array of all keys.	
		lsKeys[i] = localStorage.key(i);			
	} //end for
	
	// sort the keys array.
	lsKeys.sort(); 
	
	//now get the values from the local storage	
	messageString += " Number of books ordered: "+length + "</br>" ;
	for (var lsKey in lsKeys){
		var lsValue = localStorage.getItem(lsKeys[lsKey]);
		total += parseFloat(lsValue);
		
		messageString += " <b>" + lsKeys[lsKey]+ "</b>" + "</br>" ;	
		messageString += "$" + lsValue+ "</br>" ;							
	}	
		messageString += "Your Bill: " +"$"+total.toFixed(2);
		
		//switch case to apply discount
	switch(true){
		case(total>=25 && total<50):
		maintotal = parseInt(total-(0.05*total));
		break;
		case(total>=50 && total<75):
		maintotal = parseInt(total-(0.10*total));
		break;
		case(total>=75 && total<100):
		maintotal = parseFloat(total-(0.15*total));
		break;
		break;
		case(total>=100):
		maintotal = parseFloat(total-(0.25*total));
		break;
		default:
		maintotal = parseFloat(total);
	}
	
	//display the order details
	document.getElementById("cartDetails").innerHTML = "<h1>Your order</h1>"+ messageString;	
}//end function loadCartItems 