from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
FONT_BOLD = "/System/Library/Fonts/ヒラギノ角ゴシック W8.ttc"
FONT_REGULAR = "/System/Library/Fonts/ヒラギノ角ゴシック W8.ttc"
PAPER = "#F8F7F1"
BLUE = "#0C79D8"
BLUE_LIGHT = "#2E9EFF"
BLUE_PALE = "#68C4FF"
INK = "#18221E"
MUTED = "#65716B"
PALE = "#EAF4FC"


def mark(draw: ImageDraw.ImageDraw, x: int, y: int, size: int) -> None:
    gap = size * 7 // 100
    half = size * 46 // 100
    radius = size * 14 // 100
    draw.rounded_rectangle((x, y, x + half, y + half), radius=radius, fill=BLUE_LIGHT)
    draw.rectangle((x + half - radius, y + half - radius, x + half, y + half), fill=BLUE_LIGHT)
    draw.rounded_rectangle((x + half + gap, y, x + size, y + half), radius=radius, fill=BLUE)
    draw.rounded_rectangle((x, y + half + gap, x + half, y + size), radius=radius, fill=BLUE)
    draw.rounded_rectangle((x + half, y + half, x + size, y + size), radius=radius, fill=BLUE_PALE)
    draw.rectangle((x + half, y + half, x + half + radius, y + half + radius), fill=BLUE_PALE)


profile = Image.new("RGB", (400, 400), PAPER)
mark(ImageDraw.Draw(profile), 54, 54, 292)
profile.save(PUBLIC / "x-profile.png", optimize=True)

header = Image.new("RGB", (1500, 500), PAPER)
draw = ImageDraw.Draw(header)
draw.ellipse((-270, -310, 400, 225), fill=PALE)
draw.ellipse((1190, 340, 1650, 720), fill=PALE)
mark(draw, 470, 92, 150)
draw.text((665, 91), "コトナビ", font=ImageFont.truetype(FONT_BOLD, 88), fill=INK)
draw.text((470, 275), "困りごとから、次の一歩へ。", font=ImageFont.truetype(FONT_BOLD, 42), fill=INK)
draw.text((470, 355), "役立つスマホアプリを、困りごと別に紹介", font=ImageFont.truetype(FONT_REGULAR, 27), fill=MUTED)
header.save(PUBLIC / "x-header.png", optimize=True)
