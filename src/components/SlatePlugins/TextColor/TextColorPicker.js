import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import Color from 'color';
import { COLOR_MARK } from './TextColorPlugin';
import { pickerPresetColors } from '../../../constants/colors';

const ColorPickerButtonWrapper = styled.div`
	position: relative;
`;

const PickerPopover = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
`;

const MainColorButton = styled.div`
	border: 1px solid #525252;
	width: 30px;
	height: 30px;
	position: relative;
`;

const ColorLetter = styled.div`
	width: 26px;
	height: 26px;
	line-height: 20px;
	margin: 2px;
`;

const MiniColorBar = styled.div`
	position: absolute;
	width: 24px;
	height: 6px;
	top: 20px;
	left: 3px;
	background-color: ${({ color }) => (color ? color : 'black')};
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

const reactColorToColorString = reactColorObj => {
	if (typeof reactColorObj === 'string') {
		return reactColorObj;
	}
	return `rgba(${reactColorObj.r}, ${reactColorObj.g}, ${reactColorObj.b}, ${
		reactColorObj.a
	})`;
};

const colorStringToReactColor = colorString => {
	if (typeof colorString === 'object') {
		return colorString;
	}
	const colorObj = Color(colorString).object();
	const alpha = colorObj.alpha;
	const alphaObj = typeof alpha === 'number' ? { a: alpha } : {};
	return {
		r: colorObj.r,
		g: colorObj.g,
		b: colorObj.b,
		...alphaObj,
	};
};

export default class TextColorPicker extends Component {
	static propTypes = {
		color: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		updateColor: PropTypes.func,
		editorRef: PropTypes.object,
	};

	state = {
		displayColorPicker: false,
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false });
		const { editorRef } = this.props;
		editorRef.current.focus();
	};

	handleClick = () => {
		this.setState({
			displayColorPicker: true,
		});
	};

	handleChange = color => {
		const { editorRef } = this.props;
		const colorString = reactColorToColorString(color.rgb);

		editorRef.current
			.removeColorsAtSelection()
			.addMark({
				type: COLOR_MARK,
				data: { fontColor: colorString },
			})
			.focus();
	};

	render() {
		const { color } = this.props;

		return (
			<ColorPickerButtonWrapper>
				<MainColorButton onClick={this.handleClick}>
					<ColorLetter color={color}>A</ColorLetter>
					<MiniColorBar color={color} />
				</MainColorButton>
				{this.state.displayColorPicker ? (
					<PickerPopover>
						<BackgroundThing onClick={this.handleClose} />
						<SketchPicker
							color={colorStringToReactColor(color)}
							onChange={this.handleChange}
							presetColors={pickerPresetColors}
						/>
					</PickerPopover>
				) : null}
			</ColorPickerButtonWrapper>
		);
	}
}
