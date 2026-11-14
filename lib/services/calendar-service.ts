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
    const monthStr = month < 10 ? `0${month}` : `${month}`;

    return [
      {
        id: "ev_01",
        projectId: "proj_snkr_01",
        title: "Sankranti Memories in Godavari",
        teluguTitle: "సంక్రాంతి జ్ఞాపకాలు - పల్లెటూరి పండుగ కథ",
        platform: "YouTube Shorts",
        scheduledDate: `${year}-${monthStr}-14`,
        slot: RECOMMENDED_IST_SLOTS[2], // Prime Evening
        status: "Published",
        thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
      },
      {
        id: "ev_02",
        projectId: "proj_snkr_02",
        title: "Sankranti Memories | Reels Cut",
        teluguTitle: "సంక్రాంతి జ్ఞాపకాలు - రీల్స్ కట్",
        platform: "Instagram Reel",
        scheduledDate: `${year}-${monthStr}-14`,
        slot: RECOMMENDED_IST_SLOTS[3], // Prime Time Reels
        status: "Published",
        thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
      },
      {
        id: "ev_03",
        projectId: "proj_rtu_01",
        title: "Farmer's Tears & Hope",
        teluguTitle: "రైతు కన్నీరు & ఆశ - హృదయపూర్వక దృశ్యం",
        platform: "YouTube Shorts",
        scheduledDate: `${year}-${monthStr}-18`,
        slot: RECOMMENDED_IST_SLOTS[0], // Morning Commute
        status: "Queued",
        thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
      },
      {
        id: "ev_04",
        projectId: "proj_mlt_01",
        title: "Midnight Mystery of Cyberabad Ep 1",
        teluguTitle: "సైబరాబాద్ అర్ధరాత్రి రహస్యం - ఎపిసోడ్ 1",
        platform: "YouTube Long",
        scheduledDate: `${year}-${monthStr}-22`,
        slot: RECOMMENDED_IST_SLOTS[4], // Weekend Cinema
        status: "Draft",
        thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80",
      },
    ];
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

