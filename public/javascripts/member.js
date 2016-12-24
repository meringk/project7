
$(document).ready(function () {
    $('#execute').click(function () {
        console.log($('#dataForm').serialize());
        $.ajax({
            url: '/member',
            type: 'post',
            dataType: 'json',
            data: $('#dataForm').serialize(),
            success: function (data) {
                console.log(data);
                console.log($('#resDiv'));
                $('#resDiv')[0].innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    $('#resDiv').append('<div> <b>아이디</b> ' + data[i].m_userid + ' / <b>이름</b> : ' + data[i].m_username + '<div>');
                    $('#resDiv').append('<br>');
                }
            }
        });
    });
});

function join() {
    $(location).attr('href', "/member.html");
};

function login() {
    $.ajax({
        url: '/member/login',
        type: 'post',
        dataType: 'json',
        data: $('#dataForm').serialize(),
        success: function (data) {
            console.log(data);
            $('#resDiv')[0].innerHTML = data.m_username + "님 안뇽하세요 ?";
        }
    });
};
