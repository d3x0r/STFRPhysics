"""Robust loader for galaxy_presets.mjs and rotmod_ltg_data.mjs."""
import re
import json
import os

def load_presets(path):
    """Parse galaxy_presets.mjs into a dict {name: {rho0, rho1, ..., r5, eps, support, amp, [newtonAmp], [rMax]}}.
    Top-level keys may be single- or double-quoted, or unquoted (M31, MilkyWay). Inner keys mostly quoted but
    some entries use bare keys. Strips inline-// and /*...*/ comments."""
    with open(path) as f:
        text = f.read()
    # Strip comment lines (// at start of line, possibly indented) and block comments
    lines = [l for l in text.split('\n') if not re.match(r'\s*//', l)]
    text = '\n'.join(lines)
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
    # Match: optional quote, name, optional quote, colon, {...}, optional comma
    pattern = re.compile(r"['\"]?([A-Za-z][\w-]*)['\"]?\s*:\s*(\{[^{}]*\})\s*,?")
    presets = {}
    for m in pattern.finditer(text):
        name = m.group(1)
        obj_text = m.group(2)
        # Convert unquoted inner keys to quoted form
        obj_text = re.sub(r"([{,])\s*([A-Za-z][\w]*)\s*:", r'\1"\2":', obj_text)
        # Single quotes -> double
        obj_text = obj_text.replace("'", '"')
        try:
            presets[name] = json.loads(obj_text)
        except json.JSONDecodeError as e:
            print(f"Failed to parse {name}: {e}")
    return presets

def load_rotmod(path):
    """Parse rotmod_ltg_data.mjs (exports ROTMOD_GALAXIES = [...]) into a list of galaxy dicts."""
    with open(path) as f:
        text = f.read()
    m = re.search(r'export const ROTMOD_GALAXIES\s*=\s*\[', text)
    if not m:
        raise ValueError("ROTMOD_GALAXIES export not found")
    start = m.end() - 1
    depth = 0
    end = start
    for i in range(start, len(text)):
        c = text[i]
        if c == '[': depth += 1
        elif c == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    return json.loads(text[start:end])

if __name__ == '__main__':
    # Self-test: parse the two .mjs files in the current directory
    presets = load_presets('galaxy_presets.mjs')
    rotmod = load_rotmod('rotmod_ltg_data.mjs')
    print(f"Loaded {len(presets)} presets and {len(rotmod)} rotmod entries")
    matched = [n for n in presets if any(g['name'] == n for g in rotmod)]
    print(f"Matched preset+rotmod: {len(matched)}")
