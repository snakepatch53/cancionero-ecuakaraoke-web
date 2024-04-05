export async function fetchAdapter({
    resource,
    method = "GET",
    data = null,
    printResponse = false,
    formData = false,
}) {
    let body = formData ? data : JSON.stringify(data);
    body = method === "GET" ? null : body;

    const headers = new Headers();
    headers.append("Accept", "application/json");
    if (!formData) headers.append("Content-Type", "application/json");
    const response = await fetch(resource, {
        method,
        headers,
        body: body,
    }).then((res) => {
        if (!res.ok) return false;
        return res.json();
    });

    if (printResponse) console.log(response);

    return response;
}
