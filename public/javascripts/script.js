$(function(){ 

	$('form').on('submit', function(event){	
		var isEmpty = $('input').val();

		var toPost = $('form').serialize();
		event.preventDefault();
		if(!isEmpty){
			// do nothing

		}else{
			
			$.ajax({
				type:'POST', url:'/test', data: toPost
			}).done(function(data){ appendToList(data);})
		}
	
	})

	$(".btn").click(function(){
		
	})

	// $.get('/test',appendToList)

	var appendToList = function(data){
		$('.name-list').append('<li>'+data+'</li>');
	}

});