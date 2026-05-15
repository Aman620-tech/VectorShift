// /frontend/src/nodes/apiNode.js
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data, selected }) => (
    <BaseNode
        id={id} data={data} selected={selected}
        title="API Call" category="Integration" icon="🌐" color="#0ea5e9"
        inputs={[{ id: 'body', label: 'body' }]}
        outputs={[{ id: 'response', label: 'response' }, { id: 'status', label: 'status' }]}
        fields={[
            {
                key: 'url',
                label: 'Endpoint URL',
                type: 'text',
                defaultValue: '',
                placeholder: 'https://api.example.com/...',
            },
            {
                key: 'method',
                label: 'Method',
                type: 'select',
                defaultValue: 'GET',
                options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            },
        ]}
    />
);