import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-graphql';

type JsonEditorProps = React.HTMLAttributes<HTMLDivElement> & {
  height?: string,
  value: string;
  onValueChange?: (value: string) => void;
  theme: 'light' | 'dark';
  padding?: number | string;
  readonly?: boolean;
  insertSpaces?: boolean;
};

const JsonEditor = (props: JsonEditorProps): JSX.Element => {
  const { theme, height, value, onValueChange, padding, readonly, insertSpaces } = props;

  require(theme === 'light' ? 'prism-themes/themes/prism-vs.css' : 'prism-themes/themes/prism-vsc-dark-plus.css');

  return (
    <Editor
      style={{
        height,
      }}
      highlight={(code) => highlight(code, languages.javascript, 'json5')}
      value={value}
      onValueChange={onValueChange || ((): void => {})}
      padding={padding}
      disabled={readonly}
      insertSpaces={insertSpaces}
      preClassName='line-numbers'
    />
  );
};

export default JsonEditor;
