

$(document).ready(function () {
    $('#modifySubmit').css("display", "none");
    var locationParam = location.search;
    var categoryCode = "";
    var cont_num = "";
    console.log(locationParam);

    if (locationParam != "") {
        categoryCode = locationParam.split('=')[1].substring(0, 6);
        cont_num = locationParam.split('=')[2];

        var categoryGb = categoryCode.substring(0, 3);
        categoryFolder = "";

        if (categoryGb == "001") {
            categoryFolder = "blog";
            CcategoryFolder = "Blog";
        } else if (categoryGb == "002") {
            categoryFolder = "study";
            CcategoryFolder = "Study";
        }


        // 해당 글 뿌리기
        $.ajax({
            url: '/' + categoryFolder + '/select' + CcategoryFolder + 'Content',
            type: 'post',
            dataType: 'json',
            data: { categoryCode: categoryCode, cont_num: cont_num },
            success: function (data) {
                console.log(data);
                CKEDITOR.instances.editor.setData(data[0].cont_content);
                $('#title').val(data[0].cont_title);

            }
        });

        //수정이라고 글씨 바꿔줌
        $('.header-a-logo')[0].innerHTML = "글 수정" + "<br>"
        //버튼CSS바꾸어줌
        $('#modifySubmit').css("display", "block");
        $('#writeSubmit').css("display", "none");
        $('#category').val(categoryCode);
    }

    modifySubmit = function () {
        var title = $('#title').val(),
            content = CKEDITOR.instances.editor.getData(),
            category = $('#category').val();

        var categoryGb = category.substring(0, 3);
        categoryFolder = "";

        if (categoryGb == "001") {
            categoryFolder = "blog"
        } else if (categoryGb == "002") {
            categoryFolder = "study"
        }

        //수정하기
        if (confirm("수정 하시겠습니까 ?")) {
            $.ajax({
                url: '/write/' + categoryFolder + 'Modify',
                type: 'post',
                dataType: 'json',
                data: { title: title, content: content, category: category, cont_num: cont_num, categoryCode: categoryCode },
                success: function (data) {
                    //해당 글로 이동
                    location.href = "/html/" + categoryFolder + "/" + categoryFolder + "_view.html?categoryCode=" + category + "&cont_num=" + cont_num;
                }
            });
        }
    }


    imgUpload = function(){
        console.log(this);
    }

    $('#FILE_TAG').on('change', function() {
        console.log(this.value);
            ///// Your code
            $('.preview')[0].innerHTML = this.value;
    });
    uploadFile =  function(){
        var form = $('FILE_FORM')[0];
        var formData = new FormData(form);
        formData.append("fileObj", $("#FILE_TAG")[0].files[0]);
        $.ajax({
            url: '/write/upload',
                processData: false,
                contentType: false,
                data: formData,
                type: 'POST',
                success: function(data){
                    console.log(data);
                    CKEDITOR.instances.editor.insertHtml('<div><img src=' + data[0].location
                        + ' class="previewImg" style="width:300px">');
                    // $('.preview').prepend('<div><img src=' + data.Location
                    //     + ' class="previewImg">'
                    //     + '</div>' );
                }
        });
    }

});

//파일업로드
fileUpload = function () {
    window.open("/html/fileUpload.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
};



writeSubmit = function () {
    //저장하기
    var title = $('#title').val(),
        content = CKEDITOR.instances.editor.getData(),
        category = $('#category').val();

    var categoryName = $('#category')[0].selectedOptions[0].text;
    categoryName = categoryName.toLowerCase();

    var categoryGb = category.substring(0, 3);
    categoryFolder = "";

    if (categoryGb == "001") {
        categoryFolder = "blog"
    } else if (categoryGb == "002") {
        categoryFolder = "study"
    }

    if (title.length == 0) {
        alert("글 제목이 필요합니다.");
    } else if (content.length == 0) {
        alert("글 내용이 필요합니다.");
    } else {
        if (confirm("글 등록 하시겠습니까 ?")) {
            $.ajax({
                url: '/write/' + categoryFolder + 'Write',
                type: 'post',
                dataType: 'json',
                data: { title: title, content: content, category: category },
                success: function (data) {
                    alert("글 작성 성공");
                    CKEDITOR.instances.editor.setData();
                    $('#title').val("");
                    if (confirm("해당카테고리로 가시겠습니까?")) {
                        location.href = "/html/" + categoryFolder + "/" + categoryName + ".html";
                    } else {
                        $('#category').val("");
                    }
                }
            });

        }
    }
};


contentView = function () {
    // 수정할 글 불러오기
}



goHistory = function () {
    if (confirm("작성하지 않고 나가기?")) {
        history.go(-1);
    }
};


