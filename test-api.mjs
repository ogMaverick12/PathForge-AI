async function test() {
  const profile = {
    stream: "Science (PCM)",
    marks: 85,
    budget: "1-3L",
    timeline: "normal",
    abroad_open: "yes",
    trend: "improving",
    dream_job: "software engineer",
    deep_dream: "I want to build software that impacts millions of users."
  };

  try {
    console.log("Sending request to /api/generate...");
    const res = await fetch("http://127.0.0.1:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ profile })
    });

    if (!res.ok) {
        console.error("HTTP error!", res.status);
        const text = await res.text();
        console.error(text);
        return;
    }

    const data = await res.json();
    console.log("Success! Received response:");
    console.log("Main Career:", data.careerName);
    console.log("Paths generated:", data.paths.length);
    for (const path of data.paths) {
        console.log(`\nPath [${path.id}]:`);
        console.log(`  Target: ${path.careerTarget}`);
        console.log(`  Institution: ${path.institution?.name}`);
        console.log(`  Institution Type: ${path.institution?.type}`);
        console.log(`  Tier: ${path.institution?.tier}`);
    }
    console.log("\nTotal institutions returned for map:", data.institutions.length);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

test();
