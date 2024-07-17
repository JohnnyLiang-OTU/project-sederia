var checked_array = [];

function checked_array_body(){
    console.log(checked_array);
}

// <--------------- Checkbox Logic --------------->

function handle_bulk_checkbox(self){
    const table_body = document.getElementById("table_body");
    const set_of_tr = table_body.querySelectorAll("tr");
    set_of_tr.forEach((tr) => {
        var th = tr.querySelector('th:nth-child(1)');
        var checkbox = th.querySelector('input');
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
    const all_checked = Array.from(set_of_tr).every((tr) =>{
        const checkbox = tr.querySelector('th:nth-child(1) input');
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