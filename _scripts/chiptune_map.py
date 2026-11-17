#!/usr/bin/env python3
"""Draws chiptune/map.svg, the page at /chiptune/map.svg: what chip music is made with, on what, in which files, and what plays it.

The tables below are the map. Edit them and rerun: `python3 -B _scripts/chiptune_map.py`.
Jekyll leaves `_scripts/` out of the published site.
It is drawn as a wiring diagram: a format is a vertical trace, a tool or a player is a row,
and a dot where they meet says the tool writes that format or the player plays it.
Rows and columns are drawn in table order.
"""
from pathlib import Path
from xml.sax.saxutils import escape

from chiptune_icons import GLYPHS, chip as chip_icon, glyph, glyph_width, icon

OUT = Path(__file__).resolve().parent.parent / "chiptune" / "map.svg"

# ======================================================================================
# The map
#
# Every fact below carries, in the comment above it, the page that proves it (checked 2026-11-17).
# A dot on the map is a claim: don't add one without its link. "2nd-hand" marks a fact for which
# only a wiki or a third party's page was found, not the tool's own.

# AY family and its machines: https://en.wikipedia.org/wiki/General_Instrument_AY-3-8910 (2nd-hand)
# SID in the C64, 2A03 in the NES: https://github.com/tildearrow/furnace (README chip list)
CHIPS = {  # id: (name, colour, machines that carry it)
    "ay": ("AY-3-8910 / YM2149", "#1D9E75", ["ZX Spectrum 128", "Atari ST", "Amstrad CPC", "MSX"]),
    "sid": ("SID", "#7F77DD", ["Commodore 64"]),
    "nes": ("2A03", "#D85A30", ["NES / Famicom"]),
}

# Archives were checked by listing them:
#   ZXArt   https://zxart.ee (API filter zxMusicFormat= returns pt3, stc, asc, ay, psg, ym)
#   Modland https://ftp.modland.com/pub/modules/ (folders: Spectrum/Pro Tracker 3, Spectrum/ST Song Compiler,
#           Spectrum/ASC Sound Master, ArkosTracker, GoatTracker 2, FamiTracker, SNDH, HVSC,
#           Nintendo Sound Format, YM, Video Game Music; none for .fur, .ay, .psg)
FORMATS = [  # kind, what it holds (lines), [(extension, chips, archives)]
    ("Modules", ["song data, played by", "the tracker's own routine"], [
        # http://fileformats.archiveteam.org/wiki/ASC_Sound_Master_module (2nd-hand, both formats)
        (".stc", "ay", ["ZXArt", "Modland"]),
        (".asc", "ay", ["ZXArt", "Modland"]),
        # https://github.com/oisee/vti ("Win32 version of ZX Spectrum Pro Tracker 3.xx")
        (".pt3", "ay", ["ZXArt", "Modland"]),
        # https://www.julien-nevo.com/arkostracker/
        (".aks", "ay", ["Modland"]),
        # https://github.com/georgeflower/MOD-XM-to-YM-SNDH-tool (2nd-hand: .MYS song, .MYV voices); no archive found
        (".mys", "ay", []),
        # https://github.com/leafo/goattracker2/blob/master/readme.txt (section 6.1)
        (".sng", "sid", ["Modland"]),
        # http://famitracker.com/
        (".ftm", "nes", ["Modland"]),
        # https://github.com/tildearrow/furnace (README); songs only in the repo's demos/ folder
        (".fur", "ay sid nes +", []),
    ]),
    ("Rips", ["song data with its original", "player code, needs CPU emulation"], [
        # Z80 code + data, ZX Spectrum and CPC: https://vgmrips.net/wiki/AY_File_Format
        # archive: https://worldofspectrum.org/projectay/ (static since 2008)
        (".ay", "ay", ["Project AY", "ZXArt"]),
        # 68000 replay code + data: https://sndh.atari.org/fileformat.php ; archive: https://sndh.atari.org/
        (".sndh", "ay", ["SNDH Archive", "Modland"]),
        # 6502 code + data: https://www.hvsc.c64.org/download/C64Music/DOCUMENTS/SID_file_format.txt
        # archive: https://hvsc.c64.org/
        (".sid", "sid", ["HVSC", "Modland"]),
        # 6502 code + data: https://www.nesdev.org/wiki/NSF ; archive: https://www.zophar.net/music/nintendo-nes-nsf
        (".nsf", "nes", ["Zophar's Domain", "Modland"]),
    ]),
    ("Dumps", ["log of chip", "register writes"], [
        # register writes per frame: https://documentation.help/AY-3-8910.12-ZX-Spectrum/ay_e9zqf.htm
        (".psg", "ay", ["ZXArt"]),
        # a .psg frame stream plus timer commands, meant to be compiled per platform, not played as is:
        # https://github.com/ruguevara/taym (docs/TAYM-overview.md); no archive found
        (".taym", "ay", []),
        # YM2149 registers per frame, from Atari ST, CPC and Spectrum: http://leonard.oxg.free.fr/ymformat.html
        (".ym", "ay", ["Modland", "ZXArt"]),
        # AY8910 and NES APU are in the spec, the SID is not:
        # https://github.com/vgmrips/vgmplay-legacy/blob/master/VGMPlay/vgmspec171.txt
        # archive: https://vgmrips.net/packs/ (blocks scripted access; not read, only its forum)
        (".vgm", "ay nes +", ["VGMRips", "Modland"]),
    ]),
]

# platform, note, can be emulated, [(tool, kind, chips, saves or exports, runs on)]
# runs on: zx c64 st msx win mac linux android ios web handheld, drawn as glyphs in the tool's corner
AUTHORING = [
    ("ZX Spectrum", "", True, [
        # http://fileformats.archiveteam.org/wiki/ASC_Sound_Master_module (2nd-hand)
        # https://bulba.untergrund.net/emulator_e.htm ("STC ... Sound Tracker v1.xx")
        ("Sound Tracker", "native tracker", "ay", ".stc", "zx"),
        ("ASC Sound Master", "native tracker", "ay", ".asc", "zx"),
        # https://zxart.ee/eng/software/tool/music/ay-redaktory/protracker/pro-tracker/
        ("Pro Tracker 3", "native tracker", "ay", ".pt3", "zx"),
    ]),
    ("Commodore 64", "", True, [
        # https://github.com/anarkiwi/sid-wizard (manual: saves .swm; its SID-Maker makes the .sid, on the C64)
        ("SID-Wizard", "native tracker", "sid", ".sid", "c64"),
    ]),
    ("Atari ST", "", True, [
        # https://www.pouet.net/prod.php?which=13336 and https://sndh.atari.org/trackers.php (2nd-hand)
        # Its own song format was not found. SNDH comes from a separate tool, "SSD->SND Conversion" (demozoo.org).
        ("SidSound Designer", "native, 1993 · SNDH via converter", "ay", ".sndh", "st"),
        # http://www.preromanbritain.com/maxymiser/man_v113.txt ("only SNDH files created with maxYMiser can be loaded")
        ("maxYMiser", "native tracker", "ay", ".mys .sndh", "st"),
    ]),
    ("Desktop", "Windows · macOS · Linux", False, [
        # https://bulba.untergrund.net/vortex_e.htm ("a Windows PT3-editor"; exports SNDH, ZXAYEMUL, PSG)
        # https://github.com/ivanpirog/vortextracker (main.pas: ExportPSG, SaveDialogSNDH, SaveDialogZXAY)
        ("Vortex Tracker II", "cross-tracker", "ay", ".pt3 .ay .sndh .psg", "win"),
        # https://www.julien-nevo.com/arkostracker/index.php/download/ (Windows, macOS, Linux)
        # https://www.julien-nevo.com/arkostracker/index.php/command-line-tools/ (SongToYm, SongToVgm mirror the export menu)
        ("Arkos Tracker 3", "cross-tracker", "ay", ".aks .ym .vgm", "win mac linux"),
        # https://github.com/leafo/goattracker2/blob/master/readme.txt ("Win32 or Linux"; saves .SNG, packs PRG/BIN/SID)
        # macOS download: https://cadaver.github.io/tools.html
        ("GoatTracker 2", "cross-tracker", "sid", ".sng .sid", "win mac linux"),
        # http://famitracker.com/ ("free windows tracker ... NSF-file exporting")
        ("FamiTracker", "cross-tracker", "nes", ".ftm .nsf", "win"),
        # https://famistudio.org/ (Windows, macOS, Linux, Android, iOS) and https://famistudio.org/doc/export/ (NSF, VGM)
        # iOS: https://apps.apple.com/us/app/famistudio/id6741355257 ; it reads .ftm but does not write it
        ("FamiStudio", "piano-roll editor", "nes", ".nsf .vgm", "win mac linux android ios"),
        # https://github.com/tildearrow/furnace (README: Windows, macOS, Linux; chip list)
        # https://github.com/tildearrow/furnace/blob/master/doc/2-interface/export.md (VGM; no NSF or SID export)
        ("Furnace", "multi-system tracker", "ay sid nes +", ".fur .vgm", "win mac linux"),
    ]),
    ("Handheld consoles", "Linux pocket devices", False, [
        # https://github.com/Megus/chipnomad-tracker (README: handhelds first, desktop and Android builds; AY/YM only)
        # exports: tracker/src/screens/screen_export.cpp (PSG) and the release notes (VGM)
        ("ChipNomad", "handheld tracker", "ay", ".psg .vgm", "handheld win mac linux android"),
    ]),
    ("Web browser", "", False, [
        # https://github.com/paator/bitphase (README: chips; exports PSG, TAYM, SNDH for AY songs, VGM, NSF)
        ("Bitphase", "web tracker", "ay nes", ".sndh .nsf .psg .taym .vgm", "web"),
    ]),
]

# platform, note, can be emulated, [(player, kind, chips, plays, runs on)]
PLAYBACK = [
    ("ZX Spectrum", "", True, [
        # http://bulba.untergrund.net/progr_e.htm ("Universal PT2 and PT3 player for ZX Spectrum and MSX")
        ("PTxPlay", "native PT2/PT3 routine", "ay", ".pt3", "zx msx"),
        # https://github.com/jounikor/psgpacker ("PSG packer and Z80 player for ZX Spectrum"): plays its packed form
        # No widely used native player of raw .psg was found.
        ("psgpacker", "native player · PSG packed first", "ay", ".psg", "zx"),
        # https://github.com/ruguevara/aymax-player ("takes a track in the TAYM interchange format"; builds .tap, .sna)
        ("AYMax", "native engine, 128K", "ay", ".taym", "zx"),
    ]),
    ("Desktop", "Windows · macOS · Linux", False, [
        # https://github.com/Pixel-Matter/uZX/blob/main/docs/user-guide.md (Opening Files)
        ("µZX Player", "player with visuals", "ay", ".stc .asc .pt3 .psg .taym", "win mac linux"),
    ]),
    ("Android", "", False, [
        # https://github.com/vitamin-caig/zxtune (README: Android stores)
        # formats: src/core/plugins/players (ay/aym_plugin.cpp, sid_base.cpp, gme_base.cpp, vgm_base.cpp); no SNDH
        # desktop builds: https://storage.zxtune.ru/builds/latest/ (Windows, Linux, macOS)
        ("ZXTune", "multi-format player", "ay sid nes +", ".stc .asc .pt3 .ay .sid .nsf .psg .ym .vgm", "android win mac linux"),
    ]),
    ("iOS", "", False, [
        # https://github.com/yoyofr/modizer/blob/master/src/ModizerConstants.h (SUPPORTED_FILETYPE_ZXTUNE, _FUR,
        # _ATARISOUND, _SID, _NSFPLAY, _STSOUND, _VGM)
        ("Modizer", "multi-format player", "ay sid nes +",
         ".stc .asc .pt3 .ftm .fur .ay .sndh .sid .nsf .psg .ym .vgm", "ios"),
    ]),
]

# ======================================================================================
# Layout

PX, LABEL_W, NODE_W, NODE_H, ROW, PANEL_GAP = 40, 306, 320, 44, 54, 16  # the platform boxes and their rows
NODE_X = PX + LABEL_W
GRID_X = NODE_X + NODE_W + 80  # centre of the first format column
PITCH, GROUP_GAP = 96, 36
FORMAT_W, FORMAT_H, TAG_LINE = 72, 50, 17
GLYPH = 15  # size of a platform glyph
TARGET_Y, TARGET_H, CARD_W, CARD_H = 110, 196, 164, 128  # the chip panels and their machine cards
INK, MUTED, LINE, OTHER, PAPER, PANEL = "#2C2C2A", "#5F5E5A", "#B4B2A9", "#888780", "#FBFAF7", "#F1EFE8"
FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"


def chip_colour(chip):
    return CHIPS[chip][1] if chip in CHIPS else OTHER


COLUMNS = {}  # extension -> (x, colour, chips, archives)
GROUPS = []  # (kind, note lines, left x, right x)
_x = GRID_X
for _kind, _note, _formats in FORMATS:
    GROUPS.append((_kind, _note, _x - PITCH / 2, _x + PITCH * (len(_formats) - 0.5)))
    for _ext, _chips, _archives in _formats:
        _c = _chips.split()
        COLUMNS[_ext] = (_x, chip_colour(_c[0]) if len(_c) == 1 else "#444441", _c, _archives)
        _x += PITCH
    _x += GROUP_GAP
W = int(_x - GROUP_GAP - PITCH / 2 + 50)
TAG_H = max(len(a) for _, _, _, a in COLUMNS.values()) * TAG_LINE + 6

# ======================================================================================
# Drawing


def text(x, y, s, size=13, fill=INK, weight=400, anchor="start", extra=""):
    return (f"<text x='{x:.1f}' y='{y:.1f}' font-size='{size}' fill='{fill}' font-weight='{weight}' "
            f"text-anchor='{anchor}' {extra}>{escape(s)}</text>")


def dots(right, cy, chips):
    """A row of chip dots ending at `right`."""
    return "".join(f"<circle cx='{right - 14 * (len(chips) - 1 - i):.1f}' cy='{cy:.1f}' r='5' fill='{chip_colour(c)}'/>"
                   for i, c in enumerate(chips))


def draw_rows(platforms, y, taps):
    """Platform boxes with their tools or players. Fills taps[extension] with the rows' centres. Returns (svg, y below)."""
    boxes, wires = [], []
    for platform, note, emulated, items in platforms:
        h = len(items) * ROW - (ROW - NODE_H) + 18
        cy = y + h / 2
        boxes.append(f"<rect x='{PX}' y='{y}' width='{LABEL_W + NODE_W + 10}' height='{h}' rx='10' fill='{PANEL}' "
                     f"stroke='{LINE}' stroke-width='1.2'/>")
        picture, tx = icon(platform), PX + 16
        if picture:
            boxes.append(picture.svg(PX + 56, cy, 84, min(h - 14, 64)))
            tx = PX + 110
        boxes.append(text(tx, cy + (-5 if emulated else -1 if note else 6), platform, 17, weight=600))
        if emulated:
            boxes.append(f"<rect x='{tx}' y='{cy + 4:.1f}' width='112' height='20' rx='10' fill='#FFFFFF' "
                         f"stroke='{MUTED}' stroke-width='1'/>")
            boxes.append(text(tx + 56, cy + 18, "or an emulator", 12, MUTED, anchor="middle"))
        elif note:
            boxes.append(text(tx, cy + 16, note, 12.5, MUTED))
        for i, (name, kind, chips, formats, runs_on) in enumerate(items):
            ny = y + 9 + i * ROW
            row_cy = ny + NODE_H / 2
            unknown = [e for e in formats.split() if e not in COLUMNS]
            assert not unknown, f"{name}: formats {unknown} are not in FORMATS"
            xs = [COLUMNS[e][0] for e in formats.split()]
            wires.append(f"<path d='M{NODE_X + NODE_W} {row_cy} H{max(xs)}' stroke='{LINE}' stroke-width='1.5'/>")
            for e in formats.split():
                taps.setdefault(e, []).append(row_cy)
            boxes.append(f"<rect x='{NODE_X}' y='{ny}' width='{NODE_W}' height='{NODE_H}' rx='8' fill='#FFFFFF' "
                         f"stroke='#444441' stroke-width='1.2'/>")
            boxes.append(text(NODE_X + 14, ny + 19, name, 16, weight=600))
            boxes.append(text(NODE_X + 14, ny + 35, kind, 12.5, MUTED))
            gx = NODE_X + NODE_W - 10
            for pid in reversed(runs_on.split()):
                gx -= glyph_width(pid, GLYPH)
                boxes.append(glyph(pid, gx, ny + NODE_H - 6 - GLYPH, GLYPH))
                gx -= 6
            boxes.append(dots(NODE_X + NODE_W - 16, ny + 14, chips.split()))
        y += h + PANEL_GAP
    return "".join(wires), "".join(boxes), y - PANEL_GAP


def draw_targets(x, y):
    """The chips and their machines: the legend for the colours."""
    out = []
    for name, colour, machines in CHIPS.values():
        w = max(len(machines) * (CARD_W + 12) - 12, len(name) * 11 + 70) + 36
        out.append(f"<rect x='{x:.1f}' y='{y}' width='{w:.1f}' height='{TARGET_H}' rx='12' fill='{colour}' "
                   f"fill-opacity='0.12' stroke='{colour}' stroke-width='1.5'/>")
        out.append(chip_icon(colour).svg(x + 46, y + 26, 60, 34))
        out.append(text(x + 84, y + 33, name, 18, weight=600))
        for i, m in enumerate(machines):
            cx = x + 18 + i * (CARD_W + 12)
            out.append(f"<rect x='{cx:.1f}' y='{y + 52}' width='{CARD_W}' height='{CARD_H}' rx='8' fill='#FFFFFF' "
                       f"stroke='{colour}' stroke-width='1'/>")
            picture = icon(m)
            if picture:
                out.append(picture.svg(cx + CARD_W / 2, y + 52 + (CARD_H - 26) / 2, CARD_W - 20, CARD_H - 40))
            out.append(text(cx + CARD_W / 2, y + 52 + CARD_H - 12, m, 14, anchor="middle"))
        x += w + 36
    return "".join(out)


def heading(y, platform_title, row_title):
    return text(PX, y, platform_title, 19, weight=600) + text(NODE_X, y, row_title, 19, weight=600)


def draw():
    band_top = TARGET_Y + TARGET_H + 44
    tools_y = band_top + 160
    written, played = {}, {}
    tool_wires, tool_boxes, y = draw_rows(AUTHORING, tools_y, written)
    formats_y = y + 46
    players_y = formats_y + FORMAT_H + TAG_H + 60
    player_wires, player_boxes, bottom = draw_rows(PLAYBACK, players_y, played)

    out = [text(PX, 56, "Chiptune world map", 30, weight=600), text(PX, 80, "draft 7, facts checked 2026-11-17", 14, MUTED),
           text(PX, TARGET_Y + TARGET_H / 2, "Target platforms", 19, weight=600),
           text(PX, TARGET_Y + TARGET_H / 2 + 19, "sound chips and their machines", 13, MUTED),
           draw_targets(GRID_X - PITCH / 2, TARGET_Y)]
    for kind, note, x0, x1 in GROUPS:  # the bands behind each kind of format
        out.append(f"<rect x='{x0 + 5:.1f}' y='{band_top}' width='{x1 - x0 - 10:.1f}' height='{bottom + 16 - band_top:.1f}' "
                   f"rx='12' fill='{PANEL}' fill-opacity='0.75'/>")
        out.append(icon(kind).svg((x0 + x1) / 2, band_top + 48, 110, 72))
        out.append(text((x0 + x1) / 2, band_top + 106, kind, 17, weight=600, anchor="middle"))
        out += [text((x0 + x1) / 2, band_top + 125 + 15 * i, s, 12.5, MUTED, anchor="middle") for i, s in enumerate(note)]
    out += [tool_wires, player_wires]
    nodes, taps = [], []
    for ext, (x, colour, chips, archives) in COLUMNS.items():
        tag_h = len(archives) * TAG_LINE + 6 if archives else 0
        if ext in written:
            out.append(f"<path d='M{x} {min(written[ext])} V{formats_y - 6}' stroke='{colour}' stroke-width='2.2' "
                       f"marker-end='url(#m{colour[1:]})'/>")
        if ext in played:
            out.append(f"<path d='M{x} {formats_y + FORMAT_H + tag_h} V{max(played[ext])}' stroke='{colour}' stroke-width='2.2'/>")
        taps += [f"<circle cx='{x}' cy='{cy}' r='6.5' fill='{colour}' stroke='{PAPER}' stroke-width='2'/>"
                 for cy in written.get(ext, []) + played.get(ext, [])]
        nodes.append(f"<rect x='{x - FORMAT_W / 2}' y='{formats_y}' width='{FORMAT_W}' height='{FORMAT_H}' rx='8' "
                     f"fill='#FFFFFF' stroke='{colour}' stroke-width='2'/>")
        nodes.append(text(x, formats_y + 22, ext, 16, weight=600, anchor="middle"))
        nodes.append(dots(x + 7 * (len(chips) - 1), formats_y + 37, chips))
        if archives:
            tw = max(len(a) for a in archives) * 6.6 + 14
            nodes.append(f"<rect x='{x - tw / 2:.1f}' y='{formats_y + FORMAT_H}' width='{tw:.1f}' height='{tag_h}' "
                         f"fill='#FFF6DC' stroke='#BA7517' stroke-width='1' stroke-dasharray='4 3'/>")
            nodes += [text(x, formats_y + FORMAT_H + 15 + TAG_LINE * i, a, 12, "#633806", anchor="middle")
                      for i, a in enumerate(archives)]
    out += taps + nodes + [tool_boxes, player_boxes,
                           heading(tools_y - 16, "Authoring platforms", "Trackers and editors"),
                           heading(players_y - 16, "Playback platforms", "Players"),
                           text(PX, formats_y + 24, "File formats", 19, weight=600),
                           text(PX, formats_y + 43, "and the archives that collect them", 13, MUTED)]
    ly = bottom + 64
    out += [f"<path d='M{PX} {ly} h60' stroke='#444441' stroke-width='2.2'/>",
            f"<circle cx='{PX + 30}' cy='{ly}' r='6.5' fill='#444441' stroke='{PAPER}' stroke-width='2'/>",
            text(PX + 72, ly + 5, "a dot above the formats: the tool saves or exports it; below: the player plays it. "
                 "No dot, no connection.", 13, MUTED),
            dots(PX + 760, ly, ["ay", "sid", "nes", "+"]),
            text(PX + 772, ly + 5, "chips it works with (grey: others too)", 13, MUTED),
            f"<rect x='{PX + 1030}' y='{ly - 11}' width='60' height='22' fill='#FFF6DC' stroke='#BA7517' stroke-dasharray='4 3'/>",
            text(PX + 1100, ly + 5, "archive that collects the format", 13, MUTED)]
    ly += 34
    out.append(text(PX, ly + 5, "runs on:", 13, MUTED))
    gx = PX + 66
    for pid, (label, _) in GLYPHS.items():
        out += [glyph(pid, gx, ly - GLYPH / 2, GLYPH), text(gx + glyph_width(pid, GLYPH) + 6, ly + 5, label, 13, MUTED)]
        gx += glyph_width(pid, GLYPH) + 6 + len(label) * 7.2 + 26
    out.append(text(gx, ly + 5, "and a small picture of a retro machine", 13, MUTED))
    colours = sorted({c for _, c, _, _ in COLUMNS.values()})
    markers = "".join(f"<marker id='m{c[1:]}' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='5' markerHeight='5' "
                      f"orient='auto'><path d='M1 1L9 5L1 9z' fill='{c}'/></marker>" for c in colours)
    h = int(ly + 46)
    return (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {W} {h}' font-family='{FONT}'>"
            f"<defs>{markers}</defs><rect width='{W}' height='{h}' fill='{PAPER}'/>" + "".join(out) + "</svg>\n")


if __name__ == "__main__":
    OUT.write_text(draw(), encoding="utf-8")
    print(f"wrote {OUT}")
