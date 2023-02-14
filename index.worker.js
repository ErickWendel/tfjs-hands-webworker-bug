

importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js")
importScripts("https://unpkg.com/@tensorflow/tfjs-converter@3.7.0/dist/tf-converter.js")
importScripts("https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.js")

const handsCdn = `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`
importScripts(`${handsCdn}/hands.min.js`)
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.js")
importScripts("https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js")


let detector = null
onmessage = async (msg) => {

  try {
    if (!detector) {
      detector = await self.handPoseDetection.createDetector(
        self.handPoseDetection.SupportedModels.MediaPipeHands,
        {
          runtime: "mediapipe",
          modelType: "full",
          maxHands: 2,
          solutionPath: handsCdn,
        }
      )
      console.log('detector', detector)
    }
    /*
      XHR GET http://localhost:8080/hands_solution_packed_assets.data
      [HTTP/1.1 404 Not Found 4ms]
      Error: Not Found : http://localhost:8080/hands_solution_packed_assets.data
    */
  } catch (error) {
    self.postMessage(error.stack)
  }

}
