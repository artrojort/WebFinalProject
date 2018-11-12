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
				$('#currentUser').val(data.uName);
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

function updateReservations(){

	let jsonToSend ={
		"action" : "updateReservations",
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	        var newHtml = "";
        	newHtml += `
        				<table>
        				<tr>
	        				<th>ID</th>
	        				<th>Card Name</th>
	        				<th></th>
	        				<th></th>
	        				<th>Price</th>
	        				<th>Seller</th>
	        				<th>Seller email</th>
	        				<th>Remove reservation</th>
        				</tr>`;
	        for(i = 0; i < data.length; i++)
	        {
	        	newHtml += `<tr>
	        				<td>${data[i].id}</td>
                			<td>${data[i].name}</td>
		                    <td><img src = "./images/${data[i].color}.png" height="20" width="20"></td>
		                    <td><img src = "./images/${data[i].rarity}.png" height="20" width="35"></td>
		                    <td>$${data[i].price}</td>
		                    <td>${data[i].seller}</td>
		                    <td>${data[i].email}</td>
		                    <td>
		                    	<button id="${data[i].tId}" class = "removeReserveButton buttons">Remove</button>
		                    </td>
		                    </tr>`;
	        }
	        newHtml += `</table>`;
	        $("#reservedContainer").html(""); 
	        $("#reservedContainer").append(newHtml);
	    },
	    error: function(error){
	        console.log(error.statusText);
	        var newHtml = "";
        	
	        $("#reservedContainer").html(""); 
	        $("#reservedContainer").append(newHtml);
	    }
	});
}

function updateListings(){

	let jsonToSend ={
		"action" : "updateListings",
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	        var newHtml = "";
        	newHtml += `
        				<table>
        				<tr>
	        				<th>ID</th>
	        				<th>Card Name</th>
	        				<th></th>
	        				<th></th>
	        				<th>Price</th>
	        				<th>Status</th>
	        				<th>Remove reservation</th>
        				</tr>`;
	        for(i = 0; i < data.length; i++)
	        {
	        	newHtml += `<tr>
	        				<td>${data[i].id}</td>
                			<td>${data[i].name}</td>
		                    <td><img src = "./images/${data[i].color}.png" height="20" width="20"></td>
		                    <td><img src = "./images/${data[i].rarity}.png" height="20" width="35"></td>
		                    <td>$${data[i].price}</td>`;
		                    
                if(data[i].buyer == null)
                {
                	newHtml += `<td>Not yet reserved</td>`;
                }
                else
                {
                	newHtml += `<td style="background-color: yellow">Reserved by: ${data[i].buyer}</td>`;
                }
		        newHtml += `<td>
		                    	<button id="${data[i].tId}" class = "terminateListingButton buttons">Terminate?</button>
		                    </td>
		                    </tr>`;
	        }
	        newHtml += `</table>`;
	        $("#listedContainer").html(""); 
	        $("#listedContainer").append(newHtml);
	    },
	    error: function(error){
	        console.log(error.statusText);
	        var newHtml = "";
        	
	        $("#listedContainer").html(""); 
	        $("#listedContainer").append(newHtml);
	    }
	});
}

function updateTerminated(){

	let jsonToSend ={
		"action" : "updateTerminated",
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	        var newHtml = "";
        	newHtml += `
        				<table>
        				<tr>
	        				<th>ID</th>
	        				<th>Card Name</th>
	        				<th></th>
	        				<th></th>
	        				<th>Price</th>
	        				<th>Terminated</th>
        				</tr>`;
	        for(i = 0; i < data.length; i++)
	        {
	        	newHtml += `<tr>
	        				<td>${data[i].id}</td>
                			<td>${data[i].name}</td>
		                    <td><img src = "./images/${data[i].color}.png" height="20" width="20"></td>
		                    <td><img src = "./images/${data[i].rarity}.png" height="20" width="35"></td>
		                    <td>$${data[i].price}</td>
		                    <td>${data[i].listdate}</td>
		                    </tr>`;
	        }
	        newHtml += `</table>`;
	        $("#terminatedContainer").html(""); 
	        $("#terminatedContainer").append(newHtml);
	    },
	    error: function(error){
	        console.log(error.statusText);
	        var newHtml = "";
        	
	        $("#terminatedContainer").html(""); 
	        $("#terminatedContainer").append(newHtml);
	    }
	});
}

jQuery(document).on('click', '.removeReserveButton', function (event) 
{
	let $tId = this.id;


	let jsonToSend ={
		"action" : "removeReservation",
		"tId" : $tId
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	    	console.log(data);
			alert("Reservation removed");
	    },
	    error: function(error){
	        console.log(error.statusText);
	    }
	});
	updateReservations();
});

jQuery(document).on('click', '.terminateListingButton', function (event) 
{
	let $tId = this.id;


	let jsonToSend ={
		"action" : "terminateListing",
		"tId" : $tId
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	    	console.log(data);
			alert("Listing Terminated");
	    },
	    error: function(error){
	        console.log(error.statusText);
	    }
	});
	updateListings();
	updateTerminated();
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
updateReservations();
updateListings();
updateTerminated();
