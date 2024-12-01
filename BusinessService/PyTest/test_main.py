from fastapi.testclient import TestClient
from BusinessService import app

client = TestClient(app)

def test_public_data():
    response = client.get("/public-data")
    assert response.status_code == 200
    assert response.json() == {"message": "This is public data"}

def test_protected_data():
    token = "your_jwt_token"
    response = client.get("/protected-data", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200

def test_admin_data():
    token = "your_admin_jwt_token"
    response = client.get("/admin-data", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200