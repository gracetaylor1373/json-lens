interface DiffResult {
  added: string[];
  removed: string[];
  changed: { key: string; oldVal: unknown; newVal: unknown }[];
}

export function diffObjects(objA: Record<string, any>, objB: Record<string, any>): DiffResult {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  const added = keysB.filter(k => !keysA.includes(k));
  const removed = keysA.filter(k => !keysB.includes(k));
  const changed: { key: string; oldVal: unknown; newVal: unknown }[] = [];

  for (const k of keysA) {
    if (keysB.includes(k) && objA[k] !== objB[k]) {
      changed.push({ key: k, oldVal: objA[k], newVal: objB[k] });
    }
  }

  return { added, removed, changed };
}

function runDemo(): void {
  const before = { version: "1.0.0", debug: false, port: 8080 };
  const after = { version: "1.1.0", debug: true, port: 8080, cluster: "us-east-1" };

  console.log("==================================================");
  console.log("  TypeScript JSON Schema & Delta Inspector");
  console.log("==================================================");
  const diff = diffObjects(before, after);

  console.log(`[+] Added Keys   : ${diff.added.join(", ") || "none"}`);
  console.log(`[-] Removed Keys : ${diff.removed.join(", ") || "none"}`);
  console.log(`[*] Changes:`);
  for (const c of diff.changed) {
    console.log(`    ${c.key}: ${JSON.stringify(c.oldVal)} -> ${JSON.stringify(c.newVal)}`);
  }
  console.log("==================================================");
}

runDemo();
