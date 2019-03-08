import React from 'react';
import styled from 'styled-components';
import { Set } from 'immutable';

export const FONT_SIZE_MARK = 'font_size';

const SizedText = styled.span`
	font-size: ${({ mark: { data } }) => data.get('fontSize', 14)}px;
`;

export const FontSizePlugin = () => {
	return {
		queries: {
			getFontSize: editor => {
				const document = editor.props.value.document;
				const selection = editor.props.value.selection;
				if (selection) {
					const marks = document.getMarksAtRange(selection);
					return marks.filter(
						mark => mark.get('type') === FONT_SIZE_MARK
					);
				}
				return new Set();
			},
		},
		commands: {
			removeFontSizeAtSelection: editor => {
				const marks = editor.getFontSize();
				marks.map(mark => editor.removeMark(mark));
			},
		},
		renderMark: (props, editor, next) => {
			switch (props.mark.type) {
				case FONT_SIZE_MARK:
					return <SizedText {...props}>{props.children}</SizedText>;
				default:
					return next();
			}
		},
	};
};
