import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_SIZE_MARK } from './FontSizePlugin';

const FontSizeButtonWrapper = styled.div`
	position: relative;
`;

const PickerPopover = styled.div`
	position: absolute;
	top: 30px;
	left: 0;
	z-index: 100;
`;

const MainFontSizeButton = styled.div`
	border: 1px solid #525252;
	width: 60px;
	height: 30px;
	position: relative;
`;

const FontSizeLetter = styled.div`
	width: 56px;
	height: 26px;
	line-height: 26px;
	margin: 2px;
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
const FontSizeElements = styled.div`
	z-index: 100;
	position: absolute;
	top: 30;
`;

const FontSizeElement = styled.div`
	height: 30px;
	min-width: 60px;
	line-height: 30px;
	background-color: white;
	z-index: 10;
	cursor: pointer;
`;

export default class FontSizePicker extends Component {
	static propTypes = {
		fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		editorRef: PropTypes.object,
	};

	state = {
		displayFontPicker: false,
	};

	handleClose = () => {
		this.setState({ displayFontPicker: false });
		const { editorRef } = this.props;
		editorRef.current.focus();
	};

	handleClick = () => {
		this.setState({
			displayFontPicker: true,
		});
	};

	handleChange = fontSize => e => {
		const { editorRef } = this.props;
		e.preventDefault();
		e.stopPropagation();
		editorRef.current
			.removeFontSizeAtSelection()
			.addMark({
				type: FONT_SIZE_MARK,
				data: { fontSize },
			})
			.focus();
		this.handleClose();
	};

	interruptClose = e => {
		console.log('tests');
		e.preventDefault();
		e.stopPropagation();
	};

	render() {
		const { fontSize } = this.props;

		return (
			<FontSizeButtonWrapper>
				<MainFontSizeButton onClick={this.handleClick}>
					<FontSizeLetter fontSize={fontSize}>
						{fontSize} px
					</FontSizeLetter>
				</MainFontSizeButton>
				{this.state.displayFontPicker ? (
					<PickerPopover>
						<FontSizeElements>
							{[
								10,
								11,
								12,
								14,
								16,
								18,
								24,
								36,
								48,
								60,
								72,
								96,
							].map(availableFontSize => {
								return (
									<FontSizeElement
										onClick={this.handleChange(
											availableFontSize
										)}
										key={`font-size-${availableFontSize}`}
									>
										{availableFontSize}
									</FontSizeElement>
								);
							})}
						</FontSizeElements>
						<BackgroundThing onClick={this.handleClose} />
					</PickerPopover>
				) : null}
			</FontSizeButtonWrapper>
		);
	}
}
