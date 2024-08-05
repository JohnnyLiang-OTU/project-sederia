var checked_array = [];

function checked_array_body(){
    console.log(checked_array);
}

// <--------------- Checkbox Logic --------------->

function handle_bulk_checkbox(self){
    const table_body = document.getElementById("table_body");
    const set_of_tr = table_body.querySelectorAll("tr");
    set_of_tr.forEach((tr) => {
        var td = tr.querySelector('td:nth-child(1)');
        var checkbox = td.querySelector('input');
        checkbox.checked = self.checked;
        handle_checkbox(checkbox, parseInt(tr.id), false);
    });
}

function handle_checkbox(self, param, checkAll = true){
    if(!self.checked){
        remove_from_checked(param);
        const bulk_checkbox = document.getElementById("bulk_checkbox");
        if(bulk_checkbox.checked){
            bulk_checkbox.checked = false;
        }
    }
    else{
        add_to_checked(param);
        if(checkAll){
            check_all_unit_checkboxes();
        }
    }
}

function check_all_unit_checkboxes(){
    const table_body = document.getElementById("table_body");
    const set_of_tr = table_body.querySelectorAll('tr');
    const all_checked = Array.from(set_of_tr).every((td) =>{
        const checkbox = td.querySelector('td:nth-child(1) input');
        return checkbox.checked;
    });
    document.getElementById('bulk_checkbox').checked = all_checked;
}

function add_to_checked(param){
    if(!checked_array.includes(param)){
        checked_array.push(param);
    }
}

function remove_from_checked(param){
    checked_array = checked_array.filter(item => item !== param);
}


// <------------- Category Query Logic ----------------->

document.addEventListener('DOMContentLoaded', function() {
    var select_element = document.getElementById('categorizer');
    select_element.addEventListener('change', function(event) {
        var selected_category = event.target.value;
        catalogo_categorized_get(selected_category);
    });
});

function catalogo_categorized_get(category){
    fetch(`/filter_products/${category}/`).then(response => response.json())
    .then(data => {
        categorize_ui(data.product_query); 
    })
    .catch(error => {console.error("Error:", error); console.log("Error:", data.error)});
}

// function to update the ui based on the category chosen.
function categorize_ui(products){
    const tableBody = document.getElementById('table_body');
    tableBody.innerHTML = ''; // Clear existing rows

    products.forEach(product => {
        const row = document.createElement('tr');
        row.id = product.id;
        
        row.innerHTML = `
            <th><input type="checkbox" autocomplete="off" onclick="handle_checkbox(this, ${product.id})"></th>
            <th>${product.id}</th>
            <th>${product.name}</th>
            <th class="product_description">${truncateString(product.description, 50)}</th>
            <th>${product.category_id}</th>
            <th>${product.price}</th>
            <th>${product.display_price}</th>
            <th><a href="/administrador/edit/${product.id}/" class="button">Edit</a></th>
        `;

        tableBody.appendChild(row);
    });
}

// Helper function to truncate strings
function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
}

// <----------------- Deletion Logic ----------------->

function delete_checked_products(e){
    if(checked_array.length === 0) return;
    if(!confirm('Are you sure?')){
        e.preventDefault();
    } else {
        delete_model_instances();
        bulk_checkbox = document.getElementById('bulk_checkbox');
        if(bulk_checkbox.checked){
            bulk_checkbox.checked = false;
        }
    }
}

function delete_model_instances()
{
    url = '/administrador/delete_models/';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getToken('csrftoken'),
        },
        body: JSON.stringify({
            'ids' : checked_array,
        })
    }).then(response => response.json())
    .then(data => {
        if (data.status === 'success'){
            console.log('Model isntances deleted succesfully');
            delete_ui(checked_array);
            checked_array = [];
        } else {
            console.error("Error deleting model instances: ", data.message);
        }
    }).catch(error => {
        console.error("Error:", error);
    });
}

function delete_ui(param){
    param.forEach(id => {
        const element = document.getElementById(id);
        if(element){
            element.remove();
        }
    })
}

function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0,name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
}