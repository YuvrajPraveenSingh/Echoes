
# User API Documentation

### Registration

**Endpoint:** `/api/v1/auth/signup`

**Method:** `POST`

**Description:** Register a new user.

**Request Body:**
- `email` (string, required): User's email address.
- `fullName` (object, required):
  - `firstName` (string, required): User's first name (minimum 3 characters).
  - `lastName` (string, required): User's last name (minimum 3 characters).
- `password` (string, required): User's password (minimum 8 characters).
- `profilePic` (string): User's avatar picture  url.

**Response:**
- `token` (string): User's jwt token for login.

**Example**
 - `Request body ` 
```json

 {
  "email" : "user@email.com",
  "fullName" : {
    "firstName" : "TestUser",
    "lastName" : "User"
     },
  "password":"TsestuserPasswod"
} 

```

-`Response `
```json 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViMDBjZjU4YjQwZTY1NGI1MDNmNzYiLCJpYXQiOjE3MzQwMTcyMzEsImV4cCI6MTczNDAyMDgzMX0.J6HepoTs2FRv4kKjoUiTTL_ms3t3_FNniOmN2u460xQ",
    "message": "user created successfuly"
}

```
