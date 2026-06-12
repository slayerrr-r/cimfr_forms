# Lab Forms Backend

FastAPI backend for the lab forms frontend.

## Run

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## API surface

- `GET /health`
- `GET /parties`
- `POST /parties`
- `GET /parties/{party_id}`
- `DELETE /parties/{party_id}`
- `GET /parties/{party_id}/samples`
- `POST /parties/{party_id}/samples`
- `GET /samples/{sample_id}`
- `DELETE /samples/{sample_id}`
- `GET /samples/{sample_id}/analysis`
- `PUT /samples/{sample_id}/analysis`

The analysis endpoint stores the full master form payload as JSON so the frontend can save the exact nested form structure later.
