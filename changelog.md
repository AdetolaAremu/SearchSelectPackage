# Changelog

All notable changes to this project will be documented in this file from April 2025.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.0.11] - 2025-04-10

### Added

- Added a feature to only show records on search only.
- This feature for search-only API mode requires `showOnSearch` prop to be set to `true`
- Ability to persist previously selected items across search calls

### Fixed

- Fixed the Regex to filter display key.

---

## [1.0.12] - 2025-07-10

### Added

- Feature to disable both SearchSelect and DyamicSearchSelect, the prop name is "isDisabled".
- Implemented a feature to detect available space below the SearchSelect and DynamicSearchSelect components. If the space is less than 10rem, the dropdown is automatically displayed above instead of below to maintain visibility and prevent overflow issues.

### Fixed

- Previously, using multiple SearchSelect components within the same parent component or Vue file caused conflicts. This issue has now been resolved, allowing multiple instances to coexist without errors.
