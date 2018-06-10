$(document).ready(function(){
    $("select").formSelect();
    $(".modal").modal();
    $("#submit-btn").on("click", function(event){
        event.preventDefault();
        var surveyResponse = {
            name: $("#name").val().trim(),
            image: $("#image").val().trim(),
            scores: [ $("#q1 option:selected").val(),
                      $("#q2 option:selected").val(),
                      $("#q3 option:selected").val(),
                      $("#q4 option:selected").val(),
                      $("#q5 option:selected").val(),
                      $("#q6 option:selected").val(),
                      $("#q7 option:selected").val(),
                      $("#q8 option:selected").val(),
                      $("#q9 option:selected").val(),
                      $("#q10 option:selected").val() ]
        };
        $.post("/api/friendFinder", surveyResponse, function(data) {
            if (data) {
                $(".modal-content h4").text(data.name);
                $(".modal-content img").attr("src", data.image);
                $(".modal").modal("open");
            } else {
                alert("Uh Oh something went wrong X_X");
            }
            $("#name").val("");
            $("#image").val("");
            $("select").val("0").formSelect();
        });
    });
});