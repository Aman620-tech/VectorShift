# /backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request models ──────────────────────────────────────────
class Node(BaseModel):
    id: str
    type: str = ""
    data: Any = {}

class Edge(BaseModel):
    id: str
    source: str
    target: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# ── DAG Detection ───────────────────────────────────────────
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Checks if the graph formed by nodes + edges is a
    Directed Acyclic Graph (DAG) using DFS cycle detection.
    """
    # Build adjacency list
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)

    # DFS states: 0 = unvisited, 1 = in progress, 2 = done
    state = {node.id: 0 for node in nodes}

    def has_cycle(node_id: str) -> bool:
        if state.get(node_id, 0) == 1:
            return True   # Back edge found → cycle!
        if state.get(node_id, 0) == 2:
            return False  # Already fully processed

        state[node_id] = 1  # Mark as in-progress

        for neighbor in graph.get(node_id, []):
            if has_cycle(neighbor):
                return True

        state[node_id] = 2  # Mark as done
        return False

    for node in nodes:
        if state[node.id] == 0:
            if has_cycle(node.id):
                return False  # Has cycle → NOT a DAG

    return True  # No cycles found → IS a DAG


# ── Endpoints ───────────────────────────────────────────────
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }