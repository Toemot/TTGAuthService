from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import jwt
import logging

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "your_very_long_and_secure_secret_key_1234567890"
ALGORITHM = "HS256"

class TokenData(BaseModel):
    username: str = None
    role: str = None

logging.basicConfig(level=logging.DEBUG)
def verify_token(token: str):
    try:
        logging.debug(f"Token: {token}")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logging.debug(f"Payload: {payload}")
        username: str = payload.get("sub")
        role: str = payload.get("http://schemas.microsoft.com/ws/2008/06/identity/claims/role")
        if username is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return TokenData(username=username, role=role)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.get("/public-data")
def public_data():
    return {"message": "This is TTG public data"}

@app.get("/protected-data")
def protected_data(token: str = Depends(oauth2_scheme)):
    token_data = verify_token(token)
    return {"message": f"Hello, {token_data.username}"}

@app.get("/admin-data")
def admin_data(token: str = Depends(oauth2_scheme)):
    token_data = verify_token(token)
    if token_data.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this resource",
        )
    return {"message": f"Hello Admin, {token_data.username}"}