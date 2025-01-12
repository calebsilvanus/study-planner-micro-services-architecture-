from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import the CORS middleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore
import sys
import os

# Add the app's directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Initialize FastAPI app
app = FastAPI()

# Allow CORS from frontend URL (you can replace with your frontend's URL)
origins = [
    "http://localhost:3000",  # For local development (React running on port 3000)
    # "https://your-frontend-url.com",  # Production frontend URL
]

# Add CORS middleware to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins (frontend URLs)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("./config/task-service-2a607-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

class PlannerData(BaseModel):
    day: str
    time: str
    task: str

class NotesData(BaseModel):
    note: str
    homework: str
    todo: str

@app.post("/save_planner")
async def save_planner(data: dict):
    try:
        planner_ref = db.collection('planner').document('weekly_schedule')
        planner_ref.set(data)
        return {"message": "Data saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/edit_planner")
async def edit_planner(data: PlannerData):
    try:
        day_ref = db.collection('planner').document('weekly_schedule')
        day_data = day_ref.get().to_dict()
        if not day_data or data.day not in day_data:
            raise HTTPException(status_code=404, detail="Day not found")
        
        day_data[data.day][data.time] = data.task
        day_ref.set(day_data)
        return {"message": "Data updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/delete_planner")
async def delete_planner(day: str, time: str):
    try:
        day_ref = db.collection('planner').document('weekly_schedule')
        day_data = day_ref.get().to_dict()
        if not day_data or day not in day_data:
            raise HTTPException(status_code=404, detail="Day not found")
        
        day_data[day][time] = ""
        day_ref.set(day_data)
        return {"message": "Data deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/save_notes")
async def save_notes(notes: NotesData):
    try:
        notes_ref = db.collection('notes').document('weekly_notes')
        notes_ref.set(notes.dict())
        return {"message": "Notes saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
