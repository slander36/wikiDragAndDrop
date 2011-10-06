fsg.object = function() {};

fsg.object.prototype.init = function() {
	this.element = document.createElement('div');
	this.element._parent = this;
	this.addClass('object');
	this.element.setAttribute('draggable',true);
	this.element.addEventListener('dragstart',this.dragstart,false);
	this.element.addEventListener('dragend',this.dragend,false);
	this.element.setAttribute('data-value',this.getType());
};

fsg.object.prototype.getElement = function() {
	return this.element;
};

fsg.object.prototype.setElement = function(newElement) {
	this.element = newElement;
};

fsg.object.prototype.addClass = function(newClass) {
	this.element.classList.add(newClass);
};

fsg.object.prototype.getClasses = function() {
	return (this.element.getAttribute("class") != null ? this.element.getAttribute("class") : "" );
};

fsg.object.prototype.containsClass = function(containClass) {
	return this.element.classList.contains(containClass);
};

fsg.object.prototype.removeClass = function(oldClass) {
	this.element.classList.remove(oldClass);
};

fsg.object.prototype.setType = function(type) {
	this.type = type;
};

fsg.object.prototype.getType = function() {
	return this.type;
};

fsg.object.prototype.dragstart = function(e) {
	this._parent.removeClass('entered');
	this._parent.removeClass('dragged');
	this._parent.removeClass('over');
	this._parent.addClass('dragged');
	
	e.dataTransfer.effectAllowed = "copy";
	e.dataTransfer.setData('text/plain',this._parent.getType());
};

fsg.object.prototype.dragend = function(e) {
	this._parent.removeClass('entered');
	this._parent.removeClass('dragged');
	this._parent.removeClass('over');
};

/*** Text Object ***/

fsg.textObject = function() {};
fsg.textObject.prototype = new fsg.object();
fsg.textObject.prototype.text = function(newText) {
	this.element.innerHTML = newText;
};

/*** Header Object ***/

fsg.header = function() {};
fsg.header.prototype = new fsg.textObject();

fsg.h1 = function() {
	this.setType('h1');
	this.init();
};
fsg.h1.prototype = new fsg.header();
fsg.h1.prototype.constructor = fsg.h1;
	
/*** List Object ***/

fsg.list = function() {};
fsg.list.prototype = new fsg.textObject();

fsg.ul = function() {
	this.setType('ul');
	this.init();
};
fsg.ul.prototype = new fsg.list();

/*** Image Object ***/

fsg.image = function() {
	this.setType('img');
	this.init();
};
fsg.image.prototype = new fsg.object();

/*** Edit Section ***/

fsg.edit = function(element) {
	this.element = element;
	this.element._parent = this;
	this.element.setAttribute('contenteditable',true);
	this.element.setAttribute('dropzone','copy s:text/plain');
	this.element.setAttribute('webkitdropzone','copy s:text/plain');
	this.element.addEventListener('dragenter',this.dragenter,false);
	this.element.addEventListener('dragover',this.dragover,false);
	this.element.addEventListener('dragleave',this.dragleave,false);
	this.element.addEventListener('drop',this.drop);
};
fsg.edit.prototype.constructor = fsg.edit;

fsg.edit.prototype.dragenter = function(e) {
};

fsg.edit.prototype.dragover = function(e) {
};

fsg.edit.prototype.dragleave = function(e) {
};

fsg.edit.prototype.drop = function(e) {
	var optionsElement = document.createElement('div');
	var options = new fsg.options(optionsElement);
	options.registerForEvent(this._parent);
	switch(e.dataTransfer.getData('text/plain')) {
		case 'h1':
			options.header();
			break;
		case'ul':
			options.list();
			break;
		default:
			break;
	};
	options.show();
};
fsg.edit.prototype.observeEvent = function(event,entity) {
	switch(event) {
		case 'delete':
			delete entity;
			break;
		default:
			break;
	}
};

/*** Options Popup ***/

fsg.options = function(element) {
	this.observers = [];
	
	this.element = element;
	this.element._parent = this;
	this.element.classList.add('options');
	this.element.classList.add('hidden');
	this.element.setAttribute('draggable',true);
	
	this.title = document.createElement('div');
	this.title.innerHTML = "";
	this.title.classList.add('title');
	this.element.appendChild(this.title);
	
	this.input = document.createElement('div');
	this.input.innerHTML = "";
	this.input.classList.add('input');
	this.input.setAttribute('contenteditable',true);
	this.element.appendChild(this.input);
	
	this.preview = document.createElement('div');
	this.preview.innerHTML = "";
	this.preview.classList.add('preview');
	this.element.appendChild(this.preview);
	
	this.testButton = document.createElement('button');
	this.testButton.innerHTML = "Test";
	this.testButton.classList.add('test');
	this.testButton.onclick = this.test;
	this.element.appendChild(this.testButton);
	
	this.okButton = document.createElement('button');
	this.okButton.innerHTML = "OK";
	this.okButton.classList.add('ok');
	this.okButton.onclick = this.submit;
	this.element.appendChild(this.okButton);
	
	this.cancelButton = document.createElement('button');
	this.cancelButton.innerHTML = "Cancel";
	this.cancelButton.classList.add('cancel');
	this.cancelButton.onclick = this.cancel;
	this.element.appendChild(this.cancelButton);
	
	document.getElementById('content').appendChild(this.element);
};
fsg.options.prototype.show = function() {
	this.element.classList.remove('hidden');
};
fsg.options.prototype.hide = function() {
	this.element.classList.add('hidden');
};
fsg.options.prototype.header = function() {
	this.title.innerHTML = "Header";
	
	this.option1 = document.createElement('select');
	this.option1.innerHTML =
			"<option value='h1'>H1</option>" +
			"<option value='h2'>H2</option>" +
			"<option value='h3'>H3</option>" +
			"<option value='h4'>H4</option>" +
			"<option value='h5'>H5</option>";
	this.option1.classList.add('option1');
	this.element.appendChild(this.option1);
};
fsg.options.prototype.list = function() {
	this.title.innerHTML = "List";
	
	this.input.innerHTML = "<li></li>";
	
	this.option1 = document.createElement('select');
	this.option1.innerHTML =
			"<option value='ol'>ol</option>" +
			"<option value='ul'>ul</option>";
	this.option1.classList.add('option1');
	this.element.appendChild(this.option1);
	
	this.option2 = document.createElement('button');
	this.option2.innerHTML = "+";
	this.option2.classList.add('option2');
	this.option2.onclick = this.addListItem;
	this.element.appendChild(this.option2);
};
fsg.options.prototype.test = function() {
	this.parentNode._parent.preview.innerHTML = this.parentNode._parent.markup();
	console.log(this.parentNode._parent.preview.innerHTML);
};
fsg.options.prototype.markup = function() {
	switch(this.title.innerHTML) {
		case "Header":
			return this.leftTags() + this.input.innerHTML + this.rightTags();
		case "List":
			return this.leftTags() + this.input.innerHTML + this.rightTags();
		default:
			return "";
	}
};
fsg.options.prototype.leftTags = function() {
	switch(this.title.innerHTML) {
		case "Header":
			return "<"+this.option1.value+">";
		case "List":
			return "<"+this.option1.value+">";
		default:
			return "";
	}
};
fsg.options.prototype.rightTags = function() {
	switch(this.title.innerHTML) {
		case "Header":
			return "</"+this.option1.value+">";
		case "List":
			return "</"+this.option1.value+">";
		default:
			return "";
	}
};
fsg.options.prototype.addListItem = function() {
	this.parentNode._parent.input.innerHTML += "<li></li>";
};
fsg.options.prototype.submit = function() {
	document.getElementById('edit').innerHTML += this.parentNode._parent.markup();
};
fsg.options.prototype.cancel = function() {
	this.parentNode._parent.hide();
	this.parentNode._parent.remove();
};
fsg.options.prototype.registerForEvent = function(observer) {
	if(this.observers.indexOf(observer) == -1)
		this.observers.push(observer);
};
fsg.options.prototype.remove = function() {
	this.element.parentNode.removeChild(this.element);;
	for(i in this.observers) {
		this.observers[i].observeEvent('delete',this);
	};
};