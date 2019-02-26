import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import { MarkHotkey } from '../utils/SlateMarkHotkey';
import { TextAlignPlugin } from '../utils/SlateTextAlignPlugin';

const plugins = [
	MarkHotkey({ key: 'b', type: 'bold' }),
	MarkHotkey({ key: 'i', type: 'italic' }),
	MarkHotkey({ key: 'u', type: 'underline' }),
	TextAlignPlugin(),
];

export default class SlateEditor extends Component {
	static propTypes = {
		value: PropTypes.object,
		updateValue: PropTypes.func,
		bindEditorRef: PropTypes.object,
	};

	render() {
		const { value, updateValue, bindEditorRef } = this.props;
		return (
			<React.Fragment>
				<Editor
					ref={bindEditorRef}
					plugins={plugins}
					value={value}
					onChange={updateValue}
				/>
			</React.Fragment>
		);
	}
}
