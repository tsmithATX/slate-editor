import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	LEFT_ALIGN,
	RIGHT_ALIGN,
	CENTER_ALIGN,
	JUSTIFY_ALIGN,
} from './SlateTextAlignPlugin';
const emperor = '#525252';

const StyledSlateButton = styled.div`
	width: 30px;
	height: 30px;
	cursor: pointer;
	border: 1px solid ${emperor};
	line-height: 30px;
	position: relative;
`;

const OpenAlignmentButton = styled.div`
	width: 100%;
	height: 100%;
`;

const PickerPopover = styled.div`
	position: absolute;
	top: 30px;
	left: -2px;
	z-index: 100;
	border: 1px solid black;
`;

const BackgroundThing = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
`;

const PopoverElements = styled.div`
	z-index: 100;
	display: flex;
	position: absolute;
	top: 30;
`;

const AlignmentButton = styled.div`
	width: 30px;
	height: 30px;
	z-index; 101;
	border: 1px solid #525252;
	background-color: white;
`;

const AlignmentIcon = styled.div`
	font-weight: ${({ selected }) => (selected ? '900' : 'normal')};
`;

export default class AlignmentPicker extends Component {
	static propTypes = {
		slateMark: PropTypes.string,
		icon: PropTypes.node,
		editorRef: PropTypes.object,
	};

	state = {
		showAlignmentPicker: false,
	};

	handleOpen = () => {
		const { editorRef } = this.props;
		this.setState({ showAlignmentPicker: true });
		editorRef.current.focus();
	};

	handleClose = () => {
		this.setState({ showAlignmentPicker: false });
	};

	handleAlignmentClick = alignment => e => {
		e.preventDefault();
		e.stopPropagation();
		const { editorRef } = this.props;
		editorRef.current.setAlignment(alignment);
		this.handleClose();
	};

	render() {
		const { editorRef } = this.props;
		const currentBlockAlignment =
			editorRef.current &&
			editorRef.current.getAlignment &&
			editorRef.current.getAlignment();
		return (
			<StyledSlateButton>
				<OpenAlignmentButton onClick={this.handleOpen}>
					-
				</OpenAlignmentButton>
				{this.state.showAlignmentPicker ? (
					<PickerPopover>
						<BackgroundThing onClick={this.handleClose} />
						<PopoverElements>
							{[
								{ alignment: LEFT_ALIGN, icon: 'L' },
								{ alignment: CENTER_ALIGN, icon: 'C' },
								{ alignment: RIGHT_ALIGN, icon: 'R' },
								{ alignment: JUSTIFY_ALIGN, icon: 'J' },
							].map(alignmentButton => (
								<AlignmentButton
									onClick={this.handleAlignmentClick(
										alignmentButton.alignment
									)}
									key={alignmentButton.alignment}
								>
									<AlignmentIcon
										selected={
											currentBlockAlignment ===
											alignmentButton.alignment
										}
									>
										{alignmentButton.icon}
									</AlignmentIcon>
								</AlignmentButton>
							))}
						</PopoverElements>
					</PickerPopover>
				) : null}
			</StyledSlateButton>
		);
	}
}
