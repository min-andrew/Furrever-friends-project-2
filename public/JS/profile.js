const newFormHandler = async (event) => {
  event.preventDefault();

  const dog_name = document.querySelector("#dog-name").value.trim();
  const breed = document.querySelector("#dog-breed").value;
  const gender = document.querySelector(".gender:checked").value;
  const size = document.querySelector(".size:checked").value;
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
