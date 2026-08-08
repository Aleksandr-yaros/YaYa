# GitHub Media Storage Standard

Version: **1.0.0**  
Status: **approved**  
Date: **2026-08-08**  
Class: **C2 / E4**

## 1. Purpose

Define how photos, scans, drawings, diagrams, screenshots and other visual materials are stored in GitHub without mixing projects or exposing sensitive materials.

## 2. Project-first rule

A visual file belongs to the repository of the project that owns its lifecycle. `Aleksandr-yaros/YaYa` stores only public-safe architecture visuals, routing diagrams, icons and references. Client photos, signed scans, commercial materials and internal visual assets go to the corresponding private project repository.

## 3. Canonical folders inside each project repository

```text
assets/
  images/
    source/        # original photos and images
    edited/        # approved edited versions
    diagrams/      # diagrams, schemes, drawings
    screenshots/   # UI and evidence screenshots
    scans/         # scanned paper documents
  thumbnails/      # optional previews
  manifest/        # metadata indexes
```

For legal repositories use:

```text
legal/
  originals/
  scans/
  attachments/
  metadata/
```

## 4. File naming

Preferred format:

```text
YYYY-MM-DD_project_subject_type_vNN.ext
```

Examples:

```text
2026-08-08_yakassa_terminal_front_photo_v01.jpg
2026-08-08_bot-factory_architecture_diagram_v03.png
2026-08-08_contract-client-x_signed_scan_v01.pdf
```

Use lowercase Latin names, hyphens or underscores, no ambiguous names such as `IMG_1234` as the final canonical filename.

## 5. Metadata

Important visual materials should have a sidecar metadata entry or manifest record containing:

- project;
- category;
- date;
- source;
- author/owner if relevant;
- sensitivity;
- short description;
- version;
- related document/issue/ADR;
- commit SHA after save.

## 6. Privacy

- Public repositories: only materials intentionally safe for public disclosure.
- Private repositories: client materials, commercial designs, internal screenshots, signed documents and sensitive scans.
- Secrets, passwords, API keys, QR secrets, bank credentials and identity-document data must not be committed without an explicit approved protected-storage policy.

If a file contains sensitive personal/legal/financial information and the target repository is public, saving is blocked.

## 7. Photos and large binaries

Git can store images, but large or frequently changing binaries increase repository size because history is retained. Routine photos, diagrams and scans should be kept reasonably sized and optimized. Large media collections or very large source files should use Git LFS or a dedicated object/archive storage with Git storing the manifest and reference.

Default rule for this ecosystem: ordinary project images can live directly in GitHub; large raw photo/video collections should not be dumped into normal Git history.

## 8. Versioning

Do not overwrite an important original silently.

- `source/` original is immutable once accepted.
- edited variants receive their own version.
- replacement of a canonical image requires a commit message describing the replacement.
- legally significant scans retain original and metadata.

## 9. Retrieval phrases

The router should understand phrases such as:

- `А достань фото по YaKassa`;
- `А покажи последний рисунок Фабрики ботов`;
- `А запиши это фото в проект CallCenter`;
- `А запомни этот скан договора`;
- `А найди схему архитектуры`.

The router returns: project → repository → path → version/date → commit/source.

## 10. Upload workflow

When a user provides an image or file and says `А запиши` or `А запомни`:

1. determine project;
2. determine sensitivity and repository visibility;
3. classify as source / edited / diagram / screenshot / scan;
4. propose or derive a canonical filename;
5. save in the project repository;
6. update manifest if material is important;
7. return repository, path, version and commit SHA.

For C2-C4 materials show C/E and rollback/restore path.

## 11. One original — one source of truth

Do not duplicate the same canonical photo or drawing across projects. Other repositories keep a link, identifier, small public-safe derivative, or ADR reference where needed.
