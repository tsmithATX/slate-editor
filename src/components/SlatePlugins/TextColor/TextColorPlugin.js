import React from 'react';
import styled from 'styled-components';

export const COLOR_MARK = 'colored';

const ColoredText = styled.span`
	color: ${({ mark: { data } }) => data.get('fontColor')};
`;

export const TextColorPlugin = () => {
	return {
		renderMark: (props, editor, next) => {
			console.log(props.mark);
			switch (props.mark.type) {
				case 'colored':
					return (
						<ColoredText {...props}>{props.children}</ColoredText>
					);
				default:
					return next();
			}
		},
	};
};
