##### This is a guide for how to help contribute to the wiki.

## How to edit pages
Currently, you can only edit the wiki by opening a Pull Request to the [GitHub Repository](https://github.com/pokeclicker/pokeclicker-wiki). We will be working on adding a better tool in the future.

### Edit markdown pages
For editing markdown pages, you can test your changes by pressing the edit icon in the top right cornor of each page, and change the markup.
The changes will be shown live, and can then be added using either the GitHub website, or your GitHub tool of choice.
All the standard markdown tools should be avaiable. If anything is missing, ask for it on discord!
You can see some tips for markdown below, like how to make links for other wiki pages.

### Edit HTML pages
To test your changes for HTML pages, you need to run the site locally. This can be done using a tool like VS Codes "Live Server".
All the game data is available for use in the HTML pages, using the framework Knockout (just like what the game is using).
To run it locally, you might need to run the command "git submodule update --remote".

### Edit Javascript
You will very rarely need to edit the Javascript files. It's only used for general stuff, which should work by now.
Try to write page specific Javascript in the Knockout, if possible.
After you have editted a Javascript file, you need to run "npm start".

### Page structure
Each needs to have one or two HTML-pages in the "pages"-folder. The "overview.html" should always be included. This is either used for a list overview for pages with more than one page (like Pokémon), or the full page for pages with no sub-pages (like Farm).
The "main.html" is used for a bunch of pages, where we can auto generate the page-specific content. Like the Pokémon page, all the stats can be pulled from the game data, so no need to make a page for each individual Pokémon.

Here is a table of how a page is build, and which files should be changed to change content. We will be using Berries as example:
Page Element | File | File for example | Description
:--- | :--- | :--- | :---
Page Title | Autogenerated | - | This is the title of the page. It's generated from the link.
Page description | data/"Page type"/overview_description.md OR data/"Page type"/"name"_description.md | data/Berries/overview_description.md OR data/Berries/Cheri_description.md | A short description in the start of the page. Uses Markdown.
Table of Contents | Autogenerated | - | This is the Table of Contents. It will be auto generated from the headers of the page.
Autogenerated page | pages/"Page type"/overview.html OR pages/"Page type"/"Page name".html | pages/berries/overview.html OR pages/berries/main.html | A HTML page with all the stuff that can be generated. Uses Knockout. overview.html should contain a list of the subpages (if any). main.html should fetch data from the games data, based on "Page name". If you are unsure how to generate stuff, or if stuff can be generated, please ask in the discord.
Page content | data/"Page type"/overview.md OR data/"Page type"/"name".md | data/Berries/overview.md OR data/Berries/Cheri.md | All the content that we cannot autogenerate. Uses Markdown.

## Markdown tips

# Headers use the `(#)` symbol {#header-info} {#headers}
### Add more for sub headings
```
# Headers use the `(#)` symbol {#header-info}
### Add more for sub headings
```
---

3 dashes `(-)`  in a row for a horizontal line
```
---
```

---

### Basic table: {#tables}

Title | center aligned | right aligned
:--- | :---: | ---:
Row | lorem | ipsum
1 | 2 | 3
4 | 500 | 600

```
Title | center aligned | right aligned
:--- | :---: | ---:
Row | lorem | ipsum
1 | 2 | 3
4 | 500 | 600
```

---

### Linking to other wiki pages: {#linking}

[[Pokemon]] or [[Pokemon/Charmander]] or @[[Wiki Guide]]
```
[[Pokemon]] or [[Pokemon/Charmander]] or @[[Wiki Guide]]
```

---

### Images {#images}

Images should be located in the `/images/` folder

[[File:Belue.png|20px]] [[File:Belue.png]] [[File:Pokeball.svg|45]]

```
[[File:Belue.png|20px]] [[File:Belue.png]] [[File:Pokeball.svg|45]]
```

---

### Links {#links}

[pokeclicker](https://pokeclicker.com) or [scroll to header info](#header-info) or [scroll to here](#here) {#here}

```
[pokeclicker](https://pokeclicker.com) or [scroll to header info](#header-info) or [scroll to here](#here) {#here}
```