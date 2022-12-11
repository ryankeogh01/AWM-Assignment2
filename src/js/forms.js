var HOST = "https://127.0.0.1:8000";

$(document).ready(function () {
    $("form").submit(function (event) {
        var formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val(),
        };

        $.ajax({
            type: "POST",
            url: HOST + "api/register",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (data) {
            console.log(data);
        });

        event.preventDefault();
    });
});


function func(){
    var xml = new XMLHttpRequest();
    xml.open("POST", HOST + "api/register", true);
    xml.setRequestHeader("Content-type", "application/z-www-form-urlencoded");
    xml.onload = function(){
        var dataReply = JSON.parse(this.responseText)
    };
}