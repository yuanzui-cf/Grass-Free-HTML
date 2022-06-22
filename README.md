<div align=center>
    <img src="./img/LOGO.png" width="200"><img src="./img/FreeHTML.png" width="200">
    <h1>Grass FreeHTML Parser</h1>
</div>

Grass FreeHTML Parser is a parser for [FreeHTML](https://docs.aroton.top/docs/freehtml-help.txt).

FreeHTML is a markup language which is first mentioned and made by Aroton Studio. The purpose of FreeHTML is to make writing web pages easier. For example, you just need to write `<html5>` instead of `<!DOCTYPE html>`.

## How to use it

If you just need to parse one page, you can use:

```sh
gfp [Page Path] [Output Path]
```

For example

```sh
gfp ./text.fht ./text.html
```

Then, you will see `text.html` in your folder.

Sometimes we want to parse many pages, and it is inefficient to parse one by one. We can create a file named `fhtconfig.json`. Content like:

```json
[
  {
    "in":"FHT Path",
    "out":"Output Path"
  },
  {
    "in":"FHT Path",
    "out":"Output Path"
  }
]
```

There is a optional option called `compress`. The type of `compress` is bool. If this option is true, the output document will be compressed. Content like:

```json
[
  {
    "in":"FHT Path",
    "out":"Output Path",
    "compress":true
  }
]
```

Then, you just need to enter:

```sh
gfp
```

Then, your pages will be parsed in a few moments.
