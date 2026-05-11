/**
 * Local password hashing helper for production deploys.
 * Runs entirely offline. Plain password never leaves your terminal.
 *
 * Usage:
 *   npx tsx scripts/hash-password.ts
 *   (prompts for password silently, prints bcrypt hash)
 *
 * Paste the printed hash into server env as ADMIN_PASSWORD_HASH.
 */
import bcrypt from "bcryptjs";
import readline from "node:readline";
import { Writable } from "node:stream";

class MutedStream extends Writable {
  muted = false;
  _write(
    chunk: Buffer | string,
    _enc: string,
    cb: () => void
  ) {
    if (!this.muted) process.stdout.write(chunk);
    cb();
  }
}

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    const mutedOut = new MutedStream();
    const rl = readline.createInterface({
      input: process.stdin,
      output: mutedOut,
      terminal: true,
    });
    process.stdout.write(question);
    mutedOut.muted = true;
    rl.question("", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

async function main() {
  const pw = await prompt("Password (input hidden): ");
  if (!pw) {
    console.error("Empty password");
    process.exit(1);
  }
  const confirm = await prompt("Confirm: ");
  if (pw !== confirm) {
    console.error("Passwords do not match");
    process.exit(1);
  }
  const hash = await bcrypt.hash(pw, 12);
  console.log("\nADMIN_PASSWORD_HASH:");
  console.log(hash);
  console.log("\nPaste this into the server env var. Plaintext is gone.");
}

main();
