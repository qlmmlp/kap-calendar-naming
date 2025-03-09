'use strict';
const { google } = require('@googleapis/calendar');
const moment = require('moment');
const { authorize } = require('./auth');

// Function to get the most recent calendar event
async function getRecentEvent() {
  try {
    const auth = await authorize();
    if (!auth) {
      console.error('Authentication failed');
      return null;
    }
    const calendar = google.calendar({ version: 'v3', auth });

    const now = moment();
    const fiveMinutesAgo = moment().subtract(5, 'minutes');

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: fiveMinutesAgo.toISOString(),
      timeMax: now.toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime'
    });

    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching calendar event:', error);
    return null;
  }
}

// Main plugin export
const calendarNaming = {
  title: 'Calendar Event Naming',
  formats: ['mp4', 'gif', 'webm', 'apng'],
  action: async context => {
    const { inputPath, format } = context;
    
    try {
      const event = await getRecentEvent();
      
      if (event) {
        const timestamp = moment().format('YYYY-MM-DD_HH-mm');
        const calendarName = event.calendar || 'Calendar';
        const eventName = event.summary || 'Untitled';
        const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9]/g, '_');
        
        // Format: CalendarName_EventName_YYYY-MM-DD_HH-mm.format
        return {
          outputPath: `${calendarName}_${sanitizedEventName}_${timestamp}.${format}`
        };
      }
      
      // If no event found, return default format with timestamp
      return {
        outputPath: `Recording_${moment().format('YYYY-MM-DD_HH-mm')}.${format}`
      };
    } catch (error) {
      console.error('Error in calendar naming plugin:', error);
      return { outputPath: inputPath }; // Fall back to original name
    }
  }
};

// Export the edit service
exports.editServices = [calendarNaming];
