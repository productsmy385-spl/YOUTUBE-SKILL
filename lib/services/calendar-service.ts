export interface PublishingSlot {
  id: string;
  name: string;
  targetPlatform: "YouTube Shorts" | "YouTube Long" | "Instagram Reel";
  startTime: string; // HH:mm in Asia/Kolkata
  endTime: string;
  expectedViewerMultiplier: number;
  description: string;
}

export interface ScheduledCalendarEvent {
  id: string;
  projectId: string;
  title: string;
  teluguTitle: string;
  platform: "YouTube Shorts" | "YouTube Long" | "Instagram Reel";
  scheduledDate: string; // YYYY-MM-DD
  slot: PublishingSlot;
  status: "Draft" | "Queued" | "Published" | "Processing";
  thumbnailUrl: string;
}

export const RECOMMENDED_IST_SLOTS: PublishingSlot[] = [
  {
    id: "slot_morning_commute",
    name: "Morning Commute & Tea Slot",
    targetPlatform: "YouTube Shorts",
    startTime: "07:30",
    endTime: "08:45",
    expectedViewerMultiplier: 1.25,
    description: "Peak morning mobile browsing window across Hyderabad and AP districts.",
  },
  {
    id: "slot_afternoon_break",
    name: "Afternoon Leisure Break",
    targetPlatform: "Instagram Reel",
    startTime: "13:00",
    endTime: "14:15",
    expectedViewerMultiplier: 1.15,
    description: "High social media scrolling during lunch & college breaks.",
  },
  {
    id: "slot_prime_evening_1",
    name: "Golden Prime Evening Slot",
    targetPlatform: "YouTube Shorts",
    startTime: "18:00",
    endTime: "19:30",
    expectedViewerMultiplier: 1.65,
    description: "Highest retention and engagement period for Telugu video consumers.",
  },
  {
    id: "slot_prime_reels_2",
    name: "Prime Time Reels Rush",
    targetPlatform: "Instagram Reel",
    startTime: "19:45",
    endTime: "21:00",
    expectedViewerMultiplier: 1.5,
    description: "Peak discovery algorithm feed push on Instagram India.",
  },
  {
    id: "slot_weekend_cinema",
    name: "Weekend Cinema / Long-form Prime",
    targetPlatform: "YouTube Long",
    startTime: "20:00",
    endTime: "21:30",
    expectedViewerMultiplier: 1.8,
    description: "Living room TV & laptop viewing for episodes and dramatic cinema stories.",
  },
];

export class CalendarService {
  /**
   * Generates calendar events for a given month with recommended slots
   */
  public getEventsForMonth(year: number, month: number): ScheduledCalendarEvent[] {
    return [];
  }

  /**
   * Identifies the best available slot on a given date
   */
  public suggestBestSlot(
    dateStr: string,
    existingEvents: ScheduledCalendarEvent[],
    platform: "YouTube Shorts" | "YouTube Long" | "Instagram Reel"
  ): PublishingSlot {
    const platformSlots = RECOMMENDED_IST_SLOTS.filter((s) => s.targetPlatform === platform);
    const occupiedSlotIds = new Set(
      existingEvents.filter((e) => e.scheduledDate === dateStr).map((e) => e.slot.id)
    );

    const available = platformSlots.find((s) => !occupiedSlotIds.has(s.id));
    return available || platformSlots[0];
  }
}

export const calendarService = new CalendarService();

