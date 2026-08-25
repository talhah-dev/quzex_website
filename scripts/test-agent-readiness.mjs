import http from "node:http";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

function makeRequest(urlPath, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const req = http.request(
      url,
      {
        method: "GET",
        headers,
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          });
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.end();
  });
}

async function runTests() {
  console.log(`\n🤖 Running Agentic Readiness Test Suite against ${BASE_URL}...\n`);
  let passedCount = 0;
  let failedCount = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedCount++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      if (details) console.error(`     Details: ${details}`);
      failedCount++;
    }
  }

  try {
    // Test 1: Agent-Friendly 404 (Standard HTML)
    const res404Html = await makeRequest("/non-existent-path-99999");
    assert(
      res404Html.statusCode === 404,
      "Nonexistent route returns HTTP 404 status code (HTML)",
      `Expected status 404, got ${res404Html.statusCode}`
    );
    assert(
      res404Html.body.includes("404 - Page Not Found") && res404Html.body.includes("sitemap.xml"),
      "404 HTML body contains recovery links",
      "Missing recovery links in HTML 404 body"
    );

    // Test 2: Agent-Friendly 404 (Markdown Negotiation)
    const res404Md = await makeRequest("/non-existent-path-99999", {
      Accept: "text/markdown",
    });
    assert(
      res404Md.statusCode === 404,
      "Nonexistent route with Accept: text/markdown returns HTTP 404 status code",
      `Expected status 404, got ${res404Md.statusCode}`
    );
    assert(
      (res404Md.headers["content-type"] || "").includes("text/markdown"),
      "404 Markdown response includes Content-Type: text/markdown",
      `Got content-type: ${res404Md.headers["content-type"]}`
    );
    assert(
      res404Md.body.includes("# 404 - Page Not Found") && res404Md.body.includes("sitemap.xml"),
      "404 Markdown response includes recovery links and markdown body",
      "Missing markdown recovery links in 404 body"
    );

    // Test 3: Markdown Content Negotiation on Homepage
    const resHomeMd = await makeRequest("/", {
      Accept: "text/markdown",
    });
    assert(
      resHomeMd.statusCode === 200,
      "Homepage with Accept: text/markdown returns HTTP 200",
      `Expected 200, got ${resHomeMd.statusCode}`
    );
    assert(
      (resHomeMd.headers["content-type"] || "").includes("text/markdown"),
      "Homepage Markdown response includes Content-Type: text/markdown",
      `Got content-type: ${resHomeMd.headers["content-type"]}`
    );
    assert(
      (resHomeMd.headers["vary"] || "").toLowerCase().includes("accept"),
      "Markdown response includes Vary header with Accept (acceptmarkdown.com compliance)",
      `Got Vary: ${resHomeMd.headers["vary"]}`
    );
    assert(
      resHomeMd.body.includes("# Quzex"),
      "Homepage Markdown body contains Quzex product title",
      "Missing product title in markdown response"
    );

    // Test 4: Developer Resource Discoverability - /llms.txt
    const resLlms = await makeRequest("/llms.txt");
    assert(
      resLlms.statusCode === 200,
      "/llms.txt endpoint returns HTTP 200",
      `Expected 200, got ${resLlms.statusCode}`
    );
    assert(
      (resLlms.headers["content-type"] || "").includes("text/markdown"),
      "/llms.txt returns Content-Type: text/markdown",
      `Got content-type: ${resLlms.headers["content-type"]}`
    );
    assert(
      resLlms.body.includes("When to Use Quzex"),
      "/llms.txt includes 'When to Use Quzex' agent instruction section",
      "Missing 'When to Use Quzex' section in llms.txt"
    );

    // Test 5: Developer Resource Discoverability - /llms-full.txt
    const resLlmsFull = await makeRequest("/llms-full.txt");
    assert(
      resLlmsFull.statusCode === 200,
      "/llms-full.txt endpoint returns HTTP 200",
      `Expected 200, got ${resLlmsFull.statusCode}`
    );
    assert(
      resLlmsFull.body.includes("Full Agent & Developer Documentation"),
      "/llms-full.txt contains full context documentation",
      "Missing header in llms-full.txt"
    );

    // Test 6: Developer Resource Discoverability - /openapi.json
    const resOpenApi = await makeRequest("/openapi.json");
    assert(
      resOpenApi.statusCode === 200,
      "/openapi.json endpoint returns HTTP 200",
      `Expected 200, got ${resOpenApi.statusCode}`
    );
    assert(
      resOpenApi.body.includes('"openapi":') && resOpenApi.body.includes("/api/users/contact"),
      "/openapi.json returns valid OpenAPI spec with public routes",
      "Invalid or incomplete OpenAPI spec"
    );

    // Test 7: Developer Resource Discoverability - /developer page
    const resDevPage = await makeRequest("/developer");
    assert(
      resDevPage.statusCode === 200,
      "/developer page returns HTTP 200",
      `Expected 200, got ${resDevPage.statusCode}`
    );
    assert(
      resDevPage.body.includes("Quzex Developer &amp; Agent Resources") ||
        resDevPage.body.includes("Quzex Developer & Agent Resources"),
      "/developer page contains product title & developer heading",
      "Missing developer heading on /developer"
    );

    // Test 8: Content without JavaScript (Homepage Raw HTML SSR)
    const resHomeHtml = await makeRequest("/");
    const rawCharCount = resHomeHtml.body.length;
    assert(
      rawCharCount > 500,
      `Homepage raw HTML text length > 500 characters (got ${rawCharCount} chars)`,
      `Raw HTML length too short: ${rawCharCount} chars`
    );
    assert(
      resHomeHtml.body.includes("<h1"),
      "Homepage raw HTML contains <h1> heading",
      "Missing <h1> in raw HTML"
    );
    assert(
      resHomeHtml.body.includes("<h2"),
      "Homepage raw HTML contains <h2> heading",
      "Missing <h2> in raw HTML"
    );

    console.log(`\nTest Summary: ${passedCount} passed, ${failedCount} failed.\n`);
    if (failedCount > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution failed with error:", err);
    process.exit(1);
  }
}

runTests();
