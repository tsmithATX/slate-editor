import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import URLForm from './URLForm';
import { URL_INLINE } from './URLPlugin';

const emperor = '#525252';

const EditURLButton = styled.div`
	width: 30px;
	height: 30px;
	cursor: pointer;
	border: 1px solid ${emperor};
	line-height: 30px;
	position: relative;
	background-color: ${({ selected }) => (selected ? '#d2d2d2' : 'white')};
`;

const URLIcon = styled.div``;

const StyledSlateButton = styled.div`
	width: 30px;
	height: 30px;
	cursor: pointer;
	line-height: 30px;
	position: relative;
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
	background: white;
	position: absolute;
`;

export default class URLButton extends Component {
	static propTypes = {
		editorRef: PropTypes.object,
		currentlyInURL: PropTypes.bool,
		currentURL: PropTypes.string,
		noTextSelected: PropTypes.bool,
		currentURLInline: PropTypes.object,
	};

	state = {
		showURLForm: false,
	};

	handleClose = () => {
		this.setState({ showURLForm: false });
		this.props.editorRef.current.focus();
	};

	handleEditUrl = () => {
		const { editorRef, currentURLInline } = this.props;
		if (currentURLInline.type === URL_INLINE) {
			editorRef.current.moveToStartOfInline().moveFocusToEndOfInline();
		}
		this.setState(({ showURLForm }) => ({
			showURLForm: !showURLForm,
		}));
		editorRef.current.focus();
	};

	updateLink = (newLink, addText) => {
		this.props.editorRef.current.createURL(newLink, addText).focus();
		this.setState({ showURLForm: false });
	};

	handleRemoveLink = () => {
		this.props.editorRef.current.removeURL().focus();
		this.setState({ showURLForm: false });
	};

	render() {
		const { currentlyInURL, currentURL, noTextSelected } = this.props;
		const { showURLForm } = this.state;

		return (
			<StyledSlateButton>
				<EditURLButton
					onClick={this.handleEditUrl}
					selected={currentlyInURL}
				>
					<URLIcon>{'🔗'}</URLIcon>
				</EditURLButton>
				{showURLForm ? (
					<PickerPopover>
						<BackgroundThing onClick={this.handleClose} />
						<PopoverElements>
							<URLForm
								startingValue={currentURL}
								onSubmit={this.updateLink}
								onCancel={this.handleClose}
								removeLink={this.handleRemoveLink}
								noTextSelected={noTextSelected}
							/>
						</PopoverElements>
					</PickerPopover>
				) : null}
			</StyledSlateButton>
		);
	}
}
