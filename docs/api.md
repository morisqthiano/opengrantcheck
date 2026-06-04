# API Reference

Base URL:

```text
http://localhost:8000/api
```

All responses use this shape:

```json
{
  "success": true,
  "message": "Message",
  "data": {}
}
```

Validation errors return HTTP `422`:

```json
{
  "success": false,
  "message": "Validation failed.",
  "data": null,
  "errors": {
    "file": ["The file field is required."]
  }
}
```

## Dashboard

`GET /dashboard`

Returns uploaded guideline, proposal, and compliance check counts.

## Guidelines

`GET /guidelines`

Returns uploaded guidelines.

`POST /guidelines`

Multipart form fields:

- `title`: required string
- `description`: nullable string
- `file`: required PDF, DOC, DOCX, or TXT, max 10MB

`GET /guidelines/{guideline}`

Returns one guideline.

`DELETE /guidelines/{guideline}`

Deletes one guideline record.

## Proposals

`GET /proposals`

Returns uploaded proposals with compliance check count.

`POST /proposals`

Multipart form fields:

- `title`: required string
- `researcher_name`: required string
- `file`: required PDF, DOC, DOCX, or TXT, max 10MB

`GET /proposals/{proposal}`

Returns one proposal with compliance checks.

`DELETE /proposals/{proposal}`

Deletes one proposal and related compliance checks.

## Compliance Checks

`GET /checks`

Returns all compliance checks.

`POST /checks/run/{proposal}`

Creates a deterministic prototype compliance check for a proposal.

`GET /checks/result/{proposal}`

Returns the latest compliance check result for a proposal.
