writeSubmit = function () {

    var title = $('#title').val(),
        content = CKEDITOR.instances.editor.getData(),
        category = $('#category').val();

    if(title.length==0){
        alert("글 제목이 필요합니다.");
    }else if(content.length==0){
        alert("글 내용이 필요합니다.");
    }else{
        if (confirm("글 등록 하시겠습니까 ?")){
            $.ajax({
                url: '/write/studyWrite',
                type: 'post',
                dataType: 'json',
                data: { title : title , content : content, category : category},
                success: function (data) {
                    alert("글 작성 성공");
                }
            });
            
        }
        
    }

};


goHistory = function(){
    if (confirm("작성하지 않고 나가기?")){
        history.go(-1);
    } 
};


