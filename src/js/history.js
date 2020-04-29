function log_history(){	
	chrome.storage.sync.get(
		null,
		function(data){
			if(data){
				log = "";
				var table = document.getElementById("keys");
				var length = table.rows.length;
				if(length > 0){
					table.deleteRow(length - 1);
				}
				var row = table.insertRow(0);

				cell_counter = 0;
				for (key in data){
					var cell = row.insertCell(cell_counter);

					cell.innerHTML = "<a href='#' id='_" + key + "'>" + key + "</a>";
					document.getElementById("_" + key).addEventListener('click', display_history(key));

					cell_counter++;
					// log += key + " : " + data[key] + "\n\n";
				}
				
				// document.getElementById("history").innerHTML = "<textarea rows='5' cols='70'>" + log + "</textarea>";
				// document.getElementById("history").innerHTML = "<pre>" + log + "</pre>";
			}
		});
}

function clear_table(){

}

function display_history(k){
	alert(k);
	chrome.storage.sync.get(
		null,
		function(data){
			if(data){
				log = "";
				for (key in data){
					if(key == k){
						log += data[key];
					}
				}
				document.getElementById("history").innerHTML = "<textarea rows='5' cols='70'>" + log + "</textarea>";
			}
		});
}

// <textarea rows="4" cols="50">
function clear_history(){
	chrome.storage.sync.set({}, function(){});
	log_history();
}


document.addEventListener('DOMContentLoaded', log_history);
document.getElementById("log").addEventListener('click', log_history);
document.getElementById("clear").addEventListener('click', clear_history);