# AI-Driven CI/CD Performance Testing Framework using MCP, JMeter, and Jenkins

- This project integrates Apache JMeter, MCP (Model Context Protocol), GitHub Copilot, and Jenkins to create an AI-driven performance testing and optimization framework for CI/CD environments.
- The MCP server enables natural language-based execution of JMeter test plans through AI agents, while Jenkins automates test execution on every GitHub push as part of the CI/CD pipeline.
- After each execution, the framework automatically analyzes generated JTL performance results, detects bottlenecks such as high response time and error rates, and dynamically updates `jmeter.properties` for optimized future test executions.
- The framework acts as a self-healing performance testing system by continuously adapting test configurations based on previous execution metrics and system behavior.


## Objectives

- Execute local JMeter test plans using AI prompts through MCP integration.
- Automate JMeter performance testing within Jenkins CI/CD pipelines.
- Trigger performance tests automatically on GitHub push events.
- Analyze generated JTL result files after every execution.
- Detect performance bottlenecks such as:
  -- High response time
  -- High error rate
  -- System instability under load
- Dynamically update `jmeter.properties` for optimized future executions.
- Generate intelligent optimization summaries including:
  -- Bottleneck detected
  -- Root cause
  -- Optimization applied
  -- Updated configuration values
- Build a self-healing AI-assisted performance testing workflow for continuous optimization.


## Features

- MCP Server Integration
- Natural Language Test Execution
- Automated JMeter CLI Execution
- Result.jtl Analysis
- Dynamic Configuration Optimization
- Bottleneck Detection
- Self-Healing Performance Testing
- AI-Based Optimization Summary

## Tech Stack

- Node.js
- MCP SDK
- Apache JMeter
- VS Code MCP Integration
- GitHub Copilot
- JavaScript


## Architecture

AI Prompt
    ↓
MCP Server
    ↓
JMeter CLI Execution
    ↓
Result.jtl Generation
    ↓
Performance Analysis
    ↓
jmeter.properties Optimization
    ↓
AI Optimization Summary


## Folder Structure

-jmeter-mcp-server/
-│
-├── tests/
-│   └── sample-test.jmx
-│
-├── jmeter.properties
-├── result.jtl
-├── server.js
-├── package.json
-└── README.md


### Use pdf "MCP Server Setup Guide" for mcp server guide


## MCP Tool

Tool Name:
execute_and_optimize_jmeter_test

Purpose:
Executes JMeter tests, analyzes performance metrics, detects bottlenecks, and updates jmeter.properties automatically.



## Example Prompt

Use the execute_and_optimize_jmeter_test MCP tool to execute and optimize this JMeter test:

C:/Users/HP/Desktop/jmeter-mcp-server/tests/sample-test.jmx



## Learning Outcomes

- MCP Server Development
- AI Tool Integration
- JMeter Automation
- Performance Testing
- Result Analysis
- Self-Healing Systems


## License

MIT License


## Author

Anshu Vairagade