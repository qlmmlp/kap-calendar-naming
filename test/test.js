'use strict';
const mockContext = require('kap-plugin-mock-context');
const moment = require('moment');

// Mock the Google Calendar API response
jest.mock('@googleapis/calendar', () => ({
  google: {
    calendar: () => ({
      events: {
        list: jest.fn().mockResolvedValue({
          data: {
            items: [{
              summary: 'Team Meeting',
              calendar: 'Work',
              start: { dateTime: moment().subtract(2, 'minutes').toISOString() },
              end: { dateTime: moment().add(30, 'minutes').toISOString() }
            }]
          }
        })
      }
    })
  }
}));

// Mock the auth module
jest.mock('../auth', () => ({
  authorize: jest.fn().mockResolvedValue({ credentials: { access_token: 'test-token' } })
}));

describe('kap-calendar-naming', () => {
  const { editServices: [calendarNaming] } = require('..');

  it('has the correct service name', () => {
    expect(calendarNaming.title).toBe('Calendar Event Naming');
  });

  it('supports all required formats', () => {
    expect(calendarNaming.formats).toContain('mp4');
    expect(calendarNaming.formats).toContain('gif');
    expect(calendarNaming.formats).toContain('webm');
    expect(calendarNaming.formats).toContain('apng');
  });

  it('generates correct filename from calendar event', async () => {
    const context = mockContext.createEditContext('test.mp4');
    const result = await calendarNaming.action(context);
    
    // Check if filename follows the pattern: Work_Team_Meeting_YYYY-MM-DD_HH-mm.mp4
    expect(result.outputPath).toMatch(/Work_Team_Meeting_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}\.mp4/);
  });

  it('falls back to default name when no event found', async () => {
    // Mock calendar API to return no events
    jest.spyOn(require('@googleapis/calendar').google, 'calendar')
      .mockImplementationOnce(() => ({
        events: {
          list: jest.fn().mockResolvedValue({ data: { items: [] } })
        }
      }));

    const context = mockContext.createEditContext('test.mp4');
    const result = await calendarNaming.action(context);
    
    // Check if filename follows the pattern: Recording_YYYY-MM-DD_HH-mm.mp4
    expect(result.outputPath).toMatch(/Recording_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}\.mp4/);
  });
});
