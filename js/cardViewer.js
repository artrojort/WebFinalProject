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

function updateCardGrid(){
	var colors = [];
	var rarities = [];
	if($("#White").is(":checked")){
		colors.push("White");
	}
	if($("#Black").is(":checked")){
		colors.push("Black");
	}
	if($("#Red").is(":checked")){
		colors.push("Red");
	}
	if($("#Green").is(":checked")){
		colors.push("Green");
	}
	if($("#Blue").is(":checked")){
		colors.push("Blue");
	}
	if($("#Common").is(":checked")){
		rarities.push("Common");
	}
	if($("#Uncommon").is(":checked")){
		rarities.push("Uncommon");
	}
	if($("#Rare").is(":checked")){
		rarities.push("Rare");
	}
	if($("#Mythic").is(":checked")){
		rarities.push("Mythic");
	}

	let jsonToSend ={
		"action" : "updateCardGrid",
		"colors" : colors,
		"rarities" : rarities
	};

	$.ajax ({
	    url : "./data/applicationLayer.php",
	    type : "GET",
	    data : jsonToSend,
	    dataType : "json",
	    contentType : "application/json",
	    success : function(data){
	        var newHtml = "";
        	newHtml += `<table>`;
	        for(i = 0; i < data.length; i+0)
	        {
	        	newHtml += `<tr>`;
                for(j = 0; j < 4; j++)
	        	{
	        		if (i < data.length)
	        		{
	        		newHtml +=	`<td>
		                        <p>
		                        	<h3>
		                        	${data[i].name}
		                        	<img src = "./images/${data[i].color}.png" height="20" width="20" align="right">
		                        	<img src = "./images/${data[i].rarity}.png" height="20" width="35" align="right">
		                        	</h3
		                        </p>		                        
		                        <p><img src = "./images/cards/${data[i].id}.jpg" class = "card"></p>
		                    	</td>`;
                    i++;
                	}
                	else
                	{
                	newHtml +=	`<td>
		                    	</td>`;	
                	}
	        	}
	        	newHtml += `</tr>`; 
	        }
	        newHtml += `</table>`;
	        $("#cardGridContainer").html(""); 
	        $("#cardGridContainer").append(newHtml);
	    },
	    error: function(error){
	        console.log(error.statusText);
	    }
	});
}

$("#filter").on("click", function(event){
	updateCardGrid();
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
updateCardGrid();
