const API_BASE_URL = "http://51.20.254.231/backend/api";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return response.json();
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  return response.json();
};

export const getMechanics = async () => {
  const response = await fetch(`${API_BASE_URL}/get_mechanics.php`);
  return response.json();
};

export const bookMechanic = async (data) => {
  const response = await fetch(`${API_BASE_URL}/book.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export const getBookings = async (user_id) => {
  const response = await fetch(`${API_BASE_URL}/get_bookings.php?user_id=${user_id}`);
  return response.json();
};

export const addVehicle = async (data) => {
  const response = await fetch(`${API_BASE_URL}/add_vehicle.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export const getVehicles = async (user_id) => {
  const response = await fetch(`${API_BASE_URL}/get_vehicles.php?user_id=${user_id}`);
  return response.json();
};

export const addMechanic = async (data) => {
  const res = await fetch(`${API_BASE_URL}/add_mechanic.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const addReview = async (data) => {
  const res = await fetch(`${API_BASE_URL}/add_review.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getReviews = async (mechanic_id) => {
  const res = await fetch(`${API_BASE_URL}/get_reviews.php?mechanic_id=${mechanic_id}`);
  return res.json();
};

export const getNotifications = async (user_id) => {
  const res = await fetch(`${API_BASE_URL}/get_notifications.php?user_id=${user_id}`);
  return res.json();
};

export const getMechanicBookings = async (mechanic_id) => {
  const res = await fetch(`${API_BASE_URL}/get_mechanic_bookings.php?mechanic_id=${mechanic_id}`);
  return res.json();
};

export const updateStatus = async (id, status) => {
  const res = await fetch(`${API_BASE_URL}/update_status.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      booking_id: id,
      status
    })
  });

  return res.json();
};

export const loginMechanic = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/mechanic_login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return res.json();
};
