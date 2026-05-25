const { Server } = require("@modelcontextprotocol/sdk/server/index.js");

const {
  StdioServerTransport,
} = require("@modelcontextprotocol/sdk/server/stdio.js");

const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");

const { exec } = require("child_process");
const fs = require("fs");


// CREATE MCP SERVER
const server = new Server(
  {
    name: "jmeter-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);


// ANALYZE RESULT.JTL FILE
function analyzeResults(resultFile) {

  const data = fs.readFileSync(resultFile, "utf8");

  const lines = data.trim().split("\n");

  let totalRequests = 0;
  let failedRequests = 0;
  let totalResponseTime = 0;

  for (let i = 1; i < lines.length; i++) {

    const cols = lines[i].split(",");

    const elapsed = parseInt(cols[1]);

    const success = cols[7];

    totalRequests++;

    totalResponseTime += elapsed;

    if (success === "false") {
      failedRequests++;
    }
  }

  const avgResponseTime =
    totalResponseTime / totalRequests;

  const errorRate =
    (failedRequests / totalRequests) * 100;

  return {
    totalRequests,
    failedRequests,
    avgResponseTime,
    errorRate,
  };
}


// UPDATE JMETER.PROPERTIES
function updateJMeterProperties(metrics) {

  const propertyFile = "jmeter.properties";

  let threads = 100;
  let rampup = 10;

  let bottleneck = "";
  let solution = "";

  // READ EXISTING FILE
  if (fs.existsSync(propertyFile)) {

    const content =
      fs.readFileSync(propertyFile, "utf8");

    const lines = content.split("\n");

    for (const line of lines) {

      if (line.startsWith("threads=")) {
        threads =
          parseInt(line.split("=")[1]);
      }

      if (line.startsWith("rampup=")) {
        rampup =
          parseInt(line.split("=")[1]);
      }
    }
  }

  // HIGH ERROR RATE
  if (metrics.errorRate > 10) {

    bottleneck =
      "High error rate detected.";

    threads =
      Math.max(10, threads - 20);

    rampup += 5;

    solution =
      `Reduced threads to ${threads} and increased rampup to ${rampup}.`;
  }

  // HIGH RESPONSE TIME
  else if (metrics.avgResponseTime > 3000) {

    bottleneck =
      "High response time detected.";

    rampup += 10;

    solution =
      `Increased rampup to ${rampup} to reduce server pressure.`;
  }

  // GOOD PERFORMANCE
  else {

    bottleneck =
      "System stable under current load.";

    threads += 20;

    solution =
      `Increased threads to ${threads} for next stress level.`;
  }

  // UPDATED FILE CONTENT
  const updatedContent =
`threads=${threads}
rampup=${rampup}
loops=5`;

  // WRITE UPDATED CONFIG
  fs.writeFileSync(
    propertyFile,
    updatedContent
  );

  return {
    bottleneck,
    solution,
    threads,
    rampup,
  };
}


// LIST AVAILABLE TOOLS
server.setRequestHandler(
  ListToolsRequestSchema,
  async () => ({
    tools: [
      {
        name: "run_jmeter_test",
        description: "Run a JMeter test file",
        inputSchema: {
          type: "object",
          properties: {
            testFile: {
              type: "string",
              description: "Full path of JMX test file",
            },
          },
          required: ["testFile"],
        },
      },
    ],
  })
);


// HANDLE TOOL EXECUTION
server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {

    const { name, arguments: args } = request.params;

    // RUN JMETER TEST
    if (name === "run_jmeter_test") {

      return new Promise((resolve) => {

        // JMETER PATH
        const jmeterPath =
          "C:/Jmeter/apache-jmeter-5.6.3/apache-jmeter-5.6.3/bin/jmeter.bat";

        // RESULT FILE
        const resultFile = "result.jtl";

        // COMMAND
        const command =
          `"${jmeterPath}" -n -t "${args.testFile}" -l "${resultFile}"`;

        console.log("Executing Command:");
        console.log(command);

        exec(command, (error, stdout, stderr) => {

          // ERROR HANDLING
          if (error) {

            resolve({
              content: [
                {
                  type: "text",
                  text:
                    `JMeter Execution Failed\n\n` +
                    `Error: ${error.message}\n\n` +
                    `STDERR:\n${stderr}`,
                },
              ],
            });

            return;
          }

          // ANALYZE RESULTS
          const metrics =
            analyzeResults(resultFile);

          // UPDATE PROPERTIES
          const optimization =
            updateJMeterProperties(metrics);

          // FINAL SUMMARY
          let summary =
            "JMeter Test Completed Successfully\n\n";

          summary +=
            `Total Requests: ${metrics.totalRequests}\n`;

          summary +=
            `Failed Requests: ${metrics.failedRequests}\n`;

          summary +=
            `Average Response Time: ${metrics.avgResponseTime.toFixed(2)} ms\n`;

          summary +=
            `Error Rate: ${metrics.errorRate.toFixed(2)}%\n\n`;

          summary +=
            `BOTTLENECK DETECTED:\n`;

          summary +=
            `${optimization.bottleneck}\n\n`;

          summary +=
            `OPTIMIZATION APPLIED:\n`;

          summary +=
            `${optimization.solution}\n\n`;

          summary +=
            `UPDATED CONFIGURATION:\n`;

          summary +=
            `Threads: ${optimization.threads}\n`;

          summary +=
            `Ramp-up: ${optimization.rampup}\n\n`;

          summary +=
            `STDOUT:\n${stdout}\n`;

          if (stderr) {
            summary += `\nSTDERR:\n${stderr}`;
          }

          resolve({
            content: [
              {
                type: "text",
                text: summary,
              },
            ],
          });

        });

      });

    }

    // UNKNOWN TOOL
    return {
      content: [
        {
          type: "text",
          text: "Unknown tool requested",
        },
      ],
    };

  }
);


// START MCP SERVER
async function main() {

  const transport =
    new StdioServerTransport();

  await server.connect(transport);

  console.error("JMeter MCP Server Running...");
}

main();