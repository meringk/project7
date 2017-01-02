$(document).ready(function () {
    var locationParam = location.search;

    console.log(locationParam)
    categoryCode = locationParam.split('=')[1].substring(0, 6);
    cont_num = locationParam.split('=')[2];

    console.log(categoryCode, cont_num);
    $.ajax({
        url: '/study/selectStudyContent',
        type: 'post',
        dataType: 'json',
        data: { categoryCode: categoryCode, cont_num: cont_num },
        success: function (data) {
            // var date = (data[i].cont_regdate).split('T')[0]
            // 	, time = (data[i].cont_regdate).split('T')[1]
            // 	, time_H = (time.split(':')[0]) * 1 
            // 	, calTime = calTimeFnc(time_H);            
            // + '<div class="study-list-time"> <span style=\'font-size:12px\'>   -' + date
            // + ' ' + calTime.moon + ' ' + calTime.time_H + '시</span></div>'
            console.log(data);
            $('.main-list')[0].innerHTML = "";
            $('.main-list').append(

                '<div class="study_cont_title">' + data[0].cont_title + '<br/></div>'
                + '<div class="main-upper-div">'
                + '<a href="javascript:modify()"> 수정 </a> /'
                + '<a> 삭제 </a>'
                + '</div>'
                + '<div class="study_cont_content">' + data[0].cont_content + '<br/></div>'

            );
        }
    });

    modify = function(){
        //카테고리코드와 글번호를 이용해서 조회한 내용을 write.js FORM에 넣어줌.
        console.log(categoryCode, cont_num);
        location.href="/html/write.html?categoryCode="+categoryCode+"&cont_num="+cont_num;
    };






});