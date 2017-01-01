writeSubmit = function () {

    var title = $('#title').val(),
        content = CKEDITOR.instances.editor.getData(),
        category = $('#category').val();

    var categoryName = $('#category')[0].selectedOptions[0].text;
        categoryName = categoryName.toLowerCase();

        console.log(categoryName);

    var categoryGb = category.substring(0,3);
    categoryFolder ="";

    if(categoryGb=="001"){
        categoryFolder = "blog"
    }else if(categoryGb=="002"){
        categoryFolder = "study"
    }

    if(title.length==0){
        alert("글 제목이 필요합니다.");
    }else if(content.length==0){
        alert("글 내용이 필요합니다.");
    }else{
        if (confirm("글 등록 하시겠습니까 ?")){
            $.ajax({
                url: '/write/'+categoryFolder+'Write',
                type: 'post',
                dataType: 'json',
                data: { title : title , content : content, category : category},
                success: function (data) {
                    alert("글 작성 성공");
                    CKEDITOR.instances.editor.setData();
                    $('#title').val("");
                    if (confirm("해당카테고리로 가시겠습니까?")){
                        location.href="/html/"+categoryFolder+"/"+categoryName+".html";

                    }else{
                        $('#category').val("");
                    }
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


