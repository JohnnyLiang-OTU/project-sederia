import { getToken } from "./admin_list.js";

const form_submit = document.getElementById("form_submit_button");
form_submit.addEventListener('click', function() {
    var isValid = true;
    var form_credentials = document.querySelectorAll(".input-label");
    const hp = document.getElementById("reference-contact");
    if(hp.value !== "")
    {
        isValid = false;
    }
    form_credentials.forEach(e => {
        if (!e.children[0].checkValidity()) {
            e.children[1].style.display = "block";
            isValid = false;
        }
    });

    if(isValid == true){
        var form_info = document.querySelectorAll(".input-info")
        var context = new Object()
        form_info.forEach(e => {
            if(typeof e.value === 'number'){
                context[e.id] = '' + e.value;
            }
            context[e.id] = e.value;
        });
        console.log(context);
        send_email(context);
    }
});

function send_email(context)
{
    // const domain = 'GeraSA.com';
    // const url = domain+'/send-email/';
    const url = '/send-email/';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToken' :  getToken('csrftoken')
        },
        body: JSON.stringify(context),
    });
}