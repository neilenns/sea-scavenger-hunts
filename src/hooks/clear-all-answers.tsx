import { openDB } from "idb";

const DB_NAME = "scavengerHuntDB";
const STORE_NAME = "answers";
const DB_VERSION = 1;

export async function clearAllAnswers() {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.clear(STORE_NAME);
}
