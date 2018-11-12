$('#menu > li').on('click', function(event){
	event.preventDefault();

	
	let $currentElement = $(this);

	let sectionName = $currentElement.attr('class');

	if(sectionName=="transactions" || sectionName=="collection" || sectionName=="market"){
		let jsonToSend ={
			"action" : "requestUpdateSession"
		};
	
		$.ajax({
			url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			dataType : "json",
			contentType : "application/json",
			success : function(data){
				console.log(data);
				$(location).attr('href', './' + sectionName + '.html');
			},
			error: function(err){
				console.log(err);
				alert(err.responseText);
				$(location).attr("href", "./login.html");
			}
		});
		}
		else{
			$(location).attr('href', './' + sectionName + '.html');
		}
});

function updateSession(){
	let jsonToSend ={
			"action" : "requestUpdateSession"
		};
	$.ajax({
		url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			dataType : "json",
			contentType : "application/json",
			success : function(data){
				console.log(data);
				$('#currentUser').text(data.uName);
			},
			error: function(err){
				console.log(err);

			}
	});
}

function updateCollection(){

	let jsonToSend ={
		"action" : "updateCollection",
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	        var newHtml = "";
        	newHtml += `<table>
        				<tr>
	        				<th>ID</th>
	        				<th>Card Name</th>
	        				<th></th>
	        				<th></th>
	        				<th>Input a price and sell a copy!</th>
        				</tr>`;
	        for(i = 0; i < data.length; i++)
	        {
	        	newHtml += `<tr>
	        				<td>${data[i].id}</td>
                			<td>${data[i].name} <b>x${data[i].copies}</b></td>
		                    <td><img src = "./images/${data[i].color}.png" height="20" width="20"></td>
		                    <td><img src = "./images/${data[i].rarity}.png" height="20" width="35"></td>
		                    <td>
		                    	$<input type="number" min="1" step="0.01" id="userSearch"></input>
		                    	<button id="${data[i].id}" class = "sellCardButton buttons">Sell x1</button>
		                    </td>
		                    </tr>`;
	        }
	        newHtml += `</table>`;
	        $("#collectionContainer").html(""); 
	        $("#collectionContainer").append(newHtml);
	    },
	    error: function(error){
	        console.log(error.statusText);
	        var newHtml = "";
        	
	        $("#collectionContainer").html(""); 
	        $("#collectionContainer").append(newHtml);
	    }
	});
}

$("#addCardButton").on("click", function(event){
	event.preventDefault();

	let $id = $("#addCardId").val();

	if($id < 1 || $id > 150)
	{
		alert("Card does not exists in collection. \n Verify card ID.");
		return;
	}

	let jsonToSend ={
		"action" : "addCardToCollection",
		"id" : $id
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	    	console.log(data);			
	    },
	    error: function(error){
	        console.log(error.statusText);
	    }
	});
	updateCollection();
});

jQuery(document).on('click', '.sellCardButton', function (event) 
{
	let $cardId = this.id;
	let $priceInput = $(this).prev();
	let $price = $priceInput.val();

	if($price == "")
	{
		alert("Please input a price");
		return;
	}

	let jsonToSend ={
		"action" : "sellCard",
		"cardId" : $cardId,
		"price" : $price
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	    	console.log(data);
			alert("Card listing added to Market");
	    },
	    error: function(error){
	        console.log(error.statusText);
	    }
	});
	updateCollection();
});

$('#logOut').on('click',function(event){
	let jsonToSend ={
			"action" : "logoout"
	};
	
	$.ajax({
			url : "./data/applicationLayer.php",
			type : "GET",
			data : jsonToSend,
			dataType : "json",
			contentType : "application/json",
			success : function(data){
				console.log(data);
				$(location).attr("href", "./login.html");
			},
			error: function(err){
				console.log(err);
				alert(err.responseText);
				$(location).attr("href", "./login.html");
			}
		});
});

updateSession();
updateCollection();
