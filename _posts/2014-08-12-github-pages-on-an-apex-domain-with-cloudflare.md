---
layout: post
title: GitHub Pages on an apex domain with CloudFlare
keywords: [ github, github pages, cloudflare, dns, cdn ]
meta:
  description: "GitHub Pages on an apex domain with CloudFlare."
comments: true
---

Even after carefully reading the [GitHub Pages docs],
it took me a while to figure out a [CloudFlare] DNS configuration
with everything working how I wanted.

This guide makes the following assumptions:

- You will serve `example.com` from the project repository
  `username/example.com`.
- You want `www.example.com` to redirect to `example.com`.
- You will serve your user or organization repository
  `username/username.github.io`
  from the custom domain `io.example.com`.
- You will serve any other project site
  without a custom domain from `io.example.com`:
  `https://username.github.io/repository`
  is redirected to `https://io.example.com/repository`.

1. Add a `CNAME` file with `io.example.com`
   to the `username/username.github.io` repository.
   Optionally, redirect `io.example.com` to `example.com`
   using JavaScript (see [razor-x.github.io/index.html])
   or a CloudFlare page rule.

2. Add a `CNAME` file with `example.com`
   to the `username/example.com` repository.

3. Setup CloudFlare with these DNS records:

| Type  | Name        | Value              | CloudFlare Active |
|-------|-------------|--------------------|-------------------|
| A     | example.com | 192.30.252.153     | true              |
| A     | example.com | 192.30.252.154     | true              |
| CNAME | io          | username.github.io | true              |
| CNAME | www         | example.com        | true              |

[CloudFlare]: https://www.cloudflare.com/
[GitHub Pages docs]: https://pages.github.com/
[razor-x.github.io/index.html]: https://github.com/razor-x/razor-x.github.io/blob/eafe1df72f33fe15138d130564bb043f40956322/index.html
