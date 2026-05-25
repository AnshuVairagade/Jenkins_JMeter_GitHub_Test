# AI-Powered JMeter MCP Server

### MCP-Based Intelligent JMeter Automation Framework

- This project integrates Apache JMeter with an MCP (Model Context Protocol) server to enable AI-driven performance testing using natural language. 
- The MCP server executes JMeter test plans, analyzes generated JTL results, detects bottlenecks, and automatically updates jmeter.properties for optimized future test executions.


## Objectives

- Execute local JMeter test plans using AI prompts through MCP.
- Automatically analyze JMeter test results.
- Detect bottlenecks such as high response time and error rate.
- Update jmeter.properties dynamically for optimized future executions.
- Generate intelligent optimization summaries.


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

jmeter-mcp-server/
│
├── tests/
│   └── sample-test.jmx
│
├── jmeter.properties
├── result.jtl
├── server.js
├── package.json
└── README.md


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