const sampleImages = [
  "./Examples/AI1.jpg",
  "./Examples/AI2.jpg",
  "./Examples/Real1.jpg",
  "./Examples/Real2.jpg",
];
const modelPaths = {
  'model1': "./model/model.json",
  'model2': "./model2/model.json",
};

const message = document.getElementById("message");
const imageUpload = document.getElementById("imageUpload");
const askAI = document.getElementById("askAI");
let currentImageIndex = 0;
let rotationInterval;
const previewImage = document.getElementById("previewImage");
const realLabel = document.getElementById("realLabel");
const fakeLabel = document.getElementById("fakeLabel");
const closeButton = document.getElementById("closeButton");
const modelSelect = document.getElementById("modelSelect");
let model;

// Load Model
async function loadModel() {
  try {
    const selectedModel = modelSelect.value;
    model = await tf.loadGraphModel(modelPaths[selectedModel]);
    const input = tf.zeros([1, 512, 512, 3]);
    let output = model.predict(input);
    console.log("Model loaded successfully");
  } catch (error) {
    console.error("Model loading error:", error);
  }
}

// Load model on selection change
modelSelect.addEventListener("change", loadModel);

// Initial model load
loadModel();

// Start image rotation
function startImageRotation() {
  rotationInterval = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % sampleImages.length;
    previewImage.style.opacity = "0";
    setTimeout(() => {
      previewImage.src = sampleImages[currentImageIndex];
      previewImage.style.opacity = "1";
    }, 500);
  }, 5000);
}
startImageRotation();

// Stop image rotation
function stopImageRotation() {
  clearInterval(rotationInterval);
}

// Image upload handling
document.getElementById("imageUpload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    stopImageRotation();
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      closeButton.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
});

// Close button handling
closeButton.addEventListener("click", () => {
  previewImage.src = sampleImages[currentImageIndex];
  closeButton.classList.add("hidden");
  startImageRotation();
});

// AI Prediction
askAI.addEventListener("click", async () => {
  realLabel.classList.add("twinkle");
  fakeLabel.classList.add("twinkle");

  if (previewImage.src) {
    try {
      const image = new Image();
      image.src = previewImage.src;
      image.onload = async () => {
        const tensor = tf.browser
          .fromPixels(image)
          .resizeBilinear([512, 512])
          .toFloat()
          .div(tf.scalar(255))
          .expandDims(0);

        const output = await model.predict(tensor);
        const predictions = await output.data();
        const isReal = predictions[0] < 0.5;

        // Log the confidence score
        console.log("Confidence score:", predictions[0]);

        realLabel.style.opacity = isReal ? "1" : "0.5";
        fakeLabel.style.opacity = isReal ? "0.5" : "1";
      };
    } catch (error) {
      console.error("Prediction error:", error);
    }
  }

  setTimeout(() => {
    realLabel.classList.remove("twinkle");
    fakeLabel.classList.remove("twinkle");
  }, 3000);
});
