//Created By Group:5
//event listener for page load
window.addEventListener("load", function(){
	//checkoutButton will be hidden
	document.getElementById("checkoutButton").style.visibility = "hidden";
	
	//displays cart items when the page loads.
	loadCartItems(); 
}, false);

function loadCartItems(){
	//empty array
	var lsKeys = [] 
	//gets the length of the localStorage array
	var length = localStorage.length; 
	
	//empty string to display the message
	var messageString = "";
	if(localStorage.length==0){
		document.getElementById("checkoutButton").style.visibility = "hidden";
		messageString = "No books in the cart";		
	}else{
		document.getElementById("checkoutButton").style.visibility = "visible";
		for (var i =0; i < length; i++){
			//creates an array of all keys.
			lsKeys[i] = localStorage.key(i);					
		} //end for
		
		lsKeys.sort(); 
		//now get the values from the local storage	
		for (var i in lsKeys){
			var lsValue = localStorage.getItem(lsKeys[i]);
			messageString += " <b>" + lsKeys[i]+ "</b> "+"</br>";	
			messageString += "$" + lsValue +" </br>";	
			messageString += " <p><input type='button' class='button' id= '" + lsKeys[i] + "' value='Delete' onclick='deleteItems(id)'/></p> ";
		}//end for 	
	}//end if/else
	
	//display the cart details on the page
	document.getElementById("myCart").innerHTML = "<h1>Please check your cart</h1>"+ messageString;
}//end function loadCartItems 
	
function deleteItems(itemKey){
	//item will be removed
	localStorage.removeItem(itemKey);
	//update the cart details
	loadCartItems();	
}//end function deleteFavs