#!/usr/bin/env python3
"""Serve esta pasta em http://localhost:8000 e abre o navegador. Ctrl+C para parar."""
import http.server, socketserver, webbrowser, os, functools
PORTA = 8000
pasta = os.path.dirname(os.path.abspath(__file__))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=pasta)
H.extensions_map.update({".mp4": "video/mp4", ".woff2": "font/woff2", ".js": "text/javascript"})
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORTA), H) as s:
    print(f"Site em http://localhost:{PORTA}  (Ctrl+C para parar)")
    webbrowser.open(f"http://localhost:{PORTA}/")
    s.serve_forever()
