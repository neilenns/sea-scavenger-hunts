"use client";

import { IDBPDatabase, openDB } from "idb"; // cspell: disable-line
import { useEffect, useState } from "react";

const DB_NAME = "scavengerHuntDB";
const STORE_NAME = "answers";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<any>> | null = null; // cspell: disable-line

function getDb() {
  if (!dbPromise) {
    // Only try to open the DB in the browser
    if (typeof window === "undefined" || typeof indexedDB === "undefined") {
      throw new Error("IndexedDB not available");
    }

    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
}

/**
 * A hook for persistent answers using IndexedDB.
 * @param id unique key for this answer
 * @param defaultValue initial value before load
 */
export function usePersistentAnswer<T>(id: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);

  // Load from IndexedDB once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      try {
        const db = await getDb();
        const saved = await db.get(STORE_NAME, id);
        if (saved !== undefined) setValue(saved as T);
      } catch (e) {
        console.error("Failed to load from IndexedDB", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, [id]);

  // Save to IndexedDB whenever value changes (after initial load)
  useEffect(() => {
    if (!loaded) return;
    if (typeof window === "undefined") return;

    (async () => {
      try {
        const db = await getDb();
        await db.put(STORE_NAME, value, id);
      } catch (e) {
        console.error("Failed to save to IndexedDB", e);
      }
    })();
  }, [id, value, loaded]);

  return [value, setValue, loaded] as const;
}
