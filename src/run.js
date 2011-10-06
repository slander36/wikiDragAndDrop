window.onload = function() {
	var toolbarElement = document.getElementById("toolbar");
	
	var button1 = new fsg.h1();
	button1.text("Header1");
	toolbarElement.appendChild(button1.element);
	
	var button2 = new fsg.ul();
	button2.text("List *");
	toolbarElement.appendChild(button2.element);
	
	var editElement = document.getElementById("edit");
	var edit = new fsg.edit(editElement);
};