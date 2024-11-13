export async function getRequest(path) {
  const response = await fetch(`http://localhost:3001/api/v1/${path}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.json();
  return result;
}

export async function postRequest(path, body) {
  const response = await fetch(`http://localhost:3001/api/v1/${path}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.json();
  return result;
}

export async function patchRequest(path, body) {
  const response = await fetch(`http://localhost:3001/api/v1/${path}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.json();
  return result;
}
