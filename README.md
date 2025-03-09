# kap-calendar-naming

> Automatically name Kap recordings based on your calendar events

[![GitHub Actions Status](https://github.com/qlmmlp/kap-calendar-naming/workflows/CI%2FCD/badge.svg)](https://github.com/qlmmlp/kap-calendar-naming/actions)
[![npm version](https://badge.fury.io/js/kap-calendar-naming.svg)](https://www.npmjs.com/package/kap-calendar-naming)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![macOS](https://img.shields.io/badge/platform-macOS-blue.svg)](https://github.com/wulkano/kap)

## Description

This Kap plugin automatically names your screen recordings based on your recent calendar events. When you stop a recording, it checks your Google Calendar for any recent meetings and uses the calendar name and event title to create a meaningful filename. Perfect for keeping your recordings organized when documenting meetings or creating tutorial content!

## Features

- 🎯 Automatic naming based on calendar events
- 📅 Google Calendar integration
- 🔄 Support for multiple export formats (mp4, gif, webm, apng)
- 🔒 Secure OAuth2 authentication
- ⚡️ Fast and lightweight
- 🎨 Clean filename formatting

## Requirements

- [Kap](https://github.com/wulkano/kap) ≥ 3.0.0
- macOS 10.15 or later
- Node.js 16.x or later
- Google Calendar account

## Installation

```bash
$ npm install kap-calendar-naming
```

## Setup

### 1. Google Cloud Project Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"
4. Set up OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Desktop application"
   - Download the credentials JSON file

### 2. Plugin Configuration

1. Create the plugin config directory:
   ```bash
   mkdir -p ~/.kap-calendar-naming
   ```

2. Copy your downloaded credentials:
   ```bash
   cp path/to/downloaded/credentials.json ~/.kap-calendar-naming/credentials.json
   ```

3. First time you use Kap after installation:
   - The plugin will prompt for Google Calendar authentication
   - Follow the browser authentication flow
   - The plugin will save the token for future use

## How it Works

When you finish a recording, the plugin will:

1. Check your Google Calendar for any events that occurred in the last 5 minutes
2. If an event is found, name the recording using the format:
   ```
   CalendarName_EventName_YYYY-MM-DD_HH-mm.format
   ```
   Example: `Work_Team_Meeting_2025-03-09_14-30.mp4`

3. If no event is found, fall back to:
   ```
   Recording_YYYY-MM-DD_HH-mm.format
   ```
   Example: `Recording_2025-03-09_14-30.mp4`

## Troubleshooting

### Authentication Issues

- **Token Expired**: Delete `~/.kap-calendar-naming/token.json` and restart Kap
- **Wrong Credentials**: Ensure credentials.json is properly placed in `~/.kap-calendar-naming/`
- **Permission Issues**: Make sure you've granted calendar read access during OAuth flow

### Naming Issues

- **No Calendar Name**: Check if you have access to the calendar
- **Wrong Event**: Plugin looks for events in last 5 minutes; ensure timing matches
- **Invalid Characters**: Special characters in event names are replaced with '_'

## Development

```bash
# Clone the repository
git clone https://github.com/qlmmlp/kap-calendar-naming.git

# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Security

- OAuth2 tokens are stored locally in `~/.kap-calendar-naming/`
- Only calendar read access is requested
- No data is sent to external servers except Google Calendar API

## License

MIT © Anton Sakharov

## Related

- [Kap](https://github.com/wulkano/kap) - The main Kap application
- [Kap Plugin Documentation](https://github.com/wulkano/kap/blob/master/docs/plugins.md)
