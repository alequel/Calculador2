
export const PRICING_DATA = {
  photo: {
    models: {
      'Midjourney': { pricePerImage: { 1: 12, 3: 30, 9: 75 } },
      'Gemini 2.5 Flash Image': { pricePerImage: { 1: 8, 3: 20, 9: 50 } },
      'Leonardo AI': { pricePerImage: { 1: 10, 3: 25, 9: 65 } },
      'Nano Banana': { pricePerImage: { 1: 7, 3: 18, 9: 45 } },
    },
    tasks: [
      'Digital Photoshoot',
      'Product Photoshoot in AI Environment',
      'Generate a Specific Image from a Prompt',
    ],
    quantities: [1, 3, 9],
    promptingFee: 5,
  },
  video: {
    models: {
      'Veo 3': { costPerUnit: 27 },
      'Midjourney': { costPerUnit: 30 },
      'Kling AI': { costPerUnit: 28 },
      'Sora 2': { costPerUnit: 40 },
    },
    qualityMultipliers: {
      'FullHD': 1,
      '2K': 1.5,
      '4K': 2.25,
    },
    soundDesignFee: 10,
    colorCorrectionFee: 8,
    editingFee: 20,
    generationUnitSeconds: 8,
    sliderSnaps: [0, 5, 8, 10, 15, 20, 25, 30, 45, 60],
  },
  rushOrderSurcharge: 0.15,
};