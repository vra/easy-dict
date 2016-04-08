//Display text term of the result, including definition, en_definition. 
function display_term_p(term_name_cn, term){
	var elem_result = document.getElementById('result');

	elem_result.appendChild(document.createElement('hr'))
	var elem_term_name = document.createElement('p');
	elem_term_name.appendChild(document.createTextNode(term_name_cn));
	elem_result.appendChild(elem_term_name);

	var elem_term = document.createElement('p');
	if ( typeof term !== 'undefined'){
		elem_term.appendChild(document.createTextNode(term));
	}
	else{
		elem_term.appendChild(document.createTextNode('没有结果'));
	}
	elem_result.appendChild(elem_term);
}
function display_term_audio(term_name_cn, term){
	var elem_result = document.getElementById('result');

	elem_result.appendChild(document.createElement('hr'));
	var elem_term_name = document.createElement('p');
	elem_term_name.appendChild(document.createTextNode(term_name_cn));
	elem_result.appendChild(elem_term_name);

	var elem_term = document.createElement('audio');
	if ( typeof term !== 'undefined'){
		elem_term.appendChild(document.createTextNode(term));
	}
	else{
		elem_term.appendChild(document.createTextNode('没有结果'));
	}

	elem_term.src = term;
	elem_term.controls = "controls";
	elem_result.appendChild(elem_term);
}

//Wrapper function to display result.
function display_result(data){
	//First remove previous result.
	var elem_result = document.getElementById('result');
	while (elem_result.firstChild !== null && elem_result.firstChild !== 'undefined'){
		elem_result.removeChild(elem_result.firstChild);
	}

	display_term_p('中文释义:', data.definition);
	display_term_p('英文释义:', data.en_definition.defn);
	display_term_audio('美式发音:', data.us_audio);
	display_term_audio('英式发音:', data.uk_audio);
}


function check_word(word){
	var url = "https://api.shanbay.com/bdc/search/?word=" + word;

	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		var json = xhr.responseText;
		json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1');
		json = JSON.parse(json);
		/*var body = document.getElementById('body');
		var elem_definition = document.createElement('p');
		var node = document.createTextNode(definition);
		elem_definition.appendChild(node);
		body.appendChild(elem_definition);
*/	
		display_result(json.data);
	}

	xhr.open("GET", url);
	xhr.send();
}


document.addEventListener("DOMContentLoaded", function(){
	var search = document.getElementById('search');
	search.addEventListener('click', function(){
		var word = document.getElementById('word');
		if (word !== 'undefined'){
			check_word(word.value);
		}
	});


});

document.addEventListener('keydown', function(e){
	var word = document.getElementById('word');
	var key = e.charCode ? e.charCode: e.keyCode? e.keyCode:0;
	if (lastDownTarget = word && (key ==13 || key ==9)){
		check_word(word.value);
	}
});
