// /frontend/src/nodes/noteNode.js
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data, selected }) => (
    <BaseNode
        id={id} data={data} selected={selected}
        title="Note" category="Utility" icon="🗒️" color="#eab308"
        inputs={[]}
        outputs={[]}
        fields={[
            {
                key: 'note',
                label: 'Note',
                type: 'textarea',
                defaultValue: '',
                placeholder: 'Write a note about this pipeline...',
                rows: 4,
            },
        ]}
    />
);