from PIL import Image
import os

def convert_to_png(source, target_size, target_name):
    try:
        img = Image.open(source)
        img = img.convert('RGBA')
        img = img.resize((target_size, target_size), Image.Resampling.LANCZOS)
        img.save(target_name, 'PNG')
        print(f"Converted {source} to {target_name} ({target_size}x{target_size})")
    except Exception as e:
        print(f"Error converting: {e}")

source_icon = r"C:\Users\Unitec-PC\.gemini\antigravity\brain\81c0c0ed-0cd4-4819-b172-877c9730ce01\ia_castillo_pwa_icon_1775086265210.png"
convert_to_png(source_icon, 512, r"static/icons/icon-512.png")
convert_to_png(source_icon, 192, r"static/icons/icon-192.png")
