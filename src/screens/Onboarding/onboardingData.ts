import { ImageSourcePropType } from 'react-native';

export type Slide = {
  key: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export const ONBOARDING_SLIDES: Slide[] = [
  {
    key: 'welcome',
    title: 'Welcome to Scrub Badub!',
    description:
      // eslint-disable-next-line quotes
      "Your one-stop app for everything laundry. Whether you need cleaning services, delivery, or professional help, we've got you covered. Convenient, fast, and reliable - we make laundry day simple.",
    image: require('@/assets/png/Onboarding/onboarding1.png'),
  },
  {
    key: 'effortless',
    title: 'Effortless Laundry at Your Fingertips',
    description:
      // eslint-disable-next-line quotes
      "As a Bud, you can easily find professional service providers to handle your laundry. Whether it's a quick wash or a deep clean, you can schedule pickups and deliveries at your convenience. Enjoy a hassle-free experience and let us take care of your laundry!",
    image: require('@/assets/png/Onboarding/onboarding2.png'),
  },
  {
    key: 'earnings',
    title: 'Turn Your Skills Into Earnings',
    description:
      // eslint-disable-next-line quotes
      "As a Scrub, you can offer laundry services on your own schedule. Whether you're running a professional laundry business or just helping out in your community, we connect you with customers in need of your expertise. The more you work, the more you earn!",
    image: require('@/assets/png/Onboarding/onboarding3.png'),
  },
  {
    key: 'drive',
    title: 'Flexible Delivery Jobs  Get Paid to Drive',
    description:
      'As a Duber, you can deliver laundry to customers on your own terms. With flexible hours and the freedom to work when you want, delivering laundry is a simple and effective way to earn extra income. All you need is a vehicle and a drive to get started.',
    image: require('@/assets/png/Onboarding/onboarding4.png'),
  },
];

export const slides = ONBOARDING_SLIDES;
