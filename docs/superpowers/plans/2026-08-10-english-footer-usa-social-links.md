# English Footer USA Social Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update exactly four USA social destinations in the English footer component through its `/en/home` instance without publishing the site.

**Architecture:** Use Webflow’s element/component inspection tools to identify the footer component and link elements semantically. Record the current link settings, update only link destinations, then reread the component to verify exact values and unchanged sibling networks.

**Tech Stack:** Webflow MCP Designer/Data element tools.

---

### Task 1: Identify the component and exact link nodes

**Files:**
- External: Webflow site `69d7c3721733f0f4aaa00b42`
- External: `/en/home` page `6a79559b23dfc305ac80767a`

- [ ] **Step 1: Query the `/en/home` element tree**

Use `data_element_tool` to query link elements and footer-related display names. Return link text, URL, element ID, component context, and nearby platform/country labels.

- [ ] **Step 2: Resolve the footer component**

Use `get_parent_component` for an identified footer child or open the component instance in the Designer. Confirm the instance is the shared English footer component.

- [ ] **Step 3: Capture the before-state**

Record the four existing USA link IDs/URLs plus all sibling social URLs. Do not write until Amazon, Facebook, Instagram, and TikTok are unambiguous.

### Task 2: Update only the four approved URLs

**Files:**
- External: shared English footer component in Webflow

- [ ] **Step 1: Set link destinations**

Update the identified component link elements to:

```text
Amazon USA  → https://www.amazon.com/stores/JYPESAUSA/page/4B1808C0-9D87-40F5-8FBF-1B7EB9B9EA47?lp_asin=B0FPKMYS1M&ref_=ast_bln
Facebook    → https://www.facebook.com/profile.php?id=61557750613254
Instagram   → https://www.instagram.com/jypesa_usa/
TikTok      → https://www.tiktok.com/@jypesa.usa
```

Preserve new-tab and `rel` behavior.

- [ ] **Step 2: Reread and verify**

Confirm all four exact URLs on the component. Compare every non-USA sibling URL against the captured before-state and require no changes.

- [ ] **Step 3: Confirm save state**

Verify Webflow accepted the writes. Do not call the publish action.

