# [1.4.0-next.5](https://github.com/Q24/oauth-client-core/compare/v1.4.0-next.4...v1.4.0-next.5) (2023-03-27)


### Bug Fixes

* add ClientId to Token Refresh ([6764fd1](https://github.com/Q24/oauth-client-core/commit/6764fd1df144e6e082e5526012a30757e4406a6e))

# [1.4.0-next.4](https://github.com/Q24/oauth-client-core/compare/v1.4.0-next.3...v1.4.0-next.4) (2023-03-07)


### Bug Fixes

* convert urlFromSessionStorage to params instead of complete url for parseQueryParameters ([0f91a9f](https://github.com/Q24/oauth-client-core/commit/0f91a9feeae7f944ad7e8f9b36b7447d8cfbbe6c))

# [1.4.0-next.3](https://github.com/Q24/oauth-client-core/compare/v1.4.0-next.2...v1.4.0-next.3) (2023-03-07)


### Features

* getSearchParameters also checks if codeFlowUrl is stored in the sessionStorage ([db1de1f](https://github.com/Q24/oauth-client-core/commit/db1de1f0a3fce4a52bc6d8c5935bee3df530e27b))
* Rename clean-hash-fragment.js to pre-clean-url.js and extend it with code flow logic. ([758881c](https://github.com/Q24/oauth-client-core/commit/758881c30b285dfc90694d13efa936031d39e63e))

# [1.4.0-next.2](https://github.com/Q24/oauth-client-core/compare/v1.4.0-next.1...v1.4.0-next.2) (2023-03-06)


### Bug Fixes

* cleanCode function return cleanedUrl.href instead of cleanedUrl.toString() ([efc35a3](https://github.com/Q24/oauth-client-core/commit/efc35a34d95157be37e9b83e984bc48589050433))

# [1.4.0-next.1](https://github.com/Q24/oauth-client-core/compare/v1.3.1-next.2...v1.4.0-next.1) (2023-03-02)


### Features

* Refactor clearQueryParameters to cleanUrl and do cleanCode or cleanHashfragment in it ([dad319a](https://github.com/Q24/oauth-client-core/commit/dad319a963984f172b9d38f474af6e6b0697fec1))

## [1.3.1-next.2](https://github.com/Q24/oauth-client-core/compare/v1.3.1-next.1...v1.3.1-next.2) (2022-12-12)


### Bug Fixes

* remove the iFrame Silent Refresh from the default checkSession because of Cross Domain issues with the iFrames. Added TODO to investigate and pick up later. For now the functionality is turned off because it is just inconvenient, not blocking. ([083bb3f](https://github.com/Q24/oauth-client-core/commit/083bb3fe58146bdd5942ebf1f171328323393e74))

## [1.3.1-next.1](https://github.com/Q24/oauth-client-core/compare/v1.3.0...v1.3.1-next.1) (2022-12-12)


### Bug Fixes

* catch iFrame error, so the silentRefresh is properly handled ([9cb9334](https://github.com/Q24/oauth-client-core/commit/9cb93346fdf7ba1f91fdf25cd3e46c06732fa133))

# [1.3.0](https://github.com/Q24/oauth-client-core/compare/v1.2.1...v1.3.0) (2022-10-14)


### Bug Fixes

* test new version ([d387200](https://github.com/Q24/oauth-client-core/commit/d38720004db995a36265db96e433819fb65765f3))


### Features

* debug mode now possible to enable by setting localStorage variable ([b5a91b5](https://github.com/Q24/oauth-client-core/commit/b5a91b5c0527bac4e0692a802bb5ad9fde6c692b))

# [1.3.0-next.1](https://github.com/Q24/oauth-client-core/compare/v1.2.2-next.1...v1.3.0-next.1) (2022-10-14)


### Features

* debug mode now possible to enable by setting localStorage variable ([b5a91b5](https://github.com/Q24/oauth-client-core/commit/b5a91b5c0527bac4e0692a802bb5ad9fde6c692b))

## [1.2.2-next.1](https://github.com/Q24/oauth-client-core/compare/v1.2.1...v1.2.2-next.1) (2022-10-13)


### Bug Fixes

* test new version ([d387200](https://github.com/Q24/oauth-client-core/commit/d38720004db995a36265db96e433819fb65765f3))

# 1.0.0-next.1 (2022-10-13)


### Features

* initial commit ([fa67945](https://github.com/Q24/oauth-client-core/commit/fa6794551eaa3e30f70ed3576a32483a5ae23727))

# CHANGELOG

# 1.0.3

Documentation update

# 1.0.1

Added typing for Authorize Errors

# 1.0.0
Initial release of the new oauth package. This is the evolved variant of https://www.npmjs.com/package/@hawaii-framework/oidc-implicit-core which will be deprecated somewhere soon.
This package is more in line with the OpenID Connect specs in many places, and supports both Code Flow (With PKCE) and Implicit Flow.
