

$(document).ready(function () {
    $('#modifySubmit').css("display","none");
    var locationParam = location.search;

    console.log(locationParam);


    if(locationParam != ""){
        categoryCode = locationParam.split('=')[1].substring(0, 6);
        cont_num = locationParam.split('=')[2];

        //수정이라고 글씨 바꿔줌
        $('.header-a-logo')[0].innerHTML="글 수정"+"<br>"
        //버튼CSS바꾸어줌
        $('#modifySubmit').css("display","block");
        $('#writeSubmit').css("display","none");
    
        console.log(categoryCode, cont_num);
        $.ajax({
            url: '/study/selectStudyContent',
            type: 'post',
            dataType: 'json',
            data: { categoryCode: categoryCode, cont_num: cont_num },
            success: function (data) {
                console.log(data);
                CKEDITOR.instances.editor.setData(data[0].cont_content);
                $('#title').val(data[0].cont_title);
            }
        });
    }
});



writeSubmit = function () {
    //저장하기
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


contentView = function(){
    // 수정할 글 불러오기
}

modifySubmit = function(){
    //수정하기
    alert("준비중");
}


goHistory = function(){
    if (confirm("작성하지 않고 나가기?")){
        history.go(-1);
    } 
};


