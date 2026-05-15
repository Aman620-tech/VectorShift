🚀 Complete Run Instructions
Prerequisites Check
Open terminal and verify:
bashnode --version     # Should show v16+
npm --version      # Should show 8+
python --version   # Should show 3.11+

Step 1 — Clone/Open Project
bashcd D:\interview\VectorShift

Step 2 — Install Frontend Dependencies
bashcd frontend
npm install

Step 3 — Install Backend Dependencies
bashcd backend
py -m pip install fastapi uvicorn pydantic

Step 4 — Run Backend
Open Terminal 1 in VS Code (Ctrl + Shift + ):
bashcd D:\interview\VectorShift\backend
py -m uvicorn main:app --reload
✅ Should show:
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.

Step 5 — Run Frontend
Open Terminal 2 in VS Code (Ctrl + Shift + ):
bashcd D:\interview\VectorShift\frontend
npm start
✅ Should show:
webpack compiled successfully

Step 6 — Open Browser
http://localhost:3000

Quick Test Checklist
✅ Toolbar shows 9 nodes
✅ Drag nodes onto canvas
✅ Connect nodes with edges
✅ Text node grows when typing
✅ {{ variable }} creates handles
✅ Submit button shows alert
✅ Alert shows num_nodes, num_edges, is_dag

Common Windows Fixes
ErrorFixpip not recognizedUse py -m pip install ...uvicorn not recognizedUse py -m uvicorn main:app --reloadpython not recognizedReinstall Python with PATH checkbox ✅CORS errorMake sure backend is running on port 8000Port 3000 in useKill process or use set PORT=3001 && npm start

Both terminals must stay running simultaneously for the app to work fully!