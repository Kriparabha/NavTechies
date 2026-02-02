
import sualkuchiWeaving from '../assets/images/Sualkuchi weaving2.jpg';
import brahmaputraCruise from '../assets/images/brahmaputra_river_cruise.jpg';
import brahmaputraSunset from '../assets/images/brahamaputa sunset.webp';
import teaGarden from '../assets/images/tea_garden.jpg';
import pottery from '../assets/images/Pottery.jpg';
import kamakhya from '../assets/images/Kamakhya sunset.jpg';
import thali from '../assets/images/assamese thali.jpg';
import deeporBeel from '../assets/images/deepor_bill.jpg';
import silkworm from '../assets/images/muga_silkworm.jpg';
import navagraha from '../assets/images/Navagraha.jpg';
import umananda from '../assets/images/umananda temple.png';
import tea from '../assets/images/tea.jpg';

export const CATEGORIES = [
  { id: 'heritage', label: 'Heritage', icon: 'Landmark' },
  { id: 'tea', label: 'Tea-Café Trails', icon: 'Coffee' },
  { id: 'riverfront', label: 'Riverfront', icon: 'Waves' },
  { id: 'craft', label: 'Craft Demos', icon: 'Palette' },
];

export const TIME_SLOTS = [
  { id: '30m', label: '30m', description: 'Quick Bite' },
  { id: '60m', label: '60m', description: 'Deep Dive' },
  { id: '240m', label: '240m', description: 'Half Day' },
];

export const VENDORS = [
  {
    id: 'v1',
    name: 'Biren',
    bio: '3rd Gen Weaver from Sualkuchi, passionate about preserving the golden thread of Assam.',
    role: 'Master Weaver',
    verified: true,
    location: 'Sualkuchi, Assam',
    rating: 4.8,
    reviews: 124,
    image: sualkuchiWeaving,
    contact: {
      phone: "+91 98765 43210",
      email: "biren.weaver@example.com"
    }
  },
  {
    id: 'v2',
    name: 'Brahmaputra Tours',
    bio: 'Premier river cruise operator offering sustainable eco-tours.',
    role: 'Tour Operator',
    verified: true,
    location: 'Guwahati, Riverfront',
    rating: 4.9,
    reviews: 89,
    image: brahmaputraCruise,
    contact: {
      phone: "+91 88776 65544",
      email: "info@brahmaputratours.com"
    }
  },
  {
    id: 'v3',
    name: 'Silpukhuri Tea Collective',
    bio: 'A collective of small tea growers bringing the finest flush to your cup.',
    role: 'Tea Estate',
    verified: true,
    location: 'Silpukhuri',
    rating: 4.7,
    reviews: 210,
    image: teaGarden,
    contact: {
      phone: "+91 77665 54433",
      email: "connect@silpukhuritea.com"
    }
  },
  {
    id: 'v4',
    name: 'Kamakhya Guides',
    bio: 'Official guides of the Kamakhya temple complex with deep historical knowledge.',
    role: 'Heritage Guides',
    verified: true,
    location: 'Kamakhya Temple',
    rating: 4.6,
    reviews: 340,
    image: kamakhya,
    contact: {
      phone: "+91 66554 43322",
      email: "tours@kamakhya.com"
    }
  },
  {
    id: 'v5',
    name: "Roopak's Kitchen",
    bio: 'Authentic Assamese culinary expert specializing in traditional thalis.',
    role: 'Culinary Expert',
    verified: true,
    location: 'Ganeshguri',
    rating: 4.9,
    reviews: 45,
    image: thali,
    contact: {
      phone: "+91 55443 32211",
      email: "roopak@authenticassam.com"
    }
  },
  {
    id: 'v6',
    name: 'Deepor Beel Eco-Tours',
    bio: 'Dedicated to conserving the Ramsar site through responsible tourism.',
    role: 'Nature Guides',
    verified: true,
    location: 'Deepor Beel',
    rating: 4.7,
    reviews: 112,
    image: deeporBeel,
    contact: {
      phone: "+91 44332 21100",
      email: "eco@deeporbeel.org"
    }
  }
];

export const EXPERIENCES = [
  {
    id: 'e1',
    title: 'Sualkuchi Weaving Demo',
    vendorId: 'v1',
    category: 'craft',
    duration: '30m',
    price: 350,
    currency: 'INR',
    description: 'Watch the magic of Muga silk weaving in real-time. Learn the basics of the loom.',
    image: sualkuchiWeaving,
    location: { lat: 26.17, lng: 91.57 },
    languages: ['Assamese', 'English', 'Hindi'],
    phrases: [
      { original: 'Bhal lagil', translated: 'It was good', pronunciation: 'bhal la-gil' },
      { original: 'Ki daam?', translated: 'How much?', pronunciation: 'kee daam' },
      { original: 'Dhonyobaad', translated: 'Thank you', pronunciation: 'dhon-yo-baad' },
      { original: 'Namaskar', translated: 'Hello', pronunciation: 'nam-as-kar' },
      { original: 'Rasta kot?', translated: 'Where is the way?', pronunciation: 'ras-ta kot' },
      { original: 'Moi Photo tulibo parune?', translated: 'Can I take a photo?', pronunciation: 'moi photo...' }
    ],
    highlights: [
      "Witness the intricate art of Muga silk weaving",
      "Interact with master weavers in their homes",
      "Try your hand at the traditional loom"
    ]
  },
  {
    id: 'e2',
    title: 'Kamakhya Sunset Trail',
    vendorId: 'v4',
    category: 'heritage',
    duration: '60m',
    price: 500,
    currency: 'INR',
    description: 'A spiritual walk around the Nilachal hill during sunset, exploring hidden shrines.',
    image: kamakhya,
    location: { lat: 26.16, lng: 91.70 },
    languages: ['Assamese', 'Hindi'],
    phrases: [
      { original: 'Bhal lagil', translated: 'It was good', pronunciation: 'bhal la-gil' },
      { original: 'Ki daam?', translated: 'How much?', pronunciation: 'kee daam' },
      { original: 'Dhonyobaad', translated: 'Thank you', pronunciation: 'dhon-yo-baad' },
      { original: 'Namaskar', translated: 'Hello', pronunciation: 'nam-as-kar' },
      { original: 'Rasta kot?', translated: 'Where is the way?', pronunciation: 'ras-ta kot' },
      { original: 'Moi Photo tulibo parune?', translated: 'Can I take a photo?', pronunciation: 'moi photo...' }
    ],
    highlights: [
      "Guided sunset walk around Nilachal Hill",
      "Visit hidden ancient shrines",
      "Panoramic views of Guwahati city"
    ]
  },
  {
    id: 'e3',
    title: 'Umananda Island Quick Ferry',
    vendorId: 'v2',
    category: 'riverfront',
    duration: '60m',
    price: 150,
    currency: 'INR',
    description: 'Ferry ride to the smallest river island. Spot Gangetic dolphins if lucky.',
    image: umananda,
    location: { lat: 26.19, lng: 91.74 },
    languages: ['Assamese', 'English'],
    phrases: [
      { original: 'Bhal lagil', translated: 'It was good', pronunciation: 'bhal la-gil' },
      { original: 'Ki daam?', translated: 'How much?', pronunciation: 'kee daam' },
      { original: 'Dhonyobaad', translated: 'Thank you', pronunciation: 'dhon-yo-baad' },
      { original: 'Namaskar', translated: 'Hello', pronunciation: 'nam-as-kar' },
      { original: 'Rasta kot?', translated: 'Where is the way?', pronunciation: 'ras-ta kot' },
      { original: 'Moi Photo tulibo parune?', translated: 'Can I take a photo?', pronunciation: 'moi photo...' }
    ],
    highlights: [
      "Scenic ferry ride across the Brahmaputra",
      "Explore the smallest inhabited river island",
      "Chance to spot Golden Langurs"
    ]
  },
  {
    id: 'e4',
    title: 'Tea Tasting Masterclass',
    vendorId: 'v3',
    category: 'tea',
    duration: '30m',
    price: 400,
    currency: 'INR',
    description: 'Taste 5 distinct varieties of Assam tea with a master blender.',
    image: tea,
    location: { lat: 26.18, lng: 91.76 },
    languages: ['English'],
    phrases: [
      { original: 'Bhal lagil', translated: 'It was good', pronunciation: 'bhal la-gil' },
      { original: 'Ki daam?', translated: 'How much?', pronunciation: 'kee daam' },
      { original: 'Dhonyobaad', translated: 'Thank you', pronunciation: 'dhon-yo-baad' },
      { original: 'Namaskar', translated: 'Hello', pronunciation: 'nam-as-kar' },
      { original: 'Rasta kot?', translated: 'Where is the way?', pronunciation: 'ras-ta kot' },
      { original: 'Moi Photo tulibo parune?', translated: 'Can I take a photo?', pronunciation: 'moi photo...' }
    ],
    highlights: [
      "Taste 5 premium Assam tea varieties",
      "Learn the art of tea tasting from a master",
      "Understand the journey from leaf to cup"
    ]
  },
  {
    id: 'e5',
    title: 'Pottery Workshop',
    vendorId: 'v1',
    category: 'craft',
    duration: '240m',
    price: 1200,
    currency: 'INR',
    description: 'Hands-on pottery session using traditional wheel and clay.',
    image: pottery,
    location: { lat: 26.15, lng: 91.60 },
    languages: ['Assamese'],
    phrases: [
      { original: 'Bhal lagil', translated: 'It was good', pronunciation: 'bhal la-gil' },
      { original: 'Ki daam?', translated: 'How much?', pronunciation: 'kee daam' },
      { original: 'Dhonyobaad', translated: 'Thank you', pronunciation: 'dhon-yo-baad' },
      { original: 'Namaskar', translated: 'Hello', pronunciation: 'nam-as-kar' },
      { original: 'Rasta kot?', translated: 'Where is the way?', pronunciation: 'ras-ta kot' },
      { original: 'Moi Photo tulibo parune?', translated: 'Can I take a photo?', pronunciation: 'moi photo...' }
    ],
    highlights: [
      "Hands-on experience with the potter's wheel",
      "Create your own clay artifact",
      "Learn about traditional Assamese pottery"
    ]
  },
  {
    id: 'e6',
    title: 'Brahmaputra Dinner Cruise',
    vendorId: 'v2',
    category: 'riverfront',
    duration: '240m',
    price: 2500,
    currency: 'INR',
    description: 'Luxury dinner cruise with live folk music and buffet.',
    image: brahmaputraCruise,
    location: { lat: 26.18, lng: 91.73 },
    languages: ['English', 'Hindi'],
    phrases: [],
    highlights: [
      "Cruising on the majestic Brahmaputra",
      "Enjoy live folk music and dance",
      "Delicious buffet dinner with local cuisine"
    ]
  },
  {
    id: 'e7',
    title: 'Assamese Thali Tasting',
    vendorId: 'v5',
    category: 'heritage',
    duration: '60m',
    price: 600,
    currency: 'INR',
    description: 'Savor a traditional 15-item Assamese thali including khar, tenga, and aloo pitika.',
    image: thali,
    location: { lat: 26.14, lng: 91.78 },
    languages: ['Assamese', 'Hindi', 'English'],
    phrases: [
      { original: 'Bohut swad', translated: 'Very tasty', pronunciation: 'bo-hut swad' }
    ],
    highlights: [
      "Taste 15+ authentic Assamese dishes",
      "Learn about indigenous ingredients",
      "Experience traditional dining etiquette"
    ]
  },
  {
    id: 'e8',
    title: 'Bird Watching at Deepor Beel',
    vendorId: 'v6',
    category: 'riverfront',
    duration: '240m',
    price: 800,
    currency: 'INR',
    description: 'Early morning boat ride to spot migratory birds in the permanent freshwater lake.',
    image: deeporBeel,
    location: { lat: 26.11, lng: 91.65 },
    languages: ['Assamese', 'English'],
    phrases: [
      { original: 'Namaskar', translated: 'Hello', pronunciation: 'nam-as-kar' },
      { original: 'Charai', translated: 'Bird', pronunciation: 'sa-rai' },
      { original: 'Dhonyobaad', translated: 'Thank you', pronunciation: 'dhon-yo-baad' }
    ],
    highlights: [
      "Boat ride in a permanent freshwater lake",
      "Spot rare migratory birds",
      "Learn about the wetland ecosystem"
    ]
  },
  {
    id: 'e9',
    title: 'Silk Worm Lifecycle Demo',
    vendorId: 'v1',
    category: 'craft',
    duration: '30m',
    price: 200,
    currency: 'INR',
    description: 'Learn about the lifecycle of the Muga silkworm and how the golden silk is extracted.',
    image: silkworm,
    location: { lat: 26.17, lng: 91.57 },
    languages: ['Assamese', 'Hindi'],
    phrases: [
      { original: 'Pat', translated: 'Silk', pronunciation: 'pat' },
      { original: 'Muga', translated: 'Golden Silk', pronunciation: 'mu-ga' }
    ],
    highlights: [
      "Observe the complete lifecycle of Muga silkworm",
      "See the extraction of golden silk thread",
      "Visit a rearing farm"
    ]
  },

  {
    id: 'e11',
    title: 'Navagraha Temple Visit',
    vendorId: 'v4',
    category: 'heritage',
    duration: '30m',
    price: 100,
    currency: 'INR',
    description: 'Visit the temple of the nine planets on Chitrachal Hill.',
    image: navagraha,
    location: { lat: 26.18, lng: 91.77 },
    languages: ['Assamese', 'Hindi'],
    phrases: [
      { original: 'Puja', translated: 'Worship', pronunciation: 'pu-ja' },
      { original: 'Graha', translated: 'Planet', pronunciation: 'gra-ha' }
    ],
    highlights: [
      "Explore the ancient Navagraha Temple",
      "Learn about Vedic astrology and history",
      "Enjoy views from Chitrachal Hill"
    ]
  },
  {
    id: 'e12',
    title: 'Sunset River Photography',
    vendorId: 'v2',
    category: 'riverfront',
    duration: '60m',
    price: 450,
    currency: 'INR',
    description: 'Guided photography session capturing the golden hour over the Brahmaputra.',
    image: brahmaputraSunset,
    location: { lat: 26.19, lng: 91.73 },
    languages: ['English'],
    phrases: [
      { original: 'Nodi', translated: 'River', pronunciation: 'no-di' },
      { original: 'Beli', translated: 'Sun', pronunciation: 'be-li' }
    ],
    highlights: [
      "Capture the perfect sunset shot",
      "Learn composition and lighting techniques",
      "Explore riverfront locations"
    ]
  }
];
