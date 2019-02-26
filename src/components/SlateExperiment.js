import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import styled from 'styled-components';
import JSONTree from 'react-json-tree';
import BackgroundColorPicker from './SlatePlugins/BackgroundColor/BackgroundColorPicker';
//alignment
import AlignmentPicker from './SlatePlugins/Alignment/AlignmentPicker';
import { TextAlignPlugin } from './SlatePlugins/Alignment/SlateTextAlignPlugin';
//bold, underline, italics
import SlateMarkButton from './SlatePlugins/SimpleDecorationMarks/SlateMarkButton';
import { MarkHotkey } from './SlatePlugins/SimpleDecorationMarks/SlateMarkHotkey';
//text color
import TextColorPicker from './SlatePlugins/TextColor/TextColorPicker';
import { TextColorPlugin } from './SlatePlugins/TextColor/TextColorPlugin';

const plugins = [
	MarkHotkey({ key: 'b', type: 'bold' }),
	MarkHotkey({ key: 'i', type: 'italic' }),
	MarkHotkey({ key: 'u', type: 'underline' }),
	TextAlignPlugin(),
	TextColorPlugin(),
];

const SlateContainer = styled.div`
	border: 1px solid #d2d2d2;
	background-color: ${({ color }) => color};
`;

const SlateEditorContainer = styled(SlateContainer)``;

const ExperimentContainer = styled.div``;

const PersistedState = styled.div`
	margin-top: 20px;
`;

const ButtonBar = styled.div`
	display: flex;
	margin-bottom: 10px;
`;

const BoldText = styled.span`
	font-weight: 700;
`;

const ItalicsText = styled.span`
	font-style: italic;
`;

const UnderlineText = styled.span`
	text-decoration: underline;
`;

const BoldIcon = () => <BoldText>B</BoldText>;
const ItalicsIcon = () => <ItalicsText>I</ItalicsText>;
const UnderlineIcon = () => <UnderlineText>U</UnderlineText>;

const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								text: 'A line of text in a paragraph.',
							},
						],
					},
				],
			},
		],
	},
});

export default class SlateExperiment extends Component {
	constructor(props) {
		super(props);
		this.editorRef = React.createRef();
	}
	static propTypes = {};

	state = {
		editMode: true,
		value: initialValue,
		persistedState: JSON.stringify(initialValue.toJSON()),
		backgroundColor: 'transparent',
	};

	onChange = ({ value }) => {
		this.setState({ value });
	};

	saveFromEdit = () => {
		this.setState({
			editMode: false,
			persistedState: JSON.stringify(this.state.value.toJSON()),
		});
	};

	cancelFromEdit = () => {
		this.setState({
			editMode: false,
			value: Value.fromJSON(JSON.parse(this.state.persistedState)),
		});
	};

	updateBackroundColor = color => {
		this.setState({ backgroundColor: color });
	};

	startEditMode = () => this.setState({ editMode: true });

	render() {
		const { editMode, value, persistedState, backgroundColor } = this.state;

		return (
			<ExperimentContainer>
				<ButtonBar>
					{editMode ? (
						<React.Fragment>
							<SlateMarkButton
								icon={<BoldIcon />}
								slateMark="bold"
								editorRef={this.editorRef}
							/>
							<SlateMarkButton
								icon={<ItalicsIcon />}
								slateMark="italic"
								editorRef={this.editorRef}
							/>
							<SlateMarkButton
								icon={<UnderlineIcon />}
								slateMark="underline"
								editorRef={this.editorRef}
							/>
							<AlignmentPicker editorRef={this.editorRef} />
							<BackgroundColorPicker
								color={backgroundColor}
								updateColor={this.updateBackroundColor}
							/>
							<TextColorPicker
								color={'#525252'}
								editorRef={this.editorRef}
							/>
							<button onClick={this.saveFromEdit}>Save</button>
							<button onClick={this.cancelFromEdit}>
								Cancel
							</button>
						</React.Fragment>
					) : (
						<button onClick={this.startEditMode}>Edit</button>
					)}
				</ButtonBar>
				{editMode ? (
					<SlateEditorContainer color={backgroundColor}>
						<Editor
							ref={this.editorRef}
							plugins={plugins}
							value={value}
							onChange={this.onChange}
						/>
					</SlateEditorContainer>
				) : (
					<SlateContainer
						color={backgroundColor}
						onDoubleClick={this.startEditMode}
					>
						<Editor plugins={plugins} value={value} />
					</SlateContainer>
				)}
				<PersistedState>
					<JSONTree data={JSON.parse(persistedState)} />
				</PersistedState>
			</ExperimentContainer>
		);
	}
}
