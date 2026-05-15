// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './nodes/nodes.css';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            alert(
                `✅ Pipeline Analysis\n\n` +
                `🔵 Nodes:  ${data.num_nodes}\n` +
                `🔗 Edges:  ${data.num_edges}\n` +
                `🔄 Is DAG: ${data.is_dag ? '✅ Yes (no cycles)' : '❌ No (has cycles)'}`
            );
        } catch (err) {
            alert(`❌ Failed to submit pipeline:\n${err.message}`);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <button className="submit-btn" onClick={handleSubmit}>
                🚀 Submit Pipeline
            </button>
        </div>
    );
};