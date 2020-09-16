import React from "react";
import RichTextEditor, { EditorValue } from "react-rte";
import { ToolbarConfig } from "react-rte/lib/lib/EditorToolbarConfig";

import styles from "./RichEditor.module.css";

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
      {
        label: "Bold",
        style: "BOLD",
        className: styles.Button,
      },
      { label: "Italic", style: "ITALIC", className: styles.Button },
      { label: "Underline", style: "UNDERLINE", className: styles.Button },
      {
        label: "StrikeThrough",
        style: "STRIKETHROUGH",
        className: styles.Button,
      },
    ],
    BLOCK_TYPE_BUTTONS: [
      {
        label: "Bullet List",
        style: "unordered-list-item",
        className: styles.Button,
      },
      {
        label: "Number List",
        style: "ordered-list-item",
        className: styles.Button,
      },
    ],
  };
  return (
    <RichTextEditor
      onChange={handleEditorChange}
      value={value}
      toolbarConfig={toolbarConfig}
      editorClassName={styles.Editor}
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
