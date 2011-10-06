window.onload = function() {
	var toolbarElement = document.createElement('div');
	toolbarElement.id = 'toolbar';
	
	//var toolbarElement = document.getElementById("toolbar");
	
	var button1 = new fsg.h1();
	button1.text("Headers");
	toolbarElement.appendChild(button1.element);
	
	var button2 = new fsg.ul();
	button2.text("Lists");
	toolbarElement.appendChild(button2.element);
	
	//var editElement = document.getElementById("edit");
	var editElement = document.createElement('div');
	editElement.id = 'edit';
	var edit = new fsg.edit(editElement);
	
	document.getElementById('content').appendChild(toolbarElement);
	document.getElementById('content').appendChild(editElement);
};