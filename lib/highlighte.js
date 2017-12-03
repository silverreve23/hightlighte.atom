'use babel'

export default {

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
		let startPosition = range.start.row;
		let endPosition = range.end.row;
		let decoration = editor.decorateMarker(
			marker,
			{
				type: 'line',
				class: 'custom-background-color'
			}
		);

	},

	removeColor(){

		let editor = atom.workspace.getActiveTextEditor();
		let range = editor.getSelectedBufferRange();
		let marker = editor.markBufferRange(range);
		let startPosition = range.start.row;
		let endPosition = range.end.row;
		let decoration = editor.decorateMarker(
			marker,
			{
				type: 'line',
				class: 'custom-background-transparent'
			}
		);
	}

};
