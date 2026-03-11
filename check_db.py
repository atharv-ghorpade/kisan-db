#!/usr/bin/env python
import sqlite3
import os

db_path = "d:/Projects/Hackathons/LOOP/kisan-sathi/backend/kisan_sathi.db"

if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    tables = cursor.fetchall()
    
    print("✅ Database Connected Successfully!")
    print("\n📦 Database Tables Created:")
    print("─" * 40)
    for i, (table_name,) in enumerate(tables, 1):
        print(f"  {i}. {table_name}")
    print("─" * 40)
    print(f"\n✨ Total: {len(tables)} tables")
    
    conn.close()
else:
    print(f"❌ Database file not found: {db_path}")
