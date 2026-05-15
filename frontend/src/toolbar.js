// toolbar.js
import { DraggableNode } from './draggableNode';
import './nodes/nodes.css';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '10px' }}>
            <div style={{
                marginTop: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                alignItems: 'center',
            }}>
                {/* Original 4 nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                {/* 5 new nodes (Part 1) */}
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='api' label='API Call' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='note' label='Note' />
            </div>
        </div>
    );
};