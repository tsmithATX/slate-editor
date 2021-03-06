import React from 'react';
import styled from 'styled-components';
import { Set } from 'immutable';

export const COLOR_MARK = 'colored';

const ColoredText = styled.span`
	color: ${({ mark: { data } }) => data.get('fontColor')};
`;

export const TextColorPlugin = () => {
	return {
		queries: {
			getTextColors: editor => {
				const document = editor.props.value.document;
				const selection = editor.props.value.selection;
				if (selection) {
					const marks = document.getMarksAtRange(selection);
					return marks.filter(
						mark => mark.get('type') === COLOR_MARK
					);
				}
				return new Set();
			},
		},
		commands: {
			removeColorsAtSelection: editor => {
				const marks = editor.getTextColors();
				marks.map(mark => editor.removeMark(mark));
			},
		},
		renderMark: (props, editor, next) => {
			switch (props.mark.type) {
				case COLOR_MARK:
					return (
						<ColoredText {...props}>{props.children}</ColoredText>
					);
				default:
					return next();
			}
		},
	};
};
