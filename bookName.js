//created by Group 5
var xhr;
//page load Event Listener
window.addEventListener("load",function(){
	//calling the function to display books
	bookNameDropdown();		
	document.getElementById("orderSection").style.visibility = "hidden";
	document.getElementById("bookDetails").addEventListener("change",function(){
	//selecting the index of the book
	var selectIndex = document.getElementById("bookDetails").selectedIndex;
	//selecting the book based on index
	var bookSelected = document.getElementById("bookDetails").options[selectIndex].value;
	document.getElementById("orderNowButton").addEventListener("click",function(){
		//adding the selected book to the cart
		addToCart(bookSelected)
	},false);
	
	//displaying the information of the selected book	
	fetchInformation(bookSelected);
	},false);
		
},false);



function bookNameDropdown(){

		
		var selectObject = $("#bookDetails");
		selectObject.append("<option>Pick a Book </option>");
		//using the asynchronous method to display book name in the dropdown
			$.ajax({
				//method type
				type: "GET",
				//specifying the XML File
				url: "displayBooks.xml",
				success: function(data){
				$(data).find("books").each(function(){
				//getting the name from the XML file
			    var book = $(this).find("name").text();
				//appending the book name to the dropdown
				selectObject.append("<option>"+book+"</option>");
				});
				}
			});
}//end function bookNameDropdown

	
	

function fetchInformation(book){
	try{
		//xhr object instance created
		var xhr=new XMLHttpRequest;
		xhr.addEventListener("readystatechange",function(){
			if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseXML){
				//xhr req complete, and we have xml file.
				var bookArray = xhr.responseXML.getElementsByTagName("books");
				//loop through states Array and find if there is a match.
				var descriptionBook;
				var price;
				var bookImg;
				var matchBoolean=false;
				var i=0;
				//while loop
				while(matchBoolean == false){
					var xmlBook = bookArray.item(i);
					var xmlBookName = xmlBook.getElementsByTagName("name").item(0).firstChild.nodeValue;
				
					if(xmlBookName == book){
						//match found	
						document.getElementById("orderSection").style.visibility = "visible";
						bookImg = xmlBook.getElementsByTagName("bookImg").item(0).firstChild.nodeValue;
						bookGenre = xmlBook.getElementsByTagName("genre").item(0).firstChild.nodeValue;
						bookAuthor =  xmlBook.getElementsByTagName("author").item(0).firstChild.nodeValue;
						descriptionBook=xmlBook.getElementsByTagName("description").item(0).firstChild.nodeValue;
						price=xmlBook.getElementsByTagName("price").item(0).firstChild.nodeValue;
						
						//display the information of the book
						document.getElementById("imageBook").src = bookImg;
						document.getElementById("detailsLabel").innerHTML = "<h3>"+ book +"</h3>"+ "<h3>" + bookGenre+ "</h3>"+ "<h3>" + bookAuthor+ "</h3>" + descriptionBook;
						document.getElementById("price").innerHTML = "Price: "+ "$"+price+".";
						matchBoolean=true;
						break;
						
					}else{
						document.getElementById("orderSection").style.visibility = "hidden";
					}//end if/else
					i++;
			}//end while
		}//end if
	},false);
		xhr.open("GET","displayBooks.xml",true);
		xhr.send(null);
	}catch(exception){
		alert("Asynchronous Request Failed."+ exception);
	}//end try/catch
	
} //end function fetchInformation


function addToCart(bookSelected){
	   try{ 
		//xhr object instance created
		xhr = new XMLHttpRequest; 
		//call back function
		xhr.addEventListener("readystatechange",function(){
			
			if(xhr.readyState==4 && xhr.status==200 && xhr.responseXML){
				var fantasayArrayList = xhr.responseXML.getElementsByTagName("books");	
				for(var i=0; i<fantasayArrayList.length; i++){
					var bookName = fantasayArrayList.item(i).getElementsByTagName("name").item(0).firstChild.nodeValue;
					if(bookName == bookSelected){
						//match found
						var bookPrice = fantasayArrayList.item(i).getElementsByTagName("price").item(0).firstChild.nodeValue;
	
						//set the values in the local storage
						localStorage.setItem(bookName,bookPrice);
						alert(bookName+" added to the cart.");
						break;
					}//end inner if
					
				}//end for
			}//end if
		},false);
		//request the xml file
		xhr.open("GET", "displayBooks.xml", true);
		xhr.send(null);
	}catch(err){
		alert("Error: "+err);
	}//end try/catch block
}
