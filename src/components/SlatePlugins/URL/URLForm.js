import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 10px;
	border: 1px solid black;

	& > * {
		&:not(:first-child) {
			margin-top: 10px;
		}
	}
`;
const SingleLineInput = styled.div`
	display: flex;
`;
const Buttons = styled.div`
	display: flex;
`;
const StyledButton = styled.button`
	margin-left: 10px;
	margin-right: 10px;
`;
const InputLabel = styled.div`
	margin-right: 5px;
`;
const RemoveURLButton = styled.button``;

export default class URLForm extends Component {
	static propTypes = {
		startingValue: PropTypes.string,
		noTextSelected: PropTypes.bool,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func,
		removeURL: PropTypes.func,
	};

	static defaultProps = {
		startingValue: '',
	};

	state = {
		value: this.props.startingValue,
		textValue: '',
	};

	handleChange = e => {
		this.setState({ value: e.target.value });
	};

	handleTextChange = e => {
		this.setState({ textValue: e.target.value });
	};

	handleSubmit = () => {
		this.props.onSubmit(this.state.value, this.state.textValue);
	};

	render() {
		const {
			removeLink,
			onCancel,
			startingValue,
			noTextSelected,
		} = this.props;
		const showRemoveLink = startingValue && startingValue.length > 0;
		return (
			<MainFormContainer>
				{showRemoveLink ? (
					<RemoveURLButton onClick={removeLink}>
						Remove Link
					</RemoveURLButton>
				) : null}
				{noTextSelected ? (
					<SingleLineInput>
						<InputLabel>Text: </InputLabel>
						<input
							type="text"
							value={this.state.textValue}
							onChange={this.handleTextChange}
						/>
					</SingleLineInput>
				) : null}
				<SingleLineInput>
					<InputLabel>Link: </InputLabel>
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</SingleLineInput>
				<Buttons>
					<StyledButton onClick={this.handleSubmit}>
						Save
					</StyledButton>
					<StyledButton onClick={onCancel}>Cancel</StyledButton>
				</Buttons>
			</MainFormContainer>
		);
	}
}
