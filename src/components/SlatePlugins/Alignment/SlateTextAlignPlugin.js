import React from 'react';
import styled from 'styled-components';
import { Map } from 'immutable';

export const ALIGNED_BLOCK = 'aligned-block';
export const LEFT_ALIGN = 'left-align';
export const RIGHT_ALIGN = 'right-align';
export const CENTER_ALIGN = 'center-align';
export const JUSTIFY_ALIGN = 'justify-align';

const ALIGNMENT_CSS_IMM = new Map({
	[LEFT_ALIGN]: 'left',
	[RIGHT_ALIGN]: 'right',
	[CENTER_ALIGN]: 'center',
	[JUSTIFY_ALIGN]: 'justify',
});

const TextAlignedDiv = styled.div`
	text-align: ${({ node: { data } }) =>
		ALIGNMENT_CSS_IMM.get(data.get('alignment'), 'left')};
`;

export const TextAlignPlugin = options => {
	return {
		commands: {
			setAlignment: (editor, alignment) => {
				editor
					.setBlocks({
						type: ALIGNED_BLOCK,
						data: { alignment },
					})
					.focus();
			},
		},
		queries: {
			getAlignment: editor => {
				return editor.props.value.startBlock;
			},
		},
		renderNode: (props, editor, next) => {
			switch (props.node.type) {
				case ALIGNED_BLOCK:
					return <TextAlignedDiv {...props} />;
				default:
					return next();
			}
		},
	};
};
