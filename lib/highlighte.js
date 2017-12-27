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
		let rangeStart = range.start.row;
		let rangeEnd = range.end.row;

		for(rangeStart; rangeStart <= rangeEnd; rangeStart++){

			if(markers[rangeStart] == undefined){

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

				markers[rangeStart] = marker;

			}

		}

	},

	removeColor(){

		let deleted = new Array();
		let editor = atom.workspace.getActiveTextEditor();
		let range = editor.getSelectedBufferRange();
		let rangeStart = range.start.row;
		let rangeEnd = range.end.row;

		for(rangeStart; rangeStart <= rangeEnd; rangeStart++){

			if(markers[rangeStart])
				while(!markers[rangeStart].isDestroyed())
					markers[rangeStart].destroy();

			delete markers[rangeStart];

		}

	}

};

export default exPackage;
