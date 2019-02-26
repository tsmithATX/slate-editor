import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	ALIGNED_BLOCK,
	LEFT_ALIGN,
	RIGHT_ALIGN,
	CENTER_ALIGN,
	JUSTIFY_ALIGN,
} from '../../utils/SlateTextAlignPlugin';
const emperor = '#525252';

const StyledSlateButton = styled.div`
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid ${emperor};
	line-height: 20px;
	position: relative;
`;

const OpenAlignmentButton = styled.div`
	width: 100%;
	height: 100%;
`;

const PickerPopover = styled.div`
	position: absolute;
	top: 20px;
	left: 0;
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
	top: 20;
`;

const AlignmentButton = styled.div`
	width: 20px;
	height: 20px;
	z-index; 101;
	border: 1px solid #525252;
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

	handleClick = () => {
		this.setState({ showAlignmentPicker: true });
	};

	handleClose = () => {
		this.setState({ showAlignmentPicker: false });
	};

	handleAlignmentClick = alignment => {
		return e => {
			e.preventDefault();
			e.stopPropagation();
			const { editorRef } = this.props;
			editorRef.current.setBlocks({
				type: ALIGNED_BLOCK,
				data: { alignment },
			});
			this.handleClose();
			// editorRef.current.toggleMark(slateMark).focus();
		};
	};

	render() {
		return (
			<StyledSlateButton>
				<OpenAlignmentButton onClick={this.handleClick}>
					-
				</OpenAlignmentButton>
				{this.state.showAlignmentPicker ? (
					<PickerPopover>
						<BackgroundThing onClick={this.handleClose} />
						<PopoverElements>
							<AlignmentButton
								onClick={this.handleAlignmentClick(LEFT_ALIGN)}
							>
								L
							</AlignmentButton>
							<AlignmentButton
								onClick={this.handleAlignmentClick(RIGHT_ALIGN)}
							>
								R
							</AlignmentButton>
							<AlignmentButton
								onClick={this.handleAlignmentClick(
									CENTER_ALIGN
								)}
							>
								C
							</AlignmentButton>
							<AlignmentButton
								onClick={this.handleAlignmentClick(
									JUSTIFY_ALIGN
								)}
							>
								J
							</AlignmentButton>
						</PopoverElements>
					</PickerPopover>
				) : null}
			</StyledSlateButton>
		);
	}
}
