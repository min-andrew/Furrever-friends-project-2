const cloudName = "dnp6znxen";
const uploadPreset = "zg4wuptf";

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    sources: [
      "local",
      "url",
      "camera",
      "google_drive",
      "facebook",
      "instagram",
    ],
    multiple: false, //restrict upload to a single file,
    maxImageWidth: 500, //Scales the image down to a width of 500 pixels before uploading
    maxImageHeight: 500, //Scales the image down to a height of 500 pixels before uploading
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
