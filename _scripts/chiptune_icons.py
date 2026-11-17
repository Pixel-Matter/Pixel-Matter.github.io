#!/usr/bin/env python3
"""Simplified isometric icons for the chiptune map (_scripts/chiptune_map.py).

An icon is built from boxes and flat patches in machine space: x runs along the machine's width,
y from its back to its front, z up. `icon(name)` returns the one for a machine or platform name.
Run this file to write a contact sheet of all icons to .out/chiptune-icons.svg, which git ignores.
"""
from pathlib import Path

RED, YELLOW, GREEN, CYAN, BLUE = "#D8232A", "#F2D21B", "#2BA84A", "#1FA7D8", "#2D6BC9"
SCREEN, SCREEN_INK, PIN = "#2F6FB3", "#9CC3EE", "#C3C7CD"


def shade(colour, k):
    return "#" + "".join(f"{min(255, int(int(colour[i:i + 2], 16) * k)):02X}" for i in (1, 3, 5))


class Icon:
    def __init__(self):
        self.faces = []  # ([(x, y) on the page], fill), back to front

    def face(self, points, fill):
        self.faces.append(([((x - y) * 0.866, (x + y) * 0.5 - z) for x, y, z in points], fill))

    def box(self, x, y, z, w, d, h, c):
        self.top(x, y, z + h, w, d, c)
        self.front(x, z, w, h, y + d, shade(c, 0.82))
        self.side(y, z, d, h, x + w, shade(c, 0.64))

    def top(self, x, y, z, w, d, c):
        """A patch lying flat at height z."""
        self.face([(x, y, z), (x + w, y, z), (x + w, y + d, z), (x, y + d, z)], c)

    def front(self, x, z, w, h, y, c):
        """A patch on a wall facing the viewer's left, at depth y."""
        self.face([(x, y, z), (x + w, y, z), (x + w, y, z + h), (x, y, z + h)], c)

    def side(self, y, z, d, h, x, c):
        """A patch on a wall facing the viewer's right, at width x."""
        self.face([(x, y, z), (x, y + d, z), (x, y + d, z + h), (x, y, z + h)], c)

    def keys(self, x, y, z, cols, rows, pitch, c):
        for r in range(rows):
            for k in range(cols):
                self.top(x + k * pitch, y + r * pitch, z, pitch - 3, pitch - 3, c)

    def svg(self, cx, cy, w, h):
        """The icon scaled to fit a w by h box centred on (cx, cy)."""
        xs = [x for pts, _ in self.faces for x, _ in pts]
        ys = [y for pts, _ in self.faces for _, y in pts]
        k = min(w / (max(xs) - min(xs)), h / (max(ys) - min(ys)))
        ox, oy = cx - k * (max(xs) + min(xs)) / 2, cy - k * (max(ys) + min(ys)) / 2
        out = []
        for pts, fill in self.faces:
            dark = sum(int(fill[i:i + 2], 16) for i in (1, 3, 5)) < 200
            out.append(f"<polygon points='{' '.join(f'{ox + k * x:.1f},{oy + k * y:.1f}' for x, y in pts)}' fill='{fill}' "
                       f"stroke='{'#FFFFFF' if dark else '#000000'}' stroke-opacity='{0.22 if dark else 0.35}' "
                       f"stroke-width='0.6' stroke-linejoin='round'/>")
        return "".join(out)


# ======================================================================================
# Retro machines


def zx_spectrum():
    """The 128K: black slab, raised keyboard, rainbow corner, ribbed heatsink down the right side."""
    ic = Icon()
    ic.box(0, 0, 0, 300, 140, 16, "#1E1E22")
    ic.top(14, 12, 16, 60, 8, RED)
    for i in range(5):
        ic.top(150, 6 + i * 5, 16, 140, 2, "#3A3A42")
    ic.box(10, 36, 16, 250, 98, 5, "#28282D")
    ic.keys(16, 41, 21, 12, 4, 19, "#4A4A53")
    for x, w in ((16, 30), (54, 150), (212, 32)):
        ic.top(x, 117, 21, w, 13, "#4A4A53")
    ic.top(266, 86, 16, 22, 6, RED)
    for i, c in enumerate((RED, YELLOW, GREEN, CYAN)):
        x = 266 + i * 5
        ic.face([(x + 10, 98, 16), (x + 15, 98, 16), (x + 5, 136, 16), (x, 136, 16)], c)
    for i in range(17):
        ic.box(300, 2 + i * 8, 0, 22, 4, 15, "#34343B")
    return ic


def commodore_64():
    """The breadbin: tall beige wedge sloping to the front, brown keys in a recessed deck, function keys on the right."""
    ic, body, w = Icon(), "#C9BEA5", 300

    def z(y):  # height of the sloping keyboard deck
        return 44 - (y - 50) * 18 / 115

    def patch(x, y, pw, d, c):
        ic.face([(x, y, z(y)), (x + pw, y, z(y)), (x + pw, y + d, z(y + d)), (x, y + d, z(y + d))], c)

    ic.box(0, 0, 0, w, 180, 22, body)
    ic.box(0, 0, 22, w, 50, 22, body)
    ic.top(18, 20, 44, 70, 9, "#E4DFD0")
    for i in range(3):
        ic.top(110, 14 + i * 9, 44, 130, 3, shade(body, 0.85))
    ic.top(262, 22, 44, 8, 6, RED)
    patch(0, 50, w, 115, shade(body, 0.95))
    ic.face([(w, 50, 22), (w, 165, 22), (w, 165, z(165)), (w, 50, 44)], shade(body, 0.64))
    ic.box(0, 165, 22, w, 15, 4, body)
    patch(12, 58, 280, 100, "#B3A78D")
    for r in range(4):
        for k in range(15):
            patch(18 + k * 16, 64 + r * 18, 13, 14, "#4A3B2F")
        patch(266, 64 + r * 18, 20, 14, "#8A7A64")
    patch(62, 136, 140, 13, "#4A3B2F")
    return ic


def atari_st():
    """Grey wedge, white keys, the slanted function keys."""
    ic = Icon()
    ic.box(0, 0, 0, 330, 190, 26, "#C9C7BD")
    for i in range(8):
        ic.top(30 + i * 34, 14, 26, 6, 24, "#AFADA3")
    for i in range(10):
        x = 22 + i * 29
        ic.face([(x + 8, 50, 26), (x + 32, 50, 26), (x + 24, 66, 26), (x, 66, 26)], "#A6A49A")
    ic.keys(14, 82, 26, 13, 4, 17, "#F4F2EA")
    ic.keys(250, 82, 26, 4, 4, 17, "#F4F2EA")
    ic.top(60, 152, 26, 120, 13, "#F4F2EA")
    ic.side(60, 10, 80, 5, 330, "#55554F")
    return ic


def amstrad_cpc():
    """The 464: long dark body, coloured keys, tape deck on the right."""
    ic = Icon()
    ic.box(0, 0, 0, 380, 130, 22, "#2F2F35")
    ic.keys(12, 34, 22, 14, 4, 16, "#8E8E96")
    ic.top(12, 34, 22, 13, 13, RED)
    ic.top(220, 50, 22, 13, 29, BLUE)
    ic.keys(244, 34, 22, 3, 4, 16, "#8E8E96")
    ic.top(276, 82, 22, 13, 13, BLUE)
    ic.top(60, 100, 22, 110, 12, "#8E8E96")
    ic.top(302, 16, 22, 68, 98, "#1C1C20")
    ic.top(310, 24, 22, 52, 44, "#4A4A52")
    for i in range(6):
        ic.top(308 + i * 10, 92, 22, 8, 14, RED if i == 0 else "#A0A0A8")
    return ic


def msx():
    """A generic MSX: cartridge slot at the back, big cursor pad."""
    ic = Icon()
    ic.box(0, 0, 0, 320, 160, 24, "#3A3F4B")
    ic.top(196, 12, 24, 104, 16, "#1D1F25")
    for i in range(5):
        ic.top(14 + i * 44, 44, 24, 38, 12, "#7F92B8")
    ic.keys(14, 68, 24, 13, 4, 17, "#D5D8DE")
    ic.top(60, 138, 24, 120, 12, "#D5D8DE")
    for x, y in ((272, 82), (272, 116), (254, 99), (290, 99)):
        ic.top(x, y, 24, 16, 16, "#7F92B8")
    return ic


def nes():
    """The front loader: two greys, cartridge door, two controller ports."""
    ic = Icon()
    ic.box(4, 4, 0, 242, 192, 22, "#4E4E55")
    ic.front(160, 4, 22, 14, 196, "#1A1A1D")
    ic.front(196, 4, 22, 14, 196, "#1A1A1D")
    ic.box(0, 0, 22, 250, 200, 58, "#CFCDC6")
    for i in range(6):
        ic.top(150, 18 + i * 14, 80, 86, 4, "#B4B2AA")
    ic.front(18, 44, 214, 30, 200, "#3A3A40")
    ic.front(18, 26, 214, 14, 200, "#202024")
    ic.front(34, 29, 26, 8, 200, "#8A8A90")
    ic.front(66, 29, 26, 8, 200, "#8A8A90")
    ic.front(22, 31, 6, 4, 200, RED)
    return ic


def chip(colour):
    """A DIP package with a stripe in the chip's map colour."""
    ic = Icon()
    ic.box(0, 0, 3, 170, 56, 16, "#2B2B2F")
    ic.top(40, 20, 19, 90, 16, colour)
    ic.top(6, 22, 19, 8, 12, "#5A5A62")
    for i in range(8):
        ic.box(10 + i * 20, 56, 0, 8, 8, 9, PIN)
    return ic


# ======================================================================================
# Modern platforms


def desktop():
    ic = Icon()
    ic.box(70, 40, 0, 60, 40, 4, "#9C9CA2")
    ic.box(92, 52, 4, 16, 10, 40, "#9C9CA2")
    ic.box(0, 48, 40, 200, 10, 120, "#2E2E33")
    ic.front(8, 48, 184, 104, 58, SCREEN)
    for i in range(5):
        ic.front(18, 132 - i * 16, 60 + (i * 37) % 90, 6, 58, SCREEN_INK)
    ic.box(20, 112, 0, 160, 44, 5, "#D2D2D6")
    for r in range(3):
        ic.top(26, 117 + r * 12, 5, 148, 8, "#9C9CA2")
    return ic


def handheld():
    """A vertical Linux pocket console: screen above, d-pad and four buttons below."""
    ic = Icon()
    ic.box(0, 0, 0, 110, 12, 170, "#DAD8D0")
    ic.front(8, 76, 94, 86, 12, "#22252B")
    ic.front(12, 80, 86, 78, 12, SCREEN)
    ic.front(14, 40, 30, 10, 12, "#3A3A40")
    ic.front(24, 30, 10, 30, 12, "#3A3A40")
    for x, zz, c in ((84, 58, YELLOW), (84, 34, GREEN), (72, 46, BLUE), (96, 46, RED)):
        ic.front(x - 4.5, zz - 4.5, 9, 9, 12, c)
    ic.front(40, 12, 12, 4, 12, "#8A8A90")
    ic.front(58, 12, 12, 4, 12, "#8A8A90")
    return ic


def phone(ios):
    ic = Icon()
    ic.box(0, 0, 0, 74, 9, 150, "#2E2E33")
    ic.front(5, 6, 64, 138, 9, SCREEN)
    for i in range(4):
        ic.front(12, 106 - i * 20, 50 - i * 7, 8, 9, SCREEN_INK)
    if ios:
        ic.front(25, 132, 24, 6, 9, "#15151A")
        ic.front(22, 10, 30, 3, 9, "#DCE9F7")
    else:
        ic.front(34, 133, 6, 6, 9, "#15151A")
    return ic


def browser():
    ic = Icon()
    ic.box(0, 0, 0, 220, 6, 150, "#E6E4DC")
    ic.front(4, 4, 212, 120, 6, "#FFFFFF")
    ic.front(4, 126, 212, 20, 6, "#C9C7BD")
    for i, c in enumerate((RED, YELLOW, GREEN)):
        ic.front(9 + i * 11, 132, 7, 7, 6, c)
    ic.front(48, 130, 160, 12, 6, "#FFFFFF")
    for i in range(4):
        ic.front(14, 100 - i * 22, 120 + (i * 53) % 70, 8, 6, "#B9B7AE")
    return ic


# ======================================================================================
# Format kinds


def pattern(ic, x, y, z, cols, rows):
    """Tracker pattern cells: a few notes among empty rows."""
    for r in range(rows):
        for c in range(cols):
            ic.top(x + c * 34, y + r * 19, z, 28, 13, "#3A3A40" if (r * 3 + c * 5) % 4 == 0 else "#DDDBD3")


def module():
    """A sheet of tracker pattern with the play row lit."""
    ic = Icon()
    ic.box(0, 0, 0, 150, 190, 4, "#FFFFFF")
    ic.top(5, 84, 4, 140, 17, "#FFD966")
    pattern(ic, 10, 10, 4, 4, 9)
    return ic


def rip():
    """A sheet of pattern with a processor on it: the song comes with the code that plays it."""
    ic = Icon()
    ic.box(0, 0, 0, 150, 190, 4, "#FFFFFF")
    pattern(ic, 10, 10, 4, 4, 4)
    ic.box(36, 100, 4, 78, 70, 14, "#2B2B2F")
    ic.top(48, 112, 18, 54, 46, "#4A4A53")
    for i in range(5):
        ic.box(42 + i * 14, 170, 4, 7, 7, 8, PIN)
        ic.box(114, 106 + i * 12, 4, 7, 6, 8, PIN)
    return ic


def dump():
    """A long strip of register values, one row per frame."""
    ic = Icon()
    ic.box(0, 0, 0, 112, 230, 3, "#FFFFFF")
    for r in range(16):
        for c in range(8):
            ic.top(7 + c * 12.5, 8 + r * 13.5, 3, 10, 10, ("#8E8E96", "#C9C7BD", "#5F5E5A")[(r * 5 + c * 3 + r * c) % 3])
    return ic


ICONS = {
    "ZX Spectrum": zx_spectrum, "ZX Spectrum 128": zx_spectrum, "Commodore 64": commodore_64, "Atari ST": atari_st,
    "Amstrad CPC": amstrad_cpc, "MSX": msx, "NES / Famicom": nes,
    "Desktop": desktop, "Handheld consoles": handheld, "Web browser": browser,
    "Android": lambda: phone(False), "iOS": lambda: phone(True),
    "Modules": module, "Rips": rip, "Dumps": dump,
}


def icon(name):
    """The icon for a machine, platform or format kind, or None when there is none yet."""
    return ICONS[name]() if name in ICONS else None


if __name__ == "__main__":
    sheet = {**ICONS, "chip": lambda: chip("#1D9E75")}
    del sheet["ZX Spectrum"]
    cells = []
    for i, (name, make) in enumerate(sheet.items()):
        x, y = 30 + (i % 4) * 300, 30 + (i // 4) * 240
        cells.append(make().svg(x + 130, y + 90, 250, 170))
        cells.append(f"<text x='{x + 130}' y='{y + 205}' font-size='16' text-anchor='middle' "
                     f"font-family='Helvetica, Arial, sans-serif'>{name}</text>")
    out = Path(__file__).resolve().parent.parent / ".out" / "chiptune-icons.svg"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1240 {30 + ((len(sheet) + 3) // 4) * 240}'>"
                   f"<rect width='100%' height='100%' fill='#FBFAF7'/>{''.join(cells)}</svg>\n", encoding="utf-8")
    print(f"wrote {out} ({len(sheet)} icons)")
