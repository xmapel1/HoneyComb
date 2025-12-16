# UML – HoneyComb


## Sequence Diagram: Upload Cell

```mermaid
sequenceDiagram
  actor U as User
  participant F as React Frontend
  participant B as Express API
  participant D as MySQL Database

  U->>F: Selects image and submits
  F->>B: POST /cells (multipart/form-data)
  B->>B: Validate & save images
  B->>D: INSERT cell
  D-->>B: Insert successful
  B-->>F: JSON (new cell)
  F-->>U: Gallery updates
```
---
The interaction between the user, frontend, backend, and database when a cell (image) is uploaded 
<br></br>

## Activity Diagram: UpLoader Component Logic

```mermaid
flowchart TD
  A[User opens uploader] --> B{Image URL entered?}
  B -->|No| A
  B -->|Yes| C[Validate image URL]
  C --> D{URL valid?}
  D -->|No| E[Show error message]
  D -->|Yes| F[Send upload request]
  F --> G{Upload successful?}
  G -->|No| E
  G -->|Yes| H[Update gallery view]
```
---
The internal flow of the uploader component when an image URL is submitted
<br></br>

## Class Diagram: Frontend Domain Model

```mermaid
classDiagram
  Beekeeper --> Cell : creates
  Beekeeper --> Hive : owns
  Hive -->  Cell : saves

  class Beekeeper {
    +id: number
    +username: string
    +email: string
    +password: string
    +createdAt: date
  }

  class Hive {
    +id: number
    +title: string
    +description: string
    +createdAt: date
  }

  class Cell {
    +id: number
    +imageUrl: string
    +tags: string[]
    +createdAt: date
    +userId: number
  }
```
---
The main classes in the application and their relationships