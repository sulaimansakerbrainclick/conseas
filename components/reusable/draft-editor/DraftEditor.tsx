import React, { Component, useState } from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = ({
  value,
  onChange: doChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) => {
  const blocksFromHtml = htmlToDraft(value);

  const [state, setState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap)
    )
  );

  const handleChange = (editorState: EditorState) => {
    setState(editorState);

    doChange(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  return (
    <div className="border border-gray-300 w-full">
      <Editor
        editorState={state}
        wrapperClassName="w-full"
        editorClassName="w-full"
        onEditorStateChange={handleChange}
      />
    </div>
  );
};

export default DraftEditor;
