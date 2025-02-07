<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI or Human?</title>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
    />
    <link rel="stylesheet" href="./static/style.css" />
    <link rel="stylesheet" href="./static/animations.css" />
  </head>
  <body
    class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white"
  >
    <nav class="glass fixed w-full top-0 z-50 px-4 py-3">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">AI or Human?</h1>
        <div class="space-x-6">
          <a href="index.html" class="hover:text-blue-300">Home</a>
          <a href="details.html" class="hover:text-blue-300">Details</a>
          <a href="connect.html" class="hover:text-blue-300">Connect</a>
        </div>
      </div>
    </nav>

    <main class="container mx-auto pt-20">
      <div class="glass rounded-xl p-6 mt-20 max-w-4xl mx-auto">
        <div
          class="relative h-[400px] overflow-hidden rounded-lg mb-6 image-container"
        >
          <img
            id="previewImage"
            class="w-full h-full object-cover fade-transition"
            src="./Examples/AI1.jpg"
            alt="Example Image"
          />
          <div id="closeButton" class="close-button hidden">
            <i class="bi bi-x-lg"></i>
          </div>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
          <div class="flex items-center">
            <label
              class="glass px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20"
            >
              <input
                type="file"
                class="hidden"
                id="imageUpload"
                accept="image/*"
              />
              <i class="bi bi-upload me-2"></i>Upload Image
            </label>
          </div>

          <div class="flex items-center gap-4">
            <select id="modelSelect" class="glass px-4 py-2 rounded-lg" disabled>
              <option class="text-black bg-white/10" value="model1">
                ResNet50V2
              </option>
              <option class="text-black bg-white/10" value="model2">
                ResNet152V2
              </option>
            </select>
            <button
              type="button"
              id="askAI"
              class="px-4 py-2 rounded-lg hover:bg-white/20 askAIAni"
              disabled
            >
              <span class="fold"></span>
              <div class="points_wrapper">
                <i class="point"></i>
                <i class="point"></i>
                <i class="point"></i>
                <i class="point"></i>
                <i class="point"></i>
                <i class="point"></i>
                <i class="point"></i>
                <i class="point"></i>
                <i class="point"></i>
                <i class="point"></i>
              </div>
              <span class="inner">
                <i class="bi bi-robot me-2"></i>Ask AI
              </span>
            </button>
          </div>
        </div>

        <div class="mt-6 text-center">
          <p class="text-xl mb-2">The AI thinks it's</p>
          <div class="flex justify-center gap-4">
            <span id="realLabel" class="glass px-6 py-2 rounded-lg opacity-50"
              >Real</span
            >
            <span id="fakeLabel" class="glass px-6 py-2 rounded-lg opacity-50"
              >Fake</span
            >
          </div>
        </div>
      </div>
    </main>

    <script src="./static/script.js"></script>
  </body>
</html>
