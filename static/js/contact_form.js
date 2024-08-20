const form_submit = document.getElementById("form_submit_button");
form_submit.addEventListener('click', function() {
    var form_credentials = document.querySelectorAll(".input-label");
    var isValid = true;
    form_credentials.forEach(e => {
        if (!e.children[0].checkValidity()) {
            e.children[1].style.display = "block";
            isValid = false;
        }
    });

    if(isValid == true){
        var context = new Object()
        form_credentials.forEach(e => {
            var input = e.children[0]
            context[input.name] = input.value;
        });
        console.log(context);
        // EMAIL POST WITH DJANGO
    }
});

