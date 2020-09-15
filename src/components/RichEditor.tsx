import React from "react";
import RichTextEditor, { EditorValue } from "react-rte";

import { ToolbarConfig } from "react-rte/lib/lib/EditorToolbarConfig";

interface EditorProps {
  onChange: (v: string) => void;
  initialValue: string;
}

export const Editor: React.FC<EditorProps> = ({ onChange, initialValue }) => {
  const [value, setValue] = React.useState<EditorValue>(
    RichTextEditor.createValueFromString(initialValue, "markdown")
  );

  const handleEditorChange = (value: EditorValue) => {
    setValue(value);
    onChange(value.toString("markdown"));
  };

  const toolbarConfig: ToolbarConfig = {
    display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS"],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
      { label: "StrikeThrough", style: "STRIKETHROUGH" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "Bullet List", style: "unordered-list-item" },
      { label: "Number List", style: "ordered-list-item" },
    ],
  };
  return (
    <RichTextEditor
      onChange={handleEditorChange}
      value={value}
      toolbarConfig={toolbarConfig}
      rootStyle={{
        marginBottom: "1rem",
      }}
      editorStyle={{
        height: "40vh",
        overflowY: "scroll",
      }}
    />
  );
};

export default Editor;
