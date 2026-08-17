export const paper = {
  title:
    "Ensembling Convolutional and Transformer Architectures for Retinopathy of Prematurity Screening in Neonatal Fundus Images",
  author: "Hanish Acharla",
  affiliation: "Mountain House High School, California, United States",
  venue: "IEEE COMPSAC",
  pdfHref: "/ROPscreen-paper.pdf",
};

export const classLabels = ["Physiological", "ROP", "Hemorrhage"] as const;

export const modelMetrics = [
  { model: "MobileNet-V2", short: "MobileNet-V2", accuracy: 0.42, precision: 0.46, recall: 0.5, f1: 0.4, note: "Epochs=10, LR=0.01" },
  { model: "ResNet-50", short: "ResNet-50", accuracy: 0.68, precision: 0.69, recall: 0.73, f1: 0.66, note: "Epochs=10, LR=0.01" },
  { model: "SWIN-B", short: "SWIN-B", accuracy: 0.77, precision: 0.74, recall: 0.79, f1: 0.75, note: "Epochs=10, LR=0.0001" },
  { model: "ResNet-50 + SWIN-B", short: "Ensemble", accuracy: 0.84, precision: 0.81, recall: 0.87, f1: 0.82, note: "Weighted 0.5 / 0.5", isEnsemble: true },
];

export const ablation = [
  { setting: "Base + Augmentation", accuracy: 0.66, precision: 0.66, recall: 0.71, f1: 0.65 },
  { setting: "CLAHE + Augmentation", accuracy: 0.63, precision: 0.64, recall: 0.66, f1: 0.62 },
  { setting: "Border removal + Augmentation", accuracy: 0.63, precision: 0.64, recall: 0.66, f1: 0.62 },
  { setting: "CLAHE + Border (no augmentation)", accuracy: 0.53, precision: 0.6, recall: 0.63, f1: 0.52 },
];

// Normalized confusion matrices, exact values transcribed from Fig. 3 of the paper.
// rows/cols use each model's own reported class ordering.
export const confusionMatrices = {
  resnet50: {
    labels: ["Hemorrhage", "ROP", "Physiological"],
    matrix: [
      [53.71, 26.15, 20.14],
      [1.89, 83.02, 15.09],
      [1.87, 14.67, 83.47],
    ],
  },
  swinB: {
    labels: ["ROP", "Hemorrhage", "Physiological"],
    matrix: [
      [73.32, 9.72, 16.96],
      [1.89, 81.13, 16.98],
      [9.33, 9.6, 81.07],
    ],
  },
  ensemble: {
    labels: ["ROP", "Hemorrhage", "Physiological"],
    matrix: [
      [76.86, 10.6, 12.54],
      [0.0, 91.19, 8.81],
      [1.07, 6.93, 92.0],
    ],
  },
};

export const datasetStats = {
  totalImages: 6004,
  originalClasses: 13,
  finalClasses: 3,
  imageSize: "224 x 224",
  splitAtPatientLevel: true,
  classes: [
    { name: "Physiological", count: 2980, description: "Healthy retinal fundus" },
    { name: "ROP", count: 1729, description: "All ROP stages/zones condensed into one class" },
    { name: "Hemorrhage", count: 1061, description: "Retinal or vitreous bleeding" },
  ],
  splits: {
    raw: { train: 4039, val: 866, test: 865 },
    afterAugmentation: { train: 7500, val: 1015, test: 1100 },
  },
  augmentations: [
    "Rotation",
    "Horizontal flip",
    "ShiftScaleRotate",
    "RandomBrightnessContrast",
    "GaussianBlur",
    "GaussNoise",
  ],
  preprocessing: ["Black border removal", "CLAHE contrast enhancement"],
};

export const ropStats = [
  { value: "31.9%", label: "Pooled prevalence of ROP in premature infants", sourceNote: "systematic analyses cited in the paper" },
  { value: "7.5%", label: "Pooled prevalence of severe ROP" },
  { value: "#1", label: "Leading cause of preventable infantile blindness worldwide" },
];

// Inference-time pipeline — what actually runs on an uploaded image.
// (Augmentation is a training-only step, applied to expand the train
// split before the classifier heads were fit — it does not run at
// inference time, so it's intentionally left out of this flow.)
export const architectureStages = [
  {
    key: "input",
    title: "Fundus Image",
    description: "Neonatal retinal fundus photograph, any resolution",
  },
  {
    key: "preprocess",
    title: "Preprocessing",
    description: "Black border removal + CLAHE contrast enhancement",
  },
  {
    key: "branch",
    title: "Dual-Branch Inference",
    description: "ResNet-50 (224×224) and SWIN-B (384×384) run in parallel on the same image",
  },
  {
    key: "ensemble",
    title: "Weighted Ensemble",
    description: "Softmax probabilities averaged 0.5 / 0.5",
  },
  {
    key: "output",
    title: "Classification",
    description: "Physiological / ROP / Hemorrhage + Grad-CAM heatmap",
  },
];

export const gradcamExamples = [
  {
    key: "physiological",
    label: "Physiological",
    original: "/figures/physiological_original.webp",
    heatmap: "/figures/physiological_gradcam.webp",
    insight: "Diffuse activation spread across healthy retinal areas rather than any single abnormal region — reflecting global structural consistency.",
  },
  {
    key: "rop",
    label: "ROP",
    original: "/figures/rop_original.webp",
    heatmap: "/figures/rop_gradcam.webp",
    insight: "Strong, localized attention on the posterior pole and surrounding abnormal vascular region — consistent with vascular changes associated with ROP.",
  },
  {
    key: "hemorrhage",
    label: "Hemorrhage",
    original: "/figures/hemorrhage_original.webp",
    heatmap: "/figures/hemorrhage_gradcam.webp",
    insight: "High activation concentrated directly around the bleeding regions the model used to make its decision.",
  },
];

export const references = [
  "P. Sen, S. Jain, and P. Bhende, “Stage 5 retinopathy of prematurity: An update,” Taiwan Journal of Ophthalmology, vol. 8, no. 4, pp. 205–215, 2018.",
  "D. K. Wallace, Z. Zhao, and S. F. Freedman, “A pilot study using ‘roptool’ to quantify plus disease in retinopathy of prematurity,” J. AAPOS, vol. 11, no. 4, pp. 381–387, 2007.",
  "J. Wang et al., “Automated explainable multidimensional deep learning platform of retinal images for retinopathy of prematurity screening,” JAMA Network Open, vol. 4, no. 5, e218758, 2021.",
  "S. Ramachandran, P. Niyas, A. Vinekar, and R. John, “A deep learning framework for the detection of plus disease in retinal fundus images of preterm infants,” Biocybernetics and Biomedical Engineering, vol. 41, no. 2, pp. 362–375, 2021.",
  "J. S. Chen et al., “Deep learning for the diagnosis of stage in retinopathy of prematurity: accuracy and generalizability across populations and cameras,” Ophthalmology Retina, vol. 5, no. 10, pp. 1027–1035, 2021.",
  "X. Luo, S. Zhao, Y. Chen, G.-S. Ying, and L. He, “Vgg-swin: A vgg-swin transformer-based model for rop disease diagnosis,” in 2024 IEEE BIBM, pp. 4987–4994, 2024.",
  "J. Timkovič et al., “Retinal image dataset of infants and retinopathy of prematurity,” Scientific Data, vol. 11, no. 1, p. 814, 2024.",
  "K. Zuiderveld, “Contrast limited adaptive histogram equalization,” in Graphics Gems IV, pp. 474–485, 1994.",
  "M. Sandler, A. Howard, M. Zhu, A. Zhmoginov, and L.-C. Chen, “Mobilenetv2: Inverted residuals and linear bottlenecks,” in Proc. IEEE CVPR, pp. 4510–4520, 2018.",
  "K. He, X. Zhang, S. Ren, and J. Sun, “Deep residual learning for image recognition,” in Proc. IEEE CVPR, pp. 770–778, 2016.",
  "Z. Liu, Y. Lin, Y. Cao, H. Hu, Y. Wei, Z. Zhang, S. Lin, and B. Guo, “Swin transformer: Hierarchical vision transformer using shifted windows,” in Proc. IEEE/CVF ICCV, pp. 10012–10022, 2021.",
  "J. Deng, W. Dong, R. Socher, L.-J. Li, K. Li, and L. Fei-Fei, “Imagenet: A large-scale hierarchical image database,” in 2009 IEEE CVPR, pp. 248–255, 2009.",
];

export const links = {
  github: "https://github.com/HanishAcharla",
  huggingFaceSpace: process.env.NEXT_PUBLIC_API_URL ?? "",
};
