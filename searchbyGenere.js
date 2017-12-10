//Created By Group:5
//global variable
var xhr;

//page load Event Listener
window.addEventListener("load",function(){
	document.getElementById("Fantasy").addEventListener("click",function(){searchbyGenere(this.id)},false);
	document.getElementById("Mystery").addEventListener("click",function() {searchbyGenere(this.id)},false);
	document.getElementById("Comic").addEventListener("click",function(){searchbyGenere(this.id)},false);
},false);

function searchbyGenere(genere){
	try{
	//xhr object instance created
	xhr = new XMLHttpRequest; 
		//request the xml file
		xhr.open("GET", "displayBooks.xml", false);
		xhr.send(null);
		var bookArrayList = xhr.responseXML.getElementsByTagName("books");		
		var label = document.getElementById("bookList");
		
		while(label.firstChild){
		label.removeChild(label.firstChild)
		}
		for(var i=0; i<bookArrayList.length; i++){	
			//img tag to display the book image		
			var bookImg = bookArrayList.item(i).getElementsByTagName("bookImg").item(0).firstChild.nodeValue;
			var bookGenre = bookArrayList.item(i).getElementsByTagName("genre").item(0).firstChild.nodeValue;
			if(bookGenre == genere){
			var bookName = bookArrayList.item(i).getElementsByTagName("name").item(0).firstChild.nodeValue;
			var bookAuthor = bookArrayList.item(i).getElementsByTagName("author").item(0).firstChild.nodeValue;
			var bookDescription = bookArrayList.item(i).getElementsByTagName("description").item(0).firstChild.nodeValue;
			var bookPrice = bookArrayList.item(i).getElementsByTagName("price").item(0).firstChild.nodeValue;
			
			var fantasyImage = document.createElement("img");
			fantasyImage.src = bookImg;
			fantasyImage.alt = bookName;	
					
			//div tag for an image
			var divTag = document.createElement("div");
			divTag.className ="aboutBook";			
			
             //h2 tag to display bookGenre			
			var genreTag = document.createElement("h2");
			genreTag.innerHTML =bookGenre;
			//h2 tag to display bookName
			var hTag = document.createElement("h2");
			hTag.innerHTML = bookName;
			//h3 tag to display bookAuthor
			var authorDetails = document.createElement("h3");
			authorDetails.innerHTML = bookAuthor;
			
			var descDetails = document.createElement("i");
			descDetails.innerHTML = bookDescription;
			//p tag to display price
			var priceDetails = document.createElement("p");
			priceDetails.innerHTML = "Price: $"+bookPrice;
			
			var brTag = document.createElement("br");
			
			//Button to add books to cart
			var buttonTag = document.createElement("input");
			buttonTag.type = "button";
			buttonTag.value = "Pick a Book";
			buttonTag.id = bookName;
			buttonTag.className = "button";
			//added event listener for the buttons
			buttonTag.addEventListener("click", function(){
				addToCart(this.id);				
			},false);	
			document.getElementById("bookList").appendChild(divTag);			
			divTag.appendChild(fantasyImage);			
			divTag.appendChild(genreTag);
			
			divTag.appendChild(hTag);
			divTag.appendChild(authorDetails);
			divTag.appendChild(descDetails);
			divTag.appendChild(priceDetails);
			divTag.appendChild(buttonTag);
}
			
		}//end for loop
	document.getElementById("bookList").appendChild(brTag);
	}catch(err){
		alert("Error: "+err);
	}//end try/catch block
}//end function searchbyGenere

function addToCart(name){
	try{
		//xhr object instance created
		xhr = new XMLHttpRequest; 
		//call back function
		xhr.addEventListener("readystatechange",function(){
			if(xhr.readyState==4 && xhr.status==200 && xhr.responseXML){
				var bookArrayList = xhr.responseXML.getElementsByTagName("books");	
				for(var i=0; i<bookArrayList.length; i++){
					var bookName = bookArrayList.item(i).getElementsByTagName("name").item(0).firstChild.nodeValue;
					if(bookName == name){
						//match found
						var bookPrice = bookArrayList.item(i).getElementsByTagName("price").item(0).firstChild.nodeValue;
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
	}
}//end function addToCart