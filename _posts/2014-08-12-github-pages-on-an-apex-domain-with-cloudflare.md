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

- You will serve your user or organization site `username.github.io`
  from the custom domain `example.com`.
- You want `www.example.com` to redirect to `example.com`.
- You want any other project site without a custom domain
  to be served from `io.example.com`:
  `http://username.github.io/repository`
  is redirected to `http://io.example.com/repository`.

1. Add a `CNAME` file with `example.com`
   to your user or organization repository.

2. Setup CloudFlare with these DNS records:

| Type  | Name        | Value              | CloudFlare Active |
|-------|-------------|--------------------|-------------------|
| A     | example.com | 192.30.252.153     | true              |
| A     | example.com | 192.30.252.154     | true              |
| CNAME | io          | username.github.io | false             |
| CNAME | www         | example.com        | true              |

[CloudFlare]: https://www.cloudflare.com/
[GitHub Pages docs]: https://pages.github.com/
