import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvaliablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // managing arriving data
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // managing loading state
  const [isFetching, setIsFetching] = useState(false);

  // updating the ui and showing error message to the user.
  const [error, setError] = useState();

  // async await way, useing the useEffect to make sure it will run only once on the first render and preventing further rerenders.
  useEffect(() => {
    async function fetchPlaces() {
      // updateing the loading state to true
      setIsFetching(true);

      // try catch prevents the code from crashing while throwing errors
      try {
        const places = await fetchAvaliablePlaces();
        // // getting the data from the htto
        // const response = await fetch("http://localhost:3000/places");

        // // getting the data from the json
        // const resData = await response.json();

        // //checking for errors and throwing if there is
        // if (!response.ok) {
        //   throw new Error(" Failed to fetch places");
        // }

        // getting the current location of the user
        navigator.geolocation.getCurrentPosition((position) => {
          // using sortPlacesFunction to sort the places according to the distance of the user from the places.
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          // settting the new sorted state
          setAvailablePlaces(sortedPlaces);

          // updating the loading state to false as data arrived.
          setIsFetching(false);
        });

        //setting the data state to the new incoming from the fetch as the new data.
        // setAvailablePlaces(resData.places);
      } catch (error) {
        // if the error was countered handle the error.
        setError({
          // creating the message if no message is arriving from the error.
          message:
            error.message ||
            "Could not fetch places, please try again later...",
        });
        // updating the loading state to false as data arrived.
        setIsFetching(false);
      }
    }
    // making sure the fetching function will activate.
    fetchPlaces();
  }, []); // empty becuase wwe dont want rerender for the data (infinite loop)

  if (error) {
    return <Error title="An error occourred!" message={error.message} />;
  }

  //------------------------------- before using the location function.--------------------------------------------
  // export default function AvailablePlaces({ onSelectPlace }) {
  //   // managing arriving data
  //   const [availablePlaces, setAvailablePlaces] = useState([]);

  //   // managing loading state
  //   const [isFetching, setIsFetching] = useState(false);

  //   // updating the ui and showing error message to the user.
  //   const [error, setError] = useState();

  //   // async await way, useing the useEffect to make sure it will run only once on the first render and preventing further rerenders.
  //   useEffect(() => {
  //     async function fetchPlaces() {
  //       // updateing the loading state to true
  //       setIsFetching(true);

  //       // try catch prevents the code from crashing while throwing errors
  //       try {
  //         // getting the data from the htto
  //         const response = await fetch("http://localhost:3000/places");

  //         // getting the data from the json
  //         const resData = await response.json();

  //         //checking for errors and throwing if there is
  //         if (!response.ok) {
  //           throw new Error(" Failed to fetch places");
  //         }

  //         //setting the data state to the new incoming from the fetch as the new data.
  //         setAvailablePlaces(resData.places);
  //       } catch (error) {
  //         // if the error was countered handle the error.
  //         setError({
  //           // creating the message if no message is arriving from the error.
  //           message:
  //             error.message ||
  //             "Could not fetch places, please try again later...",
  //         });
  //       }

  //       // updating the loading state to false as data arrived.
  //       setIsFetching(false);
  //     }
  //     // making sure the fetching function will activate.
  //     fetchPlaces();
  //   }, []); // empty becuase wwe dont want rerender for the data (infinite loop)

  //   if (error) {
  //     return <Error title="An error occourred!" message={error.message} />;
  //   }

  // One Way doin it
  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((resData) => {
  //       setAvailablePlaces(resData.places);
  //     });
  // }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      fallbackText="No places available."
      loadingText="fetching place data"
      onSelectPlace={onSelectPlace}
    />
  );
}
