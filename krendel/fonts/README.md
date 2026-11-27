# The code's fonts

Krendel's settings offer these fonts for the code. `web/fonts.css` gives each its family, and a browser loads one only when the code takes it. Each folder has the font's license.

| Folder             | Family           | Source                                                                                                                 | License                                          |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `8bit`             | ZX Spectrum      | The machine own typeface, from the ROM. The Cyrillic is drawn by hand.                                                 | GPL-3.0-or-later, `COPYING.txt`                  |
| `8bit`             | ZX Spectrum 6x8  | Drawn by hand after 8x8 glyphs, squeezed in the 6x8                                                                    | GPL-3.0-or-later, `COPYING.txt`                  |
| `8bit`             | Cambridge Z88    | The machine' own typeface, from the bitmaps in ZEsarUX, Copyright (C) 2013 Cesar Hernandez Bano.                       | GPL-3.0-or-later, `COPYING.txt`                  |
| `8bit`             | MSX              | The MSX's own typeface, from the charset images on the [MSX Resource Center's wiki](https://www.msx.org/wiki/Codepage) | GPL-3.0-or-later, `COPYING.txt`                  |
| `8bit`             | PICO-8           | From Lexaloffle Games' [`pico-8_font_022.png`](https://www.lexaloffle.com/gfx/pico-8_font_022.png)                     | CC0-1.0, `LICENSE-pico-8.txt`                    |
| `8bit`             | TIC-80           | From [TIC-80](https://github.com/nesbox/TIC-80)'s `src/core/font.inl` at `7656cf4`, Copyright (c) 2017 Vadim Grigoruk  | MIT, `LICENSE-tic-80.txt`                        |
| `ibm-pc-8x8`       | IBM PC 8x8       | The IBM PC CGA's 8×8 font with an extended set: WebPlus IBM CGA of [The Ultimate Oldschool PC Font Pack](https://int10h.org/oldschool-pc-fonts/fontlist/font?ibm_cga) 2.2, by VileR, with the glyphs of the sheet beside it, which adds Kazakh's, Tatar's and Uzbek's letters. IBM PC 8x8 Tall is the same font half as wide | CC BY-SA 4.0, `LICENSE.TXT`                      |
| `iosevka`          | Iosevka          | Iosevka Fixed 34.9.1, Copyright (c) 2015-2026 Renzhi Li                                                                | OFL-1.1, `LICENSE.md`                            |
| `jetbrains-mono`   | JetBrains Mono   | Copyright 2020 The JetBrains Mono Project Authors                                                                      | OFL-1.1, `OFL.txt`                               |
| `fira-code`        | Fira Code        | Copyright 2014-2021 The Fira Code Project Authors                                                                      | OFL-1.1, `LICENSE.txt`                           |
| `hack`             | Hack             | Copyright 2018 Source Foundry Authors, and 2003 Bitstream, Inc.                                                        | MIT and the Bitstream Vera License, `LICENSE.md` |
| `ibm-3270`         | IBM 3270         | Copyright 2011-2022 Ricardo Banffy and 1993-2011 Paul Mattes                                                           | OFL-1.1, `LICENSE.txt`                           |
| `bigblue-terminal` | BigBlue Terminal | Copyright 2015 VileR                                                                                                   | CC BY-SA 4.0, `LICENSE.txt`                      |
| `monocraft`        | Monocraft        | Copyright 2022 Idrees Hassan                                                                                           | OFL-1.1, `OFL.txt`                               |
| `press-start-2p`   | Press Start 2P   | Copyright 2012 The Press Start 2P Project Authors                                                                      | OFL-1.1, `OFL.txt`                               |

## The pixel fonts' sheets

Each font in `8bit` is drawn from a PNG of the same name, a pixel for each of the font's, which `uv run web/make-fonts.py 8bit` makes into the font after an edit. A dark pixel is set, and an empty cell is a character the font lacks, which the system's monospace shows. The cells are 8 pixels high and as wide as the font's characters, 16 to a row, counted from 1. The table's one empty cell, row 7's first, is the no-break space, which the font has as a blank.

|  Row | First  |   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |   9   |  10   |  11   |  12   |  13   |  14   |  15   |  16   |
| ---: | ------ | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|    1 | U+0020 | space |   !   |   "   |   #   |   $   |   %   |   &   |   '   |   (   |   )   |   *   |   +   |   ,   |   -   |   .   |   /   |
|    2 | U+0030 |   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |   9   |   :   |   ;   |   <   |   =   |   >   |   ?   |
|    3 | U+0040 |   @   |   A   |   B   |   C   |   D   |   E   |   F   |   G   |   H   |   I   |   J   |   K   |   L   |   M   |   N   |   O   |
|    4 | U+0050 |   P   |   Q   |   R   |   S   |   T   |   U   |   V   |   W   |   X   |   Y   |   Z   |   [   |  \\   |   ]   |   ^   |   _   |
|    5 | U+0060 |   `   |   a   |   b   |   c   |   d   |   e   |   f   |   g   |   h   |   i   |   j   |   k   |   l   |   m   |   n   |   o   |
|    6 | U+0070 |   p   |   q   |   r   |   s   |   t   |   u   |   v   |   w   |   x   |   y   |   z   |   {   |  \|   |   }   |   ~   |   ©   |
|    7 | U+00A0 |       |   ¡   |   ¿   |   £   |   €   |   ¥   |   °   |   §   |   ·   |   ×   |   Č   |   č   |   Š   |   š   |   Ž   |   ž   |
|    8 | U+0104 |   Ą   |   ą   |   Ć   |   ć   |   Ę   |   ę   |   Ł   |   ł   |   Ń   |   ń   |   Ś   |   ś   |   Ź   |   ź   |   Ż   |   ż   |
|    9 | U+00C0 |   À   |   Á   |   Â   |   Ã   |   Ä   |   Å   |   Æ   |   Ç   |   È   |   É   |   Ê   |   Ë   |   Ì   |   Í   |   Î   |   Ï   |
|   10 | U+0110 |   Đ   |   Ñ   |   Ò   |   Ó   |   Ô   |   Õ   |   Ö   |   İ   |   Ø   |   Ù   |   Ú   |   Û   |   Ü   |   Ğ   |   Ş   |   ß   |
|   11 | U+00E0 |   à   |   á   |   â   |   ã   |   ä   |   å   |   æ   |   ç   |   è   |   é   |   ê   |   ë   |   ì   |   í   |   î   |   ï   |
|   12 | U+0111 |   đ   |   ñ   |   ò   |   ó   |   ô   |   õ   |   ö   |   ı   |   ø   |   ù   |   ú   |   û   |   ü   |   ğ   |   ş   |   ÿ   |
|   13 | U+0400 |   Ѐ   |   Ё   |   Ђ   |   Ѓ   |   Є   |   Ѕ   |   І   |   Ї   |   Ј   |   Љ   |   Њ   |   Ћ   |   Ќ   |   Ѝ   |   Ў   |   Џ   |
|   14 | U+0410 |   А   |   Б   |   В   |   Г   |   Д   |   Е   |   Ж   |   З   |   И   |   Й   |   К   |   Л   |   М   |   Н   |   О   |   П   |
|   15 | U+0420 |   Р   |   С   |   Т   |   У   |   Ф   |   Х   |   Ц   |   Ч   |   Ш   |   Щ   |   Ъ   |   Ы   |   Ь   |   Э   |   Ю   |   Я   |
|   16 | U+0430 |   а   |   б   |   в   |   г   |   д   |   е   |   ж   |   з   |   и   |   й   |   к   |   л   |   м   |   н   |   о   |   п   |
|   17 | U+0440 |   р   |   с   |   т   |   у   |   ф   |   х   |   ц   |   ч   |   ш   |   щ   |   ъ   |   ы   |   ь   |   э   |   ю   |   я   |
|   18 | U+0450 |   ѐ   |   ё   |   ђ   |   ѓ   |   є   |   ѕ   |   і   |   ї   |   ј   |   љ   |   њ   |   ћ   |   ќ   |   ѝ   |   ў   |   џ   |
|   19 | U+0490 |   Ґ   |   ґ   |   Ғ   |   ғ   |   Қ   |   қ   |   Ң   |   ң   |   Ү   |   ү   |   Ұ   |   ұ   |   Һ   |   һ   |   Ә   |   ә   |
|   20 | U+04E8 |   Ө   |   ө   |   —   |   «   |   »   |   ‘   |   ’   |   “   |   ”   |   „   |   …   |   №   |   Җ   |   җ   |   Ҳ   |   ҳ   |

Rows 1 to 6 are ASCII, with © in the cell after ~, where the ZX Spectrum has it. Row 7 has the signs of Latin-1 that text needs, with the euro sign beside £ and ¥, then Č č, Š š and Ž ž of Serbian's Latin alphabet, and row 8 Polish's letters. Rows 9 to 12 are Latin-1's letters, capitals above their small letters, with Serbian's Đ đ where Latin-1 has Ð ð, and Turkish's İ ı, Ğ ğ and Ş ş where it has × ÷, Ý ý and Þ þ. Rows 13 to 18 are Cyrillic from its first row. Rows 19 and 20 have the letters of Ukrainian, Kazakh, Tatar and Uzbek past them, and the dash, quotes, ellipsis and numero sign of Russian text.

The sheets leave out what text seldom needs: Latin-1's ¢ ¤ ¦ ¨ ª ¬ ® ¯ ± ² ³ ´ µ ¶ ¸ ¹ º ¼ ½ ¾ and ÷, Icelandic's Ð ð Ý ý Þ þ, the soft hyphen, the en dash and the low quote ‚.

The ZX Spectrum's sheets have the Spectrum's ↑ in ^'s cell, as the Spectrum prints it. PICO-8's has its capitals in a to z's cells and its small capitals in A to Z's, as PICO-8 shows them. The baseline is under a cell's seventh row, and its eighth is for descenders.

A font with a regular and a bold has a second sheet for the bold, `<file>-bold.png`, in the same layout, and a character missing from it is the regular's glyph widened. The Cambridge Z88's and TIC-80's sheets are bold, as those fonts are, and MSX's and PICO-8's have no bold.

`ibm-pc-8x8/ibm-pc-8x8.png` is the IBM PC font's sheet, in the same layout with cells 8 pixels wide: the font's own glyphs for the sheets' characters, and the letters it lacks, each made from them. `make-fonts.py` puts the sheet's glyphs into `WebPlus_IBM_CGA.woff`, whose other glyphs, Greek among them, stay as they are, and writes `ibm-pc-8x8.woff2`. It writes `ibm-pc-8x8-tall.woff2` too, the IBM PC 8x8 Tall font: the same with every glyph half as wide, so that its pixels are twice as high as wide.

The Cambridge Z88's and TIC-80's fonts have ASCII alone, and the rest of their sheets is made from it by one rule. A letter that looks like a Latin one is the font's own, and a small letter shaped like its capital is that capital with rows removed. Any other letter is the ZX Spectrum 6x8 bold's, moved to the font's columns, with rows added or removed to the font's heights. A letter with a mark is its base under the font's own mark, and a Z88 capital under a mark has five of its seven rows. PICO-8's sheet has only the Cyrillic letters that look like Latin ones, since the others don't fit three columns: a capital's cell has PICO-8's small capital, and a small letter's its capital.
