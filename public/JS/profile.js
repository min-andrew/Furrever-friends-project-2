const newFormHandler = async (event) => {
  event.preventDefault();

  const displayName = document.querySelector("#display-name").value.trim();
  const dogName = document.querySelector("#dog-name").value.trim();
  const breed = document.querySelector("#breed").value.trim();
  const gender = document.querySelector("#gender").value.trim();
  const size = document.querySelector("#size").value.trim();
  const neighborhood = document.querySelector("#neighborhood").value.trim();
  const hobbies = document.querySelector("#hobbies").value.trim();

  // If all profile fields are answered, then create a new profile
  if (
    displayName &&
    dogName &&
    breed &&
    gender &&
    size &&
    neighborhood &&
    hobbies
  ) {
    const response = await fetch(`/api/profiles`, {
      method: "POST",
      body: JSON.stringify({
        displayName,
        dogName,
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
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create profile. Please try again");
    }
  }
};

document
  .querySelector(".new-profile-form")
  .addEventListener("submit", newFormHandler);
