import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-graphql';

type GraphQLEditorProps = React.HTMLAttributes<HTMLDivElement> & {
  height?: string,
  value: string;
  onValueChange: (value: string) => void;
  theme: 'light' | 'dark';
  padding?: number | string;
  readonly?: boolean;
  insertSpaces?: boolean;
};

const GraphQLEditor = (props: GraphQLEditorProps): JSX.Element => {
  const { theme, height, value, onValueChange, padding, readonly, insertSpaces } = props;

  require(theme === 'light' ? 'prism-themes/themes/prism-vs.css' : 'prism-themes/themes/prism-vsc-dark-plus.css');

  return (
    <Editor
      style={{
        height,
      }}
      highlight={(code) => highlight(code, languages.graphql, 'graphql')}
      value={value}
      onValueChange={onValueChange}
      padding={padding}
      disabled={readonly}
      insertSpaces={insertSpaces}
      preClassName='line-numbers'
    />
  );
};

export default GraphQLEditor;
