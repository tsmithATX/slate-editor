import React from 'react';
import styled from 'styled-components';
// import { Map } from 'immutable';

export const URL_INLINE = 'url_inline';

const URLInline = styled.a``;

export const URLPlugin = options => {
	return {
		commands: {
			removeURL: editor => {
				editor.unwrapInline(URL_INLINE);
			},
			wrapLink: (editor, href) => {
				editor.unwrapInline(URL_INLINE).wrapInline({
					type: URL_INLINE,
					data: { href },
				});
			},
			createURL: (editor, href, text) => {
				if (editor.value.selection.isExpanded) {
					editor.wrapLink(href);
				} else if (text) {
					editor
						.insertText(text)
						.moveFocusBackward(text.length)
						.wrapLink(href);
				}

				editor.moveToEnd();
			},
		},
		renderNode: (props, editor, next) => {
			const { node } = props;
			switch (node.type) {
				case URL_INLINE:
					return (
						<URLInline
							{...props}
							href={node.data.get('href', '')}
						/>
					);
				default:
					return next();
			}
		},
	};
};
