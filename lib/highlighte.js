'use babel'

var markers = new Object();

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
		let editorId = editor.id;
		let rangeStart = range.start.row;
		let rangeEnd = range.end.row;
		let markerId = null;

		for(rangeStart; rangeStart <= rangeEnd; rangeStart++){

			markerId = editorId + ':' + rangeStart;

			if(markers[markerId] == undefined){

				let marker = editor.markBufferRange({
					start : {
						column : 0,
						row : rangeStart
					},
					end : {
						column : 0,
						row : rangeStart
					},
				});

				let decoration = editor.decorateMarker(
					marker,
					{
						type: 'line',
						class: 'custom-background-color',
						onlyHead : true
					}
				);

				markers[markerId] = marker;

			}

		}

	},

	removeColor(){

		let editor = atom.workspace.getActiveTextEditor();
		let range = editor.getSelectedBufferRange();
		let editorId = editor.id;
		let rangeStart = range.start.row;
		let rangeEnd = range.end.row;
		let markerId = null;

		console.log(markers);

		for(rangeStart; rangeStart <= rangeEnd; rangeStart++){

			markerId = editorId + ':' + rangeStart;

			if(markers[markerId])
				while(!markers[markerId].isDestroyed())
					markers[markerId].destroy();

			delete markers[markerId];

		}

	}

};

export default exPackage;
