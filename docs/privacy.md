
# Privacy Notes

OpenGrantCheck is designed as a local-first and self-hosted workflow for research administration documents.

Prototype V0.1 does not send uploaded guideline or proposal files to external APIs. Uploaded files are stored on the local Laravel storage disk, and compliance results are generated from deterministic dummy checklist data.

Development rules:

- Do not commit real proposal documents.
- Do not commit private grant guidelines unless they are explicitly public.
- Do not store API keys or credentials in the repository.
- Use files in `samples/` only for public, synthetic, or dummy test data.
