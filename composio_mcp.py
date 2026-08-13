import json, urllib.request, os, sys

HOME = os.environ.get("LOCALAPPDATA", os.path.expanduser("~"))
TOK_PATH = os.path.join(HOME, "hermes", "mcp-tokens", "composio.json")
tok = json.load(open(TOK_PATH))["access_token"]
URL = "https://connect.composio.dev/mcp"

def rpc(method, params=None, rid=None, session=None, notif=False):
    body = {"jsonrpc": "2.0"}
    if not notif and rid is not None:
        body["id"] = rid
    body["method"] = method
    if params is not None:
        body["params"] = params
    data = json.dumps(body).encode()
    req = urllib.request.Request(URL, data=data, method="POST")
    req.add_header("Authorization", "Bearer " + tok)
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/json, text/event-stream")
    req.add_header("Mcp-Protocol-Version", "2024-11-05")
    if session:
        req.add_header("Mcp-Session-Id", session)
    try:
        resp = urllib.request.urlopen(req, timeout=120)
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, e.read().decode()[:2000], file=sys.stderr)
        raise
    sid = resp.headers.get("Mcp-Session-Id")
    raw = resp.read().decode()
    ct = resp.headers.get("Content-Type", "")
    if not raw.strip():
        return None, sid
    if "text/event-stream" in ct:
        out = None
        for line in raw.splitlines():
            if line.startswith("data:"):
                c = line[5:].strip()
                if c:
                    try:
                        out = json.loads(c)
                    except Exception:
                        pass
        return out, sid
    return json.loads(raw), sid

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "init"
    if cmd == "init":
        res, sid = rpc("initialize", {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "hermes", "version": "1.0"}}, rid=1)
        print("SESSION:", sid)
        print(json.dumps(res, ensure_ascii=False))
        rpc("notifications/initialized", {}, session=sid, notif=True)
        # save session id for later steps
        open(".mcp_session", "w").write(sid)
    elif cmd == "connections":
        sid = open(".mcp_session").read().strip()
        r, _ = rpc("tools/call", {"name": "COMPOSIO_MANAGE_CONNECTIONS", "arguments": {"toolkits": [{"name": "webflow", "action": "list"}]}}, rid=2, session=sid)
        print(json.dumps(r, ensure_ascii=False, indent=2))
    elif cmd == "search":
        sid = open(".mcp_session").read().strip()
        q = sys.argv[2] if len(sys.argv) > 2 else "webflow collection item"
        r, _ = rpc("tools/call", {"name": "COMPOSIO_SEARCH_TOOLS", "arguments": {"queries": [{"use_case": q}]}}, rid=3, session=sid)
        print(json.dumps(r, ensure_ascii=False, indent=2))
    elif cmd == "schema":
        sid = open(".mcp_session").read().strip()
        slugs = sys.argv[2:]
        r, _ = rpc("tools/call", {"name": "COMPOSIO_GET_TOOL_SCHEMAS", "arguments": {"tool_slugs": slugs}}, rid=4, session=sid)
        print(json.dumps(r, ensure_ascii=False, indent=2))
    elif cmd == "call":
        sid = open(".mcp_session").read().strip()
        tool = sys.argv[2]
        args = json.loads(sys.argv[3]) if len(sys.argv) > 3 else {}
        r, _ = rpc("tools/call", {"name": tool, "arguments": args}, rid=5, session=sid)
        print(json.dumps(r, ensure_ascii=False, indent=2))
