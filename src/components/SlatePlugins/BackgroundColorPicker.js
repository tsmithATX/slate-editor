import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import Color from 'color';

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
	width: 20px;
	height: 20px;
`;

const ColorSquare = styled.div`
	background-color: ${({ color }) =>
		Color(color)
			.rgb()
			.string()};
	width: 16px;
	height: 16px;
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

export default class BackgroundColorPicker extends Component {
	static propTypes = {
		color: PropTypes.object,
		updateColor: PropTypes.func,
	};

	state = {
		displayColorPicker: false,
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false });
	};

	handleClick = () => {
		this.setState({
			displayColorPicker: true,
		});
	};

	handleChange = color => {
		const colorString = reactColorToColorString(color.rgb);
		this.props.updateColor(colorString);
	};

	render() {
		const { color } = this.props;
		return (
			<ColorPickerButtonWrapper>
				<MainColorButton onClick={this.handleClick}>
					<ColorSquare color={color} />
				</MainColorButton>
				{this.state.displayColorPicker ? (
					<PickerPopover>
						<BackgroundThing onClick={this.handleClose} />
						<SketchPicker
							color={colorStringToReactColor(color)}
							onChange={this.handleChange}
						/>
					</PickerPopover>
				) : null}
			</ColorPickerButtonWrapper>
		);
	}
}
