'use babel'

var markers = new Array();

var exPackage = {

	activate(state){
		atom.commands.add('atom-workspace', {
			'highlighte:addColor' : this.addColor,
			'highlighte:removeColor' : this.removeColor
		})
	},

	addColor(){

		let editor = atom.workspace.getActiveTextEditor();
		let range = editor.getSelectedBufferRange();
		let marker = editor.markBufferRange(range);

		if(!markers[range.start.row]){

			markers[range.start.row] = marker;

			let decoration = editor.decorateMarker(
				marker,
				{
					type: 'line',
					class: 'custom-background-color',
					onlyHead : true
				}
			);

		}

	},

	removeColor(){

		let editor = atom.workspace.getActiveTextEditor();
		let range = editor.getSelectedBufferRange();
		let marker = editor.markBufferRange(range);

		if(markers[range.start.row]){

			markers[range.start.row].destroy();

			markers.splice(range.start.row, 1);

		}

	}

};

export default exPackage;
