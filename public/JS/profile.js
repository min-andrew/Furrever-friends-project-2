const newFormHandler = async (event) => {
  event.preventDefault();

  const dog_name = document.querySelector("#dog-name").value.trim();
  const breed = document.querySelector("#dog-breed").value.trim();
  const gender = document.querySelector("#dog-gender").value.trim();
  const size = document.querySelector("#dog-size").value.trim();
  const neighborhood = document.querySelector("#dog-neighborhood").value.trim();
  const hobbies = document.querySelector("#dog-hobbies").value.trim();

  // If all profile fields are answered, then create a new profile
  if (dog_name && breed && gender && size && neighborhood && hobbies) {
    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({
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
