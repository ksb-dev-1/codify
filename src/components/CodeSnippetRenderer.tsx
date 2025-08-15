import React from "react";
import { Highlight, themes } from "prism-react-renderer";

export default function CodeSnippetRenderer({ code }: { code: string }) {
  return (
    <Highlight code={code} language="javascript" theme={themes.dracula}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} p-8 h-fit overflow-x-auto`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
