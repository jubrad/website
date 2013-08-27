
$('.comments').append("<%=j(render '/comments/show_comment', :comment => @comment)%>");
$('#new_comment')[0].reset();
