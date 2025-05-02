# app/main.py
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import uuid4
from datetime import datetime
import random

app = FastAPI(title="Glowberry Global Tax Structure Simulator API")


class TaxRoute(BaseModel):
    origin: str
    path: List[str]
    strategy: str
    tags: List[str]
    aggressiveness: str


class SimulationRequest(BaseModel):
    user_id: Optional[str] = None
    income: float
    route: List[str]
    timestamp: Optional[str] = None


class ReportRequest(BaseModel):
    email: EmailStr
    simulation_id: str


@app.get("/api/status")
def get_status():
    return {
        "status": "Glowberry API is live",
        "uptime": f"{datetime.utcnow()} UTC",
        "version": "0.1.0"
    }


@app.get("/api/routes")
def get_tax_routes():
    return {
        "routes": [
            {
                "origin": "US",
                "path": ["US", "Ireland", "Bermuda"],
                "strategy": "Double Irish",
                "tags": ["IP shifting", "royalty payments"],
                "aggressiveness": "high"
            },
            {
                "origin": "Germany",
                "path": ["Germany", "Netherlands", "Curaçao"],
                "strategy": "Dutch Sandwich",
                "tags": ["licensing", "holding company"],
                "aggressiveness": "medium"
            }
        ]
    }


@app.post("/api/simulations/log")
def log_simulation(request: SimulationRequest):
    simulation_id = str(uuid4())
    return {
        "message": "Simulation successfully logged (mock)",
        "simulation_id": simulation_id,
        "user_id": request.user_id or "anonymous",
        "income": request.income,
        "route": request.route,
        "timestamp": request.timestamp or datetime.utcnow().isoformat()
    }


@app.post("/api/report/generate")
def generate_report(request: SimulationRequest):
    simulated_tax_before = request.income * 0.30
    simulated_tax_after = request.income * random.uniform(0.01, 0.10)
    savings = simulated_tax_before - simulated_tax_after
    return {
        "message": "Report data generated (mock)",
        "report": {
            "income": request.income,
            "route": request.route,
            "tax_before": simulated_tax_before,
            "tax_after": simulated_tax_after,
            "savings": savings,
            "timestamp": datetime.utcnow().isoformat()
        }
    }


@app.post("/api/report/send")
def send_report(request: ReportRequest):
    return {
        "message": f"Simulation report {request.simulation_id} sent to {request.email} (mock)",
        "status": "email_sent"
    }


@app.post("/api/auth/signup")
def signup():
    user_id = str(uuid4())
    return {
        "message": "Signup successful (mock)",
        "user_id": user_id,
        "status": "account_created"
    }


@app.post("/api/auth/login")
def login():
    token = str(uuid4())
    return {
        "message": "Login successful (mock)",
        "token": token,
        "expires_in": "3600s"
    }


@app.get("/api/routes/user")
def get_user_routes():
    return {
        "routes": [
            {
                "origin": "Nigeria",
                "path": ["Nigeria", "Mauritius", "UAE"],
                "strategy": "Treaty routing with IP shelter",
                "tags": ["capital flow", "IP licensing"],
                "aggressiveness": "high"
            }
        ],
        "message": "Loaded user-saved routes (mock)"
    }


@app.post("/api/ethics/score")
def ethics_score(request: SimulationRequest):
    score = round(random.uniform(1, 10), 2)
    level = "low" if score < 4 else "medium" if score < 7 else "high"
    return {
        "score": score,
        "risk_level": level,
        "message": "Ethics score generated (mock)"
    }


# 