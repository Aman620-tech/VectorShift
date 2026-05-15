// // textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input 
//             type="text" 
//             value={currText} 
//             onChange={handleTextChange} 
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }


// /frontend/src/nodes/textNode.js
// Part 3: Auto-resize + {{ variable }} dynamic handles

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import '../nodes/nodes.css';

// Extracts valid JS variable names from {{ varName }} syntax
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
};

export const TextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [text]);

  // Extract variables whenever text changes
  useEffect(() => {
    const vars = extractVariables(text);
    setVariables(vars);
  }, [text]);

  return (
    <div
      className={`base-node ${selected ? 'base-node--selected' : ''}`}
      style={{
        '--node-accent': '#ec4899',
        minWidth: 220,
        // Width grows with text length (capped at 420px)
        width: Math.min(420, Math.max(220, text.length * 2 + 220)),
        transition: 'width 0.2s ease',
      }}
    >
      {/* Header */}
      <div className="base-node__header">
        <span className="base-node__icon">📝</span>
        <div className="base-node__title-group">
          <span className="base-node__category">Content</span>
          <span className="base-node__title">Text</span>
        </div>
      </div>

      {/* Dynamic variable input handles on LEFT */}
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${30 + i * 28}px`,
            background: '#ec4899',
            width: 10,
            height: 10,
            border: '2px solid #fff',
          }}
        >
          {/* Variable label */}
          <span style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 10,
            color: '#ec4899',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            background: '#1a1d27',
            padding: '1px 4px',
            borderRadius: 4,
          }}>
            {varName}
          </span>
        </Handle>
      ))}

      {/* Output handle on RIGHT */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: '#ec4899',
          width: 10,
          height: 10,
          border: '2px solid #fff',
        }}
      />

      {/* Body */}
      <div className="base-node__body">
        <div className="base-node__field">
          <label className="base-node__label">Text</label>
          <textarea
            ref={textareaRef}
            className="base-node__input"
            value={text}
            placeholder='Type text... use {{ variable }} to create inputs'
            style={{
              width: '100%',
              resize: 'none',       // Manual resize disabled; auto-resize handles it
              overflow: 'hidden',   // Hide scrollbar during auto-resize
              minHeight: 60,
              transition: 'height 0.15s ease',
            }}
            onChange={e => setText(e.target.value)}
          />
        </div>

        {/* Show detected variables */}
        {variables.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            marginTop: 4,
          }}>
            {variables.map(v => (
              <span key={v} style={{
                background: 'rgba(236,72,153,0.15)',
                border: '1px solid rgba(236,72,153,0.4)',
                color: '#ec4899',
                fontSize: 10,
                fontWeight: 600,
                padding: '2px 7px',
                borderRadius: 20,
              }}>
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};