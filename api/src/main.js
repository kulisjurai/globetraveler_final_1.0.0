const dotenvLoadingResult = require("dotenv").config();

if (dotenvLoadingResult.error) {
    throw dotenvLoadingResult.error;
}

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//jwt authentication
const authToken = require("./middleware/auth.middleware");

//user actions
const getAllUsers = require("./controllers/user/getAllUsers");
const createUser = require("./controllers/user/createUser");
const getUserById = require("./controllers/user/getUserById");
const loginUser = require("./controllers/user/loginUser");
const deleteUser = require("./controllers/user/deleteUser");
const changeRoleUser = require("./controllers/user/changeRoleUser");
const getRoleType = require("./controllers/user/getRoleType");
const getNumberOfUsers = require("./controllers/user/countUsers");
const resetPasswordRequest = require("./controllers/user/resetPasswordRequest");
const setNewPassword = require("./controllers/user/setNewPassword");
const updateUser = require("./controllers/user/updateUser");

// destinations
const getAllDestinations = require("./controllers/destination/getAllDestinations");
const searchDestinations = require("./controllers/destination/searchDestination");
const getTrasportTypes = require("./controllers/destination/getTransportTypes");
const createDestination = require("./controllers/destination/createDestination");
const deleteDestination = require("./controllers/destination/deleteDestination");
const countDestinations = require("./controllers/destination/countDestinations");
const updateDestination = require("./controllers/destination/updateDestination");
const getDestinationById = require("./controllers/destination/getDestinationById");
const parseFromStringDestinationProgram = require("./controllers/destination/parseFromStringDestinationProgram");
const getUniqueCountry = require("./controllers/destination/getUniqueCountry");
const filterDestinations = require("./controllers/destination/filterDestinations");

//reservations
const createReservation = require("./controllers/reservation/createReservation");
const getAllReservations = require("./controllers/reservation/getAllReservations");
const deleteReservation = require("./controllers/reservation/deleteReservation");
const cancelReservation = require("./controllers/reservation/cancelReservation");
const countReservations = require("./controllers/reservation/countReservations");
const restoreReservation = require("./controllers/reservation/restoreReservation");
const getAllReservationByUserId = require("./controllers/reservation/getAllReservationsByUserId");
const notCanceledReservationsByUserId = require("./controllers/reservation/notCanceledReservationsByUserId");
const checkedReservationsByUserId = require("./controllers/reservation/checkedReservationsByUserId");
const checkInReservation = require("./controllers/reservation/checkInReservation");

/******************************************routes**************************************************/
//user
app.post("/user-create", createUser);
app.get("/get-user-by-id/:id", getUserById);
app.post("/user-login", loginUser);
app.get("/get-all-users", authToken, getAllUsers);
app.put("/user-delete/:id", authToken, deleteUser);
app.put("/user-role-change/:id", authToken, changeRoleUser);
app.get("/get-role-type", authToken, getRoleType);
app.get("/users-count", getNumberOfUsers);
app.get("/check-if-user-exist/:identifier", resetPasswordRequest);
app.put("/set-new-password", setNewPassword);
app.put("/user-update", authToken, updateUser);

//destiantions
app.get("/get-all-destinations", getAllDestinations);
app.get("/destinations-search/:name", searchDestinations);
app.get("/get-transport-types", getTrasportTypes);
app.post("/destination-create", authToken, createDestination);
app.put("/destination-delete/:id", authToken, deleteDestination);
app.get("/destinations-count", countDestinations);
app.put("/destiantion-update/:id", authToken, updateDestination);
app.get("/get-destination-by-id/:id", getDestinationById);
app.get("/get-destination-program/:id", parseFromStringDestinationProgram);
app.get("/get-unique-country-rows", getUniqueCountry);
app.get("/filter-destinations/:query", filterDestinations);

//reservations
app.post("/reservation-create", authToken, createReservation);
app.get("/get-all-reservations", authToken, getAllReservations);
app.put("/reservation-delete/:id", authToken, deleteReservation);
app.put("/reservation-cancel/:id", authToken, cancelReservation);
app.get("/reservations-count", authToken, countReservations);
app.put("/reservation-restore/:id", authToken, restoreReservation);
app.get(
    "/reservations-get-all-by-user-id/:id",
    authToken,
    getAllReservationByUserId
);
app.get(
    "/reservations-not-canceled/:id",
    authToken,
    notCanceledReservationsByUserId
);
app.get(
    "/reservations-checked-by-user-id/:id",

    checkedReservationsByUserId
);
app.put("/reservation-check-in/:id", authToken, checkInReservation);

/*************************************************************************/

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});