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

updateSession();

