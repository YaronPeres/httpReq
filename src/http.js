export async function fetchAvaliablePlaces() {
  // getting the data from the htto
  const response = await fetch("http://localhost:3000/places");

  // getting the data from the json
  const resData = await response.json();

  //checking for errors and throwing if there is
  if (!response.ok) {
    throw new Error(" Failed to fetch places");
  }
  return resData.places;
}
export async function fetchUserPlaces() {
  // getting the data from the htto
  const response = await fetch("http://localhost:3000/user-places");

  // getting the data from the json
  const resData = await response.json();

  //checking for errors and throwing if there is
  if (!response.ok) {
    throw new Error(" Failed to fetch user places");
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}
