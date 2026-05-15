# VectorShift Pipeline Builder
### Frontend Technical Assessment — Complete Guide

---

## 📁 Project Structure

```
VectorShift/
├── backend/
│   └── main.py                  ← FastAPI backend (DAG detection)
│
└── frontend/
    └── src/
        ├── nodes/
        │   ├── BaseNode.js       ← Core node abstraction (Part 1)
        │   ├── nodes.css         ← All styles (Part 2)
        │   ├── inputNode.js      ← Input node
        │   ├── outputNode.js     ← Output node
        │   ├── llmNode.js        ← LLM node
        │   ├── textNode.js       ← Text node (Part 3)
        │   ├── mathNode.js       ← Math node (new)
        │   ├── apiNode.js        ← API Call node (new)
        │   ├── filterNode.js     ← Filter node (new)
        │   ├── transformNode.js  ← Transform node (new)
        │   └── noteNode.js       ← Note node (new)
        ├── App.js
        ├── draggableNode.js
        ├── index.css
        ├── index.js
        ├── store.js
        ├── submit.js             ← Backend integration (Part 4)
        ├── toolbar.js            ← All 9 nodes in toolbar
        └── ui.js                 ← ReactFlow canvas
```

---

## ⚙️ Prerequisites

Before running the project, make sure you have:

| Tool | Version | Check Command |
|------|---------|---------------|
| Node.js | 16+ | `node --version` |
| npm | 8+ | `npm --version` |
| Python | 3.11+ | `python --version` |
| pip | latest | `pip --version` |

### Install Python (Windows)
1. Go to https://www.python.org/downloads
2. Download **Windows installer (64-bit)**
3. ✅ Check **"Add python.exe to PATH"** before installing
4. Click **Install Now**

### If pip not recognized, use:
```bash
py -m pip install fastapi uvicorn pydantic
```

---

## 🚀 How to Run

### Step 1 — Install Frontend Dependencies
Open terminal in VS Code and run:
```bash
cd frontend
npm install
```

### Step 2 — Install Backend Dependencies
Open a second terminal and run:
```bash
cd backend
pip install fastapi uvicorn pydantic
```
If pip doesn't work on Windows:
```bash
py -m pip install fastapi uvicorn pydantic
```

### Step 3 — Start the Backend
In the backend terminal:
```bash
cd backend
uvicorn main:app --reload
```
If uvicorn not recognized on Windows:
```bash
py -m uvicorn main:app --reload
```

✅ You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Step 4 — Start the Frontend
In the frontend terminal:
```bash
cd frontend
npm start
```

✅ You should see:
```
webpack compiled successfully
```

### Step 5 — Open in Browser
Go to: **http://localhost:3000**

> ⚠️ Note: Keep BOTH terminals running at the same time.
> Backend runs on port 8000, Frontend runs on port 3000.

---

## 🧪 How to Test — Full Guide

---

### ✅ Part 1: Node Abstraction

**What was done:**
- Created `BaseNode.js` — a single reusable component
- All nodes now use `BaseNode` instead of repeating code
- Added 5 new nodes: Math, API Call, Filter, Transform, Note

**How to test:**

1. Open **http://localhost:3000**
2. Look at the toolbar at the top — you should see **9 buttons:**
```
Input | LLM | Output | Text | Math | API Call | Filter | Transform | Note
```
3. **Drag any node** from toolbar onto the canvas
4. The node should appear with a header, fields, and connection handles

**Expected result:**
- All 9 node types appear in toolbar
- Each node has its own color and icon
- Nodes can be dragged and dropped onto canvas

---

### ✅ Part 2: Styling

**What was done:**
- Created `nodes.css` with dark theme design
- All nodes have colored headers, dark backgrounds
- Toolbar, canvas, edges and controls are all styled

**How to test:**

1. Open **http://localhost:3000**
2. Check the following:
   - Canvas background is **dark** (not white)
   - Toolbar at top has **styled buttons**
   - Drag any node — it should have a **colored header bar**
   - Connect two nodes — the **edge/line should be purple**

**Expected result:**
```
✅ Dark canvas background
✅ Colored node headers (each node has different color)
✅ Styled input fields inside nodes
✅ Purple connection lines between nodes
✅ Dark minimap in bottom right corner
```

---

### ✅ Part 3: Text Node Logic

**What was done:**
- Text node **auto-resizes** as you type
- Typing `{{ variableName }}` creates a new **input handle**

**How to test:**

#### Test Auto-resize:
1. Drag a **Text** node onto canvas
2. Click inside the text input box
3. Type a long sentence:
```
This is a long sentence that keeps going and going and going
```
4. The node should **grow wider and taller** as you type

#### Test Dynamic Handles:
1. In the same Text node, clear the text
2. Type exactly:
```
Hello {{ name }}
```
3. A new handle labeled **"name"** should appear on the LEFT side of the node

4. Now type:
```
Hello {{ name }} you are {{ age }} years old
```
5. TWO handles should appear: **"name"** and **"age"**

6. Delete `{{ age }}` from the text
7. The **"age" handle should disappear** automatically

**Expected result:**
```
✅ Node grows as text is typed
✅ Each {{ variable }} creates a handle on left side
✅ Handles disappear when variable is removed
✅ Variable names shown as pink badges below text box
```

---

### ✅ Part 4: Backend Integration

**What was done:**
- Submit button sends nodes + edges to backend
- Backend calculates node count, edge count, and checks for DAG
- Frontend shows an alert with the results

**How to test:**

#### Basic Test (Empty Pipeline):
1. Don't add any nodes
2. Click **"Submit Pipeline"** button at bottom
3. Alert should show:
```
✅ Pipeline Analysis

🔵 Nodes:  0
🔗 Edges:  0
🔄 Is DAG: ✅ Yes (no cycles)
```

#### Test with Nodes and Edges:
1. Drag these nodes onto canvas:
   - 1x **Input** node
   - 1x **LLM** node
   - 1x **Output** node

2. Connect them:
   - Hover over right side of **Input** node → small circle appears
   - Drag from that circle to left side of **LLM** node
   - Then connect **LLM** → **Output**

3. Click **"Submit Pipeline"**

4. Alert should show:
```
✅ Pipeline Analysis

🔵 Nodes:  3
🔗 Edges:  2
🔄 Is DAG: ✅ Yes (no cycles)
```

#### Test DAG Detection (Create a Cycle):
1. Add 3 nodes: Input, LLM, Output
2. Connect: Input → LLM → Output → Input (forms a loop/cycle)
3. Click **"Submit Pipeline"**
4. Alert should show:
```
✅ Pipeline Analysis

🔵 Nodes:  3
🔗 Edges:  3
🔄 Is DAG: ❌ No (has cycles)
```

---

## 🔌 API Reference

### Backend Endpoints

#### GET /
```
Returns: { "Ping": "Pong" }
Used for: Health check
```

#### POST /pipelines/parse
```
Request body:
{
  "nodes": [ { "id": "node_1", "type": "customInput", "data": {} } ],
  "edges": [ { "id": "edge_1", "source": "node_1", "target": "node_2" } ]
}

Response:
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

#### Test backend directly in browser:
Go to: **http://localhost:8000/docs**
This opens the automatic FastAPI documentation where you can test endpoints.

---

## 🐛 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| `pip not recognized` | Use `py -m pip install ...` |
| `uvicorn not recognized` | Use `py -m uvicorn main:app --reload` |
| `python not recognized` | Install Python from python.org with PATH checkbox checked |
| `npm not recognized` | Install Node.js from nodejs.org |
| CORS error in browser | Make sure backend is running on port 8000 |
| Nodes not appearing | Make sure all node files are in `/src/nodes/` folder |
| Styles not applying | Make sure `nodes.css` is imported in `index.css` |
| Submit button no response | Check backend terminal for errors |

---

## 📦 All Node Types

| Node | Color | Inputs | Outputs | Fields |
|------|-------|--------|---------|--------|
| Input | 🟢 Green | None | value | Name, Type |
| Output | 🟡 Amber | value | None | Name, Type |
| LLM | 🔵 Indigo | system, prompt | response | Model, Temperature |
| Text | 🩷 Pink | dynamic vars | output | Text (auto-resize) |
| Math | 🟠 Orange | a, b | result | Operation |
| API Call | 🔵 Sky | body | response, status | URL, Method |
| Filter | 🟢 Teal | list | passed, failed | Field, Condition, Value |
| Transform | 🟣 Purple | input | output | Transform type |
| Note | 🟡 Yellow | None | None | Note text |

---

## 👨‍💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Flow Canvas | ReactFlow |
| State Management | Zustand |
| Backend | FastAPI (Python) |
| Server | Uvicorn |
| Styling | Custom CSS |

---

*VectorShift Frontend Technical Assessment*