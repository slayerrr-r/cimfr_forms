from __future__ import annotations

import math
from typing import Any


def parse_number(value: Any) -> float | None:
    if value is None:
        return None
    if isinstance(value, str):
        value = value.strip()
        if value == "":
            return None
        if value.endswith("%"):
            value = value[:-1].strip()
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def format_number(value: float | None, precision: int = 4) -> str:
    if value is None or math.isnan(value):
        return ""
    formatted = f"{value:.{precision}f}".rstrip("0").rstrip(".")
    return formatted if formatted != "-0" else "0"


def safe_divide(numerator: float | None, denominator: float | None) -> float | None:
    if numerator is None or denominator is None:
        return None
    if denominator == 0:
        return None
    return numerator / denominator


def ratio_for_60rh(m_60rh: float | None, m_ad: float | None) -> float | None:
    denominator = 100.0 - (m_ad or 0.0)
    if m_60rh is None or m_ad is None or denominator == 0:
        return None
    return (100.0 - m_60rh) / denominator


def calculate_proximate_basis_values(payload: dict[str, dict[str, str]]) -> dict[str, dict[str, str]]:
    adb = payload.get("adb", {})
    rh60 = payload.get("rh60", {})

    m_ad = parse_number(adb.get("moisture"))
    m_60rh = parse_number(rh60.get("moisture"))
    ash_ad = parse_number(adb.get("ash"))
    vm_ad = parse_number(adb.get("vm"))
    gcv_ad = parse_number(adb.get("gcv"))

    ratio_60rh = ratio_for_60rh(m_60rh, m_ad)
    ash_60rh = safe_divide(ash_ad, 1) * ratio_60rh if ash_ad is not None and ratio_60rh is not None else None
    vm_60rh = safe_divide(vm_ad, 1) * ratio_60rh if vm_ad is not None and ratio_60rh is not None else None
    gcv_60rh = safe_divide(gcv_ad, 1) * ratio_60rh if gcv_ad is not None and ratio_60rh is not None else None

    fc_60rh = None
    if m_60rh is not None and ash_60rh is not None and vm_60rh is not None:
        fc_60rh = 100.0 - (m_60rh + ash_60rh + vm_60rh)

    conversion_denom = None
    if m_60rh is not None and ash_60rh is not None:
        conversion_denom = 100.0 - (m_60rh + 1.1 * ash_60rh)

    vm_dmf = None
    gcv_dmf = None
    if vm_ad is not None and conversion_denom is not None and conversion_denom != 0:
        vm_dmf = vm_ad * 100.0 / conversion_denom
    if gcv_60rh is not None and conversion_denom is not None and conversion_denom != 0:
        gcv_dmf = gcv_60rh * 100.0 / conversion_denom

    fc_dmf = None
    if vm_dmf is not None:
        fc_dmf = 100.0 - vm_dmf

    return {
        "adb": {
            "moisture": format_number(m_ad),
            "ash": format_number(ash_ad),
            "vm": format_number(vm_ad),
            "fc": format_number(parse_number(adb.get("fc"))),
            "gcv": format_number(gcv_ad),
        },
        "rh60": {
            "moisture": format_number(m_60rh),
            "ash": format_number(ash_60rh),
            "vm": format_number(vm_60rh),
            "fc": format_number(fc_60rh),
            "gcv": format_number(gcv_60rh),
        },
        "dmf": {
            "moisture": "",
            "ash": "",
            "vm": format_number(vm_dmf),
            "fc": format_number(fc_dmf),
            "gcv": format_number(gcv_dmf),
        },
    }


def calculate_ultimate_basis_values(payload: dict[str, dict[str, str]], proximate_values: dict[str, dict[str, str]]) -> dict[str, dict[str, str]]:
    adb = payload.get("adb", {})
    rh60 = payload.get("rh60", {})

    m_60rh = parse_number(proximate_values.get("rh60", {}).get("moisture"))
    ash_60rh = parse_number(proximate_values.get("rh60", {}).get("ash"))

    c_ad = parse_number(adb.get("c"))
    h_ad = parse_number(adb.get("h"))
    n_ad = parse_number(adb.get("n"))
    s_ad = parse_number(adb.get("s"))
    o_ad = parse_number(adb.get("o"))

    ratio_60rh = ratio_for_60rh(m_60rh, parse_number(payload.get("adb", {}).get("moisture")))
    c_60rh = c_ad * ratio_60rh if c_ad is not None and ratio_60rh is not None else None
    h_60rh = h_ad * ratio_60rh if h_ad is not None and ratio_60rh is not None else None
    n_60rh = n_ad * ratio_60rh if n_ad is not None and ratio_60rh is not None else None
    s_60rh = s_ad * ratio_60rh if s_ad is not None and ratio_60rh is not None else None

    o_60rh = None
    if c_60rh is not None and h_60rh is not None and n_60rh is not None and m_60rh is not None and ash_60rh is not None:
        o_60rh = 100.0 - (c_60rh + h_60rh + n_60rh + m_60rh + 1.1 * ash_60rh)

    conversion_denom = None
    if m_60rh is not None and ash_60rh is not None:
        conversion_denom = 100.0 - (m_60rh + 1.1 * ash_60rh)

    c_dmf = None
    h_dmf = None
    n_dmf = None
    if conversion_denom is not None and conversion_denom != 0:
        if c_ad is not None:
            c_dmf = c_ad * 100.0 / conversion_denom
        if h_ad is not None:
            h_dmf = h_ad * 100.0 / conversion_denom
        if n_ad is not None:
            n_dmf = n_ad * 100.0 / conversion_denom

    return {
        "adb": {
            "c": format_number(c_ad),
            "h": format_number(h_ad),
            "n": format_number(n_ad),
            "s": format_number(s_ad),
            "o": format_number(o_ad),
        },
        "rh60": {
            "c": format_number(c_60rh),
            "h": format_number(h_60rh),
            "n": format_number(n_60rh),
            "s": format_number(s_60rh),
            "o": format_number(o_60rh),
        },
        "dmf": {
            "c": format_number(c_dmf),
            "h": format_number(h_dmf),
            "n": format_number(n_dmf),
            "s": "",
            "o": "",
        },
    }


def calculate_analysis(data: dict[str, Any]) -> dict[str, Any]:
    proximate = data.get("proximate", {})
    ultimate = data.get("ultimate", {})

    calculated_proximate = calculate_proximate_basis_values(proximate)
    calculated_ultimate = calculate_ultimate_basis_values(ultimate, calculated_proximate)

    output = {
        **data,
        "proximate": calculated_proximate,
        "ultimate": calculated_ultimate,
    }
    return output
