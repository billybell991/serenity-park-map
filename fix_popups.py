import re

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Define mapping of emoji or identifier to Legend Text
emoji_map = {
    "🔥": "Communal Fire Pit",
    "🏖️": "Beach Area",
    "🛝": "Playground",
    "🏐": "Volleyball",
    "🚽": "Washrooms",
    "🚿": "Showers",
    "🎯": "Horseshoes",
    "💃🕺": "Pavilion",
    "🅿️": "Parking",
    "🐕": "Dog Area",
    "🏢": "Office",
    "🏠": "Club House",
    "💩": "Dog Poop Disposal",
    "🗑️": "Garbage",
    "♻️": "Recycling",
    "CENTER FIELD": "Center Field",
    "LOWER FIELD": "Lower Field"
}

# The problem: we set interactive: false, which kills click events (popups).
# We should change interactive: false to just simply not include draggable: true, or set interactive: true (which is default).
# But wait, we ONLY want to do this for the amenity markers, or all markers?
# The site markers (S1, P39, etc.) have interactive: false on their labels! Wait. The text labels for sites (S1, B2) are clicked via the polygons!
# The polygons have .bindPopup(). The text labels have `interactive: false` so clicks pass through to the polygon underneath!
# Ah! That's brilliant! We MUST keep `interactive: false` on the text labels for the polygons.
# So we only want to make the emojis/amenity markers interactive, and bind popups to them.

replacements = 0

# Let's find every marker and see if it contains one of the emojis in its HTML
def process_marker(m):
    global replacements
    block = m.group(0)
    
    # Check if it has an emoji
    found_key = None
    for key in emoji_map:
        if key in block:
            found_key = key
            break
            
    if found_key:
        print(f"Found marker for {found_key}")
        # Make sure it doesn't have interactive: false preventing clicks
        block = block.replace("interactive: false", "")
        # Remove empty trailing comma if it left one: `}, })`
        block = re.sub(r",\s*\}\)", "})", block)
        
        # Make sure it has a popup
        if ".bindPopup" not in block:
            block = block.replace(r".addTo(map);", f'.addTo(map).bindPopup("<b>{emoji_map[found_key]}</b>");')
        else:
            # If it already has a popup, replace it just in case
            block = re.sub(r'\.bindPopup\([^)]+\)', f'.bindPopup("<b>{emoji_map[found_key]}</b>")', block)
            
        replacements += 1
    
    return block

new_text = re.sub(r'const [a-zA-Z0-9_]+ = L\.marker\([^;]+;', process_marker, text)
new_text = re.sub(r'L\.marker\([^;]+;', process_marker, new_text) # For markers not assigned to const

# Clean up any leftover syntax errors like { ..., interactive: false } -> { ...,  } -> { ... }
new_text = re.sub(r',\s*\}', r'}', new_text)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print(f"Processed {replacements} marker setups.")
