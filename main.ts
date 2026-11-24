// The Vacuum's Alibi — one line, at most 200 characters.
// A robot vacuum explains why it missed a spot. This program writes
// that single line to /output/entry.txt, exactly as the judge reads it.
//
// Round-3 entry. Round 1 scored 662098 (#45/1738) with a deadpan log,
// a robot-specific detail ("predates my first charge") and an absurd
// principle as the punch ("I do not vacuum my elders"). Round 2 fell
// to #1340/2522 with an abstract punch ("we have an understanding")
// that named no concrete detail. This line returns to the round-1
// shape — deadpan log, one concrete count — but the punch is a lateral
// reframe instead of a restated rule: after 214 times cleaning around
// the same dust bunny, the vacuum no longer treats it as dirt. It
// treats it as a roommate.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Log 317: I have cleaned around the same dust bunny 214 times. At this point we are roommates.";

const MAX_CHARS = 200;

function main(): void {
  const line = ENTRY.trim();
  // Count characters as Unicode code points, matching how the scorer
  // counts UTF-8 characters; String.length counts UTF-16 code units
  // instead, so a line with a multi-byte character would be measured
  // one short per character outside the Basic Multilingual Plane.
  const charCount = [...line].length;
  if (charCount === 0 || charCount > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${charCount}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

main();
