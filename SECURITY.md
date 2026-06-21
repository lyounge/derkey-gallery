# Security

## What This Site Contains

This is a static GitHub Pages site. It should not contain private API keys,
passwords, tokens, or server-side code.

## Sensitive Files

Do not commit:

- `.env` or `.env.*`
- API keys, tokens, passwords, or private certificates
- private documents or files that should not be public

The repository is public, so every committed file can be downloaded by anyone.

## GitHub Account Safety

Keep GitHub two-factor authentication enabled for accounts with write access.
Only trusted accounts should be collaborators on this repository.

Recommended repository settings:

- Protect the `main` branch.
- Require a pull request before merging.
- Require status checks before merging when checks exist.
- Do not allow force pushes to `main`.
- Do not allow deletions of `main`.

## Reporting

If someone finds a security problem, report it privately to the repository owner
instead of opening a public issue with sensitive details.
