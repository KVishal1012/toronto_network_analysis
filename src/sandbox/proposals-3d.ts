// Generated from public/screening/6ed092c988ad9326e279/areas/*.json.gz and src/sandbox/architectural.json.
// Coordinates (x, z) are EPSG:26917 offsets relative to each 600x600 m 3D view centre (x = px - cx, z = cy - py).

export type PeriodServiceStatus = {
  stopName: string;
  distance_m: number;
  routes: string[];
  minHourlyDepartures: number;
  maxHourlyDepartures: number;
  status: string;
};

export type Proposal3D = {
  number: string;
  label: string;
  units: number;
  stage: string;
  cellId: string;
  region: 'downtown' | 'midtown';
  x: number;
  z: number;
  nearestStop: {
    name: string;
    distance_m: number;
  };
  serviceSummary: {
    morning: PeriodServiceStatus | null;
    evening: PeriodServiceStatus | null;
    saturday: PeriodServiceStatus | null;
  };
  sourceUrl: string;
  nearestBuildingId: string;
  nearestBuildingDistM: number;
};

export const proposals3d: Proposal3D[] = [
  {
    "number": "22 162242 STE 11 OZ",
    "label": "180 DUNDAS ST W",
    "units": 1551,
    "stage": "Active",
    "cellId": "1260_9669",
    "region": "downtown",
    "x": -221.09,
    "z": -199.17,
    "nearestStop": {
      "name": "Dundas St West at Chestnut St",
      "distance_m": 43.7
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Dundas St West at Chestnut St",
        "distance_m": 43.7,
        "routes": [
          "505"
        ],
        "minHourlyDepartures": 6,
        "maxHourlyDepartures": 12,
        "status": "Route 505 \u00b7 6\u201312/hr (~every 5\u201310 min) at Dundas St West at Chestnut St (44 m)"
      },
      "evening": {
        "stopName": "Dundas St West at Chestnut St",
        "distance_m": 43.7,
        "routes": [
          "505"
        ],
        "minHourlyDepartures": 12,
        "maxHourlyDepartures": 12,
        "status": "Route 505 \u00b7 12/hr (~every 5 min) at Dundas St West at Chestnut St (44 m)"
      },
      "saturday": {
        "stopName": "Dundas St West at Chestnut St",
        "distance_m": 43.7,
        "routes": [
          "505"
        ],
        "minHourlyDepartures": 10,
        "maxHourlyDepartures": 12,
        "status": "Route 505 \u00b7 10\u201312/hr (~every 5\u20136 min) at Dundas St West at Chestnut St (44 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=5CN%2FsNeGg8zFKjMCnywAog%3D%3D",
    "nearestBuildingId": "2025-142244",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "19 239929 STE 13 OZ",
    "label": "483 BAY ST",
    "units": 538,
    "stage": "Active",
    "cellId": "1260_9669",
    "region": "downtown",
    "x": 152.76,
    "z": -38.55,
    "nearestStop": {
      "name": "Bay St at Hagerman St",
      "distance_m": 90.6
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Queen Station - Northbound Platform",
        "distance_m": 203.3,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Queen Station - Northbound Platform (203 m)"
      },
      "evening": {
        "stopName": "Queen Station - Northbound Platform",
        "distance_m": 203.3,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 19,
        "maxHourlyDepartures": 23,
        "status": "Route 1 \u00b7 19\u201323/hr (~every 3 min) at Queen Station - Northbound Platform (203 m)"
      },
      "saturday": {
        "stopName": "Queen Station - Northbound Platform",
        "distance_m": 203.3,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Queen Station - Northbound Platform (203 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=mc3RN9CEVoQu%2FxoMWib7Yw%3D%3D",
    "nearestBuildingId": "2025-142430",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "22 204655 STE 10 OZ",
    "label": "191 DUNDAS ST W",
    "units": 135,
    "stage": "Under Review",
    "cellId": "1260_9669",
    "region": "downtown",
    "x": -235.04,
    "z": -162.14,
    "nearestStop": {
      "name": "Dundas St West at Chestnut St",
      "distance_m": 60.6
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Dundas St West at Chestnut St",
        "distance_m": 60.6,
        "routes": [
          "505"
        ],
        "minHourlyDepartures": 6,
        "maxHourlyDepartures": 12,
        "status": "Route 505 \u00b7 6\u201312/hr (~every 5\u201310 min) at Dundas St West at Chestnut St (61 m)"
      },
      "evening": {
        "stopName": "Dundas St West at Chestnut St",
        "distance_m": 60.6,
        "routes": [
          "505"
        ],
        "minHourlyDepartures": 12,
        "maxHourlyDepartures": 12,
        "status": "Route 505 \u00b7 12/hr (~every 5 min) at Dundas St West at Chestnut St (61 m)"
      },
      "saturday": {
        "stopName": "Dundas St West at Chestnut St",
        "distance_m": 60.6,
        "routes": [
          "505"
        ],
        "minHourlyDepartures": 10,
        "maxHourlyDepartures": 12,
        "status": "Route 505 \u00b7 10\u201312/hr (~every 5\u20136 min) at Dundas St West at Chestnut St (61 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=mCS12vKAw9E6iIyFMWYVlg%3D%3D",
    "nearestBuildingId": "2025-141959",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "20 232714 STE 12 OZ",
    "label": "2180 YONGE ST",
    "units": 2892,
    "stage": "Under Review",
    "cellId": "1258_9680",
    "region": "midtown",
    "x": 23.72,
    "z": 173.04,
    "nearestStop": {
      "name": "Eglinton Station at Bus Bay 2",
      "distance_m": 18.3
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 32.1,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 5,
        "maxHourlyDepartures": 5,
        "status": "Route 97 \u00b7 5/hr (~every 12 min) at Yonge St at Berwick Ave (32 m)"
      },
      "evening": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 32.1,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 4,
        "maxHourlyDepartures": 4,
        "status": "Route 97 \u00b7 4/hr (~every 15 min) at Yonge St at Berwick Ave (32 m)"
      },
      "saturday": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 32.1,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 4,
        "maxHourlyDepartures": 5,
        "status": "Route 97 \u00b7 4\u20135/hr (~every 12\u201315 min) at Yonge St at Berwick Ave (32 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=N59s8Qf2JU22pCem2v3syQ%3D%3D",
    "nearestBuildingId": "2025-145569",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "20 229115 NNY 08 OZ",
    "label": "50-60 EGLINTON AVE W",
    "units": 1559,
    "stage": "Under Review",
    "cellId": "1257_9681",
    "region": "midtown",
    "x": -160.26,
    "z": -32.97,
    "nearestStop": {
      "name": "Eglinton Ave West at Duplex Ave",
      "distance_m": 41.3
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 104.4,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 10,
        "maxHourlyDepartures": 17,
        "status": "Route 5 \u00b7 10\u201317/hr (~every 4\u20136 min) at Eglinton Station - Westbound Platform (104 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 104.4,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 16,
        "maxHourlyDepartures": 16,
        "status": "Route 5 \u00b7 16/hr (~every 4 min) at Eglinton Station - Westbound Platform (104 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 104.4,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 9,
        "maxHourlyDepartures": 9,
        "status": "Route 5 \u00b7 9/hr (~every 7 min) at Eglinton Station - Westbound Platform (104 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=2vCFK%2Bw2tAsTHYuXenqFrQ%3D%3D",
    "nearestBuildingId": "2025-148872",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "21 220609 STE 12 OZ",
    "label": "2345 YONGE ST",
    "units": 1370,
    "stage": "Under Review",
    "cellId": "1258_9681",
    "region": "midtown",
    "x": 2.03,
    "z": -294.69,
    "nearestStop": {
      "name": "Yonge St at Orchard View Blvd",
      "distance_m": 68.9
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 255.9,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (256 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 255.9,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (256 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 255.9,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (256 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=NmXho3vDTsKOh%2BA3NkVYzQ%3D%3D",
    "nearestBuildingId": "2025-184879",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "18 128310 STE 22 OZ",
    "label": "90 EGLINTON AVE E",
    "units": 1035,
    "stage": "Active",
    "cellId": "1258_9681",
    "region": "midtown",
    "x": 206.45,
    "z": -161.87,
    "nearestStop": {
      "name": "Eglinton Ave East at Dunfield Ave",
      "distance_m": 51.7
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 233.4,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (233 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 233.4,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (233 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 233.4,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (233 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=g2YHzlFFnXMQJNyXXOkUig%3D%3D",
    "nearestBuildingId": "2025-185020",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "24 166703 STE 12 OZ",
    "label": "2323 YONGE ST",
    "units": 784,
    "stage": "Active",
    "cellId": "1258_9681",
    "region": "midtown",
    "x": 14.27,
    "z": -234.13,
    "nearestStop": {
      "name": "Yonge St at Orchard View Blvd",
      "distance_m": 43.0
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 195.4,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (195 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 195.4,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (195 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 195.4,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (195 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=XMqnMmlIb%2FOMbxovRXcsxA%3D%3D",
    "nearestBuildingId": "2025-184876",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "14 268618 STE 22 OZ",
    "label": "55 EGLINTON AVE E",
    "units": 664,
    "stage": "Active",
    "cellId": "1258_9681",
    "region": "midtown",
    "x": 193.64,
    "z": -82.29,
    "nearestStop": {
      "name": "Eglinton Ave East at Dunfield Ave",
      "distance_m": 50.7
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 190.5,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (190 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 190.5,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (190 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 190.5,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (190 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=CFMmMJ%2FMhj%2BqP0GA56waNQ%3D%3D",
    "nearestBuildingId": "2025-178720",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "22 139084 STE 12 OZ",
    "label": "77 ROEHAMPTON AVE",
    "units": 624,
    "stage": "Active",
    "cellId": "1258_9681",
    "region": "midtown",
    "x": 184.27,
    "z": -218.63,
    "nearestStop": {
      "name": "Eglinton Ave East at Dunfield Ave",
      "distance_m": 112.4
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 251.7,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (252 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 251.7,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (252 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 251.7,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (252 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=XyjZkSCKJztXIH%2BUZuQJtw%3D%3D",
    "nearestBuildingId": "2025-183942",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "21 101581 NNY 08 OZ",
    "label": "36 EGLINTON AVE W",
    "units": 613,
    "stage": "Active",
    "cellId": "1257_9681",
    "region": "midtown",
    "x": -118.54,
    "z": -41.6,
    "nearestStop": {
      "name": "Duplex Ave at Eglinton Ave West",
      "distance_m": 42.2
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 63.5,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 10,
        "maxHourlyDepartures": 17,
        "status": "Route 5 \u00b7 10\u201317/hr (~every 4\u20136 min) at Eglinton Station - Westbound Platform (64 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 63.5,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 16,
        "maxHourlyDepartures": 16,
        "status": "Route 5 \u00b7 16/hr (~every 4 min) at Eglinton Station - Westbound Platform (64 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 63.5,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 9,
        "maxHourlyDepartures": 9,
        "status": "Route 5 \u00b7 9/hr (~every 7 min) at Eglinton Station - Westbound Platform (64 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=u7RJXMff%2Foavp5A9O6OjOg%3D%3D",
    "nearestBuildingId": "2025-152228",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "14 266776 STE 22 OZ",
    "label": "1 EGLINTON AVE E",
    "units": 600,
    "stage": "Active",
    "cellId": "1258_9681",
    "region": "midtown",
    "x": 57.95,
    "z": -43.32,
    "nearestStop": {
      "name": "Yonge St at Eglinton Ave East (Eglinton Station)",
      "distance_m": 38.4
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 50.0,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (50 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 50.0,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (50 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 50.0,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (50 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=46yvaEcr9boRV19lCe5jBw%3D%3D",
    "nearestBuildingId": "2025-180179",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "25 151892 STE 12 OZ",
    "label": "120 EGLINTON AVE E",
    "units": 555,
    "stage": "Under Review",
    "cellId": "1258_9681",
    "region": "midtown",
    "x": 282.82,
    "z": -170.82,
    "nearestStop": {
      "name": "Eglinton Ave East at Dunfield Ave",
      "distance_m": 20.5
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 304.8,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (305 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 304.8,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (305 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 304.8,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (305 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=B063XRkddEsQB533QusSPQ%3D%3D",
    "nearestBuildingId": "2025-183937",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "25 191657 STE 12 OZ",
    "label": "41 BERWICK AVE",
    "units": 552,
    "stage": "Under Review",
    "cellId": "1258_9680",
    "region": "midtown",
    "x": -26.53,
    "z": 274.26,
    "nearestStop": {
      "name": "Eglinton Station at Bus Bay 1",
      "distance_m": 79.7
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Southbound Platform",
        "distance_m": 101.3,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Southbound Platform (101 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Southbound Platform",
        "distance_m": 101.3,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 21,
        "status": "Route 1 \u00b7 15\u201321/hr (~every 3\u20134 min) at Eglinton Station - Southbound Platform (101 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Southbound Platform",
        "distance_m": 101.3,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Southbound Platform (101 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=XfdoWtSZaHdOIxpD1Ex8Cg%3D%3D",
    "nearestBuildingId": "2025-143189",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "24 146664 NNY 08 OZ",
    "label": "2346 YONGE ST",
    "units": 391,
    "stage": "Under Review",
    "cellId": "1257_9681",
    "region": "midtown",
    "x": -51.31,
    "z": -235.96,
    "nearestStop": {
      "name": "Yonge St at Orchard View Blvd",
      "distance_m": 22.8
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 204.9,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 10,
        "maxHourlyDepartures": 17,
        "status": "Route 5 \u00b7 10\u201317/hr (~every 4\u20136 min) at Eglinton Station - Westbound Platform (205 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 204.9,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 16,
        "maxHourlyDepartures": 16,
        "status": "Route 5 \u00b7 16/hr (~every 4 min) at Eglinton Station - Westbound Platform (205 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 204.9,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 9,
        "maxHourlyDepartures": 9,
        "status": "Route 5 \u00b7 9/hr (~every 7 min) at Eglinton Station - Westbound Platform (205 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=WkLBPzXnQBoelGEqSk5R4g%3D%3D",
    "nearestBuildingId": "2025-152193",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "22 176294 NNY 08 OZ",
    "label": "2350 YONGE ST",
    "units": 323,
    "stage": "Under Review",
    "cellId": "1257_9681",
    "region": "midtown",
    "x": -44.94,
    "z": -250.22,
    "nearestStop": {
      "name": "Yonge St at Orchard View Blvd",
      "distance_m": 23.7
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 218.0,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (218 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 218.0,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (218 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 218.0,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (218 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=BuBb%2BiSh9FbMNoZqFpWPjQ%3D%3D",
    "nearestBuildingId": "2025-152117",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "13 105888 STE 22 OZ",
    "label": "2131 YONGE ST",
    "units": 624,
    "stage": "Built",
    "cellId": "1258_9680",
    "region": "midtown",
    "x": 91.63,
    "z": 275.24,
    "nearestStop": {
      "name": "Yonge St at Soudan Ave",
      "distance_m": 40.5
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 91.7,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 5,
        "maxHourlyDepartures": 5,
        "status": "Route 97 \u00b7 5/hr (~every 12 min) at Yonge St at Berwick Ave (92 m)"
      },
      "evening": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 91.7,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 4,
        "maxHourlyDepartures": 4,
        "status": "Route 97 \u00b7 4/hr (~every 15 min) at Yonge St at Berwick Ave (92 m)"
      },
      "saturday": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 91.7,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 4,
        "maxHourlyDepartures": 5,
        "status": "Route 97 \u00b7 4\u20135/hr (~every 12\u201315 min) at Yonge St at Berwick Ave (92 m)"
      }
    },
    "sourceUrl": "",
    "nearestBuildingId": "2025-180533",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "12 296517 STE 22 OZ",
    "label": "2221 YONGE ST",
    "units": 605,
    "stage": "Built",
    "cellId": "1258_9680",
    "region": "midtown",
    "x": 54.18,
    "z": 20.08,
    "nearestStop": {
      "name": "Yonge St at Eglinton Ave East (Eglinton Station)",
      "distance_m": 42.2
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 74.8,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (75 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 74.8,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (75 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 74.8,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (75 m)"
      }
    },
    "sourceUrl": "",
    "nearestBuildingId": "2025-180189",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "13 211324 STE 22 OZ",
    "label": "33 HOLLY ST",
    "units": 545,
    "stage": "Built",
    "cellId": "1258_9680",
    "region": "midtown",
    "x": 210.77,
    "z": 38.57,
    "nearestStop": {
      "name": "Eglinton Ave East at Dunfield Ave",
      "distance_m": 156.4
    },
    "serviceSummary": {
      "morning": {
        "stopName": "2190 Yonge St",
        "distance_m": 195.1,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 5,
        "maxHourlyDepartures": 5,
        "status": "Route 97 \u00b7 5/hr (~every 12 min) at 2190 Yonge St (195 m)"
      },
      "evening": {
        "stopName": "2190 Yonge St",
        "distance_m": 195.1,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 4,
        "maxHourlyDepartures": 4,
        "status": "Route 97 \u00b7 4/hr (~every 15 min) at 2190 Yonge St (195 m)"
      },
      "saturday": {
        "stopName": "2190 Yonge St",
        "distance_m": 195.1,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 4,
        "maxHourlyDepartures": 5,
        "status": "Route 97 \u00b7 4\u20135/hr (~every 12\u201315 min) at 2190 Yonge St (195 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=OhVy0ObGHW0mD0DHsb559g%3D%3D",
    "nearestBuildingId": "2025-178723",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "16 269637 STE 22 OZ",
    "label": "41 ROEHAMPTON AVE",
    "units": 440,
    "stage": "Built",
    "cellId": "1258_9681",
    "region": "midtown",
    "x": 105.96,
    "z": -212.88,
    "nearestStop": {
      "name": "Yonge St at Eglinton Ave East North Side - Eglinton Station",
      "distance_m": 109.6
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 199.7,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 24,
        "maxHourlyDepartures": 24,
        "status": "Route 1 \u00b7 24/hr (~every 2 min) at Eglinton Station - Northbound Platform (200 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 199.7,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 17,
        "maxHourlyDepartures": 22,
        "status": "Route 1 \u00b7 17\u201322/hr (~every 3\u20134 min) at Eglinton Station - Northbound Platform (200 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Northbound Platform",
        "distance_m": 199.7,
        "routes": [
          "1"
        ],
        "minHourlyDepartures": 15,
        "maxHourlyDepartures": 16,
        "status": "Route 1 \u00b7 15\u201316/hr (~every 4 min) at Eglinton Station - Northbound Platform (200 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=tgMudgx%2BYEHHyyvwuHFlhg%3D%3D",
    "nearestBuildingId": "2025-185449",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "12 168197 NNY 16 OZ",
    "label": "2360 YONGE ST",
    "units": 404,
    "stage": "Built",
    "cellId": "1257_9681",
    "region": "midtown",
    "x": -55.25,
    "z": -282.19,
    "nearestStop": {
      "name": "Yonge St at Orchard View Blvd",
      "distance_m": 55.9
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 251.1,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 10,
        "maxHourlyDepartures": 17,
        "status": "Route 5 \u00b7 10\u201317/hr (~every 4\u20136 min) at Eglinton Station - Westbound Platform (251 m)"
      },
      "evening": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 251.1,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 16,
        "maxHourlyDepartures": 16,
        "status": "Route 5 \u00b7 16/hr (~every 4 min) at Eglinton Station - Westbound Platform (251 m)"
      },
      "saturday": {
        "stopName": "Eglinton Station - Westbound Platform",
        "distance_m": 251.1,
        "routes": [
          "5"
        ],
        "minHourlyDepartures": 9,
        "maxHourlyDepartures": 9,
        "status": "Route 5 \u00b7 9/hr (~every 7 min) at Eglinton Station - Westbound Platform (251 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/DevelopmentApplications/associatedApplicationsList.do?action=init&folderRsn=3127406&isCofASearch=false",
    "nearestBuildingId": "2025-152141",
    "nearestBuildingDistM": 0.0
  },
  {
    "number": "17 186503 STE 22 OZ",
    "label": "2161 YONGE ST",
    "units": 335,
    "stage": "Built",
    "cellId": "1258_9680",
    "region": "midtown",
    "x": 71.87,
    "z": 164.37,
    "nearestStop": {
      "name": "Yonge St at Berwick Ave",
      "distance_m": 39.3
    },
    "serviceSummary": {
      "morning": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 39.3,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 5,
        "maxHourlyDepartures": 5,
        "status": "Route 97 \u00b7 5/hr (~every 12 min) at Yonge St at Berwick Ave (39 m)"
      },
      "evening": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 39.3,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 4,
        "maxHourlyDepartures": 4,
        "status": "Route 97 \u00b7 4/hr (~every 15 min) at Yonge St at Berwick Ave (39 m)"
      },
      "saturday": {
        "stopName": "Yonge St at Berwick Ave",
        "distance_m": 39.3,
        "routes": [
          "97"
        ],
        "minHourlyDepartures": 4,
        "maxHourlyDepartures": 5,
        "status": "Route 97 \u00b7 4\u20135/hr (~every 12\u201315 min) at Yonge St at Berwick Ave (39 m)"
      }
    },
    "sourceUrl": "http://app.toronto.ca/AIC/index.do?folderRsn=posVYQ4tBndTjlsV%2FmOikQ%3D%3D",
    "nearestBuildingId": "2025-178721",
    "nearestBuildingDistM": 0.0
  }
];
