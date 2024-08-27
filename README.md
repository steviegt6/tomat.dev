# tomat.dev

> days since the last js framework: 0

---

**tomat.dev** ([tomat.dev](https://tomat.dev)) is [my](https://github.com/steviegt6) personal website.

It features a custom backend "framework" (also known to plebeians as a "library"), which—alongside the actual website—is designed to:

1. look pretty nice[^1],
2. encourage server-side rendering of pages when possible[^2],
3. be usable without JavaScript (`<noscript>` support)[^3],
4. be as free and open source as is reasonably possible,
5. have a clear barrier between frontend and backend (client- and server-side code) whenever possible,
6. and remain lightweight, delivering only what is strictly necessary to the client.

[^1]: Your mileage may vary. I intend for the site to be heavily themable, with a preference for dark mode but first-class light mode support, too.
[^2]: The backend specifically prefers generating content on the server and sending minimal content to the client when possible.
[^3]: Due to the nature of some pages/features, `<noscript>` will either limit or outright disable features or entire pages. I try to maintain a semblance of compatibility whenever possible.
