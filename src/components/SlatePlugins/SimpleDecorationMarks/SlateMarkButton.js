import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const emperor = '#525252';
const StyledSlateButton = styled.div`
	width: 30px;
	height: 30px;
	cursor: pointer;
	border: 1px solid ${emperor};
	line-height: 30px;
`;

export default class SlateMarkButton extends Component {
	static propTypes = {
		slateMark: PropTypes.string,
		icon: PropTypes.node,
		editorRef: PropTypes.object,
	};

	handleClick = () => {
		const { editorRef, slateMark } = this.props;
		editorRef.current.toggleMark(slateMark).focus();
	};

	render() {
		const { icon } = this.props;
		return (
			<StyledSlateButton onClick={this.handleClick}>
				{icon}
			</StyledSlateButton>
		);
	}
}
