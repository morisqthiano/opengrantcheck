# OpenGrantCheck Architecture Notes

OpenGrantCheck V0.1 is a local-first prototype with a Laravel REST API and a React + Vite frontend.

The current compliance check is intentionally deterministic and dummy-only. Future AI/RAG work can extend the existing `ComplianceCheckController` flow by adding document parsing, chunking, embeddings, retrieval, and an auditable rules layer.
