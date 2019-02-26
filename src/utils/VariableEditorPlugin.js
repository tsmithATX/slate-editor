import styled from 'styled-components';

const StyledVariable = styled.div`
	color: #00b9f2;
`;
export const VariableEditorPlugin = options => {
	return {
		renderNode: (props, editor, next) => {
			switch (props.node.type) {
				case 'variable':
					return <VariableNode />;
				default:
					return next();
			}
		},
		queries: {
			inVariableNode,
		},
		commands: {
			addVariable: () => {},
		},
	};
};

const VariableNode = props => {
	return (
		<StyledVariable {...props.attributes}>{props.children}</StyledVariable>
	);
};
