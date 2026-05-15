// /frontend/src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';
import { useState } from 'react';

export const BaseNode = ({
    id,
    title,
    category = 'Node',
    color = '#6366f1',
    icon = '⬡',
    inputs = [],
    outputs = [],
    fields = [],
    data = {},
    selected = false,
    children,
    style = {},
}) => {
    const [values, setValues] = useState(() => {
        const init = {};
        fields.forEach(f => {
            init[f.key] = data[f.key] ?? f.defaultValue ?? '';
        });
        return init;
    });

    const handleChange = (key, value, customHandler) => {
        setValues(prev => ({ ...prev, [key]: value }));
        if (customHandler) customHandler(value, id);
    };

    return (
        <div
            className={`base-node ${selected ? 'base-node--selected' : ''}`}
            style={{ '--node-accent': color, ...style }}
        >
            {/* Header */}
            <div className="base-node__header">
                <span className="base-node__icon">{icon}</span>
                <div className="base-node__title-group">
                    <span className="base-node__category">{category}</span>
                    <span className="base-node__title">{title}</span>
                </div>
            </div>

            {/* Input Handles - LEFT */}
            {inputs.map((handle, i) => (
                <Handle
                    key={handle.id}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${handle.id}`}
                    style={{
                        top: inputs.length === 1
                            ? '50%'
                            : `${20 + (i * 60) / Math.max(inputs.length - 1, 1)}%`,
                        background: color,
                        width: 10,
                        height: 10,
                        border: '2px solid #fff',
                    }}
                />
            ))}

            {/* Output Handles - RIGHT */}
            {outputs.map((handle, i) => (
                <Handle
                    key={handle.id}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${handle.id}`}
                    style={{
                        top: outputs.length === 1
                            ? '50%'
                            : `${20 + (i * 60) / Math.max(outputs.length - 1, 1)}%`,
                        background: color,
                        width: 10,
                        height: 10,
                        border: '2px solid #fff',
                    }}
                />
            ))}

            {/* Body */}
            <div className="base-node__body">
                {fields.map(field => (
                    <div className="base-node__field" key={field.key}>
                        {field.label && (
                            <label className="base-node__label">{field.label}</label>
                        )}
                        <FieldRenderer
                            field={field}
                            value={values[field.key]}
                            onChange={(val) => handleChange(field.key, val, field.onChange)}
                        />
                    </div>
                ))}
                {children}
            </div>
        </div>
    );
};

const FieldRenderer = ({ field, value, onChange }) => {
    switch (field.type) {
        case 'textarea':
            return (
                <textarea
                    className="base-node__input"
                    value={value}
                    placeholder={field.placeholder || ''}
                    rows={field.rows || 3}
                    style={{ width: '100%', resize: 'vertical' }}
                    onChange={e => onChange(e.target.value)}
                />
            );
        case 'select':
            return (
                <select
                    className="base-node__input"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                >
                    {(field.options || []).map(opt => (
                        <option key={opt.value ?? opt} value={opt.value ?? opt}>
                            {opt.label ?? opt}
                        </option>
                    ))}
                </select>
            );
        case 'number':
            return (
                <input
                    type="number"
                    className="base-node__input"
                    value={value}
                    placeholder={field.placeholder || '0'}
                    min={field.min}
                    max={field.max}
                    onChange={e => onChange(e.target.value)}
                />
            );
        case 'custom':
            return field.render ? field.render(value, onChange) : null;
        default:
            return (
                <input
                    type="text"
                    className="base-node__input"
                    value={value}
                    placeholder={field.placeholder || ''}
                    onChange={e => onChange(e.target.value)}
                />
            );
    }
};