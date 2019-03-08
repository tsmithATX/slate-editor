import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, Set } from 'immutable';
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
import {
	TextColorPlugin,
	COLOR_MARK,
} from './SlatePlugins/TextColor/TextColorPlugin';
//font size
import FontSizePicker from './SlatePlugins/FontSize/FontSizePicker';
import {
	FontSizePlugin,
	FONT_SIZE_MARK,
} from './SlatePlugins/FontSize/FontSizePlugin';
//url
import URLButton from './SlatePlugins/URL/URLButton';
import { URL_INLINE, URLPlugin } from './SlatePlugins/URL/URLPlugin';

const plugins = [
	MarkHotkey({ key: 'b', type: 'bold' }),
	MarkHotkey({ key: 'i', type: 'italic' }),
	MarkHotkey({ key: 'u', type: 'underline' }),
	TextAlignPlugin(),
	TextColorPlugin(),
	FontSizePlugin(),
	URLPlugin(),
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
	justify-content: space-between;
	margin-bottom: 10px;
`;

const EditButtons = styled.div`
	display: flex;
`;
const StateButtons = styled.div`
	display: flex;
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
	object: 'value',
	document: {
		object: 'document',
		data: {},
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				data: {},
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								object: 'leaf',
								text: 'A line of text in a ',
								marks: [],
							},
						],
					},
					{
						object: 'inline',
						type: 'url_inline',
						data: { href: 'test' },
						nodes: [
							{
								object: 'text',
								leaves: [
									{
										object: 'leaf',
										text: 'paragraph',
										marks: [],
									},
								],
							},
						],
					},
					{
						object: 'text',
						leaves: [{ object: 'leaf', text: '.', marks: [] }],
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
		showURLForm: false,
	};

	onChange = ({ value }) => {
		this.setState({ value });
	};

	saveFromEdit = () => {
		console.log(JSON.stringify(this.state.value.toJSON()));
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
		const curValue = this.state.value;

		const curMarks = curValue.marks;
		const curColors = curMarks.reduce((acc, mark) => {
			return mark.type === COLOR_MARK
				? acc.add(mark.data.get('fontColor', ''))
				: acc;
		}, new Set());

		const curFontSizes = curMarks.reduce((acc, mark) => {
			return mark.type === FONT_SIZE_MARK
				? acc.add(mark.data.get('fontSize', ''))
				: acc;
		}, new Set());

		const inURL = curValue.inlines.some(
			inline => inline.get('type') === URL_INLINE
		);
		const currentURLInline = curValue.inlines.find(
			inline => inline.get('type') === URL_INLINE,
			null,
			{
				data: new Map(),
			}
		);
		const currentURL = currentURLInline.data.get('href', '');

		const noTextSelected = value.selection.isCollapsed;

		return (
			<ExperimentContainer>
				<ButtonBar>
					{editMode ? (
						<React.Fragment>
							<EditButtons>
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
									color={curColors.first()}
									editorRef={this.editorRef}
								/>
								<FontSizePicker
									fontSize={curFontSizes.first() || 16}
									editorRef={this.editorRef}
								/>
								<URLButton
									editorRef={this.editorRef}
									currentlyInURL={inURL}
									currentURLInline={currentURLInline}
									currentURL={currentURL}
									noTextSelected={noTextSelected}
								/>
							</EditButtons>
							<StateButtons>
								<button onClick={this.saveFromEdit}>
									Save
								</button>
								<button onClick={this.cancelFromEdit}>
									Cancel
								</button>
							</StateButtons>
						</React.Fragment>
					) : (
						<button onClick={this.startEditMode}>Edit</button>
					)}
				</ButtonBar>

				<SlateEditorContainer color={backgroundColor}>
					<Editor
						ref={this.editorRef}
						plugins={plugins}
						value={value}
						onChange={this.onChange}
						readOnly={!editMode}
					/>
				</SlateEditorContainer>

				<PersistedState>
					<JSONTree data={JSON.parse(persistedState)} />
				</PersistedState>
			</ExperimentContainer>
		);
	}
}
