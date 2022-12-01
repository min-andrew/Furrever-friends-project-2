const newFormHandler = async (event) => {
  event.preventDefault();

  var avatar = document.querySelector(".avatar:checked").value;
  const dog_name = document.querySelector("#dog-name").value.trim();
  const breed = document.querySelector("#dog-breed").value;
  const gender = document.querySelector(".gender:checked").value;
  const size = document.querySelector(".size:checked").value;
  const neighborhood = document.querySelector("#dog-neighborhood").value.trim();
  const hobbies = document.querySelector("#dog-hobbies").value.trim();

  // Selecting avatar
  switch (avatar) {
    case "optionOne":
      avatar =
        "https://res.cloudinary.com/dtah7hwfr/image/upload/v1669848816/fb4i2lvxy9broboiwxgt.png";
      break;
    case "optionTwo":
      avatar =
        "https://res.cloudinary.com/dtah7hwfr/image/upload/v1669848825/p1hkg5okpewqwgrkbb51.png";
      break;
    case "optionThree":
      avatar =
        "https://res.cloudinary.com/dtah7hwfr/image/upload/v1669848834/scmucgc2vxqyxo2tqizx.png";
      break;
    case "optionFour":
      avatar =
        "https://res.cloudinary.com/dtah7hwfr/image/upload/v1669848849/wlvagpfrxvwwpivavd7c.png";
      break;
    case "optionFive":
      avatar =
        "https://res.cloudinary.com/dtah7hwfr/image/upload/v1669848858/i9pxpxfsvhdykjidpemo.png";
      break;
    case "optionSix":
      avatar =
        "https://res.cloudinary.com/dtah7hwfr/image/upload/v1669848868/znsrbq2xtinelrg977iy.png";
      break;
    case "optionSeven":
      avatar =
        "https://res.cloudinary.com/dtah7hwfr/image/upload/v1669848877/uvfuseyhhwt0dap0akf9.png";
      break;
    case "optionEight":
      avatar =
        "https://res.cloudinary.com/dtah7hwfr/image/upload/v1669848884/scpvsdm1budrhgulk4ew.png";
      break;
  }

  // If all profile fields are answered, then create a new profile
  if (
    avatar &&
    dog_name &&
    breed &&
    gender &&
    size &&
    neighborhood &&
    hobbies
  ) {
    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({
        avatar,
        dog_name,
        breed,
        gender,
        size,
        neighborhood,
        hobbies,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If profile is successfully created, then redirects to the profile. If there is an error creating the profile, it alerts the users to try again.

    // TODO: currently going to /post, but eventually will want to route to /viewprofile
    if (response.ok) {
      document.location.replace("/post");
    } else {
      alert("Failed to create profile. Please try again");
    }
  }
};

document
  .querySelector(".new-profile-form")
  .addEventListener("submit", newFormHandler);
