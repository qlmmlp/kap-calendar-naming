# kap-calendar-naming

> Automatically name Kap recordings based on your calendar events

## Description

This Kap plugin automatically names your screen recordings based on your recent calendar events. When you stop a recording, it checks your calendar for any recent meetings and uses the calendar name and event title to create a meaningful filename.

## How it works

When you finish a recording, the plugin will:
1. Check your Google Calendar for any events that occurred in the last 5 minutes
2. If an event is found, name the recording using the format: `CalendarName_EventName_YYYY-MM-DD_HH-mm.format`
3. If no event is found, fall back to: `Recording_YYYY-MM-DD_HH-mm.format`

## Install

```bash
$ npm install kap-calendar-naming
```

## Setup

1. Install the plugin
2. First time you use it, you'll need to authenticate with Google Calendar
3. The plugin will automatically process your recordings after they're complete

## Configuration

No additional configuration is needed. The plugin works automatically after installation and authentication.

## License

MIT
